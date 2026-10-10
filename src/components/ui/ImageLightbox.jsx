import React, { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// Alias satisfies eslint varsIgnorePattern /^[A-Z_]/ while keeping motion usable
const Motion = motion;

/**
 * ImageLightbox — Reusable modal image preview.
 *
 * Props:
 *   src       {string}   Image source URL.
 *   alt       {string}   Accessible alt text.
 *   isOpen    {boolean}  Whether the lightbox is visible.
 *   onClose   {function} Callback to close the lightbox.
 *   triggerRef {React.RefObject} Ref of the element that opened the modal,
 *              so focus can be returned to it on close.
 */
const ImageLightbox = ({ src, alt, isOpen, onClose, triggerRef }) => {
    const closeBtnRef = useRef(null);

    // Close on Escape; focus-trap inside modal
    useEffect(() => {
        if (!isOpen) return;

        // Move focus to close button when modal opens
        const raf = requestAnimationFrame(() => {
            closeBtnRef.current?.focus();
        });

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
                return;
            }
            // Basic focus trap: Tab only cycles within the modal's close button
            // (the only interactive element inside). Prevent leaving.
            if (e.key === 'Tab') {
                e.preventDefault();
                closeBtnRef.current?.focus();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        // Prevent background scroll
        const scrollY = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';
        document.body.style.overflowY = 'scroll';

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            cancelAnimationFrame(raf);

            // Restore background scroll
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.overflowY = '';
            window.scrollTo(0, scrollY);
        };
    }, [isOpen, onClose]);

    // Return focus to trigger when modal closes
    const handleClose = useCallback(() => {
        onClose();
        // Use setTimeout to ensure the modal has unmounted before returning focus
        setTimeout(() => {
            triggerRef?.current?.focus();
        }, 50);
    }, [onClose, triggerRef]);

    // Close on backdrop click (not on image itself)
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    role="dialog"
                    aria-modal="true"
                    aria-label={`Preview: ${alt}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    onClick={handleBackdropClick}
                    className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8 bg-black/70 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 10 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="relative w-full max-w-4xl"
                    >
                        {/* Close button */}
                        <button
                            ref={closeBtnRef}
                            type="button"
                            onClick={handleClose}
                            aria-label="Close image preview"
                            className="absolute -top-3 -right-3 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-zinc-900 dark:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-700 dark:hover:bg-zinc-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 shadow-lg"
                        >
                            <X size={15} />
                        </button>

                        {/* Image */}
                        <div className="overflow-hidden rounded-xl border border-zinc-700/60 bg-zinc-900 shadow-2xl max-h-[85vh] flex items-center justify-center">
                            <img
                                src={src}
                                alt={alt}
                                className="w-full h-auto max-h-[85vh] object-contain block"
                                draggable={false}
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ImageLightbox;
