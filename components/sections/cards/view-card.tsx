import { MastercardIcon } from "@/components/svgs/mastercard-icon";
import { Button } from "@/components/ui/button";
import { ArrowUpIcon, Info, Plus, Shield, Wallet } from "lucide-react";
import React from "react";

export const ViewCard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between flex-col gap-4 border/85 rounded-xl p-4 bg-black/85 text-card h-48">
        <div>
          <Shield />
        </div>
        <div>5596 **** **** **** 1234</div>
        <div className="flex justify-between items-center">
          <div className="flex items">
            <p className="text-sm leading-none mt-[1.5px]">$</p>
            <p className="text-2xl font-bold leading-none">
              19.
              <span className="text-sm font-normal leading-none">00</span>
            </p>
          </div>
          <div className="w-16">
            <MastercardIcon />
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <Button className="flex-1">
          <Info className="mr-2 h-4 w-4" />
          Details
        </Button>

        <Button variant="outline" className="flex-1">
          <Plus className="mr-2 h-4 w-4" />
          Add funds
        </Button>
        <Button variant="outline" className="flex-1">
          <Wallet className="mr-2 h-4 w-4" />
          Withdraw funds
        </Button>
      </div>
    </div>
  );
};
