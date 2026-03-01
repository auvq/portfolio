import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FRAME_URLS from "../effects/frameUrls.js";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = FRAME_URLS.length;

function ScrollCanvas() {
    const canvasRef = useRef(null);
    const framesRef = useRef([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        let cancelled = false;
        const images = [];
        let loadedCount = 0;

        FRAME_URLS.forEach((url) => {
            const img = new Image();
            img.src = url;
            img.onload = () => {
                loadedCount++;
                if (!cancelled && loadedCount === TOTAL_FRAMES) {
                    framesRef.current = images;
                    setLoaded(true);
                }
            };
            images.push(img);
        });

        return () => { cancelled = true; };
    }, []);

    useEffect(() => {
        if (!loaded) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const frames = framesRef.current;

        canvas.width = frames[0].naturalWidth;
        canvas.height = frames[0].naturalHeight;
        ctx.drawImage(frames[0], 0, 0);

        const obj = { frame: 0 };
        let lastDrawn = -1;

        const drawBlended = () => {
            const f = obj.frame;
            const floor = Math.floor(f);
            const ceil = Math.min(floor + 1, TOTAL_FRAMES - 1);
            const blend = f - floor;

            if (f === lastDrawn) return;
            lastDrawn = f;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (blend < 0.01 || floor === ceil) {
                ctx.drawImage(frames[floor], 0, 0);
            } else {
                ctx.globalAlpha = 1;
                ctx.drawImage(frames[floor], 0, 0);
                ctx.globalAlpha = blend;
                ctx.drawImage(frames[ceil], 0, 0);
                ctx.globalAlpha = 1;
            }
        };

        const ctx2 = gsap.context(() => {
            gsap.to(obj, {
                frame: TOTAL_FRAMES - 1,
                ease: "none",
                scrollTrigger: {
                    trigger: document.documentElement,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.8,
                },
                onUpdate: drawBlended,
            });
        });

        return () => ctx2.revert();
    }, [loaded]);

    return (
        <div className="absolute inset-0 flex items-center justify-end overflow-hidden" style={{ paddingRight: "5%" }}>
            <canvas
                ref={canvasRef}
                style={{
                    width: "50vw",
                    maxWidth: "700px",
                    height: "auto",
                    opacity: loaded ? 0.3 : 0,
                    transition: "opacity 0.8s ease",
                    mask: "radial-gradient(ellipse at center 40%, black 30%, transparent 70%)",
                    WebkitMask: "radial-gradient(ellipse at center 40%, black 30%, transparent 70%)",
                }}
            />
        </div>
    );
}

const CODE_LINES = [
    [{ text: "package ", cls: "kw" }, { text: "com.auvq.core", cls: "tp" }, { text: ";", cls: "pl" }],
    [],
    [{ text: "import ", cls: "kw" }, { text: "org.bukkit.plugin.java.JavaPlugin", cls: "tp" }, { text: ";", cls: "pl" }],
    [{ text: "import ", cls: "kw" }, { text: "org.bukkit.Bukkit", cls: "tp" }, { text: ";", cls: "pl" }],
    [],
    [{ text: "public class ", cls: "kw" }, { text: "Core ", cls: "tp" }, { text: "extends ", cls: "kw" }, { text: "JavaPlugin ", cls: "tp" }, { text: "{", cls: "pl" }],
    [],
    [{ text: "    private ", cls: "kw" }, { text: "CommandManager ", cls: "tp" }, { text: "commandManager", cls: "vr" }, { text: ";", cls: "pl" }],
    [{ text: "    private ", cls: "kw" }, { text: "EventHandler ", cls: "tp" }, { text: "eventHandler", cls: "vr" }, { text: ";", cls: "pl" }],
    [],
    [{ text: "    @Override", cls: "an" }],
    [{ text: "    public void ", cls: "kw" }, { text: "onEnable", cls: "fn" }, { text: "() {", cls: "pl" }],
    [{ text: "        // Initialize core systems", cls: "cm" }],
    [{ text: "        commandManager", cls: "vr" }, { text: " = ", cls: "pl" }, { text: "new ", cls: "kw" }, { text: "CommandManager", cls: "tp" }, { text: "(", cls: "pl" }, { text: "this", cls: "kw" }, { text: ");", cls: "pl" }],
    [{ text: "        eventHandler", cls: "vr" }, { text: " = ", cls: "pl" }, { text: "new ", cls: "kw" }, { text: "EventHandler", cls: "tp" }, { text: "(", cls: "pl" }, { text: "this", cls: "kw" }, { text: ");", cls: "pl" }],
    [],
    [{ text: "        getLogger", cls: "fn" }, { text: "().info(", cls: "pl" }, { text: '"Core enabled!"', cls: "st" }, { text: ");", cls: "pl" }],
    [{ text: "        loadConfig", cls: "fn" }, { text: "();", cls: "pl" }],
    [{ text: "        registerListeners", cls: "fn" }, { text: "();", cls: "pl" }],
    [{ text: "    }", cls: "pl" }],
    [],
    [{ text: "    private void ", cls: "kw" }, { text: "registerListeners", cls: "fn" }, { text: "() {", cls: "pl" }],
    [{ text: "        Bukkit", cls: "tp" }, { text: ".getPluginManager().registerEvents(", cls: "pl" }],
    [{ text: "            new ", cls: "kw" }, { text: "PlayerListener", cls: "tp" }, { text: "(", cls: "pl" }, { text: "this", cls: "kw" }, { text: "),", cls: "pl" }],
    [{ text: "            this", cls: "kw" }],
    [{ text: "        );", cls: "pl" }],
    [{ text: "    }", cls: "pl" }],
    [{ text: "}", cls: "pl" }],
];

