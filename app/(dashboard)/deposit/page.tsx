"use client";

import type React from "react";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormAction,
  FormColumn,
  FormHeader,
  FormTitle,
  FormWrapper,
} from "@/components/ui/form-blocks";
import { Goback } from "@/components/ui/go-back";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NumberInput } from "@/components/ui/number-input";
import { useToast } from "@/hooks/use-toast";

export default function DepositFunds() {
  const router = useRouter();
  const { toast } = useToast();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  // Generate a reference number
  const reference = `DEP-${new Date()
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, "")}-XYZ`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Process deposit (this would connect to your backend)
    toast({
      title: "Deposit successful!",
      description: `+$${amount}`,
    });

    // Navigate back to dashboard
    router.push("/dashboard");
  };

  return (
    <>
      <div>
        <Goback />

        <FormWrapper>
          <FormHeader>
            <FormTitle>
              Deposit
              {/* to Main Wallet */}
            </FormTitle>
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

            <FormColumn>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Salary, gift, etc."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormColumn>

            <FormAction>
              <Button type="submit" className="w-full">
                Confirm Deposit
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
      </div>
    </>
  );
}
