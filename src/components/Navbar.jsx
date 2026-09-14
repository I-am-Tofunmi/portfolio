import React, { useState } from 'react';
import { Link } from 'react-scroll';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Sun, Moon, FileText } from 'lucide-react';

const Navbar = ({ isDarkMode, toggleTheme }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 20);
    });

    return (
        <motion.nav
            className={`fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 transition-all duration-300 ${isScrolled ? 'pt-4' : 'pt-6'}`}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className={`
        flex items-center gap-5 sm:gap-6 px-6 py-3 rounded-full border transition-all duration-300
        ${isScrolled
                    ? 'bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-zinc-200 dark:border-zinc-800 shadow-lg'
                    : 'bg-transparent border-transparent'
                }
      `}>
                {['Hero', 'Skills', 'Experience', 'Contact'].map((item) => (
                    <Link
                        key={item}
                        to={item.toLowerCase()}
                        spy={true}
                        smooth={true}
                        offset={-100}
                        duration={500}
                        className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer transition-colors text-sm font-medium"
                        activeClass="text-zinc-900 dark:text-white font-semibold"
                    >
                        {item}
                    </Link>
                ))}

                <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 cursor-pointer transition-colors text-sm font-medium flex items-center gap-1.5"
                    title="Open Official Resume Document (PDF)"
                >
                    <FileText size={14} />
                    <span>Resume</span>
                </a>

                <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-700" />

                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    aria-label="Toggle Theme"
                >
                    {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>
            </div>
        </motion.nav>
    );
};

export default Navbar;
