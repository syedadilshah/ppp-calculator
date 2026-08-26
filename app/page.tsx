import Link from "next/link";
import { PPPCalculator } from "@/components/calculator/PPPCalculator";
import { FAQ } from "@/components/content/FAQ";
import { RelatedCalculators } from "@/components/content/RelatedCalculators";
import { DataNotice } from "@/components/content/DataNotice";
import { JsonLd } from "@/components/seo/JsonLd";
import { countries, privatePPP } from "@/lib/data/ppp-data";
import { websiteSchema, calculatorSchema } from "@/lib/seo/schema";

const faqs = [
  { question: "What is a PPP calculator?", answer: "A PPP calculator compares how much money is needed in two economies to represent similar broad purchasing power. It uses purchasing power parity factors rather than a live foreign-exchange rate." },
  { question: "How is purchasing power parity calculated?", answer: "For a country-to-country comparison, this tool multiplies the entered amount by the target country's PPP factor divided by the source country's PPP factor, using a compatible observation year." },
  { question: "Is PPP the same as an exchange rate?", answer: "No. Exchange rates describe how currencies trade in financial markets. PPP compares relative price levels and purchasing power across economies." },
  { question: "Can PPP be used to compare salaries?", answer: "Yes, as a broad benchmark. For salary-focused output, use the dedicated PPP Salary Calculator, which also shows annual and monthly equivalents." },
  { question: "Does PPP include rent, taxes and lifestyle?", answer: "Not at an individual level. PPP is an economy-wide measure. Your city, housing, taxes, family size and spending pattern can produce very different real-world costs." },
  { question: "Which data does this calculator use?", answer: "The general calculator uses World Bank household/private-consumption PPP data from indicator PA.NUS.PRVT.PP. GDP calculations use a separate GDP PPP indicator." },
  { question: "How often is PPP data updated?", answer: "PPP series are periodic economic statistics rather than live market prices. The site is designed to refresh its local dataset from the World Bank and show the actual observation year used." },
  { question: "What is an international dollar?", answer: "An international dollar is an analytical unit used in PPP comparisons. It is designed to have comparable purchasing power across economies and is not a currency you can exchange at a bank." },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={[websiteSchema(), calculatorSchema("PPP Calculator", "Compare purchasing power between countries using World Bank PPP data.", "/")]} />
      <section className="hero"><div className="container"><div className="eyebrow">Purchasing power comparison</div><h1>PPP Calculator</h1><p>Compare purchasing power between countries with a fast Purchasing Power Parity calculator using World Bank household-consumption PPP data.</p><div className="data-status"><span>World Bank data</span><span>Observation year shown with every result</span></div></div></section>
      <section className="calculator-wrap"><div className="container"><PPPCalculator countries={countries} series={privatePPP} defaultFrom="US" defaultTo="IN" /></div></section>

      <section className="content-section alt"><div className="container"><div className="section-heading"><h2>Popular PPP Calculators</h2><p>Jump directly to a focused comparison or salary tool.</p></div><RelatedCalculators /></div></section>

      <section className="content-section"><div className="container reading prose"><h2>What Is a PPP Calculator?</h2><p>A PPP calculator estimates the amount of money in one country that represents roughly similar purchasing power in another country. Purchasing Power Parity, or PPP, compares price levels across economies so that amounts can be interpreted beyond their face-value currency conversion.</p><p>This is useful because a market exchange rate answers a different question. A foreign-exchange rate tells you how many units of another currency you can receive. PPP asks what an amount can broadly buy in each economy. That makes it useful for international salary comparisons, relocation research, economic comparisons and understanding differences in local price levels.</p><div className="callout"><strong>PPP is not a bank conversion rate.</strong><span>Use PPP to compare purchasing power; use a foreign-exchange service to convert money.</span></div></div></section>

      <section className="content-section alt"><div className="container reading prose"><h2>How to Use the PPP Calculator</h2><ol className="steps"><li><strong>Select the source country.</strong><span>Choose the economy where your amount originates.</span></li><li><strong>Enter an amount.</strong><span>This can be a salary, budget or general monetary amount.</span></li><li><strong>Select the comparison country.</strong><span>Choose the economy where you want to estimate equivalent purchasing power.</span></li><li><strong>Calculate PPP.</strong><span>The result uses the latest compatible PPP observation in the local dataset.</span></li></ol></div></section>

      <section className="content-section"><div className="container reading prose"><h2>How Is Purchasing Power Parity Calculated?</h2><p>The site uses a ratio between the target and source PPP factors. For household/general comparisons, the selected indicator is the World Bank household/private-consumption PPP series.</p><div className="formula-box"><strong>PPP equivalent</strong><span>Amount × (Target PPP factor ÷ Source PPP factor)</span></div><p>If the two countries do not have values for the same latest year, the engine looks for the most recent year that both countries share instead of silently mixing incompatible years.</p></div></section>

      <section className="content-section alt"><div className="container reading prose"><h2>PPP vs Exchange Rate</h2><div className="table-wrap"><table><thead><tr><th>Feature</th><th>PPP</th><th>Exchange Rate</th></tr></thead><tbody><tr><td>Main purpose</td><td>Compare purchasing power</td><td>Convert currencies</td></tr><tr><td>Local price levels</td><td>Central to the measure</td><td>Not directly measured</td></tr><tr><td>Salary comparison</td><td>Useful broad benchmark</td><td>Nominal conversion only</td></tr><tr><td>Bank/remittance use</td><td>No</td><td>Yes</td></tr><tr><td>Update frequency</td><td>Periodic economic data</td><td>Frequent market changes</td></tr></tbody></table></div><p>For example, converting a US salary to Indian rupees at the market rate does not tell you how much income might provide broadly similar purchasing power in India. For that question, use PPP or the <Link href="/ppp-salary-calculator/">PPP Salary Calculator</Link>.</p></div></section>

      <section className="content-section"><div className="container reading prose"><h2>PPP Data and Methodology</h2><DataNotice /><p>Results should be treated as estimates, not exact cost-of-living or relocation recommendations. National averages do not capture city-level rent, taxes, healthcare arrangements, benefits or household-specific spending.</p></div></section>

      <section className="content-section alt"><div className="container reading"><h2>Frequently Asked Questions</h2><FAQ items={faqs} /></div></section>
    </>
  );
}
