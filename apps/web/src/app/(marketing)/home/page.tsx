"use client";

import { useState, useEffect, useRef } from "react";

const FONT_URL =
  "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=Outfit:wght@300;400;500;600;700&display=swap";

const FF_D = "'Bricolage Grotesque', sans-serif";
const FF_B = "'Outfit', sans-serif";

// Hook for responsive design
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isMobile;
}

function useIsTablet() {
  const [isTablet, setIsTablet] = useState(false);
  useEffect(() => {
    const check = () => setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isTablet;
}
const LOGO_SRC = "/oomphh-logo.png";

const AVS = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=120&h=120&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&h=120&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop&crop=face",
];

const GRAIN_BG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.09'/%3E%3C/svg%3E")`;

// ─── SVG filter definitions for text grain ───
function GrainFilters() {
  return (
    <svg
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
      aria-hidden="true"
    >
      <defs>
        <filter id="textGrain" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="3"
            seed="2"
            result="noise"
          />
          <feColorMatrix
            type="saturate"
            values="0"
            in="noise"
            result="grayNoise"
          />
          <feBlend
            in="SourceGraphic"
            in2="grayNoise"
            mode="overlay"
            result="blended"
          />
          <feComposite in="blended" in2="SourceGraphic" operator="in" />
        </filter>
      </defs>
    </svg>
  );
}

function SectionTexture({
  glowColor = "rgba(230,59,46,0.04)",
  glowPos = "50% 30%",
  children,
  style = {},
  id,
}: {
  glowColor?: string;
  glowPos?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  id?: string;
}) {
  return (
    <div id={id} style={{ position: "relative", ...style }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: GRAIN_BG,
          backgroundSize: "200px 200px",
          opacity: 0.55,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at ${glowPos}, ${glowColor} 0%, transparent 60%)`,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(255,255,255,0.02) 79px, rgba(255,255,255,0.02) 80px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}

function AnimCount({ target, dur = 2200 }: { target: number; dur?: number }) {
  const [c, setC] = useState(0);
  const ref = useRef(null);
  const ran = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !ran.current) {
          ran.current = true;
          const s = Date.now();
          const t = () => {
            const p = Math.min((Date.now() - s) / dur, 1);
            setC(Math.floor((1 - Math.pow(1 - p, 3)) * target));
            if (p < 1) requestAnimationFrame(t);
          };
          requestAnimationFrame(t);
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, dur]);
  return <span ref={ref}>{c.toLocaleString()}</span>;
}

function ProximityRadar() {
  const [hov, setHov] = useState(false);
  const dots = [
    { src: AVS[0], x: 20, y: 16, s: 34, d: 0 },
    { src: AVS[1], x: 74, y: 22, s: 30, d: 0.3 },
    { src: AVS[2], x: 12, y: 62, s: 28, d: 0.6 },
    { src: AVS[3], x: 80, y: 65, s: 32, d: 0.9 },
    { src: AVS[6], x: 48, y: 10, s: 26, d: 0.5 },
    { src: AVS[7], x: 58, y: 80, s: 29, d: 1.1 },
    { src: AVS[5], x: 88, y: 42, s: 27, d: 0.8 },
  ];
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "rgba(12,12,15,0.8)",
        backdropFilter: "blur(28px) saturate(1.3)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 28,
        padding: 24,
        width: 270,
        transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
        transform: hov ? "translateY(-6px) scale(1.02)" : "none",
        boxShadow: hov
          ? "0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(230,59,46,0.2), 0 0 40px rgba(230,59,46,0.08)"
          : "0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: GRAIN_BG,
          backgroundSize: "150px 150px",
          opacity: 0.5,
          pointerEvents: "none",
          borderRadius: 28,
        }}
      />
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 175,
          marginBottom: 14,
          zIndex: 1,
        }}
      >
        {[1, 2, 3].map((r) => (
          <div
            key={r}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: r * 65,
              height: r * 65,
              borderRadius: "50%",
              border: `1px solid rgba(230,59,46,${0.14 - r * 0.025})`,
              transform: "translate(-50%,-50%)",
              animation: `radarPulse 3.5s ease-in-out ${r * 0.4}s infinite`,
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 120,
            height: 120,
            transform: "translate(-50%,-50%)",
            borderRadius: "50%",
            background:
              "conic-gradient(from 0deg, transparent 0%, rgba(230,59,46,0.18) 12%, transparent 25%)",
            animation: "radarSweep 3.5s linear infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #F0A830, #E63B2E, #4285F4)",
            boxShadow:
              "0 0 16px rgba(230,59,46,0.6), 0 0 32px rgba(230,59,46,0.2)",
            zIndex: 3,
          }}
        />
        {dots.map((a, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${a.x}%`,
              top: `${a.y}%`,
              width: a.s,
              height: a.s,
              borderRadius: "50%",
              overflow: "hidden",
              animation: `avatarPop 0.4s ease ${a.d + 0.3}s both, floatBubble 7s ease-in-out ${a.d}s infinite`,
              border: "2px solid rgba(230,59,46,0.35)",
              boxShadow: "0 2px 10px rgba(0,0,0,0.5)",
              zIndex: 2,
            }}
          >
            <img
              src={a.src}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            marginBottom: 5,
          }}
        >
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#22c55e",
              animation: "blink 2s ease-in-out infinite",
            }}
          />
          <span
            style={{
              color: "rgba(255,255,255,0.45)",
              fontSize: 11.5,
              fontFamily: FF_B,
            }}
          >
            Live around you
          </span>
        </div>
        <div
          style={{
            fontSize: 34,
            fontWeight: 700,
            fontFamily: FF_D,
            background: "linear-gradient(135deg, #F0A830, #E63B2E, #4285F4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1.1,
          }}
        >
          <AnimCount target={247} />
        </div>
        <div
          style={{
            color: "rgba(255,255,255,0.35)",
            fontSize: 12.5,
            fontFamily: FF_B,
            fontWeight: 300,
            marginTop: 2,
          }}
        >
          people already signed up nearby
        </div>
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 12 }}
        >
          {AVS.slice(0, 5).map((s, i) => (
            <img
              key={i}
              src={s}
              alt=""
              style={{
                width: 26,
                height: 26,
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #111",
                marginLeft: i ? -7 : 0,
                zIndex: 5 - i,
              }}
            />
          ))}
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #F0A830, #E63B2E, #4285F4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 9,
              fontWeight: 700,
              color: "#fff",
              marginLeft: -7,
              fontFamily: FF_B,
            }}
          >
            +
          </div>
        </div>
      </div>
    </div>
  );
}

