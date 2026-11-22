"use client";
import Hero from "./Hero";
import QuranVerse from "./QuranVerse";
import FamilyHosts from "./FamilyHosts";
import CoupleNames from "./CoupleNames";
import MemoryPhoto from "./MemoryPhoto";
import Countdown from "./Countdown";
import VenueSection from "./VenueSection";
import GuestNotes from "./GuestNotes";
import WishesForm from "./WishesForm";
import ClosingSection from "./ClosingSection";
import { CornerSprig } from "./Ornaments";

type Tone = "ivory" | "cream" | "blush";
const TONES: Record<Tone, string> = { ivory: "#FBF7F0", cream: "#F4ECDF", blush: "#F3E7E1" };

/** قسم بخلفية ناعمة تتلاشى أطرافها فلا تظهر حدود قاسية بين الأقسام. */
function Band({ tone, corners = [], children }: { tone: Tone; corners?: ("tl" | "tr" | "bl" | "br")[]; children: React.ReactNode }) {
  const c = TONES[tone];
  const bg = tone === "ivory" ? c : `linear-gradient(180deg, ${TONES.ivory} 0%, ${c} 110px, ${c} calc(100% - 110px), ${TONES.ivory} 100%)`;
  return (
    <div style={{ background: bg }} className="relative overflow-hidden">
      {corners.map((p) => <CornerSprig key={p} pos={p} className="hidden w-44 opacity-60 md:block" />)}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default function InvitationContent({ onBack }: { onBack: () => void }) {
  return (
    <main className="relative z-[2] w-full overflow-hidden" style={{ background: TONES.ivory }}>
      <Hero />
      <Band tone="ivory" corners={["tr", "bl"]}><QuranVerse /></Band>
      <Band tone="cream"><FamilyHosts /></Band>
      <Band tone="ivory" corners={["tl", "br"]}><CoupleNames /></Band>
      <Band tone="blush"><MemoryPhoto /></Band>
      <Band tone="ivory" corners={["tr", "bl"]}><Countdown /></Band>
      <Band tone="cream"><VenueSection /></Band>
      <Band tone="ivory"><GuestNotes /></Band>
      <Band tone="blush"><WishesForm /></Band>
      <div className="wine relative overflow-hidden">
        <CornerSprig pos="tl" tone="light" className="w-28 md:w-56" /><CornerSprig pos="tr" tone="light" className="w-28 md:w-56" />
        <CornerSprig pos="bl" tone="light" className="w-28 md:w-56" /><CornerSprig pos="br" tone="light" className="w-28 md:w-56" />
        <ClosingSection onBack={onBack} />
      </div>
    </main>
  );
}
