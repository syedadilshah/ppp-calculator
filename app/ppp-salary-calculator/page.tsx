import type { Metadata } from "next";
import Link from "next/link";
import { SalaryCalculator } from "@/components/calculator/SalaryCalculator";
import { Breadcrumbs } from "@/components/content/Breadcrumbs";
import { FAQ } from "@/components/content/FAQ";
import { RelatedCalculators } from "@/components/content/RelatedCalculators";
import { DataNotice } from "@/components/content/DataNotice";
import { JsonLd } from "@/components/seo/JsonLd";
import { countries, privatePPP } from "@/lib/data/ppp-data";
import { pageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, calculatorSchema } from "@/lib/seo/schema";

export const metadata: Metadata = pageMetadata({ title: "PPP Salary Calculator – Compare Salaries by Country", description: "Compare salaries between countries and estimate an equivalent salary with similar purchasing power using PPP data.", path: "/ppp-salary-calculator/" });
const faqs = [
  { question: "What is a PPP salary calculator?", answer: "It estimates a salary in another country that represents broadly similar purchasing power to the salary you enter." },
  { question: "Can I compare a monthly salary?", answer: "Yes. Select Monthly and the calculator normalizes the amount to an annual salary before applying PPP, then shows the target annual and monthly equivalents." },
  { question: "Does this include taxes?", answer: "No. PPP is a price-level comparison and does not calculate personal income tax, benefits or deductions." },
  { question: "Does PPP include rent?", answer: "PPP reflects a broad consumption basket at national level. It does not model your specific rent or city." },
  { question: "Is PPP better than exchange rate for salary comparison?", answer: "PPP is often more informative for broad purchasing-power comparisons, while exchange rates are appropriate for converting money. Neither alone is a complete relocation budget." },
  { question: "Can this tell me what salary to negotiate?", answer: "Use it as one benchmark only. Role, taxes, housing, benefits, local labor markets and personal costs should also be considered." },
];

export default function SalaryPage() {
  return <><JsonLd data={[calculatorSchema("PPP Salary Calculator", "Compare salary purchasing power between countries.", "/ppp-salary-calculator/"), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "PPP Salary Calculator", path: "/ppp-salary-calculator/" }])]} />
    <section className="page-hero"><div className="container"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "PPP Salary Calculator" }]} /><h1>PPP Salary Calculator</h1><p>Compare salaries across countries and estimate the annual or monthly income that represents similar broad purchasing power.</p></div></section>
    <section className="calculator-wrap compact"><div className="container"><SalaryCalculator countries={countries} series={privatePPP} /></div></section>
    <section className="content-section"><div className="container reading prose"><h2>What Is a PPP Salary Calculator?</h2><p>A PPP salary calculator compares income across countries after accounting for broad differences in price levels. A salary may look much larger or smaller after a simple currency conversion, but that nominal number does not show how much the income can buy locally.</p><p>This tool converts the entered salary into an annual amount, applies the PPP ratio for the two selected economies, and then shows both annual and monthly equivalents. It is most useful as an initial benchmark for international job offers, remote-work compensation and relocation research.</p><h2>How the Salary Calculation Works</h2><div className="formula-box"><strong>Equivalent annual salary</strong><span>Current annual salary × (Target PPP factor ÷ Source PPP factor)</span></div><p>For a monthly input, the calculator multiplies by 12 first. The result is then divided by 12 again to show the target monthly equivalent.</p><h2>PPP Salary vs Exchange Rate</h2><p>A market exchange rate answers how much currency you would receive if you converted money. PPP estimates comparative purchasing power. For salary research, the two figures can differ substantially because local prices differ.</p><h2>PPP Salary vs Cost of Living</h2><p>PPP is broader than an individual cost-of-living budget. It does not know your rent, neighborhood, household size, taxes, schooling, healthcare or lifestyle. For a real relocation decision, combine the PPP benchmark with city-specific expenses and after-tax pay.</p><h2>When Is a PPP Salary Comparison Useful?</h2><ul><li>Comparing international job offers.</li><li>Understanding a remote salary across countries.</li><li>Estimating broad purchasing-power differences before relocation.</li><li>Adding context to nominal salary comparisons.</li></ul><p>For a focused India–United States comparison, use the <Link href="/india-vs-usa-ppp-calculator/">India vs USA PPP Calculator</Link>.</p><h2>Data and Methodology</h2><DataNotice /></div></section>
    <section className="content-section alt"><div className="container reading"><h2>Frequently Asked Questions</h2><FAQ items={faqs} /></div></section>
    <section className="content-section"><div className="container"><h2>Related PPP Calculators</h2><RelatedCalculators exclude="/ppp-salary-calculator/" /></div></section>
  </>;
}
