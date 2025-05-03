import { Modal, ModalTrigger } from "@/components/ui/modal";
import { PageHeader } from "@/components/ui/page";
import { Skeleton } from "@/components/ui/skeleton";
import { useDashboard } from "@/contexts/dashboard-context";
import { CARDS_SECTION } from "@/lib/contants";

import { Info, Plus, Wallet } from "lucide-react";

import {
  TransactionItem,
  TransactionsLoading,
} from "@/components/ui/transaction-item";
import { fetchRecentTransactions } from "@/services/transactions";
import { getCardDetails } from "@/services/wallets";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Suspense } from "react";
import { CardDetails } from "./card-details";
import { CardPreview } from "./card-preview";
import { CardPageSkeletion } from "./card-skeletion";

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

  const { data, isFetching } = useQuery({
    queryKey: ["card-details"],
    queryFn: getCardDetails,
  });

  if (isFetching) {
    return <CardPageSkeletion />;
  }

  const { details } = data!;

  return (
    <>
      <PageHeader>Card</PageHeader>
      <div className="space-y-6">
        <CardPreview data={details} />
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

            {!isFetching && (
              <CardDetails
                card_number={details?.tokenized_number!}
                card_name={`${user?.first_name} ${user?.last_name}`}
                cvv={details?.tokenized_cvv!}
                expiry_date={details?.expiry_date!}
                billing_address={details?.billing_address!}
                zip_code={details?.zip_code!}
              />
            )}
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
