"use client";
import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Goback } from "@/components/ui/go-back";
import {
  Form,
  FormAction,
  FormColumn,
  FormHeader,
  FormTitle,
  FormWrapper,
} from "@/components/ui/form-blocks";

export default function CreateCardWallet() {
  const router = useRouter();
  const [cardName, setCardName] = useState("");
  const [currency, setCurrency] = useState("USD");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create card wallet (this would connect to your backend)
    // Then navigate to fund card wallet
    router.push("/dashboard/fund-card-wallet");
  };

  return (
    <>
      <div>
        <Goback />

        <FormWrapper>
          <FormHeader>
            <FormTitle>Set Up a New Card Wallet</FormTitle>
          </FormHeader>

          <Form onSubmit={handleSubmit}>
            <FormColumn>
              <Label htmlFor="cardName">Card Name</Label>
              <Input
                id="cardName"
                placeholder="e.g. Vacation Card"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                required
              />
            </FormColumn>

            <FormColumn>
              <Label htmlFor="currency">Currency</Label>

              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger id="currency">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                  <SelectItem value="JPY">JPY</SelectItem>
                </SelectContent>
              </Select>
            </FormColumn>

            <FormAction>
              <Button type="submit" className="w-full">
                Create Wallet
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
