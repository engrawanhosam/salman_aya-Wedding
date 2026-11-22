"use client";
import { motion } from "framer-motion";
import { invitation } from "@/data/invitation";
import Monogram from "./Monogram";
import { DotRow, Motes } from "./Ornaments";
const EASE = [0.22, 1, 0.36, 1] as const;

export default function ClosingSection({ onBack }: { onBack: () => void }) {
  const c = invitation.closing;
  return (
    <section aria-label="الختام" className="relative z-10 flex min-h-[90svh] flex-col items-center justify-center px-6 py-24 text-center">
      <Motes />
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.8, ease: EASE }}><Monogram size={112} tone="light" /></motion.div>
      <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.6, delay: 0.7, ease: EASE }} className="text-balance mt-9 max-w-md font-naskh text-[1.3rem] leading-loose text-[#F6EBD9] md:max-w-xl md:text-[2rem]">{c.line}</motion.p>
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.8, delay: 1.4 }}>
        <p className="champ-text mt-6 font-names text-[3.6rem] leading-[1.4] md:text-[6rem]">{c.names}</p>
        <p className="mt-1 font-naskh text-xl text-[#DDBF8A] md:text-3xl">{c.wait}</p>
        <DotRow className="mt-9 justify-center" color="#DDBF8A" />
        <button type="button" onClick={onBack} className="mt-8 min-h-11 rounded-full px-6 py-2 text-sm text-[#E8D6B6] underline-offset-4 transition hover:text-white hover:underline">{c.back}</button>
      </motion.div>
    </section>
  );
}
