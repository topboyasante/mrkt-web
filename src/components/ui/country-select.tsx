import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries } from "@/constant/country-codes";
import Flag from "react-world-flags";

interface CountrySelectProps {
  onChange: (selectedOption: {
    country_code: string;
    calling_code: string;
  }) => void;
}

function CountrySelect({ onChange }: CountrySelectProps) {
  const handleChange = (value: string) => {
    const selectedCountry = countries.find(
      (country) => country.value === value
    );

    if (selectedCountry) {
      onChange({
        country_code: selectedCountry.value,
        calling_code: selectedCountry.callingCode,
      });
    }
  };

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select your country" />
      </SelectTrigger>
      <SelectContent>
        {countries.map((country) => (
          <SelectItem
            key={country.value}
            value={country.value}
            className="text-black"
          >
            <div className="flex items-center gap-5">
              <Flag code={country.value} height={30} width={30} />
              <p>{country.label}</p>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default CountrySelect;
