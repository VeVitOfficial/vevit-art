import "server-only";
import { createClient } from "@supabase/supabase-js";

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  // Service-role klient: obejde RLS. autoconfirmUser se konfiguruje na
  // úrovni Supabase projektu (Auth settings), nikoliv na klientu.
  { auth: { persistSession: false, autoRefreshToken: false } }
);