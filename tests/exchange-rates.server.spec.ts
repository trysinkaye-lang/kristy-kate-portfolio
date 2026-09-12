import { test, expect } from "@playwright/test";
import { createExchangeRateLoader } from "../lib/exchange-rates";

const valid = { base: "PHP", date: "2026-09-11", rates: { USD: 0.0175, EUR: 0.015, XYZ: 42 } };

test("reference rates share concurrent requests, filter currencies, and expire after an hour", async () => {
  let calls = 0;
  let time = 100;
  const load = createExchangeRateLoader(async (_url, options) => {
    calls++;
    expect(options?.signal).toBeInstanceOf(AbortSignal);
    return Response.json(valid);
  }, () => time);
  const [first, second] = await Promise.all([load(), load()]);
  expect(first).toEqual({ ...valid, rates: { USD: 0.0175, EUR: 0.015 } });
  expect(second).toEqual(first);
  await load();
  expect(calls).toBe(1);
  time += 3_600_000;
  await load();
  expect(calls).toBe(2);
});

test("invalid provider data cannot become a displayed reference price", async () => {
  for (const body of [null, {}, { ...valid, base: "USD" }, { ...valid, date: "2026-02-30" },
    { ...valid, rates: {} }, { ...valid, rates: { USD: "0.0175" } },
    { ...valid, rates: { USD: 0 } }, { ...valid, rates: { USD: -1 } },
    { ...valid, rates: { XYZ: 1 } }]) {
    const load = createExchangeRateLoader(async () => Response.json(body));
    expect(await load()).toBeNull();
  }
});

test("provider errors, rate limiting, invalid JSON, and timeouts back off and recover", async () => {
  const failures: (() => Promise<Response>)[] = [
    async () => Response.json({}, { status: 429 }),
    async () => Response.json({}, { status: 500 }),
    async () => new Response("{invalid"),
    async () => { throw new DOMException("Timed out", "TimeoutError"); },
  ];
  for (const fail of failures) {
    let calls = 0;
    let time = 100;
    const load = createExchangeRateLoader(async () => ++calls === 1 ? fail() : Response.json(valid), () => time);
    expect(await load()).toBeNull();
    expect(await load()).toBeNull();
    expect(calls).toBe(1);
    time += 60_000;
    expect(await load()).not.toBeNull();
    expect(calls).toBe(2);
  }
});
