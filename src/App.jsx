import { useState, useEffect } from "react";
import SmoothScroll from "./components/layout/SmoothScroll";
import AmbientBackground from "./components/layout/AmbientBackground";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Experience from "./components/sections/Experience";
import Skills from "./components/sections/Skills";
import Contact from "./components/sections/Contact";
import { FaGithub } from "react-icons/fa";
import { Monitor, X } from "lucide-react";

function MobileBanner() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (window.innerWidth < 768 && !sessionStorage.getItem("mobile-dismissed")) {
            setVisible(true);
        }
    }, []);

    if (!visible) return null;

    const dismiss = () => {
        setVisible(false);
        sessionStorage.setItem("mobile-dismissed", "1");
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 md:hidden"
            style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
        >
            <div
                className="w-full max-w-sm rounded-2xl p-6 text-center"
                style={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    boxShadow: "var(--shadow-lg)",
                }}
            >
                <Monitor className="w-8 h-8 mx-auto mb-4" style={{ color: "var(--color-accent)" }} />
                <h3 className="text-lg font-bold mb-2">Desktop Recommended</h3>
                <p className="text-sm mb-5" style={{ color: "var(--color-text-secondary)" }}>
                    This site is best viewed on desktop for the full experience.
                </p>
                <button
                    onClick={dismiss}
                    className="cursor-pointer w-full py-2.5 rounded-xl text-sm font-semibold transition-colors"
                    style={{
                        background: "var(--color-accent)",
                        color: "white",
                    }}
                >
                    Continue Anyway
                </button>
            </div>
        </div>
    );
}

export default function App() {
    return (
        <SmoothScroll>
            <div className="min-h-screen relative">
                <AmbientBackground />
                <Navbar />
                <MobileBanner />
                <main className="relative z-10">
                    <Hero />
                    <About />
                    <Experience />
                    <Skills />
                    <Contact />
                    <footer
                        className="py-10 px-6 text-center text-sm"
                        style={{
                            borderTop: "1px solid var(--color-border)",
                            color: "var(--color-text-muted)",
                        }}
                    >
                        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                            <p className="font-medium">
                                &copy; {new Date().getFullYear()} auvq
                            </p>
                            <div className="flex items-center gap-4">
                                <a
                                    href="https://github.com/auvq"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="transition-colors duration-200"
                                    style={{ color: "var(--color-text-muted)" }}
                                    onMouseEnter={(e) => (e.target.style.color = "var(--color-text-primary)")}
                                    onMouseLeave={(e) => (e.target.style.color = "var(--color-text-muted)")}
                                >
                                    <FaGithub className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </footer>
                </main>
            </div>
        </SmoothScroll>
    );
}
