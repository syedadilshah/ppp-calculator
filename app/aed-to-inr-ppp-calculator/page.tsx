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

export const metadata: Metadata = pageMetadata({ title: "AED to INR PPP Calculator – UAE vs India Purchasing Power", description: "Compare AED to INR using purchasing power parity and estimate UAE salary or amount equivalents in India.", path: "/aed-to-inr-ppp-calculator/" });
const faqs = [
  { question: "What is an AED to INR PPP calculator?", answer: "It estimates the Indian-rupee amount that represents similar broad purchasing power to an AED amount in the United Arab Emirates." },
  { question: "Is AED to INR PPP the same as the exchange rate?", answer: "No. PPP is a purchasing-power measure, while the AED/INR exchange rate is used for actual currency conversion." },
  { question: "Does this use Dubai PPP data?", answer: "The calculator uses UAE national PPP data. Dubai is part of the UAE, but Dubai-specific living costs can differ from the national average." },
  { question: "Can I compare a Dubai salary with India?", answer: "Yes as a broad benchmark. Enter the AED amount above or use the salary calculator for annual/monthly output." },
  { question: "Does the result include UAE or Indian taxes?", answer: "No. PPP does not calculate personal tax, benefits or individual housing costs." },
];

export default function AedInrPage() {
  const uae = getCountry("AE")!;
  const india = getCountry("IN")!;
  return <><JsonLd data={[calculatorSchema("AED to INR PPP Calculator", "Compare UAE and India purchasing power.", "/aed-to-inr-ppp-calculator/"), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "AED to INR PPP Calculator", path: "/aed-to-inr-ppp-calculator/" }])]} />
    <section className="page-hero"><div className="container"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "AED to INR PPP Calculator" }]} /><h1>AED to INR PPP Calculator</h1><p>Compare UAE dirham purchasing power with Indian rupees using UAE and India PPP data.</p></div></section>
    <section className="calculator-wrap compact"><div className="container"><PPPCalculator countries={countries} series={privatePPP} defaultFrom="AE" defaultTo="IN" /></div></section>
    <section className="content-section"><div className="container reading prose"><h2>AED to INR Purchasing Power Comparison</h2><p>An AED to INR PPP comparison is different from converting dirhams at the current foreign-exchange rate. PPP asks what an AED amount in the UAE broadly corresponds to in India after relative price levels are considered.</p><h2>AED to INR PPP Conversion Table</h2><ConversionTable source={uae} target={india} amounts={[1000,2500,5000,10000,15000,20000,30000,50000,100000]} series={privatePPP} title="AED to INR PPP examples" /><h2>UAE vs India Salary Comparison</h2><p>This page is useful for people comparing UAE compensation with Indian purchasing power. A monthly AED salary can be entered directly as a general amount, but for annual and monthly salary-specific output use the <Link href="/ppp-salary-calculator/">PPP Salary Calculator</Link>.</p><h2>Dubai vs India Purchasing Power</h2><p>Dubai-specific searches are common, but the underlying World Bank PPP observation is for the United Arab Emirates as an economy. The calculator therefore does not pretend there is a separate official Dubai PPP factor. Rent and services in Dubai may differ materially from UAE national averages.</p><h2>AED to INR PPP vs Exchange Rate</h2><p>Use an exchange rate when you want to know how many rupees a bank, card network or remittance service may provide. Use PPP when the question is how purchasing power compares between the UAE and India.</p><h2>How Is AED to INR PPP Calculated?</h2><div className="formula-box"><strong>India PPP equivalent</strong><span>AED amount × (India PPP factor ÷ UAE PPP factor)</span></div><h2>Limitations</h2><p>PPP is a national average. It does not include your housing contract, school fees, benefits, taxes, household size or exact location. Treat it as an economic benchmark rather than a personal financial recommendation.</p><DataNotice /></div></section>
    <section className="content-section alt"><div className="container reading"><h2>Frequently Asked Questions</h2><FAQ items={faqs} /></div></section>
    <section className="content-section"><div className="container"><h2>Related PPP Calculators</h2><RelatedCalculators exclude="/aed-to-inr-ppp-calculator/" /></div></section>
  </>;
}
