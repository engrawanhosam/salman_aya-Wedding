export type Remaining = { days: number; hours: number; minutes: number; seconds: number; done: boolean };
export function getRemaining(targetISO: string, now: number = Date.now()): Remaining {
  const diff = new Date(targetISO).getTime() - now;
  if (!Number.isFinite(diff) || diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  const s = Math.floor(diff / 1000);
  return { days: Math.floor(s / 86400), hours: Math.floor((s % 86400) / 3600), minutes: Math.floor((s % 3600) / 60), seconds: s % 60, done: false };
}
