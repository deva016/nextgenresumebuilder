export default function ModernTemplate({ resume }: { resume: any }) {
    return (
      <div className="p-6 border shadow-md bg-gray-100">
        <h1 className="text-3xl font-bold text-blue-600">{resume.title}</h1>
        {resume.content.map((section: any) => (
          <div key={section.id} className="mt-6">
            <h2 className="text-xl font-semibold text-blue-500">{section.title}</h2>
            <p className="text-gray-700">{section.content}</p>
          </div>
        ))}
      </div>
    );
  }
  