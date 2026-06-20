import Link from "next/link";
import { logout } from "../(auth)/actions";

const links = [
  { href: "/admin", label: "نظرة عامة" },
  { href: "/admin/services", label: "إدارة الخدمات" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex max-w-6xl gap-8 px-4 py-10 md:px-6">
      <aside className="hidden w-56 shrink-0 md:block">
        <nav className="space-y-1 rounded-2xl border border-ink/10 bg-white p-4">
          <p className="mb-2 px-4 text-xs font-bold text-gold-dark">لوحة الإدارة</p>
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="block rounded-lg px-4 py-2 text-sm text-slate hover:bg-parchment">
              {l.label}
            </Link>
          ))}
          <form action={logout}>
            <button className="mt-2 block w-full rounded-lg px-4 py-2 text-right text-sm font-bold text-red-600 hover:bg-red-50">
              تسجيل الخروج
            </button>
          </form>
        </nav>
      </aside>
      <div className="flex-1">{children}</div>
    </div>
  );
}
