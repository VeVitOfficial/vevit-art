import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

// Middleware helper: obnoví Supabase session (refresh access token) a zapíše
// nové cookies do response. Volá se z root middleware.ts na každém matched
// requestu. Veřejný web auth nepotřebuje, ale artist "appka" ano — necháváme
// infrastrukturu připravenou. Viz Supabase Next.js scaffolding.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  // IMPORTANT: getUser() provede refresh session tokenu a zapíše cookies.
  // Nepřesměrovávat tady na /login — veřejný web nesmí zaseknout nepřihlášené.
  await supabase.auth.getUser();

  return supabaseResponse;
}