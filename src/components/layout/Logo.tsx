import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      aria-label="PetCare – NuoiThuCung.com"
      className="flex items-center gap-2.5"
    >
      <svg
        viewBox="0 0 48 48"
        className="h-9 w-9"
        aria-hidden
        role="presentation"
      >
        <circle cx="14" cy="16" r="5" fill="#ff9934" />
        <circle cx="28" cy="12" r="4.5" fill="#ff9934" />
        <circle cx="40" cy="18" r="4" fill="#ff9934" />
        <circle cx="8" cy="28" r="3.5" fill="#ff9934" />
        <path
          d="M15 38c0-7 6-11 11-11s11 4 11 11-4 6-11 6-11 0-11-6z"
          fill="#ff9934"
        />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-serif text-2xl font-bold text-brand-brown">
          PetCare
        </span>
        <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-ink-400">
          Knowledge &amp; Affiliate Hub
        </span>
      </span>
    </Link>
  );
}
