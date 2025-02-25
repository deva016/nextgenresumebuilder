import { NextResponse } from "next/server";
import createSupabaseServerClient from "@/lib/supabase/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: session } = await supabase.auth.getUser();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title } = await req.json();

    // Ensure the user exists in Prisma
    let user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          id: session.user.id,
          email: session.user.email!,
          name: session.user.user_metadata.full_name || null,
          avatar: session.user.user_metadata.avatar_url || null,
        },
      });
    }

    // Create a new resume
    const newResume = await prisma.resume.create({
      data: {
        userId: user.id,
        title: title || "Untitled Resume",
        content: {},
      },
    });

    return NextResponse.json(newResume, { status: 201 });
  } catch (error) {
    console.error("Error creating resume:", error);
    return NextResponse.json({ error: "Failed to create resume" }, { status: 500 });
  }
}
