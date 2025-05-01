export const fetchAllTransactions = async (balance_id: string) => {
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

  return transactionsData;
};
