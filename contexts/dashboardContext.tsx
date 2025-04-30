"use client";
import { getUser } from "@/services/auth";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";

interface DashboardContextState {
  isInitializing: boolean;
  user: {
    first_name?: string;
    last_name?: string;
  } | null;
  updateState: (data: Partial<DashboardContextState>) => void;
}

const intitalState: DashboardContextState = {
  isInitializing: true,
  user: null,
  updateState: () => {},
};

export const DashboardContext =
  createContext<DashboardContextState>(intitalState);

export const DashboardContextProvider = (
  props: React.ComponentPropsWithoutRef<"div">
) => {
  const [state, setState] = useState<DashboardContextState>(intitalState);

  const { data: profileData, isLoading } = useQuery({
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
      });
    }
  }, [profileData, isLoading]);

  return (
    <DashboardContext.Provider value={{ ...state, updateState }}>
      {props.children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }

  return context;
};
