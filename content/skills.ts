/** Technical skills, grouped. Sourced from the CV. */

export type SkillGroup = {
  label: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    items: ["C#", "TypeScript", "JavaScript (ES6+)", "SQL", "HTML5", "CSS3 / SCSS"],
  },
  {
    label: "Front-end & mobile",
    items: ["Next.js", "React", "Angular", "React Native", "Svelte"],
  },
  {
    label: "Back-end",
    items: [".NET Core 7/8", "ASP.NET Core", "Node.js (Express, NestJS)", "VB.NET"],
  },
  {
    label: "Data",
    items: ["SQL Server", "PostgreSQL", "MySQL", "MongoDB"],
  },
  {
    label: "AI & automation",
    items: [
      "AI-assisted development",
      "Prompt engineering",
      "Generative AI tooling",
      "AI app building & deployment",
    ],
  },
  {
    label: "Practice",
    items: ["Agile / Scrum", "TDD", "CI/CD pipelines", "API design", "Git", "Mobile UI/UX"],
  },
];
