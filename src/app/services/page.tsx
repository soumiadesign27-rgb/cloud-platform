import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function ServicesPage() {
  const supabase = await createClient();
  const { data: services } = await supabase
    .from("services")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <header className="mb-10 text-right">
        <h1 className="font-display text-3xl font-extrabold text-ink md:text-4xl">الخدمات</h1>
        <p className="mt-2 text-slate">حلول جاهزة يبدأها فريقنا لمساعدتك على إطلاق وتطوير مشروعك.</p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services?.map((s) => (
          <Link
            key={s.id}
            href={`/services/${s.id}`}
            className="block rounded-2xl border border-ink/10 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <span className="text-3xl">{s.icon}</span>
            <h2 className="mt-4 font-display text-lg font-bold">{s.title}</h2>
            <p className="mt-2 text-sm text-slate">{s.description}</p>
            <div className="mt-5 flex items-center justify-between">
              <span className="font-bold text-teal">{s.price} د.ج</span>
              <span className="rounded-full bg-ink px-4 py-2 text-xs font-bold text-parchment hover:bg-teal">
                اطلب الخدمة
              </span>
            </div>
          </Link>
        ))}
        {!services?.length && (
          <p className="col-span-full text-center text-slate">لا توجد خدمات متاحة حاليًا.</p>
        )}
      </div>
    </div>
  );
                       }
