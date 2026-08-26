import type { Metadata } from "next";
import { PPPCalculator } from "@/components/calculator/PPPCalculator";
import { Breadcrumbs } from "@/components/content/Breadcrumbs";
import { ConversionTable } from "@/components/content/ConversionTable";
import { FAQ } from "@/components/content/FAQ";
import { RelatedCalculators } from "@/components/content/RelatedCalculators";
import { DataNotice } from "@/components/content/DataNotice";
import { JsonLd } from "@/components/seo/JsonLd";
import { countries, privatePPP, getCountry } from "@/lib/data/ppp-data";
import { pageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, calculatorSchema } from "@/lib/seo/schema";

export const metadata: Metadata = pageMetadata({ title: "Euro to INR PPP Calculator – EUR vs INR Purchasing Power", description: "Compare euro-denominated income or amounts with India using country-level PPP data. Select a euro-area source country for an accurate comparison.", path: "/euro-to-inr-ppp-calculator/" });
const faqs = [
  { question: "Why do I need a euro-area country for PPP?", answer: "PPP factors belong to economies, not to a currency in isolation. Germany and Spain both use EUR but can have different price levels and PPP factors." },
  { question: "Is EUR to INR PPP the same as the EUR/INR exchange rate?", answer: "No. The exchange rate converts currency; PPP compares purchasing power." },
  { question: "Can I compare a German salary with India?", answer: "Yes. Select Germany as the source country and India as the target. The result uses Germany's PPP observation, not a universal euro factor." },
  { question: "Does one Euro have one PPP value?", answer: "No. PPP is economy-specific. A currency used by multiple economies cannot be assigned one universal purchasing-power factor without specifying the economy." },
];

export default function EuroInrPage() {
  const euroCountries = countries.filter((c) => c.currencyCode === "EUR" || c.code === "IN");
  const germany = getCountry("DE")!;
  const india = getCountry("IN")!;
  return <><JsonLd data={[calculatorSchema("Euro to INR PPP Calculator", "Compare euro-country purchasing power with India.", "/euro-to-inr-ppp-calculator/"), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Euro to INR PPP Calculator", path: "/euro-to-inr-ppp-calculator/" }])]} />
    <section className="page-hero"><div className="container"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Euro to INR PPP Calculator" }]} /><h1>Euro to INR PPP Calculator</h1><p>Select the euro-area economy your amount comes from, then compare its purchasing power with India.</p></div></section>
    <section className="calculator-wrap compact"><div className="container"><PPPCalculator countries={euroCountries} series={privatePPP} defaultFrom="DE" defaultTo="IN" /></div></section>
    <section className="content-section"><div className="container reading prose"><h2>Euro to INR Purchasing Power Comparison</h2><p>EUR is a currency used by multiple economies, while purchasing power parity is measured at economy level. That distinction matters: €50,000 in Germany and €50,000 in another euro-area economy may not represent identical purchasing power because local price levels differ.</p><p>This calculator therefore asks you to select a source economy. Germany is the default, but the available euro-country options can be changed before calculating.</p><h2>Germany to India PPP Examples</h2><ConversionTable source={germany} target={india} amounts={[1000,2500,5000,10000,25000,50000,75000,100000]} series={privatePPP} title="Germany EUR to India PPP examples" /><h2>Why Euro PPP Depends on the Country</h2><p>PPP factors compare the local prices of goods and services across economies. Sharing the same currency does not make national price levels identical. For that reason, this site never treats EUR as if it had one universal PPP conversion factor.</p><h2>Euro to INR PPP vs Exchange Rate</h2><p>The EUR/INR market rate is appropriate for currency conversion. A PPP result is instead an economic purchasing-power estimate tied to the source economy selected above.</p><h2>How Is Euro to INR PPP Calculated?</h2><div className="formula-box"><strong>India PPP equivalent</strong><span>EUR amount × (India PPP factor ÷ Selected euro-country PPP factor)</span></div><h2>Salary Comparisons</h2><p>For income, select the European source country and enter the amount. If you need monthly and annual salary formatting across any supported countries, use the dedicated PPP Salary Calculator.</p><h2>Limitations</h2><p>Country-level PPP is not a city budget. Housing, tax, healthcare and lifestyle can vary substantially within Europe and India.</p><DataNotice /></div></section>
    <section className="content-section alt"><div className="container reading"><h2>Frequently Asked Questions</h2><FAQ items={faqs} /></div></section>
    <section className="content-section"><div className="container"><h2>Related PPP Calculators</h2><RelatedCalculators exclude="/euro-to-inr-ppp-calculator/" /></div></section>
  </>;
}
