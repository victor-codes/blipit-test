"use client";
import { useDashboard } from "@/contexts/dashboard-context";
import { CARDS_SECTION } from "@/lib/contants";
import { NoCards } from "./no-cards";
import { ViewCard } from "./view-card";

type CardsOverViewProps = {
  updateSection: (section: CARDS_SECTION) => void;
};

export const CardsOverView = ({ updateSection }: CardsOverViewProps) => {
  const { user } = useDashboard();

  return user?.card_id ? (
    <ViewCard {...{ updateSection }} />
  ) : (
    <NoCards {...{ updateSection }} />
  );
};
