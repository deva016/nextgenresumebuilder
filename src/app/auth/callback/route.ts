import { NextResponse } from "next/server";
import createSupabaseServerClient from "@/lib/supabase/server";

export async function GET(req: Request) {
  try {
    const supabase = await createSupabaseServerClient();
    
    // ✅ Exchange auth code for a session
    const { data, error } = await supabase.auth.exchangeCodeForSession(
      new URL(req.url).searchParams.get("code") || ""
    );

    if (error || !data?.session) {
      console.error("Auth callback error:", error);
      return NextResponse.redirect(new URL("/login", req.url)); // Redirect if authentication fails
    }

    const { access_token } = data.session;

    // ✅ Set session cookie
    const response = NextResponse.redirect(new URL("/dashboard", req.url));
    response.cookies.set("session_token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Auth callback unexpected error:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
