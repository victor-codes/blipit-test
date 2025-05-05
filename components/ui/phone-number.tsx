import PhoneInput, {
  Country,
  getCountryCallingCode,
  isValidPhoneNumber,
} from "react-phone-number-input";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

const CountrySelect = ({
  value,
  onChange,
  disabled,
  options,
}: CountrySelectProps) => {
  const selectedOption = options.find((option) => option.value === value);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          disabled={disabled}
          className={cn(
            "justify-between w-auto text-lg font-normal rounded-r-none gap-0 border-none !border-r-2",
            !value && "text-muted-foreground"
          )}
        >
          {selectedOption ? (
            `+${getCountryCallingCode(selectedOption.value)}`
          ) : (
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          )}
          <ChevronsUpDown className="ml-1 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search country..." />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto">
              {options.map(({ label, value: optionValue }) => (
                <CommandItem
                  key={optionValue}
                  className="justify-between"
                  value={`${optionValue}-${label}`}
                  onSelect={() => {
                    onChange(optionValue);
                  }}
                >
                  +{getCountryCallingCode(optionValue)} {label}
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === optionValue ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export const PhoneNumber = ({ onChange }: PhoneNumberProps) => {
  const [phoneValue, setPhoneValue] = useState<string | undefined>("");

  const onPhoneChange = (value: string | undefined) => {
    setPhoneValue(value);
    if (value) onChange(value);
    else onChange("");
  };

  return (
    <div className="flex border-input border rounded-md overflow-clip shadow-xs focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px] transition-[color,box-shadow] duration-150">
      <PhoneInput
        id="phone-input"
        defaultCountry="NG"
        value={phoneValue}
        addInternationalOption={false}
        onChange={onPhoneChange}
        countrySelectComponent={CountrySelect}
        className="flex flex-1"
        error={
          phoneValue
            ? isValidPhoneNumber(phoneValue)
              ? undefined
              : "Invalid phone number"
            : "Phone number required"
        }
      />
    </div>
  );
};
type CountrySelectProps = {
  value?: string;
  onChange: (value: string) => void;

  disabled?: boolean;
  options: {
    label: string;
    value: Country;
  }[];
};

type PhoneNumberProps = {
  onChange: (value: string) => void;
};
