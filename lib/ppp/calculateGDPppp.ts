import type { PPPObservation } from "../../types/ppp.ts";
import { PPPError } from "../../types/ppp.ts";

export function calculateGDPppp(
  localCurrencyGDP: number,
  observations: PPPObservation[],
  year: number
) {
  if (!Number.isFinite(localCurrencyGDP) || localCurrencyGDP <= 0) {
    throw new PPPError("INVALID_AMOUNT", "Enter a GDP amount greater than 0.");
  }

  const observation = observations.find((item) => item.year === year && item.value > 0);
  if (!observation) {
    throw new PPPError("NO_DATA", `GDP PPP data is unavailable for ${year}.`);
  }

  return {
    localCurrencyGDP,
    internationalDollarGDP: localCurrencyGDP / observation.value,
    factor: observation.value,
    year
  };
}
