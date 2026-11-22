"use client";
import { useState } from "react";
import Image from "next/image";
import { invitation } from "@/data/invitation";
import Reveal from "./Reveal";
import Monogram from "./Monogram";
import { ArchFrame, Divider } from "./Ornaments";

export default function MemoryPhoto() {
  const { memory } = invitation;
  const [failed, setFailed] = useState(false);
  return (
    <section aria-label="صورة تذكارية" className="relative px-5 py-16 md:py-28">
      <Reveal className="relative z-10 mx-auto grid max-w-5xl items-center gap-14 md:grid-cols-2 md:gap-20" scale={0.98}>
        <ArchFrame className="mx-auto w-full max-w-[17.5rem] md:max-w-[22rem]" ratio="4 / 5">
          {failed ? (
            <div className="flex h-full w-full flex-col items-center justify-center gap-4 text-taupe" style={{ background: "linear-gradient(180deg,#F6EBE4,#EFE0D2)" }} role="img" aria-label="مكان الصورة التذكارية">
              <Monogram size={64} /><span className="px-8 text-center text-sm leading-relaxed">ستظهر الصورة التذكارية هنا</span>
            </div>
          ) : (
            <Image src={memory.image} alt={memory.alt} fill sizes="(max-width: 768px) 70vw, 352px" loading="lazy" onError={() => setFailed(true)} style={{ objectFit: "cover" }} />
          )}
        </ArchFrame>
        <div className="text-center md:text-start">
          <p dir="ltr" className="font-serif text-xs italic tracking-[0.28em] text-gold md:text-sm md:text-left">{memory.label}</p>
          <p className="text-balance mt-5 font-naskh text-[1.4rem] leading-[2.1] text-ink md:text-[2.1rem]">{memory.caption}</p>
          <Divider className="mt-6 md:justify-start" />
        </div>
      </Reveal>
    </section>
  );
}
