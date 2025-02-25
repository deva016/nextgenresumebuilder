import getUserSession from "@/lib/getUserSession";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";
import Header from '@/components/header';


export default async function DashboardPage() {
  const {
    data: { session },
  } = await getUserSession();

  if (!session) {
    return redirect("/login");
  }

  // Fetch resumes from database
  const resumes = await prisma.resume.findMany({
    where: { userId: session.user.id },
    select: { id: true, title: true, updatedAt: true },
  });

  return (
    <> 
      <Header/>
    <div className="container mx-auto  py-20">
      <h1 className="text-2xl font-bold mb-4">Your Resumes</h1>

      {/* Create New Resume Button */}
      <Link
        href="/resume/new"
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block"
      >
        + Create New Resume
      </Link>

      {/* Display Resumes */}
      {resumes.length === 0 ? (
        <p className="text-gray-500 mt-4">No resumes found. Start by creating one!</p>
      ) : (
        <ul className="mt-4">
          {resumes.map((resume) => (
            <li key={resume.id} className="flex justify-between bg-gray-100 p-4 mb-2 rounded">
              <Link href={`/resume/${resume.id}`} className="text-blue-600 font-medium">
                {resume.title}
              </Link>

              <span className="text-gray-400 text-sm">
                Last updated: {new Date(resume.updatedAt).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
    </>
  );
}
