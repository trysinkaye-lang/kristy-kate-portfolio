import { NextResponse } from "next/server";

const supportedCurrencies = [
  "USD",
  "EUR",
  "GBP",
  "CAD",
  "AUD",
  "SGD",
  "JPY",
  "NZD",
  "CHF",
  "INR",
  "KRW",
  "MYR",
  "THB",
];

export async function GET() {
  const query = supportedCurrencies.join(",");

  try {
    const response = await fetch(
      `https://api.frankfurter.app/latest?from=PHP&to=${query}`,
      { next: { revalidate: 3600 } },
    );

    if (!response.ok) {
      throw new Error(`Exchange-rate provider returned ${response.status}`);
    }

    const data = (await response.json()) as {
      date?: string;
      rates?: Record<string, number>;
    };

    return NextResponse.json({
      base: "PHP",
      date: data.date ?? null,
      rates: data.rates ?? {},
    });
  } catch {
    return NextResponse.json(
      {
        base: "PHP",
        date: null,
        rates: {},
        error: "Live exchange rates are temporarily unavailable.",
      },
      { status: 503 },
    );
  }
}
