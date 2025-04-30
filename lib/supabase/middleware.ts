import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_PATHS = [
  // "/auth",
  "/auth/login",
  "/api/auth/signup",
  "/api/auth/signin",
  "/api/auth/signout",
  "/api/auth/signin/confirm-otp",
  // "/api/auth/sessions/update-activity",
];

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: DO NOT REMOVE auth.getUser()

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (
    !user &&
    !PUBLIC_PATHS.some((path) => request.nextUrl.pathname.startsWith(path))
  ) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}

// import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
// import { NextResponse, type NextRequest } from "next/server";

// // Check if Supabase environment variables are available
// export const isSupabaseConfigured =
//   typeof process.env.NEXT_PUBLIC_SUPABASE_URL === "string" &&
//   process.env.NEXT_PUBLIC_SUPABASE_URL.length > 0 &&
//   typeof process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === "string" &&
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length > 0;

// export async function updateSession(request: NextRequest) {
//   // If Supabase is not configured, just continue without auth
//   if (!isSupabaseConfigured) {
//     return NextResponse.next({
//       request,
//     });
//   }

//   const res = NextResponse.next();

//   // Create a Supabase client configured to use cookies
//   const supabase = createMiddlewareClient({ req: request, res });

//   // Check if this is an auth callback
//   const requestUrl = new URL(request.url);
//   const code = requestUrl.searchParams.get("code");

//   if (code) {
//     // Exchange the code for a session
//     await supabase.auth.exchangeCodeForSession(code);
//     // Redirect to home page after successful auth
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   // Refresh session if expired - required for Server Components
//   await supabase.auth.getSession();

//   // Protected routes - redirect to login if not authenticated
//   const isAuthRoute =
//     request.nextUrl.pathname.startsWith("/auth/login") ||
//     request.nextUrl.pathname.startsWith("/auth/sign-up") ||
//     request.nextUrl.pathname === "/auth/callback";

//   if (!isAuthRoute) {
//     const {
//       data: { session },
//     } = await supabase.auth.getSession();

//     if (!session) {
//       const redirectUrl = new URL("/auth/login", request.url);
//       return NextResponse.redirect(redirectUrl);
//     }
//   }

//   return res;
// }
