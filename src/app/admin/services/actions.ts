"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

function slugify(text: string) {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\u0600-\u06FF-]/g, "");
}

export async function createService(formData: FormData) {
  const supabase = await createClient();
  const title = String(formData.get("title"));

  await supabase.from("services").insert({
    title,
    slug: `${slugify(title)}-${Date.now().toString(36)}`,
    description: String(formData.get("description") || ""),
    price: Number(formData.get("price") || 0),
    icon: String(formData.get("icon") || "⚙️"),
    image_url: String(formData.get("image_url") || ""),
  });

  revalidatePath("/admin/services");
  revalidatePath("/services");
}

export async function toggleService(id: string, isActive: boolean) {
  const supabase = await createClient();
  await supabase.from("services").update({ is_active: !isActive }).eq("id", id);
  revalidatePath("/admin/services");
  revalidatePath("/services");
}

export async function deleteService(id: string) {
  const supabase = await createClient();
  await supabase.from("services").delete().eq("id", id);
  revalidatePath("/admin/services");
  revalidatePath("/services");
}
