"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// ✅ Ensures the function is async for Server Actions
export default async function createSupabaseServerClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: async () => cookies().getAll(),
      },
    }
  );
}
