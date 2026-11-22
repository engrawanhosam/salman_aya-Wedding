import { invitation } from "@/data/invitation";
const esc = (s: string) => s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
export function buildIcs(): string {
  const { event, venue, calendar } = invitation;
  const start = new Date(event.targetISO);
  const p = (n: number) => String(n).padStart(2, "0");
  const fmt = (d: Date) => `${d.getUTCFullYear()}${p(d.getUTCMonth() + 1)}${p(d.getUTCDate())}T${p(d.getUTCHours())}${p(d.getUTCMinutes())}${p(d.getUTCSeconds())}Z`;
  // لم يُحدَّد وقت النهاية: حدث بلا DTEND (مدة صفرية) بدل اختراع وقت.
  return [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//The Sealed Invitation//AR", "CALSCALE:GREGORIAN", "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:sealed-invitation-${fmt(start)}@invitation`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`,
    `SUMMARY:${esc(calendar.title)}`,
    `LOCATION:${esc(`${venue.hotel} — ${venue.hall}، ${venue.address}`)}`,
    `DESCRIPTION:${esc(calendar.description)}`,
    "END:VEVENT", "END:VCALENDAR",
  ].join("\r\n");
}
export function downloadIcs() {
  const blob = new Blob([buildIcs()], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "wedding-salman-aya.ics";
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
