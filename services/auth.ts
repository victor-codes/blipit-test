import { ATCreateUser, ATLoginUser, ATUpdateUser } from "@/types/actions";

export const createUser = async (payload: ATCreateUser) => {
  try {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const signInUser = async (payload: ATLoginUser) => {
  try {
    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    }

    throw "Failed to sign in";
  } catch (error) {
    throw error;
  }
};

export const confirmOTP = async (payload: any) => {
  try {
    const res = await fetch("/api/auth/signin/confirm-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    return data;
  } catch (error) {
    throw error;
  }
};

export const logOut = async () => {
  try {
    const res = await fetch("/api/auth/signout", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    return data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (payload: ATUpdateUser) => {
  try {
    const res = await fetch("/api/auth/setup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    return data;
  } catch (error) {
    throw error;
  }
};

export const getUser = async () => {
  try {
    const res = await fetch("/api/auth/user", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      const data = await res.json();
      return data.user;
    }

    throw new Error("Failed to fetch user");
  } catch (error) {
    throw error;
  }
};
