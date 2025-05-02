import { TransactionsItem } from "@/types/wallet";

export const fetchAllTransactions = async (
  balance_id: string
): Promise<TransactionsResponse> => {
  const transactions = await fetch(`/blnk/search/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      q: balance_id,
      query_by: "source,destination",
      page: 1,
      per_page: 15,
      sort_by: "created_at:desc",
    }),
  });

  if (!transactions.ok) {
    console.error("Failed to fetch main transactions:", transactions);
    throw new Error("Failed to fetch main transactions, response not ok.");
  }
  const transactionsData = await transactions.json();

  const response = {
    data: transactionsData.hits.map(
      (item: any) => item.document as unknown as TransactionsItem
    ),
    total_count: transactionsData.found,
    current_page: transactionsData.page,
  };

  return response;
};

type TransactionsResponse = {
  data: TransactionsItem[];
  total_count: number;
  current_page: number;
};

export const fetchRecentTransactions = async (
  balance_id: string
): Promise<TransactionsResponse> => {
  const transactions = await fetch(`/blnk/search/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      q: balance_id,
      query_by: "source,destination",
      page: 1,
      per_page: 5,
      sort_by: "created_at:desc",
    }),
  });

  if (!transactions.ok) {
    console.error("Failed to fetch recent transactions:", transactions);
    throw new Error("Failed to fetch recent transactions, response not ok.");
  }
  const transactionsData = await transactions.json();

  const response = {
    data: transactionsData.hits.map(
      (item: any) => item.document as unknown as TransactionsItem
    ),
    total_count: transactionsData.found,
    current_page: transactionsData.page,
  };

  return response;
};
