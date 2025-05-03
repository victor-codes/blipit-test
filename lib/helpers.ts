import { TransactionMetaData } from "@/types/wallet";

export const generateTranxTitle = (metadata: TransactionMetaData): string => {
  // Capitalize first letter helper
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  switch (metadata.transaction_type) {
    case "withdrawal":
      return "Withdrawal";
    case "deposit":
      return "Deposit";
    case "internal_transfer":
      // Replace underscores and capitalize each word
      return metadata.purpose.split("_").map(capitalize).join(" ");
    default:
      // Fallback using type if available, otherwise generic
      return metadata.type ? capitalize(metadata.type) : "Transaction";
  }
};

export const parseMetadata = (
  metadataString: string | null | undefined
): TransactionMetaData | null => {
  if (!metadataString) {
    console.error("Tranx Item: Metadata string is missing.");
    return null;
  }
  try {
    const parsed = JSON.parse(metadataString);
    // Optional: Add validation here to ensure parsed object matches TransactionMetaData shape
    return parsed as TransactionMetaData;
  } catch (error) {
    console.error("Tranx Item: Failed to parse metadata JSON.", error);
    return null;
  }
};
