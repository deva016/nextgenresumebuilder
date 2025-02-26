"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewResumePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreateResume = async () => {
    setLoading(true);
    setError("");

    const response = await fetch("/api/resume/get", { //src\app\api\resume\get\[id]\route.ts
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "My New Resume" }),
    });

    if (!response.ok) {
      setError("Failed to create resume");
      setLoading(false);
      return;
    }

    const resume = await response.json();
    router.push(`/resume/${resume.id}`); // ✅ Redirects to the correct editor page
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create a New Resume</h1>
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={handleCreateResume}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {loading ? "Creating..." : "Create Resume"}
      </button>
    </div>
  );
}
