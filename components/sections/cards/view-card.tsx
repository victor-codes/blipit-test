import { MastercardIcon } from "@/components/svgs/mastercard-icon";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@/components/ui/modal";
import { PageHeader } from "@/components/ui/page";
import { Skeleton } from "@/components/ui/skeleton";
import { useDashboard } from "@/contexts/dashboard-context";
import { useWallets } from "@/contexts/wallets-context";
import { AMOUNT_PRECISION, CARDS_SECTION } from "@/lib/contants";

import { Copy, Info, Plus, Shield, Wallet } from "lucide-react";

import {
  TransactionItem,
  TransactionsLoading,
} from "@/components/ui/transaction-item";
import { fetchRecentTransactions } from "@/services/transactions";
import { useSuspenseQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Suspense } from "react";

type ViewCardProps = {
  updateSection: (section: CARDS_SECTION) => void;
};
export const ViewCard = ({ updateSection }: ViewCardProps) => {
  const { user } = useDashboard();
  const initFundCard = () => {
    updateSection(CARDS_SECTION.FUND_CARD);
  };

  const initWithdrawCard = () => {
    updateSection(CARDS_SECTION.WITHDRAW);
  };

  return (
    <>
      <PageHeader>Card</PageHeader>
      <div className="space-y-6">
        <CardPreview />
        <div className="flex gap-3  mx-auto">
          <Modal>
            <ModalTrigger>
              <button className="flex-1 flex flex-col items-center justify-center gap-2 cursor-pointer">
                <div className="w-9 h-9 bg-black  rounded-full flex items-center justify-center">
                  <Info className="h-4 w-4 text-card" />
                </div>
                <span className="text-sm font-medium">Details</span>
              </button>
            </ModalTrigger>
            <CardDetails
              card_number={"14309080435432"}
              card_name={`${user?.first_name} ${user?.last_name}`}
              cvv="434"
              expiry_date={"12/23"}
              billing_address=""
              zip_code="432523"
              address={""}
            />
          </Modal>

          <button
            className="flex-1 flex flex-col items-center justify-center gap-2 cursor-pointer"
            onClick={initFundCard}
          >
            <div className="w-9 h-9 border rounded-full flex items-center justify-center">
              <Plus className="h-4 w-4" />
            </div>

            <span className="text-sm font-medium">Add funds</span>
          </button>

          <button
            className="flex-1 flex flex-col items-center justify-center gap-2 cursor-pointer"
            onClick={initWithdrawCard}
          >
            <div className="w-9 h-9 border rounded-full flex items-center justify-center">
              <Wallet className="h-4 w-4" />
            </div>
            <span className="text-sm font-medium">Withdraw funds</span>
          </button>
        </div>
      </div>

      <Suspense fallback={<TransactionsLoading num={4} />}>
        <CardRecentTransactions />
      </Suspense>
    </>
  );
};

const CardPreview = () => {
  const { card } = useWallets();

  if (card.isFetching) {
    return (
      <Skeleton className="aspect-[1.875] bg-black/20 rounded-xl flex justify-between flex-col p-4" />
    );
  }

  const balance = card.wallet.balance / AMOUNT_PRECISION!;

  const balanceSplit = balance.toString().split(".");

  return (
    <div className="flex justify-between flex-col gap-4 border/85 rounded-xl p-4 bg-gradient-to-br from-violet-500/50 via-purple-500/50 to-pink-500/50 text-card aspect-[1.875]">
      <div>
        <Shield />
      </div>
      <div>
        <p className="text-2xl">
          {(card.wallet!.meta_data as any)?.card_details?.masked_number!}
        </p>
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

export const CardRecentTransactions = () => {
  const { user } = useDashboard();

  const { data } = useSuspenseQuery({
    queryKey: ["card-recent-transactions"],
    queryFn: () => fetchRecentTransactions(user?.card_id!),
  });
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Recent transactions</h2>
        <Link href="/cards/transactions">View all</Link>
      </div>

      {data?.data.map(({ created_at, amount, transaction_id, meta_data }) => (
        <TransactionItem
          key={transaction_id}
          metadata={meta_data}
          amount={amount}
          date={created_at!}
          purpose="fund_card"
        />
      ))}
    </div>
  );
};

const CardDetails = ({
  expiry_date,
  card_number,
  card_name,
  cvv,
  billing_address,
  zip_code,
}: TransactionDetailsProps) => {
  return (
    <ModalContent>
      <ModalHeader>
        <ModalTitle>
          <span className="max-md:sr-only">Card Details</span>
        </ModalTitle>
      </ModalHeader>
      <div className="flex flex-col gap-4 px-4 md:px-0 pb-10 md:pb-0">
        <div className="flex flex-col gap-4">
          <CardDtlItem label="Card Name" value={card_name} />
          <CardDtlItem label="Card Number" value={card_number} />
          <CardDtlItem label="CVV" value={cvv} />
          <CardDtlItem label="Expiry Date" value={expiry_date} />
          <CardDtlItem label="Billing Address" value={billing_address} />
          <CardDtlItem label="Zip Code" value={zip_code} />
        </div>
      </div>
    </ModalContent>
  );
};

const CardDtlItem = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="flex flex-col font-medium">
    <p className="text-sm text-gray-500">{label}</p>
    <div className="flex flex-row items-center gap-2">
      <p className="">{value}</p>
      <button className="py-2">
        <Copy className="w-4 h-4" />
      </button>
    </div>
  </div>
);

type TransactionDetailsProps = {
  expiry_date: string;
  card_number: string;
  card_name: string;
  cvv: string;
  billing_address: string;
  zip_code: string;
  address: string;
};
