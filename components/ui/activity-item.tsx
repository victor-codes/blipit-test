import { AMOUNT_PRECISION } from "@/lib/contants";
import { balanceFormatter, cn, formatDate } from "@/lib/utils";
import { TransactionMetaData } from "@/types/wallet";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

type ActivityItemProps = {
  destination?: string;
  date: Date;
  amount: number;
  metadata?: TransactionMetaData;
  reference?: string;
  id?: string;
};

export const ActivityItem = ({
  destination,
  date,
  amount,
  metadata,
  id,
}: ActivityItemProps) => {
  const serelizeMetadata: TransactionMetaData = JSON.parse(
    metadata as unknown as string
  );

  const isDeposit =
    serelizeMetadata.transaction_type === "deposit" ||
    serelizeMetadata.transaction_type === "transfer";

  const title = () => {
    switch (serelizeMetadata.transaction_type) {
      case "withdrawal":
        return "Withdrawal";
      case "deposit":
        return "Deposit";
      case "internal_transfer":
        return serelizeMetadata.purpose;
      default:
        return "Transaction";
    }
  };

  return (
    <div
      className="py-1 bg-card text-card-foreground flex flex-col gap-6 rounded-xl"
      id={id}
    >
      <div className="flex justify-between items-center">
        <div className="flex-1 flex gap-4 items-center">
          <div
            className={cn(
              "flex items-center justify-center w-9 h-9 border rounded-full",
              {
                "bg-green-100 text-green-600  border-green-200": isDeposit,
                "bg-amber-100 text-amber-600 border-amber-200": !isDeposit,
              }
            )}
          >
            {isDeposit ? (
              <ArrowDownIcon className="h-4 w-4" />
            ) : (
              <ArrowUpIcon className="h-4 w-4" />
            )}
          </div>
          <div className="flex-1">
            <p className="font-medium capitalize">
              {serelizeMetadata.type}
              {title()}
            </p>
            <p className="text-sm text-gray-500">
              {formatDate(date as unknown as number)}
            </p>
          </div>
        </div>
        <div>
          <p
            className={cn("font-medium", {
              // "text-green-600": isDeposit,
              // "text-red-600": !isDeposit,
            })}
          >
            {!isDeposit && "-"}
            {balanceFormatter(amount / AMOUNT_PRECISION)}
          </p>
        </div>
      </div>
    </div>
  );
};
