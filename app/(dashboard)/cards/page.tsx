"use client";
import { CardsOverView } from "@/components/sections/cards/cards-overview";
import { CreateCard } from "@/components/sections/cards/create-card";
import { FundCard } from "@/components/sections/cards/fund-card";
import { WithdrawCard } from "@/components/sections/cards/widthdraw-card";
import { CARDS_SECTION } from "@/lib/contants";
import { useState } from "react";

const Page = () => {
  const [section, setSection] = useState<CARDS_SECTION>(CARDS_SECTION.OVERVIEW);

  const updateSection = (section: CARDS_SECTION) => {
    setSection(section);
  };

  const renderChildren = () => {
    switch (section) {
      case CARDS_SECTION.CREATE_CARD:
        return <CreateCard {...{ updateSection }} />;
      case CARDS_SECTION.WITHDRAW:
        return <WithdrawCard {...{ updateSection }} />;
      case CARDS_SECTION.FUND_CARD:
        return <FundCard {...{ updateSection }} />;
      case CARDS_SECTION.OVERVIEW:
      default:
        return <CardsOverView {...{ updateSection }} />;
    }
  };

  return <>{renderChildren()}</>;
};

export default Page;
