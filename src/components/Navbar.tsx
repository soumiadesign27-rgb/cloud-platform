import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const links = [
  { href: "/", label: "الرئيسية" },
  { href: "/services", label: "الخدمات" },
  { href: "/courses", label: "الدورات" },
  { href: "/store", label: "المتجر" },
  { href: "/blog", label: "المدونة" },
  { href: "/library", label: "المكتبة المجانية" },
];

export default async function Navbar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-parchment/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="font-display text-base font-extrabold text-ink sm:text-lg">
          SOUMIA <span className="text-gold">BRANDING</span>
        </Link>

        <ul className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-sm font-medium text-slate transition hover:text-teal"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <Link
              href="/dashboard"
              className="rounded-full bg-ink px-5 py-2 text-sm font-bold text-parchment transition hover:bg-teal"
            >
              لوحتي
            </Link>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium text-slate hover:text-teal">
                تسجيل الدخول
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-gold px-5 py-2 text-sm font-bold text-ink transition hover:bg-gold-dark"
              >
                إنشاء حساب
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu — CSS-only toggle via checkbox peer */}
        <input type="checkbox" id="nav-toggle" className="peer hidden" />
        <label
          htmlFor="nav-toggle"
          className="flex cursor-pointer flex-col gap-1.5 md:hidden"
          aria-label="فتح القائمة"
        >
          <span className="h-0.5 w-6 bg-ink" />
          <span className="h-0.5 w-6 bg-ink" />
          <span className="h-0.5 w-6 bg-ink" />
        </label>

        <div className="absolute inset-x-0 top-full hidden flex-col gap-4 border-b border-ink/10 bg-parchment p-5 peer-checked:flex md:hidden">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm font-medium text-slate">
              {l.label}
            </Link>
          ))}
          <hr className="border-ink/10" />
          {user ? (
            <Link href="/dashboard" className="text-sm font-bold text-teal">لوحتي</Link>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium text-slate">تسجيل الدخول</Link>
              <Link href="/register" className="text-sm font-bold text-gold-dark">إنشاء حساب</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
