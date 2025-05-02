"use client";
import { useDashboard } from "@/contexts/dashboardContext";
import { fetchAllTransactions } from "@/services/transactions";
import { TransactionMetaData } from "@/types/wallet";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ActivityItem } from "../ui/activity-item";

export const Transactions = () => {
  const { user } = useDashboard();
  const [activeTab, setActiveTab] = useState("all");

  const { data } = useSuspenseQuery({
    queryKey: ["transactions"],
    queryFn: () => fetchAllTransactions(user?.wallet_id!),
  });

  const filteredTransactions = data?.data.filter((transaction) => {
    if (activeTab === "all") return true;

    const serelizeMetadata: TransactionMetaData = JSON.parse(
      transaction.meta_data as unknown as string
    );

    return serelizeMetadata.transaction_type === activeTab;
  });
  return (
    <>
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="deposit">Deposits</TabsTrigger>
          <TabsTrigger value="withdrawal">Withdrawals</TabsTrigger>
          <TabsTrigger value="transfer">Transfers</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredTransactions!.map(
            ({
              created_at,
              description,
              amount,
              transaction_id,
              meta_data,
            }) => (
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

          {filteredTransactions.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No transactions found
            </div>
          )}
        </TabsContent>
      </Tabs>
    </>
  );
};
