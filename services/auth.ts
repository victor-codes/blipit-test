import { ATCreateUser, ATLoginUser } from "@/types/actions";

export const createUser = async (payload: ATCreateUser) => {
  try {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    }

    throw new Error("Failed to create user");
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

    if (res.ok) {
      const data = await res.json();
      return data;
    }

    throw new Error("OTP code is invalid or expired!");
  } catch (error) {
    throw error;
  }
};

export const resendOTP = async (payload: any) => {
  try {
    const res = await fetch("/api/auth/signin/resend-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    }

    throw new Error("Error sending OTP, try again");
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
