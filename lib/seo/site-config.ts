export const siteConfig = {
  name: "PPP Calculator",
  shortName: "PPP Calculator",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://pppcalculator.example",
  description: "Compare purchasing power between countries with fast PPP calculators using World Bank purchasing power parity data.",
  nav: [
    { label: "PPP Calculator", href: "/" },
    { label: "Salary", href: "/ppp-salary-calculator/" },
    { label: "By Country", href: "/ppp-calculator-by-country/" },
    { label: "GDP", href: "/gdp-ppp-calculator/" },
    { label: "Methodology", href: "/methodology/" }
  ]
} as const;
