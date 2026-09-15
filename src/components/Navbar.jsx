import React, { useState } from 'react';
import { Link } from 'react-scroll';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Sun, Moon, ArrowUpRight } from 'lucide-react';

const Navbar = ({ isDarkMode, toggleTheme }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 20);
    });

    const navLinks = [
        { name: 'Home', target: 'hero' },
        { name: 'Skills', target: 'skills' },
        { name: 'Experience', target: 'experience' },
        { name: 'Contact', target: 'contact' },
    ];

    return (
        <motion.nav
            className={`fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 transition-all duration-300 ${isScrolled ? 'pt-3' : 'pt-5'}`}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className={`
                flex items-center gap-3 sm:gap-5 px-5 py-2.5 rounded-full border transition-all duration-300
                ${isScrolled
                    ? 'bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-zinc-200 dark:border-zinc-800 shadow-md'
                    : 'bg-zinc-900/5 dark:bg-zinc-900/60 backdrop-blur-md border-zinc-200/50 dark:border-zinc-800/50'
                }
            `}>
                {navLinks.map((item) => (
                    <Link
                        key={item.name}
                        to={item.target}
                        spy={true}
                        smooth={true}
                        offset={-100}
                        duration={500}
                        role="button"
                        className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer transition-colors text-xs font-semibold select-none"
                        activeClass="text-zinc-900 dark:text-white font-bold"
                    >
                        {item.name}
                    </Link>
                ))}

                <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 transition-all text-xs font-semibold flex items-center gap-1 select-none"
                    title="Open Official Resume PDF"
                >
                    <span>Resume</span>
                    <ArrowUpRight size={12} />
                </a>

                <div className="w-px h-3.5 bg-zinc-200 dark:bg-zinc-800 mx-0.5" />

                <button
                    type="button"
                    onClick={toggleTheme}
                    className="p-1 rounded-full text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors cursor-pointer select-none"
                    aria-label="Toggle Theme"
                >
                    {isDarkMode ? <Sun size={15} /> : <Moon size={15} />}
                </button>
            </div>
        </motion.nav>
    );
};

export default Navbar;
