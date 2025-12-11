/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * COMPONENT: The Logic Engine (System Architect Visual)
 * THEME: Teal Protocol (#2bb1bb) + Amber Action (#F59E0B)
 */

'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Octahedron, Torus, Box, Stars, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Brand Colors
const TEAL = "#2bb1bb";
const AMBER = "#F59E0B";
const DARK_BG = "#0f172a"; // Slate 900

// 1. The Central Truth (Amber Core)
const LogicCore = () => {
    const ref = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (ref.current) {
            const t = state.clock.getElapsedTime();
            // Slow, heavy breathing rotation
            ref.current.rotation.y = t * 0.2;
            ref.current.rotation.z = t * 0.1;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            {/* Octahedron represents mathematical precision */}
            <Octahedron ref={ref} args={[1, 0]} position={[0, 0, 0]}>
                <MeshDistortMaterial
                    color={AMBER}
                    envMapIntensity={1}
                    clearcoat={1}
                    clearcoatRoughness={0}
                    metalness={0.8}
                    roughness={0.2}
                    distort={0.3} // Makes it look "alive" like a brain or active core
                    speed={1.5}
                />
            </Octahedron>
        </Float>
    );
};

// 2. The Systems (Teal Rings)
const SystemRing = ({
    radius,
    speed,
    axis
}: {
    radius: number;
    speed: number;
    axis: 'x' | 'y' | 'z'
}) => {
    const ref = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (ref.current) {
            const t = state.clock.getElapsedTime();
            if (axis === 'x') ref.current.rotation.x = t * speed;
            if (axis === 'y') ref.current.rotation.y = t * speed;
            if (axis === 'z') ref.current.rotation.z = t * speed;

            // Add slight wobble to represent dynamic systems
            ref.current.rotation.x += Math.sin(t * 0.5) * 0.002;
        }
    });

    return (
        <Torus ref={ref} args={[radius, 0.03, 16, 100]}>
            <meshStandardMaterial
                color={TEAL}
                emissive={TEAL}
                emissiveIntensity={0.8}
                metalness={0.8}
                roughness={0.1}
                transparent
                opacity={0.6}
                wireframe // Wireframe looks more "Architectural/Blueprint"
            />
        </Torus>
    );
};

// 3. The Data Points (Floating Bits)
const DataParticle = ({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) => {
    const ref = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (ref.current) {
            const t = state.clock.getElapsedTime();
            ref.current.position.y = position[1] + Math.sin(t + position[0]) * 0.3;
            ref.current.rotation.x = t * 0.5;
        }
    });

    return (
        <Box ref={ref} args={[0.2, 0.2, 0.2]} position={position} scale={scale}>
            <meshStandardMaterial color="#FFFFFF" opacity={0.4} transparent />
        </Box>
    );
};

// --- MAIN SCENE EXPORT ---
export const LogicEngineScene: React.FC = () => {
    return (
        <div className="w-full h-full absolute inset-0 bg-slate-900">
            <Canvas camera={{ position: [0, 0, 6], fov: 40 }}>
                {/* Lighting Setup */}
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color={TEAL} />
                <spotLight position={[-5, -5, 5]} angle={0.3} penumbra={1} intensity={2} color={AMBER} />

                {/* Environment Reflection */}
                <Environment preset="city" />

                {/* The Core Logic */}
                <LogicCore />

                {/* The Protective Systems (Orbiting Rings) */}
                <group rotation={[Math.PI / 4, Math.PI / 6, 0]}>
                    <SystemRing radius={2} speed={0.2} axis="x" />
                    <SystemRing radius={2.5} speed={0.15} axis="y" />
                    <SystemRing radius={3} speed={0.1} axis="x" />
                </group>

                {/* Floating Data Evidence */}
                <Float speed={2} rotationIntensity={0.2} floatIntensity={1}>
                    <DataParticle position={[-3, 2, -2]} scale={0.5} />
                    <DataParticle position={[3, -2, -1]} scale={0.7} />
                    <DataParticle position={[2, 2, 1]} scale={0.4} />
                    <DataParticle position={[-2, -1, 2]} scale={0.6} />
                </Float>

                {/* Background Depth */}
                <Stars radius={50} depth={50} count={2000} factor={4} saturation={0} fade speed={0.5} />

                {/* Fog for depth */}
                <fog attach="fog" args={[DARK_BG, 5, 20]} />
            </Canvas>
        </div>
    );
};