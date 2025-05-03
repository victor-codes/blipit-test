"use client";
import { useDashboard } from "@/contexts/dashboard-context";
import { ViewCard } from "./view-card";
import { NoCards } from "./no-cards";
import { CARDS_SECTION } from "@/lib/contants";

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
