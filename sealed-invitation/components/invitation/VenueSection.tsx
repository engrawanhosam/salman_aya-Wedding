"use client";
import { useState } from "react";
import Image from "next/image";
import { CalendarPlus, MapPin } from "lucide-react";
import { invitation } from "@/data/invitation";
import { downloadIcs } from "@/lib/calendar";
import { mapsHref } from "@/lib/maps";
import Reveal from "./Reveal";
import Monogram from "./Monogram";
import { ArchFrame } from "./Ornaments";

const btn = "flex min-h-[3.3rem] flex-1 items-center justify-center gap-2 rounded-full px-4 py-3 text-[1rem] font-bold active:scale-[0.97]";

export default function VenueSection() {
  const { venue } = invitation;
  const [failed, setFailed] = useState(false);
  return (
    <section aria-label="موقع الحفل" className="relative px-5 py-16 md:py-28">
      <Reveal className="relative z-10 mx-auto grid max-w-5xl items-center gap-14 md:grid-cols-[1fr_1.05fr] md:gap-20">
        <ArchFrame className="mx-auto w-full max-w-[17.5rem] md:max-w-[22rem]" ratio="4 / 5">
          {failed ? (
            <div className="flex h-full w-full flex-col items-center justify-center gap-4 text-taupe" style={{ background: "linear-gradient(180deg,#F6EBE4,#EFE0D2)" }} role="img" aria-label="مكان صورة فندق إيفان">
              <Monogram size={64} /><span className="px-8 text-center text-sm leading-relaxed">ستظهر صورة واجهة الفندق هنا</span>
            </div>
          ) : (
            <Image src={venue.image} alt={venue.imageAlt} fill sizes="(max-width: 768px) 70vw, 352px" loading="lazy" onError={() => setFailed(true)} style={{ objectFit: "cover" }} />
          )}
        </ArchFrame>
        <div className="text-center md:text-start">
          <h2 className="names-text font-names text-[2.8rem] leading-[1.4] md:text-[4rem]">{venue.heading}</h2>
          <p className="text-balance mt-2 font-naskh text-[1.25rem] leading-loose text-ink md:text-[1.6rem]">{venue.text}</p>
          <div className="mx-auto my-6 h-px w-24 md:mx-0" style={{ background: "linear-gradient(90deg, #C9AE82, transparent)" }} aria-hidden />
          <p className="font-naskh text-[1.6rem] font-bold text-ink md:text-[2.1rem]">{venue.hotel} — {venue.hall}</p>
          <p className="mt-2 flex items-center justify-center gap-2 text-base text-taupe md:justify-start md:text-lg"><MapPin size={16} strokeWidth={1.6} className="text-gold" aria-hidden />{venue.address}</p>
          <div className="mt-8 flex gap-3">
            <button type="button" onClick={downloadIcs} className={`${btn} btn-ghost`}><CalendarPlus size={19} strokeWidth={1.7} aria-hidden />احفظوا الموعد</button>
            <a href={mapsHref()} target="_blank" rel="noopener noreferrer" className={`${btn} btn-solid`}><MapPin size={19} strokeWidth={1.7} aria-hidden />افتحوا الموقع</a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
