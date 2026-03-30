"use client";

import { useMemo } from "react";
import { generateAvatarSvg } from "@/lib/echo/avatar/avatar-renderer";
import type { FaceConfig } from "@/lib/echo/avatar/face-parts";

export type PreviewSize = "sm" | "md" | "lg";

const SIZE_PX: Record<PreviewSize, number> = { sm: 64, md: 120, lg: 200 };

interface AvatarPreviewProps {
  faceConfig: Partial<FaceConfig>;
  speaking?: boolean;
  size?: PreviewSize;
  label?: string;
}

export default function AvatarPreview({
  faceConfig,
  speaking = false,
  size = "md",
  label = "Avatar preview",
}: AvatarPreviewProps) {
  const px = SIZE_PX[size];

  const svgString = useMemo(
    () => generateAvatarSvg(faceConfig, { size: px, speaking }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(faceConfig), px, speaking]
  );

  return (
    <div
      role="img"
      aria-label={label}
      style={{
        width: px,
        height: px,
        borderRadius: "50%",
        overflow: "hidden",
        flexShrink: 0,
        border: "3px solid #EEECE8",
        backgroundColor: "#F9F8F6",
      }}
      dangerouslySetInnerHTML={{ __html: svgString }}
    />
  );
}
