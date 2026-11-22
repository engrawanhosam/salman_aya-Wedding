// زخارف خطّية هادئة: غصن، نجمة ثمانية، فواصل، إطار محراب — بلا ألوان صارخة
export const P = { champagne: "#C9AE82", gold: "#A58650", burgundy: "#6E1F34", wine: "#4A1424", blush: "#EBD3CC", ivory: "#FBF7F0" };

/* ── ورقة لوزية بسيطة ── */
function Leaf({ x, y, rot, s = 1, stroke, fill }: { x: number; y: number; rot: number; s?: number; stroke: string; fill: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <path d="M0 0C7-10 22-10 30 0C22 10 7 10 0 0z" fill={fill} stroke={stroke} strokeWidth="1.1" strokeLinejoin="round" />
      <path d="M3 0H26" stroke={stroke} strokeWidth=".8" opacity=".7" />
    </g>
  );
}

/* ── غصن خطّي (يصعد من اليسار السفلي إلى اليمين العلوي) ── */
export function Sprig({ className = "", tone = "champagne" }: { className?: string; tone?: "champagne" | "light" }) {
  const stroke = tone === "light" ? "#E3CFA6" : P.champagne;
  const fill = tone === "light" ? "rgba(227,207,166,.14)" : "rgba(201,174,130,.16)";
  const berry = tone === "light" ? "#E3CFA6" : P.burgundy;
  const pts: [number, number, number][] = [[27, 214, 1], [49, 173, 0.95], [75, 128, 0.88], [108, 79, 0.78]];
  return (
    <svg aria-hidden viewBox="0 0 200 262" className={className} fill="none">
      <path d="M8 252C40 190 70 120 150 24" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" />
      {pts.map(([x, y, s], i) => (
        <g key={i}>
          <Leaf x={x} y={y} rot={-128} s={s} stroke={stroke} fill={fill} />
          <Leaf x={x} y={y} rot={-8} s={s * 0.95} stroke={stroke} fill={fill} />
        </g>
      ))}
      <Leaf x={150} y={24} rot={-48} s={0.72} stroke={stroke} fill={fill} />
      <circle cx="178" cy="48" r="4" fill={berry} /><circle cx="166" cy="64" r="3" fill={berry} opacity=".75" />
      <path d="M150 24C160 30 170 38 178 48" stroke={stroke} strokeWidth="1" strokeLinecap="round" />
      <path d="M130 52C146 56 158 60 166 64" stroke={stroke} strokeWidth="1" strokeLinecap="round" />
      <circle cx="12" cy="248" r="2.2" fill={stroke} />
    </svg>
  );
}

export function CornerSprig({ pos, className = "w-28 md:w-48", tone = "champagne" }: { pos: "tl" | "tr" | "bl" | "br"; className?: string; tone?: "champagne" | "light" }) {
  const place = { bl: "bottom-0 left-0", br: "bottom-0 right-0", tl: "top-0 left-0", tr: "top-0 right-0" }[pos];
  const flip = { bl: "none", br: "scaleX(-1)", tl: "scaleY(-1)", tr: "scale(-1,-1)" }[pos];
  return (
    <div aria-hidden className={`pointer-events-none absolute z-0 ${place} ${className}`} style={{ transform: flip, opacity: tone === "light" ? 0.7 : 0.85 }}>
      <Sprig tone={tone} className="sprig-sway block h-auto w-full" />
    </div>
  );
}

/* ── نجمة ثمانية الرؤوس ── */
export function Star8({ size = 18, color = P.burgundy, filled = false, className = "" }: { size?: number; color?: string; filled?: boolean; className?: string }) {
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 24 24" className={className}>
      <g fill={filled ? color : "none"} stroke={color} strokeWidth="1.2" strokeLinejoin="round">
        <rect x="5" y="5" width="14" height="14" /><rect x="5" y="5" width="14" height="14" transform="rotate(45 12 12)" />
      </g>
    </svg>
  );
}

