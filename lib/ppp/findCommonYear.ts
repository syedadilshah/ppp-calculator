import type { PPPObservation } from "../../types/ppp.ts";
import { PPPError } from "../../types/ppp.ts";

export function findCommonYear(
  source: PPPObservation[],
  target: PPPObservation[]
): number {
  const sourceYears = new Set(source.filter((o) => o.value > 0).map((o) => o.year));
  const common = target
    .filter((o) => o.value > 0 && sourceYears.has(o.year))
    .map((o) => o.year);

  if (common.length === 0) {
    throw new PPPError("NO_COMMON_YEAR", "No common PPP observation year is available for this comparison.");
  }

  return Math.max(...common);
}
