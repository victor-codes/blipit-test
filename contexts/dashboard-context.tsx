"use client";

import { getUser } from "@/services/user";
import { IUser } from "@/types/auth";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";

interface DashboardContextState {
  isInitializing: boolean;
  user: IUser | null;
  updateState: (data: Partial<DashboardContextState>) => void;
  error: Error | null;
}

const intitalState: DashboardContextState = {
  isInitializing: true,
  user: null,
  updateState: () => {},
  error: null,
};

export const DashboardContext =
  createContext<DashboardContextState>(intitalState);

export const DashboardContextProvider = (
  props: React.ComponentPropsWithoutRef<"div">
) => {
  const [state, setState] = useState<DashboardContextState>(intitalState);

  const {
    data: profileData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const updateState = (data: Partial<DashboardContextState>) => {
    setState((prev) => ({
      ...prev,
      ...data,
    }));
  };

  useEffect(() => {
    if (!isLoading && profileData) {
      updateState({
        isInitializing: isLoading,
        user: profileData,
        error,
      });
    }
  }, [profileData, isLoading]);

  return (
    <DashboardContext value={{ ...state, updateState }}>
      {props.children}
    </DashboardContext>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }

  return context;
};
