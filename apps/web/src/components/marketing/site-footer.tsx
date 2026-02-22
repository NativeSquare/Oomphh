import { LOGO_SRC } from "./logo";

import Link from "next/link";

type FooterLink = { label: string; href: string };

const footerColumns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "How it works", href: "/how-it-works" },
      { label: "Download", href: "/download" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer
      className="relative z-[1] border-t border-white/[0.04] px-5 pb-6 pt-10 sm:px-12 sm:pb-7 sm:pt-14"
    >
      <div className="mx-auto flex max-w-[1200px] flex-col flex-wrap gap-8 sm:flex-row sm:justify-between sm:gap-9">
        <div className="max-w-full sm:max-w-[250px]">
          <div className="mb-3.5 flex items-center gap-1.5">
            <img
              src={LOGO_SRC}
              alt="oomphh"
              className="h-6 object-contain"
              style={{ mixBlendMode: "lighten" }}
            />
          </div>
          <p className="text-[12.5px] font-light leading-[1.7] text-white/30">
            Date people around you. Personality-first matching designed for
            real-life connections.
          </p>
          <div className="mt-4 flex gap-2.5">
            {[
              { label: "𝕏", href: "https://x.com/oomphh_app" },
              { label: "IG", href: "https://instagram.com/oomphh_app" },
              { label: "TT", href: "https://tiktok.com/@oomphh_app" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-[34px] w-[34px] items-center justify-center rounded-[10px] border border-white/5 bg-white/[0.03] text-xs font-semibold text-white/35 no-underline transition-colors hover:border-white/10 hover:text-white/55"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {footerColumns.map((col) => (
          <div key={col.title}>
            <div className="mb-3.5 text-[13px] font-semibold text-white">
              {col.title}
            </div>
            <div className="flex flex-col gap-2.5">
              {col.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[12.5px] font-light text-white/30 no-underline transition-colors hover:text-white/50"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-9 max-w-[1200px] border-t border-white/[0.04] pt-5 text-center text-[11.5px] font-light text-white/[0.18]">
        © {new Date().getFullYear()} oomphh, Inc. All rights reserved.
      </div>
    </footer>
  );
}
