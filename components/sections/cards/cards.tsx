"use client";
import { useDashboard } from "@/contexts/dashboardContext";
import React from "react";
import { ViewCard } from "./view-card";
import { NoCards } from "./no-cards";

export const Cards = () => {
  const { user } = useDashboard();
  return user?.card_id ? <ViewCard /> : <NoCards />;
};
