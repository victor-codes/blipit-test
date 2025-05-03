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
      nick_name: meta_data.nick_name,
      card_details: {
        masked_number: meta_data.masked_number,
        expiry: meta_data.expiry_date,
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
