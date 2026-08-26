import { findCommonYear } from "./findCommonYear.ts";
import type { CountryPPPSeries, PPPIndicator, PPPResult } from "../../types/ppp.ts";
import { PPPError } from "../../types/ppp.ts";

export type CalculatePPPInput = {
  sourceCountry: string;
  targetCountry: string;
  amount: number;
  series: CountryPPPSeries;
  indicator?: PPPIndicator;
  year?: number;
};

export function calculatePPP({
  sourceCountry,
  targetCountry,
  amount,
  series,
  indicator = "private",
  year
}: CalculatePPPInput): PPPResult {
  if (!Number.isFinite(amount) || amount <= 0) {
    throw new PPPError("INVALID_AMOUNT", "Enter an amount greater than 0.");
  }

  const source = series[sourceCountry];
  const target = series[targetCountry];

  if (!source || !target) {
    throw new PPPError("INVALID_COUNTRY", "PPP data is unavailable for one of the selected countries.");
  }

  const selectedYear = year ?? findCommonYear(source, target);
  const sourceObservation = source.find((o) => o.year === selectedYear && o.value > 0);
  const targetObservation = target.find((o) => o.year === selectedYear && o.value > 0);

  if (!sourceObservation || !targetObservation) {
    throw new PPPError("NO_DATA", `PPP data is unavailable for both countries in ${selectedYear}.`);
  }

  const ratio = targetObservation.value / sourceObservation.value;
  const equivalentAmount = amount * ratio;

  return {
    sourceCountry,
    targetCountry,
    inputAmount: amount,
    equivalentAmount,
    ratio,
    indicator,
    year: selectedYear,
    sourceFactor: sourceObservation.value,
    targetFactor: targetObservation.value
  };
}
