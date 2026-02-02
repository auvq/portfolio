import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, ArrowRight } from "lucide-react";

export default function ContactSimple() {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText("auvq");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section id="contact" className="py-40 px-6">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tight">
                        Let's Work Together
                    </h2>
                    <p className="text-neutral-400 text-xl max-w-lg mx-auto">
                        Have a project in mind? Reach out on Discord - I typically respond within 24 hours.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative group"
                >
                    <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-r from-white/20 via-white/5 to-white/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700" />

                    <div className="relative p-10 md:p-14 rounded-[2rem] border-2 border-neutral-800 bg-neutral-900/90 backdrop-blur-md group-hover:border-neutral-700 transition-colors duration-500">
                        <div className="flex flex-col items-center text-center gap-8">
                            <div>
                                <p className="text-neutral-500 text-sm font-semibold uppercase tracking-wider mb-3">Discord</p>
                                <p className="text-5xl md:text-7xl font-black text-white">auvq</p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                                <motion.button
                                    onClick={copyToClipboard}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl border-2 border-neutral-700 text-neutral-200 text-lg font-bold transition-all duration-300 hover:border-neutral-500 hover:text-white hover:bg-white/5"
                                >
                                    {copied ? (
                                        <>
                                            <Check className="w-5 h-5 text-emerald-400" />
                                            Copied!
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-5 h-5" />
                                            Copy Username
                                        </>
                                    )}
                                </motion.button>
                                <motion.a
                                    href="https://discord.com/users/804763492753866822"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group/btn flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-white text-black text-lg font-bold transition-all duration-300 hover:bg-neutral-100 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                                >
                                    Open Discord
                                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                </motion.a>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-center text-neutral-600 text-sm mt-10 font-medium"
                >
                    User ID: 804763492753866822
                </motion.p>
            </div>
        </section>
    );
}
