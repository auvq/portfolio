import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Star, Zap, Globe } from "lucide-react";
import createGlobe from "cobe";
import { useTheme } from "../../context/ThemeContext";

function AnimatedNumber({ value, suffix = "", isInView }) {
    const [display, setDisplay] = useState(0);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        if (!isInView || started) return;
        setStarted(true);
        const duration = 1200;
        const start = performance.now();
        const animate = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            setDisplay(Math.floor(eased * value));
            if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }, [isInView, value, started]);

    return <span>{display}{suffix}</span>;
}

function AnimatedStars({ count = 5, isInView }) {
    return (
        <div className="inline-flex items-center gap-1.5 relative star-glint-container">
            {Array.from({ length: count }, (_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0, rotate: -30 }}
                    animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0, rotate: -30 }}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    <Star className="w-5 h-5" style={{ color: "#eab308", fill: "#eab308" }} />
                </motion.div>
            ))}
            <div className="star-glint-sweep star-glint-1" />
            <div className="star-glint-sweep star-glint-2" />
        </div>
    );
}

function InteractiveGlobe() {
    const canvasRef = useRef(null);
    const phiRef = useRef(0);
    const { theme } = useTheme();

    useEffect(() => {
        if (!canvasRef.current) return;

        let width = canvasRef.current.offsetWidth;
        const onResize = () => {
            if (canvasRef.current) width = canvasRef.current.offsetWidth;
        };
        window.addEventListener("resize", onResize);

        const isDark = document.documentElement.classList.contains("dark");

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: width * 2,
            height: width * 2,
            phi: 0,
            theta: 0.25,
            dark: isDark ? 0 : 1,
            diffuse: 1.2,
            mapSamples: 16000,
            mapBrightness: isDark ? 2 : 6,
            baseColor: isDark ? [0.92, 0.92, 0.96] : [0.3, 0.3, 0.4],
            markerColor: [0.39, 0.4, 0.95],
            glowColor: isDark ? [0.85, 0.85, 0.95] : [0.15, 0.15, 0.25],
            markers: [],
            onRender: (state) => {
                state.phi = phiRef.current;
                phiRef.current += 0.006;
                state.width = width * 2;
                state.height = width * 2;
            },
        });

        return () => {
            globe.destroy();
            window.removeEventListener("resize", onResize);
        };
    }, [theme]);

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ aspectRatio: "1", opacity: 0.9 }}
        />
    );
}

const statCards = [
    {
        icon: Code2,
        iconColor: "#818cf8",
        bgColor: "rgba(99,102,241,0.15)",
        glowColor: "rgba(99,102,241,0.25)",
        borderHover: "rgba(99,102,241,0.4)",
        value: 6,
        suffix: "+",
        label: "Years Experience",
        type: "number",
    },
    {
        icon: Zap,
        iconColor: "#22d3ee",
        bgColor: "rgba(6,182,212,0.15)",
        glowColor: "rgba(6,182,212,0.25)",
        borderHover: "rgba(6,182,212,0.4)",
        value: 50,
        suffix: "+",
        label: "Projects Delivered",
        type: "number",
    },
    {
        icon: Star,
        iconColor: "#eab308",
        bgColor: "rgba(234,179,8,0.12)",
        glowColor: "rgba(234,179,8,0.25)",
        borderHover: "rgba(234,179,8,0.4)",
        value: 5,
        label: "Rated by Clients",
        type: "stars",
    },
];

const availabilityItems = [
    { type: "Long-term projects", status: "Open", color: "var(--color-available)", pulse: true },
    { type: "Commissions", status: "Limited", color: "var(--color-limited)", pulse: false },
    { type: "Small projects", status: "Closed", color: "var(--color-unavailable)", pulse: false },
];

