import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";

async function enroll(courseId: string) {
  "use server";
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from("enrollments").upsert(
    { user_id: user.id, course_id: courseId },
    { onConflict: "user_id,course_id" }
  );
  revalidatePath("/dashboard");
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: course } = await supabase.from("courses").select("*").eq("slug", slug).single();
  if (!course) notFound();

  const { data: lessons } = await supabase
    .from("course_lessons")
    .select("*")
    .eq("course_id", course.id)
    .order("order_index");

  const { data: { user } } = await supabase.auth.getUser();
  let isEnrolled = false;
  if (user) {
    const { data: enrollment } = await supabase
      .from("enrollments")
      .select("id")
      .eq("user_id", user.id)
      .eq("course_id", course.id)
      .maybeSingle();
    isEnrolled = !!enrollment;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 md:px-6">
      {course.thumbnail_url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={course.thumbnail_url} alt={course.title} className="h-64 w-full rounded-2xl object-cover" />
      )}

      <header className="mt-8 text-right">
        <h1 className="font-display text-3xl font-extrabold text-ink md:text-4xl">{course.title}</h1>
        <p className="mt-3 text-slate">{course.description}</p>
        <p className="mt-4 text-sm text-slate">المدرّب: {course.instructor_name}</p>
      </header>

      <div className="mt-8 flex items-center justify-between rounded-2xl border border-ink/10 bg-white p-6">
        <span className="font-display text-2xl font-extrabold text-gold-dark">
          {course.is_free ? "مجاني" : `${course.price} د.ج`}
        </span>
        {isEnrolled ? (
          <span className="rounded-full bg-teal/10 px-5 py-2 text-sm font-bold text-teal-dark">مسجّل بالفعل ✓</span>
        ) : (
          <form action={enroll.bind(null, course.id)}>
            <button className="rounded-full bg-ink px-6 py-3 font-bold text-parchment hover:bg-teal">
              {course.is_free ? "سجّل مجاناً" : "اشترِ والتحق بالدورة"}
            </button>
          </form>
        )}
      </div>

      <section className="mt-10">
        <h2 className="font-display text-xl font-bold text-ink">محتوى الدورة</h2>
        <div className="mt-4 space-y-3">
          {lessons?.map((lesson, i) => (
            <div key={lesson.id} className="flex items-center justify-between rounded-xl border border-ink/10 bg-white px-5 py-4">
              <div>
                <p className="font-bold text-ink">{i + 1}. {lesson.title}</p>
                {lesson.is_preview && <p className="text-xs text-teal">معاينة مجانية</p>}
              </div>
              {!lesson.is_preview && !isEnrolled && <span className="text-xs text-slate">🔒 مقفل</span>}
            </div>
          ))}
          {!lessons?.length && <p className="text-slate">لم تتم إضافة دروس لهذه الدورة بعد.</p>}
        </div>
      </section>
    </div>
  );
}
