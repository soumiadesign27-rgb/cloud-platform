import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";

async function createOrder(productId: string, price: number) {
  "use server";
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?redirect=/store");

  const { data: order } = await supabase
    .from("orders")
    .insert({ user_id: user!.id, total: price, status: "pending" })
    .select()
    .single();

  if (order) {
    await supabase.from("order_items").insert({
      order_id: order.id,
      product_id: productId,
      price,
    });
  }

  redirect("/dashboard?ordered=1");
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: product } = await supabase.from("products").select("*").eq("slug", slug).single();
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6">
      {product.thumbnail_url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={product.thumbnail_url} alt={product.title} className="h-72 w-full rounded-2xl object-cover" />
      )}

      <header className="mt-8 text-right">
        <h1 className="font-display text-3xl font-extrabold text-ink">{product.title}</h1>
        <p className="mt-3 text-slate">{product.description}</p>
      </header>

      <div className="mt-8 flex items-center justify-between rounded-2xl border border-ink/10 bg-white p-6">
        <span className="font-display text-2xl font-extrabold text-teal">{product.price} د.ج</span>
        <form action={createOrder.bind(null, product.id, product.price)}>
          <button className="rounded-full bg-ink px-6 py-3 font-bold text-parchment hover:bg-teal">
            شراء الآن
          </button>
        </form>
      </div>
      <p className="mt-3 text-xs text-slate">
        * هذا طلب أولي يُسجَّل بحالة "قيد الانتظار" — يحتاج المشروع لربط وسيلة دفع فعلية (مثل Stripe أو بوابة دفع محلية) لتفعيل الدفع وتحديث الحالة إلى "مدفوع" تلقائياً.
      </p>
    </div>
  );
}
