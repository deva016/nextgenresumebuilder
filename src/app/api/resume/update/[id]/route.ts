import { NextResponse } from "next/server";
import createSupabaseServerClient from "@/lib/supabase/server";
import prisma from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    // Create Supabase server client
    const supabase = await createSupabaseServerClient();
    const { data: session } = await supabase.auth.getUser();

    // Ensure the user is authenticated
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse request body
    const { title, content, template } = await req.json();

    // Check if the resume exists and belongs to the logged-in user
    const existingResume = await prisma.resume.findUnique({
      where: { id: params.id },
    });

    if (!existingResume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    if (existingResume.userId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Ensure content is always an array
    const updatedContent = Array.isArray(content)
      ? content
      : [
          { id: "personal_info", title: "Personal Information", content: "" },
          { id: "objective", title: "Objective", content: "" },
          { id: "experience", title: "Work Experience", content: "" },
          { id: "education", title: "Education", content: "" },
          { id: "skills", title: "Skills", content: "" },
          { id: "projects", title: "Projects", content: "" },
          { id: "certifications", title: "Certifications", content: "" },
          { id: "languages", title: "Languages", content: "" },
          { id: "hobbies", title: "Hobbies & Interests", content: "" },
        ];

    // Update the resume
    const updatedResume = await prisma.resume.update({
      where: { id: params.id },
      data: { 
        title, 
        content: Array.isArray(content) ? content : [],
        template: template || "default", // Ensure template updates correctly
      },
    });
    

    return NextResponse.json(updatedResume);
  } catch (error) {
    console.error("Error updating resume:", error);
    return NextResponse.json({ error: "Failed to update resume" }, { status: 500 });
  }
}
