import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Users, Star, X, Copy, Check, Server } from "lucide-react";
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
        featured: true,
        color: "amber",
        ongoing: true,
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
        featured: true,
        color: "violet",
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
        featured: true,
        color: "blue",
        ongoing: true,
    },
    {
        title: "TavernMC",
        role: "Developer",
        description: "One of the largest MMO and survival Minecraft servers. Focused on player gameplay more than any other server.",
        startDate: "Aug '24",
        endDate: "Feb '25",
        players: "~350 concurrent",
        image: tavernmcImg,
        link: "https://discord.gg/tavernmc",
        ip: "play.tavernmc.net",
        featured: false,
        color: "amber",
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
        featured: false,
        color: "rose",
        unreleased: true,
    },
    {
        title: "Minefruit",
        role: "Developer",
        description: "Incredible server with unique concepts, always looked forward to expanding and creating new gamemodes.",
        startDate: "Nov '22",
        endDate: "Apr '24",
        players: "~250 concurrent",
        image: minefruitImg,
        link: "https://discord.gg/minefruit",
        ip: "play.minefruit.org",
        featured: false,
        color: "cyan",
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
        featured: false,
        color: "emerald",
        ongoing: true,
    },
];

const colorConfigs = {
    violet: "from-violet-500/20 to-transparent border-violet-500/30 hover:border-violet-400/50",
    blue: "from-blue-500/20 to-transparent border-blue-500/30 hover:border-blue-400/50",
    amber: "from-amber-500/20 to-transparent border-amber-500/30 hover:border-amber-400/50",
    rose: "from-rose-500/20 to-transparent border-rose-500/30 hover:border-rose-400/50",
    cyan: "from-cyan-500/20 to-transparent border-cyan-500/30 hover:border-cyan-400/50",
    emerald: "from-emerald-500/20 to-transparent border-emerald-500/30 hover:border-emerald-400/50",
};

