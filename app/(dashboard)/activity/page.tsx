import { Suspense } from "react";

import { Transactions } from "@/components/sections/transactions";
import { Skeleton } from "@/components/ui/skeleton";

export default function Activity() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Transaction History</h1>
      <Suspense fallback={<Skeleton className="h-10" />}>
        <Transactions />
      </Suspense>
    </>
  );
}
