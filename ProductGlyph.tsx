"use client";

import { useId } from "react";

export type GlyphType =
  | "sneaker"
  | "trainer"
  | "hoodie"
  | "earbuds"
  | "backpack"
  | "tee";

const ICONS: Record<GlyphType, React.ReactNode> = {
  sneaker: (
    <>
      <path
        d="M30,142 L160,142 C170,142 170,156 160,158 L42,158 C32,158 26,150 30,142 Z"
        strokeWidth={3}
      />
      <path
        d="M30,142 C26,128 32,116 46,112 C56,109 62,102 68,94 C74,86 84,80 96,79 C108,78 116,85 114,94 C112,101 122,103 134,107 C146,111 154,119 155,130 L160,142"
        strokeWidth={3}
      />
      <path d="M114,94 C122,86 122,74 114,65" strokeWidth={3} />
      <path d="M68,94 C69,86 74,79 82,75" strokeWidth={3} />
      <path d="M73,99 L96,88" strokeWidth={2.5} />
      <path d="M67,106 L92,95" strokeWidth={2.5} />
      <path d="M62,113 L88,102" strokeWidth={2.5} />
      <path
        d="M44,131 L148,112"
        stroke="var(--icon-accent)"
        strokeWidth={4}
      />
    </>
  ),
  trainer: (
    <>
      <path
        d="M30,142 L160,142 C170,142 170,156 160,158 L42,158 C32,158 26,150 30,142 Z"
        strokeWidth={3}
      />
      <path
        d="M30,142 C26,128 32,116 46,112 C56,109 62,102 68,94 C74,86 84,80 96,79 L96,52 C96,46 100,42 106,42 L122,42 C128,42 132,46 132,52 L132,86 C144,90 156,98 159,110 L160,142"
        strokeWidth={3}
      />
      <path d="M68,94 C69,86 74,79 82,75" strokeWidth={3} />
      <path d="M72,99 L100,90" strokeWidth={2.5} />
      <path d="M66,107 L96,98" strokeWidth={2.5} />
      <path d="M61,114 L92,106" strokeWidth={2.5} />
      <path
        d="M96,58 L132,58"
        stroke="var(--icon-accent)"
        strokeWidth={4}
      />
    </>
  ),
  hoodie: (
    <>
      <path
        d="M76,54 C76,40 88,32 100,32 C112,32 124,40 124,54 L124,62 L76,62 Z"
        strokeWidth={3}
      />
      <path
        d="M76,62 L58,68 C50,71 44,78 42,87 L36,116 C34,124 38,130 46,130 L60,130 L60,166 C60,172 65,176 71,176 L129,176 C135,176 140,172 140,166 L140,130 L154,130 C162,130 166,124 164,116 L158,87 C156,78 150,71 142,68 L124,62"
        strokeWidth={3}
      />
      <path
        d="M82,62 C86,68 94,72 100,72 C106,72 114,68 118,62"
        strokeWidth={3}
      />
      <path d="M92,72 L89,92" strokeWidth={2.5} />
      <path d="M108,72 L111,92" strokeWidth={2.5} />
      <path d="M70,134 L130,134 L126,150 L74,150 Z" strokeWidth={3} />
      <circle cx={89} cy={93} r={3} fill="var(--icon-accent)" stroke="none" />
      <circle cx={111} cy={93} r={3} fill="var(--icon-accent)" stroke="none" />
    </>
  ),
  earbuds: (
    <>
      <path
        d="M62,108 C62,100 68,96 76,96 L124,96 C132,96 138,100 138,108 L138,150 C138,160 130,166 120,166 L80,166 C70,166 62,160 62,150 Z"
        strokeWidth={3}
      />
      <path d="M62,118 L138,118" strokeWidth={2} />
      <circle cx={78} cy={64} r={16} strokeWidth={3} />
      <path d="M70,78 C68,86 70,92 76,94" strokeWidth={2.5} />
      <circle cx={122} cy={64} r={16} strokeWidth={3} />
      <path d="M130,78 C132,86 130,92 124,94" strokeWidth={2.5} />
      <circle cx={100} cy={106} r={3} fill="var(--icon-accent)" stroke="none" />
    </>
  ),
  backpack: (
    <>
      <path
        d="M88,44 C88,36 94,30 100,30 C106,30 112,36 112,44"
        strokeWidth={3}
      />
      <path
        d="M54,76 C54,62 64,52 78,52 L122,52 C136,52 146,62 146,76 L146,150 C146,162 136,172 124,172 L76,172 C64,172 54,162 54,150 Z"
        strokeWidth={3}
      />
      <path d="M70,52 L66,176" strokeWidth={2.5} />
      <path d="M130,52 L134,176" strokeWidth={2.5} />
      <path
        d="M68,110 C68,102 74,98 82,98 L118,98 C126,98 132,102 132,110 L132,138 C132,148 124,154 114,154 L86,154 C76,154 68,148 68,138 Z"
        strokeWidth={3}
      />
      <path d="M54,90 L68,90" strokeWidth={2.5} />
      <path d="M132,90 L146,90" strokeWidth={2.5} />
      <circle cx={100} cy={98} r={3} fill="var(--icon-accent)" stroke="none" />
    </>
  ),
  tee: (
    <>
      <path
        d="M78,46 L52,58 C44,62 38,70 38,79 L38,94 C38,99 42,102 47,100 L60,95 L60,160 C60,168 66,174 74,174 L126,174 C134,174 140,168 140,160 L140,95 L153,100 C158,102 162,99 162,94 L162,79 C162,70 156,62 148,58 L122,46"
        strokeWidth={3}
      />
      <path
        d="M78,46 C82,56 90,62 100,62 C110,62 118,56 122,46"
        strokeWidth={3}
      />
      <path
        d="M82,108 L118,108"
        stroke="var(--icon-accent)"
        strokeWidth={4}
      />
    </>
  ),
};

export default function ProductGlyph({
  type,
  className = "",
  tone = "default",
}: {
  type: GlyphType;
  className?: string;
  /** "default" draws on a light grid; "dark" draws white on ink, for dark surfaces. */
  tone?: "default" | "dark";
}) {
  const uid = useId();
  const gridId = `glyph-grid-${uid}`;

  const lineColor = tone === "dark" ? "#FFFFFF" : "#161616";
  const gridColor = tone === "dark" ? "#FFFFFF" : "#161616";
  const gridOpacity = tone === "dark" ? 0.08 : 0.08;
  const accentColor = tone === "dark" ? "#FF5C5C" : "#C00000";

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      aria-hidden="true"
      style={{ "--icon-accent": accentColor } as React.CSSProperties}
    >
      <defs>
        <pattern id={gridId} width="20" height="20" patternUnits="userSpaceOnUse">
          <path
            d="M 20 0 L 0 0 0 20"
            fill="none"
            stroke={gridColor}
            strokeOpacity={gridOpacity}
            strokeWidth={1}
          />
        </pattern>
      </defs>
      <rect width="200" height="200" fill={`url(#${gridId})`} />
      <g stroke={accentColor} strokeWidth={2} strokeLinecap="round" fill="none">
        <path d="M10 24 V10 H24" />
        <path d="M176 10 H190 V24" />
        <path d="M190 176 V190 H176" />
        <path d="M24 190 H10 V176" />
      </g>
      <g
        stroke={lineColor}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {ICONS[type]}
      </g>
    </svg>
  );
}
