import { NextResponse } from "next/server";
import createSupabaseServerClient from "@/lib/supabase/server";
import prisma from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: session } = await supabase.auth.getUser();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, content } = await req.json();

    const updatedResume = await prisma.resume.update({
      where: { id: params.id, userId: session.user.id },
      data: { title, content },
    });

    return NextResponse.json(updatedResume);
  } catch (error) {
    console.error("Error updating resume:", error);
    return NextResponse.json({ error: "Failed to update resume" }, { status: 500 });
  }
}
