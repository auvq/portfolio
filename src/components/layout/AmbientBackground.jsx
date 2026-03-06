import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function SpotlightCursor({ radius = 250, brightness = 0.08, color = "#6366f1" }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animId;
        let mouseX = -1000;
        let mouseY = -1000;
        let smoothX = -1000;
        let smoothY = -1000;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const onMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const onLeave = () => {
            mouseX = -1000;
            mouseY = -1000;
        };

        const hexToRgb = (hex) => {
            const n = parseInt(hex.slice(1), 16);
            return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            smoothX += (mouseX - smoothX) * 0.15;
            smoothY += (mouseY - smoothY) * 0.15;

            if (smoothX > -500 && smoothY > -500) {
                const gradient = ctx.createRadialGradient(smoothX, smoothY, 0, smoothX, smoothY, radius);
                const rgb = hexToRgb(color);
                gradient.addColorStop(0, `rgba(${rgb}, ${brightness})`);
                gradient.addColorStop(1, "rgba(0,0,0,0)");
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            animId = requestAnimationFrame(draw);
        };

        resize();
        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseleave", onLeave);
        animId = requestAnimationFrame(draw);

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseleave", onLeave);
            cancelAnimationFrame(animId);
        };
    }, [radius, brightness, color]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[1]"
            style={{ width: "100%", height: "100%" }}
        />
    );
}

function ScrollGradient() {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const isDark = document.documentElement.classList.contains("dark");

        const colors = isDark ? [
            { from: "rgba(99,102,241,0.12)", to: "rgba(139,92,246,0.08)", angle: 135 },
            { from: "rgba(6,182,212,0.10)", to: "rgba(99,102,241,0.08)", angle: 160 },
            { from: "rgba(139,92,246,0.12)", to: "rgba(236,72,153,0.06)", angle: 200 },
            { from: "rgba(6,182,212,0.10)", to: "rgba(34,197,94,0.06)", angle: 170 },
            { from: "rgba(99,102,241,0.12)", to: "rgba(139,92,246,0.08)", angle: 135 },
        ] : [
            { from: "rgba(99,102,241,0.08)", to: "rgba(139,92,246,0.06)", angle: 135 },
            { from: "rgba(6,182,212,0.07)", to: "rgba(99,102,241,0.06)", angle: 160 },
            { from: "rgba(139,92,246,0.08)", to: "rgba(236,72,153,0.05)", angle: 200 },
            { from: "rgba(6,182,212,0.07)", to: "rgba(34,197,94,0.05)", angle: 170 },
            { from: "rgba(99,102,241,0.08)", to: "rgba(139,92,246,0.06)", angle: 135 },
        ];

        const obj = { progress: 0 };

        const lerp = (a, b, t) => a + (b - a) * t;

        const parseRGBA = (str) => {
            const m = str.match(/[\d.]+/g);
            return m ? m.map(Number) : [0, 0, 0, 0];
        };

        const toRGBA = (arr) => `rgba(${Math.round(arr[0])},${Math.round(arr[1])},${Math.round(arr[2])},${arr[3].toFixed(3)})`;

        const lerpColor = (c1, c2, t) => {
            const a = parseRGBA(c1);
            const b = parseRGBA(c2);
            return toRGBA(a.map((v, i) => lerp(v, b[i], t)));
        };

        const update = () => {
            const p = obj.progress;
            const total = colors.length - 1;
            const segment = p * total;
            const idx = Math.min(Math.floor(segment), total - 1);
            const t = segment - idx;

            const from = lerpColor(colors[idx].from, colors[idx + 1].from, t);
            const to = lerpColor(colors[idx].to, colors[idx + 1].to, t);
            const angle = lerp(colors[idx].angle, colors[idx + 1].angle, t);

            el.style.background = `linear-gradient(${angle}deg, ${from} 0%, transparent 40%), radial-gradient(ellipse at 50% 0%, ${to} 0%, transparent 60%)`;
        };

        update();

        const ctx = gsap.context(() => {
            gsap.to(obj, {
                progress: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: document.documentElement,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1.5,
                },
                onUpdate: update,
            });
        });

        return () => ctx.revert();
    }, []);

    return <div ref={ref} className="absolute inset-0 transition-opacity duration-500" />;
}

function FloatingOrbs() {
    return (
        <div className="absolute inset-0 overflow-hidden">
            <div className="orb orb-1" />
            <div className="orb orb-2" />
            <div className="orb orb-3" />
        </div>
    );
}

export default function AmbientBackground() {
    return (
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
            <ScrollGradient />
            <FloatingOrbs />
            <SpotlightCursor radius={350} brightness={0.04} color="#6366f1" />
            <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.015 }}>
                <filter id="noise">
                    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noise)" />
            </svg>
        </div>
    );
}
