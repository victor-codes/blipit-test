"use client";
import { Deposit } from "@/components/sections/dashboard/deposit";

import { Overview } from "@/components/sections/dashboard/overview";
import { Withdraw } from "@/components/sections/dashboard/withdraw";
import { DASHBOARD_SECTION } from "@/lib/contants";
import { useState } from "react";

function Dashboard() {
  const [section, setSection] = useState<DASHBOARD_SECTION>(
    DASHBOARD_SECTION.OVERVIEW
  );

  const updateSection = (section: DASHBOARD_SECTION) => {
    setSection(section);
  };

  const renderChildren = () => {
    switch (section) {
      case DASHBOARD_SECTION.DEPOSIT:
        return <Deposit {...{ updateSection }} />;

      case DASHBOARD_SECTION.WITHDRAW:
        return <Withdraw {...{ updateSection }} />;
      case DASHBOARD_SECTION.OVERVIEW:
      default:
        return <Overview {...{ updateSection }} />;
    }
  };
  return <>{renderChildren()}</>;
}

export default Dashboard;
