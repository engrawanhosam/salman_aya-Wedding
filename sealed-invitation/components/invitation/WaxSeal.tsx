"use client";
import { motion } from "framer-motion";
import Monogram from "./Monogram";

export default function WaxSeal({ size = 92, pressed = false, onPress, interactive = true }: { size?: number; pressed?: boolean; onPress?: () => void; interactive?: boolean }) {
  const body = (
    <motion.div
      animate={pressed ? { scale: [1, 0.9, 1.05, 1], opacity: [1, 1, 1, 0] } : { scale: 1, opacity: 1 }}
      transition={pressed ? { duration: 0.9, times: [0, 0.25, 0.55, 1], ease: [0.22, 1, 0.36, 1] } : { duration: 0.4 }}
      style={{ width: size, height: size, position: "relative" }}
    >
      {/* هالة شمبانيا هادئة تنبض لدعوة الضغط */}
      <motion.span aria-hidden className="absolute inset-[-16px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(201,174,130,.65) 0%, rgba(201,174,130,0) 68%)" }}
        animate={pressed ? { opacity: [0, 1, 0.5] } : { opacity: [0.2, 0.55, 0.2] }}
        transition={pressed ? { duration: 1 } : { duration: 3.6, repeat: Infinity, ease: "easeInOut" }} />
      <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden className="absolute inset-0 drop-shadow-[0_8px_10px_rgba(74,20,36,0.38)]">
        <defs>
          <radialGradient id="wax" cx="35%" cy="28%" r="85%">
            <stop offset="0%" stopColor="#A63A58" /><stop offset="50%" stopColor="#6E1F34" /><stop offset="100%" stopColor="#3C0F1D" />
          </radialGradient>
        </defs>
        <path d="M50 3c9 0 13 6 21 7s17 5 18 14 7 14 4 22-1 15-7 21-8 14-17 15-13 9-19 9-13-5-20-8-14-5-17-14-8-13-5-21 0-15 6-21 7-14 16-16S41 3 50 3z" fill="url(#wax)" />
        <circle cx="50" cy="50" r="34" fill="none" stroke="#2E0914" strokeOpacity=".45" strokeWidth="1.4" />
        <circle cx="50" cy="50" r="31" fill="none" stroke="#E3CFA6" strokeOpacity=".55" strokeWidth="0.7" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center"><Monogram size={size * 0.64} tone="light" /></div>
    </motion.div>
  );
  if (!interactive) return body;
  return (
    <button type="button" onClick={onPress} aria-label="فتح الدعوة بالضغط على الختم" className="block rounded-full transition-transform active:scale-95 focus-visible:outline-offset-8" disabled={pressed}>
      {body}
    </button>
  );
}
