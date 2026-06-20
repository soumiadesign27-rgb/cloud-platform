import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function BlogPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 md:px-6">
      <header className="mb-10 text-right">
        <h1 className="font-display text-3xl font-extrabold text-ink md:text-4xl">المدونة</h1>
        <p className="mt-2 text-slate">مقالات ونصائح حول التسويق، التصميم، والذكاء الاصطناعي.</p>
      </header>

      <div className="space-y-6">
        {posts?.map((p) => (
          <Link
            key={p.id}
            href={`/blog/${p.slug}`}
            className="flex flex-col gap-4 overflow-hidden rounded-2xl border border-ink/10 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg sm:flex-row"
          >
            {p.cover_image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={p.cover_image} alt={p.title} className="h-40 w-full rounded-xl object-cover sm:w-56" />
            )}
            <div className="text-right">
              <h2 className="font-display text-lg font-bold">{p.title}</h2>
              <p className="mt-2 text-sm text-slate">{p.excerpt}</p>
              <p className="mt-3 text-xs text-slate">
                {new Date(p.created_at).toLocaleDateString("ar-DZ")}
              </p>
            </div>
          </Link>
        ))}
        {!posts?.length && <p className="text-center text-slate">لا توجد مقالات منشورة حالياً.</p>}
      </div>
    </div>
  );
}
