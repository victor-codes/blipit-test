import { Suspense } from "react";

import { Transactions } from "@/components/sections/transactions";
import { PageHeader } from "@/components/ui/page";
import { TransactionsPageLoading } from "@/components/ui/transaction-item";

export default function Page() {
  return (
    <>
      <PageHeader>Transaction History</PageHeader>
      <Suspense fallback={<TransactionsPageLoading num={7} />}>
        <Transactions />
      </Suspense>
    </>
  );
}
