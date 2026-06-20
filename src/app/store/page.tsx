import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function StorePage() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <header className="mb-10 text-right">
        <h1 className="font-display text-3xl font-extrabold text-ink md:text-4xl">المتجر الرقمي</h1>
        <p className="mt-2 text-slate">منتجات جاهزة للتحميل الفوري بعد الشراء.</p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products?.map((p) => (
          <Link
            key={p.id}
            href={`/store/${p.slug}`}
            className="overflow-hidden rounded-2xl border border-ink/10 bg-white transition hover:-translate-y-1 hover:shadow-lg"
          >
            {p.thumbnail_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={p.thumbnail_url} alt={p.title} className="h-44 w-full object-cover" />
            )}
            <div className="p-5">
              {p.category && (
                <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-bold text-gold-dark">{p.category}</span>
              )}
              <h2 className="mt-3 font-display font-bold">{p.title}</h2>
              <p className="mt-2 text-sm text-slate line-clamp-2">{p.description}</p>
              <p className="mt-4 font-bold text-teal">{p.price} د.ج</p>
            </div>
          </Link>
        ))}
        {!products?.length && (
          <p className="col-span-full text-center text-slate">لا توجد منتجات متاحة حالياً.</p>
        )}
      </div>
    </div>
  );
}
