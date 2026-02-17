import Link from "next/link";

const footerLinks = [
  { href: "/features", label: "Features" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/about", label: "About" },
  { href: "/download", label: "Download" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border/50 py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <Link
            href="/"
            className="text-lg font-bold tracking-tight text-foreground"
          >
            Oomphh
          </Link>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Link
            href="/download"
            className="text-sm font-medium text-primary transition-opacity hover:opacity-90"
          >
            Get the app →
          </Link>
        </div>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Oomphh. Find your people, where it
          matters.
        </p>
      </div>
    </footer>
  );
}
