"use client";
import { motion } from "framer-motion";
import { invitation } from "@/data/invitation";
import { splitDate } from "@/lib/format";
import Monogram from "./Monogram";
import { CornerSprig, Sparkle, Star8 } from "./Ornaments";
const EASE = [0.22, 1, 0.36, 1] as const;
const rise = (delay: number) => ({ initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1.6, delay, ease: EASE } });

/** غلاف الدعوة: أول ما يراه الضيف بعد فتح المظروف، ثم تنزل الشاشة وحدها ببطء. */
export default function Hero() {
  const { event } = invitation;
  const { day, monthYear } = splitDate(event.dateDisplay);
  const short = event.dateShort.split("/").join("  ·  ");
  return (
    <section aria-label="غلاف الدعوة" className="relative flex flex-col items-center justify-center overflow-hidden px-6 text-center" style={{ minHeight: "100svh", paddingTop: "calc(env(safe-area-inset-top) + 56px)", paddingBottom: "72px" }}>
      <div aria-hidden className="geo pointer-events-none absolute inset-0 opacity-[0.17]" style={{ WebkitMaskImage: "radial-gradient(65% 55% at 50% 48%, #000 0%, transparent 100%)", maskImage: "radial-gradient(65% 55% at 50% 48%, #000 0%, transparent 100%)" }} />
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(55% 40% at 50% 42%, rgba(255,255,255,.9), transparent 72%)" }} />
      <CornerSprig pos="bl" className="w-32 md:w-60" /><CornerSprig pos="br" className="w-32 md:w-60" />
      <CornerSprig pos="tl" className="w-24 md:w-44" /><CornerSprig pos="tr" className="w-24 md:w-44" />
      <Sparkle className="left-[18%] top-[22%]" size={14} /><Sparkle className="right-[16%] top-[30%]" size={10} delay="1s" /><Sparkle className="left-[12%] bottom-[30%]" size={10} delay="1.6s" />

      <div className="relative z-10 flex flex-col items-center">
        <motion.p dir="ltr" {...rise(0.2)} className="font-serif text-[0.72rem] italic tracking-[0.38em] text-gold sm:text-sm">WEDDING INVITATION</motion.p>
        <motion.div {...rise(0.5)} className="mt-8"><Monogram size={132} /></motion.div>
        <motion.p {...rise(1)} className="mt-6 font-names text-[2.3rem] leading-tight text-burgundy sm:text-5xl">دعوة زفاف</motion.p>
        <motion.div {...rise(1.3)} className="mt-6 flex items-center gap-4" aria-hidden>
          <span className="hairline w-14 sm:w-24" /><Star8 size={16} color="#6E1F34" /><span className="hairline w-14 sm:w-24" />
        </motion.div>
        <motion.p {...rise(1.5)} className="mt-6 font-naskh text-xl text-ink sm:text-2xl">{event.dayName}، {day} {monthYear}</motion.p>
        <motion.p {...rise(1.6)} dir="ltr" className="mt-1 font-serif text-sm tracking-[0.3em] text-taupe">{short}</motion.p>
      </div>

      <motion.div {...rise(2)} className="absolute bottom-8 z-10 flex flex-col items-center gap-2" aria-hidden>
        <span className="text-[0.8rem] tracking-wide text-taupe">تابعوا التفاصيل</span>
        <span className="cue block h-8 w-px" style={{ background: "linear-gradient(180deg, #C9AE82, transparent)" }} />
      </motion.div>
    </section>
  );
}
