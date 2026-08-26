import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/content/Breadcrumbs";
import { pageMetadata } from "@/lib/seo/metadata";
import { pppMetadata } from "@/lib/data/ppp-data";

export const metadata: Metadata = pageMetadata({ title: "PPP Calculator Methodology", description: "Learn how PPP Calculator selects World Bank indicators, matches observation years, calculates country comparisons and handles missing data.", path: "/methodology/" });

export default function MethodologyPage() {
  return <><section className="page-hero"><div className="container"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Methodology" }]} /><h1>PPP Calculator Methodology</h1><p>How the site turns purchasing power parity observations into transparent country, salary and GDP estimates.</p></div></section><section className="content-section"><article className="container reading prose">
    <h2>General Purchasing-Power Calculations</h2><p>The main calculator, salary calculator and country-pair pages use the World Bank household/private-consumption PPP indicator <code>{pppMetadata.indicators.private}</code>. The calculation compares the source and target factors for a compatible observation year.</p><div className="formula-box"><strong>Target purchasing-power equivalent</strong><span>Source amount × (Target PPP factor ÷ Source PPP factor)</span></div>
    <h2>Latest Common Observation Year</h2><p>PPP observations are annual and countries may not always have values for exactly the same latest year. The calculation engine finds the years present for both selected countries and uses the most recent common year. It does not silently combine a newer source factor with an older target factor.</p>
    <h2>Salary Calculations</h2><p>Monthly salaries are first normalized to an annual amount. The general PPP formula is then applied, and the target annual result is divided by 12 to show a monthly equivalent. Salary results are broad national benchmarks, not personalized compensation recommendations.</p>
    <h2>GDP Calculations</h2><p>The GDP calculator uses the separate World Bank GDP PPP indicator <code>{pppMetadata.indicators.gdp}</code>. Local-currency GDP is divided by the selected year's GDP PPP conversion factor to produce an international-dollar result.</p><div className="formula-box"><strong>GDP at PPP</strong><span>Local-currency GDP ÷ GDP PPP factor</span></div>
    <h2>Missing and Invalid Data</h2><p>The data refresh pipeline validates positive numeric observations and excludes unsupported aggregate rows. If a required observation is unavailable, the calculator returns a clear error instead of inventing, interpolating or silently substituting a value.</p>
    <h2>Rounding and Display</h2><p>Calculations use the stored numeric factors. Displayed currency values are rounded for readability using locale-aware number formatting, while PPP factors are shown with additional decimal precision.</p>
    <h2>What PPP Does Not Measure</h2><p>PPP is an aggregate economic measure. It does not directly model a person's rent, tax rate, household size, school costs, healthcare, benefits, neighborhood or lifestyle. City-level and household-level costs can differ substantially from national averages.</p>
    <h2>Data Refresh and Reliability</h2><p>The included refresh script retrieves new World Bank observations and writes a normalized local dataset only after validation. If a refresh fails, the last known valid data remains available so the public calculator does not depend on a live third-party request for each user calculation.</p>
  </article></section></>;
}
