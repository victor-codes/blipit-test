"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormAction,
  FormColumn,
  FormHeader,
  FormTitle,
  FormWrapper,
} from "@/components/ui/form-blocks";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NumberInput } from "@/components/ui/number-input";
import { useDashboard } from "@/contexts/dashboardContext";
import { AMOUNT_PRECISION } from "@/lib/contants";
import { generateReference } from "@/lib/utils";
import { depositSchema } from "@/lib/validationSchema/client";
import { depositToWallet } from "@/services/wallets";
import { DepositFormData } from "@/types/wallet";
import { toast } from "sonner";
import { useWallets } from "@/contexts/wallets-context";

export default function DepositFunds() {
  const router = useRouter();
  const { user } = useDashboard();
  const { refetchWallets } = useWallets();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, isDirty },
  } = useForm<DepositFormData>({
    resolver: zodResolver(depositSchema),
    mode: "onChange",
  });

  const { mutate: depositFunds, isPending } = useMutation({
    mutationFn: depositToWallet,
    onSuccess: () => {
      toast.success(`Cha ching deposit successful!🤑`);
      refetchWallets();
      router.push("/");
    },
    onError: (error) => {
      toast.error(`Deposit failed ${error.message}`);
    },
  });

  const onSubmit = (data: DepositFormData) => {
    const reference = generateReference("dep");

    const payload = {
      amount: data.amount,
      precision: AMOUNT_PRECISION,
      destination: user?.wallet_id!,
      reference: reference,
      description: data.description || "Deposit to wallet",
      source: "@WorldUSD",
      currency: "USD",
      allow_overdraft: true,
      meta_data: {
        transaction_type: "deposit",
        channel: "bank_transfer",
      },
    };
    depositFunds(payload);
  };

  return (
    <>
      <div>
        {/* <Goback /> */}

        <FormWrapper>
          <FormHeader>
            <FormTitle>Deposit to Main Wallet</FormTitle>
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
