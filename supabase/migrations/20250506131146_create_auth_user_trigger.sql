
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user;

CREATE OR REPLACE FUNCTION public.handle_new_user()
  RETURNS TRIGGER
  AS $fn$
BEGIN
  INSERT INTO public.profiles (
    id,
    email,
    first_name,
    last_name,
    phone_number,
    identity_id,
    wallet_id,
    card_id
  )
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'last_name',
    NEW.raw_user_meta_data ->> 'phone_number',
    NEW.raw_user_meta_data ->> 'identity_id',
    NEW.raw_user_meta_data ->> 'wallet_id',
    NEW.raw_user_meta_data ->> 'card_id'
  );
  RETURN NEW;
END;
$fn$
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public;


CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
