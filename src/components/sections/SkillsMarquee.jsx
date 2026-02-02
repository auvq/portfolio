import { motion } from "framer-motion";

const skills = [
    "Java", "Kotlin", "TypeScript", "React", "CSS", "Python", "Git",
    "Redis", "MySQL", "MongoDB", "MariaDB", "Kubernetes", "Docker",
    "Gradle", "Maven", "Spigot", "Paper", "Velocity", "BungeeCord",
];

function SkillPill({ name }) {
    return (
        <motion.div
            className="flex-shrink-0 px-8 py-4 rounded-2xl border-2 border-neutral-800 bg-neutral-900/70 text-white font-bold text-lg cursor-default relative overflow-hidden group"
            whileHover={{ scale: 1.05, borderColor: "rgb(82 82 82)", transition: { duration: 0.2 } }}
        >
            <span className="relative z-10">{name}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
        </motion.div>
    );
}

function MarqueeRow({ items, direction = "left", speed = 30 }) {
    const duplicatedItems = [...items, ...items, ...items, ...items];

    return (
        <div className="relative overflow-hidden py-3 w-full">
            <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

            <motion.div
                className="flex gap-5 w-max"
                animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
                transition={{ x: { duration: speed, repeat: Infinity, ease: "linear" } }}
            >
                {duplicatedItems.map((skill, index) => (
                    <SkillPill key={`${skill}-${index}`} name={skill} />
                ))}
            </motion.div>
        </div>
    );
}

export default function SkillsMarquee() {
    const firstRow = skills.slice(0, Math.ceil(skills.length / 2));
    const secondRow = skills.slice(Math.ceil(skills.length / 2));

    return (
        <section id="skills" className="py-32 w-full overflow-hidden">
            <div className="w-full px-6 mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                        Skills & Technologies
                    </h2>
                    <p className="text-neutral-400 text-lg max-w-xl mx-auto">
                        Tools and technologies I work with daily
                    </p>
                </motion.div>
            </div>

            <div className="w-full space-y-5">
                <MarqueeRow items={firstRow} direction="left" speed={20} />
                <MarqueeRow items={secondRow} direction="right" speed={25} />
            </div>
        </section>
    );
}
