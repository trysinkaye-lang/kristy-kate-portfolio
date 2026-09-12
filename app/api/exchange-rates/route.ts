import { createExchangeRateLoader } from "@/lib/exchange-rates";

const loadRates = createExchangeRateLoader();

export async function GET() {
  const data = await loadRates();
  if (!data) {
    return Response.json(
      { base: "PHP", date: null, rates: {}, error: "Live exchange rates are temporarily unavailable." },
      { status: 503, headers: { "Cache-Control": "no-store", "Retry-After": "60" } },
    );
  }
  return Response.json(data, {
    headers: { "Cache-Control": "public, max-age=300, s-maxage=3600" },
  });
}
