import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/sections/Hero';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Contact from './components/sections/Contact';
import Preloader from './components/ui/Preloader';
import ParticlesBackground from './components/ui/ParticlesBackground';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-300 relative ${isDarkMode ? 'bg-zinc-950 text-zinc-100 selection:bg-white/20' : 'bg-white text-zinc-900 selection:bg-zinc-900/10'}`}>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <ParticlesBackground />
          <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
          <main className="pt-20 relative z-10">
            <Hero />
            <Skills />
            <Experience />
            <Contact />
          </main>

          <footer className="py-8 text-center text-sm border-t transition-colors duration-300 border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-black text-zinc-500 dark:text-zinc-600 relative z-10">
            <p>© {new Date().getFullYear()} Omololu Tofunmi (Panda). All rights reserved.</p>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;
