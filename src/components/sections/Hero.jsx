import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-scroll';
import { ArrowDown, Code2, Terminal, Cpu, Sparkles, Layers } from 'lucide-react';

const Hero = () => {
    const [imgError, setImgError] = useState(false);
    const cardRef = useRef(null);

    // Mouse position relative to card for interactive spotlight & 3D tilt
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring physics for tilt
    const springConfig = { stiffness: 400, damping: 25 };
    const tiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [18, -18]), springConfig);
    const tiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-18, 18]), springConfig);

    // Mouse spotlight coordinates (in pixels relative to card)
    const spotlightX = useMotionValue(200);
    const spotlightY = useMotionValue(250);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return;
        const rect = cardRef.current.getBoundingClientRect();
        
        const xPos = e.clientX - rect.left;
        const yPos = e.clientY - rect.top;

        spotlightX.set(xPos);
        spotlightY.set(yPos);

        const xPct = xPos / rect.width - 0.5;
        const yPct = yPos / rect.height - 0.5;

        mouseX.set(xPct);
        mouseY.set(yPct);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
        spotlightX.set(200);
        spotlightY.set(250);
    };

    return (
        <section id="hero" className="min-h-[90vh] flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto py-12 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full relative z-10">
                
                {/* Left Aligned Content Composition */}
                <motion.div
                    className="lg:col-span-7 flex flex-col items-start text-left"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase bg-emerald-100 dark:bg-emerald-500/10 rounded-full border border-emerald-200 dark:border-emerald-500/20">
                            Available for work
                        </span>
                        <span className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                            Hello, I'm <span className="text-zinc-900 dark:text-white font-bold">Panda</span> (Omololu Tofunmi)
                        </span>
                    </div>

                    <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-500 mb-2">
                        FULL STACK DEVELOPER
                    </span>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6">
                        Full Stack Developer building <span className="text-zinc-500 dark:text-zinc-500">scalable digital experiences.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mb-10 leading-relaxed">
                        I build modern web applications across the frontend and backend — from interfaces to APIs, databases, and deployment. I also use Python for automation and data-driven work.
                    </p>

                    <div className="flex gap-4 justify-start flex-wrap">
                        <Link
                            to="experience"
                            smooth={true}
                            offset={-50}
                            duration={500}
                            role="button"
                            className="px-8 py-3 bg-zinc-900 dark:bg-white text-white dark:text-black font-semibold rounded-lg hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors shadow-lg shadow-zinc-200/50 dark:shadow-none cursor-pointer inline-flex items-center justify-center select-none"
                        >
                            View Projects
                        </Link>
                        <Link
                            to="contact"
                            smooth={true}
                            offset={-50}
                            duration={500}
                            role="button"
                            className="px-8 py-3 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 font-medium rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer inline-flex items-center justify-center select-none"
                        >
                            Contact Me
                        </Link>
                    </div>
                </motion.div>

                {/* Right Column — Ultra-Interactive Photo Experience */}
                <motion.div
                    className="lg:col-span-5 flex justify-center lg:justify-end w-full"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    style={{ perspective: "1200px" }}
                >
                    <div className="relative w-full max-w-md">
                        
                        {/* Orbiting Floating Badge 1 (Top Left) */}
                        <motion.div
                            animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
                            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-4 -left-4 z-40 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 shadow-xl flex items-center gap-2 text-xs font-semibold text-zinc-800 dark:text-zinc-200"
                        >
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span>Full Stack & APIs</span>
                        </motion.div>

                        {/* Orbiting Floating Badge 2 (Bottom Right) */}
                        <motion.div
                            animate={{ y: [0, 10, 0], x: [0, -6, 0] }}
                            transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            className="absolute -bottom-4 -right-4 z-40 px-3 py-1.5 rounded-xl bg-zinc-900 dark:bg-black text-white backdrop-blur-md border border-zinc-700/80 shadow-xl flex items-center gap-2 text-xs font-mono"
                        >
                            <Terminal size={14} className="text-emerald-400" />
                            <span>Python & Automation</span>
                        </motion.div>

                        {/* Animated Neon Border Runner */}
                        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-emerald-500 via-zinc-400 to-emerald-500 opacity-30 group-hover:opacity-70 blur-md transition duration-500 animate-pulse" />

                        {/* Interactive 3D Card Container with Cursor Spotlight */}
                        <motion.div
                            ref={cardRef}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            style={{
                                rotateX: tiltX,
                                rotateY: tiltY,
                                transformStyle: "preserve-3d",
                            }}
                            className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 p-2 shadow-2xl transition-all duration-300 group cursor-pointer"
                        >
                            {/* Dynamic Mouse Cursor Radial Spotlight Beam */}
                            <motion.div
                                className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300 opacity-0 group-hover:opacity-100 rounded-2xl"
                                style={{
                                    background: `radial-gradient(400px circle at ${spotlightX.get()}px ${spotlightY.get()}px, rgba(16, 185, 129, 0.25), transparent 70%)`,
                                }}
                            />

                            {/* Outer Frame Sheen */}
                            <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-tr from-white/10 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Main Image Layer (3D Depth Lifted) */}
                            <div className="relative w-full h-full rounded-xl overflow-hidden bg-zinc-950" style={{ transform: "translateZ(40px)" }}>
                                {!imgError ? (
                                    <img
                                        src="/profile.jpg"
                                        alt="Omololu Tofunmi (Panda)"
                                        onError={() => setImgError(true)}
                                        className="w-full h-full object-cover rounded-xl group-hover:scale-108 transition-transform duration-700 ease-out"
                                    />
                                ) : (
                                    <div className="w-full h-full rounded-xl bg-zinc-950 flex flex-col justify-between p-6 text-white border border-zinc-800 font-mono">
                                        <div className="flex justify-between items-center text-xs text-zinc-500 border-b border-zinc-800 pb-3">
                                            <span>panda.dev</span>
                                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                        </div>
                                        <div className="my-auto space-y-3">
                                            <div className="text-2xl font-bold text-white font-sans">Omololu Tofunmi</div>
                                            <div className="text-xs text-emerald-400">Full Stack Developer</div>
                                            <div className="text-xs text-zinc-400 leading-relaxed bg-zinc-900 p-3 rounded border border-zinc-800">
                                                // Student @ UNILAG<br />
                                                // Full Stack + Python
                                            </div>
                                        </div>
                                        <div className="text-[11px] text-zinc-500 pt-3 border-t border-zinc-800">
                                            Abeokuta & Lagos, Nigeria
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>

                    </div>
                </motion.div>

            </div>

            <motion.div
                className="mt-12 self-center text-zinc-400 dark:text-zinc-600 animate-bounce hidden md:block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
            >
                <ArrowDown size={20} />
            </motion.div>
        </section>
    );
};

export default Hero;
