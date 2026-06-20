import { createClient } from "@/lib/supabase/server";
import { createService, toggleService, deleteService } from "./actions";

export default async function AdminServicesPage() {
  const supabase = await createClient();
  const { data: services } = await supabase.from("services").select("*").order("created_at", { ascending: false });

  return (
    <div className="text-right">
      <h1 className="font-display text-2xl font-extrabold text-ink">إدارة الخدمات</h1>

      <form action={createService} className="mt-6 grid gap-3 rounded-2xl border border-ink/10 bg-white p-5 sm:grid-cols-2">
        <input name="title" placeholder="عنوان الخدمة" required className="rounded-lg border border-ink/15 px-3 py-2" />
        <input name="price" type="number" step="0.01" placeholder="السعر" className="rounded-lg border border-ink/15 px-3 py-2" />
        <input name="icon" placeholder="أيقونة (مثال: 🎨)" className="rounded-lg border border-ink/15 px-3 py-2" />
        <input name="image_url" placeholder="رابط الصورة" className="rounded-lg border border-ink/15 px-3 py-2" />
        <textarea name="description" placeholder="الوصف" className="rounded-lg border border-ink/15 px-3 py-2 sm:col-span-2" />
        <button className="rounded-lg bg-ink py-2 font-bold text-parchment hover:bg-teal sm:col-span-2">
          إضافة خدمة
        </button>
      </form>

      <div className="mt-6 space-y-3">
        {services?.map((s) => (
          <div key={s.id} className="flex items-center justify-between gap-4 rounded-xl border border-ink/10 bg-white p-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{s.icon}</span>
              <div>
                <p className="font-bold">{s.title}</p>
                <p className="text-xs text-slate">{s.price} د.ج</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <form action={toggleService.bind(null, s.id, s.is_active)}>
                <button className={`rounded-full px-3 py-1 text-xs font-bold ${s.is_active ? "bg-teal/10 text-teal-dark" : "bg-slate/10 text-slate"}`}>
                  {s.is_active ? "مفعّلة" : "معطّلة"}
                </button>
              </form>
              <form action={deleteService.bind(null, s.id)}>
                <button className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600">حذف</button>
              </form>
            </div>
          </div>
        ))}
        {!services?.length && <p className="text-sm text-slate">لا توجد خدمات. أضف أول خدمة من الأعلى.</p>}
      </div>
    </div>
  );
}
