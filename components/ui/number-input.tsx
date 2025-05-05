import { useState } from "react";
import { Input } from "./input";

export const NumberInput = ({
  value,
  onChange,
  ...props
}: React.ComponentProps<"input"> & {
  value: number | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const [rawInput, setRawInput] = useState(String(value ?? ""));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;

    // Allow only valid input: digits and at most one decimal point
    if (!/^\d*\.?\d{0,2}$/.test(raw)) return;

    setRawInput(raw);

    const numericValue = parseFloat(raw);
    onChange({
      ...e,
      target: {
        ...e.target,
        value: isNaN(numericValue) ? "" : numericValue.toString(),
      },
    });
  };

  const handleBlur = () => {
    if (!rawInput) return;
    const [int, dec] = rawInput.split(".");
    const formatted =
      Number(int).toLocaleString("en-US") + (dec ? `.${dec}` : "");
    setRawInput(formatted);
  };

  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
        $
      </span>
      <Input
        inputMode="decimal"
        type="text"
        placeholder="0.00"
        className="pl-8"
        value={rawInput}
        onChange={handleChange}
        onBlur={handleBlur}
        {...props}
      />
    </div>
  );
};
