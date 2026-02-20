"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart, ArrowUp, Code2 } from "lucide-react";
import { profile } from "@/data/profile";

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
            {/* Back to Top Button */}
            <motion.button
                onClick={scrollToTop}
                className="absolute -top-6 left-1/2 -translate-x-1/2 p-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300"
                whileHover={{ y: -4, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Back to top"
            >
                <ArrowUp size={20} />
            </motion.button>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-3 gap-10 items-center">
                    {/* Brand */}
                    <div className="text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                            <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
                                <Code2 size={20} />
                            </div>
                            <h3 className="text-xl font-bold font-[family-name:var(--font-outfit)] bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Abhijit Satyaki
                            </h3>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">
                            Full Stack Developer & ML Enthusiast
                        </p>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center justify-center gap-3 flex-wrap">
                        {[
                            { href: profile.social.github, icon: Github, label: "GitHub" },
                            { href: profile.social.linkedin, icon: Linkedin, label: "LinkedIn" },
                            { href: profile.social.email, icon: Mail, label: "Email" },
                        ].map((social) => (
                            <motion.a
                                key={social.label}
                                href={social.href}
                                target={social.href.startsWith("mailto") ? undefined : "_blank"}
                                rel="noopener noreferrer"
                                className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-300 shadow-sm"
                                whileHover={{ y: -4, scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label={social.label}
                            >
                                <social.icon size={18} />
                            </motion.a>
                        ))}
                        {/* Buy Me a Coffee */}
                        <motion.a
                            href="https://www.buymeacoffee.com/satyakiabhijit"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-xl bg-[#40DCA5] border border-[#40DCA5] text-white hover:bg-[#36c795] hover:border-[#36c795] transition-all duration-300 shadow-sm"
                            whileHover={{ y: -4, scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label="Buy me a coffee"
                        >
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                                <line x1="6" y1="1" x2="6" y2="4" />
                                <line x1="10" y1="1" x2="10" y2="4" />
                                <line x1="14" y1="1" x2="14" y2="4" />
                            </svg>
                        </motion.a>
                    </div>

                    {/* Copyright */}
                    <div className="text-center md:text-right">
                        <p className="text-slate-600 dark:text-slate-400 text-sm flex items-center justify-center md:justify-end gap-1.5 mb-1">
                            Made with <Heart size={14} className="text-red-500 fill-red-500" /> in India
                        </p>
                        <p className="text-slate-500 dark:text-slate-500 text-xs">
                            © {currentYear} Abhijit Satyaki. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
