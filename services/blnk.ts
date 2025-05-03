// import { BlnkInit } from "@blnkfinance/blnk-typescript";
import { Blnk } from "@blnkfinance/blnk-typescript/dist/src/blnk/endpoints/baseBlnkClient";
import { BlnkInit } from "@blnkfinance/blnk-typescript";
import { getExpiryDateAdd3Years } from "@/lib/utils";

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

  return mainWallet.data.balance_id;
}

export async function createCardWallet(
  ledgerId: string,
  identityId: string,
  currency: string,
  meta_data: { [key: string]: string }
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
      ...meta_data,
      card_details: {
        masked_number: "xxxx-xxxx-xxxx-1234",
        expiry: getExpiryDateAdd3Years(),
        type: "virtual",
      },
    },
  });

  if (!cardWallet.data) {
    console.error("Failed to create card wallet:", cardWallet);
    throw new Error("Failed to create card wallet, response data is null.");
  }

  return cardWallet.data.balance_id;
}
