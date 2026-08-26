"use client";

import { useMemo, useState } from "react";
import { calculatePPP } from "@/lib/ppp/calculatePPP";
import { PPPError, type CountryMeta, type CountryPPPSeries, type PPPResult } from "@/types/ppp";
import { PPPResultCard } from "@/components/results/PPPResultCard";

type Props = {
  countries: CountryMeta[];
  series: CountryPPPSeries;
  defaultFrom?: string;
  defaultTo?: string;
};

export function PPPCalculator({ countries, series, defaultFrom = "US", defaultTo = "IN" }: Props) {
  const availableCountries = useMemo(
    () => countries.filter((country) => Boolean(series[country.code]?.length)),
    [countries, series]
  );
  const [from, setFrom] = useState(defaultFrom);
  const [to, setTo] = useState(defaultTo);
  const [amount, setAmount] = useState("100000");
  const [result, setResult] = useState<PPPResult | null>(null);
  const [error, setError] = useState("");

  const source = availableCountries.find((country) => country.code === from) ?? availableCountries[0];
  const target = availableCountries.find((country) => country.code === to) ?? availableCountries[1];

  function handleSwap() {
    setFrom(to);
    setTo(from);
    setResult(null);
    setError("");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    try {
      const numericAmount = Number(amount.replace(/,/g, ""));
      const nextResult = calculatePPP({
        sourceCountry: from,
        targetCountry: to,
        amount: numericAmount,
        series,
        indicator: "private"
      });
      setResult(nextResult);
    } catch (caught) {
      setResult(null);
      setError(caught instanceof PPPError ? caught.message : "Unable to calculate PPP right now.");
    }
  }

  if (!source || !target) {
    return <p>PPP data is unavailable.</p>;
  }

  return (
    <>
      <form className="calculator-card" onSubmit={handleSubmit} aria-labelledby="calculator-heading">
        <div className="eyebrow">World Bank-backed calculator</div>
        <h2 id="calculator-heading">Compare purchasing power</h2>
        <div className="field-grid">
          <label>
            <span>From Country</span>
            <select value={from} onChange={(event) => { setFrom(event.target.value); setResult(null); }}>
              {availableCountries.map((country) => (
                <option key={country.code} value={country.code}>{country.flag} {country.name} ({country.currencyCode})</option>
              ))}
            </select>
          </label>
          <button className="swap" type="button" onClick={handleSwap} aria-label="Swap countries">⇄</button>
          <label>
            <span>To Country</span>
            <select value={to} onChange={(event) => { setTo(event.target.value); setResult(null); }}>
              {availableCountries.map((country) => (
                <option key={country.code} value={country.code}>{country.flag} {country.name} ({country.currencyCode})</option>
              ))}
            </select>
          </label>
        </div>
        <label className="amount-field">
          <span>Amount</span>
          <div className="amount-wrap"><span>{source.currencySymbol}</span><input inputMode="decimal" value={amount} onChange={(event) => setAmount(event.target.value)} aria-label="Amount" /></div>
        </label>
        <button className="primary-button" type="submit">Calculate PPP</button>
        {error ? <p className="form-error" role="alert">{error}</p> : <p className="helper">Uses the latest common available household-consumption PPP observation for both selected countries.</p>}
      </form>
      {result ? <PPPResultCard result={result} source={source} target={target} /> : null}
    </>
  );
}
