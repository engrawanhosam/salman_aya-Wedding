import { invitation } from "@/data/invitation";
/** رمز العروسين: حلقتان متداخلتان تحمل كل منهما حرفاً، بخطوط رفيعة. */
export default function Monogram({ size = 120, tone = "gold", className = "" }: { size?: number; tone?: "gold" | "emboss" | "light"; className?: string }) {
  const c = tone === "light" ? "#F6EAD4" : "#6E1F34";
  const c2 = tone === "light" ? "#DDBF8A" : "#B08E58";
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" className={className} role="img" aria-label={`رمز ${invitation.groom.name} و${invitation.bride.name}`}>
      <circle cx="60" cy="60" r="56" fill="none" stroke={c2} strokeWidth="0.9" />
      <circle cx="60" cy="60" r="52" fill="none" stroke={c2} strokeWidth="0.5" strokeDasharray="0.8 3.4" strokeLinecap="round" />
      <circle cx="47" cy="63" r="24" fill="none" stroke={c} strokeWidth="1.3" />
      <circle cx="73" cy="63" r="24" fill="none" stroke={c2} strokeWidth="1.3" />
      <text x="41" y="77" textAnchor="middle" fontSize="38" fontFamily="var(--font-amiri), serif" fontWeight="700" fill={c}>{invitation.groom.initial}</text>
      <text x="79" y="77" textAnchor="middle" fontSize="38" fontFamily="var(--font-amiri), serif" fontWeight="700" fill={c2}>{invitation.bride.initial}</text>
      <path d="M60 22l5 7-5 7-5-7z" fill={c} />
    </svg>
  );
}
