import type { Metadata } from "next";
import { GDPPCalculator } from "@/components/calculator/GDPPCalculator";
import { Breadcrumbs } from "@/components/content/Breadcrumbs";
import { FAQ } from "@/components/content/FAQ";
import { RelatedCalculators } from "@/components/content/RelatedCalculators";
import { DataNotice } from "@/components/content/DataNotice";
import { JsonLd } from "@/components/seo/JsonLd";
import { countries, gdpPPP } from "@/lib/data/ppp-data";
import { pageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, calculatorSchema } from "@/lib/seo/schema";

export const metadata: Metadata = pageMetadata({ title: "GDP PPP Calculator – Calculate GDP at Purchasing Power Parity", description: "Convert local-currency GDP to international-dollar terms using GDP purchasing power parity factors and compare nominal GDP with PPP concepts.", path: "/gdp-ppp-calculator/" });
const faqs = [
  { question: "What is a GDP PPP calculator?", answer: "It converts a local-currency GDP amount to international-dollar terms using a GDP-level PPP conversion factor for a selected year." },
  { question: "How is GDP at PPP calculated?", answer: "Local-currency GDP is divided by the GDP PPP conversion factor for the selected economy and year." },
  { question: "What is the difference between nominal GDP and PPP GDP?", answer: "Nominal cross-country GDP comparisons commonly rely on market exchange rates, while GDP at PPP adjusts for relative price levels. They answer different economic questions." },
  { question: "Is an international dollar a real currency?", answer: "No. It is an analytical unit designed for purchasing-power comparisons." },
  { question: "Is the GDP PPP factor the same as the household PPP factor?", answer: "No. This GDP calculator uses the GDP PPP indicator, while the main and salary calculators use the household/private-consumption PPP indicator." },
];

export default function GdpPage() {
  return <><JsonLd data={[calculatorSchema("GDP PPP Calculator", "Calculate GDP at purchasing power parity.", "/gdp-ppp-calculator/"), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "GDP PPP Calculator", path: "/gdp-ppp-calculator/" }])]} />
    <section className="page-hero"><div className="container"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "GDP PPP Calculator" }]} /><h1>GDP PPP Calculator</h1><p>Convert local-currency GDP into international-dollar terms using a GDP-level purchasing power parity factor.</p></div></section>
    <section className="calculator-wrap compact"><div className="container"><GDPPCalculator countries={countries} series={gdpPPP} /></div></section>
    <section className="content-section"><div className="container reading prose"><h2>What Is GDP at Purchasing Power Parity?</h2><p>GDP at purchasing power parity adjusts economic output for differences in price levels between economies. This can provide a different perspective from converting GDP at market exchange rates, especially when domestic prices differ substantially.</p><h2>How to Calculate GDP at PPP</h2><div className="formula-box"><strong>GDP at PPP (Intl$)</strong><span>GDP in local currency ÷ GDP PPP conversion factor</span></div><p>Select the economy and an available observation year, enter the GDP amount in local currency, and choose a convenient unit. The result is expressed in international-dollar analytical terms.</p><h2>Nominal GDP vs GDP at PPP</h2><div className="table-wrap"><table><thead><tr><th>Nominal / market-rate view</th><th>GDP at PPP</th></tr></thead><tbody><tr><td>Reflects currency conversion at market rates</td><td>Adjusts for relative price levels</td></tr><tr><td>Useful for financial and market-size comparisons</td><td>Useful for purchasing-power-adjusted output comparisons</td></tr><tr><td>Can move with exchange rates</td><td>Uses periodic PPP conversion factors</td></tr></tbody></table></div><h2>What Does an International Dollar Mean?</h2><p>An international dollar is a statistical unit intended to have comparable purchasing power across economies. It is not a bank account currency or a rate at which money can be exchanged.</p><h2>Why the Year Matters</h2><p>GDP and PPP should be aligned to the same observation year whenever possible. This calculator exposes the available years instead of silently applying a current factor to a historical GDP amount.</p><h2>Limitations</h2><p>PPP methodology is designed for aggregate economic comparison. It should not be interpreted as a live FX quote or as a household cost-of-living calculator.</p><DataNotice mode="gdp" /></div></section>
    <section className="content-section alt"><div className="container reading"><h2>Frequently Asked Questions</h2><FAQ items={faqs} /></div></section>
    <section className="content-section"><div className="container"><h2>Related PPP Calculators</h2><RelatedCalculators exclude="/gdp-ppp-calculator/" /></div></section>
  </>;
}
