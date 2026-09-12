const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:3100";
const started = Date.now();
const response = await fetch(`${baseURL}/api/exchange-rates`, { cache: "no-store" });
const body = await response.json();
const report = {
  status: response.status,
  cacheControl: response.headers.get("cache-control"),
  retryAfter: response.headers.get("retry-after"),
  base: body.base,
  date: body.date,
  currencies: Object.keys(body.rates ?? {}).sort(),
  durationMs: Date.now() - started,
};

console.log(JSON.stringify(report, null, 2));

if (response.status !== 200) {
  throw new Error(`Expected a successful live exchange-rate response, received ${response.status}`);
}
if (report.cacheControl !== "public, max-age=300, s-maxage=3600") {
  throw new Error(`Unexpected Cache-Control: ${report.cacheControl}`);
}
if (report.retryAfter !== null) {
  throw new Error(`Retry-After must be absent on success, received ${report.retryAfter}`);
}
if (report.base !== "PHP" || typeof report.date !== "string" || report.currencies.length === 0) {
  throw new Error("Live exchange-rate payload is incomplete");
}
