import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Copy, Check, ArrowRight, MessageCircle } from "lucide-react";
import { FaDiscord, FaGithub } from "react-icons/fa";

export default function Contact() {
    const [copied, setCopied] = useState(false);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: "-100px" });

    const copyToClipboard = () => {
        navigator.clipboard.writeText("auvq");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const words = ["Let's", "work", "together."];

    return (
        <section id="contact" ref={ref} className="py-32 px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                    animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] mb-4">
                        {words.map((word, i) => (
                            <motion.span
                                key={word}
                                className="inline-block mr-[0.3em]"
                                initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
                                animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                                transition={{ duration: 0.6, delay: 0.1 + i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
                            >
                                {i === 2 ? (
                                    <span className="accent-gradient-text-animated">{word}</span>
                                ) : (
                                    word
                                )}
                            </motion.span>
                        ))}
                    </h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="text-base max-w-lg"
                        style={{ color: "var(--color-text-secondary)" }}
                    >
                        Have a project in mind or just want to chat? Reach out through any of the channels below.
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div
                        initial={{ opacity: 0, y: 25, filter: "blur(6px)" }}
                        animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                        transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="group relative rounded-2xl p-6 overflow-hidden"
                        style={{
                            background: "var(--color-surface)",
                            border: "1px solid var(--color-border)",
                            transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                        }}
                        whileHover={{
                            borderColor: "var(--color-border-hover)",
                            boxShadow: "var(--shadow-lg)",
                        }}
                    >
                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
                            style={{
                                background: "radial-gradient(circle at 50% 30%, rgba(99,102,241,0.08) 0%, transparent 70%)",
                            }}
                        />
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                                    style={{
                                        background: "rgba(99,102,241,0.15)",
                                        boxShadow: "0 0 20px rgba(99,102,241,0.15)",
                                    }}
                                >
                                    <FaDiscord className="w-5 h-5" style={{ color: "#818cf8" }} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold">Discord</h3>
                                    <span
                                        className="text-xs"
                                        style={{ color: "var(--color-text-muted)" }}
                                    >
                                        Preferred - responds within 24h
                                    </span>
                                </div>
                                <div className="ml-auto flex items-center gap-1.5">
                                    <span className="relative flex h-2 w-2">
                                        <span
                                            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                                            style={{ backgroundColor: "var(--color-available)" }}
                                        />
                                        <span
                                            className="relative inline-flex rounded-full h-2 w-2"
                                            style={{ backgroundColor: "var(--color-available)" }}
                                        />
                                    </span>
                                    <span className="text-xs font-medium" style={{ color: "var(--color-available)" }}>
                                        Online
                                    </span>
                                </div>
                            </div>

                            <div
                                className="flex items-center rounded-xl overflow-hidden mb-4"
                                style={{
                                    backgroundColor: "var(--color-surface-raised)",
                                    border: "1px solid var(--color-border)",
                                }}
                            >
                                <span
                                    className="inline-flex items-center gap-2.5 font-mono text-sm font-medium px-4 py-2.5 flex-1"
                                    style={{ color: "var(--color-text-primary)" }}
                                >
                                    <MessageCircle className="w-3.5 h-3.5" style={{ color: "var(--color-accent)" }} />
                                    auvq
                                </span>
                                <span className="w-px h-6" style={{ backgroundColor: "var(--color-border)" }} />
                                <button
                                    onClick={copyToClipboard}
                                    className="cursor-pointer inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 font-semibold text-xs transition-colors duration-200"
                                    style={{
                                        color: copied ? "var(--color-available)" : "var(--color-text-secondary)",
                                    }}
                                >
                                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                    {copied ? "Copied" : "Copy"}
                                </button>
                            </div>

                            <motion.a
                                href="https://discord.com/users/804763492753866822"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="btn-primary w-full inline-flex items-center justify-center gap-2.5 group/btn text-sm"
                            >
                                <FaDiscord className="w-4 h-4" />
                                Open Discord Profile
                                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                            </motion.a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 25, filter: "blur(6px)" }}
                        animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                        transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="group relative rounded-2xl p-6 overflow-hidden"
                        style={{
                            background: "var(--color-surface)",
                            border: "1px solid var(--color-border)",
                            transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                        }}
                        whileHover={{
                            borderColor: "var(--color-border-hover)",
                            boxShadow: "var(--shadow-lg)",
                        }}
                    >
                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
                            style={{
                                background: "radial-gradient(circle at 50% 30%, rgba(139,92,246,0.06) 0%, transparent 70%)",
                            }}
                        />
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                                    style={{
                                        background: "rgba(139,92,246,0.12)",
                                        boxShadow: "0 0 20px rgba(139,92,246,0.12)",
                                    }}
                                >
                                    <FaGithub className="w-5 h-5" style={{ color: "#a78bfa" }} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold">GitHub</h3>
                                    <span
                                        className="text-xs"
                                        style={{ color: "var(--color-text-muted)" }}
                                    >
                                        Check out my open source work
                                    </span>
                                </div>
                            </div>

                            <p
                                className="text-sm mb-5 leading-relaxed"
                                style={{ color: "var(--color-text-secondary)" }}
                            >
                                Browse my repositories, contributions, and open source projects. Feel free to open an issue or start a discussion.
                            </p>

                            <motion.a
                                href="https://github.com/auvq"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="btn-secondary w-full inline-flex items-center justify-center gap-2.5 text-sm"
                            >
                                <FaGithub className="w-4 h-4" />
                                View GitHub Profile
                                <ArrowRight className="w-3.5 h-3.5" />
                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
