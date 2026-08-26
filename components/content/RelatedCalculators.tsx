import Link from "next/link";

const links = [
  ["PPP Salary Calculator", "/ppp-salary-calculator/", "Compare salary purchasing power across countries."],
  ["India vs USA PPP Calculator", "/india-vs-usa-ppp-calculator/", "Compare India and United States purchasing power."],
  ["AED to INR PPP Calculator", "/aed-to-inr-ppp-calculator/", "Compare UAE dirham purchasing power with India."],
  ["Euro to INR PPP Calculator", "/euro-to-inr-ppp-calculator/", "Compare euro-country purchasing power with India."],
  ["PPP Calculator by Country", "/ppp-calculator-by-country/", "Compare any two supported countries."],
  ["GDP PPP Calculator", "/gdp-ppp-calculator/", "Convert local-currency GDP using GDP PPP factors."],
] as const;

export function RelatedCalculators({ exclude }: { exclude?: string }) {
  return (
    <div className="related-grid">
      {links.filter(([, href]) => href !== exclude).map(([label, href, description]) => (
        <Link className="related-card" href={href} key={href}>
          <strong>{label}</strong>
          <span>{description}</span>
        </Link>
      ))}
    </div>
  );
}
