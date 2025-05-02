import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { APP_CURRENCY } from "./contants";
import { Home, CreditCard, Activity, Settings } from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// auth
export enum AUTH_FLOW {
  FORM,
  OTP,
}

export enum AUTH_STEP {
  EMAIL,
  DETAILS,
}

export const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  timeZone: "UTC",
});

export const balanceFormatter = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: APP_CURRENCY,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatDate = (timestamp: number): string => {
  const date: Date = new Date(timestamp * 1000); // Convert seconds to milliseconds

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
};

export const generateReference = (type: "dep" | "wdr") =>
  `${type}-${crypto.randomUUID()}`;

export const maskedPhoneNumber = (phone: string) => {
  // Remove the country code for Nigeria: if phone starts with "+234", remove it and prepend a "0"
  if (phone.startsWith("+234")) {
    phone = "0" + phone.slice(4);
  }

  const masked = phone.replace(/\d(?=\d{2})/g, "•");

  const formatted = masked.replace(/(.{4})(.{3})(.+)/, "$1$2 $3");

  return formatted;
};

export const NAVIGATION_LIST = [
  { icon: Home, label: "Home", href: "/" },
  { icon: CreditCard, label: "Cards", href: "/cards" },
  { icon: Activity, label: "Activity", href: "/activity" },
  { icon: Settings, label: "Settings", href: "/settings" },
];
