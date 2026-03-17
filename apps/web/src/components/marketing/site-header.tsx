"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LOGO_SRC } from "./logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 z-[100] w-full border-b border-white/[0.04] bg-[rgba(7,7,9,0.7)] backdrop-blur-[24px] backdrop-saturate-[1.3]">
      <div className="flex h-14 items-center justify-between px-4 sm:px-12">
        <Link href="/" className="flex items-center gap-1.5">
          <img
            src={LOGO_SRC}
            alt="OOmphh"
            className="h-7 object-contain sm:h-8"
            style={{ mixBlendMode: "lighten" }}
          />
        </Link>
        <nav className="hidden items-center gap-8 sm:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors duration-300",
                pathname === link.href
                  ? "text-[#FF9A56]"
                  : "text-white/55 hover:text-[#FF9A56]",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/download"
          className="rounded-[14px] bg-gradient-to-br from-[#FF6B2C] to-[#FF9A56] px-4 py-2 text-xs font-semibold text-white shadow-[0_4px_16px_rgba(255,107,44,0.3)] sm:px-6 sm:py-2.5 sm:text-sm"
        >
          Download app
        </Link>
      </div>
    </header>
  );
}
