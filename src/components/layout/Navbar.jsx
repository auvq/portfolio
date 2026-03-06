import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const navLinks = [
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleNavClick = (e, href) => {
        e.preventDefault();
        setMobileOpen(false);
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <motion.nav
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
                style={{
                    backgroundColor: scrolled ? "color-mix(in srgb, var(--color-bg) 80%, transparent)" : "transparent",
                    backdropFilter: scrolled ? "blur(16px) saturate(180%)" : "none",
                    borderBottom: scrolled ? "1px solid var(--color-border)" : "1px solid transparent",
                }}
            >
                <div className="max-w-[90rem] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="text-lg font-bold tracking-tight transition-colors"
                        style={{ color: "var(--color-text-primary)" }}
                    >
                        auvq
                    </a>

                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className="text-sm font-medium transition-colors duration-200 hover:opacity-100"
                                style={{ color: "var(--color-text-secondary)" }}
                                onMouseEnter={(e) => (e.target.style.color = "var(--color-text-primary)")}
                                onMouseLeave={(e) => (e.target.style.color = "var(--color-text-secondary)")}
                            >
                                {link.label}
                            </a>
                        ))}

                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg transition-colors duration-200 cursor-pointer"
                            style={{
                                color: "var(--color-text-secondary)",
                                backgroundColor: "transparent",
                            }}
                            onMouseEnter={(e) => (e.target.closest("button").style.backgroundColor = "var(--color-surface-raised)")}
                            onMouseLeave={(e) => (e.target.closest("button").style.backgroundColor = "transparent")}
                            aria-label="Toggle theme"
                        >
                            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        </button>
                    </div>

                    <div className="flex md:hidden items-center gap-2">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg cursor-pointer"
                            style={{ color: "var(--color-text-secondary)" }}
                            aria-label="Toggle theme"
                        >
                            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        </button>
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="p-2 rounded-lg cursor-pointer"
                            style={{ color: "var(--color-text-secondary)" }}
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-x-0 top-16 z-40 md:hidden p-4"
                        style={{
                            backgroundColor: "color-mix(in srgb, var(--color-bg) 95%, transparent)",
                            backdropFilter: "blur(16px)",
                            borderBottom: "1px solid var(--color-border)",
                        }}
                    >
                        <div className="flex flex-col gap-1">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className="px-4 py-3 rounded-lg text-sm font-medium transition-colors"
                                    style={{ color: "var(--color-text-secondary)" }}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
