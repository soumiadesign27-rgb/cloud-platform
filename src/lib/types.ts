export type Profile = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  role: "user" | "admin";
  membership_tier: "free" | "pro" | "business";
  created_at: string;
};

export type Service = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  price: number;
  icon: string | null;
  image_url: string | null;
  is_active: boolean;
};

export type Course = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  thumbnail_url: string | null;
  price: number;
  is_free: boolean;
  instructor_name: string | null;
  level: "beginner" | "intermediate" | "advanced";
};

export type Product = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  price: number;
  file_url: string | null;
  thumbnail_url: string | null;
  category: string | null;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  cover_image: string | null;
  created_at: string;
};

export type LibraryItem = {
  id: string;
  title: string;
  description: string | null;
  file_url: string;
  category: string | null;
  downloads_count: number;
};
