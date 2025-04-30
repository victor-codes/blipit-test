import { AUTH_STEP, AUTH_FLOW } from "@/lib/utils";
import { User } from "@supabase/supabase-js";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormHandleSubmit,
  UseFormReset,
} from "react-hook-form";

export type FormDataValues = {
  email: string;
  phone: string;
  // name: string;
  country_code: string;
};

export type UpdateUserFormDataValues = {
  // phone: string;
  first_name: string;
  last_name: string;
};

export type FormAuthProps = {
  errors: FieldErrors<FormDataValues>;
  isExistingUser: boolean | null;
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

export type IUser = User;
