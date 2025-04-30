export type ATCreateUser = {
  email: string;
  phone_number: string;
  // full_name: string;
  country_code: string;
};

export type ATLoginUser = {
  email: string;
};

export type ATUpdateUser = {
  first_name: string;
  last_name: string;
};
