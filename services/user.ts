import { ATUpdateUser } from "@/types/actions";

export const updateUser = async (payload: ATUpdateUser) => {
  try {
    const res = await fetch("/api/user/setup", {
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
    const res = await fetch("/api/user", {
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
