"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { invitation } from "@/data/invitation";
import WaxSeal from "./WaxSeal";
import Monogram from "./Monogram";
import { CornerSprig, Motes, Star8, Sparkle } from "./Ornaments";

type Stage = "idle" | "seal" | "flap" | "rise" | "leave";
const EASE = [0.22, 1, 0.36, 1] as const;

export default function OpeningEnvelope({ onOpen, onLeave, onDone }: { onOpen: () => void; onLeave: () => void; onDone: () => void }) {
  const [stage, setStage] = useState<Stage>("idle");
  const [flapBehind, setFlapBehind] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const later = (fn: () => void, ms: number) => { timers.current.push(setTimeout(fn, ms)); };
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const start = () => {
    if (stage !== "idle") return;
    onOpen();                                  // لفتة المستخدم: بدء محاولة تشغيل الموسيقى
    setStage("seal");                          // 0.0s: الختم يُضغط ويتوهج ثم يتلاشى
    later(() => setStage("flap"), 900);        // 0.9s: الغطاء ينفتح ببطء
    later(() => setFlapBehind(true), 900 + 650); // عند منتصف الدوران نخفض الغطاء خلف البطاقة
    later(() => setStage("rise"), 2400);       // 2.4s: البطاقة تصعد من الجيب
    later(() => { setStage("leave"); onLeave(); }, 4000); // 4.0s: يبدأ المظروف بالتلاشي ويظهر الغلاف تحته (تداخل ناعم)
    later(onDone, 5200);
  };
  const skip = () => { timers.current.forEach(clearTimeout); onOpen(); setStage("leave"); onLeave(); later(onDone, 900); };

  const flapOpen = stage === "flap" || stage === "rise" || stage === "leave";
  const rising = stage === "rise" || stage === "leave";
  const idle = stage === "idle";

  return (
    <motion.div
      className="stage fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{ height: "100svh", paddingTop: "calc(env(safe-area-inset-top) + 28px)", paddingBottom: "env(safe-area-inset-bottom)" }}
      initial={{ opacity: 0 }} animate={{ opacity: stage === "leave" ? 0 : 1 }} transition={{ duration: stage === "leave" ? 1.2 : 1.2, ease: EASE }}
      role="dialog" aria-label="مظروف الدعوة"
    >
      <div aria-hidden className="geo pointer-events-none absolute inset-0 opacity-[0.16]" style={{ WebkitMaskImage: "radial-gradient(70% 60% at 50% 45%, #000 0%, transparent 100%)", maskImage: "radial-gradient(70% 60% at 50% 45%, #000 0%, transparent 100%)" }} />
      <Motes />
      <CornerSprig pos="bl" className="w-32 md:w-64" />
      <CornerSprig pos="br" className="w-32 md:w-64" />
      <CornerSprig pos="tl" className="w-24 md:w-48" />
      <CornerSprig pos="tr" className="w-24 md:w-48" />
      <Sparkle className="left-[20%] top-[14%]" delay="0.2s" /><Sparkle className="right-[18%] top-[20%]" size={11} delay="1.1s" />
      <Sparkle className="left-[9%] top-[56%]" size={10} delay="1.7s" /><Sparkle className="right-[10%] bottom-[28%]" delay="0.8s" />

      <motion.div className="relative z-10 flex flex-col items-center" initial={{ opacity: 0, y: 10 }} animate={{ opacity: idle ? 1 : 0, y: 0 }} transition={{ duration: idle ? 1.3 : 0.5, delay: idle ? 0.3 : 0, ease: EASE }}>
        <div className="flex items-center gap-3" aria-hidden><span className="hairline w-10" /><Star8 size={14} color="#A58650" /><span className="hairline w-10" /></div>
        <p dir="ltr" className="mt-3 font-serif text-[0.72rem] italic tracking-[0.34em] text-gold sm:text-sm">A LETTER SEALED WITH LOVE</p>
        <p className="mt-4 max-w-[19rem] px-3 text-center font-naskh text-[1.15rem] leading-[2] text-ink sm:max-w-md sm:text-[1.4rem]">{invitation.openingLine}</p>
      </motion.div>

      {/* المظروف */}
      <motion.div initial={{ opacity: 0, scale: 0.92, y: 24 }} animate={{ opacity: 1, scale: stage === "leave" ? 1.05 : 1, y: 0 }} transition={{ duration: stage === "leave" ? 1.2 : 1.5, delay: idle ? 0.2 : 0, ease: EASE }}
        className="relative z-10 mt-14 sm:mt-20" style={{ width: "min(84vw, 430px)", aspectRatio: "3 / 2" }}>
        <div aria-hidden className="absolute -bottom-6 left-[6%] right-[6%] h-8 rounded-[50%]" style={{ background: "radial-gradient(closest-side, rgba(74,20,36,.32), transparent)", filter: "blur(8px)" }} />

        {/* الخلف: بطانة خمرية تظهر عند فتح الغطاء */}
        <div className="absolute inset-0 rounded-[6px]" style={{ zIndex: 0, background: "linear-gradient(160deg,#7A2439,#4A1424)", boxShadow: "var(--shadow-lift)" }} />

        {/* البطاقة: تبقى خلف الجيب الأمامي وتصعد من فتحته */}
        <motion.div className="paper absolute left-[6%] right-[6%] top-[7%] flex flex-col items-center justify-center rounded-[3px]"
          style={{ height: "86%", zIndex: 2, border: "1px solid #D9C6A5", boxShadow: "0 10px 24px -10px rgba(74,20,36,.5)" }}
          initial={false} animate={rising ? { y: "-72%" } : { y: 0 }} transition={{ duration: 1.5, ease: EASE }}>
          <div className="pointer-events-none absolute inset-[5px] rounded-[1px] border border-champagne/60" />
          <Monogram size={60} />
          <p className="mt-1 font-names text-lg text-burgundy">دعوة زفاف</p>
          <Star8 size={11} color="#A58650" className="mt-1" />
        </motion.div>

        {/* الجيب الأمامي — كتان عاجي */}
        <div className="pointer-events-none absolute inset-0" style={{ zIndex: 3, filter: "drop-shadow(0 -1px 0 rgba(165,134,80,.4))" }}>
          <div className="absolute inset-0" style={{ clipPath: "polygon(0 0, 52% 54%, 0 100%)", background: "linear-gradient(100deg,#F7EFE2,#EADBC4)" }} />
          <div className="absolute inset-0" style={{ clipPath: "polygon(100% 0, 48% 54%, 100% 100%)", background: "linear-gradient(260deg,#F7EFE2,#E8D7BE)" }} />
          <div className="absolute inset-0 rounded-b-[6px]" style={{ clipPath: "polygon(0 100%, 50% 46%, 100% 100%)", background: "linear-gradient(180deg,#F8F1E5,#EEE0CA)" }} />
        </div>

        {/* الغطاء: عنصر ثلاثي الأبعاد مستقل */}
        <motion.div className="absolute left-0 right-0 top-0"
          style={{ height: "56%", transformOrigin: "50% 0", transformPerspective: 1100, transformStyle: "preserve-3d", zIndex: flapBehind ? 1 : 5 }}
          initial={false} animate={{ rotateX: flapOpen ? 180 : 0 }} transition={{ duration: 1.3, ease: EASE }}>
          <div className="absolute inset-0" style={{ clipPath: "polygon(0 0,100% 0,50% 100%)", background: "linear-gradient(180deg,#FBF5EA,#EFE1CB)", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }} />
          <div className="absolute inset-0" style={{ clipPath: "polygon(0 0,100% 0,50% 100%)", background: "linear-gradient(0deg,#5A1829,#7A2439)", transform: "rotateX(180deg)", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }} />
        </motion.div>

        {/* الختم */}
        <div className="absolute left-1/2" style={{ top: "56%", transform: "translate(-50%, -50%)", zIndex: 7 }}>
          <WaxSeal size={84} pressed={!idle} onPress={start} />
        </div>
      </motion.div>

      <motion.div className="relative z-10 mt-12 flex flex-col items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: idle ? 1 : 0 }} transition={{ duration: idle ? 0.9 : 0.3, delay: idle ? 1.1 : 0 }}>
        <button type="button" onClick={start} className="btn-solid min-h-12 rounded-full px-10 py-3 font-sans text-[1.05rem] font-bold tracking-wide active:scale-[0.97]">{invitation.openButton}</button>
        {idle && <button type="button" onClick={skip} className="min-h-10 px-3 text-sm text-taupe underline-offset-4 hover:text-burgundy hover:underline">تخطّي الحركة</button>}
      </motion.div>
    </motion.div>
  );
}
