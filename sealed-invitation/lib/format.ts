const AR = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
/** يحوّل الأرقام اللاتينية داخل نص إلى أرقام هندية عربية (٠-٩). */
export const toArabicDigits = (s: string | number) => String(s).replace(/\d/g, (d) => AR[Number(d)]);
/** يفصل "14 ديسمبر 2026" إلى يوم وشهر-سنة، بأرقام عربية. */
export function splitDate(display: string) {
  const [day, ...rest] = display.trim().split(/\s+/);
  return { day: toArabicDigits(day), monthYear: toArabicDigits(rest.join(" ")) };
}
