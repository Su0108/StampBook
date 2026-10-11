// Supabase Edge Function: job-worker. Deploy: supabase functions deploy job-worker --no-verify-jwt
// Secrets: WORKER_SECRET (same value stored in vault as 'worker_secret'), SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY (auto)
import { createClient } from "npm:@supabase/supabase-js@2";

const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

const handlers: Record<string, (p: any) => Promise<void>> = {
  // Example: push a payment notification to your Railway WhatsApp bot
  async payment_notify(p) {
    const r = await fetch("https://notify-payment-received-production.up.railway.app", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${Deno.env.get("BOT_TOKEN") ?? ""}` },
      body: JSON.stringify({ payment_id: p.payment_id }),
    });
    if (!r.ok) throw new Error(`bot ${r.status}`);
  },
  // Add more: broadcast_email, broadcast_whatsapp (send in chunks of 20), invoice_reminder, etc.
};

Deno.serve(async (req) => {
  if (req.headers.get("x-worker-secret") !== Deno.env.get("WORKER_SECRET")) return new Response("forbidden", { status: 403 });
  const { data: jobs, error } = await sb.rpc("claim_jobs", { p_limit: 10 });
  if (error) return new Response(error.message, { status: 500 });
  let ok = 0, failed = 0;
  await Promise.all((jobs ?? []).map(async (j: any) => {
    try {
      const h = handlers[j.type];
      if (!h) throw new Error("no handler for " + j.type);
      await h(j.payload);
      await sb.rpc("finish_job", { p_id: j.id, p_ok: true }); ok++;
    } catch (e) {
      await sb.rpc("finish_job", { p_id: j.id, p_ok: false, p_error: String(e) }); failed++;
    }
  }));
  return Response.json({ claimed: jobs?.length ?? 0, ok, failed });
});
