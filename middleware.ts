import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

// Obnovuje Supabase auth session při každé navigaci. Matcher vylučuje
// statické assety (obrázky, css, js, html, portfolia .dc.html) a Next internals,
// aby middleware nezdržoval statické požadavky.
export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js|html|ico|txt|webmanifest)$).*)",
  ],
};