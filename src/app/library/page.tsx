import { createClient } from "@/lib/supabase/server";

export default async function LibraryPage() {
  const supabase = await createClient();
  const { data: items } = await supabase
    .from("library_items")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 md:px-6">
      <header className="mb-10 text-right">
        <h1 className="font-display text-3xl font-extrabold text-ink md:text-4xl">المكتبة المجانية</h1>
        <p className="mt-2 text-slate">ملفات وقوالب مجانية يمكنك تحميلها مباشرة.</p>
      </header>

      <div className="grid gap-5 sm:grid-cols-2">
        {items?.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-2xl border border-ink/10 bg-white p-5">
            <div className="text-right">
              <h2 className="font-display font-bold">{item.title}</h2>
              <p className="mt-1 text-sm text-slate">{item.description}</p>
              {item.category && (
                <span className="mt-2 inline-block rounded-full bg-teal/10 px-3 py-1 text-xs font-bold text-teal-dark">
                  {item.category}
                </span>
              )}
            </div>
            <a
              href={item.file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-full bg-gold px-5 py-2 text-sm font-bold text-ink hover:bg-gold-dark"
            >
              تحميل
            </a>
          </div>
        ))}
        {!items?.length && <p className="col-span-full text-center text-slate">لا توجد ملفات متاحة حالياً.</p>}
      </div>
    </div>
  );
}
