
'use client';

import React, { useRef, useEffect } from 'react';

interface Particle {
    x: number;
    y: number;
    radius: number;
    speed: number;
    wind: number;
    opacity: number;
    swayOffset: number;
}

interface SnowstormProps {
    windIntensity: number;
}

const Snowstorm: React.FC<SnowstormProps> = ({ windIntensity }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        let mouseX = -1000;
        let mouseY = -1000;

        // Weather Variables derived from props
        // windIntensity is 10-40.
        // Map to baseWindSpeed: 10 -> 0.2, 40 -> 1.5 (stronger drift)
        // Randomize direction slightly but bias towards wind intensity
        const direction = Math.random() > 0.5 ? 1 : -1;
        const baseWindSpeed = (windIntensity / 20) * direction;
        const gravityMultiplier = 0.5 + (windIntensity / 40); // 0.75 to 1.5

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createParticles = () => {
            particles = [];
            const particleCount = 150 + (windIntensity * 2); // More wind = more snow? Or keep it separate? User said "Higher wind = Faster horizontal drift". Let's scale count slightly too.

            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 2 + 1, // 1-3px
                    speed: (Math.random() * 1 + 0.5) * gravityMultiplier,
                    wind: (Math.random() * 0.5 - 0.25) + baseWindSpeed,
                    opacity: Math.random() * 0.5 + 0.3,
                    swayOffset: Math.random() * Math.PI * 2,
                });
            }
        };

        const updateParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p) => {
                // Physics
                p.y += p.speed;
                p.x += Math.sin(p.swayOffset) * 0.5 + p.wind;
                p.swayOffset += 0.01;

                // Mouse interaction (Repel)
                const dx = p.x - mouseX;
                const dy = p.y - mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const repelRadius = 150;

                if (distance < repelRadius) {
                    const force = (repelRadius - distance) / repelRadius;
                    const angle = Math.atan2(dy, dx);
                    const pushStrength = 2;
                    p.x += Math.cos(angle) * force * pushStrength;
                    p.y += Math.sin(angle) * force * pushStrength;
                }

                // Reset if out of bounds
                if (p.y > canvas.height) {
                    p.y = -10;
                    p.x = Math.random() * canvas.width;
                }
                if (p.x > canvas.width) {
                    p.x = 0;
                } else if (p.x < 0) {
                    p.x = canvas.width;
                }

                // Draw
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(updateParticles);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', handleMouseMove);

        resizeCanvas();
        createParticles();
        updateParticles();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [windIntensity]); // Re-run if wind changes

    return (
        <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full pointer-events-none z-50"
        />
    );
};

export default Snowstorm;
