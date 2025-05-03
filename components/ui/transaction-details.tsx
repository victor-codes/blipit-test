import { cn, StatusColorMap, balanceFormatter, formatDate } from "@/lib/utils";
import { StatusType } from "@blnkfinance/blnk-typescript/dist/src/types/transactions";
import { Check } from "lucide-react";
import { ModalContent, ModalHeader, ModalTitle } from "./modal";
import { StatusPill } from "./status-pill";

type TransactionDetailsProps = {
  reference: string;
  description: string | null;
  status: StatusType;
  amount: number;
  date: number;
};

export const TransactionDetails = ({
  reference,
  description,
  status,
  amount,
  date,
}: TransactionDetailsProps) => {
  return (
    <ModalContent>
      <ModalHeader>
        <ModalTitle>
          <span className="max-md:sr-only">Transaction Details</span>
        </ModalTitle>
      </ModalHeader>
      <div className="flex flex-col gap-4 md:pt-5 px-4 md:px-0 pb-10 md:pb-0">
        <div className="flex flex-col items-center gap-2">
          <div
            className={cn(
              "h-16 w-16 rounded-full flex items-center justify-center",
              StatusColorMap[status]
            )}
          >
            <Check className="w-8 h-8" />
          </div>
          <div className="mt-4 space-y-2">
            <p className="text-2xl font-semibold text-center">
              {balanceFormatter(amount)}
            </p>
            <StatusPill status={status} />
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-6">
          <TransDtlItem label="Reference" value={reference} />
          {description && (
            <TransDtlItem label="Description" value={description} />
          )}
          <TransDtlItem
            label="Date"
            value={formatDate(date as unknown as number)}
          />
        </div>
      </div>
    </ModalContent>
  );
};

const TransDtlItem = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="flex flex-col font-medium">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="">{value}</p>
  </div>
);
