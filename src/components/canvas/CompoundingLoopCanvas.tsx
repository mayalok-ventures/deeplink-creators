'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import * as THREE from 'three'

// ── 1. TRAVELLING INPUT SIGNAL CONDUIT ──
function InputSignalStream({ curve, speed = 0.6, color = '#D4B270', offset = 0 }: { curve: THREE.QuadraticBezierCurve3; speed?: number; color?: string; offset?: number }) {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (!meshRef.current) return
        const t = (state.clock.getElapsedTime() * speed + offset) % 1
        const pos = curve.getPoint(t)
        meshRef.current.position.set(pos.x, pos.y, pos.z)
    })

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[0.065, 16, 16]} />
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

// ── 2. CIRCULATING COMPOUNDING ORBITAL PACKET ──
function CompoundingPhoton({ radius = 1.6, speed = 1, color = '#D4B270', phase = 0, tilt = 0 }: { radius?: number; speed?: number; color?: string; phase?: number; tilt?: number }) {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (!meshRef.current) return
        const t = state.clock.getElapsedTime() * speed + phase
        const x = radius * Math.cos(t)
        const y = radius * Math.sin(t) * Math.cos(tilt)
        const z = radius * Math.sin(t) * Math.sin(tilt)
        meshRef.current.position.set(x, y, z)
    })

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[0.075, 16, 16]} />
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={2.8}
                roughness={0.1}
                metalness={0.9}
            />
        </mesh>
    )
}

// ── 3. CONVERGENCE SCENE (Many Inputs -> One System -> Compounding Output) ──
function ConvergenceEngineCore({ activeIndex = null }: { activeIndex: number | null }) {
    const groupRef = useRef<THREE.Group>(null)

    // 6 Incoming Growth Levers (SEO, Performance, Content, Creators, Automation, Sahyak CRM)
    const inputLevers = useMemo(() => {
        const center = new THREE.Vector3(0, 0, 0)
        const inputs = [
            { name: 'SEO', pos: new THREE.Vector3(-3.2, 1.4, 0.4), color: '#D4B270' },
            { name: 'Performance', pos: new THREE.Vector3(-3.2, 0, 0), color: '#D4B270' },
            { name: 'Creators', pos: new THREE.Vector3(-3.2, -1.4, -0.4), color: '#8FA994' },
            { name: 'Content', pos: new THREE.Vector3(3.2, 1.4, -0.4), color: '#FAF8F5' },
            { name: 'Automation', pos: new THREE.Vector3(3.2, 0, 0), color: '#D4B270' },
            { name: 'Sahyak CRM', pos: new THREE.Vector3(3.2, -1.4, 0.4), color: '#8FA994' }
        ]

        const curves = inputs.map((inp, idx) => {
            const mid = new THREE.Vector3(
                inp.pos.x * 0.5,
                inp.pos.y * 0.4 + (idx % 2 === 0 ? 0.3 : -0.3),
                inp.pos.z * 0.5
            )
            return {
                curve: new THREE.QuadraticBezierCurve3(inp.pos, mid, center),
                ...inp
            }
        })

        return curves
    }, [])

    useFrame((state, delta) => {
        if (!groupRef.current) return
        groupRef.current.rotation.y += delta * 0.2
    })

    return (
        <group ref={groupRef}>
            {/* 1. Incoming Input Conduit Streams */}
            {inputLevers.map((lever, idx) => {
                const points = lever.curve.getPoints(20)
                return (
                    <group key={`lever-${idx}`}>
                        <Line
                            points={points}
                            color="#9B7545"
                            lineWidth={1.2}
                            transparent
                            opacity={0.3}
                        />
                        <InputSignalStream
                            curve={lever.curve}
                            speed={0.4 + (idx % 3) * 0.12}
                            offset={idx * 0.2}
                            color={lever.color}
                        />
                        {/* Input Source Node */}
                        <mesh position={lever.pos}>
                            <sphereGeometry args={[0.1, 16, 16]} />
                            <meshStandardMaterial
                                color={lever.color}
                                emissive={lever.color}
                                emissiveIntensity={1.2}
                                roughness={0.1}
                                metalness={0.9}
                            />
                        </mesh>
                    </group>
                )
            })}

            {/* 2. Central Unified Growth Engine Core */}
            <mesh>
                <sphereGeometry args={[0.38, 32, 32]} />
                <meshStandardMaterial
                    color="#141613"
                    emissive="#9B7545"
                    emissiveIntensity={0.8}
                    roughness={0.15}
                    metalness={0.9}
                />
            </mesh>

            {/* 3. Output Compounding Orbital Rings */}
            {/* Ring A: Software & CRM Orbit (Gold) */}
            <mesh rotation={[0, 0, 0]}>
                <torusGeometry args={[1.5, 0.022, 16, 80]} />
                <meshStandardMaterial
                    color="#D4B270"
                    emissive="#9B7545"
                    emissiveIntensity={0.7}
                    metalness={0.9}
                    roughness={0.15}
                />
            </mesh>
            <CompoundingPhoton radius={1.5} speed={0.9} color="#D4B270" phase={0} tilt={0} />

            {/* Ring B: Distribution Reach Orbit (Sage) */}
            <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
                <torusGeometry args={[1.5, 0.022, 16, 80]} />
                <meshStandardMaterial
                    color="#8FA994"
                    emissive="#3F5544"
                    emissiveIntensity={0.7}
                    metalness={0.9}
                    roughness={0.15}
                />
            </mesh>
            <CompoundingPhoton radius={1.5} speed={1.1} color="#8FA994" phase={Math.PI * 0.6} tilt={Math.PI / 3} />

            {/* Ring C: Compounding Revenue Orbit (Warm Light) */}
            <mesh rotation={[-Math.PI / 3, -Math.PI / 4, 0]}>
                <torusGeometry args={[1.5, 0.022, 16, 80]} />
                <meshStandardMaterial
                    color="#FAF8F5"
                    emissive="#D4B270"
                    emissiveIntensity={0.85}
                    metalness={0.95}
                    roughness={0.1}
                />
            </mesh>
            <CompoundingPhoton radius={1.5} speed={0.85} color="#FAF8F5" phase={Math.PI * 1.2} tilt={-Math.PI / 3} />
        </group>
    )
}

// ── 4. EXPORTED CANVAS COMPONENT ──
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
        <div className="w-full h-[300px] sm:h-[360px] relative pointer-events-auto">
            <Canvas
                camera={{ position: [0, 0, 4.8], fov: 42 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            >
                <ambientLight intensity={0.5} />
                <directionalLight position={[4, 6, 4]} intensity={1.3} color="#FFF8E7" />
                <pointLight position={[-3, -2, 2]} intensity={0.8} color="#D4B270" />

                <ConvergenceEngineCore activeIndex={activeIndex} />
            </Canvas>
        </div>
    )
}