function PhotoAvatar({
  src,
  size = 56,
  top,
  left,
  right,
  bottom,
  delay = 0,
  online = false,
}: {
  src: string;
  size?: number;
  top?: string | number;
  left?: string | number;
  right?: string | number;
  bottom?: string | number;
  delay?: number;
  online?: boolean;
}) {
  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        right,
        bottom,
        width: size,
        height: size,
        borderRadius: "50%",
        animation: `floatBubble 7s ease-in-out ${delay}s infinite`,
        zIndex: 2,
      }}
    >
      <img
        src={src}
        alt=""
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          objectFit: "cover",
          border: "3px solid rgba(255,255,255,0.1)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.45)",
        }}
      />
      {online && (
        <div
          style={{
            position: "absolute",
            bottom: 2,
            right: 2,
            width: 13,
            height: 13,
            borderRadius: "50%",
            background: "#22c55e",
            border: "2.5px solid #070709",
          }}
        />
      )}
    </div>
  );
}

function Sparkle({ size = 24, color = "#E63B2E", style = {} }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={style}
    >
      <path
        d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z"
        fill={color}
      />
    </svg>
  );
}

function StarDecor({ size = 40, color = "#fff", style = {} }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      style={style}
    >
      <path d="M20 0C20 0 23 15 20 20C17 15 20 0 20 0Z" fill={color} />
      <path d="M40 20C40 20 25 23 20 20C25 17 40 20 40 20Z" fill={color} />
      <path d="M20 40C20 40 17 25 20 20C23 25 20 40 20 40Z" fill={color} />
      <path d="M0 20C0 20 15 17 20 20C15 23 0 20 0 20Z" fill={color} />
    </svg>
  );
}

