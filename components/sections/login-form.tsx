"use client";
import { AUTH_FLOW } from "@/lib/utils";
import {
  existingUserSchema,
  newUserSchema,
} from "@/lib/validationSchema/client";
import { FormDataValues } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormAuth, OTPAuth } from "./auth/auth";

export default function AuthPage() {
  const [flow, setFlow] = useState<AUTH_FLOW>(AUTH_FLOW.FORM);
  const [isExistingUser, setIsExistingUser] = useState<boolean | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
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

// "use client";
// import { signUp } from "@/lib/actions";
// import type React from "react";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import Link from "next/link";
// import { XIcon } from "lucide-react";
// import { useActionState } from "react";

// export function LoginForm({
//   className,
//   ...props
// }: React.ComponentPropsWithoutRef<"div">) {
//   const [state, formAction] = useActionState(signUp, null);

//   return (
//     <div className={cn("flex flex-col gap-6 max-w-sm", className)} {...props}>
//       <div className="flex bg-background flex-col gap-6 py-6">
//         <div className="grid gap-y-1.5 text-center">
//           <h2 className="text-xl leading-none font-semibold">Welcome back</h2>
//           <p className="text-muted-foreground text-sm">
//             Log in or sign up to get started.
//           </p>
//         </div>

//         <div>
//           <form>
//             <div className="grid gap-6">
//               <div className="grid gap-6">
//                 <div className="grid gap-2">
//                   <div className="relative">
//                     <Input
//                       type="email"
//                       autoFocus
//                       placeholder="Email address"
//                       autoComplete="off"
//                       className="text-base md:text-lg"
//                     />
//                     <div className="absolute right-1 top-1/2 transform -translate-y-1/2">
//                       {isExistingUser !== null && (
//                         <button className="p-2" onClick={resetFields}>
//                           <XIcon className="w-5 h-5 " />
//                         </button>
//                       )}
//                     </div>
//                   </div>

//                   {/* <Label htmlFor="email">Email</Label>
//                   <Input
//                     id="email"
//                     type="email"
//                     placeholder="m@example.com"
//                     required
//                   /> */}
//                 </div>
//                 {/* <div className="grid gap-2">
//                   <div className="flex items-center">
//                     <Label htmlFor="password">Password</Label>
//                     <a
//                       href="#"
//                       className="ml-auto text-sm underline-offset-4 hover:underline"
//                     >
//                       Forgot your password?
//                     </a>
//                   </div>
//                   <Input id="password" type="password" required />
//                 </div> */}
//                 <Button type="submit" className="w-full">
//                   Continue
//                 </Button>
//               </div>

//               <p className="text-center text-sm">
//                 Don&apos;t have an account?{" "}
//                 <Link
//                   href="/auth/sign-up"
//                   className="underline underline-offset-4"
//                 >
//                   Sign up
//                 </Link>
//               </p>
//             </div>
//           </form>
//         </div>
//       </div>

//       <p className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  w-full">
//         By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
//         and <Link href="#">Privacy Policy</Link>.
//       </p>
//     </div>
//   );
// }
