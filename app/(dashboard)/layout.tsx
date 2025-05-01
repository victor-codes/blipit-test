import DashboardContent from "@/components/sections/dashboard-layout";
import { WalletsProvider } from "@/contexts/wallets-context";

import type React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

function DashboardLayout({ children }: LayoutProps) {
  return (
    <DashboardContent>
      <WalletsProvider>{children}</WalletsProvider>
    </DashboardContent>
  );
}

export default DashboardLayout;
