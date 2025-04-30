import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const supabase = await createClient();
  const body = await req.json();

  const { last_name, first_name } = body;

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("profiles")
    .update({ last_name, first_name })
    .eq("id", user?.id)
    .select();

  if (error) {
    return NextResponse.json(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
  return NextResponse.json(
    { message: "User updated successfully", user: data },
    {
      status: 200,
    }
  );
};
