"use client";
import { AUTH_FLOW } from "@/lib/contants";
import {
  existingUserSchema,
  newUserSchema,
} from "@/lib/validationSchema/client";
import { FormDataValues } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormAuth } from "./form-auth";
import { OTPAuth } from "./otp-auth";

export default function AuthPage() {
  const [flow, setFlow] = useState<AUTH_FLOW>(AUTH_FLOW.FORM);
  const [isExistingUser, setIsExistingUser] = useState<boolean | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<FormDataValues>({
    resolver: zodResolver(
      isExistingUser !== false ? existingUserSchema : newUserSchema
    ),
    defaultValues: {
      country_code: "+234",
    },
  });

  const watchEmail = watch("email");
  const watchPhoneCode = watch("country_code");

  const isFormFlow = flow === AUTH_FLOW.FORM;

  const back = () => {
    setFlow(AUTH_FLOW.FORM);
  };
  return (
    <>
      {isFormFlow ? (
        <FormAuth
          {...{
            errors,
            register,
            isDisabled: isDirty || isValid,
            isExistingUser,
            setIsExistingUser,
            setFlow,
            watchEmail,
            reset,
            watchPhoneCode,
            handleSubmit,
            setValue,
          }}
        />
      ) : (
        <OTPAuth {...{ watchEmail, back }} />
      )}
    </>
  );
}
