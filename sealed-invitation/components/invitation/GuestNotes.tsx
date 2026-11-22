"use client";
import { Users, BusFront, Baby } from "lucide-react";
import { motion } from "framer-motion";
import { invitation } from "@/data/invitation";

const icons = { users: Users, bus: BusFront, baby: Baby } as const;
const EASE = [0.22, 1, 0.36, 1] as const;

export default function GuestNotes() {
  return (
    <section aria-label="تفاصيل للضيوف" className="relative px-5 py-16 md:py-24">
      <div className="relative z-10 mx-auto grid max-w-5xl gap-5 md:grid-cols-3 md:gap-7">
        {invitation.notes.map((n, i) => {
          const Icon = icons[n.icon as keyof typeof icons];
          return (
            <motion.article key={n.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-6% 0px" }} transition={{ duration: 1.2, delay: i * 0.18, ease: EASE }}
              className="paper relative flex items-start gap-4 px-5 py-6 md:flex-col md:items-center md:px-6 md:py-9 md:text-center"
              style={{ border: "1px solid #E2D3BF", borderRadius: 4, boxShadow: "var(--shadow-soft)" }}>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full md:h-14 md:w-14" style={{ border: "1px solid #C9AE82", background: "linear-gradient(180deg,#FFFFFF,#F7EEDF)" }}>
                <Icon size={22} strokeWidth={1.4} className="text-burgundy" aria-hidden />
              </span>
              <div>
                <h3 className="font-naskh text-xl font-bold text-burgundy md:text-2xl">{n.title}</h3>
                <p className="mt-1 text-[1rem] leading-relaxed text-ink/90 md:mt-2 md:text-[1.05rem]">{n.text}</p>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
