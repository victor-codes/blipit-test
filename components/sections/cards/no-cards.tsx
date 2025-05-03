import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page";
import { CARDS_SECTION } from "@/lib/contants";
import { Plus } from "lucide-react";
import React from "react";

type NoCardsProps = {
  updateSection: (section: CARDS_SECTION) => void;
};

export const NoCards = ({ updateSection }: NoCardsProps) => {
  const initCreateCard = () => {
    updateSection(CARDS_SECTION.CREATE_CARD);
  };

  return (
    <>
      <PageHeader>Card</PageHeader>
      <div className="flex flex-col justify-center space-y-6 h-full flex-1 pb-6">
        <div className="grid gap-y-2 text-center">
          <h2 className="text-xl font-medium">Create a virtual card</h2>
          <p className="text-accent-foreground">
            Shop anywhere across the globe
          </p>
        </div>
        <div className="flex items-center justify-center">
          <Button size="lg" onClick={initCreateCard}>
            <Plus className="mr-2 h-4 w-4" />
            Create Card
          </Button>
        </div>
      </div>
    </>
  );
};
