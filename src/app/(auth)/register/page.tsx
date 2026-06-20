import Link from "next/link";
import { register } from "../actions";

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-4 py-16">
      <h1 className="font-display text-3xl font-extrabold text-ink">إنشاء حساب جديد</h1>
      <p className="mt-2 text-slate">انضم إلى المنصة وابدأ التعلم والاستفادة من الخدمات.</p>

      {error && (
        <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}

      <form action={register} className="mt-8 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-bold text-ink">الاسم الكامل</label>
          <input
            name="full_name"
            type="text"
            required
            className="w-full rounded-xl border border-ink/15 px-4 py-3 outline-none focus:border-teal"
            placeholder="اسمك الكامل"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-bold text-ink">البريد الإلكتروني</label>
          <input
            name="email"
            type="email"
            required
            className="w-full rounded-xl border border-ink/15 px-4 py-3 outline-none focus:border-teal"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-bold text-ink">كلمة المرور</label>
          <input
            name="password"
            type="password"
            required
            minLength={6}
            className="w-full rounded-xl border border-ink/15 px-4 py-3 outline-none focus:border-teal"
            placeholder="6 أحرف على الأقل"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-xl bg-gold py-3 font-bold text-ink transition hover:bg-gold-dark"
        >
          إنشاء الحساب
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate">
        لديك حساب بالفعل؟{" "}
        <Link href="/login" className="font-bold text-teal">
          تسجيل الدخول
        </Link>
      </p>
    </div>
  );
}
