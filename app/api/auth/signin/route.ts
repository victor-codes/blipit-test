import { createClient } from "@/lib/supabase/server";
import { ServerLoginSchema } from "@/lib/validationSchema/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const supasbase = await createClient();
  const body = await req.json();
  const parsedData = ServerLoginSchema.safeParse(body);

  if (!parsedData.success) {
    return NextResponse.json(
      {
        message: "Invalid Email",
        details: parsedData.error.format(),
      },
      {
        status: 400,
      }
    );
  }

  const { email } = parsedData.data;

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
