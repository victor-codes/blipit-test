import { Input } from "./input";

export const NumberInput = (props: React.ComponentProps<"input">) => {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
      <Input
        id="amount"
        type="number"
        placeholder="0.00"
        className="pl-8"
        {...props}
        required
      />
    </div>
  );
};
