export default function DefaultTemplate({ resume }: { resume: any }) {
    return (
      <div className="p-6 border shadow-md bg-white">
        <h1 className="text-2xl font-bold">{resume.title}</h1>
        {resume.content.map((section: any) => (
          <div key={section.id} className="mt-4">
            <h2 className="text-lg font-semibold">{section.title}</h2>
            <p className="text-gray-600">{section.content}</p>
          </div>
        ))}
      </div>
    );
  }
  