import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Copy, Check, ExternalLink, Users, ArrowUpRight } from "lucide-react";
import { FaDiscord } from "react-icons/fa";

import pokehubImg from "../../assets/pokehub.png";
import tavernmcImg from "../../assets/tavernmc.png";
import archImg from "../../assets/arch.png";
import minefruitImg from "../../assets/minefruit.png";
import minerancherImg from "../../assets/minerancher.png";
import hyclashImg from "../../assets/hyclash.png";

const experiences = [
    {
        title: "HyClash",
        role: "Lead Game Developer",
        description: "Hytale server featuring an open-world MMORPG with character progression, stronghold building, and resource plundering, alongside classic minigames.",
        startDate: "Jan '26",
        endDate: "Now",
        players: null,
        image: hyclashImg,
        link: "https://discord.gg/hyclash",
        website: "https://hyclash.com",
        ip: "play.hyclash.com",
        ongoing: true,
        featured: true,
    },
    {
        title: "ArchMC",
        role: "Developer",
        description: "Large PVP & mini-games Minecraft server with a focus on competitive gameplay and community engagement.",
        startDate: "Jul '25",
        endDate: "Now",
        players: "~800 avg / 1.4k peak",
        image: archImg,
        link: "https://discord.gg/archmc",
        ip: "arch.mc",
        ongoing: true,
    },
    {
        title: "PokeHub",
        role: "Developer",
        description: "One of the largest Cobblemon Minecraft servers, truly a unique experience.",
        startDate: "Feb '25",
        endDate: "Now",
        players: "~200 avg",
        image: pokehubImg,
        link: "https://discord.gg/poke-hub",
        ip: "play.pokehub.org",
        ongoing: true,
    },
    {
        title: "TavernMC",
        role: "Developer",
        description: "One of the largest MMO and survival Minecraft servers. Focused on player gameplay more than any other server.",
        startDate: "Aug '24",
        endDate: "Feb '25",
        players: "~350 avg",
        image: tavernmcImg,
        link: "https://discord.gg/tavernmc",
        ip: "play.tavernmc.net",
    },
    {
        title: "MineRancher",
        role: "Head Developer",
        description: "Massive project attempting to recreate the Slime Rancher game in Minecraft. Focused on creating a unique tycoon experience for players.",
        startDate: "Jul '24",
        endDate: "Dec '24",
        players: "Unreleased",
        image: minerancherImg,
        link: "https://discord.gg/minerancher",
        ip: "play.minerancher.com",
        ipOffline: true,
    },
    {
        title: "Minefruit",
        role: "Developer",
        description: "Incredible server with unique concepts, always looked forward to expanding and creating new gamemodes.",
        startDate: "Nov '22",
        endDate: "Apr '24",
        players: "~250 avg",
        image: minefruitImg,
        link: "https://discord.gg/minefruit",
        ip: "play.minefruit.org",
    },
    {
        title: "Freelancing",
        role: "Freelance Developer",
        description: "Working with clients on a variety of projects, from small plugins to large server networks. Always looking for new opportunities ;)",
        startDate: "2018",
        endDate: "Now",
        players: null,
        image: "https://mc-heads.net/avatar/auvq/128",
        link: "https://discord.com/users/804763492753866822",
        ip: null,
        ongoing: true,
    },
];

function CopyIPButton({ ip, offline }) {
    const [copied, setCopied] = useState(false);
    if (!ip) return null;

    return (
        <button
            onClick={() => {
                navigator.clipboard.writeText(ip);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }}
            className="project-link-btn inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer"
            style={{
                color: copied ? "var(--color-available)" : undefined,
            }}
        >
            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            {copied ? "Copied!" : offline ? `${ip} (offline)` : ip}
        </button>
    );
}

