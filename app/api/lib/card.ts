import crypto from "crypto";

const getExpiryDateAdd3Years = () => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = String(now.getFullYear() + 3).slice(-2);
  return `${month}/${year}`;
};

const luhnChecksum = (cardNumber: string) => {
  const digits = cardNumber.split("").map(Number);
  let sum = 0;
  let shouldDouble = false;

  // Iterate over the digits in reverse order
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = digits[i];

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10;
};

const generateCVV = (): string => {
  return String(Math.floor(Math.random() * 900) + 100);
};

const generateddress = () => {
  const streetNumbers = Array.from({ length: 100 }, (_, i) => i + 1);
  const streetNames = ["Main St", "Oak Ave", "Pine Ln", "Maple Dr", "Cedar Rd"];
  const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"];
  const states = ["NY", "CA", "IL", "TX", "AZ"];
  const zipCodes = Array.from({ length: 1000 }, () =>
    String(Math.floor(Math.random() * 90000) + 10000)
  );

  const randomElement = (array: (number | string)[]) =>
    array[Math.floor(Math.random() * array.length)];

  const streetNumber = randomElement(streetNumbers);
  const streetName = randomElement(streetNames);
  const city = randomElement(cities);
  const state = randomElement(states);
  const zipCode = randomElement(zipCodes) as string;

  return {
    billing_address: `${streetNumber} ${streetName}, ${city}, ${state}`,
    zip_code: zipCode,
  };
};

type GenerateCardType = {
  card_number: string;
  cvv: string;
  expiry_date: string;
  billing_address: string;
  zip_code: string;
};

export const generateCard = (): GenerateCardType => {
  // Generate the first 15 digits randomly
  let cardNumber = "";
  for (let i = 0; i < 15; i++) {
    cardNumber += Math.floor(Math.random() * 10);
  }

  // Calculate the checksum digit (16th digit)
  const checksum = luhnChecksum(cardNumber);
  const lastDigit = (10 - checksum) % 10;

  // Append the last digit to complete the 16-digit number
  cardNumber += lastDigit;

  const cvv = generateCVV();
  const expiry_date = getExpiryDateAdd3Years();
  const { billing_address, zip_code } = generateddress();

  return {
    card_number: cardNumber,
    cvv,
    expiry_date,
    billing_address,
    zip_code,
  };
};

export class PaymentEncryptionService {
  private readonly key: Buffer;

  constructor(secretKey: string) {
    if (secretKey.length !== 64) {
      throw new Error("Secret key must be 32 bytes in hex (64 characters)");
    }
    this.key = Buffer.from(secretKey, "hex");
  }

  // --- CARD HANDLING ---

  encryptCardNumber(cardNumber: string): string {
    if (!/^\d{16}$/.test(cardNumber)) {
      throw new Error("Card number must be 16 digits");
    }

    const last4 = cardNumber.slice(-4);
    const toEncrypt = cardNumber.slice(0, 12);

    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv("aes-256-gcm", this.key, iv);

    const encrypted = Buffer.concat([
      cipher.update(toEncrypt, "utf8"),
      cipher.final(),
    ]);

    const authTag = cipher.getAuthTag();
    const payload = Buffer.concat([iv, authTag, encrypted]).toString("base64");

    return `${payload}:${last4}`; // single string
  }

  decryptCardNumber(data: string): string {
    const [payload, last4] = data.split(":");
    if (!payload || !last4 || last4.length !== 4) {
      throw new Error("Invalid encrypted card format");
    }

    const buffer = Buffer.from(payload, "base64");
    const iv = buffer.subarray(0, 12);
    const authTag = buffer.subarray(12, 28);
    const encrypted = buffer.subarray(28);

    const decipher = crypto.createDecipheriv("aes-256-gcm", this.key, iv);
    decipher.setAuthTag(authTag);

    const decrypted = Buffer.concat([
      decipher.update(encrypted),
      decipher.final(),
    ]);

    return decrypted.toString("utf8") + last4;
  }

  // --- CVV HANDLING ---

  encryptCVV(cvv: string): string {
    if (!/^\d{3,4}$/.test(cvv)) {
      throw new Error("CVV must be 3 or 4 digits");
    }

    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv("aes-256-gcm", this.key, iv);

    const encrypted = Buffer.concat([
      cipher.update(cvv, "utf8"),
      cipher.final(),
    ]);

    const authTag = cipher.getAuthTag();
    const payload = Buffer.concat([iv, authTag, encrypted]).toString("base64");

    return payload;
  }

  decryptCVV(data: string): string {
    const buffer = Buffer.from(data, "base64");
    const iv = buffer.subarray(0, 12);
    const authTag = buffer.subarray(12, 28);
    const encrypted = buffer.subarray(28);

    const decipher = crypto.createDecipheriv("aes-256-gcm", this.key, iv);
    decipher.setAuthTag(authTag);

    const decrypted = Buffer.concat([
      decipher.update(encrypted),
      decipher.final(),
    ]);

    return decrypted.toString("utf8");
  }
}

export const cardService = new PaymentEncryptionService(
  process.env.NEXT_PUBLIC_TOKENIZATION_KEY!
);
