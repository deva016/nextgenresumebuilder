export default function ClassicTemplate({ resume }: { resume: any }) {
    return (
      <div className="p-6 border shadow-md bg-white">
        <h1 className="text-2xl font-serif font-bold">{resume.title}</h1>
        {resume.content.map((section: any) => (
          <div key={section.id} className="mt-4 border-b pb-2">
            <h2 className="text-lg font-serif font-semibold">{section.title}</h2>
            <p className="text-gray-800">{section.content}</p>
          </div>
        ))}
      </div>
    );
  }
  