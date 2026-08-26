import { calculatePPP } from "@/lib/ppp/calculatePPP";
import { formatCurrency } from "@/lib/ppp/formatCurrency";
import type { CountryMeta, CountryPPPSeries } from "@/types/ppp";

export function ConversionTable({ source, target, amounts, series, title }: { source: CountryMeta; target: CountryMeta; amounts: number[]; series: CountryPPPSeries; title: string }) {
  return (
    <div className="table-wrap">
      <table>
        <caption>{title}</caption>
        <thead><tr><th>{source.name}</th><th>{target.name} PPP equivalent</th></tr></thead>
        <tbody>{amounts.map((amount) => { const result = calculatePPP({ sourceCountry: source.code, targetCountry: target.code, amount, series, indicator: "private" }); return <tr key={amount}><td>{formatCurrency(amount, source)}</td><td>{formatCurrency(result.equivalentAmount, target)}</td></tr>; })}</tbody>
      </table>
    </div>
  );
}
