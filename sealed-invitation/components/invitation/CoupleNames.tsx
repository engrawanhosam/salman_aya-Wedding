"use client";
import { motion } from "framer-motion";
import { invitation } from "@/data/invitation";
import Monogram from "./Monogram";
import { Sparkle, Divider } from "./Ornaments";
const EASE = [0.22, 1, 0.36, 1] as const;
const appear = (delay: number) => ({
  initial: { opacity: 0, y: 24, filter: "blur(6px)" }, whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "-10% 0px" }, transition: { duration: 1.5, delay, ease: EASE },
});
export default function CoupleNames() {
  const { groom, bride } = invitation;
  return (
    <section aria-label="العروسان" className="relative px-5 py-20 text-center md:py-32">
      <Sparkle className="left-[14%] top-[12%]" size={16} /><Sparkle className="right-[16%] top-[34%]" size={12} delay="1s" />
      <Sparkle className="left-[18%] bottom-[18%]" size={12} delay="1.5s" /><Sparkle className="right-[12%] bottom-[10%]" size={16} delay=".6s" />
      <div className="relative z-10">
        <motion.p {...appear(0)} className="font-sans text-base tracking-[0.2em] text-taupe md:text-2xl">{groom.title}</motion.p>
        <motion.h2 {...appear(0.1)} className="names-text font-names text-[5.2rem] leading-[1.3] md:text-[10rem]">{groom.name}</motion.h2>
        <motion.div {...appear(0.9)} className="my-1 flex items-center justify-center gap-4">
          <span aria-hidden className="hairline w-16 md:w-40" /><span className="font-names text-4xl text-gold md:text-6xl">و</span><span aria-hidden className="hairline w-16 md:w-40" />
        </motion.div>
        <motion.p {...appear(1.5)} className="mt-2 font-sans text-base tracking-[0.2em] text-taupe md:text-2xl">{bride.title}</motion.p>
        <motion.h2 {...appear(1.6)} className="names-text font-names text-[5.2rem] leading-[1.3] md:text-[10rem]">{bride.name}</motion.h2>
        <motion.div {...appear(2.2)} className="mt-8 flex flex-col items-center gap-5"><Divider /><Monogram size={72} /></motion.div>
      </div>
    </section>
  );
}
