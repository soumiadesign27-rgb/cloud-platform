import Link from "next/link";
import { login } from "../actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; redirect?: string; registered?: string }>;
}) {
  const { error, redirect, registered } = await searchParams;

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-4 py-16">
      <h1 className="font-display text-3xl font-extrabold text-ink">تسجيل الدخول</h1>
      <p className="mt-2 text-slate">سجّل الدخول للوصول إلى لوحتك ومحتواك.</p>

      {registered && (
        <p className="mt-4 rounded-lg bg-teal/10 px-4 py-3 text-sm text-teal-dark">
          تم إنشاء حسابك بنجاح، تحقق من بريدك الإلكتروني لتأكيد الحساب ثم سجّل دخولك.
        </p>
      )}
      {error && (
        <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}

      <form action={login} className="mt-8 space-y-4">
        <input type="hidden" name="redirect" value={redirect ?? "/dashboard"} />
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
            className="w-full rounded-xl border border-ink/15 px-4 py-3 outline-none focus:border-teal"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-xl bg-ink py-3 font-bold text-parchment transition hover:bg-teal"
        >
          تسجيل الدخول
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate">
        ليس لديك حساب؟{" "}
        <Link href="/register" className="font-bold text-teal">
          إنشاء حساب جديد
        </Link>
      </p>
    </div>
  );
}
