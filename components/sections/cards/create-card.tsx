"use client";

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
import { useDashboard } from "@/contexts/dashboard-context";
import { CARDS_SECTION } from "@/lib/contants";
import { createCardSchema } from "@/lib/validation-schema/client";
import { createCard } from "@/services/wallets";
import { CreateDataFormData } from "@/types/wallet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type CreateCardProps = {
  updateSection: (section: CARDS_SECTION) => void;
};

export const CreateCard = ({ updateSection }: CreateCardProps) => {
  const { user, updateState } = useDashboard();

  const {
    register,
    handleSubmit,
    formState: { isValid, isDirty },
  } = useForm<CreateDataFormData>({
    resolver: zodResolver(createCardSchema),
    mode: "onChange",
  });

  const { mutate: createCardFn, isPending } = useMutation({
    mutationFn: createCard,
    onSuccess: (data) => {
      toast.success(`Card created sucessfully!`);
      updateState({
        user: data.user,
      });
      goBack();
    },
    onError: () => {
      toast.error(`Card creation failed`);
    },
  });

  const onSubmit = (data: CreateDataFormData) => {
    const payload = {
      identity_id: user?.identity_id!,
      meta_data: {
        nick_name: data.name,
      },
    };

    createCardFn(payload);
  };

  const goBack = () => updateSection(CARDS_SECTION.OVERVIEW);

  return (
    <>
      <FormWrapper>
        <FormHeader>
          <FormTitle>Set Up a New Card</FormTitle>
        </FormHeader>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormColumn>
            <Label htmlFor="cardName">Card Name</Label>
            <Input
              id="cardName"
              placeholder="e.g. Vacation Card"
              {...register("name")}
              required
            />
          </FormColumn>

          <FormAction>
            <Button
              type="submit"
              disabled={!isValid || !isDirty || isPending}
              isLoading={isPending}
              className="w-full"
            >
              Create Wallet
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
