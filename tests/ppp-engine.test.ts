import assert from "node:assert/strict";
import { calculatePPP } from "../lib/ppp/calculatePPP.ts";
import { calculateSalaryPPP } from "../lib/ppp/calculateSalaryPPP.ts";
import { calculateGDPppp } from "../lib/ppp/calculateGDPppp.ts";
import { findCommonYear } from "../lib/ppp/findCommonYear.ts";
import { PPPError } from "../types/ppp.ts";

const series = {
  US: [{ year: 2025, value: 1 }, { year: 2024, value: 1 }],
  IN: [{ year: 2025, value: 20 }, { year: 2024, value: 19.5 }],
  XX: [{ year: 2024, value: 2 }]
};

assert.equal(findCommonYear(series.US, series.IN), 2025);
assert.equal(findCommonYear(series.US, series.XX), 2024);

const result = calculatePPP({ sourceCountry: "US", targetCountry: "IN", amount: 100000, series });
assert.equal(result.year, 2025);
assert.equal(result.equivalentAmount, 2_000_000);
assert.equal(result.ratio, 20);

const reverse = calculatePPP({ sourceCountry: "IN", targetCountry: "US", amount: 2_000_000, series });
assert.equal(reverse.equivalentAmount, 100000);

const salary = calculateSalaryPPP({ sourceCountry: "US", targetCountry: "IN", salary: 10000, period: "monthly", series });
assert.equal(salary.annualEquivalent, 2_400_000);
assert.equal(salary.monthlyEquivalent, 200000);

const gdp = calculateGDPppp(2_000_000, [{ year: 2025, value: 20 }], 2025);
assert.equal(gdp.internationalDollarGDP, 100000);

assert.throws(
  () => calculatePPP({ sourceCountry: "US", targetCountry: "IN", amount: 0, series }),
  (error: unknown) => error instanceof PPPError && error.code === "INVALID_AMOUNT"
);

console.log("PPP engine tests passed.");
