"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, MapPin } from "lucide-react";
import { Experience } from "@/data/experience";

interface TimelineItemProps {
    experience: Experience;
    index: number;
}

export default function TimelineItem({ experience, index }: TimelineItemProps) {
    const Icon = experience.type === "work" ? Briefcase : GraduationCap;
    const isWork = experience.type === "work";

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative pl-8 md:pl-0"
        >
            {/* Timeline line */}
            <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500 to-purple-500 md:-translate-x-1/2" />

            {/* Content container */}
            <div className={`relative md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12 md:ml-auto"}`}>
                {/* Timeline dot */}
                <div className={`absolute left-0 md:left-auto ${index % 2 === 0 ? "md:-right-4" : "md:-left-4"} top-0 w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 -translate-x-1/2 md:translate-x-0`}>
                    <Icon size={16} className="text-white" />
                </div>

                {/* Card */}
                <div className="premium-card rounded-2xl p-6 ml-4 md:ml-0">
                    {/* Header */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-lg ${isWork
                                ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400"
                                : "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400"
                            }`}>
                            {experience.startDate} — {experience.endDate}
                        </span>
                        {experience.current && (
                            <span className="px-2 py-0.5 text-xs font-medium rounded-md bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800">
                                Current
                            </span>
                        )}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                        {experience.title}
                    </h3>

                    {/* Organization */}
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
                            {experience.organization}
                        </span>
                        {experience.location && (
                            <>
                                <span className="text-slate-300 dark:text-slate-600">•</span>
                                <span className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-500">
                                    <MapPin size={12} />
                                    {experience.location}
                                </span>
                            </>
                        )}
                    </div>

                    {/* Description */}
                    <ul className="space-y-2 mb-4">
                        {experience.description.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex-shrink-0" />
                                <span className="leading-relaxed">{item}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Skills */}
                    {experience.skills && (
                        <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-200 dark:border-slate-700">
                            {experience.skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