/* ── نجمة لامعة رباعية ── */
export function Sparkle({ className = "", size = 14, color = "#C9AE82", delay = "0s" }: { className?: string; size?: number; color?: string; delay?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 20 20" width={size} height={size} className={`anim-soft pointer-events-none absolute ${className}`} style={{ animation: `twinkle 3.2s ease-in-out ${delay} infinite` }}>
      <path d="M10 0c.8 5.5 4 9 10 10-6 1-9.200 4.500-10 10-.8-5.500-4-9-10-10 6-1 9.200-4.500 10-10z" fill={color} />
    </svg>
  );
}

export function Heart({ size = 14, color = P.burgundy, className = "" }: { size?: number; color?: string; className?: string }) {
  return <svg aria-hidden width={size} height={size} viewBox="0 0 24 24" className={className}><path d="M12 21C5 15 2 11.500 2 8a5 5 0 0 1 10-1 5 5 0 0 1 10 1c0 3.500-3 7-10 13z" fill={color} /></svg>;
}

/* ── خاتما زواج بخط رفيع ── */
export function Rings({ size = 84, className = "" }: { size?: number; className?: string }) {
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 100 100" className={className} fill="none">
      <circle cx="38" cy="58" r="22" stroke={P.champagne} strokeWidth="2.2" /><circle cx="62" cy="58" r="22" stroke={P.burgundy} strokeWidth="2.2" />
      <path d="M50 16l6 9-6 9-6-9z" fill={P.ivory} stroke={P.burgundy} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M44 25h12" stroke={P.burgundy} strokeWidth="1" />
    </svg>
  );
}

/* ── فاصل هادئ ── */
export function Divider({ className = "", tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const c = tone === "light" ? "#E3CFA6" : P.burgundy;
  return (
    <div aria-hidden className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="hairline w-14 md:w-28" /><Star8 size={18} color={c} /><span className="hairline w-14 md:w-28" />
    </div>
  );
}

export function DotRow({ className = "", count = 3, color = P.champagne }: { className?: string; count?: number; color?: string }) {
  return (
    <div aria-hidden className={`flex items-center gap-2 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="anim-soft block rounded-full" style={{ width: i === Math.floor(count / 2) ? 7 : 4, height: i === Math.floor(count / 2) ? 7 : 4, background: color, animation: `twinkle ${3.4 + i * 0.4}s ease-in-out ${i * 0.5}s infinite` }} />
      ))}
    </div>
  );
}

/* ── إطار محراب: صورة داخل قوس بخطّين دقيقين ── */
export function ArchFrame({ children, className = "", ratio = "4 / 5", ghost = true }: { children: React.ReactNode; className?: string; ratio?: string; ghost?: boolean }) {
  return (
    <div className={`relative ${className}`}>
      {ghost && <div aria-hidden className="absolute inset-0 translate-x-3 translate-y-3 border" style={{ borderRadius: "999px 999px 6px 6px", borderColor: "rgba(201,174,130,.7)" }} />}
      <div className="paper relative p-2.5" style={{ borderRadius: "999px 999px 6px 6px", border: "1px solid #D9C6A5", boxShadow: "var(--shadow-soft)" }}>
        <div className="relative overflow-hidden" style={{ borderRadius: "999px 999px 2px 2px", aspectRatio: ratio }}>{children}</div>
      </div>
    </div>
  );
}

/* ── غبار ذهبي ناعم (زينة فقط) ── */
const MOTES = [
  { l: "12%", t: "22%", dur: "6s", delay: "0s" }, { l: "86%", t: "30%", dur: "7.5s", delay: "-2s" },
  { l: "28%", t: "70%", dur: "6.5s", delay: "-3.4s" }, { l: "74%", t: "76%", dur: "8s", delay: "-1s" }, { l: "52%", t: "12%", dur: "7s", delay: "-4s" },
];
export function Motes() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {MOTES.map((m, i) => <span key={i} className="mote" style={{ left: m.l, top: m.t, ["--dur" as string]: m.dur, ["--delay" as string]: m.delay } as React.CSSProperties} />)}
    </div>
  );
}
