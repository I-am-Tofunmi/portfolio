import React from 'react';

const SkillCard = ({ title, items, className = "" }) => (
    <div className={`p-6 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 ${className} transition-colors duration-300`}>
        <h3 className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-4">{title}</h3>
        <div className="flex flex-wrap gap-2">
            {items.map((item) => (
                <span key={item} className="px-3 py-1 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 text-sm rounded-md border border-zinc-200 dark:border-zinc-700/50 transition-colors duration-300">
                    {item}
                </span>
            ))}
        </div>
    </div>
);

const Skills = () => {
    return (
        <section id="skills" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">Skills & Tech Stack</h2>
                <p className="text-zinc-600 dark:text-zinc-400 max-w-xl">
                    Full Stack Developer (Frontend & Backend) focused on building clean, responsive, and scalable web applications, RESTful APIs, and data analytics.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <SkillCard
                    title="Frontend"
                    items={["React", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Bootstrap", "Angular"]}
                />
                <SkillCard
                    title="Backend"
                    items={["Node.js", "Express", "NestJS", "REST APIs", "Zod", "Python", "Flask"]}
                />
                <SkillCard
                    title="Databases"
                    items={["PostgreSQL", "SQL"]}
                />
                <SkillCard
                    title="Data & Analytics"
                    items={["Python", "pandas", "seaborn", "Jupyter Notebook"]}
                />
                <SkillCard
                    title="Tools & DevOps"
                    items={["Git", "GitHub", "Postman", "Render", "Vercel", "dbdiagram.io"]}
                    className="md:col-span-2 lg:col-span-2"
                />
            </div>
        </section>
    );
};

export default Skills;
