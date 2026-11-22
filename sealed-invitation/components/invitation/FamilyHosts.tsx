import { invitation } from "@/data/invitation";
import Reveal from "./Reveal";
import { Rings } from "./Ornaments";
function Host({ t, n, k }: { t: string; n: string; k: string }) {
  return (
    <div className="flex-1 px-2 text-center">
      <p className="font-sans text-[0.85rem] tracking-wide text-taupe md:text-xl">{t}</p>
      <p className="mt-1.5 font-naskh text-[1.35rem] font-bold leading-snug text-ink md:text-[2.4rem]">{n}</p>
      <p className="mt-1 font-naskh text-[1.05rem] text-burgundy md:text-2xl">{k}</p>
    </div>
  );
}
export default function FamilyHosts() {
  const { right, left } = invitation.fathers;
  return (
    <section aria-label="الأسرتان" className="relative px-4 py-16 md:py-28">
      <Reveal className="mx-auto flex max-w-3xl items-stretch justify-center">
        <Host t={right.title} n={right.name} k={right.kunya} />
        <div aria-hidden className="w-px self-stretch" style={{ background: "linear-gradient(180deg, transparent, #C9AE82, transparent)" }} />
        <Host t={left.title} n={left.name} k={left.kunya} />
      </Reveal>
      <Reveal delay={0.2} className="mx-auto mt-12 flex max-w-2xl flex-col items-center text-center">
        <Rings size={72} />
        <p className="text-balance mt-4 font-naskh text-[1.5rem] leading-loose text-ink md:text-[2.1rem]">{invitation.inviteText}</p>
      </Reveal>
    </section>
  );
}