function StatCard({ stat, isInView, delay }) {
    const Icon = stat.icon;
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay }}
            className="stat-card group relative cursor-default rounded-xl p-6"
            style={{
                "--stat-glow": stat.glowColor,
            }}
        >
            <div className="stat-card-glow" />
            <div className="flex items-start justify-between mb-4">
                <motion.div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                        background: stat.bgColor,
                        boxShadow: `0 0 20px ${stat.glowColor}`,
                    }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                    <Icon className="w-5 h-5" style={{ color: stat.iconColor }} />
                </motion.div>
            </div>
            <div className="text-3xl md:text-4xl font-black tracking-tight mb-1.5">
                {stat.type === "stars" ? (
                    <AnimatedStars count={stat.value} isInView={isInView} />
                ) : (
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} isInView={isInView} />
                )}
            </div>
            <div
                className="text-xs uppercase tracking-[0.15em] font-semibold"
                style={{ color: "var(--color-text-muted)" }}
            >
                {stat.label}
            </div>
        </motion.div>
    );
}

export default function About() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: "-80px" });

    return (
        <section className="py-24 px-6 lg:px-8">
            <div className="max-w-7xl mx-auto" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                    animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                        About
                    </h2>
                    <p className="text-base max-w-xl" style={{ color: "var(--color-text-secondary)" }}>
                        Self-taught developer with 6+ years of experience building performant server infrastructure, custom gameplay systems, and scalable network solutions for Minecraft and Hytale communities.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40, filter: "blur(12px)", scale: 0.97 }}
                    animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 } : {}}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="relative rounded-2xl overflow-hidden"
                    style={{
                        background: "var(--color-surface)",
                        border: "1px solid var(--color-border)",
                        boxShadow: "var(--shadow-lg)",
                    }}
                >
                    <div className="p-8 md:p-10">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
                            {statCards.map((stat, i) => (
                                <StatCard key={stat.label} stat={stat} isInView={isInView} delay={0.1 + i * 0.1} />
                            ))}
                        </div>

                        <div className="flex flex-col items-center text-center">
                            <motion.div
                                className="flex items-center gap-2 mb-2"
                                initial={{ opacity: 0, y: 10 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.5 }}
                            >
                                <Globe className="w-4 h-4" style={{ color: "var(--color-accent)" }} />
                                <span
                                    className="text-xs uppercase tracking-[0.2em] font-semibold"
                                    style={{ color: "var(--color-text-muted)" }}
                                >
                                    Reach
                                </span>
                            </motion.div>
                            <motion.h3
                                className="text-2xl md:text-3xl font-bold tracking-tight mb-1"
                                initial={{ opacity: 0, y: 10 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.55 }}
                            >
                                Building for communities{" "}
                                <span className="accent-gradient-text-animated">around the globe</span>
                            </motion.h3>
                            <motion.p
                                className="text-sm max-w-md mb-6"
                                style={{ color: "var(--color-text-muted)" }}
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: 1 } : {}}
                                transition={{ duration: 0.5, delay: 0.6 }}
                            >
                                Collaborating with teams and players worldwide to craft unforgettable experiences.
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.85 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                className="w-[220px] md:w-[280px] mb-8"
                            >
                                <InteractiveGlobe />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
                            >
                                <span
                                    className="text-xs uppercase tracking-[0.15em] font-semibold mr-1"
                                    style={{ color: "var(--color-text-muted)" }}
                                >
                                    Availability
                                </span>
                                {availabilityItems.map((item, i) => (
                                    <motion.div
                                        key={item.type}
                                        className="flex items-center gap-2"
                                        initial={{ opacity: 0, x: -8 }}
                                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
                                    >
                                        <span className="relative flex h-2 w-2">
                                            {item.pulse && (
                                                <span
                                                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                                                    style={{ backgroundColor: item.color }}
                                                />
                                            )}
                                            <span
                                                className="relative inline-flex rounded-full h-2 w-2"
                                                style={{ backgroundColor: item.color }}
                                            />
                                        </span>
                                        <span className="text-xs font-medium" style={{ color: "var(--color-text-secondary)" }}>
                                            {item.type}
                                        </span>
                                        <span className="text-xs font-semibold" style={{ color: item.color }}>
                                            {item.status}
                                        </span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
