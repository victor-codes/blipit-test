import { createClient } from "@/lib/supabase/server";
import { createCardWallet } from "@/services/blnk";
import { NextRequest, NextResponse } from "next/server";
import { cardService, generateCard } from "@/app/api/lib/card";
import { serverValidationBlock } from "@/app/api/lib/helpers";
import { ServerCardCreateSchema } from "@/lib/validation-schema/server";

export const GET = async () => {
  const supabase = await createClient();

  const { error: userError } = await supabase.auth.getUser();

  if (userError) {
    return NextResponse.json(
      { message: userError.message },
      {
        status: 401,
      }
    );
  }

  const { data: card, error } = await supabase
    .from("cards")
    .select(
      "tokenized_number, tokenized_cvv, card_name, expiry_date, billing_address, zip_code"
    )
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
    {
      message: "Card fetched successfully",
      details: card,
    },
    {
      status: 200,
    }
  );
};

export const POST = async (req: NextRequest) => {
  const supabase = await createClient();
  const body = await req.json();

  const { identity_id, meta_data } = serverValidationBlock(
    ServerCardCreateSchema,
    body
  );

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

  const { card_number, cvv, expiry_date, billing_address, zip_code } =
    generateCard();

  const tokenizedCard = cardService.encryptCardNumber(card_number);
  const tokenizedCVV = cardService.encryptCVV(cvv);

  const cardGenerated = {
    masked_number: tokenizedCard,
    nick_name: meta_data.nick_name,
    expiry_date,
  };

  const cardRes = await createCardWallet(
    process.env.BLNK_LEDGER_ID!,
    identity_id,
    process.env.BLNK_CURRENCY!,
    cardGenerated
  );

  const { data: profile, error } = await supabase
    .from("profiles")
    .update({
      card_id: cardRes,
    })
    .eq("id", user?.id)
    .select()
    .single();

  const { error: cardError } = await supabase
    .from("cards")
    .insert({
      tokenized_number: tokenizedCard,
      tokenized_cvv: tokenizedCVV,
      card_name: meta_data.nick_name,
      expiry_date,
      billing_address: billing_address,
      zip_code: zip_code,
    })
    .select()
    .single();

  if (error || cardError) {
    return NextResponse.json(
      { message: error?.message || cardError?.message },
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
