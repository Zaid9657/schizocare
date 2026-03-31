"use client";

// EchoHome is a thin passthrough — all logic lives in EchoDashboard
// so the dashboard can be composed into other pages if needed.
import EchoDashboard from "@/components/echo/home/EchoDashboard";

interface EchoHomeProps {
  locale: string;
}

export default function EchoHome({ locale }: EchoHomeProps) {
  return <EchoDashboard locale={locale} />;
}
