import AuthPage from "@/components/sections/auth/auth";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  // todo: use `useDashboard` hook to get user
  const supabase = createClient();
  const {
    data: { user },
    error: userError,
  } = await (await supabase).auth.getUser();

  if (user) {
    redirect("/");
  }

  return <AuthPage />;
}