function FeaturedCard({ experience }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: "-60px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-full relative overflow-hidden group rounded-2xl project-card-featured"
            style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
            }}
        >
            <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{
                    background: "linear-gradient(90deg, transparent, var(--color-accent), transparent)",
                }}
            />

            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: "radial-gradient(ellipse at 30% 50%, rgba(99,102,241,0.06) 0%, transparent 60%)",
                }}
            />

            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start p-8 md:p-10">
                <img
                    src={experience.image}
                    alt={experience.title}
                    className="w-20 h-20 md:w-28 md:h-28 rounded-2xl object-cover flex-shrink-0"
                    style={{
                        border: "1px solid var(--color-border)",
                        boxShadow: "var(--shadow-lg)",
                    }}
                />

                <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2.5 mb-2">
                        <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                            {experience.title}
                        </h3>
                        <span
                            className="text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider"
                            style={{
                                background: "linear-gradient(135deg, var(--color-accent), #8b5cf6)",
                                color: "white",
                            }}
                        >
                            Featured
                        </span>
                        {experience.ongoing && (
                            <span className="relative flex items-center gap-1.5 text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider"
                                style={{
                                    backgroundColor: "rgba(34,197,94,0.1)",
                                    color: "var(--color-available)",
                                    border: "1px solid rgba(34,197,94,0.2)",
                                }}
                            >
                                <span className="relative flex h-1.5 w-1.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: "var(--color-available)" }} />
                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ backgroundColor: "var(--color-available)" }} />
                                </span>
                                Active
                            </span>
                        )}
                    </div>
                    <p className="text-sm font-medium mb-4" style={{ color: "var(--color-text-muted)" }}>
                        {experience.role} &middot; {experience.startDate} &mdash; {experience.endDate}
                    </p>
                    <p
                        className="text-base leading-relaxed mb-6 max-w-xl"
                        style={{ color: "var(--color-text-secondary)" }}
                    >
                        {experience.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-2.5">
                        <a
                            href={experience.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-link-btn inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
                        >
                            <FaDiscord className="w-4 h-4" />
                            Discord
                        </a>
                        {experience.website && (
                            <a
                                href={experience.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="project-link-btn inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
                            >
                                <ArrowUpRight className="w-4 h-4" />
                                Website
                            </a>
                        )}
                        <CopyIPButton ip={experience.ip} offline={experience.ipOffline} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function ProjectCard({ experience, index }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: "-60px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 25, filter: "blur(6px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="project-card rounded-2xl p-6 flex flex-col group relative overflow-hidden"
            style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
            }}
        >
            <div className="flex items-start gap-4 mb-4">
                <img
                    src={experience.image}
                    alt={experience.title}
                    className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                    style={{
                        border: "1px solid var(--color-border)",
                        boxShadow: "var(--shadow-md)",
                    }}
                />
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="text-lg font-bold tracking-tight truncate">
                            {experience.title}
                        </h3>
                        {experience.ongoing && (
                            <span className="relative flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-semibold flex-shrink-0"
                                style={{
                                    backgroundColor: "rgba(34,197,94,0.1)",
                                    color: "var(--color-available)",
                                }}
                            >
                                <span className="relative flex h-1.5 w-1.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: "var(--color-available)" }} />
                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ backgroundColor: "var(--color-available)" }} />
                                </span>
                                Active
                            </span>
                        )}
                    </div>
                    <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                        {experience.role} &middot; {experience.startDate} &mdash; {experience.endDate}
                    </p>
                </div>
            </div>

            <p
                className="text-sm leading-relaxed mb-5 flex-1"
                style={{ color: "var(--color-text-secondary)" }}
            >
                {experience.description}
            </p>

            {experience.players && (
                <div className="inline-flex items-center gap-1.5 mb-4 px-2.5 py-1 rounded-lg self-start"
                    style={{ backgroundColor: "var(--color-accent-muted)" }}
                >
                    <Users className="w-3.5 h-3.5" style={{ color: "var(--color-accent)" }} />
                    <span className="text-xs font-medium" style={{ color: "var(--color-text-secondary)" }}>
                        {experience.players}
                    </span>
                </div>
            )}

            <div className="flex flex-wrap items-center gap-2 mt-auto">
                <a
                    href={experience.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link-btn inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                >
                    <FaDiscord className="w-3.5 h-3.5" />
                    Discord
                </a>
                {experience.website && (
                    <a
                        href={experience.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link-btn inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                    >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Website
                    </a>
                )}
                <CopyIPButton ip={experience.ip} offline={experience.ipOffline} />
            </div>
        </motion.div>
    );
}

export default function Experience() {
    const headerRef = useRef(null);
    const isHeaderInView = useInView(headerRef, { once: false });

    const featured = experiences.filter((e) => e.featured);
    const rest = experiences.filter((e) => !e.featured);

    return (
        <section id="experience" className="py-24 px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    ref={headerRef}
                    initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                    animate={isHeaderInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
                        Selected Projects
                    </h2>
                    <p className="text-sm max-w-md" style={{ color: "var(--color-text-muted)" }}>
                        A few highlights from my recent work. I've contributed to many more projects over the years.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {featured.map((exp) => (
                        <FeaturedCard key={exp.title} experience={exp} />
                    ))}
                    {rest.map((exp, i) => (
                        <ProjectCard key={exp.title} experience={exp} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
