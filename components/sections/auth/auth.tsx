"use client";
import { AUTH_FLOW } from "@/lib/contants";

import {
  existingUserSchema,
  newUserSchema,
} from "@/lib/validation-schema/client";
import { FormDataValues } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormAuth } from "./form-auth";
import { OTPAuth } from "./otp-auth";

export default function AuthPage() {
  const [flow, setFlow] = useState<AUTH_FLOW>(AUTH_FLOW.FORM);
  const [isExistingUser, setIsExistingUser] = useState<boolean | null>(null);

  const methods = useForm<FormDataValues>({
    resolver: zodResolver(
      isExistingUser !== false ? existingUserSchema : newUserSchema
    ),
    defaultValues: {
      // email: "ayodejiv5@gmail.com",
    },
    mode: "onChange",
  });

  const isFormFlow = flow === AUTH_FLOW.FORM;

  const back = () => {
    setFlow(AUTH_FLOW.FORM);
  };
  return (
    <FormProvider {...methods}>
      {isFormFlow ? (
        <FormAuth
          {...{
            isExistingUser,
            setIsExistingUser,
            setFlow,
          }}
        />
      ) : (
        <OTPAuth {...{ back }} />
      )}
    </FormProvider>
  );
}
