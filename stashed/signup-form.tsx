// "use client";

// import { useActionState } from "react";
// import { useFormStatus } from "react-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Loader2 } from "lucide-react";
// import Link from "next/link";
// import { signUp } from "@/stashed/actions";
// import { cn } from "@/lib/utils";
// import { Label } from "../components/ui/label";

// function SubmitButton() {
//   const { pending } = useFormStatus();

//   return (
//     <Button type="submit" disabled={pending} className="w-full">
//       {pending ? (
//         <>
//           <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//           Signing up...
//         </>
//       ) : (
//         "Sign Up"
//       )}
//     </Button>
//   );
// }

// export default function SignUpForm() {
//   // Initialize with null as the initial state
//   const [state, formAction] = useActionState(signUp, null);

//   return (
//     <div className={cn("flex w-full flex-col gap-6 max-w-sm")}>
//       <div className="flex bg-background flex-col gap-6 py-6">
//         <div className="grid gap-y-1.5 text-center">
//           <h2 className="text-xl leading-none font-semibold">
//             Sign up to get started
//           </h2>
//         </div>

//         <div className="w-full">
//           <form action={formAction} className="space-y-6">
//             {/* {state?.error && (
//               <div className="bg-red-500/10 border border-red-500/50 text-red-700 px-4 py-3 rounded">
//                 {state.error}
//               </div>
//             )}

//             {state?.success && (
//               <div className="bg-green-500/10 border border-green-500/50 text-green-700 px-4 py-3 rounded">
//                 {state.success}
//               </div>
//             )} */}

//             <div className="grid gap-6">
//               <div className="grid gap-6">
//                 <div className="grid gap-2">
//                   <Label htmlFor="email">Email</Label>
//                   <Input
//                     id="email"
//                     name="email"
//                     type="email"
//                     placeholder="you@example.com"
//                     required
//                   />
//                 </div>

//                 <div className="grid gap-2">
//                   <Label htmlFor="password">Password</Label>
//                   <Input
//                     id="password"
//                     name="password"
//                     type="password"
//                     required
//                   />
//                 </div>
//                 <SubmitButton />
//               </div>

//               <p className="text-center text-sm">
//                 Already have an account?{" "}
//                 <Link
//                   href="/auth/login"
//                   className="underline underline-offset-4"
//                 >
//                   Log in
//                 </Link>
//               </p>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
