import { createClient } from "@/lib/supabase/server";
import { createCustomerIdentity, createMainWallet } from "@/services/blnk";
import { NextRequest, NextResponse } from "next/server";
import { serverValidationBlock } from "../../lib/helpers";
import { ServerUpdateUserSchema } from "@/lib/validation-schema/server";

export const POST = async (req: NextRequest) => {
  const supabase = await createClient();
  const body = await req.json();

  const {
    last_name,
    first_name,
    phone_number,
    date_of_birth,
    nationality,
    gender,
    street,
    post_code,
    city,
    state,
    country,
  } = serverValidationBlock(ServerUpdateUserSchema, body);

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    return NextResponse.json(
      { message: userError.message },
      {
        status: 401,
      }
    );
  }

  const identityRes = await createCustomerIdentity({
    firstName: first_name,
    lastName: last_name,
    email: user?.email!,
    phone: phone_number,
    customerId: user?.id!,
    date_of_birth,
    nationality,
    gender,
    street,
    post_code,
    city,
    state,
    country,
  });

  const walletRes = await createMainWallet(
    process.env.BLNK_LEDGER_ID!,
    identityRes,
    process.env.BLNK_CURRENCY!
  );

  const { data: profile, error } = await supabase
    .from("profiles")
    .update({
      first_name: first_name,
      last_name: last_name,
      phone_number: phone_number,
      identity_id: identityRes,
      wallet_id: walletRes,
      completed_setup: true,
      identity: {
        dob: date_of_birth,
        gender,
        street,
        post_code,
        city,
        state,
        country,
        nationality,
      },
    })
    .eq("id", user?.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { message: error.message },
      {
        status: 500,
      }
    );
  }
  return NextResponse.json(
    { message: "User updated successfully", user: profile },
    {
      status: 200,
    }
  );
};
