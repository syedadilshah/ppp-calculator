"use client";

import { useMemo, useState } from "react";
import { calculateSalaryPPP } from "@/lib/ppp/calculateSalaryPPP";
import { formatCurrency } from "@/lib/ppp/formatCurrency";
import { PPPError, type CountryMeta, type CountryPPPSeries } from "@/types/ppp";

type Props = {
  countries: CountryMeta[];
  series: CountryPPPSeries;
  defaultFrom?: string;
  defaultTo?: string;
};

export function SalaryCalculator({ countries, series, defaultFrom = "US", defaultTo = "IN" }: Props) {
  const available = useMemo(() => countries.filter((country) => series[country.code]?.length), [countries, series]);
  const [from, setFrom] = useState(defaultFrom);
  const [to, setTo] = useState(defaultTo);
  const [salary, setSalary] = useState("100000");
  const [period, setPeriod] = useState<"yearly" | "monthly">("yearly");
  const [result, setResult] = useState<ReturnType<typeof calculateSalaryPPP> | null>(null);
  const [error, setError] = useState("");
  const source = available.find((country) => country.code === from) ?? available[0];
  const target = available.find((country) => country.code === to) ?? available[1];

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const numeric = Number(salary.replace(/,/g, ""));
      setResult(calculateSalaryPPP({ sourceCountry: from, targetCountry: to, salary: numeric, period, series }));
      setError("");
    } catch (caught) {
      setResult(null);
      setError(caught instanceof PPPError ? caught.message : "Unable to compare salaries right now.");
    }
  }

  if (!source || !target) return <p>PPP data is unavailable.</p>;

  return (
    <>
      <form className="calculator-card" onSubmit={submit}>
        <div className="eyebrow">Salary purchasing power</div>
        <h2>Compare salaries between countries</h2>
        <div className="field-grid">
          <label><span>Current Country</span><select value={from} onChange={(e) => { setFrom(e.target.value); setResult(null); }}>{available.map((c) => <option key={c.code} value={c.code}>{c.flag} {c.name} ({c.currencyCode})</option>)}</select></label>
          <button className="swap" type="button" aria-label="Swap countries" onClick={() => { setFrom(to); setTo(from); setResult(null); }}>⇄</button>
          <label><span>Target Country</span><select value={to} onChange={(e) => { setTo(e.target.value); setResult(null); }}>{available.map((c) => <option key={c.code} value={c.code}>{c.flag} {c.name} ({c.currencyCode})</option>)}</select></label>
        </div>
        <div className="two-col-fields">
          <label className="amount-field"><span>Salary</span><div className="amount-wrap"><span>{source.currencySymbol}</span><input inputMode="decimal" value={salary} onChange={(e) => setSalary(e.target.value)} /></div></label>
          <label className="amount-field"><span>Salary period</span><select value={period} onChange={(e) => setPeriod(e.target.value as "yearly" | "monthly")}><option value="yearly">Yearly</option><option value="monthly">Monthly</option></select></label>
        </div>
        <button className="primary-button" type="submit">Compare Salary</button>
        {error ? <p className="form-error" role="alert">{error}</p> : <p className="helper">Results are broad national purchasing-power estimates, not personalized relocation advice.</p>}
      </form>
      {result ? (
        <section className="result-card" aria-live="polite">
          <div className="eyebrow">Equivalent salary</div>
          <h3>{formatCurrency(result.inputAmount, source)}/yr <span>≈</span> {formatCurrency(result.annualEquivalent, target)}/yr</h3>
          <p className="result-context">{source.flag} {source.name} → {target.flag} {target.name}</p>
          <dl className="result-metrics">
            <div><dt>Monthly equivalent</dt><dd>{formatCurrency(result.monthlyEquivalent, target)}</dd></div>
            <div><dt>Observation year</dt><dd>{result.year}</dd></div>
            <div><dt>PPP ratio</dt><dd>{result.ratio.toFixed(4)}</dd></div>
            <div><dt>Input normalized</dt><dd>{formatCurrency(result.inputAmount, source)}/yr</dd></div>
          </dl>
          <p className="result-note">Taxes, rent, household size, benefits and city-level prices are not included.</p>
        </section>
      ) : null}
    </>
  );
}
