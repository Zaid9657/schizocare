import { Hero } from "@/components/sections/Hero";
import { Tools } from "@/components/sections/Tools";
import { Therapies } from "@/components/sections/Therapies";
import { Journey } from "@/components/sections/Journey";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Tools />
      <Therapies />
      <Journey />
      <FAQ />
      <CTA />
    </>
  );
}
