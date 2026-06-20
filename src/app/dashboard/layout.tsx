import Link from "next/link";
import { logout } from "../(auth)/actions";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex max-w-6xl gap-8 px-4 py-10 md:px-6">
      <aside className="hidden w-56 shrink-0 md:block">
        <nav className="space-y-1 rounded-2xl border border-ink/10 bg-white p-4">
          <Link href="/dashboard" className="block rounded-lg px-4 py-2 text-sm font-bold text-ink hover:bg-parchment">
            نظرة عامة
          </Link>
          <Link href="/courses" className="block rounded-lg px-4 py-2 text-sm text-slate hover:bg-parchment">
            تصفح الدورات
          </Link>
          <Link href="/store" className="block rounded-lg px-4 py-2 text-sm text-slate hover:bg-parchment">
            تصفح المتجر
          </Link>
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
