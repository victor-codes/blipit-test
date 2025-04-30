import { z } from "zod";

export const ServerUserSchema = z.object({
  email: z.string().email(),
  // full_name: z.string().min(2).max(100).trim(),
  phone_number: z
    .string()
    .min(7)
    .max(15)
    .regex(/^\d+$/, "Invalid phone number"),
  country_code: z
    .string()
    .min(1)
    .max(5)
    .regex(/^\+\d+$/, "Invalid country code"),
});

export const ServerLoginSchema = z.object({
  email: z.string().email("Invalid email"),
});

export const ServerOTPSchema = z.object({
  otp_code: z.string().min(6).max(6).regex(/^\d+$/, "Invalid OTP code"),
  email: z.string().email("Invalid email"),
});

export const ServerCheckUserSchema = z.object({
  email: z.string().email("Invalid email"),
});
