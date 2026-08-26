import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/content/Breadcrumbs";
import { pageMetadata } from "@/lib/seo/metadata";
import { pppMetadata } from "@/lib/data/ppp-data";

export const metadata: Metadata = pageMetadata({ title: "PPP Data Sources", description: "Review the World Bank indicators and data-handling rules used by PPP Calculator.", path: "/data-sources/" });

export default function DataSourcesPage() {
  return <><section className="page-hero"><div className="container"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Data Sources" }]} /><h1>PPP Data Sources</h1><p>Transparent source information for every calculator on the site.</p></div></section><section className="content-section"><article className="container reading prose">
    <h2>Primary Source: World Bank</h2><p>The site is designed around World Bank World Development Indicators / International Comparison Program data. Calculations are performed against a validated local snapshot so users do not need to wait for a live external API request.</p>
    <h2>Household / Private-Consumption PPP</h2><p><strong>Indicator:</strong> <code>{pppMetadata.indicators.private}</code></p><p>This indicator is used for the main PPP calculator, salary comparisons and the dedicated country/currency comparison pages because their intent is closer to household purchasing power than economy-wide GDP conversion.</p>
    <h2>GDP PPP</h2><p><strong>Indicator:</strong> <code>{pppMetadata.indicators.gdp}</code></p><p>This separate indicator is used only by the GDP PPP Calculator. Household and GDP PPP factors are not treated as interchangeable.</p>
    <h2>Dataset Metadata</h2><ul><li>Source: {pppMetadata.source}</li><li>Configured historical range: {pppMetadata.range.start}–{pppMetadata.range.end}</li><li>Local snapshot generated/checked: {new Date(pppMetadata.generatedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</li></ul>
    <h2>Foreign Exchange Rates</h2><p>The current core tool does not present PPP factors as live exchange rates. If a future FX comparison feature is added, it should use a separate, clearly labeled market-rate source.</p>
    <h2>Corrections</h2><p>If a data point appears inconsistent, first check the observation year shown in the result. Source updates and revisions can change historical series over time; the refresh pipeline is designed to replace the local snapshot only after validation.</p>
  </article></section></>;
}
