"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { invitation } from "@/data/invitation";
import { getRemaining, type Remaining } from "@/lib/time";
import { splitDate, toArabicDigits } from "@/lib/format";
import Reveal from "./Reveal";
import { Divider, Star8 } from "./Ornaments";

const two = (n: number) => toArabicDigits(String(n).padStart(2, "0"));

function Unit({ value, label }: { value: number | null; label: string }) {
  return (
    <div className="flex flex-col items-center px-1">
      <div className="relative flex h-[3.2rem] items-center justify-center overflow-hidden sm:h-[4.4rem]" dir="ltr">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span key={value ?? "x"} initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -16, opacity: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-naskh text-[2.5rem] font-bold leading-none text-burgundy sm:text-[3.4rem]">{value === null ? "٠٠" : two(value)}</motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-2 text-[0.8rem] tracking-wide text-taupe md:text-base">{label}</span>
    </div>
  );
}

export default function Countdown() {
  const { event } = invitation;
  const { day, monthYear } = splitDate(event.dateDisplay);
  const [rem, setRem] = useState<Remaining | null>(null); // null عند أول عرض لتفادي Hydration mismatch
  useEffect(() => {
    const tick = () => setRem(getRemaining(event.targetISO));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [event.targetISO]);

  return (
    <section aria-label="موعد الزفاف" className="relative px-5 py-16 text-center md:py-28">
      <Reveal className="relative z-10 mx-auto max-w-2xl">
        <p className="text-balance font-naskh text-[1.5rem] text-ink md:text-[2.1rem]">{event.tagline}</p>

        <div className="paper relative mx-auto mt-10 px-6 pb-9 pt-12" style={{ border: "1px solid #D9C6A5", borderRadius: 4, boxShadow: "var(--shadow-soft), inset 0 0 0 7px #FFFCF7, inset 0 0 0 8px #E7D9BF" }}>
          <span aria-hidden className="absolute -top-4 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center bg-ivory"><Star8 size={22} color="#6E1F34" /></span>
          <p className="font-sans text-sm tracking-[0.35em] text-gold md:text-base">{event.dayName}</p>
          <p className="names-text font-names text-[5.6rem] leading-[1.15] md:text-[8rem]">{day}</p>
          <p className="font-naskh text-[1.5rem] text-ink md:text-[2.1rem]">{monthYear}</p>
          <Divider className="my-5" />
          <p className="font-sans text-base text-ink md:text-xl">الساعة {event.timeDisplay}</p>
        </div>

        <div className="mt-12">
          {rem?.done ? (
            <p className="font-naskh text-[1.6rem] leading-loose text-burgundy">{event.doneMessage}</p>
          ) : (
            <div className="mx-auto grid max-w-md grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-center" role="timer" aria-label="العدّ التنازلي لموعد الزفاف">
              <Unit value={rem ? rem.days : null} label="يوم" /><span aria-hidden className="h-12 w-px bg-champagne/60" />
              <Unit value={rem ? rem.hours : null} label="ساعة" /><span aria-hidden className="h-12 w-px bg-champagne/60" />
              <Unit value={rem ? rem.minutes : null} label="دقيقة" /><span aria-hidden className="h-12 w-px bg-champagne/60" />
              <Unit value={rem ? rem.seconds : null} label="ثانية" />
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}
