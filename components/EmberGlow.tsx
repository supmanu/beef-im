'use client';

import React, { useRef, useEffect } from 'react';

interface Ember {
    x: number;
    y: number;
    radius: number;
    speed: number;
    drift: number;
    opacity: number;
    swayOffset: number;
}

interface EmberGlowProps {
    intensity?: number;
}

const EmberGlow: React.FC<EmberGlowProps> = ({ intensity = 60 }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let embers: Ember[] = [];
        let mouseX = -1000;
        let mouseY = -1000;
        let dimScale = 1;
        let fadeZone = 100;
        let glowBlur = 6;

        const BASE_AREA = 1920 * 1080;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            const area = canvas.width * canvas.height;
            // Linear-dimensional scale: ~0.4 on mobile portrait, 1.0 on 1080p desktop.
            // Particles, glow, and fade-zone all scale with this so each ember
            // occupies the same visual fraction of the viewport on any device.
            dimScale = Math.sqrt(area / BASE_AREA);
            fadeZone = 100 * dimScale;
            glowBlur = 6 * dimScale;
            createEmbers();
        };

        const createEmbers = () => {
            embers = [];
            const area = canvas.width * canvas.height;
            // Power 1.4 makes count drop sharply on small screens — 180 on
            // desktop 1080p, ~14 on mobile portrait. Bigger glow-radius
            // particles on mobile would otherwise overcrowd the hero.
            const rawCount = Math.round(180 * Math.pow(area / BASE_AREA, 1.4));
            const count = Math.max(8, Math.min(500, rawCount));

            for (let i = 0; i < count; i++) {
                embers.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: (Math.random() * 2 + 1) * dimScale,
                    speed: Math.random() * 0.6 + 0.2,
                    drift: Math.random() * 0.3 - 0.15,
                    opacity: Math.random() * 0.5 + 0.3,
                    swayOffset: Math.random() * Math.PI * 2,
                });
            }
        };

        const draw = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.shadowColor = 'rgba(255, 209, 102, 0.12)';
            ctx.shadowBlur = glowBlur;

            embers.forEach((e) => {
                e.y -= e.speed;
                e.x += Math.sin(e.swayOffset) * 0.5 + e.drift;
                e.swayOffset += 0.01;

                const dx = e.x - mouseX;
                const dy = e.y - mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const repelRadius = 150;

                if (distance < repelRadius) {
                    const force = (repelRadius - distance) / repelRadius;
                    const angle = Math.atan2(dy, dx);
                    const pushStrength = 2;
                    e.x += Math.cos(angle) * force * pushStrength;
                    e.y += Math.sin(angle) * force * pushStrength;
                }

                if (e.y < -10) {
                    e.y = canvas.height + 10;
                    e.x = Math.random() * canvas.width;
                }
                if (e.x > canvas.width) {
                    e.x = 0;
                } else if (e.x < 0) {
                    e.x = canvas.width;
                }

                const fade = e.y < fadeZone ? Math.max(0.05, e.y / fadeZone) : 1;

                ctx.beginPath();
                ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 209, 102, ${e.opacity * fade})`;
                ctx.fill();
            });

            ctx.shadowBlur = 0;
            animationFrameId = requestAnimationFrame(draw);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', handleMouseMove);

        resizeCanvas();
        draw();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [intensity]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full pointer-events-none z-50"
        />
    );
};

export default EmberGlow;
