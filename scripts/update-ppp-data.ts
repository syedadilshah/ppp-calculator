import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

const API = "https://api.worldbank.org/v2";
const START_YEAR = 2015;
const END_YEAR = new Date().getUTCFullYear();
const ROOT = process.cwd();
const DATA_DIR = path.join(ROOT, "data");

const COUNTRY_META: Record<string, { currencyCode: string; currencySymbol: string; locale: string; flag: string }> = {
  US: { currencyCode: "USD", currencySymbol: "$", locale: "en-US", flag: "🇺🇸" },
  IN: { currencyCode: "INR", currencySymbol: "₹", locale: "en-IN", flag: "🇮🇳" },
  AE: { currencyCode: "AED", currencySymbol: "AED", locale: "en-AE", flag: "🇦🇪" },
  DE: { currencyCode: "EUR", currencySymbol: "€", locale: "de-DE", flag: "🇩🇪" },
  FR: { currencyCode: "EUR", currencySymbol: "€", locale: "fr-FR", flag: "🇫🇷" },
  IT: { currencyCode: "EUR", currencySymbol: "€", locale: "it-IT", flag: "🇮🇹" },
  ES: { currencyCode: "EUR", currencySymbol: "€", locale: "es-ES", flag: "🇪🇸" },
  NL: { currencyCode: "EUR", currencySymbol: "€", locale: "nl-NL", flag: "🇳🇱" },
  GB: { currencyCode: "GBP", currencySymbol: "£", locale: "en-GB", flag: "🇬🇧" },
  PK: { currencyCode: "PKR", currencySymbol: "Rs", locale: "en-PK", flag: "🇵🇰" }
};

async function fetchJson(url: string) {
  const response = await fetch(url, { headers: { "User-Agent": "ppp-calculator-data-refresh/1.0" } });
  if (!response.ok) throw new Error(`World Bank request failed: ${response.status} ${response.statusText}`);
  return response.json();
}

async function fetchCountries() {
  const data = await fetchJson(`${API}/country?format=json&per_page=400`);
  const rows = Array.isArray(data?.[1]) ? data[1] : [];

  return rows
    .filter((row: any) => row?.region?.id && row.region.id !== "NA" && COUNTRY_META[row.iso2Code])
    .map((row: any) => ({
      code: row.iso2Code,
      iso3: row.id,
      name: row.name,
      ...COUNTRY_META[row.iso2Code]
    }));
}

async function fetchIndicator(indicator: string, supportedCodes: Set<string>) {
  const url = `${API}/country/all/indicator/${indicator}?format=json&date=${START_YEAR}:${END_YEAR}&per_page=20000`;
  const data = await fetchJson(url);
  const rows = Array.isArray(data?.[1]) ? data[1] : [];
  const series: Record<string, { year: number; value: number }[]> = {};

  for (const row of rows) {
    const code = row?.country?.id;
    const year = Number(row?.date);
    const value = Number(row?.value);
    if (!supportedCodes.has(code) || !Number.isFinite(year) || !Number.isFinite(value) || value <= 0) continue;
    (series[code] ??= []).push({ year, value });
  }

  for (const observations of Object.values(series)) observations.sort((a, b) => b.year - a.year);
  return series;
}

async function atomicWrite(filename: string, value: unknown) {
  await mkdir(DATA_DIR, { recursive: true });
  const target = path.join(DATA_DIR, filename);
  const temp = `${target}.tmp`;
  await writeFile(temp, `${JSON.stringify(value, null, 2)}\n`, "utf8");
  await rename(temp, target);
}

async function main() {
  const previousPrivate = await readFile(path.join(DATA_DIR, "ppp-private.json"), "utf8").catch(() => "{}");
  const countries = await fetchCountries();
  if (countries.length < 3) throw new Error("Country validation failed; keeping previous dataset.");

  const supportedCodes = new Set(countries.map((country: any) => country.code));
  const privateSeries = await fetchIndicator("PA.NUS.PRVT.PP", supportedCodes);
  const gdpSeries = await fetchIndicator("PA.NUS.PPP", supportedCodes);

  if (Object.keys(privateSeries).length < 3) {
    await writeFile(path.join(DATA_DIR, "ppp-private.json"), previousPrivate, "utf8");
    throw new Error("PPP validation failed; previous private dataset retained.");
  }

  await atomicWrite("countries.json", countries);
  await atomicWrite("ppp-private.json", privateSeries);
  await atomicWrite("ppp-gdp.json", gdpSeries);
  await atomicWrite("metadata.json", {
    generatedAt: new Date().toISOString(),
    source: "World Bank World Development Indicators / International Comparison Program",
    sourceUrl: API,
    license: "CC BY 4.0",
    indicators: { private: "PA.NUS.PRVT.PP", gdp: "PA.NUS.PPP" },
    range: { start: START_YEAR, end: END_YEAR },
    supportedCountries: countries.length
  });

  console.log(`PPP data refreshed for ${countries.length} supported countries.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
