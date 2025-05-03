import { Database } from "@/database.types";
import {
  createCardSchema,
  depositSchema,
} from "@/lib/validation-schema/client";
import { CreateLedgerBalanceResp } from "@blnkfinance/blnk-typescript/dist/src/types/ledgerBalances";
import { CreateTransactionResponse } from "@blnkfinance/blnk-typescript/dist/src/types/transactions";
import { z } from "zod";

export type DepositFormData = z.infer<typeof depositSchema>;
export type CreateDataFormData = z.infer<typeof createCardSchema>;

export type MainWalletData = CreateLedgerBalanceResp<Record<string, unknown>>;

export type ATDeposit = {
  amount: number;
  precision: number;
  destination: string;
  reference: string;
  description: string;
  source: string;
  currency: string;
  allow_overdraft: boolean;

  meta_data: {
    [key: string]: string;
  }; // Enable for the external source
};

export type ATCreateCard = {
  identity_id: string;
  meta_data: {
    [key: string]: string;
  };
};
export type ATWithdrawal = Omit<ATDeposit, "allow_overdraft">;

export type TransactionsItem = CreateTransactionResponse<TransactionMetaData>;

export type TransactionMetaData = {
  transaction_type: TransactionType;
  channel: TransactionChannel;
  [key: string]: string;
};
export type TransactionType =
  | "deposit"
  | "withdrawal"
  | "transfer"
  | "internal_transfer";

export type TransactionChannel = "bank_transfer" | "card";

export type CardDetailsType = Omit<
  Database["public"]["Tables"]["cards"]["Row"],
  "created_at" | "id"
>;

export type GetCardDetailsRes = {
  message: string;
  details: CardDetailsType;
};
