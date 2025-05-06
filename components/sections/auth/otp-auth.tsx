import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Spinner from "@/components/ui/spinner";
import { zeroPad } from "@/lib/utils";
import { confirmOTP, resendOTP } from "@/services/auth";
import { OTPAuthProps } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { useTimer } from "react-timer-hook";

export const OTPAuth = ({ back, isExistingUser }: OTPAuthProps) => {
  const router = useRouter();

  const { mutate: verifyFn, isPending } = useMutation({
    mutationFn: confirmOTP,
    onSuccess: () => {
      if (isExistingUser) {
        router.replace("/");
      } else {
        router.replace("/setup");
      }
    },
    onError: (error) => {
      toast.error(error.message);
      console.error("Error signing in user", error);
    },
  });

  const { mutate: resendFn, isPending: isResendPending } = useMutation({
    mutationFn: resendOTP,
    onError: (error) => {
      toast.error(error.message);
      console.error("Error resending", error);
    },
  });

  const { watch } = useFormContext();

  const watchEmail = watch("email");

  const handleOnComplete = (value: string) => {
    verifyFn({ email: watchEmail, otp_code: value });
  };

  const handleResendOTP = async () => {
    resendFn({ email: watchEmail });
  };

  return (
    <>
      <div className="min-h-[100dvh] flex flex-col p-4 pt-5 pb-10 md:pt- md:items-center bg-background">
        <header className="flex w-full max-w-md">
          <nav>
            <div className="h-11 ">
              <Button onClick={back} variant="secondary" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </div>
          </nav>
        </header>
        <main className="flex w-full max-w-md mx-auto flex-1">
          <div className="w-full space-y-12">
            <div className="w-full mt-8 space-y-8">
              <div className="text-center">
                <h2 className=" text-xl md:text-3xl font-medium tracking-tight text-secondary-foreground">
                  We sent you an email
                </h2>
                <p className="mt-2 text-accent-foreground">
                  Enter the 6-digits code sent to your email
                  <strong className="block">{watchEmail}</strong>
                </p>
              </div>

              <div className="flex items-center justify-center mx-auto h-14">
                {!isPending ? (
                  <InputOTP
                    maxLength={6}
                    autoFocus
                    onComplete={handleOnComplete}
                  >
                    <InputOTPGroup>
                      {Array.from({ length: 6 }).map((_, idx) => (
                        <InputOTPSlot
                          key={idx}
                          index={idx}
                          className="h-14 w-14 text-lg"
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                ) : (
                  <Spinner />
                )}
              </div>
            </div>
            <Timer cb={handleResendOTP} loading={isResendPending} />
          </div>
        </main>
      </div>
    </>
  );
};

const Timer = ({ cb, loading }: { cb: () => void; loading: boolean }) => {
  const newStamp = 45 * 1000;
  const expiry = new Date(Date.now() + newStamp);

  const { seconds, minutes, isRunning, restart } = useTimer({
    expiryTimestamp: expiry,
    autoStart: true,
  });

  const handleResend = () => {
    if (loading) return;
    const newExpiry = new Date(Date.now() + newStamp);
    restart(newExpiry, true);
    cb();
  };

  return isRunning ? (
    <div className="flex items-center justify-center mx-auto h-8 max-w-[300px]">
      <p>
        Resend in {zeroPad(minutes)}:{zeroPad(seconds)}
      </p>
    </div>
  ) : (
    <Button
      variant="ghost"
      size="sm"
      className="block mx-auto"
      onClick={handleResend}
    >
      Resend code
    </Button>
  );
};
