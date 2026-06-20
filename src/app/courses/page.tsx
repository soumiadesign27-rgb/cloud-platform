import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function CoursesPage() {
  const supabase = await createClient();
  const { data: courses } = await supabase
    .from("courses")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <header className="mb-10 text-right">
        <h1 className="font-display text-3xl font-extrabold text-ink md:text-4xl">الدورات التدريبية</h1>
        <p className="mt-2 text-slate">طوّر مهاراتك من خلال دورات عملية مصممة بالعربية.</p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses?.map((c) => (
          <Link
            key={c.id}
            href={`/courses/${c.slug}`}
            className="overflow-hidden rounded-2xl border border-ink/10 bg-white transition hover:-translate-y-1 hover:shadow-lg"
          >
            {c.thumbnail_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={c.thumbnail_url} alt={c.title} className="h-44 w-full object-cover" />
            )}
            <div className="p-5">
              <span className="rounded-full bg-teal/10 px-3 py-1 text-xs font-bold text-teal-dark">
                {c.level === "beginner" ? "مبتدئ" : c.level === "intermediate" ? "متوسط" : "متقدم"}
              </span>
              <h2 className="mt-3 font-display font-bold">{c.title}</h2>
              <p className="mt-2 text-sm text-slate line-clamp-2">{c.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-bold text-gold-dark">{c.is_free ? "مجاني" : `${c.price} د.ج`}</span>
                <span className="text-xs text-slate">{c.instructor_name}</span>
              </div>
            </div>
          </Link>
        ))}
        {!courses?.length && (
          <p className="col-span-full text-center text-slate">لا توجد دورات متاحة حالياً.</p>
        )}
      </div>
    </div>
  );
}
