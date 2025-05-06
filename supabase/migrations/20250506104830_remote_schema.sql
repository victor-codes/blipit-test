

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
BEGIN
  -- Insert a new row into public.profiles
  -- Uses id, email from the new auth.users record
  -- Attempts to get other fields from raw_user_meta_data JSONB
  -- completed_setup defaults to FALSE via the table definition
  -- identity defaults to NULL via the table definition
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
    -- identity is not listed here, it will use the DEFAULT value (NULL)
    -- completed_setup is not listed here, it will use the DEFAULT value (false)
  );
  -- Note: created_at and updated_at also get their DEFAULT values (now())
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";


COMMENT ON FUNCTION "public"."handle_new_user"() IS 'Trigger function to automatically create a user profile upon new Supabase auth user creation, potentially populating fields from metadata. identity defaults to NULL, completed_setup defaults to false.';



CREATE OR REPLACE FUNCTION "public"."handle_profile_update"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  -- Set the updated_at column to the current time only if data has changed
  IF (NEW IS DISTINCT FROM OLD) THEN
     NEW.updated_at = now();
  END IF;
  RETURN NEW; -- Return the modified row (or original if no change)
END;
$$;


ALTER FUNCTION "public"."handle_profile_update"() OWNER TO "postgres";


COMMENT ON FUNCTION "public"."handle_profile_update"() IS 'Trigger function to automatically update the updated_at timestamp on profile modification if data changed.';


SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."cards" (
    "id" "uuid" NOT NULL,
    "tokenized_number" "text" NOT NULL,
    "tokenized_cvv" "text" NOT NULL,
    "card_name" "text" NOT NULL,
    "expiry_date" "text" NOT NULL,
    "billing_address" "text",
    "zip_code" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."cards" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" NOT NULL,
    "email" "text" NOT NULL,
    "first_name" "text",
    "last_name" "text",
    "phone_number" "text",
    "identity_id" "text",
    "wallet_id" "text",
    "card_wallet_id" "text",
    "identity" "jsonb",
    "completed_setup" boolean DEFAULT false NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."profiles" OWNER TO "postgres";


COMMENT ON TABLE "public"."profiles" IS 'Stores user profile information, linking Supabase Auth users to application-specific data, including identity details, wallet IDs, card wallet ID, and setup status.';



COMMENT ON COLUMN "public"."profiles"."id" IS 'Foreign key referencing the id in the auth.users table. Primary key of profiles.';



COMMENT ON COLUMN "public"."profiles"."email" IS 'User''s email address (should match auth.users email).';



COMMENT ON COLUMN "public"."profiles"."first_name" IS 'User''s first name.';



COMMENT ON COLUMN "public"."profiles"."last_name" IS 'User''s last name.';



COMMENT ON COLUMN "public"."profiles"."phone_number" IS 'User''s phone number (optional).';



COMMENT ON COLUMN "public"."profiles"."identity_id" IS 'Unique identifier for the user''s identity verification (e.g., from an external identity provider).';



COMMENT ON COLUMN "public"."profiles"."wallet_id" IS 'Unique identifier for the user''s crypto wallet or similar financial identifier.';



COMMENT ON COLUMN "public"."profiles"."card_wallet_id" IS 'Unique identifier for the user''s card-based wallet or payment profile (card_id).';



COMMENT ON COLUMN "public"."profiles"."identity" IS 'Stores detailed identity information (dob, nationality, gender, address) in JSONB format. Defaults to NULL.';



COMMENT ON COLUMN "public"."profiles"."completed_setup" IS 'Flag indicating if the user has completed the initial application setup steps.';



COMMENT ON COLUMN "public"."profiles"."created_at" IS 'Timestamp when the profile was initially created.';



COMMENT ON COLUMN "public"."profiles"."updated_at" IS 'Timestamp when the profile was last updated.';



ALTER TABLE ONLY "public"."cards"
    ADD CONSTRAINT "cards_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_card_wallet_id_key" UNIQUE ("card_wallet_id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_email_key" UNIQUE ("email");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_identity_id_key" UNIQUE ("identity_id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_wallet_id_key" UNIQUE ("wallet_id");



CREATE OR REPLACE TRIGGER "on_profile_updated" BEFORE UPDATE ON "public"."profiles" FOR EACH ROW EXECUTE FUNCTION "public"."handle_profile_update"();



COMMENT ON TRIGGER "on_profile_updated" ON "public"."profiles" IS 'Calls handle_profile_update function before a profile row is updated.';



ALTER TABLE ONLY "public"."cards"
    ADD CONSTRAINT "cards_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



CREATE POLICY "Allow individual delete access on cards" ON "public"."cards" FOR DELETE TO "authenticated" USING (("id" = "auth"."uid"()));



CREATE POLICY "Allow individual delete access on profiles" ON "public"."profiles" FOR DELETE USING (("auth"."uid"() = "id"));



CREATE POLICY "Allow individual insert access on cards" ON "public"."cards" FOR INSERT TO "authenticated" WITH CHECK (("id" = "auth"."uid"()));



CREATE POLICY "Allow individual read access on cards" ON "public"."cards" FOR SELECT TO "authenticated" USING (("id" = "auth"."uid"()));



CREATE POLICY "Allow individual read access on profiles" ON "public"."profiles" FOR SELECT USING (("auth"."uid"() = "id"));



CREATE POLICY "Allow individual update access on cards" ON "public"."cards" FOR UPDATE TO "authenticated" USING (("id" = "auth"."uid"())) WITH CHECK (("id" = "auth"."uid"()));



CREATE POLICY "Allow individual update access on profiles" ON "public"."profiles" FOR UPDATE USING (("auth"."uid"() = "id")) WITH CHECK (("auth"."uid"() = "id"));



ALTER TABLE "public"."cards" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";











































































































































































GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";



GRANT ALL ON FUNCTION "public"."handle_profile_update"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_profile_update"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_profile_update"() TO "service_role";


















GRANT ALL ON TABLE "public"."cards" TO "anon";
GRANT ALL ON TABLE "public"."cards" TO "authenticated";
GRANT ALL ON TABLE "public"."cards" TO "service_role";



GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;
