import Link from "next/link";
import NewsletterBar from "./NewsletterBar";
import { PRIMARY_MENU } from "@/lib/menu";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16">
      <NewsletterBar />

      <div className="bg-white">
        <div className="container-page grid gap-10 py-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <p className="font-serif text-xl font-bold text-brand-brown">
              PetCare
            </p>
            <p className="mt-2 text-sm text-ink-500">
              Kiến thức &amp; deal hữu ích cho Sen nuôi chó mèo. Tất cả bài viết
              được kiểm chứng bởi đội ngũ PetCare.
            </p>
          </div>

          {PRIMARY_MENU.slice(0, 3).map((item) => (
            <div key={item.href}>
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand-brown">
                {item.label}
              </p>
              <ul className="mt-3 space-y-2 text-sm text-ink-500">
                {item.children?.map((c) => (
                  <li key={c.href}>
                    <Link
                      href={c.href}
                      className="transition hover:text-brand-teal"
                    >
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-ink-100">
          <div className="container-page flex flex-col items-start justify-between gap-3 py-5 text-xs text-ink-400 sm:flex-row sm:items-center">
            <p>© {year} NuoiThuCung.com — PetCare Knowledge &amp; Affiliate Hub.</p>
            <p>
              Liên hệ hợp tác:{" "}
              <a
                className="text-brand-teal hover:underline"
                href="mailto:hello@nuoithucung.com"
              >
                hello@nuoithucung.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
