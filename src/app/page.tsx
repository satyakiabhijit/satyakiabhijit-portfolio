"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail, MapPin, Sparkles, Code2, Briefcase, GraduationCap, ChevronDown, Award, BookOpen, FileText, Quote, Star, User } from "lucide-react";
import Image from "next/image";
import { profile, skills, certifications, publications, services, stats, testimonials } from "@/data/profile";
import { projects, categories } from "@/data/projects";
import { experiences } from "@/data/experience";
import AnimatedSection from "@/components/AnimatedSection";
import ProjectCard from "@/components/ProjectCard";
import TimelineItem from "@/components/TimelineItem";
import SkillBadge from "@/components/SkillBadge";
import ContactForm from "@/components/ContactForm";
import TechIcon from "@/components/TechIcon";
import Modal from "@/components/Modal";
import { useState, useEffect } from "react";


// Animated typing effect for roles
function TypeWriter({ texts, className }: { texts: string[]; className?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const fullText = texts[currentIndex];

      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        if (currentText === fullText) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentIndex, texts]);

  return (
    <span className={className}>
      {currentText}
      <span className="animate-blink text-indigo-500">|</span>
    </span>
  );
}

// Stats component
function StatCard({ value, label, icon: Icon }: { value: string; label: string; icon: React.ElementType }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative group"
    >
      <div className="premium-card rounded-2xl p-6 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 text-indigo-600 dark:text-indigo-400 mb-4">
          <Icon size={24} />
        </div>
        <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mb-1">
          {value}
        </div>
        <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
          {label}
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedCert, setSelectedCert] = useState<{ name: string; image: string } | null>(null);
  const [selectedService, setSelectedService] = useState<{ title: string; description: string } | null>(null);

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center hero-gradient grid-pattern overflow-hidden"
      >
        {/* Ambient background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px] animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/15 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            {/* Text Content */}
            <div className="flex-1 text-center lg:text-left">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6"
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-sm font-medium border border-indigo-500/20">
                  <Sparkles size={16} className="text-indigo-500" />
                  Available for Opportunities
                </span>
              </motion.div>

              {/* Name */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-7xl font-bold font-[family-name:var(--font-outfit)] mb-4 tracking-tight"
              >
                <span className="text-slate-900 dark:text-white">Hi, I&apos;m </span>
                <span className="animated-gradient">{profile.name}</span>
              </motion.h1>

              {/* Typing Role */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-6 h-10"
              >
                <TypeWriter
                  texts={profile.roles}
                  className="text-xl sm:text-2xl lg:text-3xl text-slate-600 dark:text-slate-300 font-medium"
                />
              </motion.div>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed"
              >
                {profile.tagline}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10"
              >
                <motion.a
                  href="#projects"
                  className="group px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 flex items-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  View My Work
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </motion.a>
                <motion.a
                  href={profile.resumeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-xl border-2 border-indigo-500/50 text-indigo-600 dark:text-indigo-400 font-semibold hover:bg-indigo-500 hover:text-white hover:border-indigo-500 transition-all duration-300 flex items-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                  Download CV
                </motion.a>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex items-center justify-center lg:justify-start gap-3"
              >
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
                    className="p-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-300 shadow-sm"
                    whileHover={{ y: -4, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </motion.div>
            </div>

            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-[400px] lg:h-[400px]">
                {/* Rotating gradient border */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-spin-slow opacity-50 blur-md" />

                {/* Inner container */}
                <div className="absolute inset-2 rounded-full bg-white dark:bg-slate-900" />

                {/* Image */}
                <div className="absolute inset-4 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl glow">
                  <Image
                    src={profile.avatar}
                    alt={profile.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Status badge */}
                <motion.div
                  className="absolute -top-2 -right-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Open to Work
                  </span>
                </motion.div>

                {/* Location badge */}
                <motion.div
                  className="absolute -bottom-2 -left-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                >
                  <span className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                    <MapPin size={14} className="text-indigo-500" />
                    {profile.location}
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <motion.a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex flex-col items-center gap-2 text-slate-400 hover:text-indigo-500 transition-colors cursor-pointer"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-sm font-medium tracking-wide uppercase">Scroll</span>
              <ChevronDown size={20} />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard value="2+" label="Years Experience" icon={Briefcase} />
            <StatCard value={`${projects.length}+`} label="Projects Built" icon={Code2} />
            <StatCard value="10+" label="Technologies" icon={Sparkles} />
            <StatCard value="B.Tech" label="IT Student" icon={GraduationCap} />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 lg:py-32 mesh-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-4">
                Services
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-outfit)] mb-6">
                <span className="text-slate-900 dark:text-white">What I </span>
                <span className="animated-gradient">Offer</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                Specialized services to help bring your ideas to life with cutting-edge technology
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <AnimatedSection key={service.id} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="group premium-card rounded-2xl p-6 h-full cursor-pointer"
                  onClick={() => setSelectedService({ title: service.title, description: service.description })}
                >
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    {service.icon === "desktop" && <Code2 size={24} className="text-white" />}
                    {service.icon === "robot" && <Sparkles size={24} className="text-white" />}
                    {service.icon === "paint-brush" && <Award size={24} className="text-white" />}
                    {service.icon === "users" && <User size={24} className="text-white" />}
                    {service.icon === "bullhorn" && <BookOpen size={24} className="text-white" />}
                    {service.icon === "code" && <Code2 size={24} className="text-white" />}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {service.title}
                  </h3>

                  {/* Description Preview */}
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-3">
                    {service.description}
                  </p>

                  {/* Click Indicator */}
                  <div className="mt-5 flex items-center gap-2 text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm font-medium">Learn More</span>
                    <ArrowRight size={16} />
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 lg:py-32 bg-white dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-4">
                About Me
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-outfit)] mb-6">
                <span className="text-slate-900 dark:text-white">Passionate About </span>
                <span className="animated-gradient">Building Solutions</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                Get to know more about my journey, skills, and what drives me to create impactful software.
              </p>
            </div>
          </AnimatedSection>

          {/* Bio Section - Full Width Card */}
          <AnimatedSection delay={0.1}>
            <div className="premium-card rounded-3xl p-8 mb-8">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Avatar & Info */}
                <div className="lg:col-span-1 flex flex-col items-center lg:items-start text-center lg:text-left">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full blur-xl opacity-30 animate-pulse" />
                    <Image
                      src={profile.avatar}
                      alt={profile.name}
                      width={150}
                      height={150}
                      className="rounded-full border-4 border-indigo-500/30 relative z-10"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{profile.name}</h3>
                  <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-4">{profile.title}</p>

                  {/* Quick Info */}
                  <div className="space-y-3 w-full">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                      <MapPin size={18} className="text-indigo-500" />
                      <span className="text-slate-700 dark:text-slate-300">{profile.location}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                      <GraduationCap size={18} className="text-indigo-500" />
                      <span className="text-slate-700 dark:text-slate-300">B.Tech in IT @ JGEC</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                      <Briefcase size={18} className="text-indigo-500" />
                      <span className="text-slate-700 dark:text-slate-300">2+ Years Experience</span>
                    </div>
                  </div>
                </div>

                {/* Bio Text */}
                <div className="lg:col-span-2">
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                    <span className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
                      <Code2 size={20} />
                    </span>
                    Who I Am
                  </h4>
                  <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                    {profile.bio.split("\n\n").map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Skills Section - 2 Column Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Languages with Progress Bars */}
              <AnimatedSection delay={0.2}>
                <div className="premium-card rounded-2xl p-6 h-full">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
                    Languages
                  </h4>
                  <div className="space-y-4">
                    {skills.languages.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.08 }}
                        viewport={{ once: true }}
                        className="group"
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-medium text-sm text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {skill.name}
                          </span>
                          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: index * 0.08, ease: "easeOut" }}
                            viewport={{ once: true }}
                            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              {/* Concepts */}
              <AnimatedSection delay={0.3}>
                <div className="premium-card rounded-2xl p-6">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                    Concepts & Principles
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.concepts.map((skill, index) => (
                      <motion.span
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="px-3 py-1.5 rounded-lg bg-purple-500/10 text-purple-700 dark:text-purple-300 text-sm font-medium border border-purple-200 dark:border-purple-800 cursor-default"
                      >
                        {skill.name}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              {/* Soft Skills */}
              <AnimatedSection delay={0.4}>
                <div className="premium-card rounded-2xl p-6">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500" />
                    Soft Skills
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {skills.softSkills.map((skill, index) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2 p-2.5 rounded-lg bg-amber-500/5 border border-amber-200/50 dark:border-amber-800/50"
                      >
                        <Sparkles size={14} className="text-amber-500" />
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{skill}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Frameworks with Progress Bars */}
              <AnimatedSection delay={0.2}>
                <div className="premium-card rounded-2xl p-6 h-full">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" />
                    Frameworks & Libraries
                  </h4>
                  <div className="space-y-4">
                    {skills.frameworks.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.08 }}
                        viewport={{ once: true }}
                        className="group"
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-medium text-sm text-slate-700 dark:text-slate-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                            {skill.name}
                          </span>
                          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: index * 0.08, ease: "easeOut" }}
                            viewport={{ once: true }}
                            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              {/* Tools - Grid */}
              <AnimatedSection delay={0.3}>
                <div className="premium-card rounded-2xl p-6">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
                    Tools & Technologies
                  </h4>
                  <div className="grid grid-cols-4 gap-2">
                    {skills.tools.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05, y: -3 }}
                        className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-center cursor-default"
                      >
                        <div className="w-8 h-8 mx-auto mb-1.5 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                          <TechIcon name={skill.name} size={16} />
                        </div>
                        <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                          {skill.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Work Experience Section */}
      <section id="experience" className="py-24 lg:py-32 bg-white dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-4">
                Experience
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-outfit)] mb-6">
                <span className="text-slate-900 dark:text-white">Work </span>
                <span className="animated-gradient">Experience</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                Professional internships and research experience
              </p>
            </div>
          </AnimatedSection>

          <div className="relative space-y-8">
            {experiences.filter(exp => exp.type === "work").map((experience, index) => (
              <TimelineItem key={experience.id} experience={experience} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-24 lg:py-32 mesh-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-4">
                Education
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-outfit)] mb-6">
                <span className="text-slate-900 dark:text-white">Academic </span>
                <span className="animated-gradient">Background</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                My educational journey and qualifications
              </p>
            </div>
          </AnimatedSection>

          <div className="relative space-y-8">
            {experiences.filter(exp => exp.type === "education").map((experience, index) => (
              <TimelineItem key={experience.id} experience={experience} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section id="publications" className="py-24 lg:py-32 bg-white dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-4">
                Research
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-outfit)] mb-6">
                <span className="text-slate-900 dark:text-white">My </span>
                <span className="animated-gradient">Publications</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                Research publications and academic contributions in technology and security
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {publications.map((pub, index) => (
              <AnimatedSection key={pub.id} delay={index * 0.1}>
                <div className="premium-card rounded-2xl p-6 h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
                      <FileText size={24} />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{pub.year}</span>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">{pub.title}</h3>
                    </div>
                  </div>
                  <p className="text-indigo-600 dark:text-indigo-400 font-medium text-sm mb-3">{pub.venue}</p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">{pub.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {pub.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {pub.doi && (
                    <p className="text-xs text-slate-500 dark:text-slate-500">
                      <strong>DOI:</strong> {pub.doi}
                    </p>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 lg:py-32 mesh-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-4">
                Portfolio
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-outfit)] mb-6">
                <span className="text-slate-900 dark:text-white">Featured </span>
                <span className="animated-gradient">Projects</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                A showcase of my best work — from web applications to machine learning projects.
              </p>
            </div>
          </AnimatedSection>

          {/* Category Filter */}
          <AnimatedSection delay={0.1}>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((cat) => (
                <motion.button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${activeCategory === cat.id
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600"
                    }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {cat.name}
                </motion.button>
              ))}
            </div>
          </AnimatedSection>

          {/* Projects Grid */}
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>

          {/* GitHub CTA */}
          <AnimatedSection delay={0.2}>
            <div className="text-center mt-16">
              <motion.a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Github size={20} />
                View All Projects on GitHub
              </motion.a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-24 lg:py-32 mesh-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-4">
                Credentials
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-outfit)] mb-6">
                <span className="text-slate-900 dark:text-white">Professional </span>
                <span className="animated-gradient">Certifications</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                Certifications that validate my expertise across various domains
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <AnimatedSection key={cert.id} delay={index * 0.1}>
                <div className="premium-card rounded-2xl p-6 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
                      <Award size={24} />
                    </div>
                    <span className="px-3 py-1 text-xs font-semibold rounded-lg bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                      Verified
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{cert.name}</h3>
                  <p className="text-indigo-600 dark:text-indigo-400 font-medium text-sm mb-1">{cert.issuer}</p>
                  <p className="text-slate-500 dark:text-slate-500 text-sm mb-3">Completed: {cert.year}</p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 flex-grow">{cert.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {cert.skills.map((skill) => (
                      <span key={skill} className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {skill}
                      </span>
                    ))}
                  </div>
                  {/* View Certificate Button */}
                  {(cert as { image?: string }).image && (
                    <button
                      onClick={() => {
                        const certWithImage = cert as { name: string; image?: string };
                        setSelectedCert({ name: cert.name, image: certWithImage.image! });
                      }}
                      className="w-full mt-auto py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-sm hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 flex items-center justify-center gap-2"
                    >
                      <Award size={16} />
                      View Certificate
                    </button>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 lg:py-32 bg-white dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-4">
                Testimonials
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-outfit)] mb-6">
                <span className="text-slate-900 dark:text-white">What People </span>
                <span className="animated-gradient">Say</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                Feedback from colleagues, mentors, and collaborators who have worked with me
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <AnimatedSection key={testimonial.id} delay={index * 0.1}>
                <div className="premium-card rounded-2xl p-6 h-full flex flex-col">
                  {/* Quote Icon */}
                  <div className="mb-4">
                    <Quote size={32} className="text-indigo-500/30" />
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6 flex-1 italic">
                    &quot;{testimonial.text}&quot;
                  </p>

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white">
                      <User size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white">{testimonial.name}</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-500">{testimonial.organization}</p>
                      <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">{testimonial.role}</span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* CTA */}
          <AnimatedSection delay={0.4}>
            <div className="text-center mt-12 p-8 premium-card rounded-2xl">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Want to work together?</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">I&apos;m always open to discussing new opportunities and exciting projects.</p>
              <motion.a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Let&apos;s Collaborate
                <ArrowRight size={18} />
              </motion.a>
            </div>
          </AnimatedSection>
        </div>
      </section >

      {/* Contact Section */}
      < section id="contact" className="py-24 lg:py-32 bg-white dark:bg-slate-900/50" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-4">
                Contact
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-outfit)] mb-6">
                <span className="text-slate-900 dark:text-white">Let&apos;s Work </span>
                <span className="animated-gradient">Together</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                Have a project in mind or want to discuss opportunities? I&apos;d love to hear from you.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Info */}
            <AnimatedSection delay={0.1}>
              <div className="space-y-6">
                <div className="premium-card rounded-3xl p-8">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                    Get in Touch
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg leading-relaxed">
                    I&apos;m currently open to freelance projects, full-time opportunities,
                    and interesting collaborations. Whether you have a question or just
                    want to say hi, my inbox is always open!
                  </p>

                  <div className="space-y-4">
                    {[
                      { icon: Mail, label: "Email", value: profile.email, href: profile.social.email },
                      { icon: Github, label: "GitHub", value: "@satyakiabhijit", href: profile.social.github },
                      { icon: Linkedin, label: "LinkedIn", value: "Abhijit Satyaki", href: profile.social.linkedin },
                    ].map((contact) => (
                      <a
                        key={contact.label}
                        href={contact.href}
                        target={contact.href.startsWith("mailto") ? undefined : "_blank"}
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-300 group"
                      >
                        <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-shadow">
                          <contact.icon size={20} />
                        </div>
                        <div>
                          <p className="text-sm text-slate-500 dark:text-slate-500">{contact.label}</p>
                          <p className="font-semibold text-slate-900 dark:text-white">
                            {contact.value}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Contact Form */}
            <AnimatedSection delay={0.2}>
              <ContactForm />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Certificate Image Modal */}
      <Modal
        isOpen={!!selectedCert}
        onClose={() => setSelectedCert(null)}
        title={selectedCert?.name}
      >
        {selectedCert && (
          <div className="p-6">
            <Image
              src={selectedCert.image}
              alt={selectedCert.name}
              width={800}
              height={600}
              className="rounded-lg w-full h-auto"
            />
          </div>
        )}
      </Modal>

      {/* Service Detail Modal */}
      <Modal
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        title={selectedService?.title}
      >
        {selectedService && (
          <div className="p-6">
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              {selectedService.description}
            </p>
          </div>
        )}
      </Modal>
    </>
  );
}
