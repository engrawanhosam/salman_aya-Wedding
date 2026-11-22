import { invitation } from "@/data/invitation";
import { toArabicDigits } from "@/lib/format";
import Reveal from "./Reveal";
import { Star8 } from "./Ornaments";
export default function QuranVerse() {
  return (
    <section id="verse" aria-label="الآية الكريمة" className="relative px-5 pb-16 pt-14 md:pb-28 md:pt-24">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="mb-9 font-naskh text-[1.7rem] text-gold md:text-4xl">{invitation.basmala}</p>
        <div className="paper relative mx-auto px-6 pb-12 pt-14 md:px-16 md:pb-16 md:pt-20" style={{ border: "1px solid #D9C6A5", borderRadius: 4, boxShadow: "var(--shadow-soft), inset 0 0 0 7px #FFFCF7, inset 0 0 0 8px #E7D9BF" }}>
          <span aria-hidden className="absolute -top-4 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center bg-ivory"><Star8 size={22} color="#6E1F34" /></span>
          <p className="font-naskh text-[1.5rem] leading-[2.55] text-ink md:text-[2.3rem] md:leading-[2.45]">{invitation.verse}</p>
          <div className="mt-7 flex items-center justify-center gap-3" aria-hidden><span className="hairline w-14 md:w-28" /><span className="h-1.5 w-1.5 rotate-45 bg-champagne" /><span className="hairline w-14 md:w-28" /></div>
          <p className="mt-4 font-sans text-sm tracking-wide text-taupe md:text-lg">{toArabicDigits(invitation.verseSource)}</p>
        </div>
      </Reveal>
    </section>
  );
}
