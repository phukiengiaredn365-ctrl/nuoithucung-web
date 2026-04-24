import type { Metadata } from "next";
import { Playfair_Display, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  variable: "--font-be-vietnam-pro",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "NuoiThuCung.com — PetCare Knowledge & Affiliate Hub",
    template: "%s | NuoiThuCung.com",
  },
  description:
    "Kiến thức, review và deal hữu ích dành cho Sen nuôi chó mèo. Cập nhật mỗi tuần từ đội ngũ PetCare.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://nuoithucung.com"
  ),
  openGraph: {
    type: "website",
    siteName: "NuoiThuCung.com",
    locale: "vi_VN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={`${playfair.variable} ${beVietnam.variable}`}>
      <body className="min-h-screen bg-white text-ink-900">
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
