import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-ink/10 bg-ink text-parchment">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-4 md:px-6">
        <div>
          <p className="font-display text-lg font-extrabold">
            SOUMIA <span className="text-gold">BRANDING</span>
          </p>
          <p className="mt-3 text-sm text-parchment/70">
            منصتك الرقمية المتكاملة للخدمات، الدورات، والمنتجات الرقمية.
          </p>
        </div>

        <div>
          <p className="mb-3 font-bold text-gold">روابط سريعة</p>
          <ul className="space-y-2 text-sm text-parchment/70">
            <li><Link href="/services" className="hover:text-parchment">الخدمات</Link></li>
            <li><Link href="/courses" className="hover:text-parchment">الدورات</Link></li>
            <li><Link href="/store" className="hover:text-parchment">المتجر الرقمي</Link></li>
          </ul>
        </div>

        <div>
          <p className="mb-3 font-bold text-gold">المحتوى</p>
          <ul className="space-y-2 text-sm text-parchment/70">
            <li><Link href="/blog" className="hover:text-parchment">المدونة</Link></li>
            <li><Link href="/library" className="hover:text-parchment">المكتبة المجانية</Link></li>
          </ul>
        </div>

        <div>
          <p className="mb-3 font-bold text-gold">الحساب</p>
          <ul className="space-y-2 text-sm text-parchment/70">
            <li><Link href="/login" className="hover:text-parchment">تسجيل الدخول</Link></li>
            <li><Link href="/register" className="hover:text-parchment">إنشاء حساب</Link></li>
          </ul>
        </div>
      </div>
      <p className="border-t border-parchment/10 py-5 text-center text-xs text-parchment/50">
