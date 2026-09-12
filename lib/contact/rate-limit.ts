import { createHash } from "node:crypto";

export function createMemoryLimiter(limit = 5, windowMs = 15 * 60_000) {
  const attempts = new Map<string, { count: number; until: number }>();
  return (key: string, now = Date.now()) => {
    for (const [id, entry] of attempts) if (entry.until <= now) attempts.delete(id);
    const entry = attempts.get(key) ?? { count: 0, until: now + windowMs };
    if (!attempts.has(key) && attempts.size >= 5000) return { allowed: false, retryAfter: Math.ceil(windowMs / 1000) };
    entry.count += 1;
    attempts.set(key, entry);
    return { allowed: entry.count <= limit, retryAfter: Math.max(1, Math.ceil((entry.until - now) / 1000)) };
  };
}
const memoryLimit = createMemoryLimiter();
export async function checkContactRateLimit(request: Request) {
  // Vercel overwrites this header. Do not trust arbitrary forwarded headers on self-hosted servers.
  const address = process.env.VERCEL ? (request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() || "unknown") : "local";
  const key = "portfolio:contact:" + createHash("sha256").update(address).digest("hex");
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url && !token) return memoryLimit(key);
  if (!url || !token || !url.startsWith("https://")) throw new Error("Rate limit configuration unavailable");
  const script = "local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],900) end; return {n,redis.call('TTL',KEYS[1])}";
  const response = await fetch(url, { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify(["EVAL", script, "1", key]), signal: AbortSignal.timeout(5000), cache: "no-store" });
  if (!response.ok) throw new Error("Rate limit unavailable");
  const result = await response.json();
  if (!Array.isArray(result.result) || !Number.isFinite(result.result[0]) || !Number.isFinite(result.result[1])) throw new Error("Invalid rate limit response");
  return { allowed: result.result[0] <= 5, retryAfter: Math.max(1, result.result[1]) };
}

