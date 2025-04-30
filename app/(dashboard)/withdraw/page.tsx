"use client";

import type React from "react";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Goback } from "@/components/ui/go-back";

export default function WithdrawFunds() {
  const router = useRouter();
  const { toast } = useToast();
  const [amount, setAmount] = useState("");
  const [destination, setDestination] = useState("existing");

  // Generate a reference number
  const reference = `WDR-${new Date()
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, "")}-XYZ`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Process withdrawal (this would connect to your backend)
    toast({
      title: "Withdrawal initiated!",
      description: `-$${amount}`,
    });

    // Navigate back to dashboard
    router.push("/dashboard");
  };

  return (
    <>
      <div>
        <Goback />
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-medium">Withdraw</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2">
                    $
                  </span>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    className="pl-8"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="destination">Destination</Label>
                <Select value={destination} onValueChange={setDestination}>
                  <SelectTrigger id="destination">
                    <SelectValue placeholder="Select destination" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="existing">
                      My Bank Account (****1234)
                    </SelectItem>
                    <SelectItem value="new">Add New Bank Account</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reference">Reference</Label>
                <Input id="reference" value={reference} readOnly />
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <Button type="submit" className="w-full">
                Confirm Withdrawal
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
