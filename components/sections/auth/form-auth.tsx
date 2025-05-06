import { Button } from "@/components/ui/button";
import {
  Form,
  FormAction,
  FormColumn,
  FormDesc,
  FormErrorText,
  FormHeader,
  FormWrapper,
} from "@/components/ui/form-blocks";
import { Input } from "@/components/ui/input";
import { PhoneNumber } from "@/components/ui/phone-number";
import { AUTH_FLOW, AUTH_STEP } from "@/lib/contants";
import { siteConfig } from "@/lib/meta";
import { createUser, signInUser } from "@/services/auth";
import { FormAuthProps, FormDataValues } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { XIcon } from "lucide-react";
import { LayoutGroup, motion } from "motion/react";
import { useCallback, useState } from "react";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { toast } from "sonner";

export const FormAuth = ({
  isExistingUser,
  setIsExistingUser,
  setFlow,
}: FormAuthProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isDirty, isValid },
  } = useFormContext<FormDataValues>();
  const [step, setStep] = useState<AUTH_STEP>(AUTH_STEP.EMAIL);

  const { mutate: createUserFn, isPending } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      if (step === AUTH_STEP.EMAIL) {
        setFlow(AUTH_FLOW.OTP);
        return;
      }
      setFlow(AUTH_FLOW.OTP);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: signInFn, isPending: isSignInPending } = useMutation({
    mutationFn: signInUser,

    onSuccess: () => {
      if (step === AUTH_STEP.EMAIL) {
        setFlow(AUTH_FLOW.OTP);
        return;
      }
      setFlow(AUTH_FLOW.OTP);
    },
    onError: (error) => {
      setIsExistingUser(!error);
      setStep(!error ? AUTH_STEP.EMAIL : AUTH_STEP.DETAILS);
    },
  });

  const onSubmit: SubmitHandler<FormDataValues> = (data) => {
    if (isExistingUser !== false) {
      signInFn({
        email: data.email,
      });
    } else {
      createUserFn({
        email: data.email,
        phone_number: data.phone,
      });
    }
  };

  const resetFields = () => {
    reset({
      email: "",
      phone: "",
    });

    setIsExistingUser(null);
    setStep(AUTH_STEP.EMAIL);
  };

  const onPhoneChange = (value: string) => {
    setValue("phone", value, {
      shouldValidate: true,
    });
  };

  const btnText = useCallback(() => {
    if (typeof isExistingUser === "object") return "Continue";
    if (typeof isExistingUser === "boolean" && isExistingUser) return "Login";
    return "Sign up";
  }, [isExistingUser]);

  return (
    <div className="min-h-[100dvh] flex flex-col p-4 pt-5 pb-10 md:py-32 md:items-center bg-background">
      <div className="w-full max-w-md mx-auto flex-1">
        <FormWrapper>
          <FormHeader>
            <h2 className="mt-10 text-xl md:text-3xl font-medium tracking-tight text-secondary-foreground">
              Welcome to {siteConfig.title}
            </h2>
            <FormDesc>Log in or sign up to get started.</FormDesc>
          </FormHeader>
          <LayoutGroup>
            <MotionForm layout onSubmit={handleSubmit(onSubmit)} noValidate>
              <motion.div layout="position" className="relative">
                <Input
                  {...register("email", { required: true })}
                  type="email"
                  autoFocus
                  placeholder="Email address"
                  autoComplete="off"
                  className="text-base md:text-lg"
                />
                <div className="absolute right-1 top-1/2 transform -translate-y-1/2">
                  {isExistingUser !== null && (
                    <button className="p-2" onClick={resetFields}>
                      <XIcon className="w-5 h-5 " />
                    </button>
                  )}
                </div>
              </motion.div>

              {step === AUTH_STEP.DETAILS && (
                <FormColumn>
                  <motion.div
                    initial={{ y: -28, scale: 0.8, opacity: 0 }}
                    animate={{ y: 0, scale: 1, opacity: 1 }}
                    layout="position"
                    className="relative origin-center"
                    transition={SPRING}
                  >
                    <PhoneNumber onChange={onPhoneChange} />
                  </motion.div>
                  {errors.phone?.message && (
                    <FormErrorText>{errors.phone?.message}</FormErrorText>
                  )}
                </FormColumn>
              )}
              <FormAction>
                <motion.div
                  layout
                  transition={SPRING}
                  className="h-14 w-full relative z-10"
                >
                  <Button
                    disabled={
                      isPending || isSignInPending || !isDirty || !isValid
                    }
                    isLoading={isPending || isSignInPending}
                    type="submit"
                    className="w-full"
                  >
                    {btnText()}
                  </Button>
                </motion.div>

                {!isExistingUser && step === AUTH_STEP.DETAILS && (
                  <motion.div
                    layout
                    animate={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={SPRING}
                  >
                    <p className="relative z-[1] text-center text-sm text-accent-foreground animate-in">
                      By continuing, you agree to the Terms and Privacy Policy.
                    </p>
                  </motion.div>
                )}
              </FormAction>
            </MotionForm>
          </LayoutGroup>
        </FormWrapper>
      </div>
    </div>
  );
};

const MotionForm = motion.create(Form);

const SPRING = {
  type: "spring",
  stiffness: 400,
  damping: 40,
};
