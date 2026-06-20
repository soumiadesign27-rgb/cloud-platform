import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user!.id).single();

  const { data: enrollments } = await supabase
    .from("enrollments")
    .select("*, courses(title, slug, thumbnail_url)")
    .eq("user_id", user!.id);

  const { data: orders } = await supabase
    .from("orders")
    .select("*, order_items(*, products(title))")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false });

  return (
    <div className="text-right">
      <h1 className="font-display text-2xl font-extrabold text-ink">
        أهلاً، {profile?.full_name || "بك"} 👋
      </h1>
      <p className="mt-1 text-slate">
        خطتك الحالية: <span className="font-bold text-gold-dark">{profile?.membership_tier}</span>
      </p>

      <section className="mt-8">
        <h2 className="font-display text-lg font-bold text-ink">دوراتي</h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          {enrollments?.map((e: any) => (
            <Link
              key={e.id}
              href={`/courses/${e.courses.slug}`}
              className="rounded-xl border border-ink/10 bg-white p-4 hover:shadow-md"
            >
              <p className="font-bold">{e.courses.title}</p>
              <p className="mt-1 text-xs text-slate">نسبة الإنجاز: {e.progress}%</p>
            </Link>
          ))}
          {!enrollments?.length && <p className="text-sm text-slate">لم تشترك في أي دورة بعد.</p>}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-lg font-bold text-ink">طلباتي</h2>
        <div className="mt-3 space-y-3">
          {orders?.map((o: any) => (
            <div key={o.id} className="flex items-center justify-between rounded-xl border border-ink/10 bg-white p-4">
              <span className="text-sm text-slate">
                {o.order_items?.map((it: any) => it.products?.title).filter(Boolean).join("، ") || "طلب"}
              </span>
              <div className="flex items-center gap-3">
                <span className="font-bold text-teal">{o.total} د.ج</span>
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                  o.status === "paid" ? "bg-teal/10 text-teal-dark" : "bg-gold/10 text-gold-dark"
                }`}>
                  {o.status === "paid" ? "مدفوع" : o.status === "cancelled" ? "ملغى" : "قيد الانتظار"}
                </span>
              </div>
            </div>
          ))}
          {!orders?.length && <p className="text-sm text-slate">لا توجد طلبات حتى الآن.</p>}
        </div>
      </section>
    </div>
  );
}
