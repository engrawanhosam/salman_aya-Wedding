import { NextResponse } from "next/server";
import { addWish, listWishes, takeLock, type Wish } from "@/lib/wishes-store";
export const dynamic = "force-dynamic";

const clean = (s: unknown, max: number) => (typeof s === "string" ? s.replace(/\s+/g, " ").trim().slice(0, max) : "");
const noStore = { headers: { "Cache-Control": "no-store" } };

export async function GET() {
  try { return NextResponse.json({ wishes: await listWishes() }, noStore); }
  catch { return NextResponse.json({ wishes: [] }, noStore); }
}

export async function POST(req: Request) {
  let body: any; try { body = await req.json(); } catch { return NextResponse.json({ error: "bad" }, { status: 400 }); }
  if (body?.website) return NextResponse.json({ ok: true });            // فخ للروبوتات
  const name = clean(body?.name, 40);
  const message = clean(body?.message, 400);
  if (!name || !message) return NextResponse.json({ error: "empty" }, { status: 400 });
  const ip = (req.headers.get("x-forwarded-for") || "anon").split(",")[0].trim();
  try {
    if (!(await takeLock(ip))) return NextResponse.json({ error: "slow" }, { status: 429 });
    const wish: Wish = { id: crypto.randomUUID(), name, message, ts: Date.now() };
    await addWish(wish);
    return NextResponse.json({ ok: true, wish });
  } catch { return NextResponse.json({ error: "server" }, { status: 500 }); }
}
