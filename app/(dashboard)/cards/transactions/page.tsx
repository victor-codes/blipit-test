import { CardTransactions } from "@/components/sections/cards/card-transactions";
import { PageHeader } from "@/components/ui/page";
import { Skeleton } from "@/components/ui/skeleton";
import { TransactionsPageLoading } from "@/components/ui/transaction-item";
import { Suspense } from "react";

const Page = () => {
  return (
    <>
      <PageHeader>Card Transactions</PageHeader>
      <Suspense fallback={<TransactionsPageLoading num={7} />}>
        <CardTransactions />
      </Suspense>
    </>
  );
};

export default Page;
