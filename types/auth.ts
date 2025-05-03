import { Database } from "@/database.types";
import { AUTH_FLOW } from "@/lib/contants";
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
} from "react-hook-form";

export type FormDataValues = {
  email: string;
  phone: string;
  country_code: string;
};

export type UpdateUserFormDataValues = {
  last_name: string;
  first_name: string;
  phone_number: string;
  date_of_birth: Date;
  nationality: string;
  gender: string;
  street: string;
  post_code: string;
  city: string;
  state: string;
  country: string;
};

export type FormAuthProps = {
  errors: FieldErrors<FormDataValues>;
  isExistingUser: boolean | null;
  isDisabled: boolean;
  register: UseFormRegister<FormDataValues>;
  setIsExistingUser: React.Dispatch<React.SetStateAction<boolean | null>>;
  setFlow: React.Dispatch<React.SetStateAction<AUTH_FLOW>>;
  reset: UseFormReset<FormDataValues>;
  watchPhoneCode: string;
  handleSubmit: UseFormHandleSubmit<FormDataValues>;
};

export type OTPAuthProps = {
  watchEmail: string;
  back: () => void;
};

export type IUser = Database["public"]["Tables"]["profiles"]["Row"];
