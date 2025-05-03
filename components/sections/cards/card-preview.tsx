import { MastercardIcon } from "@/components/svgs/mastercard-icon";
import { Skeleton } from "@/components/ui/skeleton";
import { useWallets } from "@/contexts/wallets-context";
import { AMOUNT_PRECISION } from "@/lib/contants";
import { CardDetailsType } from "@/types/wallet";
import { Shield } from "lucide-react";

export const CardPreview = ({ data }: { data: CardDetailsType }) => {
  const { card } = useWallets();

  if (card.isFetching) {
    return (
      <Skeleton className="aspect-[1.875] bg-black/20 rounded-xl flex justify-between flex-col p-4" />
    );
  }

  const balance = card.wallet.balance / AMOUNT_PRECISION!;
  const balanceSplit = balance.toString().split(".");

  const masked_number = `XXXX XXXX XXXX ${
    data?.tokenized_number.split(":")[1]
  }`;

  return (
    <div className="flex justify-between flex-col gap-4 border/85 rounded-xl p-4 bg-gradient-to-br from-violet-500/50 via-purple-500/50 to-pink-500/50 text-card aspect-[1.875]">
      <div>
        <Shield />
      </div>
      <div>
        <p className="text-2xl">{masked_number!}</p>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items">
          <p className="text-sm leading-none mt-[1.5px]">$</p>
          <p className="text-2xl font-bold leading-none">
            {balanceSplit[0]}.
            <span className="text-sm font-normal leading-none">
              {balanceSplit[1] || "00"}
            </span>
          </p>
        </div>
        <div className="w-20">
          <MastercardIcon />
        </div>
      </div>
    </div>
  );
};
