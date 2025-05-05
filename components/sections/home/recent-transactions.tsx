"use client";
import { TransactionItem } from "@/components/ui/transaction-item";
import { useDashboard } from "@/contexts/dashboard-context";
import { fetchRecentTransactions } from "@/services/transactions";
import { useSuspenseQuery } from "@tanstack/react-query";
import Link from "next/link";

export const RecentTransactions = () => {
  const { user } = useDashboard();

  const { data } = useSuspenseQuery({
    queryKey: ["recent-transactions"],
    queryFn: () => fetchRecentTransactions(user?.wallet_id!),
  });

  if (data.data.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Recent transactions</h2>
        <Link href="/transactions">View all</Link>
      </div>

      {data.data.map(({ created_at, amount, transaction_id, meta_data }) => (
        <TransactionItem
          key={transaction_id}
          metadata={meta_data}
          amount={amount}
          date={created_at!}
        />
      ))}
    </div>
  );
};
