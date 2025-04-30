import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
