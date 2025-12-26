"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Snowflake {
    id: number;
    x: number;
    size: number;
    duration: number;
    delay: number;
    opacity: number;
}

export default function WinterEffects() {
    const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(true);

    // Generate snowflakes
    useEffect(() => {
        const flakes: Snowflake[] = [];
        const flakeCount = 50;

        for (let i = 0; i < flakeCount; i++) {
            flakes.push({
                id: i,
                x: Math.random() * 100,
                size: Math.random() * 4 + 2,
                duration: Math.random() * 10 + 10,
                delay: Math.random() * 10,
                opacity: Math.random() * 0.6 + 0.2,
            });
        }
        setSnowflakes(flakes);
    }, []);

    // Mouse tracking
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        const handleMouseEnter = () => {
            setIsVisible(true);
        };

        window.addEventListener("mousemove", handleMouseMove);
        document.body.addEventListener("mouseleave", handleMouseLeave);
        document.body.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.body.removeEventListener("mouseleave", handleMouseLeave);
            document.body.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, []);

    return (
        <>
            {/* Snowfall Effect */}
            <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
                {snowflakes.map((flake) => (
                    <div
                        key={flake.id}
                        className="absolute top-0 text-white snowflake"
                        style={{
                            left: `${flake.x}%`,
                            fontSize: `${flake.size}px`,
                            opacity: flake.opacity,
                            animation: `snowfall ${flake.duration}s linear ${flake.delay}s infinite`,
                        }}
                    >
                        ❄
                    </div>
                ))}
            </div>

            {/* Mouse Glow Light Effect - Large ambient light */}
            <motion.div
                className="fixed pointer-events-none z-30 hidden md:block"
                animate={{
                    x: mousePosition.x - 200,
                    y: mousePosition.y - 200,
                    opacity: isVisible ? 1 : 0,
                }}
                transition={{
                    type: "spring",
                    damping: 25,
                    stiffness: 150,
                    mass: 0.5,
                }}
            >
                <div className="w-[400px] h-[400px] rounded-full bg-gradient-radial from-indigo-500/20 via-purple-500/10 to-transparent blur-3xl" />
            </motion.div>

            {/* Secondary smaller glow for more definition */}
            <motion.div
                className="fixed pointer-events-none z-30 hidden md:block"
                animate={{
                    x: mousePosition.x - 75,
                    y: mousePosition.y - 75,
                    opacity: isVisible ? 1 : 0,
                }}
                transition={{
                    type: "spring",
                    damping: 35,
                    stiffness: 200,
                    mass: 0.3,
                }}
            >
                <div className="w-[150px] h-[150px] rounded-full bg-gradient-radial from-indigo-400/15 via-purple-400/5 to-transparent blur-2xl" />
            </motion.div>
        </>
    );
}
