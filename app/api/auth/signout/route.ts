import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const GET = async () => {
  const supasbase = await createClient();

  const { error } = await supasbase.auth.signOut();

  if (error) {
    return NextResponse.json(
      { message: error.message },
      {
        status: 500,
      }
    );
  }

  revalidatePath("/", "layout");

  return NextResponse.json(
    { message: "Signed out successfully." },
    {
      status: 200,
    }
  );
};
