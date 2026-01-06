"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email";
        }

        if (!formData.message.trim()) {
            newErrors.message = "Message is required";
        } else if (formData.message.length < 10) {
            newErrors.message = "Message must be at least 10 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setStatus("loading");

        // Create mailto link with prefilled data
        const subject = encodeURIComponent(`Message from ${formData.name} via Portfolio`);
        const body = encodeURIComponent(
            `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
        );
        const mailtoLink = `mailto:abhijitsatyaki29@gmail.com?subject=${subject}&body=${body}`;

        // Small delay for UX, then open email client
        await new Promise((resolve) => setTimeout(resolve, 500));

        window.open(mailtoLink, "_self");

        setStatus("success");
        setFormData({ name: "", email: "", message: "" });

        // Reset status after 5 seconds
        setTimeout(() => setStatus("idle"), 5000);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="premium-card rounded-3xl p-8"
        >
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                Send a Message
            </h3>

            <div className="space-y-5">
                {/* Name Field */}
                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
                    >
                        Your Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Firstname Lastname"
                        className={`w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-2 ${errors.name
                            ? "border-red-400 dark:border-red-500 focus:border-red-500"
                            : "border-slate-200 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-500"
                            } text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all duration-300`}
                    />
                    {errors.name && (
                        <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle size={14} /> {errors.name}
                        </p>
                    )}
                </div>

                {/* Email Field */}
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
                    >
                        Your Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="email@example.com"
                        className={`w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-2 ${errors.email
                            ? "border-red-400 dark:border-red-500 focus:border-red-500"
                            : "border-slate-200 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-500"
                            } text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all duration-300`}
                    />
                    {errors.email && (
                        <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle size={14} /> {errors.email}
                        </p>
                    )}
                </div>

                {/* Message Field */}
                <div>
                    <label
                        htmlFor="message"
                        className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
                    >
                        Your Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Tell me about your project or opportunity..."
                        className={`w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-2 ${errors.message
                            ? "border-red-400 dark:border-red-500 focus:border-red-500"
                            : "border-slate-200 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-500"
                            } text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all duration-300 resize-none`}
                    />
                    {errors.message && (
                        <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle size={14} /> {errors.message}
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <motion.button
                    type="submit"
                    disabled={status === "loading" || status === "success"}
                    className={`w-full py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${status === "success"
                        ? "bg-green-500 text-white"
                        : status === "loading"
                            ? "bg-indigo-400 text-white cursor-not-allowed"
                            : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/30"
                        }`}
                    whileHover={status === "idle" ? { scale: 1.01 } : {}}
                    whileTap={status === "idle" ? { scale: 0.99 } : {}}
                >
                    {status === "success" ? (
                        <>
                            <CheckCircle size={20} />
                            Message Sent Successfully!
                        </>
                    ) : status === "loading" ? (
                        <>
                            <Loader2 size={20} className="animate-spin" />
                            Sending...
                        </>
                    ) : (
                        <>
                            <Send size={20} />
                            Send Message
                        </>
                    )}
                </motion.button>
            </div>
        </motion.form>
    );
}
