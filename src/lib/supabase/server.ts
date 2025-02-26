"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export default async function createSupabaseServerClient() {
  const cookieStore = cookies(); // ✅ This is valid inside a Server Component

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value || "";
        },
        set(name: string, value: string, options) {
          console.warn("⚠️ Use setCookie inside API routes instead.");
        },
        remove(name: string) {
          console.warn("⚠️ Use deleteCookie inside API routes instead.");
        },
      },
    }
  );
}
