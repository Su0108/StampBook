-- Race-free invoice numbers. app.js currently reads next_no then updates it from the browser,
-- so two devices can get the same number. This RPC does it atomically on the server.
create or replace function public.next_invoice_no()
returns int language sql security definer set search_path = public as $$
  update public.business_settings set next_no = next_no + 1
  where user_id = auth.uid() returning next_no - 1;
$$;
grant execute on function public.next_invoice_no() to authenticated;
-- Then in app.js use: const { data: no } = await sb.rpc('next_invoice_no');
