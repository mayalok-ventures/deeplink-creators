'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Line, Sphere, Float } from '@react-three/drei'
import * as THREE from 'three'

// ── 1. TRAVELLING PULSE PACKET ON CURVE ──
function CurvePulse({ curve, speed = 0.4, color = '#D4B270', offset = 0 }: { curve: THREE.QuadraticBezierCurve3; speed?: number; color?: string; offset?: number }) {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (!meshRef.current) return
        const t = (state.clock.getElapsedTime() * speed + offset) % 1
        const pos = curve.getPoint(t)
        meshRef.current.position.set(pos.x, pos.y, pos.z)
    })

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={2}
                roughness={0.1}
                metalness={0.9}
            />
        </mesh>
    )
}

// ── 2. NETWORK CONDUITS & NODES ──
function NetworkGraph({ activeIndex = 0 }: { activeIndex: number }) {
    const groupRef = useRef<THREE.Group>(null)

    // Define 3-Tier Node Positions: Origin (Left) -> 3 Hubs (Center) -> 4 Audiences (Right)
    const nodes = useMemo(() => {
        return {
            origin: new THREE.Vector3(-2.6, 0, 0),
            hubs: [
                new THREE.Vector3(-0.2, 1.3, 0.3),
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(-0.2, -1.3, -0.3)
            ],
            audiences: [
                new THREE.Vector3(2.4, 1.6, 0.2),
                new THREE.Vector3(2.6, 0.6, -0.1),
                new THREE.Vector3(2.6, -0.6, 0.1),
                new THREE.Vector3(2.4, -1.6, -0.2)
            ]
        }
    }, [])

    // Create Bezier Curves from Origin -> Hubs -> Audiences
    const curves = useMemo(() => {
        const list: THREE.QuadraticBezierCurve3[] = []

        // Origin to Hubs
        nodes.hubs.forEach((hub, idx) => {
            const mid = new THREE.Vector3(
                (nodes.origin.x + hub.x) / 2,
                (nodes.origin.y + hub.y) / 2 + (idx === 0 ? 0.3 : idx === 2 ? -0.3 : 0),
                0.2
            )
            list.push(new THREE.QuadraticBezierCurve3(nodes.origin, mid, hub))
        })

        // Hubs to Audiences
        nodes.hubs.forEach((hub, hIdx) => {
            nodes.audiences.forEach((aud, aIdx) => {
                if (Math.abs(hIdx - aIdx) <= 1) {
                    const mid = new THREE.Vector3(
                        (hub.x + aud.x) / 2,
                        (hub.y + aud.y) / 2,
                        (hub.z + aud.z) / 2
                    )
                    list.push(new THREE.QuadraticBezierCurve3(hub, mid, aud))
                }
            })
        })

        return list
    }, [nodes])

    useFrame((state, delta) => {
        if (!groupRef.current) return
        groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.15
        groupRef.current.rotation.x = Math.cos(state.clock.getElapsedTime() * 0.2) * 0.08
    })

    return (
        <group ref={groupRef}>
            {/* 1. Origin Node */}
            <mesh position={nodes.origin}>
                <sphereGeometry args={[0.22, 32, 32]} />
                <meshStandardMaterial
                    color="#D4B270"
                    emissive="#9B7545"
                    emissiveIntensity={0.8}
                    roughness={0.2}
                    metalness={0.9}
                />
            </mesh>

            {/* 2. Hub Nodes */}
            {nodes.hubs.map((hub, i) => (
                <mesh key={`hub-${i}`} position={hub}>
                    <sphereGeometry args={[0.18, 32, 32]} />
                    <meshStandardMaterial
                        color={i === 1 ? '#FAF8F5' : '#D4B270'}
                        emissive={i === 1 ? '#D4B270' : '#7A5B32'}
                        emissiveIntensity={1}
                        roughness={0.1}
                        metalness={0.95}
                    />
                </mesh>
            ))}

            {/* 3. Audience Nodes */}
            {nodes.audiences.map((aud, i) => (
                <mesh key={`aud-${i}`} position={aud}>
                    <sphereGeometry args={[0.14, 24, 24]} />
                    <meshStandardMaterial
                        color="#8FA994"
                        emissive="#3F5544"
                        emissiveIntensity={0.6}
                        roughness={0.3}
                        metalness={0.8}
                    />
                </mesh>
            ))}

            {/* 4. Bezier Conduit Lines & Travelling Pulses */}
            {curves.map((curve, idx) => {
                const points = curve.getPoints(30)
                return (
                    <group key={`curve-${idx}`}>
                        <Line
                            points={points}
                            color="#9B7545"
                            lineWidth={1.5}
                            transparent
                            opacity={0.35}
                        />
                        <CurvePulse
                            curve={curve}
                            speed={0.3 + (idx % 3) * 0.15}
                            offset={idx * 0.2}
                            color={idx % 2 === 0 ? '#D4B270' : '#8FA994'}
                        />
                    </group>
                )
            })}
        </group>
    )
}

// ── 3. EXPORTED CANVAS COMPONENT ──
export default function NetworkFlowCanvas({ activeIndex = 0 }: { activeIndex?: number }) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <div className="w-full h-full min-h-[340px] flex items-center justify-center bg-[#181A16] rounded-3xl">
                <div className="w-7 h-7 rounded-full border-2 border-[#D4B270] border-t-transparent animate-spin" />
            </div>
        )
    }

    return (
        <div className="w-full h-[320px] sm:h-[380px] relative pointer-events-auto">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 42 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            >
                <ambientLight intensity={0.5} />
                <directionalLight position={[4, 6, 4]} intensity={1.2} color="#FFF8E7" />
                <pointLight position={[-3, -2, 2]} intensity={0.8} color="#D4B270" />

                <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
                    <NetworkGraph activeIndex={activeIndex} />
                </Float>
            </Canvas>
        </div>
    )
}
