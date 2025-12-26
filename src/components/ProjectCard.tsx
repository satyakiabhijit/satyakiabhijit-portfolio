"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Project } from "@/data/projects";

interface ProjectCardProps {
    project: Project;
    index: number;
}

const categoryColors: Record<string, string> = {
    web: "from-blue-500 to-cyan-500",
    fullstack: "from-emerald-500 to-teal-500",
    "ai-ml": "from-purple-500 to-pink-500",
    ml: "from-purple-500 to-pink-500",
    tool: "from-orange-500 to-amber-500",
    other: "from-slate-500 to-slate-600",
};

const categoryLabels: Record<string, string> = {
    web: "Web App",
    fullstack: "Full Stack",
    "ai-ml": "AI / ML",
    ml: "AI / ML",
    tool: "Tool",
    other: "Other",
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
    const colorClass = categoryColors[project.category] || categoryColors.other;
    const labelText = categoryLabels[project.category] || "Project";

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group"
        >
            <div className="relative h-full premium-card rounded-2xl overflow-hidden">
                {/* Top gradient accent */}
                <div className={`h-1 bg-gradient-to-r ${colorClass}`} />

                <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <span className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-lg bg-gradient-to-r ${colorClass} text-white`}>
                                    {labelText}
                                </span>
                                {project.featured && (
                                    <span className="px-2 py-0.5 text-xs font-medium rounded-md bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                                        Featured
                                    </span>
                                )}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                {project.name}
                            </h3>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-5 line-clamp-3">
                        {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-5">
                        {project.techStack.slice(0, 4).map((tech) => (
                            <span
                                key={tech}
                                className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700"
                            >
                                {tech}
                            </span>
                        ))}
                        {project.techStack.length > 4 && (
                            <span className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-500">
                                +{project.techStack.length - 4}
                            </span>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                        {project.github && (
                            <motion.a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Github size={16} />
                                Code
                            </motion.a>
                        )}
                        {project.demo && (
                            <motion.a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-shadow"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <ExternalLink size={16} />
                                Live Demo
                            </motion.a>
                        )}
                    </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/5 to-transparent" />
                </div>
            </div>
        </motion.div>
    );
}
