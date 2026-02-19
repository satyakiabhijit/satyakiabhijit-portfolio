import { profile, skills, publications, certifications } from "./profile";
import { projects } from "./projects";
import { experiences } from "./experience";

export interface VirtualFile {
  name: string;
  type: "file" | "directory";
  content?: string;
  children?: VirtualFile[];
  href?: string;
}

function buildFileSystem(): VirtualFile[] {
  const aboutContent = `
${profile.name}
${"=".repeat(profile.name.length)}
${profile.title} | ${profile.subtitle}

${profile.tagline}

LOCATION: ${profile.location}
EMAIL: ${profile.email}
PHONE: ${profile.phone}

BIO:
${profile.bio}

ROLES: ${profile.roles.join(", ")}
`;

  const skillsContent = `
LANGUAGES:
${skills.languages.map((s) => `  ${s.name}: ${s.level}%`).join("\n")}

FRAMEWORKS & LIBRARIES:
${skills.frameworks.map((s) => `  ${s.name}: ${s.level}%`).join("\n")}

CONCEPTS: ${skills.concepts.map((c) => c.name).join(", ")}
TOOLS: ${skills.tools.map((t) => t.name).join(", ")}
SOFT SKILLS: ${skills.softSkills.join(", ")}
`;

  const contactContent = `
CONTACT INFORMATION
${"=".repeat(25)}

Email: ${profile.email}
Phone: ${profile.phone}
Location: ${profile.location}

LINKS:
  GitHub:   ${profile.social.github}
  LinkedIn: ${profile.social.linkedin}
  Resume:   ${profile.resumeLink}
`;

  const projectsContent = projects
    .map(
      (p) => `
[${p.name}]
  ${p.description}
  Tech: ${p.techStack.join(", ")}
  ${p.github ? `GitHub: ${p.github}` : ""}
  ${p.demo ? `Demo: ${p.demo}` : ""}
`
    )
    .join("\n");

  const experienceContent = experiences
    .map(
      (e) => `
[${e.title} @ ${e.organization}]
  ${e.startDate} - ${e.endDate} ${e.current ? "(Current)" : ""}
  ${e.description.join("\n  ")}
  ${e.skills ? `Skills: ${e.skills.join(", ")}` : ""}
`
    )
    .join("\n");

  const publicationsContent = publications
    .map(
      (p) => `
[${p.title}]
  Venue: ${p.venue}
  Year: ${p.year}
  ${p.description}
  Tags: ${p.tags.join(", ")}
  ${p.doi ? `DOI: ${p.doi}` : ""}
`
    )
    .join("\n");

  const certsContent = certifications
    .map(
      (c) => `
[${c.name}]
  Issuer: ${c.issuer}
  Year: ${c.year}
  ${c.description}
  Skills: ${c.skills.join(", ")}
`
    )
    .join("\n");

  return [
    {
      name: "about.txt",
      type: "file",
      content: aboutContent.trim(),
    },
    {
      name: "skills.txt",
      type: "file",
      content: skillsContent.trim(),
    },
    {
      name: "contact.txt",
      type: "file",
      content: contactContent.trim(),
    },
    {
      name: "resume.pdf",
      type: "file",
      content: "[External link to resume]",
      href: profile.resumeLink,
    },
    {
      name: "projects",
      type: "directory",
      children: [
        {
          name: "README.txt",
          type: "file",
          content: projectsContent.trim(),
        },
        ...projects.map((p) => ({
          name: `${p.id}.txt`,
          type: "file" as const,
          content: `${p.name}\n${"=".repeat(p.name.length)}\n${p.description}\n\nTech: ${p.techStack.join(", ")}\n${p.github ? `GitHub: ${p.github}` : ""}\n${p.demo ? `Demo: ${p.demo}` : ""}`,
          href: p.demo || p.github,
        })),
      ],
    },
    {
      name: "experience",
      type: "directory",
      children: [
        {
          name: "work.txt",
          type: "file",
          content: experiences
            .filter((e) => e.type === "work")
            .map(
              (e) =>
                `[${e.title} @ ${e.organization}]\n  ${e.startDate} - ${e.endDate}\n  ${e.description.join("\n  ")}`
            )
            .join("\n\n"),
        },
        {
          name: "education.txt",
          type: "file",
          content: experiences
            .filter((e) => e.type === "education")
            .map(
              (e) =>
                `[${e.title} @ ${e.organization}]\n  ${e.startDate} - ${e.endDate}\n  ${e.description.join("\n  ")}`
            )
            .join("\n\n"),
        },
      ],
    },
    {
      name: "publications",
      type: "directory",
      children: [
        {
          name: "list.txt",
          type: "file",
          content: publicationsContent.trim(),
        },
      ],
    },
    {
      name: "certifications",
      type: "directory",
      children: [
        {
          name: "list.txt",
          type: "file",
          content: certsContent.trim(),
        },
      ],
    },
  ];
}

export const virtualFileSystem = buildFileSystem();

function normalizePathParts(path: string): string[] {
  return path
    .replace(/^\/+|\/+$/g, "")
    .split("/")
    .filter((p) => p && p !== ".");
}

export function getFileContent(path: string): string | null {
  const parts = normalizePathParts(path);
  if (parts.length === 0) return null;
  let current: VirtualFile[] = virtualFileSystem;

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    const item = current.find((f) => f.name === part);
    if (!item) return null;
    if (i === parts.length - 1) {
      if (item.type === "file") return item.content ?? null;
      return null;
    }
    if (item.type === "directory" && item.children) {
      current = item.children;
    } else {
      return null;
    }
  }
  return null;
}

export function listDir(path: string): VirtualFile[] | null {
  const parts = normalizePathParts(path);
  if (parts.length === 0) return virtualFileSystem;
  let current: VirtualFile[] = virtualFileSystem;

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    const item = current.find((f) => f.name === part);
    if (!item) return null;
    if (item.type === "directory" && item.children) {
      current = item.children;
    } else {
      return null;
    }
  }
  return current;
}
