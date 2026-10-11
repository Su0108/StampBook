# Backend setup (run in order, review before running)
1. Supabase Dashboard > Database > Extensions: enable pg_cron, pg_net.
2. SQL Editor: run 01_indexes.sql, 02_rate_limit.sql, 03_job_queue.sql, 04_invoice_number.sql.
3. Vault: create secret `worker_secret` (random string). Edge Function secret WORKER_SECRET = same value.
4. `supabase functions deploy job-worker --no-verify-jwt`
5. Test: `select public.enqueue_job('payment_notify','{"payment_id":"<uuid>"}');` then watch job_queue.status.
Rate limiting in your existing edge functions (register-otp, shorten-link, razorpay-create-order):
  const { data: allowed } = await sb.rpc('check_rate_limit', { p_key: `otp:${phone}`, p_max: 5, p_window_seconds: 600 });
  if (!allowed) return new Response(JSON.stringify({ ok:false, error:'Too many requests' }), { status: 429 });
