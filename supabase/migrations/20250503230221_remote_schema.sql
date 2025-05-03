alter table "public"."cards" drop constraint "cards_id_fkey";

alter table "public"."profiles" drop constraint "profiles_card_wallet_id_key";

drop index if exists "public"."profiles_card_wallet_id_key";

alter table "public"."profiles" drop column "card_id";

alter table "public"."profiles" add column "card_wallet_id" text;

alter table "public"."profiles" add column "identity" jsonb;

CREATE UNIQUE INDEX profiles_card_wallet_id_key ON public.profiles USING btree (card_wallet_id);

alter table "public"."profiles" add constraint "profiles_card_wallet_id_key" UNIQUE using index "profiles_card_wallet_id_key";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name, phone_number, identity_id, wallet_id, card_wallet_id)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'last_name',
    NEW.raw_user_meta_data ->> 'phone_number',
    NEW.raw_user_meta_data ->> 'identity_id',
    NEW.raw_user_meta_data ->> 'wallet_id',
    NEW.raw_user_meta_data ->> 'card_wallet_id'
  );
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_profile_update()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  -- Set the updated_at column to the current time only if data has changed
  IF (NEW IS DISTINCT FROM OLD) THEN
     NEW.updated_at = now();
  END IF;
  RETURN NEW; -- Return the modified row (or original if no change)
END;
$function$
;


