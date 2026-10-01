import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-scroll';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Sun, Moon, ArrowUpRight, Menu, X } from 'lucide-react';

const Motion = motion;

const Navbar = ({ isDarkMode, toggleTheme }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const mobileMenuRef = useRef(null);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 20);
    });

    // Close mobile menu on desktop resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Close mobile menu on Escape key press
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isMobileMenuOpen]);

    // Close mobile menu on click or tap outside
    useEffect(() => {
        if (!isMobileMenuOpen) return;

        const handleClickOutside = (e) => {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
                setIsMobileMenuOpen(false);
            }
        };

        // Capture phase listeners on window to reliably catch all pointer and touch interactions
        window.addEventListener('pointerdown', handleClickOutside, true);
        window.addEventListener('touchstart', handleClickOutside, true);
        window.addEventListener('mousedown', handleClickOutside, true);

        return () => {
            window.removeEventListener('pointerdown', handleClickOutside, true);
            window.removeEventListener('touchstart', handleClickOutside, true);
            window.removeEventListener('mousedown', handleClickOutside, true);
        };
    }, [isMobileMenuOpen]);

    const desktopNavLinks = [
        { name: 'Home', target: 'hero' },
        { name: 'Skills', target: 'skills' },
        { name: 'Experience', target: 'experience' },
        { name: 'Contact', target: 'contact' },
    ];

    const mobileNavLinks = [
        { name: 'Home', target: 'hero' },
        { name: 'Skills', target: 'skills' },
        { name: 'Experience', target: 'experience' },
        { name: 'Projects', target: 'projects' },
        { name: 'Contact', target: 'contact' },
    ];

    return (
        <motion.nav
            className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-300 ${isScrolled ? 'pt-3' : 'pt-5'}`}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Desktop Navbar */}
            <div className={`
                hidden md:flex items-center gap-3 sm:gap-5 px-5 py-2.5 rounded-full border transition-all duration-300
                ${isScrolled
                    ? 'bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-zinc-200 dark:border-zinc-800 shadow-md'
                    : 'bg-zinc-900/5 dark:bg-zinc-900/60 backdrop-blur-md border-zinc-200/50 dark:border-zinc-800/50'
                }
            `}>
                {desktopNavLinks.map((item) => (
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

            {/* Mobile Navbar Container */}
            <div ref={mobileMenuRef} className="flex md:hidden flex-col w-full max-w-sm">
                <div className={`
                    flex items-center justify-between px-4 py-2.5 rounded-full border transition-all duration-300
                    ${isScrolled || isMobileMenuOpen
                        ? 'bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-zinc-200 dark:border-zinc-800 shadow-md'
                        : 'bg-zinc-900/5 dark:bg-zinc-900/60 backdrop-blur-md border-zinc-200/50 dark:border-zinc-800/50'
                    }
                `}>
                    {/* Branding on the left */}
                    <Link
                        to="hero"
                        spy={true}
                        smooth={true}
                        offset={-100}
                        duration={500}
                        role="button"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="font-bold text-xs tracking-tight text-zinc-900 dark:text-white cursor-pointer select-none flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-sm"
                        aria-label="Omololu Tofunmi Panda Home"
                    >
                        <span>Panda</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                    </Link>

                    {/* Controls on the right: Theme toggle & Hamburger menu */}
                    <div className="flex items-center gap-1.5">
                        <button
                            type="button"
                            onClick={toggleTheme}
                            className="p-1 rounded-full text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                            aria-label="Toggle Theme"
                        >
                            {isDarkMode ? <Sun size={15} /> : <Moon size={15} />}
                        </button>

                        <div className="w-px h-3.5 bg-zinc-200 dark:bg-zinc-800 mx-0.5" />

                        <button
                            type="button"
                            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                            className="p-1 rounded-full text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                            aria-expanded={isMobileMenuOpen}
                            aria-controls="mobile-nav-menu"
                            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                        >
                            {isMobileMenuOpen ? <X size={17} /> : <Menu size={17} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Dropdown Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            id="mobile-nav-menu"
                            initial={{ opacity: 0, y: -6, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -6, scale: 0.98 }}
                            transition={{ duration: 0.18, ease: "easeOut" }}
                            className="mt-2 p-2 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md shadow-lg flex flex-col gap-1 overflow-hidden"
                        >
                            {mobileNavLinks.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.target}
                                    spy={true}
                                    smooth={true}
                                    offset={-90}
                                    duration={500}
                                    role="button"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="px-3 py-2 rounded-xl text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors text-xs font-semibold select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                                    activeClass="!text-zinc-900 dark:!text-white font-bold bg-zinc-100 dark:bg-zinc-800/80"
                                >
                                    {item.name}
                                </Link>
                            ))}

                            <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-0.5 mx-1" />

                            <a
                                href="/resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="px-3 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 transition-all text-xs font-semibold flex items-center justify-between select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                                title="Open Official Resume PDF"
                            >
                                <span>Resume</span>
                                <ArrowUpRight size={13} />
                            </a>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
};

export default Navbar;
