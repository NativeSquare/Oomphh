import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";

const GRAIN_BG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.09'/%3E%3C/svg%3E")`;
const DOT_BG =
  "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen text-foreground" style={{ background: "#070709" }}>
      {/* Grain texture */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          opacity: 0.55,
          backgroundImage: GRAIN_BG,
          backgroundSize: "200px 200px",
        }}
        aria-hidden
      />
      {/* Dot pattern */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          opacity: 0.35,
          backgroundImage: DOT_BG,
          backgroundSize: "28px 28px",
        }}
        aria-hidden
      />
      {/* Vignette */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)",
        }}
        aria-hidden
      />

      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
