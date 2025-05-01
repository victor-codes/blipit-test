"use client";
import { getMainBalance } from "@/services/wallets";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import { useDashboard } from "./dashboardContext";
import { MainWalletData } from "@/types/wallet";

interface WalletContextState {
  wallet: MainWalletData;
  fetchingWallets: boolean;
  errorOnWallets: boolean;
  refetchWallets: () => void;
}

const intitalState: WalletContextState = {
  wallet: {} as MainWalletData,
  fetchingWallets: true,
  errorOnWallets: false,
  refetchWallets: () => {},
};
const WalletsContext = createContext(intitalState);

export const WalletsProvider = (
  props: React.ComponentPropsWithoutRef<"div">
) => {
  const { user } = useDashboard();

  const {
    data: balance,
    isLoading: fetchingWallets,
    refetch: refetchWallets,
    isError: errorOnWallets,
  } = useQuery({
    queryKey: ["balance"],
    queryFn: () => getMainBalance(user?.wallet_id!),
    enabled: !!user?.wallet_id,
  });

  const value = {
    wallet: balance!,
    fetchingWallets,
    refetchWallets,
    errorOnWallets,
  };

  return <WalletsContext value={value}>{props.children}</WalletsContext>;
};

export const useWallets = () => {
  const context = useContext(WalletsContext);

  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }

  return context;
};
