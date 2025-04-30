"use client";

import type React from "react";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormAction,
  FormColumn,
  FormDesc,
  FormHeader,
  FormTitle,
  FormWrapper,
} from "@/components/ui/form-blocks";
import { Goback } from "@/components/ui/go-back";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NumberInput } from "@/components/ui/number-input";
import { useToast } from "@/hooks/use-toast";

export default function FundCardWallet() {
  const router = useRouter();
  const { toast } = useToast();
  const [amount, setAmount] = useState("");

  // Main wallet balance (this would come from your backend)
  const mainBalance = 1250.0;

  // Generate a reference number
  const reference = `TRF-${new Date()
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, "")}-XYZ`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Process transfer (this would connect to your backend)
    toast({
      title: "Card funded!",
      description: `-$${amount} / +$${amount} on card`,
    });

    // Navigate back to dashboard
    router.push("/dashboard");
  };

  return (
    <>
      <Goback />

      <FormWrapper>
        <FormHeader>
          <FormTitle>Fund Your Card Wallet</FormTitle>
          <FormDesc>From Main Wallet (${mainBalance.toFixed(2)})</FormDesc>
        </FormHeader>

        <Form onSubmit={handleSubmit}>
          <FormColumn>
            <Label htmlFor="amount">Amount</Label>
            <NumberInput
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </FormColumn>

          <FormColumn>
            <Label htmlFor="reference">Reference</Label>
            <Input id="reference" value={reference} readOnly />
          </FormColumn>

          <FormAction>
            <Button type="submit" className="w-full">
              Transfer Funds
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
          </FormAction>
        </Form>
      </FormWrapper>
    </>
  );
}
