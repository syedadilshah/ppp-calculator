import Link from "next/link";

const groups = [
  {
    title: "Calculators",
    links: [
      ["PPP Calculator", "/"],
      ["PPP Salary Calculator", "/ppp-salary-calculator/"],
      ["PPP by Country", "/ppp-calculator-by-country/"],
      ["GDP PPP Calculator", "/gdp-ppp-calculator/"]
    ]
  },
  {
    title: "Popular",
    links: [
      ["India vs USA PPP", "/india-vs-usa-ppp-calculator/"],
      ["AED to INR PPP", "/aed-to-inr-ppp-calculator/"],
      ["Euro to INR PPP", "/euro-to-inr-ppp-calculator/"]
    ]
  },
  {
    title: "Resources",
    links: [
      ["Methodology", "/methodology/"],
      ["Data Sources", "/data-sources/"],
      ["About", "/about/"],
      ["Contact", "/contact/"]
    ]
  },
  {
    title: "Legal",
    links: [
      ["Privacy Policy", "/privacy-policy/"],
      ["Terms", "/terms/"]
    ]
  }
] as const;

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        {groups.map((group) => (
          <section key={group.title}>
            <h2>{group.title}</h2>
            <ul>
              {group.links.map(([label, href]) => (
                <li key={href}><Link href={href}>{label}</Link></li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <div className="container footer-bottom">
        <p>PPP Calculator provides informational purchasing-power estimates, not foreign-exchange, financial, tax, or relocation advice.</p>
      </div>
    </footer>
  );
}
