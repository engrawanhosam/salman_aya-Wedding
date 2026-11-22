/**
 * نزول تلقائي بطيء وناعم نحو عنصر معيّن (easeInOutSine).
 * يتوقف فوراً إذا لمس الضيف الشاشة أو حرّك العجلة أو ضغط مفتاحاً.
 * يرجع دالة إلغاء.
 */
export function glideToElement(id: string, duration = 5200): () => void {
  const el = document.getElementById(id);
  if (!el) return () => {};
  const startY = window.scrollY;
  const t0 = performance.now();
  let raf = 0;
  let stopped = false;
  const events = ["wheel", "touchstart", "pointerdown", "keydown"] as const;
  const cancel = () => {
    if (stopped) return;
    stopped = true;
    cancelAnimationFrame(raf);
    events.forEach((e) => window.removeEventListener(e, cancel));
  };
  events.forEach((e) => window.addEventListener(e, cancel, { passive: true }));
  const ease = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;
  const step = (now: number) => {
    if (stopped) return;
    const p = Math.min((now - t0) / duration, 1);
    const targetY = el.getBoundingClientRect().top + window.scrollY - 8;
    window.scrollTo({ top: startY + (targetY - startY) * ease(p), behavior: "instant" as ScrollBehavior });
    if (p < 1) raf = requestAnimationFrame(step); else cancel();
  };
  raf = requestAnimationFrame(step);
  return cancel;
}
