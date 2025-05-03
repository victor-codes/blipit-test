import { serverValidationBlock } from "@/app/api/lib/helpers";
import { createClient } from "@/lib/supabase/server";
import { ServerOTPSchema } from "@/lib/validation-schema/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const supasbase = await createClient();

  const body = await req.json();

  const { otp_code, email } = serverValidationBlock(ServerOTPSchema, body);

  const { error } = await supasbase.auth.verifyOtp({
    email,
    token: otp_code,
    type: "email",
  });

  if (error) {
    return NextResponse.json(
      { message: "error.message" },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json(
    { message: "OTP code confirmed." },
    {
      status: 200,
    }
  );
};
