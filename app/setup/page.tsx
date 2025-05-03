"use client";
import { hasSetup } from "@/components/hoc/has-setup";
import { SetupSection } from "@/components/sections/setup";
import { Button } from "@/components/ui/button";
import { CountryPicker } from "@/components/ui/country-picker";
import { DateOfBirth } from "@/components/ui/date-of-birth";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDashboard } from "@/contexts/dashboard-context";
import { updateUserSchema } from "@/lib/validation-schema/client";
import { updateUser } from "@/services/user";
import { UpdateUserFormDataValues } from "@/types/auth";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const Page = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user } = useDashboard();

  const [country, setCountry] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid, isDirty },
  } = useForm<UpdateUserFormDataValues>({
    resolver: zodResolver(updateUserSchema) as any,
    mode: "onChange",
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
      date_of_birth: data.date_of_birth,
      phone_number: user?.phone_number!,
      nationality: data.nationality,
      gender: data.gender,
      street: data.street,
      post_code: data.post_code,
      city: data.city,
      state: data.state,
      country,
    });
  };

  const [watchedNationality, watchGender] = watch(["nationality", "gender"]);
  const handleDateChange = (date: Date | null) => {
    if (date) {
      setValue("date_of_birth", date, { shouldValidate: true });
    }
  };

  const handleNationalityChange = (nationality: string, country: string) => {
    if (nationality && country) {
      setValue("nationality", nationality, { shouldValidate: true });
      setCountry(country);
    }
  };

  const handleGenderChange = (value: string) => {
    if (value) {
      setValue("gender", value, { shouldValidate: true });
    }
  };

  return (
    <div className="min-h-[100dvh] flex flex-col p-4 pt-5 pb-10 md:py-32 md:items-center bg-background">
      <div className="w-full max-w-md mx-auto flex-1">
        <FormWrapper>
          <FormHeader>
            <h2 className="text-xl md:text-3xl font-medium tracking-tight text-secondary-foreground">
              Account Setup
            </h2>
            <FormDesc>Please provide your personal information</FormDesc>
          </FormHeader>
          <Form onSubmit={handleSubmit(onSubmit)} className="grid gap-y-8">
            <SetupSection title="Personal Information">
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

              <Select onValueChange={handleGenderChange} value={watchGender}>
                <SelectTrigger>
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>

              <FormColumn>
                <DateOfBirth
                  onChange={handleDateChange}
                  minYear={1900}
                  maxYear={2023}
                  label="Date of birth"
                />
                {errors.date_of_birth && (
                  <p className="text-sm text-destructive">
                    {errors.date_of_birth.message}
                  </p>
                )}
              </FormColumn>
            </SetupSection>

            <SetupSection title="Address Information">
              <FormColumn>
                <Label htmlFor="street">Street Address</Label>
                <Input
                  id="street"
                  placeholder="Enter your street address"
                  {...register("street", { required: true })}
                />
                {errors.street && (
                  <p className="text-sm text-destructive">
                    {errors.street.message}
                  </p>
                )}
              </FormColumn>

              <FormColumn>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder="Enter your city"
                  {...register("city", { required: true })}
                />
                {errors.city && (
                  <p className="text-sm text-destructive">
                    {errors.city.message}
                  </p>
                )}
              </FormColumn>

              <FormColumn>
                <Label htmlFor="state">State/Province</Label>
                <Input
                  id="state"
                  placeholder="Enter your state or province"
                  {...register("state", { required: true })}
                />
                {errors.state && (
                  <p className="text-sm text-destructive">
                    {errors.state.message}
                  </p>
                )}
              </FormColumn>

              <FormColumn>
                <Label htmlFor="postCode">Post Code</Label>
                <Input
                  id="postCode"
                  placeholder="Enter your post code"
                  {...register("post_code", { required: true })}
                />
                {errors.post_code && (
                  <p className="text-sm text-destructive">
                    {errors.post_code.message}
                  </p>
                )}
              </FormColumn>

              <CountryPicker
                value={watchedNationality}
                onChange={handleNationalityChange}
              />
            </SetupSection>

            <FormAction>
              <Button
                type="submit"
                className="w-full"
                disabled={!isValid || !isDirty || isPending}
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

export default hasSetup(Page);
