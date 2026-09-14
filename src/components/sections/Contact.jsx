import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Send, Check, Loader2, Github, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
    const form = useRef();
    const [status, setStatus] = useState('idle');

    const sendEmail = (e) => {
        e.preventDefault();
        setStatus('sending');
        setTimeout(() => {
            setStatus('success');
            if (form.current) form.current.reset();
            setTimeout(() => setStatus('idle'), 3000);
        }, 1500);
    };

    return (
        <section id="contact" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-zinc-200 dark:border-zinc-900">
            <div className="grid md:grid-cols-2 gap-16">
                <div>
                    <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-6">Get in Touch.</h2>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed text-lg">
                        I'm open to opportunities, collaborations, and interesting projects.
                    </p>
                    
                    {/* Official Resume Contact Details */}
                    <div className="space-y-4 mb-8">
                        <a
                            href="mailto:tofunmiomololu44@gmail.com"
                            className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                        >
                            <Mail size={18} className="text-emerald-500 shrink-0" />
                            <span className="font-medium text-sm">tofunmiomololu44@gmail.com</span>
                        </a>

                        <a
                            href="tel:09135847444"
                            className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                        >
                            <Phone size={18} className="text-emerald-500 shrink-0" />
                            <span className="font-medium text-sm">09135847444</span>
                        </a>

                        <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
                            <MapPin size={18} className="text-emerald-500 shrink-0" />
                            <span className="font-medium text-sm">Abeokuta, Ogun State, Nigeria</span>
                        </div>
                    </div>

                    {/* Social Icon Links */}
                    <div className="flex flex-col gap-4">
                        <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                            Profiles
                        </span>
                        <div className="flex items-center gap-4">
                            <a
                                href="https://github.com/I-am-Tofunmi"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub Profile"
                                className="p-3.5 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 transition-all duration-200 shadow-sm flex items-center justify-center group"
                            >
                                <Github size={22} className="group-hover:scale-110 transition-transform" />
                            </a>

                            <a
                                href="https://www.linkedin.com/in/tofunmi-omololu-a33a00345/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn Profile"
                                className="p-3.5 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 transition-all duration-200 shadow-sm flex items-center justify-center group"
                            >
                                <Linkedin size={22} className="group-hover:scale-110 transition-transform" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="bg-zinc-50 dark:bg-zinc-900/50 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
                    <form ref={form} onSubmit={sendEmail} className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Name</label>
                            <input
                                type="text"
                                name="user_name"
                                required
                                className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-400 dark:focus:border-white/20 transition-colors"
                                placeholder="Your Name"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Email</label>
                            <input
                                type="email"
                                name="user_email"
                                required
                                className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-400 dark:focus:border-white/20 transition-colors"
                                placeholder="your.email@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Message</label>
                            <textarea
                                name="message"
                                required
                                rows="4"
                                className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-400 dark:focus:border-white/20 transition-colors resize-none"
                                placeholder="How can I help?"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status !== 'idle'}
                            className="w-full py-3 bg-zinc-900 dark:bg-white text-white dark:text-black font-semibold rounded-lg hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                        >
                            {status === 'idle' && <>Send Message</>}
                            {status === 'sending' && <Loader2 size={18} className="animate-spin" />}
                            {status === 'success' && <Check size={18} />}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
