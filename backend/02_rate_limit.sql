-- Server-side rate limiting (fixed window). Call from RPCs / edge functions.
create table if not exists public.rate_limits (
  key          text        not null,
  window_start timestamptz not null,
  hits         int         not null default 0,
  primary key (key, window_start)
);
alter table public.rate_limits enable row level security;  -- no policies: only service role / security definer fns

-- returns true if the call is allowed, false if the limit is exceeded
create or replace function public.check_rate_limit(p_key text, p_max int, p_window_seconds int)
returns boolean
language plpgsql security definer set search_path = public as $$
declare
  w timestamptz := to_timestamp(floor(extract(epoch from now()) / p_window_seconds) * p_window_seconds);
  n int;
begin
  insert into public.rate_limits(key, window_start, hits) values (p_key, w, 1)
  on conflict (key, window_start) do update set hits = public.rate_limits.hits + 1
  returning hits into n;
  return n <= p_max;
end $$;
revoke all on function public.check_rate_limit(text,int,int) from public;
grant execute on function public.check_rate_limit(text,int,int) to service_role;

-- Example for an authenticated RPC: limit to 30 invoice creations/min per user
-- if not public.check_rate_limit('inv:'||auth.uid(), 30, 60) then raise exception 'rate_limited'; end if;
-- (grant check_rate_limit to authenticated only if you wrap it in your own security definer function.)

-- cleanup (needs pg_cron: Dashboard > Database > Extensions)
select cron.schedule('rate-limits-cleanup', '*/15 * * * *',
  $$delete from public.rate_limits where window_start < now() - interval '1 day'$$);
