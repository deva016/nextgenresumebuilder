"use client";

import { useState, useEffect } from "react";

export default function ResumeEditor({ resume }: { resume: any }) {
  const [title, setTitle] = useState(resume.title);
  const [content, setContent] = useState(resume.content);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchResume() {
      const response = await fetch(`/api/resume/${resume.id}`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setTitle(data.title);
        setContent(data.content);
      }
    }
    fetchResume();
  }, [resume.id]);

  const handleSave = async () => {
    setSaving(true);

    const response = await fetch(`/api/resume/update/${resume.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    if (!response.ok) {
      alert("Error saving resume");
    } else {
      alert("Resume saved successfully!");
    }

    setSaving(false);
  };

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full mb-4"
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border p-2 w-full h-40"
      />

      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 mt-4"
        disabled={saving}
      >
        {saving ? "Saving..." : "Save Resume"}
      </button>
    </div>
  );
}
