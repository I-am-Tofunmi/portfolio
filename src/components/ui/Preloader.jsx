import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const words = ["Hello", "Bonjour", "Ciao", "Olà", "やあ", "Hallå"];

const Preloader = ({ onComplete }) => {
    const [index, setIndex] = useState(0);
    const [dimension, setDimension] = useState({ width: 0, height: 0 });

    useEffect(() => {
        setDimension({ width: window.innerWidth, height: window.innerHeight });
    }, []);

    useEffect(() => {
        if (index === words.length - 1) {
            const timer = setTimeout(() => {
                onComplete();
            }, 1000);
            return () => clearTimeout(timer);
        }

        // specific delay for the first word "Hello" to be visible longer
        // 500ms is the sweet spot: fast enough to not bore, slow enough to read
        const delay = index === 0 ? 500 : 180;

        const timeout = setTimeout(() => {
            setIndex(index + 1);
        }, delay);

        return () => clearTimeout(timeout);
    }, [index, onComplete]);

    return (
        <motion.div
            initial={{ y: 0 }}
            exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950 text-white"
        >
            <motion.p
                className="text-5xl md:text-7xl font-bold flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <span className="w-4 h-4 rounded-full bg-white mr-4 inline-block animate-pulse"></span>
                {words[index]}
            </motion.p>
        </motion.div>
    );
};

export default Preloader;
