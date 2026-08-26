import type { Metadata } from "next";
import Link from "next/link";
import { PPPCalculator } from "@/components/calculator/PPPCalculator";
import { Breadcrumbs } from "@/components/content/Breadcrumbs";
import { FAQ } from "@/components/content/FAQ";
import { RelatedCalculators } from "@/components/content/RelatedCalculators";
import { DataNotice } from "@/components/content/DataNotice";
import { JsonLd } from "@/components/seo/JsonLd";
import { countries, privatePPP } from "@/lib/data/ppp-data";
import { pageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, calculatorSchema } from "@/lib/seo/schema";

export const metadata: Metadata = pageMetadata({ title: "PPP Calculator by Country – Compare Purchasing Power", description: "Compare purchasing power between supported countries and view current local PPP observations in one country comparison hub.", path: "/ppp-calculator-by-country/" });
const faqs = [
  { question: "What is a PPP calculator by country?", answer: "It lets you select two supported economies and compare an amount using their purchasing power parity factors." },
  { question: "Why are some countries unavailable?", answer: "The calculator only shows countries that have usable data in the validated local dataset. Unsupported or missing observations are not fabricated." },
  { question: "Can countries with the same currency have different PPP factors?", answer: "Yes. PPP factors describe economy-level price levels, so two countries using the same currency can still have different PPP observations." },
  { question: "Is a higher raw PPP factor better?", answer: "No. PPP factors are expressed in local currency units and should not be ranked as if a larger number meant better purchasing power." },
];

export default function CountryHubPage() {
  const rows = countries.filter((c) => privatePPP[c.code]?.length).sort((a,b) => a.name.localeCompare(b.name));
  return <><JsonLd data={[calculatorSchema("PPP Calculator by Country", "Compare purchasing power between supported countries.", "/ppp-calculator-by-country/"), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "PPP Calculator by Country", path: "/ppp-calculator-by-country/" }])]} />
    <section className="page-hero"><div className="container"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "PPP Calculator by Country" }]} /><h1>PPP Calculator by Country</h1><p>Choose any two supported economies to compare purchasing power, then explore the PPP data currently available in the site dataset.</p></div></section>
    <section className="calculator-wrap compact"><div className="container"><PPPCalculator countries={countries} series={privatePPP} /></div></section>
    <section className="content-section"><div className="container prose"><div className="section-heading"><h2>PPP Data by Country</h2><p>Raw PPP factors are local-currency units per international-dollar reference under the selected household/private-consumption measure. They are not foreign-exchange rates.</p></div><div className="table-wrap country-table"><table><thead><tr><th>Country</th><th>Currency</th><th>PPP factor</th><th>Observation</th></tr></thead><tbody>{rows.map((country) => { const obs = privatePPP[country.code][0]; return <tr key={country.code}><td>{country.flag} {country.name}</td><td>{country.currencyCode}</td><td>{obs.value.toFixed(4)}</td><td>{obs.year}</td></tr>; })}</tbody></table></div></div></section>
    <section className="content-section alt"><div className="container reading prose"><h2>How to Compare Purchasing Power Between Countries</h2><p>Select the source economy, enter an amount and choose a target economy. The calculator finds a compatible observation year and applies the ratio between the two PPP factors.</p><p>For high-intent dedicated comparisons, visit the <Link href="/india-vs-usa-ppp-calculator/">India vs USA PPP Calculator</Link>, <Link href="/aed-to-inr-ppp-calculator/">AED to INR PPP Calculator</Link> or <Link href="/euro-to-inr-ppp-calculator/">Euro to INR PPP Calculator</Link>.</p><h2>Country vs Currency</h2><p>PPP belongs to an economy, not merely to a currency code. Germany and France can both use EUR while maintaining distinct national price levels. That is why country selection is the foundation of the calculation.</p><h2>PPP by Country vs Exchange Rates</h2><p>Country PPP comparisons are intended for relative purchasing-power research. They should not be used to estimate the amount a bank or remittance provider will deliver after currency conversion.</p><DataNotice /></div></section>
    <section className="content-section"><div className="container reading"><h2>Frequently Asked Questions</h2><FAQ items={faqs} /></div></section>
    <section className="content-section alt"><div className="container"><h2>Related PPP Calculators</h2><RelatedCalculators exclude="/ppp-calculator-by-country/" /></div></section>
  </>;
}
