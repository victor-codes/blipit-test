import { createClient } from "@/lib/supabase/server";
import { ServerLoginSchema } from "@/lib/validation-schema/server";
import { NextRequest, NextResponse } from "next/server";
import { serverValidationBlock } from "../../lib/helpers";

export const POST = async (req: NextRequest) => {
  const supasbase = await createClient();
  const body = await req.json();

  const { email } = serverValidationBlock(ServerLoginSchema, body);

  const { error } = await supasbase.auth.signInWithOtp({
    email,
    options: { shouldCreateUser: false },
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
