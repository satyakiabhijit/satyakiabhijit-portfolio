"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
}

export default function Modal({ isOpen, onClose, children, title }: ModalProps) {
    // Close modal on Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed inset-0 z-[101] flex items-end sm:items-center justify-center sm:p-4"
                    >
                        <div
                            className="relative bg-white dark:bg-slate-900 rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-4xl max-h-[90vh] sm:max-h-[90vh] overflow-hidden border-t sm:border border-slate-200 dark:border-slate-700"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            {title && (
                                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-200 dark:border-slate-700">
                                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white pr-2">
                                        {title}
                                    </h3>
                                    <button
                                        onClick={onClose}
                                        className="p-2 sm:p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex-shrink-0 touch-manipulation"
                                        aria-label="Close modal"
                                    >
                                        <X size={24} className="text-slate-500 sm:w-5 sm:h-5" />
                                    </button>
                                </div>
                            )}

                            {/* Close button if no title */}
                            {!title && (
                                <button
                                    onClick={onClose}
                                    className="absolute top-2 right-2 sm:top-4 sm:right-4 p-2.5 sm:p-2 rounded-full sm:rounded-lg bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-800 transition-colors z-10 touch-manipulation shadow-lg sm:shadow-none"
                                    aria-label="Close modal"
                                >
                                    <X size={24} className="text-slate-500 sm:w-5 sm:h-5" />
                                </button>
                            )}

                            {/* Content */}
                            <div className="overflow-y-auto max-h-[calc(95vh-70px)] sm:max-h-[calc(90vh-80px)] overscroll-contain">
                                {children}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
