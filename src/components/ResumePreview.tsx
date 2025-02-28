import ClassicTemplate from "./resumeTeme/ClassicTemplate";
import ModernTemplate from "./resumeTeme/ModernTemplate";
import DefaultTemplate from "./resumeTeme/DefaultTemplate";

export default function ResumePreview({ resume, template }: { resume: any; template: string }) {
  switch (template) {
    case "classic":
      return <ClassicTemplate resume={resume} />;
    case "modern":
      return <ModernTemplate resume={resume} />;
    default:
      return <DefaultTemplate resume={resume} />;
  }
}
