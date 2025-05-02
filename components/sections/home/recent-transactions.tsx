"use client";
import { ActivityItem } from "@/components/ui/activity-item";
import { Button } from "@/components/ui/button";
import { useDashboard } from "@/contexts/dashboardContext";
import { fetchRecentTransactions } from "@/services/transactions";
import { TransactionsItem } from "@/types/wallet";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { Activity, CreditCard } from "lucide-react";
import Link from "next/link";
import React from "react";

export const RecentTransactions = () => {
  const { user } = useDashboard();

  const { data } = useSuspenseQuery({
    queryKey: ["recent-transactions"],
    queryFn: () => fetchRecentTransactions(user?.wallet_id!),
  });

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Recent transactions</h2>
        <Button variant="ghost" size="sm">
          View all
        </Button>
      </div>

      {data.data.map(
        ({ created_at, description, amount, transaction_id, meta_data }) => (
          <ActivityItem
            key={transaction_id}
            id={transaction_id}
            metadata={meta_data}
            amount={amount}
            date={created_at!}
            destination={description}
          />
        )
      )}

      {/* <div className="grid grid-cols-2 gap-3">
        <Link
          href="/create-card-wallet"
          className="flex flex-col items-center justify-center border rounded-md py-4 shadow-xs"
        >
          <CreditCard className="h-8 w-8 mb-2" />
          Create Card Wallet
        </Link>

        <Link
          href="/activity"
          className="flex flex-col items-center justify-center border rounded-md py-4 shadow-xs"
        >
          <Activity className="h-8 w-8 mb-2" />
          View Transactions
        </Link>
      </div> */}
    </div>
  );
};
