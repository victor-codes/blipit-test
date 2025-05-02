import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";

export const NoCards = () => {
  return (
    <div className="flex flex-col justify-center space-y-6 flex-1 pb-6">
      <div className="grid gap-y-2 text-center">
        <h2 className="text-xl font-medium">Create a virtual card</h2>
        <p className="text-accent-foreground">Shop anywhere across the globe</p>
      </div>
      <div className="flex items-center justify-center">
        <Button size="lg">
          <Plus className="mr-2 h-4 w-4" />
          Create Card
        </Button>
      </div>
    </div>
  );
};
