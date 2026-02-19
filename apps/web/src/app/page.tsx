"use client";

import { useState, useEffect, useRef } from "react";

const FONT_URL =
  "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=Outfit:wght@300;400;500;600;700&display=swap";

const FF_D = "'Bricolage Grotesque', sans-serif";
const FF_B = "'Outfit', sans-serif";
const LOGO_SRC =
  "data:image/png;base64,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";

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
const DOT_BG = "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)";

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
  glowColor = "rgba(255,107,44,0.04)",
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
          ? "0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,107,44,0.2), 0 0 40px rgba(255,107,44,0.08)"
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
              border: `1px solid rgba(255,107,44,${0.14 - r * 0.025})`,
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
              "conic-gradient(from 0deg, transparent 0%, rgba(255,107,44,0.18) 12%, transparent 25%)",
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
            background: "linear-gradient(135deg, #FF6B2C, #FF9A56)",
            boxShadow:
              "0 0 16px rgba(255,107,44,0.6), 0 0 32px rgba(255,107,44,0.2)",
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
              border: "2px solid rgba(255,107,44,0.35)",
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
            background: "linear-gradient(135deg, #FF6B2C, #FFBE7B)",
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
              background: "linear-gradient(135deg, #FF6B2C, #FF9A56)",
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

function Sparkle({ size = 24, color = "#FF6B2C", style = {} }) {
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
              background: "linear-gradient(135deg, #FF6B2C, #FF9A56)",
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
                background: "rgba(255,107,44,0.15)",
                color: "#FF9A56",
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
              background: "linear-gradient(135deg, #FF6B2C, #FF9A56)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 20px rgba(255,107,44,0.4)",
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
            background: "linear-gradient(135deg, #FF6B2C, #FF9A56)",
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
              background: "#FF6B2C",
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
                  background: "#FF9A56",
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
            background: "linear-gradient(135deg, #FF6B2C, #FF9A56)",
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
            background: "linear-gradient(135deg, #FF6B2C, #FF9A56)",
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
          ? "linear-gradient(135deg, rgba(255,107,44,0.1), rgba(255,154,86,0.04))"
          : "rgba(255,255,255,0.02)",
        border: `1px solid ${h ? "rgba(255,107,44,0.25)" : "rgba(255,255,255,0.05)"}`,
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
              "linear-gradient(135deg, rgba(255,107,44,0.15), rgba(255,107,44,0.05))",
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
}: {
  plan: string;
  price: string;
  features: string[];
  popular?: boolean;
  delay?: number;
}) {
  const [h, setH] = useState(false);
  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        background: popular
          ? "linear-gradient(160deg, rgba(255,107,44,0.12), rgba(255,154,86,0.04))"
          : "rgba(255,255,255,0.02)",
        border: popular
          ? "1px solid rgba(255,107,44,0.35)"
          : "1px solid rgba(255,255,255,0.05)",
        borderRadius: 28,
        padding: "36px 28px",
        position: "relative",
        transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
        transform: h ? "translateY(-6px)" : "none",
        animation: `fadeInUp 0.8s ease ${delay}s both`,
        flex: 1,
        minWidth: 240,
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
            background: "linear-gradient(135deg, #FF6B2C, #FF9A56)",
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
            color: popular ? "#FF9A56" : "rgba(255,255,255,0.45)",
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
            display: "flex",
            alignItems: "baseline",
            gap: 2,
            marginBottom: 24,
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
            ${price}
          </span>
          <span
            style={{
              color: "rgba(255,255,255,0.35)",
              fontSize: 15,
              fontFamily: FF_B,
            }}
          >
            /mo
          </span>
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
                    ? "rgba(255,107,44,0.2)"
                    : "rgba(255,255,255,0.05)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 10,
                  color: popular ? "#FF9A56" : "rgba(255,255,255,0.35)",
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
          style={{
            width: "100%",
            padding: "14px 0",
            borderRadius: 16,
            border: popular ? "none" : "1px solid rgba(255,255,255,0.1)",
            background: popular
              ? "linear-gradient(135deg, #FF6B2C, #FF9A56)"
              : "transparent",
            color: "#fff",
            fontSize: 15,
            fontWeight: 600,
            fontFamily: FF_B,
            cursor: "pointer",
          }}
        >
          {popular ? "Join early access" : "Get started"}
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
        background: o ? "rgba(255,107,44,0.07)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${o ? "rgba(255,107,44,0.2)" : "rgba(255,255,255,0.05)"}`,
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
            color: o ? "#FF9A56" : "#fff",
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
              ? "linear-gradient(135deg, #FF6B2C, #FF9A56)"
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

function NavLink({ children }: { children: React.ReactNode }) {
  const [h, setH] = useState(false);
  return (
    <a
      href="#"
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        color: h ? "#FF9A56" : "rgba(255,255,255,0.55)",
        textDecoration: "none",
        fontSize: 14,
        fontWeight: 500,
        fontFamily: FF_B,
        transition: "color 0.3s",
      }}
    >
      {children}
    </a>
  );
}

