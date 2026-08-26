export type PPPIndicator = "private" | "gdp";

export type PPPObservation = {
  year: number;
  value: number;
};

export type CountryMeta = {
  code: string;
  iso3: string;
  name: string;
  currencyCode: string;
  currencySymbol: string;
  locale: string;
  flag: string;
};

export type CountryPPPSeries = Record<string, PPPObservation[]>;

export type PPPResult = {
  sourceCountry: string;
  targetCountry: string;
  inputAmount: number;
  equivalentAmount: number;
  ratio: number;
  indicator: PPPIndicator;
  year: number;
  sourceFactor: number;
  targetFactor: number;
};

export type PPPErrorCode =
  | "INVALID_AMOUNT"
  | "INVALID_COUNTRY"
  | "NO_DATA"
  | "NO_COMMON_YEAR";

export class PPPError extends Error {
  code: PPPErrorCode;

  constructor(code: PPPErrorCode, message: string) {
    super(message);
    this.name = "PPPError";
    this.code = code;
  }
}
