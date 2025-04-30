import { createClient } from "@/lib/supabase/server";
import { ServerOTPSchema } from "@/lib/validationSchema/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const supasbase = await createClient();

  const body = await req.json();

  const parsedData = ServerOTPSchema.safeParse(body);

  if (!parsedData.success) {
    return NextResponse.json(
      {
        message: "Invalid input data",
        details: parsedData.error.format(),
      },
      {
        status: 400,
      }
    );
  }

  const { otp_code, email } = parsedData.data;

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
