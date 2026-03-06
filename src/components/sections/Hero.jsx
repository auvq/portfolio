import { useState, useEffect, Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { Github, ChevronRight } from "lucide-react";
import { FaDiscord } from "react-icons/fa";

const Spline = lazy(() => import("@splinetool/react-spline"));

function RobotMessage() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2.0, type: "spring", stiffness: 300, damping: 22 }}
            className="absolute top-[28%] right-[24%] hidden lg:block pointer-events-none z-20"
        >
            <div
                style={{ animation: "bubble-float 4s ease-in-out infinite" }}
            >
                <div className="relative">
                    <div
                        className="flex items-center gap-2 px-4 py-2 rounded-full"
                        style={{
                            backgroundColor: "var(--color-surface)",
                            border: "1px solid var(--color-border)",
                            boxShadow: "var(--shadow-lg)",
                            backdropFilter: "blur(12px)",
                        }}
                    >
                        <span className="relative flex h-2 w-2 flex-shrink-0">
                            <span
                                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                                style={{ backgroundColor: "var(--color-available)" }}
                            />
                            <span
                                className="relative inline-flex rounded-full h-2 w-2"
                                style={{ backgroundColor: "var(--color-available)" }}
                            />
                        </span>
                        <div className="relative">
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.4, delay: 2.3 }}
                                className="text-xs font-medium whitespace-nowrap leading-none"
                                style={{ color: "var(--color-text-secondary)", position: "relative", top: "-2px" }}
                            >
                                Available for work!
                            </motion.span>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 1, 1, 0] }}
                                transition={{ duration: 1.0, delay: 2.0, times: [0, 0.08, 0.7, 1] }}
                                className="absolute inset-0 flex items-center gap-1"
                                style={{ backgroundColor: "var(--color-surface)" }}
                            >
                                {[0, 1, 2].map((i) => (
                                    <motion.span
                                        key={i}
                                        className="w-1.5 h-1.5 rounded-full"
                                        style={{ backgroundColor: "var(--color-text-muted)" }}
                                        animate={{ y: [0, -3, 0] }}
                                        transition={{
                                            duration: 0.6,
                                            repeat: Infinity,
                                            delay: i * 0.15,
                                            ease: "easeInOut",
                                        }}
                                    />
                                ))}
                            </motion.div>
                        </div>
                    </div>
                    <div
                        className="absolute -bottom-[7px] right-6 w-3.5 h-3.5 rotate-45"
                        style={{
                            backgroundColor: "var(--color-surface)",
                            borderRight: "1px solid var(--color-border)",
                            borderBottom: "1px solid var(--color-border)",
                        }}
                    />
                </div>
            </div>
        </motion.div>
    );
}

export default function Hero() {
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowContent(true), 150);
        return () => clearTimeout(timer);
    }, []);

    const nameChars = "AUVQ".split("");

    return (
        <section id="hero" className="min-h-screen flex flex-col justify-center relative pt-16">
            <div className="absolute inset-0 hidden md:block pointer-events-auto overflow-hidden">
                <Suspense fallback={null}>
                    <Spline
                        scene="https://prod.spline.design/1JymuJv1EdG8sTP3/scene.splinecode"
                        style={{
                            width: "110%",
                            height: "100%",
                            marginLeft: "18%",
                        }}
                    />
                </Suspense>
                <div
                    className="absolute pointer-events-none"
                    style={{
                        top: "25%",
                        right: "12%",
                        width: "400px",
                        height: "400px",
                        background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
                        filter: "blur(40px)",
                    }}
                />
            </div>

            <RobotMessage />

            <div className="relative z-10 w-full max-w-[90rem] mx-auto px-4 sm:px-6">
                <div className="mb-3" style={{ perspective: "1000px" }}>
                    <h1 className="text-[clamp(5.5rem,16vw,14rem)] font-black leading-[0.85] tracking-[-0.05em] hero-title-glint w-fit pb-3 pr-2">
                        {nameChars.map((char, i) => (
                            <motion.span
                                key={i}
                                className="inline-block"
                                initial={{ opacity: 0, y: 80, rotateX: 25, filter: "blur(20px)" }}
                                animate={showContent ? { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" } : {}}
                                transition={{
                                    duration: 1.0,
                                    delay: 0.15 + i * 0.08,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </h1>
                </div>

                <motion.div
                    className="mb-4"
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformOrigin: "left" }}
                >
                    <motion.div
                        className="h-[2px] w-12 rounded-full"
                        style={{ background: "linear-gradient(90deg, var(--color-accent), transparent)" }}
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                </motion.div>

                <div className="mb-10 max-w-xl">
                    <p className="text-[clamp(1.15rem,2.5vw,1.8rem)] font-normal leading-relaxed">
                        {["Software", "Developer"].map((word, i) => (
                            <motion.span
                                key={word}
                                className="inline-block mr-[0.3em]"
                                style={{ color: "var(--color-text-secondary)" }}
                                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                transition={{ duration: 0.6, delay: 0.6 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                            >
                                {word}
                            </motion.span>
                        ))}
                        {["specializing", "in"].map((word, i) => (
                            <motion.span
                                key={word}
                                className="inline-block mr-[0.3em]"
                                style={{ color: "var(--color-text-secondary)" }}
                                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                transition={{ duration: 0.6, delay: 0.76 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                            >
                                {word}
                            </motion.span>
                        ))}
                        <br className="hidden sm:block" />
                        {["Minecraft", "&", "Hytale"].map((word, i) => (
                            <motion.span
                                key={word}
                                className="inline-block mr-[0.3em] accent-gradient-text-animated font-semibold"
                                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                transition={{ duration: 0.6, delay: 0.92 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                            >
                                {word}
                            </motion.span>
                        ))}
                        <motion.span
                            className="inline-block"
                            style={{ color: "var(--color-text-secondary)" }}
                            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{ duration: 0.6, delay: 1.16, ease: [0.16, 1, 0.3, 1] }}
                        >
                            development
                        </motion.span>
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.6, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col sm:flex-row gap-3"
                >
                    <motion.a
                        href="#contact"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="btn-primary inline-flex items-center justify-center gap-2.5 group"
                    >
                        <FaDiscord className="w-4 h-4" />
                        Get in Touch
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </motion.a>
                    <motion.a
                        href="https://github.com/auvq"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="btn-secondary inline-flex items-center justify-center gap-2.5"
                    >
                        <Github className="w-4 h-4" />
                        GitHub
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}