const modalColorConfigs = {
    violet: { accent: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/30", button: "bg-violet-500 hover:bg-violet-600" },
    blue: { accent: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30", button: "bg-blue-500 hover:bg-blue-600" },
    amber: { accent: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30", button: "bg-amber-500 hover:bg-amber-600" },
    rose: { accent: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/30", button: "bg-rose-500 hover:bg-rose-600" },
    cyan: { accent: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/30", button: "bg-cyan-500 hover:bg-cyan-600" },
    emerald: { accent: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30", button: "bg-emerald-500 hover:bg-emerald-600" },
};

const glowColors = {
    violet: "rgba(139,92,246,0.5)",
    blue: "rgba(59,130,246,0.5)",
    amber: "rgba(245,158,11,0.5)",
    rose: "rgba(244,63,94,0.5)",
    cyan: "rgba(34,211,238,0.5)",
    emerald: "rgba(16,185,129,0.5)",
};

function calculateDuration(startDate, endDate) {
    const parseDate = (str) => {
        if (str === "Now") return new Date();
        if (str.length === 4) return new Date(parseInt(str), 0);
        const months = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
        const parts = str.split(" '");
        if (parts.length === 2) return new Date(2000 + parseInt(parts[1]), months[parts[0]]);
        return new Date();
    };

    const start = parseDate(startDate);
    const end = parseDate(endDate);
    const diffMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());

    if (diffMonths >= 24) return `${Math.floor(diffMonths / 12)}+ yr`;
    if (diffMonths >= 12) return "1+ yr";
    return `${diffMonths} mo`;
}

function DateBadge({ startDate, endDate, ongoing = false, color = "neutral" }) {
    const duration = calculateDuration(startDate, endDate);

    const colorClasses = {
        violet: "border-violet-500/30 text-violet-400",
        blue: "border-blue-500/30 text-blue-400",
        amber: "border-amber-500/30 text-amber-400",
        rose: "border-rose-500/30 text-rose-400",
        cyan: "border-cyan-500/30 text-cyan-400",
        emerald: "border-emerald-500/30 text-emerald-400",
        neutral: "border-neutral-500/30 text-neutral-400",
    };

    const badgeColor = ongoing ? "border-emerald-500/30 text-emerald-400" : (colorClasses[color] || colorClasses.neutral);

    return (
        <div className="flex flex-col items-end gap-1 text-right min-w-[70px]">
            <span className={`text-xs font-semibold ${ongoing ? "text-emerald-400" : "text-neutral-400"}`}>
                {endDate}
            </span>
            <div className={`px-2 py-0.5 rounded-full border text-[10px] font-bold ${badgeColor} bg-neutral-900/50`}>
                {duration}
            </div>
            <span className="text-[10px] text-neutral-500">from {startDate}</span>
        </div>
    );
}

function StaggerText({ text, className = "" }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <span ref={ref} className={className}>
            {text.split(" ").map((word, i) => (
                <motion.span
                    key={i}
                    className="inline-block mr-[0.25em]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: i * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    {word}
                </motion.span>
            ))}
        </span>
    );
}

function ServerModal({ experience, isOpen, onClose }) {
    const [copied, setCopied] = useState(false);
    const colors = modalColorConfigs[experience?.color] || modalColorConfigs.violet;

    const copyIP = () => {
        if (experience?.ip) {
            navigator.clipboard.writeText(experience.ip);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (!experience) return null;

    const glowColor = glowColors[experience.color] || glowColors.violet;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-lg"
                    >
                        <motion.div
                            className="absolute -inset-6 rounded-3xl blur-3xl"
                            style={{ background: `radial-gradient(ellipse at center, ${glowColor}, transparent 70%)` }}
                            animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        />

                        <div className="relative">
                            <div
                                className="absolute -inset-[1px] rounded-3xl opacity-60"
                                style={{ background: `linear-gradient(135deg, ${glowColor}, transparent 50%, ${glowColor})` }}
                            />

                            <div className="relative rounded-3xl bg-neutral-900/95 backdrop-blur-xl overflow-hidden shadow-2xl">
                                <div
                                    className="absolute inset-0 opacity-20"
                                    style={{ background: `radial-gradient(circle at top left, ${glowColor}, transparent 60%)` }}
                                />
                                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />

                                <motion.button
                                    onClick={onClose}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="absolute top-4 right-4 p-2 rounded-full bg-neutral-800/80 hover:bg-neutral-700 transition-colors z-10 border border-neutral-700/50"
                                >
                                    <X className="w-4 h-4 text-neutral-300" />
                                </motion.button>

                                <div className="relative p-6">
                                    <div className="flex items-center gap-4 mb-6">
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: 0.1 }}
                                            className="relative"
                                        >
                                            <div className={`absolute -inset-1 rounded-2xl ${colors.bg} blur-md`} />
                                            <img
                                                src={experience.image}
                                                alt={`${experience.title} logo`}
                                                className="relative w-16 h-16 rounded-xl object-cover bg-neutral-800 border border-neutral-700/50"
                                            />
                                        </motion.div>
                                        <div className="flex-1 min-w-0">
                                            <motion.h3
                                                initial={{ y: 10, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.15 }}
                                                className="text-2xl font-bold text-white mb-1"
                                            >
                                                {experience.title}
                                            </motion.h3>
                                            <motion.p
                                                initial={{ y: 10, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.2 }}
                                                className={`font-semibold ${colors.accent}`}
                                            >
                                                {experience.role}
                                            </motion.p>
                                        </div>
                                    </div>

                                    <motion.div
                                        initial={{ y: 10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.25 }}
                                        className="flex flex-wrap gap-2 mb-5"
                                    >
                                        <div className={`px-3 py-1.5 rounded-full ${colors.bg} border ${colors.border} text-sm`}>
                                            <span className="text-neutral-400">Duration: </span>
                                            <span className="text-white font-medium">{experience.startDate} - {experience.endDate}</span>
                                        </div>
                                        {experience.players && (
                                            <div className={`px-3 py-1.5 rounded-full ${colors.bg} border ${colors.border} text-sm`}>
                                                <span className="text-neutral-400">Players: </span>
                                                <span className="text-white font-medium">{experience.players}</span>
                                            </div>
                                        )}
                                    </motion.div>

                                    <motion.p
                                        initial={{ y: 10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="text-neutral-300 text-sm leading-relaxed mb-6"
                                    >
                                        {experience.description}
                                    </motion.p>

                                    <motion.div
                                        initial={{ y: 10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.35 }}
                                        className="flex gap-3"
                                    >
                                        {experience.ip && (
                                            <motion.button
                                                onClick={copyIP}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className={`flex items-center gap-3 px-4 py-3 rounded-xl ${colors.bg} border ${colors.border} hover:border-opacity-60 transition-all group flex-1`}
                                            >
                                                <Server className={`w-4 h-4 ${colors.accent} flex-shrink-0`} />
                                                <span className="text-white font-mono text-sm">{experience.ip}</span>
                                                {experience.ipOffline && <span className="text-neutral-500 text-xs">(Offline)</span>}
                                                <div className="ml-auto flex-shrink-0">
                                                    {copied ? (
                                                        <Check className="w-4 h-4 text-emerald-400" />
                                                    ) : (
                                                        <Copy className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
                                                    )}
                                                </div>
                                            </motion.button>
                                        )}

                                        <motion.a
                                            href={experience.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold transition-colors text-sm shadow-lg shadow-[#5865F2]/20"
                                        >
                                            <FaDiscord className="w-4 h-4" />
                                            Discord
                                        </motion.a>

                                        {experience.website && (
                                            <motion.a
                                                href={experience.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl ${colors.bg} border ${colors.border} hover:border-opacity-60 text-white font-semibold transition-all text-sm`}
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                                Website
                                            </motion.a>
                                        )}
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

function FeaturedCard({ experience, index, onClick }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const colors = colorConfigs[experience.color] || colorConfigs.violet;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="h-full"
        >
            <button
                onClick={onClick}
                className={`group block relative rounded-3xl border bg-gradient-to-br ${colors} bg-neutral-900/90 backdrop-blur-sm p-6 md:p-8 transition-all duration-300 hover:scale-[1.02] w-full h-full text-left cursor-pointer`}
            >
                <motion.div
                    className="absolute top-4 right-4"
                    animate={{ opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                    <Star className="w-5 h-5 text-white fill-white/10" />
                </motion.div>

                <div className="flex gap-4 md:gap-6">
                    <div className="flex gap-4 md:gap-6 flex-1 min-w-0">
                        <img
                            src={experience.image}
                            alt={`${experience.title} logo`}
                            className="w-16 h-16 md:w-20 md:h-20 rounded-xl object-cover bg-neutral-800 group-hover:scale-105 transition-transform duration-500 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                            <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2 mb-1">
                                {experience.title}
                                <ExternalLink className="w-4 h-4 md:w-5 md:h-5 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                            </h3>
                            <p className="text-neutral-300 font-medium mb-3 text-sm md:text-base">{experience.role}</p>
                            {experience.players && (
                                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm mb-3">
                                    <Users className="w-4 h-4" />
                                    {experience.players}
                                </div>
                            )}
                            <p className="text-neutral-500 text-sm leading-relaxed hidden md:block">
                                {experience.description}
                            </p>
                        </div>
                    </div>
                    <div className="flex-shrink-0 self-center">
                        <DateBadge
                            startDate={experience.startDate}
                            endDate={experience.endDate}
                            ongoing={experience.ongoing}
                            color={experience.color}
                        />
                    </div>
                </div>
            </button>
        </motion.div>
    );
}

function OtherCard({ experience, index, onClick }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const colors = colorConfigs[experience.color] || colorConfigs.violet;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="h-full"
        >
            <button
                onClick={onClick}
                className={`group block p-5 rounded-2xl border bg-gradient-to-br ${colors} bg-neutral-900/70 transition-all duration-300 hover:scale-[1.02] w-full h-full text-left cursor-pointer`}
            >
                <div className="flex gap-4">
                    <div className="flex gap-4 flex-1 min-w-0">
                        <img
                            src={experience.image}
                            alt={`${experience.title} logo`}
                            className="w-12 h-12 rounded-lg object-cover bg-neutral-800 group-hover:scale-105 transition-transform duration-300 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-1">
                                {experience.title}
                                <ExternalLink className="w-4 h-4 text-neutral-600 group-hover:text-white transition-colors" />
                            </h3>
                            <p className="text-neutral-400 text-sm mb-1">{experience.role}</p>
                            <p className="text-neutral-500 text-xs mb-2 line-clamp-1">{experience.description}</p>
                            {experience.players && (
                                <div className={`flex items-center gap-1.5 text-xs font-semibold ${experience.unreleased ? "text-amber-400" : "text-emerald-400"}`}>
                                    <Users className="w-3 h-3" />
                                    {experience.players}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex-shrink-0 self-center">
                        <DateBadge
                            startDate={experience.startDate}
                            endDate={experience.endDate}
                            ongoing={experience.ongoing}
                            color={experience.color}
                        />
                    </div>
                </div>
            </button>
        </motion.div>
    );
}

export default function Experience() {
    const [selectedExperience, setSelectedExperience] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const headerRef = useRef(null);
    const isHeaderInView = useInView(headerRef, { once: true });

    const featured = experiences.filter((e) => e.featured);
    const other = experiences.filter((e) => !e.featured);

    const openModal = (experience) => {
        setSelectedExperience(experience);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedExperience(null), 300);
    };

    return (
        <section id="experience" className="py-32 px-6">
            <div className="max-w-5xl mx-auto">
                <div ref={headerRef} className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isHeaderInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                            <StaggerText text="Experience" />
                        </h2>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isHeaderInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-neutral-400 text-lg max-w-2xl mx-auto"
                    >
                        Recent and significant projects I've worked on. Player counts are from the time I worked there.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {featured.map((exp, index) => (
                        <FeaturedCard key={exp.title} experience={exp} index={index} onClick={() => openModal(exp)} />
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <h3 className="text-xl font-bold text-neutral-400 mb-6">Previous Work</h3>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {other.map((exp, index) => (
                        <OtherCard key={exp.title} experience={exp} index={index} onClick={() => openModal(exp)} />
                    ))}
                </div>
            </div>

            <ServerModal experience={selectedExperience} isOpen={isModalOpen} onClose={closeModal} />
        </section>
    );
}
