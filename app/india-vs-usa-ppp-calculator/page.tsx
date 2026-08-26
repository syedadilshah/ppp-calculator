import type { Metadata } from "next";
import Link from "next/link";
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

export const metadata: Metadata = pageMetadata({ title: "India vs USA PPP Calculator – Compare Purchasing Power", description: "Compare India and USA purchasing power, salary equivalents and PPP-adjusted amounts using World Bank PPP data.", path: "/india-vs-usa-ppp-calculator/" });
const faqs = [
  { question: "What does India vs USA PPP mean?", answer: "It compares broad price levels and purchasing power between India and the United States rather than simply converting INR and USD at the market exchange rate." },
  { question: "What is ₹10 lakh in the USA by PPP?", answer: "Use the calculator above with India as the source, United States as the target and 1,000,000 as the amount. The result is calculated from the PPP observations stored in the current dataset." },
  { question: "What is a $100,000 US salary equivalent to in India by PPP?", answer: "Enter 100,000 with the United States as the source and India as the target. For salary-specific annual and monthly output, use the PPP Salary Calculator." },
  { question: "Is India vs USA PPP the same as USD to INR?", answer: "No. USD/INR is a foreign-exchange rate. PPP is an economic purchasing-power comparison." },
  { question: "Does the result reflect Mumbai or New York costs?", answer: "No. The calculation is based on national-level PPP data. City-level housing and services can differ significantly." },
  { question: "Can I use this for a relocation decision?", answer: "Use it as a broad benchmark only, then add taxes, housing, healthcare, benefits, household size and city-specific costs." },
];

export default function IndiaUsaPage() {
  const india = getCountry("IN")!;
  const usa = getCountry("US")!;
  return <><JsonLd data={[calculatorSchema("India vs USA PPP Calculator", "Compare purchasing power between India and the United States.", "/india-vs-usa-ppp-calculator/"), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "India vs USA PPP Calculator", path: "/india-vs-usa-ppp-calculator/" }])]} />
    <section className="page-hero"><div className="container"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "India vs USA PPP Calculator" }]} /><h1>India vs USA PPP Calculator</h1><p>Compare rupee and dollar purchasing power in both directions with a dedicated India–United States PPP calculator.</p></div></section>
    <section className="calculator-wrap compact"><div className="container"><PPPCalculator countries={countries} series={privatePPP} defaultFrom="IN" defaultTo="US" /></div></section>
    <section className="content-section"><div className="container reading prose"><h2>India vs USA Purchasing Power Comparison</h2><p>India and the United States have very different price levels, so comparing an INR salary with a US salary by market exchange rate alone can be misleading. PPP provides a second perspective by asking how much money is needed in each economy to represent similar broad purchasing power.</p><p>This page is bidirectional: use India → USA when you want to understand the US purchasing-power equivalent of an Indian amount, or use the swap control for USA → India.</p><h2>India to USA PPP Conversion Examples</h2><ConversionTable source={india} target={usa} amounts={[100000,500000,1000000,2000000,5000000,10000000]} series={privatePPP} title="India to USA PPP examples" /><h2>USA to India PPP Conversion Examples</h2><ConversionTable source={usa} target={india} amounts={[10000,25000,50000,75000,100000,200000]} series={privatePPP} title="USA to India PPP examples" /><h2>India vs USA Salary Comparison</h2><p>PPP is frequently used as a broad salary benchmark. For example, an Indian salary can be converted to an estimated US salary with similar national-level purchasing power. However, this does not mean that the two lifestyles, tax burdens or housing costs are identical.</p><p>For annual/monthly salary output and other country pairs, use the <Link href="/ppp-salary-calculator/">PPP Salary Calculator</Link>.</p><h2>India vs USA PPP vs Exchange Rate</h2><p>The INR/USD exchange rate tells you how much currency changes hands in a conversion. PPP instead reflects comparative price levels. If you are remitting money, use a current FX rate. If you are comparing purchasing power, PPP is the relevant measure.</p><h2>How Is India vs USA PPP Calculated?</h2><div className="formula-box"><strong>USA equivalent</strong><span>INR amount × (USA PPP factor ÷ India PPP factor)</span></div><p>For the reverse direction, the factors are reversed. The engine selects a common observation year rather than combining unrelated years.</p><h2>Understanding the Result</h2><p>A PPP result means the two amounts are broadly comparable under the selected national purchasing-power measure. It does not say that every product costs the same ratio, nor that a bank should exchange money at that rate.</p><h2>Important Limitations</h2><ul><li>National PPP does not represent a specific city such as Bengaluru, Mumbai, San Francisco or New York.</li><li>Personal income taxes and employer benefits are not modeled.</li><li>Housing, healthcare and education can differ substantially.</li><li>PPP data is periodic and not a live market quote.</li></ul><DataNotice /></div></section>
    <section className="content-section alt"><div className="container reading"><h2>Frequently Asked Questions</h2><FAQ items={faqs} /></div></section>
    <section className="content-section"><div className="container"><h2>Related PPP Calculators</h2><RelatedCalculators exclude="/india-vs-usa-ppp-calculator/" /></div></section>
  </>;
}
