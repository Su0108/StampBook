-- Speed: indexes for the exact filters/sorts app.js uses. Safe to re-run.
-- Check column names against your schema before running (inferred from app.js).
create index if not exists idx_invoices_user_created   on public.invoices      (user_id, created_at desc);
create index if not exists idx_invoice_items_user_pos  on public.invoice_items (user_id, position);
create index if not exists idx_invoice_items_invoice   on public.invoice_items (invoice_id);
create index if not exists idx_payments_user_date      on public.payments      (user_id, date desc);
create index if not exists idx_payments_invoice        on public.payments      (invoice_id);
create index if not exists idx_payments_client         on public.payments      (client_id);
create index if not exists idx_expenses_user_date      on public.expenses      (user_id, date desc);
create index if not exists idx_clients_user_created    on public.clients       (user_id, created_at desc);
create index if not exists idx_activity_user_created   on public.activity      (user_id, created_at desc);
create index if not exists idx_razorpay_orders_invoice on public.razorpay_orders (invoice_id);
create index if not exists idx_support_tickets_user    on public.support_tickets (user_id, created_at desc);
create index if not exists idx_login_events_user       on public.login_events  (user_id, created_at desc);
