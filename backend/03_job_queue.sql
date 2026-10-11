-- Durable job queue + background workers (Postgres + pg_cron + pg_net + Edge Function).
create extension if not exists pg_cron;
create extension if not exists pg_net;

create table if not exists public.job_queue (
  id          bigserial primary key,
  type        text        not null,
  payload     jsonb       not null default '{}',
  status      text        not null default 'pending',   -- pending | running | done | failed
  attempts    int         not null default 0,
  max_attempts int        not null default 5,
  run_at      timestamptz not null default now(),
  locked_at   timestamptz,
  last_error  text,
  created_at  timestamptz not null default now()
);
create index if not exists idx_job_queue_ready on public.job_queue (run_at) where status = 'pending';
alter table public.job_queue enable row level security;  -- service role only

create or replace function public.enqueue_job(p_type text, p_payload jsonb, p_delay_seconds int default 0)
returns bigint language sql security definer set search_path = public as $$
  insert into public.job_queue(type, payload, run_at)
  values (p_type, p_payload, now() + make_interval(secs => p_delay_seconds)) returning id;
$$;

-- workers claim a batch safely (SKIP LOCKED = many workers, no double processing)
create or replace function public.claim_jobs(p_limit int default 10)
returns setof public.job_queue language plpgsql security definer set search_path = public as $$
begin
  return query
  with c as (
    select id from public.job_queue
    where (status = 'pending' and run_at <= now())
       or (status = 'running' and locked_at < now() - interval '5 minutes')  -- recover crashed workers
    order by run_at limit p_limit for update skip locked)
  update public.job_queue j set status='running', locked_at=now(), attempts=j.attempts+1
  from c where j.id = c.id returning j.*;
end $$;

create or replace function public.finish_job(p_id bigint, p_ok boolean, p_error text default null)
returns void language sql security definer set search_path = public as $$
  update public.job_queue set
    status    = case when p_ok then 'done' when attempts >= max_attempts then 'failed' else 'pending' end,
    run_at    = case when p_ok then run_at else now() + make_interval(secs => least(3600, 30 * power(2, attempts)::int)) end,
    last_error = p_error, locked_at = null
  where id = p_id;
$$;
revoke all on function public.enqueue_job(text,jsonb,int), public.claim_jobs(int), public.finish_job(bigint,boolean,text) from public;
grant execute on function public.enqueue_job(text,jsonb,int), public.claim_jobs(int), public.finish_job(bigint,boolean,text) to service_role;

-- Run the worker every minute. Replace <PROJECT_REF> and set the secret (see README).
select cron.schedule('job-worker-tick', '* * * * *', $$
  select net.http_post(
    url := 'https://sjrkoiypdhcrwzetijen.supabase.co/functions/v1/job-worker',
    headers := jsonb_build_object('Content-Type','application/json','x-worker-secret', (select decrypted_secret from vault.decrypted_secrets where name='worker_secret')),
    body := '{}'::jsonb);
$$);

-- Scheduled background jobs (examples)
-- Mark sent invoices overdue every night at 00:05 IST (18:35 UTC). Adjust column names/stages to your schema:
-- select cron.schedule('mark-overdue', '35 18 * * *', $$update public.invoices set stage='overdue' where stage in ('sent','partial') and due_date < current_date$$);
-- Purge finished jobs weekly:
select cron.schedule('job-queue-cleanup', '0 3 * * 0', $$delete from public.job_queue where status in ('done','failed') and created_at < now() - interval '14 days'$$);
