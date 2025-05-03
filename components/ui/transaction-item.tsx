import { generateTranxTitle, parseMetadata } from "@/lib/helpers";
import { balanceFormatter, cn, formatDate } from "@/lib/utils";
import { TransactionMetaData } from "@/types/wallet";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { Skeleton } from "./skeleton";

type TransactionItemProps = {
  date: Date;
  amount: number;
  metadata?: TransactionMetaData;
  purpose?: string;
};

export const TransactionItem = ({
  date,
  amount,
  metadata,
  purpose = "fund_wallet",
}: TransactionItemProps) => {
  const parsedMetadata = parseMetadata(metadata as unknown as string);
  if (!parsedMetadata) {
    return null;
  }

  const title = generateTranxTitle(parsedMetadata!);

  const isIncoming =
    parsedMetadata?.transaction_type === "deposit" ||
    (parsedMetadata?.transaction_type === "internal_transfer" &&
      parsedMetadata?.purpose === purpose);

  return (
    <div className="flex justify-between items-center py-1 text-card-foreground">
      <div className="flex-1 flex gap-4 items-center">
        <div
          className={cn(
            "flex items-center justify-center w-9 h-9 border rounded-full",
            {
              "bg-green-100 text-green-600 border-green-200": isIncoming,
              "bg-red-100 text-red-600 border-red-200": !isIncoming, // Changed amber to red for outgoing consistency
            }
          )}
        >
          {isIncoming ? (
            <ArrowDownIcon className="h-4 w-4" />
          ) : (
            <ArrowUpIcon className="h-4 w-4" />
          )}
        </div>
        <div className="flex-1">
          <p className="font-medium capitalize">{title}</p>
          <p className="text-sm text-gray-500">
            {formatDate(date as unknown as number)}
          </p>
        </div>
      </div>
      <div>
        <p className="font-medium">
          {isIncoming ? "+" : "-"}
          {balanceFormatter(amount)}
        </p>
      </div>
    </div>
  );
};

export const TransactionsLoading = ({ num }: { num: number }) => {
  return (
    <div className="space-y-3">
      <Skeleton className="h-7" />
      <div className="space-y-4">
        {Array.from({ length: num }).map((_, idx) => (
          <TransactionLoadingItem key={idx} />
        ))}
      </div>
    </div>
  );
};

const TransactionLoadingItem = () => (
  <div className="flex justify-between items-center gap-4 py-1 text-card-foreground">
    <div className="flex-1 flex gap-4 items-center">
      <Skeleton className="h-9 w-9 rounded-full" />
      <div className="flex-1">
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
    <Skeleton className="h-6 w-16" />
  </div>
);

export const TransactionsPageLoading = ({ num }: { num: number }) => {
  return (
    <div className="space-y-6">
      <Skeleton className="h-9" />
      <div className="space-y-4">
        {Array.from({ length: num }).map((_, idx) => (
          <TransactionLoadingItem key={idx} />
        ))}
      </div>
    </div>
  );
};
