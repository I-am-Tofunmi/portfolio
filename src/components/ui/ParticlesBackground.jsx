import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const ParticlesBackground = () => {
    // Generate a fixed set of floating glowing particle nodes
    const particles = useMemo(() => {
        return Array.from({ length: 45 }).map((_, i) => ({
            id: i,
            size: Math.random() * 4 + 3, // 3px - 7px
            x: Math.random() * 100, // 0 - 100%
            y: Math.random() * 100, // 0 - 100%
            duration: Math.random() * 12 + 10, // 10s - 22s float duration
            delay: Math.random() * 5,
            isEmerald: i % 3 === 0,
        }));
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className={`absolute rounded-full ${
                        p.isEmerald
                            ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.7)]'
                            : 'bg-zinc-400 dark:bg-zinc-500 shadow-[0_0_6px_rgba(161,161,170,0.5)]'
                    }`}
                    style={{
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                    }}
                    animate={{
                        y: ["0vh", "-100vh"],
                        x: ["0px", `${(p.id % 2 === 0 ? 1 : -1) * 35}px`],
                        opacity: [0, 0.6, 0.8, 0.4, 0],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        ease: "linear",
                        delay: p.delay,
                    }}
                />
            ))}
        </div>
    );
};

export default ParticlesBackground;
