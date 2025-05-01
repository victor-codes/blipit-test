import { UpdateUserFormDataValues } from "./auth";

export type ATCreateUser = {
  email: string;
  phone_number: string;
  country_code: string;
};

export type ATLoginUser = {
  email: string;
};

export type ATUpdateUser = UpdateUserFormDataValues;
