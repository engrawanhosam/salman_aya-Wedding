import type { Metadata, Viewport } from "next";
import { Amiri, Tajawal, Cormorant_Garamond, Aref_Ruqaa } from "next/font/google";
import { invitation } from "@/data/invitation";
import "./globals.css";

const amiri = Amiri({ subsets: ["arabic", "latin"], weight: ["400", "700"], variable: "--font-amiri", display: "swap" });
const aref = Aref_Ruqaa({ subsets: ["arabic", "latin"], weight: ["400", "700"], variable: "--font-aref", display: "swap" });
const tajawal = Tajawal({ subsets: ["arabic", "latin"], weight: ["300", "400", "500", "700"], variable: "--font-tajawal", display: "swap" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500"], style: ["normal", "italic"], variable: "--font-cormorant", display: "swap" });

export const metadata: Metadata = {
  title: invitation.meta.title,
  description: invitation.meta.description,
  robots: { index: false, follow: false },
  openGraph: { title: invitation.meta.title, description: invitation.meta.description, type: "website", locale: "ar_AR" },
  // لإضافة صورة معاينة واتساب: ضعوا public/og.jpg ثم أضيفوا images: ["/og.jpg"] هنا
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#FBF7F0" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${amiri.variable} ${aref.variable} ${tajawal.variable} ${cormorant.variable}`}>
      <body>{children}</body>
    </html>
  );
}
