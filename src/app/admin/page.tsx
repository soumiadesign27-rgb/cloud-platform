import { createClient } from "@/lib/supabase/server";

export default async function AdminOverviewPage() {
  const supabase = await createClient();

  const [{ count: usersCount }, { count: ordersCount }, { count: coursesCount }, { data: revenue }] =
    await Promise.all([
      supabase.from("profiles").select("*", { count: "exact", head: true }),
      supabase.from("orders").select("*", { count: "exact", head: true }),
      supabase.from("courses").select("*", { count: "exact", head: true }),
      supabase.from("orders").select("total").eq("status", "paid"),
    ]);

  const totalRevenue = revenue?.reduce((sum, o) => sum + Number(o.total), 0) ?? 0;

  const stats = [
    { label: "المستخدمون", value: usersCount ?? 0 },
    { label: "الطلبات", value: ordersCount ?? 0 },
    { label: "الدورات", value: coursesCount ?? 0 },
    { label: "الإيرادات (مدفوعة)", value: `${totalRevenue} د.ج` },
  ];

  return (
    <div className="text-right">
      <h1 className="font-display text-2xl font-extrabold text-ink">لوحة الإدارة</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-ink/10 bg-white p-5">
            <p className="text-sm text-slate">{s.label}</p>
            <p className="mt-2 font-display text-2xl font-extrabold text-ink">{s.value}</p>
          </div>
        ))}
      </div>
      <p className="mt-8 text-sm text-slate">
        من القائمة الجانبية يمكنك إدارة الخدمات. يمكن إنشاء صفحات مماثلة لإدارة الدورات، المنتجات،
        المدونة، والمكتبة بنفس النمط (نموذج CRUD متصل بـ Supabase).
      </p>
    </div>
  );
}
