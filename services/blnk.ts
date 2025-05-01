// import { BlnkInit } from "@blnkfinance/blnk-typescript";
import { Blnk } from "@blnkfinance/blnk-typescript/dist/src/blnk/endpoints/baseBlnkClient";
import { BlnkInit } from "@blnkfinance/blnk-typescript";

let blnkInstance: Blnk | null = null;

export async function getBlnkInstance() {
  if (!blnkInstance) {
    blnkInstance = BlnkInit(process.env.BLNK_INSTANCE_API_KEY!, {
      baseUrl: process.env.BLNK_INSTANCE_API_URL!,
    });
  }
  return blnkInstance;
}

// async function createCustomerLedger() {
//   const blnk = await getBlnkInstance();
//   const { Ledgers } = blnk;

//   const customerLedger = await Ledgers.create({
//     name: "Customer Wallets Ledger",
//     meta_data: {
//       description: "Ledger for managing customer wallets",
//       application: "BlipIt Wallet System",
//     },
//   });

//   if (!customerLedger.data) throw new Error("Failed to create customer ledger");

//   console.log("Customer Ledger created:", customerLedger.data!.ledger_id);
//   return customerLedger.data!.ledger_id;
// }

interface CustomerData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  customerId: string;
  date_of_birth: Date;
  nationality: string;
  gender: "male" | "female" | "other" | undefined;
  street: string;
  post_code: string;
  city: string;
  state: string;
  country: string;
}

export async function createCustomerIdentity(customerData: CustomerData) {
  const blnk = await getBlnkInstance();
  const { Identity } = blnk;

  console.log("Creating customer identity:", customerData);

  const identity = await Identity.create({
    identity_type: "individual",
    first_name: customerData.firstName,
    last_name: customerData.lastName,
    email_address: customerData.email,
    phone_number: customerData.phone,
    dob: customerData.date_of_birth,
    nationality: customerData.nationality,
    gender: customerData.gender,
    category: "customer",
    street: customerData.street,
    country: customerData.country,
    state: customerData.state,
    post_code: customerData.post_code,
    city: customerData.city,
    meta_data: {
      customer_id: customerData.customerId,
      registration_date: new Date().toISOString(),
    },
  });

  if (!identity.data) {
    console.error("Failed to create identity:", identity);
    throw new Error("Failed to create identity, response data is null.");
  }

  console.log("Identity Data", identity.data);

  console.log("Main Wallet created:", identity.data.identity_id);
  return identity.data.identity_id;
}

export async function createMainWallet(
  ledgerId: string,
  identityId: string,
  currency: string
) {
  const blnk = await getBlnkInstance();
  const { LedgerBalances } = blnk;

  const mainWallet = await LedgerBalances.create({
    ledger_id: ledgerId,
    identity_id: identityId,
    currency: currency,
    meta_data: {
      wallet_type: "main",
      purpose: "general",
      status: "active",
    },
  });

  if (!mainWallet.data) {
    console.error("Failed to create main wallet:", mainWallet);
    throw new Error("Failed to create main wallet, response data is null.");
  }

  console.log("Main wallet", mainWallet.data);

  console.log("Main Wallet created:", mainWallet.data.balance_id);
  return mainWallet.data.balance_id;
}

// export async function depositToWallet(
//   customerBalanceID: string,
//   amount: number,
//   uniqueReference: string,
//   description: string
// ) {
//   const blnk = await getBlnkInstance();
//   const { Transactions } = blnk;

//   const deposit = await Transactions.create({
//     amount: amount,
//     precision: 100,
//     reference: uniqueReference,
//     description: description || "Deposit to wallet",
//     currency: "USD",
//     source: "@WorldUSD",
//     destination: customerBalanceID,
//     allow_overdraft: true, // Enable for the external source
//     meta_data: {
//       transaction_type: "deposit",
//       channel: "bank_transfer",
//     },
//   });

//   if (!deposit.data) {
//     console.error("Failed to create deposit transaction:", deposit);
//     throw new Error(
//       "Failed to create deposit transaction, response data is null."
//     );
//   }

//   console.log("Deposit transaction created:", deposit.data.transaction_id);
//   return deposit.data.transaction_id;
// }

// export async function withdrawFromWallet(
//   customerBalanceID: string,
//   amount: number,
//   uniqueReference: string,
//   description: string
// ) {
//   const blnk = await getBlnkInstance();
//   const { Transactions } = blnk;

//   const withdrawal = await Transactions.create({
//     amount: amount,
//     precision: 100,
//     reference: uniqueReference,
//     description: description || "Withdrawal from wallet",
//     currency: "USD",
//     source: customerBalanceID,
//     destination: "@WorldUSD",
//     meta_data: {
//       transaction_type: "withdrawal",
//       channel: "bank_transfer",
//     },
//   });

//   if (!withdrawal.data) {
//     console.error("Failed to create withdrawal transaction:", withdrawal);
//     throw new Error(
//       "Failed to create withdrawal transaction, response data is null."
//     );
//   }

//   console.log(
//     "Withdrawal transaction created:",
//     withdrawal.data.transaction_id
//   );
//   return withdrawal.data.transaction_id;
// }

async function createCardWallet(
  ledgerId: string,
  identityId: string,
  currency: string
) {
  const blnk = await getBlnkInstance();
  const { LedgerBalances } = blnk;

  const cardWallet = await LedgerBalances.create({
    ledger_id: ledgerId,
    identity_id: identityId,
    currency: currency,
    meta_data: {
      wallet_type: "card",
      purpose: "card_payments",
      status: "active",
      card_details: {
        masked_number: "xxxx-xxxx-xxxx-1234",
        expiry: "12/25",
        type: "virtual",
      },
    },
  });

  if (!cardWallet.data) {
    console.error("Failed to create card wallet:", cardWallet);
    throw new Error("Failed to create card wallet, response data is null.");
  }

  console.log("Card Wallet created:", cardWallet.data.balance_id);
  return cardWallet.data.balance_id;
}
