"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { MotionConfig, motion } from "framer-motion";
import { invitation } from "@/data/invitation";
import { glideToElement } from "@/lib/autoscroll";
import OpeningEnvelope from "./OpeningEnvelope";
import InvitationContent from "./InvitationContent";
import MusicPlayer from "./MusicPlayer";

const GLIDE_DELAY = 2600;     // مهلة قصيرة لتأمّل الغلاف قبل أن تبدأ الشاشة بالنزول
const GLIDE_DURATION = 5600;  // مدة النزول: بطيء وناعم

export default function Experience() {
  const [opened, setOpened] = useState(false);     // انتهت حركة المظروف واختفى
  const [showContent, setShowContent] = useState(false); // الدعوة تظهر تحت المظروف أثناء تلاشيه
  const [envelopeKey, setEnvelopeKey] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [audioOk, setAudioOk] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    document.body.classList.toggle("locked", !opened);
    return () => document.body.classList.remove("locked");
  }, [opened]);

  // بعد فتح الدعوة: تنزل الشاشة وحدها ببطء إلى الآية، وتتوقف فور لمس الضيف أو تحريكه للصفحة
  useEffect(() => {
    if (!opened) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancel = () => {};
    const t = setTimeout(() => { cancel = glideToElement("verse", GLIDE_DURATION); }, GLIDE_DELAY);
    return () => { clearTimeout(t); cancel(); };
  }, [opened]);

  const play = useCallback(async () => {
    const a = audioRef.current; if (!a) return;
    try { await a.play(); setPlaying(true); } catch { setPlaying(false); } // قد يمنع المتصفح التشغيل أو يغيب الملف
  }, []);
  const toggle = useCallback(() => {
    const a = audioRef.current; if (!a) return;
    if (a.paused) void play(); else { a.pause(); setPlaying(false); }
  }, [play]);

  const replay = () => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    setOpened(false); setShowContent(false); setEnvelopeKey((k) => k + 1);
  };

  return (
    <MotionConfig reducedMotion="user">
      <audio ref={audioRef} src={invitation.music.src} loop preload="none"
        onError={() => { setAudioOk(false); setPlaying(false); }} onEnded={() => setPlaying(false)} />
      {showContent && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.8 }}>
          <MusicPlayer playing={playing} available={audioOk} onToggle={toggle} />
          <InvitationContent onBack={replay} />
        </motion.div>
      )}
      {!opened && <OpeningEnvelope key={envelopeKey} onOpen={() => { if (!playing) void play(); }} onLeave={() => setShowContent(true)} onDone={() => { setOpened(true); window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior }); }} />}
    </MotionConfig>
  );
}
