import React, { useState, useRef } from 'react';
import { ExternalLink, Github, ArrowUpRight, Award } from 'lucide-react';
import ImageLightbox from '../ui/ImageLightbox';

const ExperienceItem = ({
    role,
    company,
    period,
    location,
    description,
    bullets,
    status,
    githubUrl,
    liveUrl,
    tools,
    image,
    imageAlt,
    certificateImage,
    certificateImageAlt
}) => {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [certLightboxOpen, setCertLightboxOpen] = useState(false);
    const imageTriggerRef = useRef(null);
    const certTriggerRef = useRef(null);

    return (
    <div className="group border-l-2 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-100 pl-5 sm:pl-6 py-2 transition-colors duration-300">
        
        {/* Responsive Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5 sm:gap-4 mb-2">
            <h3 className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-white leading-snug">
                {role}
            </h3>

            {/* Status & Period Badge Wrapper */}
            <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
                {status && (
                    <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-semibold border ${
                        status === 'Awaiting Certificate'
                            ? 'bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/20'
                            : status === 'In Progress'
                            ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700'
                            : 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20'
                    }`}>
                        {status}
                    </span>
                )}
                {period && (
                    <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 font-medium">
                        {period}
                    </span>
                )}
            </div>
        </div>

        {/* Company & Action Links */}
        <div className="text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-3 flex items-center justify-between flex-wrap gap-2">
            <span>
                {company} {location && <span className="text-zinc-400 font-normal">({location})</span>}
            </span>
            
            {/* Action Links */}
            <div className="flex items-center gap-2.5">
                {certificateImage && (
                    <>
                        <button
                            ref={certTriggerRef}
                            type="button"
                            onClick={() => setCertLightboxOpen(true)}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-500/30 transition-all cursor-pointer shadow-2xs focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                            title={`View ${role} Certificate`}
                        >
                            <Award size={13} />
                            <span>View Certificate</span>
                        </button>

                        <ImageLightbox
                            src={certificateImage}
                            alt={certificateImageAlt || `${role} Certificate`}
                            isOpen={certLightboxOpen}
                            onClose={() => setCertLightboxOpen(false)}
                            triggerRef={certTriggerRef}
                        />
                    </>
                )}
                {githubUrl && (
                    <a
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700/60 transition-all shadow-2xs"
                        title="View GitHub Repository"
                    >
                        <Github size={13} />
                        <span>Repository</span>
                        <ArrowUpRight size={11} className="text-zinc-400" />
                    </a>
                )}
                {liveUrl && (
                    <a
                        href={liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-500/30 transition-all"
                        title="View Live Product"
                    >
                        <ExternalLink size={13} />
                        <span>Live Demo</span>
                    </a>
                )}
            </div>
        </div>

        {image ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start mt-1">
                <div className="lg:col-span-7 flex flex-col justify-between">
                    {description && (
                        <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-3">
                            {description}
                        </p>
                    )}

                    {bullets && bullets.length > 0 && (
                        <ul className="list-disc list-inside space-y-1.5 text-zinc-600 dark:text-zinc-400 text-sm mb-3">
                            {bullets.map((b, idx) => (
                                <li key={idx} className="leading-relaxed">{b}</li>
                            ))}
                        </ul>
                    )}

                    {tools && tools.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2 pt-2 border-t border-zinc-100 dark:border-zinc-900/60">
                            {tools.map((tool, idx) => (
                                <span
                                    key={idx}
                                    className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200/60 dark:border-zinc-800/60"
                                >
                                    {tool}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                <div className="lg:col-span-5 w-full">
                    {/* Image trigger button — opens lightbox */}
                    <button
                        ref={imageTriggerRef}
                        type="button"
                        onClick={() => setLightboxOpen(true)}
                        aria-label={`Preview screenshot: ${imageAlt || role}`}
                        className="w-full text-left overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 transition-all duration-300 group/img shadow-2xs focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-zoom-in"
                    >
                        <img
                            src={image}
                            alt={imageAlt || role}
                            className="w-full h-auto object-cover transition-transform duration-500 ease-out group-hover/img:scale-[1.02]"
                            loading="lazy"
                            draggable={false}
                        />
                    </button>

                    {/* Lightbox */}
                    <ImageLightbox
                        src={image}
                        alt={imageAlt || role}
                        isOpen={lightboxOpen}
                        onClose={() => setLightboxOpen(false)}
                        triggerRef={imageTriggerRef}
                    />
                </div>
            </div>
        ) : (
            <>
                {description && (
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed max-w-2xl mb-3">
                        {description}
                    </p>
                )}

                {bullets && bullets.length > 0 && (
                    <ul className="list-disc list-inside space-y-1.5 text-zinc-600 dark:text-zinc-400 text-sm max-w-2xl mb-3">
                        {bullets.map((b, idx) => (
                            <li key={idx} className="leading-relaxed">{b}</li>
                        ))}
                    </ul>
                )}

                {/* Tech Stack & Tools Pills */}
                {tools && tools.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-zinc-100 dark:border-zinc-900/60">
                        {tools.map((tool, idx) => (
                            <span
                                key={idx}
                                className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200/60 dark:border-zinc-800/60"
                            >
                                {tool}
                            </span>
                        ))}
                    </div>
                )}
            </>
        )}
    </div>
    );
};

const Experience = () => {
    const experiences = [
        {
            role: "Full Stack Developer Intern",
            company: "Toobrains",
            location: "Remote",
            period: "May 2026 – Present",
            bullets: [
                "Building RESTful APIs using Node.js and Express with Zod validation for input safety and consistency.",
                "Designing PostgreSQL schemas and writing migration files for structured, production-ready databases.",
                "Working across the stack with Angular and NestJS as part of a structured internship curriculum covering Git, SQL, Node.js, Express, Angular, and NestJS.",
                "Collaborating via Git/GitHub using structured PR workflows with code review by senior engineers."
            ],
            tools: ["Node.js", "Express", "Zod", "PostgreSQL", "Angular", "NestJS", "Git", "GitHub"]
        },
        {
            role: "Technical Operations — Contract",
            company: "Zora African Market",
            location: "Remote, UK-based",
            period: "May 2026 – Present",
            bullets: [
                "Managing product listings and backend data tasks for a UK-based African grocery e-commerce platform.",
                "Conducting monthly site checks and SEO optimizations to maintain search visibility and product accuracy.",
                "Collaborating with a remote team to ensure consistent product data and platform stability."
            ],
            tools: ["E-commerce Data", "SEO", "Technical Operations", "Product Catalog"]
        },
        {
            role: "Frontend Developer",
            company: "Cavista Hackathon",
            period: "Feb 2026",
            bullets: [
                "Led all frontend development for ElderCare AI, a voice-first web health support system for elderly users.",
                "Implemented medication reminders, health check-ins, inactivity detection, and caregiver alerts.",
                "Delivered multilingual support across English, Yoruba, Igbo, and Hausa."
            ],
            tools: ["React", "Web Speech API", "JavaScript", "Multilingual"]
        },
        {
            role: "Frontend Developer",
            company: "Lagos Impact Hackathon",
            period: "Dec 2025",
            bullets: [
                "Built frontend features for SafeFlow, an AI-powered financial safety platform.",
                "Integrated UI with a serverless AWS backend for real-time anomaly detection and financial insights."
            ],
            tools: ["React", "AWS Serverless", "Financial Safety", "Real-Time Anomaly Detection"]
        }
    ];

    const projects = [
        {
            role: "SquadMind — Frontend Engineer",
            company: "Squad Hackathon 3.0 (HabariPay/GTCO)",
            period: "2026",
            githubUrl: "https://github.com/I-am-Tofunmi/SquadMind",
            description: "Built an AI-powered financial intelligence and credit scoring platform for Nigerian SMEs at Squad Hackathon 3.0. Developed the React/Vite frontend as part of Team Technest; platform deployed to Vercel with FastAPI backend on Railway.",
            tools: ["React", "Vite", "FastAPI", "Railway", "Vercel"],
            image: "/squadmind.png",
            imageAlt: "SquadMind AI financial intelligence platform landing page"
        },
        {
            role: "ElderCare AI — Frontend Developer / Team Member",
            company: "Cavista Hackathon 2026",
            period: "Feb 2026",
            githubUrl: "https://github.com/I-am-Tofunmi/cavista-hackathon-2026-technest",
            description: "Collaborated on a voice-first support application designed to help elderly users interact with technology through accessible voice controls, medication reminders, multilingual interaction, and emergency assistance features.",
            tools: ["React", "Web Speech API", "JavaScript", "Healthcare"],
            image: "/eldercare-ai.png",
            imageAlt: "ElderCare AI voice-first assistant interface with voice controls, reminders, and SOS emergency button"
        },
        {
            role: "SafeFlow — Frontend Engineer",
            company: "Lagos Impact Hackathon",
            period: "Dec 2025",
            githubUrl: "https://github.com/I-am-Tofunmi/SafeFlow",
            description: "AI-powered financial safety application built to provide real-time transaction risk detection and security alerts.",
            tools: ["React", "AWS Serverless", "Financial Safety"],
            image: "/safeflow.png",
            imageAlt: "SafeFlow financial safety dashboard with TrustScore and security intelligence"
        },
        {
            role: "AgriWise — Frontend Engineer",
            company: "Hackathon Project",
            period: "2025",
            githubUrl: "https://github.com/I-am-Tofunmi/AgriWise",
            description: "Smart agriculture platform designed for data-driven crop insights and yield monitoring.",
            tools: ["React", "Python", "Smart Agriculture"],
            image: "/agriwise.png",
            imageAlt: "AgriWise AI-powered crop health analysis and detection interface"
        },
        {
            role: "Property Listings REST API",
            company: "Backend Project",
            period: "2026",
            githubUrl: "https://github.com/I-am-Tofunmi/property-listings-api",
            description: "Built a full property listings REST API with CRUD operations, Zod validation, and structured error handling. Implemented PostgreSQL schema with 5 normalized tables, migration files, and EXPLAIN ANALYZE for query optimization.",
            tools: ["Node.js", "Express", "Zod", "PostgreSQL", "SQL Schema"],
            image: "/property-listings-api.png",
            imageAlt: "Property Listings REST API endpoint testing and JSON response in API client"
        },
        {
            role: "Career Readiness & Tech Skill Gap — UNILAG 200L CS Students",
            company: "UNILAG 200L CS Research",
            period: "2025",
            githubUrl: "https://github.com/I-am-Tofunmi/unilag-career-readiness-analysis",
            description: "Designed and conducted a survey to analyze career readiness among 200-level CS students at UNILAG. Visualized findings and published results as a LinkedIn carousel with full project documented on GitHub.",
            tools: ["Python", "pandas", "seaborn", "Jupyter Notebook"],
            image: "/unilag-career-readiness.png",
            imageAlt: "UNILAG 200L CS career readiness survey data analysis presentation slide"
        },
        {
            role: "PrimaryConnect (Score & Grading Engine)",
            company: "UNILAG COS202 Group 11 Project",
            period: "2026",
            githubUrl: "https://github.com/olanihundaniel0-star/PrimaryConnect",
            description: "Offline, console-based school management system for a primary school built in Java & SQLite. Implemented the grading and score engine (40% test + 60% exam formula, A–F grade assignment, class ranking, and plain-text reporting).",
            tools: ["Java", "SQLite", "Grading Engine", "Console UI"],
            image: "/primaryconnect.png",
            imageAlt: "PrimaryConnect Java grading and reporting system console demonstration"
        },
        {
            role: "TrustLend (Cross-track Team)",
            company: "TechCrush Cohort 7 Capstone",
            period: "2026",
            githubUrl: "https://github.com/Ohenewa-a/Trust_lend",
            description: "Peer-to-peer micro-lending platform frontend interface built collaboratively as part of a cross-track cohort team.",
            tools: ["React", "Tailwind CSS", "Collaborative Capstone"]
        },
        {
            role: "PandaScroll",
            company: "MangaDex Reader API",
            period: "2025",
            description: "Manga reading site consuming the MangaDex API with smooth navigation and a responsive reader layout.",
            tools: ["React", "MangaDex API", "JavaScript"]
        },
        {
            role: "NotePad",
            company: "CRUD Web App",
            period: "2025",
            description: "Lightweight note-taking app with full CRUD functionality and a clean, minimal interface.",
            tools: ["React", "Flask", "Python", "CRUD"]
        }
    ];

    const certs = [
        {
            role: "Google Data Analysis with Python",
            company: "Coursera",
            period: "2026",
            status: "Completed",
            description: "Data analysis, pandas, NumPy, data cleaning, exploratory analysis, visualization.",
            certificateImage: "/certificates/google-data-analysis-python.png",
            certificateImageAlt: "Google Data Analysis with Python Specialization Certificate issued by Coursera"
        },
        {
            role: "Google IT Automation with Python Professional Certificate",
            company: "Coursera / ITExperience Scholarship",
            period: "Current",
            status: "In Progress",
            description: "Python automation, OS scripting, Git/GitHub, automation at scale."
        },
        {
            role: "ITExperience Orientation 2026",
            company: "IBM SkillsBuild",
            period: "2026",
            status: "Completed",
            description: "Completed the ITExperience Orientation 2026 program covering IT professional foundations via IBM SkillsBuild.",
            certificateImage: "/certificates/ibm-skillsbuild-orientation.png",
            certificateImageAlt: "IBM SkillsBuild Completion Certificate for ITExperience Orientation 2026"
        },
        {
            role: "3MTT-Microsoft Skilling Program",
            company: "3MTT Fellow ID: FE/26/9477818109",
            period: "2026",
            status: "Completed",
            description: "Fellow in the 3MTT-Microsoft technical skilling program."
        },
        {
            role: "TechCrush Cohort 7 Frontend Development Certificate",
            company: "TechCrush (ACTD-Accredited, USA)",
            period: "2026",
            status: "Completed",
            description: "Frontend Development Certificate — Credential ID: TEC-A32BFFC3.",
            certificateImage: "/certificates/techcrush-frontend-development.png",
            certificateImageAlt: "TechCrush 15-week Bootcamp Scholarship Frontend Development Certificate of Completion"
        },
        {
            role: "NITHUB Python Training Program",
            company: "NITHUB (University of Lagos)",
            period: "2026",
            status: "Awaiting Certificate",
            description: "Completed Python Training Program with Capstone: CLI-based SQLite task tracker."
        },
        {
            role: "Responsive Portfolio Website with HTML, CSS & Netlify",
            company: "Udemy",
            period: "2025",
            status: "Completed",
            description: "Responsive frontend development and Netlify deployment certification.",
            certificateImage: "/certificates/udemy-responsive-portfolio.png",
            certificateImageAlt: "Udemy Certificate of Completion for Responsive Portfolio Website with HTML CSS Netlify"
        }
    ];

    return (
        <section id="experience" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
            {/* Work Section */}
            <div className="grid md:grid-cols-4 gap-12 mb-20">
                <div className="md:col-span-1">
                    <h2 className="text-3xl font-bold text-zinc-900 dark:text-white sticky top-24">Experience</h2>
                </div>
                <div className="md:col-span-3 space-y-10">
                    {experiences.map((exp, index) => (
                        <ExperienceItem key={index} {...exp} />
                    ))}
                </div>
            </div>

            {/* Projects Section */}
            <div id="projects" className="grid md:grid-cols-4 gap-12 mb-20 border-t border-zinc-200 dark:border-zinc-900 pt-20">
                <div className="md:col-span-1">
                    <h2 className="text-3xl font-bold text-zinc-900 dark:text-white sticky top-24">Projects</h2>
                </div>
                <div className="md:col-span-3 space-y-10">
                    {projects.map((proj, index) => (
                        <ExperienceItem key={index} {...proj} />
                    ))}
                </div>
            </div>

            {/* Certifications Section */}
            <div className="grid md:grid-cols-4 gap-12 border-t border-zinc-200 dark:border-zinc-900 pt-20">
                <div className="md:col-span-1">
                    <h2 className="text-3xl font-bold text-zinc-900 dark:text-white sticky top-24">Certifications</h2>
                </div>
                <div className="md:col-span-3 space-y-10">
                    {certs.map((cert, index) => (
                        <ExperienceItem key={index} {...cert} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
