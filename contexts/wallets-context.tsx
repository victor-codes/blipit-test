"use client";
import { getMainBalance } from "@/services/wallets";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import { useDashboard } from "./dashboard-context";
import { MainWalletData } from "@/types/wallet";

interface WalletContextState {
  wallet: MainWalletData;
  isFetchingWallet: boolean;
  errorOnWallet: boolean | null;
  card: {
    wallet: MainWalletData;
    isFetching: boolean;
    isError: boolean | null;
  };
}

const intitalState: WalletContextState = {
  wallet: {} as MainWalletData,
  isFetchingWallet: true,
  errorOnWallet: null,
  card: {
    wallet: {} as MainWalletData,
    isError: null,
    isFetching: true,
  },
};
const WalletsContext = createContext(intitalState);

export const WalletsProvider = (
  props: React.ComponentPropsWithoutRef<"div">
) => {
  const { user } = useDashboard();

  const {
    data: balance,
    isLoading: isFetchingWallet,
    isError: errorOnWallet,
  } = useQuery({
    queryKey: ["wallets"],
    queryFn: () => getMainBalance(user?.wallet_id!),
    enabled: !!user?.wallet_id,
  });

  const {
    data: cardBalance,
    isLoading: fetchingCard,
    isError: errorOnCard,
  } = useQuery({
    queryKey: ["card-wallet"],
    queryFn: () => getMainBalance(user?.card_id!),
    enabled: !!user?.card_id,
  });

  const value: WalletContextState = {
    wallet: balance!,
    isFetchingWallet,
    errorOnWallet,
    card: {
      wallet: cardBalance!,
      isFetching: fetchingCard,
      isError: errorOnCard,
    },
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
