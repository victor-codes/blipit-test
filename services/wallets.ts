import { CreateLedgerBalanceResp } from "@blnkfinance/blnk-typescript/dist/src/types/ledgerBalances";
import { ATDeposit, ATWithdrawal, MainWalletData } from "@/types/wallet";

export const getMainBalance = async (
  balance_id: string
): Promise<MainWalletData> => {
  const balance = await fetch(`/blnk/balances/${balance_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!balance.ok) {
    console.error("Failed to fetch main balance:", balance);
    throw new Error("Failed to fetch main balance, response not ok.");
  }
  const balanceData = await balance.json();

  return balanceData;
};

export const depositToWallet = async (data: ATDeposit) => {
  const transaction = await fetch(`/blnk/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!transaction.ok) {
    console.error("Failed to fetch main transaction:", transaction);
    throw new Error("Failed to fetch main transaction, response not ok.");
  }
  const transactionData = await transaction.json();

  return transactionData;
};

export const withdrawToWallet = async (data: ATWithdrawal) => {
  const transaction = await fetch(`/blnk/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!transaction.ok) {
    console.error("Failed to fetch main transaction:", transaction);
    throw new Error("Failed to fetch main transaction, response not ok.");
  }
  const transactionData = await transaction.json();

  return transactionData;
};