function HeartIcon({ size = 20, color = "#fff" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function PhoneMockup({
  children,
  rotate = 0,
  scale = 1,
  style = {},
}: {
  children: React.ReactNode;
  rotate?: number;
  scale?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        width: 280,
        height: 580,
        borderRadius: 44,
        background: "#111",
        border: "3px solid #252525",
        padding: 8,
        transform: `rotate(${rotate}deg) scale(${scale})`,
        boxShadow:
          "0 50px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 8,
          left: "50%",
          transform: "translateX(-50%)",
          width: 120,
          height: 28,
          borderRadius: 20,
          background: "#000",
          zIndex: 10,
        }}
      />
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 36,
          overflow: "hidden",
          background: "#0a0a0a",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function ProfileScreen() {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div
        style={{
          width: "100%",
          height: "68%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          src={AVS[2]}
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(transparent 40%, rgba(0,0,0,0.8) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 42,
            left: 16,
            right: 16,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: "rgba(0,0,0,0.3)",
              backdropFilter: "blur(10px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 14,
            }}
          >
            ←
          </div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              background: "linear-gradient(135deg, #F0A830, #E63B2E, #4285F4)",
              borderRadius: 20,
              padding: "5px 13px",
              fontSize: 12,
              fontWeight: 700,
              color: "#fff",
              fontFamily: FF_B,
            }}
          >
            <HeartIcon size={12} /> 94%
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 16,
            left: 16,
            color: "rgba(255,255,255,0.8)",
            fontSize: 12,
            fontFamily: FF_B,
          }}
        >
          📍 3 km
        </div>
      </div>
      <div style={{ padding: "14px 16px", background: "#0a0a0a" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 10,
          }}
        >
          <span
            style={{
              color: "#fff",
              fontSize: 21,
              fontWeight: 700,
              fontFamily: FF_D,
            }}
          >
            Sarah, 24
          </span>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#22c55e",
            }}
          />
        </div>
        <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
          {["Art", "Travel", "Coffee"].map((t) => (
            <span
              key={t}
              style={{
                padding: "4px 12px",
                borderRadius: 20,
                background: "rgba(230,59,46,0.15)",
                color: "#4285F4",
                fontSize: 11,
                fontWeight: 600,
                fontFamily: FF_B,
              }}
            >
              {t}
            </span>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 14 }}>
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(255,255,255,0.5)",
              fontSize: 18,
            }}
          >
            ✕
          </div>
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #F0A830, #E63B2E, #4285F4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 20px rgba(230,59,46,0.4)",
            }}
          >
            <HeartIcon size={22} />
          </div>
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(255,255,255,0.5)",
              fontSize: 18,
            }}
          >
            💬
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatScreen() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: "44px 14px 12px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span style={{ color: "#fff", fontSize: 14 }}>←</span>
        <img
          src={AVS[3]}
          alt=""
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        <div>
          <div
            style={{
              color: "#fff",
              fontSize: 14,
              fontWeight: 600,
              fontFamily: FF_B,
            }}
          >
            John, 26
          </div>
          <div style={{ color: "#22c55e", fontSize: 10, fontFamily: FF_B }}>
            Online
          </div>
        </div>
      </div>
      <div
        style={{
          flex: 1,
          padding: 14,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <div
          style={{
            alignSelf: "flex-end",
            background: "linear-gradient(135deg, #F0A830, #E63B2E, #4285F4)",
            borderRadius: "18px 18px 4px 18px",
            padding: "10px 14px",
            maxWidth: "78%",
            color: "#fff",
            fontSize: 12.5,
            fontFamily: FF_B,
            lineHeight: 1.5,
          }}
        >
          Hello! Glad to meet you!
        </div>
        <div
          style={{
            alignSelf: "flex-start",
            background: "rgba(255,255,255,0.08)",
            borderRadius: "18px 18px 18px 4px",
            padding: "10px 14px",
            maxWidth: "70%",
            color: "#fff",
            fontSize: 12.5,
            fontFamily: FF_B,
          }}
        >
          Hi! Me too 😊
        </div>
        <div
          style={{
            alignSelf: "flex-start",
            background: "rgba(255,255,255,0.08)",
            borderRadius: "18px 18px 18px 4px",
            padding: "10px 14px",
            display: "flex",
            alignItems: "center",
            gap: 8,
            maxWidth: "65%",
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "#E63B2E",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 10,
              color: "#fff",
              flexShrink: 0,
            }}
          >
            ⏸
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                height: 3,
                background: "rgba(255,255,255,0.15)",
                borderRadius: 2,
              }}
            >
              <div
                style={{
                  width: "40%",
                  height: "100%",
                  background: "#4285F4",
                  borderRadius: 2,
                }}
              />
            </div>
            <span
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: 9,
                fontFamily: FF_B,
              }}
            >
              0:13
            </span>
          </div>
        </div>
        <div
          style={{
            alignSelf: "flex-end",
            background: "linear-gradient(135deg, #F0A830, #E63B2E, #4285F4)",
            borderRadius: "18px 18px 4px 18px",
            padding: "10px 14px",
            color: "#fff",
            fontSize: 12.5,
            fontFamily: FF_B,
          }}
        >
          Want to grab coffee? ☕
        </div>
      </div>
      <div
        style={{
          padding: "10px 14px 28px",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div
          style={{
            flex: 1,
            background: "rgba(255,255,255,0.06)",
            borderRadius: 22,
            padding: "10px 16px",
            color: "rgba(255,255,255,0.3)",
            fontSize: 13,
            fontFamily: FF_B,
          }}
        >
          Type a message...
        </div>
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #F0A830, #E63B2E, #4285F4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
          }}
        >
          ➤
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
  delay = 0,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  delay?: number;
}) {
  const [h, setH] = useState(false);
  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        background: h
          ? "linear-gradient(135deg, rgba(230,59,46,0.1), rgba(66,133,244,0.04))"
          : "rgba(255,255,255,0.02)",
        border: `1px solid ${h ? "rgba(230,59,46,0.25)" : "rgba(255,255,255,0.05)"}`,
        borderRadius: 24,
        padding: "32px 26px",
        transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
        transform: h ? "translateY(-4px)" : "none",
        animation: `fadeInUp 0.8s ease ${delay}s both`,
        cursor: "default",
        position: "relative",
        overflow: "hidden",
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
          borderRadius: 24,
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: 16,
            background:
              "linear-gradient(135deg, rgba(230,59,46,0.15), rgba(230,59,46,0.05))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            marginBottom: 20,
          }}
        >
          {icon}
        </div>
        <div
          style={{
            color: "#fff",
            fontSize: 18,
            fontWeight: 700,
            fontFamily: FF_D,
            marginBottom: 10,
          }}
        >
          {title}
        </div>
        <div
          style={{
            color: "rgba(255,255,255,0.45)",
            fontSize: 14,
            lineHeight: 1.7,
            fontFamily: FF_B,
            fontWeight: 300,
          }}
        >
          {desc}
        </div>
      </div>
    </div>
  );
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

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [o, setO] = useState(false);
  return (
    <div
      onClick={() => setO(!o)}
      style={{
        background: o ? "rgba(230,59,46,0.07)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${o ? "rgba(230,59,46,0.2)" : "rgba(255,255,255,0.05)"}`,
        borderRadius: 20,
        padding: "20px 24px",
        cursor: "pointer",
        transition: "all 0.35s",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            color: o ? "#4285F4" : "#fff",
            fontSize: 15,
            fontWeight: 600,
            fontFamily: FF_B,
            transition: "color 0.3s",
          }}
        >
          {question}
        </span>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: o
              ? "linear-gradient(135deg, #F0A830, #E63B2E, #4285F4)"
              : "rgba(255,255,255,0.05)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: 18,
            transition: "all 0.3s",
            transform: o ? "rotate(45deg)" : "none",
            flexShrink: 0,
          }}
        >
          +
        </div>
      </div>
      <div
        style={{
          maxHeight: o ? 200 : 0,
          overflow: "hidden",
          transition: "max-height 0.4s ease",
        }}
      >
        <div
          style={{
            color: "rgba(255,255,255,0.45)",
            fontSize: 14,
            lineHeight: 1.7,
            fontFamily: FF_B,
            fontWeight: 300,
            marginTop: 14,
            paddingRight: 40,
          }}
        >
          {answer}
        </div>
      </div>
    </div>
  );
}

