import { Input } from "./input";

const formatAmount = (value: string) => {
  const numeric = value.replace(/,/g, "");
  if (!numeric || isNaN(Number(numeric))) return "";
  const [int, dec] = numeric.split(".");
  const formattedInt = Number(int).toLocaleString("en-US");
  return dec !== undefined ? `${formattedInt}.${dec}` : formattedInt;
};

export const NumberInput = ({
  value,
  onChange,
  ...props
}: React.ComponentProps<"input">) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9.]/g, "");
    const parts = raw.split(".");
    // Prevent more than one decimal point or more than 2 decimals
    if (parts.length > 2 || (parts[1] && parts[1].length > 2)) return;

    onChange?.({
      ...e,
      target: {
        ...e.target,
        value: raw,
      },
    });
  };

  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
        $
      </span>
      <Input
        id="amount"
        inputMode="decimal"
        type="text"
        placeholder="0.00"
        className="pl-8"
        value={formatAmount(String(value))}
        onChange={handleChange}
        {...props}
      />
    </div>
  );
};
