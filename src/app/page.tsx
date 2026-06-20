import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();

  const [{ data: services }, { data: courses }, { data: products }] = await Promise.all([
    supabase.from("services").select("*").eq("is_active", true).limit(3),
    supabase.from("courses").select("*").eq("is_published", true).limit(3),
    supabase.from("products").select("*").eq("is_active", true).limit(3),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink">
        <div className="absolute inset-0 bg-zellige opacity-40" />
        <div className="relative mx-auto max-w-6xl px-4 py-24 text-right md:px-6 md:py-32">
          <p className="mb-4 inline-block rounded-full border border-gold/40 px-4 py-1 text-xs font-bold text-gold">
            خدمات • دورات • منتجات رقمية
          </p>
          <h1 className="font-display text-4xl font-extrabold leading-tight text-parchment md:text-6xl">
            كل ما يحتاجه مشروعك الرقمي،<br className="hidden md:block" /> في منصة واحدة
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-parchment/70 md:text-xl">
            احصل على خدمات تصميم وتسويق، دورات تدريبية، ومنتجات رقمية جاهزة —
            مبنية خصيصاً للمتحدثين بالعربية، بجودة عالمية.
          </p>
          <div className="mt-8 flex flex-wrap justify-end gap-4">
            <Link href="/register" className="rounded-full bg-gold px-7 py-3 font-bold text-ink transition hover:bg-gold-light">
              ابدأ مجاناً
            </Link>
            <Link href="/services" className="rounded-full border border-parchment/30 px-7 py-3 font-bold text-parchment transition hover:bg-parchment/10">
              استكشف الخدمات
            </Link>
          </div>
        </div>
      </section>

      {/* Services preview */}
      <Section title="خدماتنا" subtitle="حلول جاهزة لإنطلاق مشروعك بسرعة" href="/services" linkLabel="جميع الخدمات">
        <div className="grid gap-6 md:grid-cols-3">
          {services?.map((s) => (
            <div key={s.id} className="rounded-2xl border border-ink/10 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg">
              <span className="text-3xl">{s.icon}</span>
              <h3 className="mt-4 font-display text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-slate">{s.description}</p>
              <p className="mt-4 font-bold text-teal">{s.price} د.ج</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Courses preview */}
      <Section title="الدورات التدريبية" subtitle="تعلّم مهارات جديدة بإرشاد عملي" href="/courses" linkLabel="جميع الدورات" tone="parchment">
        <div className="grid gap-6 md:grid-cols-3">
          {courses?.map((c) => (
            <Link
              key={c.id}
              href={`/courses/${c.slug}`}
              className="overflow-hidden rounded-2xl border border-ink/10 bg-white transition hover:-translate-y-1 hover:shadow-lg"
            >
              {c.thumbnail_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={c.thumbnail_url} alt={c.title} className="h-40 w-full object-cover" />
              )}
              <div className="p-5">
                <h3 className="font-display font-bold">{c.title}</h3>
                <p className="mt-2 text-sm text-slate line-clamp-2">{c.description}</p>
                <p className="mt-3 font-bold text-gold-dark">
                  {c.is_free ? "مجاني" : `${c.price} د.ج`}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Store preview */}
      <Section title="المتجر الرقمي" subtitle="منتجات جاهزة للتحميل الفوري" href="/store" linkLabel="تصفح المتجر">
        <div className="grid gap-6 md:grid-cols-3">
          {products?.map((p) => (
            <Link
              key={p.id}
              href={`/store/${p.slug}`}
              className="overflow-hidden rounded-2xl border border-ink/10 bg-white transition hover:-translate-y-1 hover:shadow-lg"
            >
              {p.thumbnail_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.thumbnail_url} alt={p.title} className="h-40 w-full object-cover" />
              )}
              <div className="p-5">
                <h3 className="font-display font-bold">{p.title}</h3>
                <p className="mt-3 font-bold text-teal">{p.price} د.ج</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}

function Section({
  title,
  subtitle,
  href,
  linkLabel,
  tone = "white",
  children,
}: {
  title: string;
  subtitle: string;
  href: string;
  linkLabel: string;
  tone?: "white" | "parchment";
  children: React.ReactNode;
}) {
  return (
    <section className={tone === "parchment" ? "bg-parchment/60 py-16" : "py-16"}>
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl font-extrabold text-ink md:text-3xl">{title}</h2>
            <p className="mt-1 text-slate">{subtitle}</p>
          </div>
          <Link href={href} className="text-sm font-bold text-teal hover:text-teal-dark">
            {linkLabel} ←
          </Link>
        </div>
        {children}
      </div>
    </section>
  );
}
