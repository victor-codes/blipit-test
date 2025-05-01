import { FormDataValues } from "@/types/auth";
import { ZodType, z } from "zod";

export const isAtLeastAge = (minAge: number) => {
  return (date: Date) => {
    if (!(date instanceof Date)) return false;

    const today = new Date();
    const birthDate = new Date(date);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age >= minAge;
  };
};

export const newUserSchema: ZodType<FormDataValues> = z.object({
  email: z.string().email(),
  phone: z.string().min(10, "Phone number is required"),
  country_code: z.string().readonly(),
});

export const updateUserSchema = z.object({
  first_name: z.string().min(2, "First name must be at least 2 characters"),
  last_name: z.string().min(2, "Last name must be at least 2 characters"),
  date_of_birth: z
    .date({
      required_error: "Date of birth is required",
      invalid_type_error: "Date of birth must be a valid date",
    })
    .refine((date) => date <= new Date(), {
      message: "Date of birth cannot be in the future",
    })
    .refine(isAtLeastAge(18), {
      message: "You must be at least 18 years old",
    }),
  nationality: z.string().min(2, "Nationaliy must be at least 2 characters"),
  gender: z.string().min(2, "Gender is required"),
  street: z.string().min(1, "Street address is required"),
  post_code: z.string().min(1, "Post code is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State/Province is required"),
});

export const existingUserSchema: ZodType<Pick<FormDataValues, "email">> =
  z.object({
    email: z.string().email(),
  });

export const depositSchema = z.object({
  amount: z
    .number({ invalid_type_error: "Amount must be a number" })
    .min(0.01, "Amount must be greater than 0")
    .refine(
      (val) => /^\d+(\.\d{1,2})?$/.test(val.toString()),
      "Amount must have at most 2 decimal places"
    ),
  description: z.string().optional(),
});

export const withdrawSchema = (maxAmount: number) =>
  z.object({
    amount: z
      .number({ invalid_type_error: "Amount must be a number" })
      .min(0.01, "Amount must be greater than 0")
      .refine((val) => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
        message: "Amount must have at most 2 decimal places",
      })
      .refine((val) => maxAmount === null || val <= maxAmount, {
        message: `Amount must not exceed ${maxAmount}`,
      }),
  });
