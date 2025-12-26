"use client";

import { motion } from "framer-motion";

interface SkillBadgeProps {
    name: string;
    index: number;
}

export default function SkillBadge({ name, index }: SkillBadgeProps) {
    return (
        <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.03 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, y: -2 }}
            className="inline-block px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium text-sm shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-600 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 cursor-default"
        >
            {name}
        </motion.span>
    );
}
