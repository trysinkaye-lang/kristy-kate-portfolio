import { z } from "zod";
import { currencyMeta } from "@/data/packages";

const supportedCurrencies = Object.keys(currencyMeta).filter(code => code !== "PHP");
const providerSchema = z.object({
  base: z.literal("PHP"),
  date: z.iso.date(),
  rates: z.record(z.string(), z.number().positive()),
});
export type ExchangeRates = z.infer<typeof providerSchema>;

// A warm instance shares one request and backs off after provider failures.
// HTTP caching in the route also shares successful rates at the CDN/browser.
export function createExchangeRateLoader(providerFetch: typeof fetch = fetch, now = Date.now) {
  let cached: ExchangeRates | null = null;
  let expiresAt = 0;
  let pending: Promise<ExchangeRates | null> | undefined;

  async function refresh() {
    try {
      const response = await providerFetch(
        `https://api.frankfurter.dev/v1/latest?base=PHP&symbols=${supportedCurrencies.join(",")}`,
        { cache: "no-store", signal: AbortSignal.timeout(8000) },
      );
      if (!response.ok) throw new Error("Rates unavailable");
      const data = providerSchema.parse(await response.json());
      const rates = Object.fromEntries(Object.entries(data.rates).filter(([code]) => supportedCurrencies.includes(code)));
      if (!Object.keys(rates).length) throw new Error("Missing supported rates");
      cached = { base: "PHP", date: data.date, rates };
      expiresAt = now() + 3_600_000;
    } catch {
      cached = null;
      expiresAt = now() + 60_000;
    }
    return cached;
  }

  return function loadRates() {
    if (now() < expiresAt) return Promise.resolve(cached);
    pending ??= refresh().finally(() => { pending = undefined; });
    return pending;
  };
}
