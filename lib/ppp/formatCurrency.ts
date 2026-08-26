import type { CountryMeta } from "../../types/ppp.ts";

export function formatCurrency(value: number, country: CountryMeta): string {
  if (!Number.isFinite(value)) return "—";

  try {
    return new Intl.NumberFormat(country.locale, {
      style: "currency",
      currency: country.currencyCode,
      maximumFractionDigits: value >= 100 ? 0 : 2
    }).format(value);
  } catch {
    return `${country.currencySymbol} ${Math.round(value).toLocaleString(country.locale)}`;
  }
}
