"use client";

import { useState } from "react";

const FF_D = "'Bricolage Grotesque', sans-serif";
const FF_B = "'Outfit', sans-serif";

const GRAIN_BG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.09'/%3E%3C/svg%3E")`;

const TESTFLIGHT_URL = "https://testflight.apple.com/join/p2vKqRSg";

function openTestFlight() {
  window.open(TESTFLIGHT_URL, "_blank", "noopener,noreferrer");
}

function PricingCard({
  plan,
  price,
  features,
  popular = false,
  delay = 0,
  subtitle,
  onCtaClick,
}: {
  plan: string;
  price: string;
  features: string[];
  popular?: boolean;
  delay?: number;
  subtitle?: string;
  onCtaClick?: () => void;
}) {
  const [h, setH] = useState(false);
  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        background: popular
          ? "linear-gradient(160deg, rgba(230,59,46,0.12), rgba(66,133,244,0.04))"
          : "rgba(255,255,255,0.02)",
        border: popular
          ? "1px solid rgba(230,59,46,0.35)"
          : "1px solid rgba(255,255,255,0.05)",
        borderRadius: 28,
        padding: "36px 28px",
        position: "relative",
        transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
        transform: h ? "translateY(-6px)" : "none",
        animation: `fadeInUp 0.8s ease ${delay}s both`,
        flex: 1,
        minWidth: 240,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: GRAIN_BG,
          backgroundSize: "150px",
          opacity: 0.35,
          pointerEvents: "none",
          borderRadius: 28,
        }}
      />
      {popular && (
        <div
          style={{
            position: "absolute",
            top: -13,
            left: "50%",
            transform: "translateX(-50%)",
            background: "linear-gradient(135deg, #F0A830, #E63B2E, #4285F4)",
            borderRadius: 20,
            padding: "5px 20px",
            fontSize: 12,
            fontWeight: 600,
            color: "#fff",
            fontFamily: FF_B,
            whiteSpace: "nowrap",
            zIndex: 2,
          }}
        >
          Best value
        </div>
      )}
      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            color: popular ? "#4285F4" : "rgba(255,255,255,0.45)",
            fontSize: 13,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: 16,
            fontFamily: FF_B,
          }}
        >
          {plan}
        </div>
        <div
          style={{
            marginBottom: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 2,
            }}
          >
            <span
              style={{
                fontSize: 44,
                fontWeight: 800,
                fontFamily: FF_D,
                color: "#fff",
              }}
            >
              {price === "0" ? "Free" : `€${price}`}
            </span>
            {price !== "0" && (
              <span
                style={{
                  color: "rgba(255,255,255,0.35)",
                  fontSize: 15,
                  fontFamily: FF_B,
                }}
              >
                /mo
              </span>
            )}
          </div>
          {subtitle && (
            <div
              style={{
                color: "rgba(255,255,255,0.35)",
                fontSize: 12.5,
                fontFamily: FF_B,
                fontWeight: 300,
                marginTop: 4,
              }}
            >
              {subtitle}
            </div>
          )}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 13,
            marginBottom: 28,
          }}
        >
          {features.map((f, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                color: "rgba(255,255,255,0.55)",
                fontSize: 13.5,
                fontFamily: FF_B,
              }}
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: popular
                    ? "rgba(230,59,46,0.2)"
                    : "rgba(255,255,255,0.05)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 10,
                  color: popular ? "#4285F4" : "rgba(255,255,255,0.35)",
                  flexShrink: 0,
                }}
              >
                ✓
              </div>
              {f}
            </div>
          ))}
        </div>
        <button
          onClick={onCtaClick}
          style={{
            width: "100%",
            padding: "14px 0",
            borderRadius: 16,
            border: popular ? "none" : "1px solid rgba(255,255,255,0.1)",
            background: popular
              ? "linear-gradient(135deg, #F0A830, #E63B2E, #4285F4)"
              : "transparent",
            color: "#fff",
            fontSize: 15,
            fontWeight: 600,
            fontFamily: FF_B,
            cursor: "pointer",
          }}
        >
          {popular ? "Join the beta" : "Get started"}
        </button>
      </div>
    </div>
  );
}

export function PricingSection() {
  return (
    <section style={{ padding: "80px 20px", maxWidth: 1100, margin: "0 auto" }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=Outfit:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <div
          style={{
            color: "#4285F4",
            fontSize: 13,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            marginBottom: 14,
            fontFamily: FF_B,
          }}
        >
          Pricing
        </div>
        <h2
          style={{
            fontSize: "clamp(28px, 4vw, 46px)",
            fontWeight: 800,
            fontFamily: FF_D,
            lineHeight: 1.1,
            color: "#fff",
          }}
        >
          Simple, transparent pricing.
        </h2>
        <p
          style={{
            color: "rgba(255,255,255,0.4)",
            fontSize: 16,
            fontWeight: 300,
            maxWidth: 440,
            margin: "16px auto 0",
            lineHeight: 1.6,
          }}
        >
          Start free, upgrade when you're ready. Boosts are available
          separately on all plans.
        </p>
      </div>
      <div
        style={{
          display: "flex",
          gap: 22,
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <PricingCard
          plan="Freemium"
          price="0"
          features={[
            "60 views per refresh",
            "5 visible taps",
            "5 stories",
            "6 photos in cache",
            "3 disappearing photos",
            "1 album (3 photos)",
            "RSVP to 3 events",
          ]}
          delay={0.1}
          onCtaClick={openTestFlight}
        />
        <PricingCard
          plan="Premium"
          price="7"
          subtitle="1 week free trial"
          features={[
            "500 views per refresh",
            "Unlimited taps & messaging",
            "Remote browsing (100 users)",
            "20 stories & 20 photos in cache",
            "6 disappearing photos",
            "3 albums (5 photos each)",
            "RSVP to 5 events",
            "See event participants",
            "Travel to 3 cities at once",
            "2 free boosts per month",
          ]}
          popular
          delay={0.2}
          onCtaClick={openTestFlight}
        />
        <PricingCard
          plan="Unlimited"
          price="20"
          features={[
            "Everything unlimited",
            "Unlimited remote browsing",
            "10 albums (10 photos each)",
            "Unlimited travel & events",
            "See event participants",
            "Chat translation",
            "1 free boost per week",
          ]}
          delay={0.3}
          onCtaClick={openTestFlight}
        />
      </div>
    </section>
  );
}
