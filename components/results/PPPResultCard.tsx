import type { CountryMeta, PPPResult } from "@/types/ppp";
import { formatCurrency } from "@/lib/ppp/formatCurrency";

type Props = {
  result: PPPResult;
  source: CountryMeta;
  target: CountryMeta;
};

export function PPPResultCard({ result, source, target }: Props) {
  return (
    <section className="result-card" aria-live="polite" aria-labelledby="ppp-result-title">
      <div className="eyebrow">Purchasing power equivalent</div>
      <h3 id="ppp-result-title">
        {formatCurrency(result.inputAmount, source)} <span>≈</span> {formatCurrency(result.equivalentAmount, target)}
      </h3>
      <p className="result-context">
        {source.flag} {source.name} → {target.flag} {target.name}
      </p>
      <dl className="result-metrics">
        <div><dt>PPP ratio</dt><dd>{result.ratio.toFixed(4)}</dd></div>
        <div><dt>Observation year</dt><dd>{result.year}</dd></div>
        <div><dt>Source factor</dt><dd>{result.sourceFactor.toFixed(4)}</dd></div>
        <div><dt>Target factor</dt><dd>{result.targetFactor.toFixed(4)}</dd></div>
      </dl>
      <p className="result-note">This is a purchasing-power comparison, not a foreign-exchange quote. Source: World Bank PPP data.</p>
    </section>
  );
}
