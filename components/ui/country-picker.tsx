import { countryList } from "@/lib/countries";
import { cn } from "@/lib/utils";

import { ChevronsUpDown, Check } from "lucide-react";
import React from "react";

import { Label } from "./label";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Button } from "./button";
import { FormColumn } from "./form-blocks";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

type CountryPickerProps = {
  value: string;
  onChange: (nationality: string, country: string) => void;
};

export const CountryPicker = ({ value, onChange }: CountryPickerProps) => {
  return (
    <FormColumn className="flex flex-col">
      <Label>Nationality</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={value ? "true" : "false"}
            className={cn(
              "w-full justify-between",
              !value && "text-muted-foreground"
            )}
          >
            {value ?? "Select country"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput placeholder="Search country..." className="h-9" />
            <CommandList>
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup className="max-h-64 overflow-auto">
                {countryList.map((country) => (
                  <CommandItem
                    key={country.code}
                    value={country.nationality}
                    onSelect={() => {
                      onChange(country.nationality, country.label);
                    }}
                  >
                    {country.label}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        country.nationality === value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </FormColumn>
  );
};
