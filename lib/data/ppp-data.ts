import countriesRaw from "@/data/countries.json";
import privateRaw from "@/data/ppp-private.json";
import gdpRaw from "@/data/ppp-gdp.json";
import metadata from "@/data/metadata.json";
import type { CountryMeta, CountryPPPSeries } from "@/types/ppp";

export const countries = countriesRaw as CountryMeta[];
export const privatePPP = privateRaw as CountryPPPSeries;
export const gdpPPP = gdpRaw as CountryPPPSeries;
export const pppMetadata = metadata;

export function getCountry(code: string) {
  return countries.find((country) => country.code === code);
}
