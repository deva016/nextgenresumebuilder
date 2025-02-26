import getUserSession from "@/lib/getUserSession";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import ResumeEditor from "@/components/ResumeEditor";

export default async function ResumePage({ params }: { params: { id: string } }) {
  const {
    data: { session },
  } = await getUserSession();

  if (!session) {
    return redirect("/login");
  }

  const resume = await prisma.resume.findUnique({
    where: { id: params.id, userId: session.user.id },
  });

  if (!resume) {
    return <p className="text-red-500">Resume not found.</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">{resume.title}</h1>
      <ResumeEditor resume={resume} />
    </div>
  );
}
