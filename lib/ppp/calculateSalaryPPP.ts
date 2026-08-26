import { calculatePPP, type CalculatePPPInput } from "./calculatePPP.ts";

export type SalaryPeriod = "yearly" | "monthly";

export function calculateSalaryPPP(
  input: Omit<CalculatePPPInput, "amount" | "indicator"> & {
    salary: number;
    period: SalaryPeriod;
  }
) {
  const annualSalary = input.period === "monthly" ? input.salary * 12 : input.salary;
  const result = calculatePPP({
    ...input,
    amount: annualSalary,
    indicator: "private"
  });

  return {
    ...result,
    annualEquivalent: result.equivalentAmount,
    monthlyEquivalent: result.equivalentAmount / 12
  };
}
