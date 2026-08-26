import Link from "next/link";
import { pppMetadata } from "@/lib/data/ppp-data";

export function DataNotice({ mode = "private" }: { mode?: "private" | "gdp" }) {
  return (
    <aside className="data-notice">
      <strong>Data & methodology</strong>
      <p>
        This calculator uses World Bank {mode === "private" ? "household/private-consumption" : "GDP"} PPP data. It uses a compatible observation year and never treats PPP as a live foreign-exchange rate.
      </p>
      <p className="small-copy">Indicator: <code>{mode === "private" ? pppMetadata.indicators.private : pppMetadata.indicators.gdp}</code></p>
      <div className="inline-links"><Link href="/methodology/">Methodology</Link><Link href="/data-sources/">Data sources</Link></div>
    </aside>
  );
}
