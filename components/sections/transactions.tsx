"use client";
import { useDashboard } from "@/contexts/dashboard-context";
import { fetchAllTransactions } from "@/services/transactions";
import { TransactionMetaData } from "@/types/wallet";
import { useInView } from "react-intersection-observer";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Modal, ModalTrigger } from "../ui/modal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { TransactionItem } from "../ui/transaction-item";

import { TransactionDetails } from "../ui/transaction-details";

export const Transactions = () => {
  const { user } = useDashboard();
  const { ref, inView } = useInView();

  const [activeTab, setActiveTab] = useState("all");

  const { data, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery({
    queryKey: ["transactions"],
    queryFn: async ({ pageParam }) =>
      await fetchAllTransactions(user?.wallet_id!, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.next_page;
    },
  });

  const flattenData = data?.pages.flatMap((page) => page.data) ?? [];

  const filteredTransactions = flattenData.filter((transaction) => {
    if (activeTab === "all") return true;

    const serelizeMetadata: TransactionMetaData = JSON.parse(
      transaction?.meta_data as unknown as string
    );

    return serelizeMetadata.transaction_type === activeTab;
  });

  useEffect(() => {
    if (activeTab !== "all") return;
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, activeTab, hasNextPage]);

  return (
    <Tabs defaultValue="all" onValueChange={setActiveTab} className="pb-10">
      <TabsList className="grid grid-cols-4 mb-4">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="deposit">Deposits</TabsTrigger>
        <TabsTrigger value="withdrawal">Withdrawals</TabsTrigger>
        <TabsTrigger value="internal_transfer">Transfers</TabsTrigger>
      </TabsList>

      <TabsContent value={activeTab} className="space-y-4">
        {filteredTransactions!.map(
          ({
            created_at,
            description,
            status,
            amount,
            reference,
            meta_data,
          }) => (
            <Modal key={reference}>
              <ModalTrigger>
                <div>
                  <TransactionItem
                    metadata={meta_data}
                    amount={amount}
                    date={created_at!}
                  />
                </div>
              </ModalTrigger>
              <TransactionDetails
                {...{
                  reference,
                  description,
                  status,
                  amount,
                  date: created_at as unknown as number,
                }}
              />
            </Modal>
          )
        )}

        {filteredTransactions.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No transactions found
          </div>
        )}
      </TabsContent>
      <div ref={ref} className="h-4 w-full"></div>
    </Tabs>
  );
};
