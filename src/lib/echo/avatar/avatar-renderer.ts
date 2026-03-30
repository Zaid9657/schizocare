// ─────────────────────────────────────────────────────────────────────────────
// ECHO Avatar SVG Renderer
// Composes face part paths into a complete SVG string.
// ─────────────────────────────────────────────────────────────────────────────

import {
  type FaceConfig,
  FACE_PATHS,
  EYE_PATHS,
  BROW_PATHS,
  PUPIL_PATH,
  PUPIL_HIGHLIGHT,
  MOUTH_PATHS,
  HAIR_PATHS,
  AGE_PATHS,
  DEFAULT_FACE_CONFIG,
} from "./face-parts";

export type { FaceConfig };
export { DEFAULT_FACE_CONFIG };

// Mirror transform for right-side elements (reflect around x=100)
const MIRROR = 'transform="scale(-1,1) translate(-200,0)"';

/**
 * Generate a complete SVG string for a given FaceConfig.
 * Returns an inline SVG element (no <img> wrapper needed).
 */
export function generateAvatarSvg(
  config: Partial<FaceConfig> = {},
  opts: { size?: number; speaking?: boolean } = {}
): string {
  const c: FaceConfig = { ...DEFAULT_FACE_CONFIG, ...config };
  const size = opts.size ?? 200;
  const speaking = opts.speaking ?? false;

  const facePath   = FACE_PATHS[c.faceShape];
  const eyePath    = EYE_PATHS[c.eyeShape];
  const brows      = BROW_PATHS[c.eyeExpression];
  const mouthPath  = MOUTH_PATHS[c.mouthExpression];
  const hairPath   = HAIR_PATHS[c.hairStyle];
  const ageLines   = AGE_PATHS[c.ageAppearance];

  // Animate jaw for "speaking" state — slight mouth open
  const mouthPathSpeaking = speaking
    ? mouthPath.replace(/Q100,(\d+)/, (_: string, y: string) => `Q100,${Number(y) + 6}`)
    : mouthPath;

  const shadowId = `shadow_${Math.random().toString(36).slice(2, 7)}`;

  return `<svg
  xmlns="http://www.w3.org/2000/svg"
  width="${size}"
  height="${size}"
  viewBox="0 0 200 200"
  role="img"
  aria-label="Avatar face"
>
  <defs>
    <filter id="${shadowId}" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#00000022"/>
    </filter>
    <!-- Neck clip -->
    <clipPath id="face-clip">
      <path d="${facePath}"/>
    </clipPath>
  </defs>

  <!-- ── Layer 0: Hair (back) ── -->
  ${hairPath ? `<path d="${hairPath}" fill="${c.hairColor}" opacity="0.95"/>` : ""}

  <!-- ── Layer 1: Face ── -->
  <path
    d="${facePath}"
    fill="${c.skinTone}"
    stroke="${darken(c.skinTone, 0.15)}"
    stroke-width="1.5"
    filter="url(#${shadowId})"
  />

  <!-- ── Layer 2: Face shading (subtle) ── -->
  <path
    d="${facePath}"
    fill="url(#face-shade)"
    clip-path="url(#face-clip)"
    opacity="0.18"
  />
  <defs>
    <linearGradient id="face-shade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="60%" stop-color="#FFFFFF" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000000"/>
    </linearGradient>
  </defs>

  <!-- ── Layer 3: Age lines ── -->
  ${ageLines.map(p =>
    `<path d="${p}" fill="none" stroke="${darken(c.skinTone, 0.2)}" stroke-width="1.2" stroke-linecap="round"/>`
  ).join("\n  ")}

  <!-- ── Layer 4: Eyebrows ── -->
  <path d="${brows.left}"  fill="none" stroke="${darken(c.skinTone, 0.55)}" stroke-width="3" stroke-linecap="round"/>
  <path d="${brows.right}" fill="none" stroke="${darken(c.skinTone, 0.55)}" stroke-width="3" stroke-linecap="round"/>

  <!-- ── Layer 5: Eyes (left + mirrored right) ── -->
  <!-- White -->
  <path d="${eyePath}" fill="#FAFAFA" stroke="${darken(c.skinTone, 0.2)}" stroke-width="1"/>
  <path d="${eyePath}" fill="#FAFAFA" stroke="${darken(c.skinTone, 0.2)}" stroke-width="1" ${MIRROR}/>
  <!-- Pupil -->
  <path d="${PUPIL_PATH}" fill="${c.eyeColor}"/>
  <path d="${PUPIL_PATH}" fill="${c.eyeColor}" ${MIRROR}/>
  <!-- Highlight -->
  <path d="${PUPIL_HIGHLIGHT}" fill="#FFFFFF" opacity="0.9"/>
  <path d="${PUPIL_HIGHLIGHT}" fill="#FFFFFF" opacity="0.9" ${MIRROR}/>

  <!-- ── Layer 6: Nose (simple) ── -->
  <path
    d="M96,108 Q100,122 104,108"
    fill="none"
    stroke="${darken(c.skinTone, 0.2)}"
    stroke-width="1.5"
    stroke-linecap="round"
  />

  <!-- ── Layer 7: Mouth ── -->
  <path
    d="${mouthPathSpeaking}"
    fill="none"
    stroke="${darken(c.skinTone, 0.45)}"
    stroke-width="2.5"
    stroke-linecap="round"
  />
  ${speaking ? `<path d="M82,130 Q100,138 118,130 Q118,142 100,144 Q82,142 82,130 Z" fill="${darken(c.skinTone, 0.3)}" opacity="0.5"/>` : ""}

  <!-- ── Layer 8: Hair (front overlay for long/medium) ── -->
  ${c.hairStyle === "long" || c.hairStyle === "medium"
    ? `<path d="M28,80 C32,50 168,50 172,80 C168,56 32,56 28,80 Z" fill="${c.hairColor}" opacity="0.92"/>`
    : ""}
</svg>`;
}

/**
 * Darken a hex colour by a factor 0–1.
 * Used for strokes, shadows, and shading.
 */
export function darken(hex: string, factor: number): string {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = Math.max(0, Math.round(((n >> 16) & 0xff) * (1 - factor)));
  const g = Math.max(0, Math.round(((n >> 8)  & 0xff) * (1 - factor)));
  const b = Math.max(0, Math.round(( n        & 0xff) * (1 - factor)));
  return `#${r.toString(16).padStart(2,"0")}${g.toString(16).padStart(2,"0")}${b.toString(16).padStart(2,"0")}`;
}
