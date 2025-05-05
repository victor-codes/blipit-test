import { serverValidationBlock } from "@/app/api/lib/helpers";
import { createClient } from "@/lib/supabase/server";
import { ServerLoginSchema } from "@/lib/validation-schema/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const supasbase = await createClient();
  const body = await req.json();

  const { email } = serverValidationBlock(ServerLoginSchema, body);

  const { error } = await supasbase.auth.signInWithOtp({
    email,
  });

  if (error) {
    return NextResponse.json(
      { message: error.message },
      {
        status: 400,
      }
    );
  }

  return NextResponse.json(
    { message: "OTP sent to email" },
    {
      status: 200,
    }
  );
};
