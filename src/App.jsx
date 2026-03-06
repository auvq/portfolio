import SmoothScroll from "./components/layout/SmoothScroll";
import AmbientBackground from "./components/layout/AmbientBackground";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Experience from "./components/sections/Experience";
import Skills from "./components/sections/Skills";
import Contact from "./components/sections/Contact";
import { FaGithub } from "react-icons/fa";

export default function App() {
    return (
        <SmoothScroll>
            <div className="min-h-screen relative">
                <AmbientBackground />
                <Navbar />
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
