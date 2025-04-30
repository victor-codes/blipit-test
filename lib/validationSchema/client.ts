import { FormDataValues, UpdateUserFormDataValues } from "@/types/auth";
import { ZodType, z } from "zod";

export const newUserSchema: ZodType<FormDataValues> = z.object({
  email: z.string().email(),
  phone: z.string().min(10, "Phone number is required"),
  // name: z.string().min(1, "Full name is required"),
  country_code: z.string().readonly(),
});

export const updateUserSchema: ZodType<UpdateUserFormDataValues> = z.object({
  // email: z.string().email(),
  // phone: z.string().min(10, "Phone number is required"),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
});

export const existingUserSchema: ZodType<Pick<FormDataValues, "email">> =
  z.object({
    email: z.string().email(),
  });

// export const existingUserSchema: ZodType<FormDataValues> = z.object({
//   email: z.string().email(),
//   phone: z.string().optional(),
// name: z.string().optional(),
//   country_code: z.string().optional(),
// });
