"use client";

import { useMemo, useState } from "react";
import { calculateGDPppp } from "@/lib/ppp/calculateGDPppp";
import type { CountryMeta, CountryPPPSeries } from "@/types/ppp";

const multipliers = { million: 1e6, billion: 1e9, trillion: 1e12, crore: 1e7, "lakh-crore": 1e12 } as const;
type Unit = keyof typeof multipliers;

export function GDPPCalculator({ countries, series }: { countries: CountryMeta[]; series: CountryPPPSeries }) {
  const available = useMemo(() => countries.filter((c) => series[c.code]?.length), [countries, series]);
  const [countryCode, setCountryCode] = useState(available.find((c) => c.code === "IN")?.code ?? available[0]?.code ?? "");
  const country = available.find((c) => c.code === countryCode);
  const years = series[countryCode]?.map((o) => o.year) ?? [];
  const [year, setYear] = useState<number | undefined>(years[0]);
  const [amount, setAmount] = useState("100");
  const [unit, setUnit] = useState<Unit>("trillion");
  const [result, setResult] = useState<ReturnType<typeof calculateGDPppp> | null>(null);
  const [error, setError] = useState("");

  if (!country) return <p>GDP PPP data is unavailable.</p>;

  function changeCountry(code: string) {
    setCountryCode(code);
    setYear(series[code]?.[0]?.year);
    setResult(null);
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const localAmount = Number(amount.replace(/,/g, "")) * multipliers[unit];
      if (!year) throw new Error("Choose a valid observation year.");
      setResult(calculateGDPppp(localAmount, series[countryCode] ?? [], year));
      setError("");
    } catch (caught) {
      setResult(null);
      setError(caught instanceof Error ? caught.message : "Unable to calculate GDP at PPP.");
    }
  }

  return (
    <>
      <form className="calculator-card" onSubmit={submit}>
        <div className="eyebrow">Economy-level PPP</div>
        <h2>Calculate GDP at purchasing power parity</h2>
        <div className="two-col-fields">
          <label><span>Country</span><select value={countryCode} onChange={(e) => changeCountry(e.target.value)}>{available.map((c) => <option key={c.code} value={c.code}>{c.flag} {c.name} ({c.currencyCode})</option>)}</select></label>
          <label><span>Observation year</span><select value={year ?? ""} onChange={(e) => { setYear(Number(e.target.value)); setResult(null); }}>{years.map((y) => <option key={y} value={y}>{y}</option>)}</select></label>
        </div>
        <div className="two-col-fields">
          <label className="amount-field"><span>GDP amount</span><div className="amount-wrap"><span>{country.currencySymbol}</span><input inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} /></div></label>
          <label className="amount-field"><span>Unit</span><select value={unit} onChange={(e) => setUnit(e.target.value as Unit)}><option value="million">Million</option><option value="billion">Billion</option><option value="trillion">Trillion</option><option value="crore">Crore</option><option value="lakh-crore">Lakh crore</option></select></label>
        </div>
        <button className="primary-button" type="submit">Calculate GDP at PPP</button>
        {error ? <p className="form-error">{error}</p> : <p className="helper">GDP PPP converts local-currency GDP to international-dollar purchasing-power terms.</p>}
      </form>
      {result ? <section className="result-card" aria-live="polite"><div className="eyebrow">GDP at PPP</div><h3>Intl$ {new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(result.internationalDollarGDP)}</h3><p className="result-context">{country.flag} {country.name}</p><dl className="result-metrics"><div><dt>PPP factor</dt><dd>{result.factor.toFixed(4)}</dd></div><div><dt>Observation year</dt><dd>{result.year}</dd></div></dl><p className="result-note">International dollars are analytical units, not a currency that can be exchanged at a bank.</p></section> : null}
    </>
  );
}
