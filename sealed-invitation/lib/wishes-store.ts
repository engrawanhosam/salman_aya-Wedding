// تخزين التهاني: Upstash Redis (يُضاف من Vercel) — وبدونه يعمل مؤقتاً في الذاكرة للتجربة المحلية فقط.
export type Wish = { id: string; name: string; message: string; ts: number };

const URL_ = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
export const persistent = Boolean(URL_ && TOKEN);

const mem: { wishes: Wish[]; locks: Map<string, number> } = (globalThis as any).__wishMem ??= { wishes: [], locks: new Map() };

async function cmd(args: (string | number)[]) {
  const r = await fetch(URL_!, { method: "POST", headers: { Authorization: `Bearer ${TOKEN}` }, body: JSON.stringify(args), cache: "no-store" });
  if (!r.ok) throw new Error(`redis ${r.status}`);
  return (await r.json()).result;
}

export async function listWishes(limit = 60): Promise<Wish[]> {
  if (!persistent) return mem.wishes.slice(0, limit);
  const rows: string[] = (await cmd(["LRANGE", "wishes", 0, limit - 1])) ?? [];
  return rows.map((x) => { try { return JSON.parse(x) as Wish; } catch { return null; } }).filter(Boolean) as Wish[];
}

/** يمنع تكرار الإرسال من نفس الجهاز خلال 30 ثانية. */
export async function takeLock(key: string, seconds = 30): Promise<boolean> {
  if (!persistent) {
    const now = Date.now(); const until = mem.locks.get(key) ?? 0;
    if (until > now) return false; mem.locks.set(key, now + seconds * 1000); return true;
  }
  return (await cmd(["SET", `lock:${key}`, "1", "NX", "EX", seconds])) === "OK";
}

export async function addWish(w: Wish) {
  if (!persistent) { mem.wishes.unshift(w); mem.wishes.splice(500); return; }
  await cmd(["LPUSH", "wishes", JSON.stringify(w)]);
  await cmd(["LTRIM", "wishes", 0, 499]);
}
