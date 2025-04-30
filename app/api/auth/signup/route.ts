import { createClient } from "@/lib/supabase/server";
import { ServerUserSchema } from "@/lib/validationSchema/server";

import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const supasbase = await createClient();

  const body = await req.json();

  const parsedData = ServerUserSchema.safeParse(body);

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

  const { email, phone_number, country_code } = parsedData.data;

  const { error } = await supasbase.auth.signInWithOtp({
    email,
    options: {
      data: { phone_number: `${country_code}${phone_number}` },
    },
  });

  if (error) {
    return NextResponse.json(
      { message: error.message },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json(
    { message: "User registered. OTP sent to email" },
    {
      status: 200,
    }
  );
};
