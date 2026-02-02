import { useRef, useEffect, useCallback } from "react";

const Particles = ({
    particleCount = 80,
    particleSize = 2,
    particleColor = "rgba(255, 255, 255, 0.5)",
    lineColor = "rgba(255, 255, 255, 0.1)",
    particleSpeed = 0.3,
    connectionDistance = 150,
    mouseRadius = 200,
}) => {
    const canvasRef = useRef(null);
    const requestRef = useRef(null);
    const particlesRef = useRef([]);
    const mouseRef = useRef({ x: null, y: null });

    const createParticle = useCallback((canvas) => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * particleSpeed,
        vy: (Math.random() - 0.5) * particleSpeed,
        size: Math.random() * particleSize + 1,
        opacity: Math.random() * 0.5 + 0.2,
    }), [particleSpeed, particleSize]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particlesRef.current = [];
            for (let i = 0; i < particleCount; i++) {
                particlesRef.current.push(createParticle(canvas));
            }
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        const drawParticle = (particle) => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particleColor.replace("0.5", particle.opacity.toString());
            ctx.fill();
        };

        const drawConnection = (p1, p2, distance) => {
            const opacity = (1 - distance / connectionDistance) * 0.3;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = lineColor.replace("0.1", opacity.toString());
            ctx.lineWidth = 0.5;
            ctx.stroke();
        };

        const updateParticle = (particle) => {
            if (mouseRef.current.x !== null && mouseRef.current.y !== null) {
                const dx = mouseRef.current.x - particle.x;
                const dy = mouseRef.current.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouseRadius) {
                    const force = (mouseRadius - distance) / mouseRadius;
                    const angle = Math.atan2(dy, dx);
                    particle.vx -= Math.cos(angle) * force * 0.02;
                    particle.vy -= Math.sin(angle) * force * 0.02;
                }
            }

            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vx *= 0.99;
            particle.vy *= 0.99;
            particle.vx += (Math.random() - 0.5) * 0.01;
            particle.vy += (Math.random() - 0.5) * 0.01;

            const maxVel = particleSpeed * 2;
            particle.vx = Math.max(-maxVel, Math.min(maxVel, particle.vx));
            particle.vy = Math.max(-maxVel, Math.min(maxVel, particle.vy));

            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particlesRef.current.forEach((particle, i) => {
                updateParticle(particle);
                drawParticle(particle);

                for (let j = i + 1; j < particlesRef.current.length; j++) {
                    const other = particlesRef.current[j];
                    const dx = particle.x - other.x;
                    const dy = particle.y - other.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < connectionDistance) drawConnection(particle, other, distance);
                }

                if (mouseRef.current.x !== null && mouseRef.current.y !== null) {
                    const dx = particle.x - mouseRef.current.x;
                    const dy = particle.y - mouseRef.current.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance * 1.5) {
                        const opacity = (1 - distance / (connectionDistance * 1.5)) * 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
                        ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            });

            const gradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 0,
                canvas.width / 2, canvas.height / 2, Math.sqrt(canvas.width ** 2 + canvas.height ** 2) / 2
            );
            gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
            gradient.addColorStop(1, "rgba(0, 0, 0, 0.5)");
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            requestRef.current = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e) => {
            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;
        };

        const handleMouseLeave = () => {
            mouseRef.current.x = null;
            mouseRef.current.y = null;
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseleave", handleMouseLeave);
        requestRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
            cancelAnimationFrame(requestRef.current);
        };
    }, [particleCount, particleSize, particleColor, lineColor, particleSpeed, connectionDistance, mouseRadius, createParticle]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full"
            style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #0d0d0d 50%, #0a0a0a 100%)" }}
        />
    );
};

export default function InteractiveBackground() {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="pointer-events-auto w-full h-full">
                <Particles
                    particleCount={100}
                    particleSize={2}
                    particleColor="rgba(255, 255, 255, 0.6)"
                    lineColor="rgba(255, 255, 255, 0.08)"
                    particleSpeed={0.4}
                    connectionDistance={120}
                    mouseRadius={180}
                />
            </div>

            <div
                className="absolute top-0 left-0 w-[60%] h-[60%] opacity-40 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 0% 0%, rgba(139, 92, 246, 0.12) 0%, transparent 50%)" }}
            />
            <div
                className="absolute bottom-0 right-0 w-[60%] h-[60%] opacity-40 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 100% 100%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)" }}
            />
        </div>
    );
}
