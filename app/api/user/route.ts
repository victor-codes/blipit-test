import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export const GET = async () => {
  const supabase = await createClient();

  const { error: userError } = await supabase.auth.getUser();

  if (userError) {
    return NextResponse.json(JSON.stringify({ message: userError.message }), {
      status: 500,
    });
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .single();

  if (error) {
    return NextResponse.json(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }

  return NextResponse.json(
    {
      message: "User fetched successfully",
      user: profile,
    },
    {
      status: 200,
    }
  );
};
