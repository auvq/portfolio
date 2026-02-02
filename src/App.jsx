import InteractiveBackground from "./components/layout/InteractiveBackground";
import Hero from "./components/sections/Hero";
import BentoGrid from "./components/sections/BentoGrid";
import Experience from "./components/sections/Experience";
import SkillsMarquee from "./components/sections/SkillsMarquee";
import ContactSimple from "./components/sections/ContactSimple";

export default function App() {
    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
            <InteractiveBackground />
            <main className="relative z-10">
                <Hero />
                <BentoGrid />
                <Experience />
                <SkillsMarquee />
                <ContactSimple />
                <footer className="py-12 text-center text-neutral-600 text-sm border-t border-neutral-900">
                    <p className="font-medium">&copy; {new Date().getFullYear()} auvq</p>
                </footer>
            </main>
        </div>
    );
}
