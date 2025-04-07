export const parseGeminiResponse = (text) => {
  const sections = {
    example: "",
    explanation: "",
    code: "",
    task: "",
    use: "",
  };

  let currentSection = null;
  const lines = text.split("\n");

  for (let line of lines) {
    const trimmed = line.trim().toLowerCase();

    if (trimmed.startsWith("##") || trimmed.startsWith("###")) {
      if (trimmed.includes("example")) currentSection = "example";
      else if (trimmed.includes("explanation")) currentSection = "explanation";
      else if (trimmed.includes("code")) currentSection = "code";
      else if (trimmed.includes("task")) currentSection = "task";
      else if (trimmed.includes("use")) currentSection = "use";
      else currentSection = null; // Unknown section
    } else if (currentSection) {
      sections[currentSection] += line + "\n";
    }
  }

  return sections;
};
