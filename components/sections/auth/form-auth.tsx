import { Button } from "@/components/ui/button";
import {
  Form,
  FormAction,
  FormDesc,
  FormHeader,
  FormWrapper,
} from "@/components/ui/form-blocks";
import { Input } from "@/components/ui/input";
import { siteConfig } from "@/lib/meta";
import { AUTH_FLOW, AUTH_STEP } from "@/lib/utils";
import { createUser, signInUser } from "@/services/auth";
import { FormAuthProps, FormDataValues } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { XIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { LayoutGroup, motion } from "motion/react";

export const FormAuth = ({
  errors,
  isExistingUser,
  setIsExistingUser,
  setFlow,
  reset,
  watchPhoneCode,
  register,
  handleSubmit,
}: FormAuthProps) => {
  const [step, setStep] = useState<AUTH_STEP>(AUTH_STEP.EMAIL);

  const { mutate: createUserFn, isPending } = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      // toast.success(data.message);
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

    onSuccess: (data) => {
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
        country_code: watchPhoneCode,
      });
    }
  };

  const resetFields = () => {
    reset({
      // email: "",
      phone: "",
      country_code: "+234",
    });

    setIsExistingUser(null);
    setStep(AUTH_STEP.EMAIL);
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
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  layout="position"
                  className="relative"
                  transition={SPRING}
                >
                  <span className="absolute leading-none mt-[0.5px] text-lg top-1/2 transform -translate-y-1/2 left-3">
                    +234
                  </span>
                  <Input
                    type="tel"
                    {...register("phone", { required: true })}
                    placeholder="Phone number"
                    className="pl-15 text-base leading-none md:text-lg"
                  />
                </motion.div>
              )}

              <FormAction>
                <MotionFormButton
                  layout
                  transition={SPRING}
                  disabled={isPending || isSignInPending}
                  isLoading={isPending || isSignInPending}
                  type="submit"
                  className="w-full"
                >
                  {btnText()}
                </MotionFormButton>
              </FormAction>
              {!isExistingUser && step === AUTH_STEP.DETAILS && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={SPRING}
                  className="text-center text-sm text-accent-foreground"
                >
                  By continuing, you agree to the Terms and Privacy Policy.
                </motion.p>
              )}
            </MotionForm>
          </LayoutGroup>
        </FormWrapper>
      </div>
    </div>
  );
};

const MotionFormAction = motion.create(FormAction);
const MotionFormButton = motion.create(Button);
const MotionForm = motion.create(Form);

const SPRING = {
  type: "spring",
  stiffness: 400,
  damping: 40,
};
