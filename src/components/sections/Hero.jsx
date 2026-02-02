import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Github, ArrowRight } from "lucide-react";

function Counter({ value, duration = 1.5, delay = 0 }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const hasStartedRef = useRef(false);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView || hasStartedRef.current) return;
        hasStartedRef.current = true;

        setTimeout(() => {
            let startTime;
            const animate = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                setCount(Math.floor(eased * value));
                if (progress < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
        }, delay * 1000);
    }, [isInView, value, duration, delay]);

    return <span ref={ref}>{count}</span>;
}

function GradientText({ children, className = "" }) {
    return (
        <span
            className={`bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-blue-400 to-emerald-400 ${className}`}
            style={{
                backgroundSize: "200% 200%",
                animation: "gradient-shift 8s ease infinite",
            }}
        >
            {children}
        </span>
    );
}

function StatusBadge() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20"
        >
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-400 text-sm font-medium">Available for hire</span>
        </motion.div>
    );
}

function MainTitle() {
    const letters = "AUVQ".split("");

    return (
        <h1
            className="text-[clamp(4rem,15vw,12rem)] font-bold leading-none tracking-tight"
            style={{ fontVariant: "small-caps" }}
        >
            {letters.map((letter, i) => (
                <motion.span
                    key={i}
                    className="inline-block text-white"
                    initial={{ opacity: 0, filter: "blur(20px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{
                        duration: 1,
                        delay: 0.3 + i * 0.1,
                        ease: [0.25, 0.1, 0.25, 1],
                    }}
                >
                    {letter}
                </motion.span>
            ))}
        </h1>
    );
}

function TechBadge({ children, delay, className = "" }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className={`hidden lg:block absolute ${className}`}
        >
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="px-4 py-2 rounded-xl bg-neutral-900/80 border border-neutral-800 backdrop-blur-sm text-sm text-neutral-300 shadow-lg"
            >
                {children}
            </motion.div>
        </motion.div>
    );
}

export default function Hero() {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
            <TechBadge delay={1.2} className="top-[18%] left-[5%]">
                <span className="text-violet-400 font-mono">{"{ }"}</span> Clean Code
            </TechBadge>
            <TechBadge delay={1.4} className="top-[22%] right-[8%]">
                <span className="text-blue-400 font-mono">#</span> Scalable
            </TechBadge>
            <TechBadge delay={1.6} className="bottom-[28%] left-[8%]">
                <span className="text-emerald-400 font-mono">&gt;</span> Fast Delivery
            </TechBadge>
            <TechBadge delay={1.8} className="bottom-[24%] right-[5%]">
                <span className="text-amber-400 font-mono">~</span> Reliable
            </TechBadge>

            <div className="relative z-10 flex flex-col items-center text-center max-w-5xl">
                <div className="mb-8">
                    <StatusBadge />
                </div>

                <div className="mb-6">
                    <MainTitle />
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="text-xl md:text-2xl text-neutral-400 font-medium mb-8"
                >
                    Minecraft & Hytale Developer
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    className="flex flex-wrap items-center justify-center gap-8 md:gap-12 mb-10"
                >
                    <div className="text-center">
                        <div className="text-4xl md:text-5xl font-black text-white">
                            <Counter value={6} delay={1.8} />+
                        </div>
                        <div className="text-neutral-500 text-sm md:text-base font-medium mt-1">Years Experience</div>
                    </div>
                    <div className="w-px h-12 bg-neutral-800 hidden md:block" />
                    <div className="text-center">
                        <div className="text-4xl md:text-5xl font-black text-white">
                            <Counter value={50} delay={1.8} />+
                        </div>
                        <div className="text-neutral-500 text-sm md:text-base font-medium mt-1">Projects Delivered</div>
                    </div>
                    <div className="w-px h-12 bg-neutral-800 hidden md:block" />
                    <div className="text-center">
                        <div className="text-4xl md:text-5xl font-black text-white">24/7</div>
                        <div className="text-neutral-500 text-sm md:text-base font-medium mt-1">Support Available</div>
                    </div>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="text-lg text-neutral-500 max-w-xl mx-auto mb-12"
                >
                    Crafting high-quality plugins for servers worldwide.
                    Building experiences that{" "}
                    <GradientText>players love</GradientText>.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    className="flex flex-col sm:flex-row gap-4"
                >
                    <motion.a
                        href="#contact"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-semibold rounded-xl transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                    >
                        Get in Touch
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                    </motion.a>
                    <motion.a
                        href="https://github.com/auvq"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center justify-center gap-3 px-8 py-4 border border-neutral-700 text-white font-semibold rounded-xl transition-all duration-300 hover:border-neutral-500 hover:bg-white/5"
                    >
                        <Github className="w-5 h-5" />
                        GitHub
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}
