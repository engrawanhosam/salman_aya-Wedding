"use client";
import { Music2, Pause, Play } from "lucide-react";
export default function MusicPlayer({ playing, available, onToggle }: { playing: boolean; available: boolean; onToggle: () => void }) {
  if (!available) return null;
  const label = playing ? "إيقاف الموسيقى" : "تشغيل الموسيقى";
  return (
    <button type="button" onClick={onToggle} aria-label={label} aria-pressed={playing}
      className="fixed z-40 flex min-h-11 items-center gap-2 rounded-full px-4 text-[0.85rem] text-burgundy transition active:scale-95"
      style={{ top: "calc(env(safe-area-inset-top) + 12px)", left: 12, background: "rgba(251,247,240,.88)", border: "1px solid #C9AE82", boxShadow: "0 8px 20px -12px rgba(74,20,36,.45)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}>
      {playing ? (
        <span aria-hidden className="flex h-4 items-end gap-[3px]">
          {[0, 0.25, 0.5].map((d) => <span key={d} className="w-[3px] origin-bottom rounded-full bg-burgundy" style={{ height: "100%", animation: `eq 1.1s ease-in-out ${d}s infinite` }} />)}
        </span>
      ) : <Music2 size={16} strokeWidth={1.6} aria-hidden />}
      <span>{label}</span>
      {playing ? <Pause size={14} aria-hidden /> : <Play size={14} aria-hidden />}
    </button>
  );
}
