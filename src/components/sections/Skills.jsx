import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Database, Server } from "lucide-react";
import { FaJava } from "react-icons/fa";
import {
    SiKotlin, SiTypescript, SiPython, SiReact, SiCss3,
    SiTailwindcss, SiNodedotjs, SiSpringboot,
    SiMysql, SiMongodb, SiMariadb, SiRedis, SiPostgresql, SiSqlite,
    SiKubernetes, SiDocker, SiGit, SiGradle, SiApachemaven,
    SiGrafana, SiGithubactions,
} from "react-icons/si";

const skillCategories = [
    {
        name: "Languages & Frameworks",
        icon: Code2,
        color: "#818cf8",
        items: [
            { name: "Java", icon: FaJava, color: "#e76f00" },
            { name: "Kotlin", icon: SiKotlin, color: "#7f52ff" },
            { name: "Spring Boot", icon: SiSpringboot, color: "#6db33f" },
            { name: "TypeScript", icon: SiTypescript, color: "#3178c6" },
            { name: "React", icon: SiReact, color: "#61dafb" },
            { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06b6d4" },
            { name: "CSS", icon: SiCss3, color: "#1572b6" },
            { name: "Node.js", icon: SiNodedotjs, color: "#5fa04e" },
            { name: "Python", icon: SiPython, color: "#3776ab" },
        ],
    },
    {
        name: "Data Storage",
        icon: Database,
        color: "#22d3ee",
        items: [
            { name: "MySQL", icon: SiMysql, color: "#4479a1" },
            { name: "PostgreSQL", icon: SiPostgresql, color: "#4169e1" },
            { name: "MariaDB", icon: SiMariadb, color: "#003545" },
            { name: "MongoDB", icon: SiMongodb, color: "#47a248" },
            { name: "Redis", icon: SiRedis, color: "#dc382d" },
            { name: "SQLite", icon: SiSqlite, color: "#003b57" },
        ],
    },
    {
        name: "DevOps & Tooling",
        icon: Server,
        color: "#a78bfa",
        items: [
            { name: "Docker", icon: SiDocker, color: "#2496ed" },
            { name: "Kubernetes", icon: SiKubernetes, color: "#326ce5" },
            { name: "Git", icon: SiGit, color: "#f05032" },
            { name: "GitHub Actions", icon: SiGithubactions, color: "#2088ff" },
            { name: "Gradle", icon: SiGradle, color: "#02303a" },
            { name: "Maven", icon: SiApachemaven, color: "#c71a36" },
            { name: "Grafana", icon: SiGrafana, color: "#f46800" },
        ],
    },
];

function SkillItem({ skill, delay }) {
    const Icon = skill.icon;
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.3, delay }}
            className="skill-item group"
        >
            {Icon && (
                <Icon
                    className="w-4 h-4 flex-shrink-0"
                    style={{ color: skill.color }}
                />
            )}
            <span>{skill.name}</span>
        </motion.div>
    );
}

export default function Skills() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false });

    return (
        <section id="skills" className="py-24 px-6 lg:px-8">
            <div className="max-w-7xl mx-auto" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                    animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                        Technologies
                    </h2>
                    <p className="text-base max-w-lg" style={{ color: "var(--color-text-secondary)" }}>
                        Tools and technologies I work with daily.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 [&>*:last-child:nth-child(odd)]:md:col-span-2 [&>*:last-child:nth-child(odd)]:md:max-w-[calc(50%-0.5rem)] [&>*:last-child:nth-child(odd)]:md:mx-auto">
                    {skillCategories.map((category, catIdx) => {
                        const CatIcon = category.icon;
                        return (
                            <motion.div
                                key={category.name}
                                initial={{ opacity: 0, y: 25, filter: "blur(6px)" }}
                                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                viewport={{ once: false }}
                                transition={{ duration: 0.6, delay: catIdx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className="skill-card rounded-2xl p-6 relative overflow-hidden group"
                                style={{
                                    background: "var(--color-surface)",
                                    border: "1px solid var(--color-border)",
                                }}
                            >
                                <div className="flex items-center gap-3 mb-5">
                                    <div
                                        className="w-9 h-9 rounded-lg flex items-center justify-center"
                                        style={{
                                            background: `${category.color}18`,
                                            boxShadow: `0 0 16px ${category.color}20`,
                                        }}
                                    >
                                        <CatIcon className="w-4 h-4" style={{ color: category.color }} />
                                    </div>
                                    <h3
                                        className="text-xs uppercase tracking-[0.15em] font-semibold"
                                        style={{ color: "var(--color-text-muted)" }}
                                    >
                                        {category.name}
                                    </h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {category.items.map((skill, i) => (
                                        <SkillItem
                                            key={skill.name}
                                            skill={skill}
                                            delay={catIdx * 0.1 + i * 0.04}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
