"use client";
import { motion } from "framer-motion";
const EASE = [0.22, 1, 0.36, 1] as const;
export default function Reveal({ children, delay = 0, y = 20, scale = 1, className = "" }: { children: React.ReactNode; delay?: number; y?: number; scale?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y, scale }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-8% 0px -8% 0px" }} transition={{ duration: 1.4, delay, ease: EASE }}>
      {children}
    </motion.div>
  );
}
