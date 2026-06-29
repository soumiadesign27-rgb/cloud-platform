
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ServiceDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data: service } = await supabase
    .from("services")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!service) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6">
      <Link href="/services" className="text-sm text-teal hover:underline">
        ← جميع الخدمات
      </Link>

      <div className="mt-6 rounded-2xl border border-ink/10 bg-white p-8">
        <span className="text-4xl">{service.icon}</span>
        <h1 className="mt-4 font-display text-3xl font-extrabold text-ink">{service.title}</h1>
        <p className="mt-4 text-slate">{service.description}</p>

        <div className="mt-8 flex items-center justify-between border-t border-ink/10 pt-6">
          <span className="text-2xl font-bold text-teal">{service.price} د.ج</span>
          <a
            href={`https://wa.me/?text=${encodeURIComponent("مرحبًا، أرغب بطلب خدمة: " + service.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-gold px-6 py-3 font-bold text-ink transition hover:bg-gold-dark"
          >
            اطلب الآن عبر واتساب
          </a>
        </div>
      </div>
    </div>
  );
      }
