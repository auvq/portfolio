import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Clock, CheckCircle, XCircle, Briefcase, Code, Handshake, TrendingUp, Coffee } from "lucide-react";

function AnimatedNumber({ value, suffix = "" }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [displayValue, setDisplayValue] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        if (!isInView || hasStarted) return;
        setHasStarted(true);

        const end = parseInt(value);
        const duration = 800;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplayValue(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    }, [isInView, value, hasStarted]);

    return (
        <span ref={ref}>
            {displayValue}
            {suffix}
        </span>
    );
}

function GradientBorder({ children, className = "" }) {
    return (
        <div className={`relative group ${className}`}>
            <div
                className="absolute -inset-[1px] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: "linear-gradient(90deg, rgba(139,92,246,0.5), rgba(59,130,246,0.5), rgba(16,185,129,0.5), rgba(139,92,246,0.5))",
                    backgroundSize: "300% 100%",
                    animation: "gradient-shift 3s linear infinite",
                }}
            />
            <div className="relative rounded-3xl bg-neutral-900/90 backdrop-blur-sm h-full">
                {children}
            </div>
        </div>
    );
}

const statusConfig = {
    available: { icon: CheckCircle, color: "text-emerald-400", bgColor: "bg-emerald-500/20", borderColor: "border-emerald-500/30", label: "Available" },
    busy: { icon: Clock, color: "text-amber-400", bgColor: "bg-amber-500/20", borderColor: "border-amber-500/30", label: "Limited" },
    unavailable: { icon: XCircle, color: "text-red-400", bgColor: "bg-red-500/20", borderColor: "border-red-500/30", label: "Unavailable" },
};

const workTypes = [
    { title: "Small Projects", status: "unavailable", icon: Handshake, time: "1-4 days", description: "Quick fixes and small features" },
    { title: "Commissions", status: "busy", icon: Code, time: "1-2 weeks", description: "Custom plugin development" },
    { title: "Long-term", status: "available", icon: Briefcase, time: "3+ months", description: "Ongoing development work" },
];

function StatsCard({ delay }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
            className="md:col-span-2"
        >
            <GradientBorder>
                <div className="p-10 h-full">
                    <div className="flex items-center gap-2 mb-6">
                        <TrendingUp className="w-5 h-5 text-violet-400" />
                        <span className="text-neutral-400 text-sm font-semibold uppercase tracking-wider">Experience</span>
                    </div>
                    <div className="flex items-end gap-6">
                        <div className="text-8xl md:text-[10rem] font-black text-white leading-none">
                            <AnimatedNumber value={6} suffix="+" />
                        </div>
                        <div className="pb-4">
                            <p className="text-3xl text-white font-bold mb-1">Years</p>
                            <p className="text-neutral-400 text-lg">of hands-on development</p>
                        </div>
                    </div>
                </div>
            </GradientBorder>
        </motion.div>
    );
}

function SupportCard({ delay }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
            className="h-full"
        >
            <GradientBorder className="h-full">
                <div className="p-10 h-full flex flex-col">
                    <div className="flex items-center gap-2 mb-6">
                        <Coffee className="w-5 h-5 text-blue-400" />
                        <span className="text-neutral-400 text-sm font-semibold uppercase tracking-wider">Availability</span>
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                        <div className="text-6xl md:text-7xl font-black text-white mb-3">24/7</div>
                        <p className="text-neutral-300 text-lg font-medium">Support & Communication</p>
                    </div>
                </div>
            </GradientBorder>
        </motion.div>
    );
}

function WorkTypeCard({ work, delay }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const status = statusConfig[work.status];
    const StatusIcon = status.icon;
    const WorkIcon = work.icon;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
        >
            <div className="group relative h-full p-6 rounded-3xl border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm hover:border-neutral-700 hover:bg-neutral-800/50 transition-all duration-300">
                <div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                        background: `radial-gradient(circle at 50% 0%, ${work.status === "available" ? "rgba(16,185,129,0.1)" : work.status === "busy" ? "rgba(245,158,11,0.1)" : "rgba(239,68,68,0.1)"}, transparent 70%)`,
                    }}
                />
                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
                            <WorkIcon className="w-6 h-6 text-neutral-300" />
                        </div>
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${status.bgColor} ${status.borderColor}`}>
                            <StatusIcon className={`w-3.5 h-3.5 ${status.color}`} />
                            <span className={`text-xs font-bold ${status.color}`}>{status.label}</span>
                        </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{work.title}</h3>
                    <p className="text-neutral-500 text-sm mb-3">{work.description}</p>
                    <p className="text-neutral-400 text-base font-semibold">{work.time}</p>
                </div>
            </div>
        </motion.div>
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

export default function BentoGrid() {
    const headerRef = useRef(null);
    const isHeaderInView = useInView(headerRef, { once: true });

    return (
        <section className="py-32 px-6">
            <div className="max-w-6xl mx-auto">
                <div ref={headerRef} className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isHeaderInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                            <StaggerText text="At a Glance" />
                        </h2>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isHeaderInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-neutral-400 text-lg max-w-xl mx-auto"
                    >
                        Quick overview of my experience and current availability
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatsCard delay={0} />
                    <SupportCard delay={0.1} />
                    {workTypes.map((work, index) => (
                        <WorkTypeCard key={work.title} work={work} delay={0.2 + index * 0.1} />
                    ))}
                </div>
            </div>
        </section>
    );
}
