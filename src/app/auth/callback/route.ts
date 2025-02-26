import { NextResponse } from "next/server";
import createSupabaseServerClient from "@/lib/supabase/server";

export const dynamic = "force-dynamic"; // ✅ Forces Next.js to treat this as a dynamic route

export async function GET(req: Request) {
  try {
    const supabase = await createSupabaseServerClient();
    const code = new URL(req.url).searchParams.get("code");

    if (!code) {
      console.error("Auth callback error: Missing code parameter");
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // ✅ Exchange auth code for session
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error || !data?.session) {
      console.error("Auth callback error:", error);
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const { access_token } = data.session;

    // ✅ Set session cookie inside API route
    const response = NextResponse.redirect(new URL("/dashboard", req.url));
    response.cookies.set("session_token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Unexpected auth callback error:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
