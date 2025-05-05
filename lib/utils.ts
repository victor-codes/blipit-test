import { StatusType } from "@blnkfinance/blnk-typescript/dist/src/types/transactions";
import { clsx, type ClassValue } from "clsx";
import { Activity, CreditCard, Home, Settings } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { APP_CURRENCY } from "./contants";
// import { formatPhoneNumberIntl } from "react-phone-number-input";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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

export const generateReference = (type: "dep" | "wdr" | "trf") =>
  `${type}-${crypto.randomUUID()}`;

export const NAVIGATION_LIST = [
  { icon: Home, label: "Home", href: "/" },
  { icon: CreditCard, label: "Cards", href: "/cards" },
  { icon: Activity, label: "Transactions", href: "/transactions" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export const StatusColorMap: Record<StatusType, string> = {
  QUEUED: "bg-yellow-100 text-yellow-600",
  APPLIED: "bg-green-100 text-green-600",
  REJECTED: "bg-red-100 text-red-600",
  COMMIT: "bg-blue-100 text-blue-600",
  VOID: "bg-gray-100 text-gray-600",
  INFLIGHT: "bg-orange-100 text-orange-600",
  EXPIRED: "bg-purple-100 text-purple-600",
};

export const StatusTextMap: Record<StatusType, string> = {
  QUEUED: "Pending",
  APPLIED: "Completed",
  REJECTED: "Failed",
  COMMIT: "Commit",
  VOID: "Void",
  INFLIGHT: "In Flight",
  EXPIRED: "Expired",
};

export const zeroPad = (value: number) => {
  return value < 10 ? `0${value}` : `${value}`;
};
