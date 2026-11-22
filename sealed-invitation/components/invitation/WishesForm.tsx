"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { invitation } from "@/data/invitation";
import Reveal from "./Reveal";
import Monogram from "./Monogram";
import { Divider } from "./Ornaments";

type Wish = { id: string; name: string; message: string; ts: number };

export default function WishesForm() {
  const w = invitation.wishes;
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [trap, setTrap] = useState("");
  const [err, setErr] = useState<{ name?: string; msg?: string }>({});
  const [stamped, setStamped] = useState(false);
  const [info, setInfo] = useState("");
  const [busy, setBusy] = useState(false);
  const [list, setList] = useState<Wish[] | null>(null);

  useEffect(() => {
    fetch("/api/wishes", { cache: "no-store" }).then((r) => r.json()).then((d) => setList(d.wishes ?? [])).catch(() => setList([]));
  }, []);

  const submit = async () => {
    const e: typeof err = {};
    if (!name.trim()) e.name = "فضلاً اكتبوا اسمكم.";
    if (!msg.trim()) e.msg = "فضلاً اكتبوا رسالتكم.";
    setErr(e); setInfo("");
    if (e.name || e.msg || busy) return;
    setBusy(true);
    try {
      const r = await fetch("/api/wishes", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, message: msg, website: trap }) });
      if (r.status === 429) { setInfo("وصلتنا رسالتكم قبل قليل، جرّبوا بعد لحظات."); return; }
      if (!r.ok) throw new Error();
      const d = await r.json();
      if (d.wish) setList((l) => [d.wish, ...(l ?? [])]);
      setStamped(true); setName(""); setMsg("");
      setInfo("وصلتنا كلماتكم الجميلة، شكراً لكم ♡");
    } catch { setInfo("تعذّر الإرسال الآن، حاولوا مرة أخرى بعد قليل."); }
    finally { setBusy(false); }
  };

  const field = "w-full bg-transparent px-1 py-2 text-ink placeholder:text-taupe/60 outline-none transition focus:bg-cream/60 border-b border-line focus:border-burgundy";
  return (
    <section aria-label="رسالة للعروسين" className="relative px-5 py-16 md:py-24">
      <Reveal className="relative z-10 mx-auto max-w-2xl text-center">
        <h2 className="names-text font-names text-[2.6rem] leading-[1.4] md:text-[3.6rem]">{w.title}</h2>
        <Divider className="mt-2" />
        <p className="text-balance mt-5 font-naskh text-[1.2rem] leading-loose text-ink md:text-[1.5rem]">{w.intro}</p>

        <div className="paper relative mt-9 px-6 pb-6 pt-7 text-start md:px-10 md:pt-9" style={{ border: "1px solid #D9C6A5", borderRadius: 4, boxShadow: "var(--shadow-soft), inset 0 0 0 6px #FFFCF7, inset 0 0 0 7px #E7D9BF" }}>
          <input tabIndex={-1} autoComplete="off" aria-hidden value={trap} onChange={(e) => setTrap(e.target.value)} name="website" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
          <label htmlFor="wish-name" className="text-sm text-taupe">الاسم</label>
          <input id="wish-name" value={name} onChange={(e) => setName(e.target.value)} placeholder={w.namePlaceholder} autoComplete="name" aria-invalid={!!err.name} aria-describedby={err.name ? "wish-name-err" : undefined}
            className={`${field} font-naskh text-xl`} />
          {err.name && <p id="wish-name-err" role="alert" className="mt-1 text-sm text-[#9B4B3B]">{err.name}</p>}
          <label htmlFor="wish-msg" className="mt-6 block text-sm text-taupe">التهنئة</label>
          <textarea id="wish-msg" value={msg} onChange={(e) => setMsg(e.target.value)} placeholder={w.messagePlaceholder} rows={5} aria-invalid={!!err.msg} aria-describedby={err.msg ? "wish-msg-err" : undefined}
            className={`${field} resize-none font-naskh text-xl leading-[2.1]`} />
          {err.msg && <p id="wish-msg-err" role="alert" className="mt-1 text-sm text-[#9B4B3B]">{err.msg}</p>}

          <div className="relative mt-3 flex min-h-14 items-center justify-center">
            <AnimatePresence>
              {stamped && (
                <motion.div key="stamp" initial={{ scale: 1.8, opacity: 0, rotate: -18 }} animate={{ scale: 1, opacity: 0.9, rotate: -8 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="absolute -top-1 left-2" aria-hidden>
                  <Monogram size={58} tone="gold" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <button type="button" onClick={submit} disabled={busy} className="btn-solid disabled:opacity-60 mt-7 min-h-[3.3rem] rounded-full px-10 py-3 text-lg font-bold active:scale-[0.97]">
          {w.button}
        </button>
        <p role="status" aria-live="polite" className="mx-auto mt-4 min-h-6 max-w-xs text-sm leading-relaxed text-taupe">
          {info}
        </p>

        {list && list.length > 0 && (
          <ul className="mt-10 space-y-4 text-start" aria-label="تهاني الضيوف">
            {list.map((x) => (
              <li key={x.id} className="paper relative px-6 py-5" style={{ border: "1px solid #E2D3BF", borderRadius: 4, boxShadow: "var(--shadow-soft)" }}>
                <p className="font-naskh text-[1.2rem] leading-[2] text-ink md:text-[1.35rem]">{x.message}</p>
                <p className="mt-2 flex items-center gap-2 text-sm text-burgundy"><span aria-hidden className="h-px w-6 bg-champagne" />{x.name}</p>
              </li>
            ))}
          </ul>
        )}
      </Reveal>
    </section>
  );
}
