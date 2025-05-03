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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NumberInput } from "@/components/ui/number-input";
import { useDashboard } from "@/contexts/dashboard-context";
import { useWallets } from "@/contexts/wallets-context";
import {
  AMOUNT_PRECISION,
  APP_CURRENCY,
  DASHBOARD_SECTION,
} from "@/lib/contants";
import { balanceFormatter, generateReference } from "@/lib/utils";
import { withdrawSchema } from "@/lib/validationSchema/client";
import { withdrawToWallet } from "@/services/wallets";
import { DepositFormData } from "@/types/wallet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

type WithdrawProps = {
  updateSection: (section: DASHBOARD_SECTION) => void;
};

export const Withdraw = ({ updateSection }: WithdrawProps) => {
  const { user } = useDashboard();
  const { wallet } = useWallets();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, isDirty },
  } = useForm<DepositFormData>({
    resolver: zodResolver(withdrawSchema(wallet?.balance! / AMOUNT_PRECISION)),
  });

  const goBack = () => updateSection(DASHBOARD_SECTION.OVERVIEW);

  const { mutate: withdraw, isPending } = useMutation({
    mutationFn: withdrawToWallet,
    onSuccess: () => {
      toast.success(`Withdrawal successful!`);
      ["recent-transactions", "transactions", "wallets"].forEach((key) =>
        queryClient.invalidateQueries({ queryKey: [key] })
      );
      goBack();
    },
    onError: (error) => {
      toast.error(`Deposit failed ${error.message}`);
    },
  });

  const onSubmit = (data: DepositFormData) => {
    const reference = generateReference("wdr");

    const payload = {
      amount: data.amount,
      precision: AMOUNT_PRECISION,
      reference: reference,
      description: data.description || "Withdrawal from wallet",
      source: user?.wallet_id!,
      destination: "@WorldUSD",
      currency: APP_CURRENCY,
      meta_data: {
        transaction_type: "withdrawal",
        channel: "bank_transfer",
      },
    };
    withdraw(payload);
  };

  return (
    <>
      <div>
        {/* <Goback /> */}
        <FormWrapper className="space-y-8">
          <FormHeader>
            <FormTitle>Withdraw</FormTitle>
            <FormDesc>
              Your wallet balance is{" "}
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

            {/* <FormColumn>
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
            </FormColumn> */}

            <FormColumn>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Salary, gift, etc."
                {...register("description")}
                aria-invalid={errors.description ? "true" : "false"}
              />
            </FormColumn>

            <FormAction>
              <Button
                type="submit"
                className="w-full"
                isLoading={isPending}
                disabled={!isValid || !isDirty || isPending}
              >
                Confirm Withdrawal
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
      </div>
    </>
  );
};
