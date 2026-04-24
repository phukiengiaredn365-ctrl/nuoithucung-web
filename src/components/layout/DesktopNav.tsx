"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import type { MenuItem } from "@/lib/types";

export default function DesktopNav({ items }: { items: MenuItem[] }) {
  return (
    <nav
      aria-label="Primary"
      className="hidden flex-1 items-center justify-center lg:flex"
    >
      <ul className="flex items-center gap-7 text-sm font-medium text-ink-700">
        {items.map((item) => (
          <li key={item.href} className="group relative">
            <Link
              href={item.href}
              className="inline-flex items-center gap-1 py-6 transition hover:text-brand-brown"
            >
              {item.label}
              {item.children && item.children.length > 0 ? (
                <ChevronDown className="h-3.5 w-3.5 text-ink-400 transition group-hover:text-brand-brown" />
              ) : null}
            </Link>
            {item.children && item.children.length > 0 ? (
              <div
                className="invisible absolute left-1/2 top-full z-30 min-w-[220px] -translate-x-1/2 translate-y-1 rounded-xl border border-ink-100 bg-white p-2 opacity-0 shadow-lift transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100"
                role="menu"
              >
                <ul className="flex flex-col">
                  {item.children.map((c) => (
                    <li key={c.href}>
                      <Link
                        href={c.href}
                        role="menuitem"
                        className="block rounded-md px-3 py-2 text-sm text-ink-700 transition hover:bg-ink-100 hover:text-brand-brown"
                      >
                        {c.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </nav>
  );
}
