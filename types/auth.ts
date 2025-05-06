import { Database } from "@/database.types";
import { AUTH_FLOW } from "@/lib/contants";

export type FormDataValues = {
  email: string;
  phone: string;
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
  // errors: FieldErrors<FormDataValues>;
  isExistingUser: boolean | null;
  // isDisabled: boolean;
  // register: UseFormRegister<FormDataValues>;
  setIsExistingUser: React.Dispatch<React.SetStateAction<boolean | null>>;
  setFlow: React.Dispatch<React.SetStateAction<AUTH_FLOW>>;
  // reset: UseFormReset<FormDataValues>;
  // handleSubmit: UseFormHandleSubmit<FormDataValues>;
  // setValue: UseFormSetValue<FormDataValues>;
};

export type OTPAuthProps = {
  // watchEmail: string;
  isExistingUser: boolean | null;
  back: () => void;
};

export type IUser = Database["public"]["Tables"]["profiles"]["Row"];
