import DashboardContent from "@/components/sections/dashboard-layout";

import type React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

function DashboardLayout({ children }: LayoutProps) {
  return <DashboardContent>{children}</DashboardContent>;
}

export default DashboardLayout;