function buildChars() {
    const chars = [];
    CODE_LINES.forEach((segs) => {
        if (segs.length === 0) { chars.push({ char: "\n", cls: "pl" }); return; }
        segs.forEach((seg) => {
            for (const ch of seg.text) chars.push({ char: ch, cls: seg.cls });
        });
        chars.push({ char: "\n", cls: "pl" });
    });
    return chars;
}

const ALL_CHARS = buildChars();

function buildHtmlUpTo(count) {
    let html = "";
    for (let i = 0; i < count && i < ALL_CHARS.length; i++) {
        const c = ALL_CHARS[i];
        if (c.char === "\n") html += "\n";
        else if (c.char === " ") html += " ";
        else html += `<span class="code-${c.cls}">${c.char}</span>`;
    }
    return html;
}

function snapToLineEnd(target) {
    for (let i = target; i < ALL_CHARS.length; i++) {
        if (ALL_CHARS[i].char === "\n") return i + 1;
    }
    return target;
}

const INITIAL_COUNT = snapToLineEnd(Math.floor(ALL_CHARS.length * 0.3));

function TypingCode() {
    const codeRef = useRef(null);
    const cursorRef = useRef(null);
    const prevCount = useRef(-1);
    const scrollRef = useRef(0);
    const smoothScroll = useRef(0);
    const rafRef = useRef(null);
    const introCount = useRef(0);
    const introDone = useRef(false);
    const startTime = useRef(null);

    useEffect(() => {
        const onScroll = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            scrollRef.current = max > 0 ? window.scrollY / max : 0;
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const tick = useCallback((now) => {
        if (!startTime.current) startTime.current = now;
        const elapsed = now - startTime.current;
        let charCount;

        if (!introDone.current) {
            if (elapsed < 200) {
                charCount = 0;
            } else {
                introCount.current = Math.min(introCount.current + 0.5, INITIAL_COUNT);
                if (introCount.current >= INITIAL_COUNT) introDone.current = true;
                charCount = introCount.current;
            }
        } else {
            smoothScroll.current += (scrollRef.current - smoothScroll.current) * 0.06;
            charCount = INITIAL_COUNT + Math.floor(smoothScroll.current * (ALL_CHARS.length - INITIAL_COUNT));
        }

        if (charCount !== prevCount.current && codeRef.current) {
            prevCount.current = charCount;
            codeRef.current.innerHTML = buildHtmlUpTo(charCount);
        }

        if (cursorRef.current) {
            cursorRef.current.style.opacity = Math.floor(now / 400) % 2 === 0 ? "1" : "0";
        }

        rafRef.current = requestAnimationFrame(tick);
    }, []);

    useEffect(() => {
        rafRef.current = requestAnimationFrame(tick);
        return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
    }, [tick]);

    return (
        <div
            className="absolute inset-0 overflow-hidden"
            style={{
                opacity: 0.2,
                filter: "blur(2px)",
                mask: "linear-gradient(to right, black 0%, black 40%, transparent 70%)",
                WebkitMask: "linear-gradient(to right, black 0%, black 40%, transparent 70%)",
            }}
        >
            <pre style={{
                fontFamily: '"Fira Code", "JetBrains Mono", "Cascadia Code", monospace',
                fontSize: "clamp(10px, 1.2vw, 15px)",
                lineHeight: 1.6,
                whiteSpace: "pre",
                margin: 0,
                padding: "3rem",
                color: "#d4d4d4",
                position: "absolute",
                top: "50%",
                left: "0",
                transform: "translateY(-50%)",
            }}>
                <span ref={codeRef} />
                <span
                    ref={cursorRef}
                    style={{
                        display: "inline-block",
                        width: "2px",
                        height: "1.2em",
                        background: "#22c55e",
                        boxShadow: "0 0 8px #22c55e, 0 0 20px rgba(34, 197, 94, 0.4)",
                        verticalAlign: "text-bottom",
                        marginLeft: "1px",
                    }}
                />
            </pre>
        </div>
    );
}

export default function AmbientBackground() {
    return (
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
            <TypingCode />
            <ScrollCanvas />
            <svg
                className="absolute inset-0 w-full h-full opacity-[0.03]"
                xmlns="http://www.w3.org/2000/svg"
                style={{ pointerEvents: "none" }}
            >
                <filter id="noise-desktop">
                    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noise-desktop)" />
            </svg>
            <div
                className="absolute inset-0"
                style={{
                    background: "radial-gradient(ellipse at 50% 50%, transparent 0%, rgba(5,5,7,0.3) 40%, rgba(5,5,7,0.75) 100%)",
                    pointerEvents: "none",
                }}
            />
        </div>
    );
}
