"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import type { MenuItem } from "@/lib/types";

export default function MobileMenu({ items }: { items: MenuItem[] }) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Đóng menu" : "Mở menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 items-center justify-center rounded-full text-ink-700 hover:bg-ink-100 lg:hidden"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open ? (
        <div className="fixed inset-x-0 top-16 z-30 h-[calc(100vh-4rem)] overflow-y-auto bg-white lg:hidden">
          <nav aria-label="Mobile" className="container-page py-4">
            <ul className="divide-y divide-ink-100">
              {items.map((item) => {
                const hasChildren = !!item.children?.length;
                const isOpen = expanded === item.href;
                return (
                  <li key={item.href} className="py-1">
                    <div className="flex items-center">
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="flex-1 py-3 text-base font-medium text-ink-700"
                      >
                        {item.label}
                      </Link>
                      {hasChildren ? (
                        <button
                          type="button"
                          aria-label={isOpen ? "Thu gọn" : "Mở rộng"}
                          aria-expanded={isOpen}
                          onClick={() =>
                            setExpanded((v) =>
                              v === item.href ? null : item.href
                            )
                          }
                          className="p-2 text-ink-400"
                        >
                          <ChevronDown
                            className={`h-4 w-4 transition ${
                              isOpen ? "rotate-180 text-brand-teal" : ""
                            }`}
                          />
                        </button>
                      ) : null}
                    </div>

                    {hasChildren && isOpen ? (
                      <ul className="pb-3 pl-2">
                        {item.children!.map((c) => (
                          <li key={c.href}>
                            <Link
                              href={c.href}
                              onClick={() => setOpen(false)}
                              className="block rounded-md px-3 py-2 text-sm text-ink-500 hover:bg-ink-100 hover:text-brand-brown"
                            >
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      ) : null}
    </>
  );
}
