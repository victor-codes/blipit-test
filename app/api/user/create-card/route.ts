import { createClient } from "@/lib/supabase/server";
import { createCardWallet } from "@/services/blnk";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const supabase = await createClient();

  const body = await req.json();

  const { identity_id, meta_data } = body;

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

  const cardRes = await createCardWallet(
    process.env.BLNK_LEDGER_ID!,
    identity_id,
    process.env.BLNK_CURRENCY!,
    meta_data
  );

  const { data: profile, error } = await supabase
    .from("profiles")
    .update({
      card_id: cardRes,
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
    { message: "Card created sucessfully", user: profile },
    {
      status: 200,
    }
  );
};
