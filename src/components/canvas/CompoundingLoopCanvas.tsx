'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Torus, Line } from '@react-three/drei'
import * as THREE from 'three'

// ── 1. CIRCULATING ORBITAL ENERGY PACKET ──
function OrbitalPhoton({ radius = 1.6, speed = 1, color = '#D4B270', phase = 0, tiltAngle = 0 }: { radius?: number; speed?: number; color?: string; phase?: number; tiltAngle?: number }) {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (!meshRef.current) return
        const t = state.clock.getElapsedTime() * speed + phase
        const x = radius * Math.cos(t)
        const y = radius * Math.sin(t) * Math.cos(tiltAngle)
        const z = radius * Math.sin(t) * Math.sin(tiltAngle)
        meshRef.current.position.set(x, y, z)
    })

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={2.5}
                roughness={0.1}
                metalness={0.9}
            />
        </mesh>
    )
}

// ── 2. TRIPLE INTERLOCKING TORUS RINGS (Software, Distribution, Growth) ──
function TripleEcosystemCore({ activeIndex = null }: { activeIndex: number | null }) {
    const groupRef = useRef<THREE.Group>(null)

    useFrame((state, delta) => {
        if (!groupRef.current) return
        groupRef.current.rotation.y += delta * 0.25
        groupRef.current.rotation.x += delta * 0.12
    })

    return (
        <group ref={groupRef}>
            {/* 1. Software Ring (Gold / Brass) */}
            <mesh rotation={[0, 0, 0]}>
                <torusGeometry args={[1.5, 0.025, 16, 80]} />
                <meshStandardMaterial
                    color="#D4B270"
                    emissive="#9B7545"
                    emissiveIntensity={0.6}
                    metalness={0.9}
                    roughness={0.2}
                />
            </mesh>
            <OrbitalPhoton radius={1.5} speed={0.9} color="#D4B270" phase={0} tiltAngle={0} />

            {/* 2. Distribution Ring (Sage / Green) */}
            <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
                <torusGeometry args={[1.5, 0.025, 16, 80]} />
                <meshStandardMaterial
                    color="#8FA994"
                    emissive="#3F5544"
                    emissiveIntensity={0.6}
                    metalness={0.9}
                    roughness={0.2}
                />
            </mesh>
            <OrbitalPhoton radius={1.5} speed={1.1} color="#8FA994" phase={Math.PI * 0.6} tiltAngle={Math.PI / 3} />

            {/* 3. Demand Ring (Warm White / Platinum) */}
            <mesh rotation={[-Math.PI / 3, -Math.PI / 4, 0]}>
                <torusGeometry args={[1.5, 0.025, 16, 80]} />
                <meshStandardMaterial
                    color="#FAF8F5"
                    emissive="#D4B270"
                    emissiveIntensity={0.8}
                    metalness={0.95}
                    roughness={0.1}
                />
            </mesh>
            <OrbitalPhoton radius={1.5} speed={0.8} color="#FAF8F5" phase={Math.PI * 1.2} tiltAngle={-Math.PI / 3} />

            {/* Central Convergence Core */}
            <mesh>
                <sphereGeometry args={[0.35, 32, 32]} />
                <meshStandardMaterial
                    color="#181A16"
                    emissive="#9B7545"
                    emissiveIntensity={0.4}
                    roughness={0.1}
                    metalness={0.9}
                />
            </mesh>
        </group>
    )
}

// ── 3. EXPORTED CANVAS COMPONENT ──
export default function CompoundingLoopCanvas({ activeIndex = null }: { activeIndex?: number | null }) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <div className="w-full h-full min-h-[300px] flex items-center justify-center bg-[#181A16] rounded-3xl">
                <div className="w-7 h-7 rounded-full border-2 border-[#D4B270] border-t-transparent animate-spin" />
            </div>
        )
    }

    return (
        <div className="w-full h-[280px] sm:h-[340px] relative pointer-events-auto">
            <Canvas
                camera={{ position: [0, 0, 4.2], fov: 42 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            >
                <ambientLight intensity={0.5} />
                <directionalLight position={[4, 6, 4]} intensity={1.3} color="#FFF8E7" />
                <pointLight position={[-3, -2, 2]} intensity={0.8} color="#D4B270" />

                <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.4}>
                    <TripleEcosystemCore activeIndex={activeIndex} />
                </Float>
            </Canvas>
        </div>
    )
}
