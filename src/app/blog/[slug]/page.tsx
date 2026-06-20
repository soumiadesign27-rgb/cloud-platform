import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase.from("blog_posts").select("*").eq("slug", slug).single();
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 md:px-6">
      {post.cover_image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.cover_image} alt={post.title} className="h-72 w-full rounded-2xl object-cover" />
      )}
      <h1 className="mt-8 text-right font-display text-3xl font-extrabold text-ink md:text-4xl">
        {post.title}
      </h1>
      <p className="mt-3 text-right text-xs text-slate">
        {new Date(post.created_at).toLocaleDateString("ar-DZ")}
      </p>
      <div className="mt-8 text-right leading-8 text-slate whitespace-pre-line">
        {post.content}
      </div>
    </article>
  );
}
