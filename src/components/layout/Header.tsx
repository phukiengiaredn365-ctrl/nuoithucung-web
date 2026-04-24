import Link from "next/link";
import { Search } from "lucide-react";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import { PRIMARY_MENU, SOCIAL_LINKS } from "@/lib/menu";
import DesktopNav from "./DesktopNav";
import {
  FacebookIcon,
  InstagramIcon,
  TiktokIcon,
  YoutubeIcon,
} from "@/components/ui/BrandIcons";

const SOCIAL_ICON = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
  music: TiktokIcon,
} as const;

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-100 bg-white/95 backdrop-blur">
      <div className="container-page flex h-16 items-center gap-4 lg:h-20">
        <div className="flex items-center gap-6">
          <Logo />
        </div>

        <DesktopNav items={PRIMARY_MENU} />

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            aria-label="Tìm kiếm"
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink-500 hover:bg-ink-100"
          >
            <Search className="h-[18px] w-[18px]" />
          </button>

          <div className="hidden items-center gap-1 md:flex">
            {SOCIAL_LINKS.map((s) => {
              const Icon = SOCIAL_ICON[s.icon];
              return (
                <Link
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-ink-500 transition hover:text-brand-teal"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </Link>
              );
            })}
          </div>

          <MobileMenu items={PRIMARY_MENU} />
        </div>
      </div>
    </header>
  );
}
