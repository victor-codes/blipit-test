import { UpdateUserFormDataValues } from "./auth";

export type ATCreateUser = {
  email: string;
  phone_number: string;
};

export type ATLoginUser = {
  email: string;
};

export type ATUpdateUser = UpdateUserFormDataValues;
