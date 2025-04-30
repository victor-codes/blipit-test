import AuthPage from "@/components/sections/auth/auth";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const supabase = createClient();
  const {
    data: { session },
  } = await (await supabase).auth.getSession();

  if (session) {
    redirect("/");
  }

  return <AuthPage />;
}
