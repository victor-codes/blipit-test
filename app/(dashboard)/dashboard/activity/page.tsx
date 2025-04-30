"use client";

import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample transaction data
type TransactionType = "deposit" | "withdrawal" | "transfer";

interface TransactionItem {
  id: string;
  date: string;
  type: TransactionType;
  amount: number;
  reference: string;
  destination?: string; // Optional property for transfers
}



const transactions: TransactionItem[] = [
  {
    id: "1",
    date: "2025-04-29",
    type: "deposit",
    amount: 500,
    reference: "DEP-20250429-XYZ",
  },
  {
    id: "2",
    date: "2025-04-28",
    type: "withdrawal",
    amount: -200,
    reference: "WDR-20250428-ABC",
  },
  {
    id: "3",
    date: "2025-04-27",
    type: "transfer",
    amount: -100,
    reference: "TRF-20250427-DEF",
    destination: "Vacation Card",
  },
  {
    id: "4",
    date: "2025-04-26",
    type: "deposit",
    amount: 1000,
    reference: "DEP-20250426-GHI",
  },
];

export default function Activity() {
  const [activeTab, setActiveTab] = useState("all");

  // Filter transactions based on active tab
  const filteredTransactions = transactions.filter((transaction) => {
    if (activeTab === "all") return true;
    return transaction.type === activeTab;
  });

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold mb-4">Transaction History</h1>

        <Tabs defaultValue="all" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="deposit">Deposits</TabsTrigger>
            <TabsTrigger value="withdrawal">Withdrawals</TabsTrigger>
            <TabsTrigger value="transfer">Transfers</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <TabContentItem key={transaction.id} {...transaction} />
            ))}

            {filteredTransactions.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No transactions found
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

const TabContentItem = ({
  type,
  id,
  destination,
  date,
  amount,
}: TransactionItem) => (
  <div className="p-4 bg-card text-card-foreground flex flex-col gap-6 rounded-xl border shadow-sm">
    <div className="flex justify-between items-center">
      <div className="flex-1 flex gap-4 items-center">
        <div className="w-9 h-9 border rounded-full"></div>
        <div className="flex-1">
          <p className="font-medium capitalize">
            {type}
            {destination && ` to ${destination}`}
          </p>
          <p className="text-sm text-gray-500">
            {new Date(date).toLocaleDateString()}
          </p>
          {/* <p className="text-xs text-gray-500">
                        {reference}
                        </p> */}
        </div>
      </div>
      <div>
        <p
          className={`font-bold ${
            amount > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {amount > 0 ? "+" : ""}
          {amount.toFixed(2)} USD
        </p>
      </div>
    </div>
    {/* <Button variant="ghost" size="sm" className="w-full mt-2">
                    View Details
                  </Button> */}
  </div>
);
