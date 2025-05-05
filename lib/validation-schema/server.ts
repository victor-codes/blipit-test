import { z } from "zod";
import { isAtLeastAge } from "./common";
import { isValidPhoneNumber } from "libphonenumber-js";

export const ServerUserSchema = z.object({
  email: z.string().email(),
  phone_number: z.string().refine((value) => isValidPhoneNumber(value), {
    message: "Invalid phone number",
  }),
});

export const ServerLoginSchema = z.object({
  email: z.string().email("Invalid email"),
});

export const ServerOTPSchema = z.object({
  otp_code: z.string().min(6).max(6).regex(/^\d+$/, "Invalid OTP code"),
  email: z.string().email("Invalid email"),
});

export const ServerUpdateUserSchema = z.object({
  first_name: z.string().min(2, "First name must be at least 2 characters"),
  last_name: z.string().min(2, "Last name must be at least 2 characters"),
  date_of_birth: z.coerce // Use coerce to handle string input like "1992-04-01T23:00:00.000Z"
    .date({
      required_error: "Date of birth is required",
      invalid_type_error: "Date of birth must be a valid date string", // Adjusted error message
    })
    .refine((date) => !isNaN(date.getTime()), {
      // Ensure the coerced date is valid
      message: "Invalid date format",
    })
    .refine((date) => date <= new Date(), {
      message: "Date of birth cannot be in the future",
    })
    .refine(isAtLeastAge(18), {
      message: "You must be at least 18 years old",
    }),
  phone_number: z
    .string()
    .min(8, "Phone number is too short") // e.g., +1234567
    .max(20, "Phone number is too long")
    .regex(
      /^\+\d+$/,
      "Invalid phone number format (must start with + and contain only digits)"
    ),
  nationality: z.string().min(2, "Nationality must be at least 2 characters"), // Corrected typo
  gender: z.string().min(2, "Gender is required"),
  street: z.string().min(1, "Street address is required"),
  post_code: z.string().min(1, "Post code is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State/Province is required"),
  country: z.string().min(2, "Country name must be at least 2 characters"),
});

export const ServerCardCreateSchema = z.object({
  identity_id: z.string().min(1, "Identity ID is required"),
  meta_data: z
    .object({
      nick_name: z.string().min(1, "Card nick name is required"),
    })
    .passthrough(),
});