// Shared heading style — applies SVG grain filter
const HEADING_FILTER = { filter: "url(#textGrain)" };

const TESTFLIGHT_URL = "https://testflight.apple.com/join/p2vKqRSg";

function openTestFlight() {
  window.open(TESTFLIGHT_URL, "_blank", "noopener,noreferrer");
}

export default function OomphLanding() {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  useEffect(() => {
    const l = document.createElement("link");
    l.href = FONT_URL;
    l.rel = "stylesheet";
    document.head.appendChild(l);
  }, []);

  // Responsive values
  const sectionPadding = isMobile ? "60px 20px" : isTablet ? "80px 32px" : "110px 48px";
  const gridColumns = isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)";
  const heroTitleSize = isMobile ? 38 : isTablet ? 52 : 72;
  const heroSubtitleSize = isMobile ? 16 : 20;
  const sectionTitleSize = isMobile ? 28 : isTablet ? 36 : 46;

  return (
    <div
      style={{
        color: "#fff",
        fontFamily: FF_B,
        overflowX: "hidden",
      }}
    >
      <GrainFilters />

      <style>{`
        @keyframes floatBubble{0%,100%{transform:translateY(0)}50%{transform:translateY(-16px)}}
        @keyframes fadeInUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
        @keyframes phoneDrift{0%,100%{transform:translateY(0) rotate(-5deg)}50%{transform:translateY(-14px) rotate(-5deg)}}
        @keyframes phoneDrift2{0%,100%{transform:translateY(0) rotate(7deg)}50%{transform:translateY(-10px) rotate(7deg)}}
        @keyframes pulseGlow{0%,100%{opacity:0.3}50%{opacity:0.7}}
        @keyframes scaleIn{from{opacity:0;transform:scale(0.85)}to{opacity:1;transform:scale(1)}}
        @keyframes shimmer{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes radarPulse{0%,100%{transform:translate(-50%,-50%) scale(1);opacity:0.4}50%{transform:translate(-50%,-50%) scale(1.12);opacity:0.12}}
        @keyframes radarSweep{from{transform:translate(-50%,-50%) rotate(0)}to{transform:translate(-50%,-50%) rotate(360deg)}}
        @keyframes avatarPop{from{opacity:0;transform:scale(0)}to{opacity:1;transform:scale(1)}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0.35}}
        @keyframes driftSlow{0%,100%{transform:translate(0,0)}33%{transform:translate(15px,-10px)}66%{transform:translate(-10px,8px)}}
        ::selection{background:rgba(230,59,46,0.3);color:#fff}
      `}</style>

      {/* ═══ HERO ═══ */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          paddingTop: 100,
          paddingBottom: 40,
        }}
      >
        {/* Blobs */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          <svg
            viewBox="0 0 800 900"
            style={{
              position: "absolute",
              left: "-18%",
              bottom: "-15%",
              width: "60%",
              height: "120%",
              opacity: 0.7,
              animation: "driftSlow 20s ease-in-out infinite",
            }}
          >
            <defs>
              <linearGradient id="b1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF3D1F" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#E63B2E" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#4285F4" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            <path
              d="M150,800 C50,650 -50,500 80,350 C180,220 100,150 200,50 C300,-30 400,80 350,200 C300,320 450,280 500,400 C550,520 480,600 400,700 C320,800 250,850 150,800Z"
              fill="url(#b1)"
            />
          </svg>
          <svg
            viewBox="0 0 600 1000"
            style={{
              position: "absolute",
              right: "-14%",
              top: "0%",
              width: "55%",
              height: "110%",
              opacity: 0.6,
              animation: "driftSlow 25s ease-in-out 5s infinite",
            }}
          >
            <defs>
              <linearGradient id="b2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F0A830" stopOpacity="0.5" />
                <stop offset="40%" stopColor="#E63B2E" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#4285F4" stopOpacity="0.75" />
              </linearGradient>
            </defs>
            <path
              d="M400,0 C500,100 550,200 500,350 C450,500 550,550 500,700 C450,850 350,900 300,1000 L600,1000 L600,0Z"
              fill="url(#b2)"
            />
          </svg>
          <div
            style={{
              position: "absolute",
              top: "25%",
              left: "30%",
              width: 600,
              height: 600,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(230,59,46,0.06) 0%, transparent 60%)",
              filter: "blur(80px)",
              animation: "pulseGlow 8s ease-in-out infinite",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "-5%",
              left: "-5%",
              width: 400,
              height: 400,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(255,60,30,0.05) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "5%",
              right: "8%",
              width: 350,
              height: 350,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(240,168,48,0.05) 0%, transparent 60%)",
              filter: "blur(60px)",
              animation: "pulseGlow 10s ease-in-out 3s infinite",
            }}
          />
        </div>

        <StarDecor
          size={38}
          color="rgba(255,255,255,0.1)"
          style={{
            position: "absolute",
            top: "13%",
            left: "16%",
            zIndex: 2,
            animation: "pulseGlow 4s ease-in-out infinite",
          }}
        />
        <StarDecor
          size={54}
          color="rgba(255,255,255,0.07)"
          style={{
            position: "absolute",
            top: "18%",
            right: "18%",
            zIndex: 2,
            animation: "pulseGlow 5s ease-in-out 1s infinite",
          }}
        />
        <StarDecor
          size={28}
          color="rgba(240,168,48,0.18)"
          style={{
            position: "absolute",
            bottom: "28%",
            right: "14%",
            zIndex: 2,
            animation: "pulseGlow 3.5s ease-in-out 0.5s infinite",
          }}
        />
        <StarDecor
          size={34}
          color="rgba(230,59,46,0.14)"
          style={{
            position: "absolute",
            bottom: "32%",
            left: "8%",
            zIndex: 2,
            animation: "pulseGlow 4.5s ease-in-out 2s infinite",
          }}
        />
        <Sparkle
          size={16}
          color="rgba(240,168,48,0.22)"
          style={{ position: "absolute", top: "35%", left: "22%", zIndex: 2 }}
        />
        <Sparkle
          size={14}
          color="rgba(230,59,46,0.2)"
          style={{ position: "absolute", top: "45%", right: "20%", zIndex: 2 }}
        />

        {!isMobile && (
          <>
            <PhotoAvatar
              src={AVS[0]}
              size={58}
              top="18%"
              left="7%"
              delay={0}
              online
            />
            <PhotoAvatar src={AVS[1]} size={46} top="26%" right="8%" delay={1} />
            <PhotoAvatar
              src={AVS[2]}
              size={52}
              bottom="32%"
              left="10%"
              delay={1.8}
              online
            />
            <PhotoAvatar
              src={AVS[3]}
              size={42}
              bottom="26%"
              right="6%"
              delay={0.5}
              online
            />
            <PhotoAvatar src={AVS[4]} size={38} top="46%" left="4%" delay={2.2} />
            <PhotoAvatar
              src={AVS[5]}
              size={40}
              top="40%"
              right="3.5%"
              delay={1.4}
            />
          </>
        )}

        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 1,
            opacity: 0.05,
          }}
        >
          <line
            x1="11%"
            y1="22%"
            x2="44%"
            y2="38%"
            stroke="#fff"
            strokeWidth="0.5"
            strokeDasharray="6 8"
          />
          <line
            x1="89%"
            y1="30%"
            x2="57%"
            y2="43%"
            stroke="#fff"
            strokeWidth="0.5"
            strokeDasharray="6 8"
          />
          <line
            x1="14%"
            y1="66%"
            x2="41%"
            y2="53%"
            stroke="#fff"
            strokeWidth="0.5"
            strokeDasharray="6 8"
          />
          <line
            x1="91%"
            y1="70%"
            x2="59%"
            y2="56%"
            stroke="#fff"
            strokeWidth="0.5"
            strokeDasharray="6 8"
          />
        </svg>

        {/* Hero text */}
        <div
          style={{
            textAlign: "center",
            zIndex: 3,
            maxWidth: 680,
            padding: "0 24px",
            animation: "fadeInUp 1s ease both",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 30,
              padding: "7px 20px",
              marginBottom: 28,
              animation: "fadeInUp 0.8s ease 0.1s both",
            }}
          >
            <Sparkle size={12} color="#4285F4" />
            <span
              style={{
                color: "rgba(255,255,255,0.55)",
                fontSize: 13,
                fontWeight: 400,
              }}
            >
              Launching soon — join the early crew
            </span>
          </div>

          <h1
            style={{
              fontSize: heroTitleSize,
              fontWeight: 800,
              fontFamily: FF_D,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              marginBottom: isMobile ? 16 : 22,
              animation: "fadeInUp 0.8s ease 0.2s both",
            }}
          >
            <span style={HEADING_FILTER}>Date people</span>
            <br />
            <span
              style={{
                background:
                  "linear-gradient(135deg, #F0A830 0%, #E63B2E 40%, #4285F4 80%)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "shimmer 4s ease-in-out infinite",
              }}
            >
              around you
            </span>
            <span style={HEADING_FILTER}>.</span>
          </h1>

          <p
            style={{
              fontSize: heroSubtitleSize,
              color: "rgba(255,255,255,0.42)",
              lineHeight: 1.7,
              maxWidth: isMobile ? "100%" : 480,
              margin: isMobile ? "0 auto 28px" : "0 auto 36px",
              fontWeight: 300,
              animation: "fadeInUp 0.8s ease 0.35s both",
            }}
          >
            OOmphh shows you people nearby in real-time.
            Proximity and your own preferences — no algorithms deciding for you.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: 14,
              justifyContent: "center",
              alignItems: "center",
              animation: "fadeInUp 0.8s ease 0.5s both",
            }}
          >
            <a
              href="https://testflight.apple.com/join/p2vKqRSg"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "linear-gradient(135deg, #F0A830, #E63B2E, #4285F4)",
                border: "none",
                borderRadius: 18,
                padding: isMobile ? "14px 28px" : "15px 34px",
                color: "#fff",
                fontSize: isMobile ? 14 : 15,
                fontWeight: 600,
                fontFamily: FF_B,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 10,
                boxShadow: "0 8px 32px rgba(230,59,46,0.35)",
                width: isMobile ? "100%" : "auto",
                justifyContent: "center",
                textDecoration: "none",
              }}
            >
              Join the beta <span>→</span>
            </a>
            <button
              onClick={() =>
                document
                  .getElementById("features")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 18,
                padding: isMobile ? "14px 28px" : "15px 34px",
                color: "#fff",
                fontSize: isMobile ? 14 : 15,
                fontWeight: 500,
                fontFamily: FF_B,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                width: isMobile ? "100%" : "auto",
              }}
            >
              Explore <span style={{ fontSize: 13 }}>↓</span>
            </button>
          </div>
        </div>

        {/* Phones + Radar */}
        <div
          style={{
            position: "relative",
            zIndex: 3,
            marginTop: 56,
            animation: "scaleIn 1s ease 0.6s both",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              transform: isMobile ? "scale(0.75)" : "none",
              transformOrigin: "center top",
            }}
          >
            <div
              style={{
                animation: "phoneDrift 8s ease-in-out infinite",
                zIndex: 2,
              }}
            >
              <PhoneMockup rotate={isMobile ? 0 : -5} scale={isMobile ? 1 : 0.88}>
                <img
                  src="/Other User Profile.png"
                  alt="Oomphh profile screen"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </PhoneMockup>
            </div>
            {!isMobile && (
              <div
                style={{
                  animation: "phoneDrift2 7s ease-in-out 1s infinite",
                  marginLeft: -50,
                  marginBottom: -30,
                  zIndex: 1,
                }}
              >
                <PhoneMockup rotate={7} scale={0.82} style={{ opacity: 0.92 }}>
                  <img
                    src="/Group Chat.png"
                    alt="Oomphh chat screen"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </PhoneMockup>
              </div>
            )}
          </div>
          <div
            style={{
              position: "absolute",
              top: 30,
              right: -310,
              zIndex: 10,
              animation: "fadeInUp 1s ease 1.2s both",
            }}
          >
            <ProximityRadar />
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 40,
              left: -50,
              width: 50,
              height: 50,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #F0A830, #E63B2E, #4285F4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 28px rgba(230,59,46,0.4)",
              animation: "floatBubble 5s ease-in-out infinite",
              zIndex: 5,
            }}
          >
            <HeartIcon size={22} />
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 200,
            background: "linear-gradient(transparent, #070709)",
            zIndex: 4,
          }}
        />
      </section>

      {/* ═══ SOCIAL PROOF ═══ */}
      <SectionTexture
        glowColor="rgba(230,59,46,0.05)"
        glowPos="50% 50%"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.04)",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
          position: "relative",
          zIndex: 5,
        }}
      >
        <div
          style={{
            padding: "56px 48px",
            display: "flex",
            justifyContent: "center",
            gap: 72,
          }}
        >
          {[
            { n: "Open beta", l: "Join now on TestFlight" },
            { n: "Real-time", l: "Proximity radar" },
            { n: "Free to start", l: "Upgrade anytime" },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                textAlign: "center",
                animation: `fadeInUp 0.8s ease ${0.1 + i * 0.1}s both`,
              }}
            >
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 700,
                  fontFamily: FF_D,
                  background: "linear-gradient(135deg, #F0A830, #E63B2E, #4285F4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  lineHeight: 1.2,
                  marginBottom: 4,
                  ...HEADING_FILTER,
                }}
              >
                {s.n}
              </div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </SectionTexture>

      {/* ═══ FEATURES ═══ */}
      <SectionTexture
        id="features"
        glowColor="rgba(230,59,46,0.03)"
        glowPos="50% 20%"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div
          style={{ padding: sectionPadding, maxWidth: 1200, margin: "0 auto" }}
        >
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
              What makes us different
            </div>
            <h2
              style={{
                fontSize: sectionTitleSize,
                fontWeight: 800,
                fontFamily: FF_D,
                lineHeight: 1.1,
                ...HEADING_FILTER,
              }}
            >
              Built for<span style={{ color: "#E63B2E" }}> real life</span>{" "}
              dating
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: gridColumns,
              gap: isMobile ? 16 : 22,
            }}
          >
            <FeatureCard
              icon="📍"
              title="Proximity Radar"
              desc="See who's around you right now. No more matching with someone across the city — meet people you can actually grab coffee with."
              delay={0.1}
            />
            <FeatureCard
              icon="🔒"
              title="Privacy by Design"
              desc="You control whether your profile is searchable, and all chats are end-to-end encrypted."
              delay={0.2}
            />
            <FeatureCard
              icon="💬"
              title="Rich Conversations"
              desc="Text and chat — the easiest way to connect. Plus personally configured icebreakers when you don't know what to say."
              delay={0.3}
            />
          </div>

        </div>
      </SectionTexture>

      {/* ═══ HOW IT WORKS ═══ */}
      <SectionTexture
        glowColor="rgba(66,133,244,0.04)"
        glowPos="30% 50%"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div
          style={{
            padding: sectionPadding,
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            gap: 80,
            alignItems: "center",
          }}
        >
          <div style={{ flex: 1 }}>
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
              How it works
            </div>
            <h2
              style={{
                fontSize: 44,
                fontWeight: 800,
                fontFamily: FF_D,
                lineHeight: 1.15,
                marginBottom: 44,
              }}
            >
              <span style={HEADING_FILTER}>From download to</span>
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #F0A830, #E63B2E, #4285F4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                first date
              </span>
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
              {[
                {
                  n: "1",
                  t: "Grab your spot",
                  d: "Sign up with early access. Set up your profile, add your best photos, and pick your interests.",
                },
                {
                  n: "2",
                  t: "See who's nearby",
                  d: "Browse compatible profiles in your area. The closer they are, the easier it is to meet.",
                },
                {
                  n: "3",
                  t: "Make it happen",
                  d: "Match, message, and meet. No pen pals — OOmphh is designed for people who want to connect IRL.",
                },
              ].map((s, i) => (
                <div
                  key={i}
                  style={{ display: "flex", alignItems: "flex-start", gap: 18 }}
                >
                  <div
                    style={{
                      minWidth: 52,
                      height: 52,
                      borderRadius: 16,
                      background: "linear-gradient(135deg, #F0A830, #E63B2E, #4285F4)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                      fontWeight: 800,
                      color: "#fff",
                      fontFamily: FF_D,
                    }}
                  >
                    {s.n}
                  </div>
                  <div>
                    <div
                      style={{
                        color: "#fff",
                        fontSize: 17,
                        fontWeight: 700,
                        fontFamily: FF_D,
                        marginBottom: 5,
                      }}
                    >
                      {s.t}
                    </div>
                    <div
                      style={{
                        color: "rgba(255,255,255,0.4)",
                        fontSize: 13.5,
                        lineHeight: 1.65,
                        fontWeight: 300,
                      }}
                    >
                      {s.d}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              flex: 0.75,
              display: "flex",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: 340,
                height: 340,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(230,59,46,0.08) 0%, transparent 70%)",
                filter: "blur(40px)",
              }}
            />
            <div style={{ animation: "phoneDrift 7s ease-in-out infinite" }}>
              <PhoneMockup rotate={-2} scale={1}>
                <img
                  src="/Home.png"
                  alt="Oomphh home screen"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </PhoneMockup>
            </div>
          </div>
        </div>
      </SectionTexture>

      {/* ═══ FAQ ═══ */}
      <SectionTexture
        glowColor="rgba(230,59,46,0.03)"
        glowPos="50% 30%"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div style={{ padding: sectionPadding, maxWidth: 700, margin: "0 auto" }}>
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
              FAQ
            </div>
            <h2
              style={{
                fontSize: sectionTitleSize,
                fontWeight: 800,
                fontFamily: FF_D,
                lineHeight: 1.1,
                ...HEADING_FILTER,
              }}
            >
              Got questions?
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <FAQItem
              question="How does the proximity feature work?"
              answer="OOmphh uses your precise location to show people who are nearby. If someone is in your area, they'll appear. You can go invisible anytime."
            />
            <FAQItem
              question="When does OOmphh launch?"
              answer="We're in open beta right now! Download OOmphh on TestFlight and start connecting — early adopters get premium features for free."
            />
            <FAQItem
              question="Is OOmphh free to use?"
              answer="Yes — the Freemium plan is completely free with 60 views, 5 visible taps, and core features. Premium (€7/mo) and Unlimited (€20/mo) plans unlock more views, unlimited taps, remote browsing, travel, and boosts."
            />
            <FAQItem
              question="How is OOmphh different from Happn or Tinder?"
              answer="Happn shows you people you crossed paths with. Tinder is swiping. OOmphh shows you everyone nearby and lets you filter on your own terms."
            />
          </div>
        </div>
      </SectionTexture>

      {/* ═══ CTA ═══ */}
      <SectionTexture
        id="waitlist"
        glowColor="rgba(230,59,46,0.06)"
        glowPos="50% 50%"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div style={{ padding: sectionPadding, textAlign: "center" }}>
          <div style={{ position: "relative", zIndex: 2 }}>
            <h2
              style={{
                fontSize: 54,
                fontWeight: 800,
                fontFamily: FF_D,
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
                marginBottom: 18,
              }}
            >
              <span style={HEADING_FILTER}>Your person might be</span>
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #F0A830, #E63B2E, #4285F4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                around the corner
              </span>
              <span style={HEADING_FILTER}>.</span>
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: 17,
                fontWeight: 300,
                maxWidth: 440,
                margin: "0 auto 36px",
                lineHeight: 1.7,
              }}
            >
              Join the beta and be among the first to experience OOmphh.
            </p>
            <a
              href="https://testflight.apple.com/join/p2vKqRSg"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: "linear-gradient(135deg, #F0A830, #E63B2E, #4285F4)",
                border: "none",
                borderRadius: 18,
                padding: "16px 36px",
                color: "#fff",
                fontSize: 16,
                fontWeight: 600,
                fontFamily: FF_B,
                cursor: "pointer",
                boxShadow: "0 8px 32px rgba(230,59,46,0.35)",
                textDecoration: "none",
              }}
            >
              Join the beta on TestFlight →
            </a>
            <p
              style={{
                color: "rgba(255,255,255,0.25)",
                fontSize: 12,
                marginTop: 14,
                fontWeight: 300,
              }}
            >
              Available now on iOS via TestFlight.
            </p>
          </div>
        </div>
      </SectionTexture>

    </div>
  );
}
