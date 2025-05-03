import DashboardContent from "@/components/sections/dashboard-layout";
import { WalletsProvider } from "@/contexts/wallets-context";

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
