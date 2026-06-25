import type { Metadata } from "next";
import { Cairo, Tajawal } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  weight: ["600", "700", "800"],
});

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  variable: "--font-tajawal",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "SOUMIA BRANDING — منصتك الرقمية المتكاملة",
  description:
    "خدمات ودورات ومنتجات رقمية ومحتوى تعليمي عربي في مكان واحد.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} ${tajawal.variable} font-body antialiased`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
