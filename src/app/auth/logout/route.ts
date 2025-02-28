"use server";

import { NextResponse } from "next/server";
import createSupabaseServerClient from "@/lib/supabase/server";

export async function POST() {
  try {
    const supabase = await createSupabaseServerClient(); // ✅ Add `await`

    // ✅ Ensure signOut is properly awaited
    const { error } = await supabase.auth.signOut();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Logout Error:", err);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