// Shared heading style — applies SVG grain filter
const HEADING_FILTER = { filter: "url(#textGrain)" };

export default function OomphLanding() {
  useEffect(() => {
    const l = document.createElement("link");
    l.href = FONT_URL;
    l.rel = "stylesheet";
    document.head.appendChild(l);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#070709",
        color: "#fff",
        fontFamily: FF_B,
        overflowX: "hidden",
      }}
    >
      {/* SVG filter defs — rendered once, used everywhere via filter: url(#textGrain) */}
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
        *{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth}
        ::selection{background:rgba(255,107,44,0.3);color:#fff}
      `}</style>

      {/* Global textures */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          opacity: 0.55,
          backgroundImage: GRAIN_BG,
          backgroundSize: "200px 200px",
        }}
      />
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          opacity: 0.35,
          backgroundImage: DOT_BG,
          backgroundSize: "28px 28px",
        }}
      />
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)",
        }}
      />

      {/* ═══ NAVBAR ═══ */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "14px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(7,7,9,0.7)",
          backdropFilter: "blur(24px) saturate(1.3)",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <img
            src={LOGO_SRC}
            alt="oomphh"
            style={{ height: 32, objectFit: "contain" }}
          />
        </div>
        <div style={{ display: "flex", gap: 32 }}>
          <NavLink>Features</NavLink>
          <NavLink>Pricing</NavLink>
          <NavLink>Reviews</NavLink>
          <NavLink>FAQ</NavLink>
        </div>
        <button
          style={{
            background: "linear-gradient(135deg, #FF6B2C, #FF9A56)",
            border: "none",
            borderRadius: 14,
            padding: "10px 26px",
            color: "#fff",
            fontSize: 14,
            fontWeight: 600,
            fontFamily: FF_B,
            cursor: "pointer",
            boxShadow: "0 4px 16px rgba(255,107,44,0.3)",
          }}
        >
          Join the waitlist
        </button>
      </nav>

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
                <stop offset="50%" stopColor="#FF6B2C" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#FF9A56" stopOpacity="0.4" />
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
                <stop offset="0%" stopColor="#FFBE7B" stopOpacity="0.5" />
                <stop offset="40%" stopColor="#FF9A56" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#FF6B2C" stopOpacity="0.75" />
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
                "radial-gradient(circle, rgba(255,107,44,0.06) 0%, transparent 60%)",
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
                "radial-gradient(circle, rgba(255,190,123,0.05) 0%, transparent 60%)",
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
          color="rgba(255,190,123,0.18)"
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
          color="rgba(255,107,44,0.14)"
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
          color="rgba(255,190,123,0.22)"
          style={{ position: "absolute", top: "35%", left: "22%", zIndex: 2 }}
        />
        <Sparkle
          size={14}
          color="rgba(255,107,44,0.2)"
          style={{ position: "absolute", top: "45%", right: "20%", zIndex: 2 }}
        />

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
            <Sparkle size={12} color="#FF9A56" />
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
              fontSize: 70,
              fontWeight: 800,
              fontFamily: FF_D,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              marginBottom: 22,
              animation: "fadeInUp 0.8s ease 0.2s both",
              ...HEADING_FILTER,
            }}
          >
            Date people
            <br />
            <span
              style={{
                background:
                  "linear-gradient(135deg, #FF6B2C 0%, #FFBE7B 40%, #FF6B2C 80%)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "shimmer 4s ease-in-out infinite",
              }}
            >
              around you
            </span>
            .
          </h1>

          <p
            style={{
              fontSize: 17,
              color: "rgba(255,255,255,0.42)",
              lineHeight: 1.7,
              maxWidth: 480,
              margin: "0 auto 36px",
              fontWeight: 300,
              animation: "fadeInUp 0.8s ease 0.35s both",
            }}
          >
            oomphh shows you compatible people nearby in real-time.
            Personality-first matching, so you skip the small talk and meet
            people who actually get you.
          </p>

          <div
            style={{
              display: "flex",
              gap: 14,
              justifyContent: "center",
              alignItems: "center",
              animation: "fadeInUp 0.8s ease 0.5s both",
            }}
          >
            <button
              style={{
                background: "linear-gradient(135deg, #FF6B2C, #FF9A56)",
                border: "none",
                borderRadius: 18,
                padding: "15px 34px",
                color: "#fff",
                fontSize: 15,
                fontWeight: 600,
                fontFamily: FF_B,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 10,
                boxShadow: "0 8px 32px rgba(255,107,44,0.35)",
              }}
            >
              Get early access <span>→</span>
            </button>
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
                padding: "15px 34px",
                color: "#fff",
                fontSize: 15,
                fontWeight: 500,
                fontFamily: FF_B,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
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
            }}
          >
            <div
              style={{
                animation: "phoneDrift 8s ease-in-out infinite",
                zIndex: 2,
              }}
            >
              <PhoneMockup rotate={-5} scale={0.88}>
                <ProfileScreen />
              </PhoneMockup>
            </div>
            <div
              style={{
                animation: "phoneDrift2 7s ease-in-out 1s infinite",
                marginLeft: -50,
                marginBottom: -30,
                zIndex: 1,
              }}
            >
              <PhoneMockup rotate={7} scale={0.82} style={{ opacity: 0.92 }}>
                <ChatScreen />
              </PhoneMockup>
            </div>
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
              background: "linear-gradient(135deg, #FF6B2C, #FF9A56)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 28px rgba(255,107,44,0.4)",
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
        glowColor="rgba(255,107,44,0.05)"
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
            { n: "Early access", l: "Now open — limited spots" },
            { n: "Personality-first", l: "AI-powered matching" },
            { n: "Real-time", l: "Proximity radar" },
            { n: "100% free", l: "During beta" },
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
                  background: "linear-gradient(135deg, #FF6B2C, #FFBE7B)",
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
        glowColor="rgba(255,107,44,0.03)"
        glowPos="50% 20%"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div
          style={{ padding: "110px 48px", maxWidth: 1200, margin: "0 auto" }}
        >
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div
              style={{
                color: "#FF9A56",
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
                fontSize: 46,
                fontWeight: 800,
                fontFamily: FF_D,
                lineHeight: 1.1,
                ...HEADING_FILTER,
              }}
            >
              Built for<span style={{ color: "#FF6B2C" }}> real life</span>{" "}
              dating
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 22,
            }}
          >
            <FeatureCard
              icon="📍"
              title="Proximity Radar"
              desc="See who's around you right now. No more matching with someone across the city — meet people you can actually grab coffee with."
              delay={0.1}
            />
            <FeatureCard
              icon="🧠"
              title="Personality Matching"
              desc="A quick test reveals what makes you tick. Our algorithm pairs you with people you'll actually click with."
              delay={0.2}
            />
            <FeatureCard
              icon="🔒"
              title="Privacy by Design"
              desc="Your location is never shared precisely. You control visibility radius, and all chats are end-to-end encrypted."
              delay={0.3}
            />
            <FeatureCard
              icon="💬"
              title="Rich Conversations"
              desc="Text, voice notes, video calls — every way to connect. Plus AI-powered icebreakers when you don't know what to say."
              delay={0.4}
            />
            <FeatureCard
              icon="⚡"
              title="Instant Boost"
              desc="Want more eyes on your profile? Boost yourself in your area and watch the matches roll in."
              delay={0.5}
            />
            <FeatureCard
              icon="🎯"
              title="Smart Filters"
              desc="Dial in exactly what you're looking for. Age, distance, interests, lifestyle — your call."
              delay={0.6}
            />
          </div>
        </div>
      </SectionTexture>

      {/* ═══ HOW IT WORKS ═══ */}
      <SectionTexture
        glowColor="rgba(255,154,86,0.04)"
        glowPos="30% 50%"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div
          style={{
            padding: "110px 48px",
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
                color: "#FF9A56",
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
                ...HEADING_FILTER,
              }}
            >
              From download to
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #FF6B2C, #FFBE7B)",
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
                  t: "Take the vibe check",
                  d: "A 2-minute personality quiz. No right answers — just be yourself. This is how we find your people.",
                },
                {
                  n: "3",
                  t: "See who's nearby",
                  d: "Open the radar. Browse compatible profiles in your area. The closer they are, the easier it is to meet.",
                },
                {
                  n: "4",
                  t: "Make it happen",
                  d: "Match, message, and meet. No pen pals — oomphh is designed for people who want to connect IRL.",
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
                      background: "linear-gradient(135deg, #FF6B2C, #FF9A56)",
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
                  "radial-gradient(circle, rgba(255,107,44,0.08) 0%, transparent 70%)",
                filter: "blur(40px)",
              }}
            />
            <div style={{ animation: "phoneDrift 7s ease-in-out infinite" }}>
              <PhoneMockup rotate={-2} scale={1}>
                <ProfileScreen />
              </PhoneMockup>
            </div>
          </div>
        </div>
      </SectionTexture>

      {/* ═══ PRICING ═══ */}
      <SectionTexture
        glowColor="rgba(255,107,44,0.04)"
        glowPos="50% 30%"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div
          style={{ padding: "110px 48px", maxWidth: 1100, margin: "0 auto" }}
        >
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div
              style={{
                color: "#FF9A56",
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
                fontSize: 46,
                fontWeight: 800,
                fontFamily: FF_D,
                lineHeight: 1.1,
                ...HEADING_FILTER,
              }}
            >
              Free during beta.
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
              Early adopters get full access for free. Here's what the plans
              will look like at launch.
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
              plan="Starter"
              price="4.99"
              features={[
                "1 daily boost",
                "Icon customization",
                "50 likes per day",
                "Basic filters",
              ]}
              delay={0.1}
            />
            <PricingCard
              plan="Advanced"
              price="19.99"
              features={[
                "Unlimited likes",
                "2 boosts per day",
                "Priority matching",
                "See who liked you",
              ]}
              popular
              delay={0.2}
            />
            <PricingCard
              plan="Gold"
              price="29.99"
              features={[
                "Everything in Advanced",
                "Unlimited boosts",
                "Write to anyone",
                "Read receipts",
              ]}
              delay={0.3}
            />
          </div>
        </div>
      </SectionTexture>

      {/* ═══ REVIEWS ═══ */}
      <SectionTexture
        glowColor="rgba(255,154,86,0.03)"
        glowPos="50% 40%"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div
          style={{ padding: "110px 48px", maxWidth: 1100, margin: "0 auto" }}
        >
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div
              style={{
                color: "#FF9A56",
                fontSize: 13,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                marginBottom: 14,
                fontFamily: FF_B,
              }}
            >
              Beta feedback
            </div>
            <h2
              style={{
                fontSize: 46,
                fontWeight: 800,
                fontFamily: FF_D,
                lineHeight: 1.1,
                ...HEADING_FILTER,
              }}
            >
              What early testers say
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 22,
            }}
          >
            {[
              {
                name: "Emma L.",
                role: "Beta tester",
                text: "The proximity radar is addictive. I matched with someone two streets away and we met the same evening. Game changer.",
                img: AVS[0],
              },
              {
                name: "Marcus T.",
                role: "Beta tester",
                text: "Finally an app that gets that dating should be local. The personality matching feels accurate and the UI is gorgeous.",
                img: AVS[3],
              },
              {
                name: "Sofia R.",
                role: "Beta tester",
                text: "I love how privacy-first it is. I control exactly who sees me and when. Plus the voice notes make convos feel way more real.",
                img: AVS[4],
              },
            ].map((r, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  borderRadius: 24,
                  padding: "30px 26px",
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
                    opacity: 0.3,
                    pointerEvents: "none",
                    borderRadius: 24,
                  }}
                />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ display: "flex", gap: 3, marginBottom: 16 }}>
                    {Array(5)
                      .fill(0)
                      .map((_, j) => (
                        <span
                          key={j}
                          style={{ color: "#FF9A56", fontSize: 14 }}
                        >
                          ★
                        </span>
                      ))}
                  </div>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.55)",
                      fontSize: 14,
                      lineHeight: 1.7,
                      fontWeight: 300,
                      marginBottom: 22,
                    }}
                  >
                    "{r.text}"
                  </p>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 12 }}
                  >
                    <img
                      src={r.img}
                      alt=""
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "2px solid rgba(255,107,44,0.2)",
                      }}
                    />
                    <div>
                      <div
                        style={{
                          color: "#fff",
                          fontSize: 13.5,
                          fontWeight: 600,
                        }}
                      >
                        {r.name}
                      </div>
                      <div
                        style={{
                          color: "rgba(255,255,255,0.3)",
                          fontSize: 11.5,
                        }}
                      >
                        {r.role}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionTexture>

      {/* ═══ FAQ ═══ */}
      <SectionTexture
        glowColor="rgba(255,107,44,0.03)"
        glowPos="50% 30%"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div style={{ padding: "110px 48px", maxWidth: 700, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div
              style={{
                color: "#FF9A56",
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
                fontSize: 46,
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
              answer="oomphh uses your approximate location to show compatible people nearby. You choose your radius (500m to 10km) and can go invisible anytime. We never share your exact position."
            />
            <FAQItem
              question="When does oomphh launch?"
              answer="We're in closed beta right now. Join the waitlist to get early access — spots are limited and early adopters get premium features for free."
            />
            <FAQItem
              question="Is oomphh really free during beta?"
              answer="Yes, 100%. We want early users to experience the full app. Premium plans will kick in at launch, but beta users keep their perks."
            />
            <FAQItem
              question="How is oomphh different from Happn or Tinder?"
              answer="Happn shows you people you crossed paths with. Tinder is swiping. oomphh combines real-time proximity with personality-based AI matching — so you find people nearby who you'll actually vibe with."
            />
          </div>
        </div>
      </SectionTexture>

      {/* ═══ CTA ═══ */}
      <SectionTexture
        glowColor="rgba(255,107,44,0.06)"
        glowPos="50% 50%"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div style={{ padding: "110px 48px", textAlign: "center" }}>
          <div style={{ position: "relative", zIndex: 2 }}>
            <h2
              style={{
                fontSize: 54,
                fontWeight: 800,
                fontFamily: FF_D,
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
                marginBottom: 18,
                ...HEADING_FILTER,
              }}
            >
              Your person might be
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #FF6B2C, #FFBE7B)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                around the corner
              </span>
              .
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
              Join the waitlist and be among the first to try oomphh when we
              launch in your area.
            </p>
            <div
              style={{
                display: "flex",
                gap: 10,
                justifyContent: "center",
                maxWidth: 460,
                margin: "0 auto",
              }}
            >
              <div
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 16,
                  padding: "14px 20px",
                  color: "rgba(255,255,255,0.3)",
                  fontSize: 15,
                  fontFamily: FF_B,
                }}
              >
                your@email.com
              </div>
              <button
                style={{
                  background: "linear-gradient(135deg, #FF6B2C, #FF9A56)",
                  border: "none",
                  borderRadius: 16,
                  padding: "14px 28px",
                  color: "#fff",
                  fontSize: 15,
                  fontWeight: 600,
                  fontFamily: FF_B,
                  cursor: "pointer",
                  boxShadow: "0 8px 32px rgba(255,107,44,0.35)",
                  whiteSpace: "nowrap",
                }}
              >
                Join waitlist →
              </button>
            </div>
            <p
              style={{
                color: "rgba(255,255,255,0.25)",
                fontSize: 12,
                marginTop: 14,
                fontWeight: 300,
              }}
            >
              No spam. We'll only email you when oomphh launches near you.
            </p>
          </div>
        </div>
      </SectionTexture>

      {/* ═══ FOOTER ═══ */}
      <footer
        style={{
          padding: "56px 48px 28px",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 36,
          }}
        >
          <div style={{ maxWidth: 250 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginBottom: 14,
              }}
            >
              <img
                src={LOGO_SRC}
                alt="oomphh"
                style={{ height: 24, objectFit: "contain" }}
              />
            </div>
            <p
              style={{
                color: "rgba(255,255,255,0.3)",
                fontSize: 12.5,
                lineHeight: 1.7,
                fontWeight: 300,
              }}
            >
              Date people around you. Personality-first matching designed for
              real-life connections.
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
              {["𝕏", "IG", "TT"].map((s) => (
                <div
                  key={s}
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 10,
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(255,255,255,0.35)",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {s}
                </div>
              ))}
            </div>
          </div>
          {[
            { t: "Company", l: ["About", "Blog", "Careers", "Press"] },
            {
              t: "Support",
              l: ["Help center", "Contact", "Community", "Status"],
            },
            { t: "Legal", l: ["Privacy", "Terms", "Cookies", "Safety"] },
          ].map((c) => (
            <div key={c.t}>
              <div
                style={{
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 600,
                  marginBottom: 14,
                }}
              >
                {c.t}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {c.l.map((l) => (
                  <a
                    key={l}
                    href="#"
                    style={{
                      color: "rgba(255,255,255,0.3)",
                      fontSize: 12.5,
                      textDecoration: "none",
                      fontWeight: 300,
                    }}
                  >
                    {l}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            maxWidth: 1200,
            margin: "36px auto 0",
            paddingTop: 20,
            borderTop: "1px solid rgba(255,255,255,0.04)",
            textAlign: "center",
            color: "rgba(255,255,255,0.18)",
            fontSize: 11.5,
            fontWeight: 300,
          }}
        >
          © 2025 oomphh, Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
