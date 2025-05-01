import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import { NATIONALITY_MAP } from "./nationalities";

countries.registerLocale(enLocale);

const countryNames = countries.getNames("en");

// You can map the data like this:
export const countryList = Object.entries(countryNames).map(
  ([code, label]) => ({
    code,
    label: label,
    nationality: NATIONALITY_MAP[code] || "",
  })
);
