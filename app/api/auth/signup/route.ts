import { createClient } from "@/lib/supabase/server";
import { ServerUserSchema } from "@/lib/validation-schema/server";

import { NextRequest, NextResponse } from "next/server";
import { serverValidationBlock } from "../../lib/helpers";

export const POST = async (req: NextRequest) => {
  const supasbase = await createClient();

  const body = await req.json();

  const { email, phone_number, country_code } = serverValidationBlock(
    ServerUserSchema,
    body
  );

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
