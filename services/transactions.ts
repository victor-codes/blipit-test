import { TransactionsItem } from "@/types/wallet";

const TRANSACTION_PAGINATION_COUNT = 20;
export const fetchAllTransactions = async (
  balance_id: string,
  page: number
): Promise<TransactionsResponse> => {
  const transactions = await fetch(`/blnk/search/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      q: balance_id,
      query_by: "source,destination",
      page: page,
      per_page: TRANSACTION_PAGINATION_COUNT,
      sort_by: "created_at:desc",
    }),
  });

  if (!transactions.ok) {
    console.error("Failed to fetch main transactions:", transactions);
    throw new Error("Failed to fetch main transactions, response not ok.");
  }
  const transactionsData = await transactions.json();

  const totalPages = Math.ceil(
    transactionsData.found / TRANSACTION_PAGINATION_COUNT
  );

  const nextPageNum =
    transactionsData.page <= totalPages ? transactionsData.page + 1 : null;

  const response = {
    data: transactionsData.hits.map(
      (item: any) => item.document as unknown as TransactionsItem
    ),
    total_count: transactionsData.found,
    current_page: transactionsData.page,
    next_page: nextPageNum,
  };

  return response;
};

type TransactionsResponse = {
  data: TransactionsItem[];
  total_count: number;
  current_page: number;
  next_page?: number | null;
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
