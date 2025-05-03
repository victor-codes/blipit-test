"use client";

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
import { Label } from "@/components/ui/label";
import { NumberInput } from "@/components/ui/number-input";

import { useDashboard } from "@/contexts/dashboard-context";
import { useWallets } from "@/contexts/wallets-context";
import { AMOUNT_PRECISION, APP_CURRENCY, CARDS_SECTION } from "@/lib/contants";
import { balanceFormatter, generateReference } from "@/lib/utils";
import { withdrawSchema } from "@/lib/validation-schema/client";
import { withdrawToWallet } from "@/services/wallets";
import { DepositFormData } from "@/types/wallet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

type FundCardProps = {
  updateSection: (section: CARDS_SECTION) => void;
};

export const FundCard = ({ updateSection }: FundCardProps) => {
  const { user } = useDashboard();
  const queryClient = useQueryClient();
  const { wallet } = useWallets();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isDirty },
  } = useForm<DepositFormData>({
    resolver: zodResolver(withdrawSchema(wallet?.balance! / AMOUNT_PRECISION)),
  });

  const { mutate: withToCardFn, isPending } = useMutation({
    mutationFn: withdrawToWallet,
    onSuccess: () => {
      toast.success(`Card deposit successful!🤑`);
      ["card-wallet", "wallets", "recent-transactions", "transactions"].forEach(
        (key) => queryClient.invalidateQueries({ queryKey: [key] })
      );
      goBack();
    },
    onError: () => {
      toast.error(`Deposit failed`);
    },
  });

  const onSubmit = (data: DepositFormData) => {
    const reference = generateReference("trf");

    const payload = {
      amount: data.amount,
      precision: AMOUNT_PRECISION,
      reference: reference,
      description: "Fund to card",
      destination: user?.card_id!,
      source: user?.wallet_id!,
      currency: APP_CURRENCY,
      meta_data: {
        transaction_type: "internal_transfer",
        purpose: "fund_card",
      },
    };

    withToCardFn(payload);
  };

  const goBack = () => updateSection(CARDS_SECTION.OVERVIEW);

  return (
    <>
      <FormWrapper>
        <FormHeader>
          <FormTitle>Fund Your Card Wallet</FormTitle>
          <FormDesc>
            From Main Wallet{" "}
            {balanceFormatter(wallet?.balance! / AMOUNT_PRECISION || 0)}
          </FormDesc>
        </FormHeader>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormColumn>
            <Label htmlFor="amount">Amount</Label>
            <Controller
              name="amount"
              control={control}
              rules={{
                required: "Amount is required",
                validate: (val) => val > 0 || "Amount must be greater than 0",
              }}
              render={({ field }) => (
                <NumberInput
                  value={field.value}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/,/g, "");
                    const parsed = parseFloat(raw);
                    field.onChange(isNaN(parsed) ? 0 : parsed);
                  }}
                  aria-invalid={errors.amount ? "true" : "false"}
                />
              )}
            />
            {errors.amount && (
              <p className="text-sm text-destructive mt-1">
                {errors.amount.message}
              </p>
            )}
          </FormColumn>

          <FormAction>
            <Button
              type="submit"
              isLoading={isPending}
              disabled={!isValid || !isDirty || isPending}
              className="w-full"
            >
              Fund card
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={goBack}
            >
              Cancel
            </Button>
          </FormAction>
        </Form>
      </FormWrapper>
    </>
  );
};
