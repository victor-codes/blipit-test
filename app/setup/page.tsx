"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormAction,
  FormColumn,
  FormDesc,
  FormHeader,
  FormWrapper,
} from "@/components/ui/form-blocks";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDashboard } from "@/contexts/dashboardContext";
import { updateUserSchema } from "@/lib/validationSchema/client";
import { updateUser } from "@/services/auth";
import { UpdateUserFormDataValues } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const Page = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user } = useDashboard();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserFormDataValues>({
    resolver: zodResolver(updateUserSchema) as any,
  });

  const { mutate: updateUserFn, isPending } = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      router.replace("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit: SubmitHandler<UpdateUserFormDataValues> = (data) => {
    updateUserFn({
      last_name: data.last_name,
      first_name: data.first_name,
    });
  };

  return (
    <div className="min-h-[100dvh] flex flex-col p-4 pt-5 pb-10 md:py-32 md:items-center bg-background">
      <div className="w-full max-w-md mx-auto flex-1">
        <FormWrapper>
          <FormHeader
          // className="text-center"
          >
            <h2 className="text-xl md:text-3xl font-medium tracking-tight text-secondary-foreground">
              Account Setup
            </h2>
            <FormDesc>Please provide your personal information</FormDesc>
          </FormHeader>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormColumn>
              <Label htmlFor="firstName">First name</Label>
              <Input
                autoFocus
                id="firstName"
                placeholder="Enter your first name"
                {...register("first_name", { required: true })}
              />
            </FormColumn>
            <FormColumn>
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                placeholder="Enter your last name"
                {...register("last_name", { required: true })}
              />
            </FormColumn>

            <FormAction>
              <Button
                type="submit"
                className="w-full"
                disabled={isPending}
                isLoading={isPending}
              >
                Continue
              </Button>
            </FormAction>
          </Form>
        </FormWrapper>
      </div>
    </div>
  );
};

export default Page;
