"use client";

import { useState, useEffect } from "react";
import DefaultTemplate from "@/components/resumeTeme/DefaultTemplate";
import ModernTemplate from "@/components/resumeTeme/ModernTemplate";
import ClassicTemplate from "@/components/resumeTeme/ClassicTemplate";

// ✅ Define the ResumeSection type
type ResumeSection = {
  id: string;
  title: string;
  content: string;
};

export default function ResumeEditor({ resume }: { resume: any }) {
  const [template, setTemplate] = useState<string>(resume.template || "default");
  const [sections, setSections] = useState<ResumeSection[]>(resume.content || []);

  useEffect(() => {
    const saveTemplate = async () => {
      await fetch(`/api/resume/update/${resume.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ template }),
      });
    };
    saveTemplate();
  }, [template]);

  const handleContentChange = (id: string, newContent: string) => {
    setSections((prevSections: ResumeSection[]) =>
      prevSections.map((section: ResumeSection) =>
        section.id === id ? { ...section, content: newContent } : section
      )
    );
  };

  const handleSave = async () => {
    const response = await fetch(`/api/resume/update/${resume.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: resume.title, content: sections, template }),
    });

    if (!response.ok) {
      alert("Error saving resume");
    } else {
      alert("Resume saved successfully!");
    }
  };

  const getTemplateComponent = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate resume={{ ...resume, content: sections }} />;
      case "classic":
        return <ClassicTemplate resume={{ ...resume, content: sections }} />;
      default:
        return <DefaultTemplate resume={{ ...resume, content: sections }} />;
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Template Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Select Template</label>
        <select
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
          className="border p-2 rounded-md"
        >
          <option value="default">Default</option>
          <option value="modern">Modern</option>
          <option value="classic">Classic</option>
        </select>
      </div>

      {/* Render Selected Template */}
      {getTemplateComponent()}

      {/* Save Resume Button */}
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md"
      >
        Save Resume
      </button>
    </div>
  );
}
