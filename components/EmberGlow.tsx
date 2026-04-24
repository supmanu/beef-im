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

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createEmbers = () => {
            embers = [];
            const count = 120 + intensity;

            for (let i = 0; i < count; i++) {
                embers.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 2 + 1,
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
            ctx.shadowBlur = 6;

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

                const fade = e.y < 100 ? Math.max(0.05, e.y / 100) : 1;

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
        createEmbers();
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
