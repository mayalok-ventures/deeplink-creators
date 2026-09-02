'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import * as THREE from 'three'

// ── 1. CAUSAL TRAVELLING SIGNAL PULSE WITH NODE ILLUMINATION RESPONSE ──
function CausalSignalPulse({
    curve,
    speed = 0.5,
    color = '#D4B270',
    offset = 0,
    onReachEnd
}: {
    curve: THREE.QuadraticBezierCurve3
    speed?: number
    color?: string
    offset?: number
    onReachEnd?: () => void
}) {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (!meshRef.current) return
        const t = (state.clock.getElapsedTime() * speed + offset) % 1
        const pos = curve.getPoint(t)
        meshRef.current.position.set(pos.x, pos.y, pos.z)
    })

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={2.4}
                roughness={0.1}
                metalness={0.9}
            />
        </mesh>
    )
}

// ── 2. DYNAMIC NETWORK TOPOLOGY GRAPH WITH CAUSAL 5-STAGE LOGIC ──
function CausalNetworkGraph({ channelIndex = 0 }: { channelIndex: number }) {
    const groupRef = useRef<THREE.Group>(null)

    // Dynamic node coordinates configured per industry vertical
    const nodes = useMemo(() => {
        const origin = new THREE.Vector3(-2.8, 0, 0)
        let hubs: THREE.Vector3[] = []
        let audiences: THREE.Vector3[] = []

        if (channelIndex === 0) {
            // B2B: Focused 3-hub enterprise pipeline with deep, high-velocity conduits
            hubs = [
                new THREE.Vector3(-0.4, 1.2, 0.2),
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(-0.4, -1.2, -0.2)
            ]
            audiences = [
                new THREE.Vector3(2.5, 1.4, 0.1),
                new THREE.Vector3(2.7, 0.5, -0.1),
                new THREE.Vector3(2.7, -0.5, 0.1),
                new THREE.Vector3(2.5, -1.4, -0.1)
            ]
        } else if (channelIndex === 1) {
            // Industrial & OEM: Wide centralized engineering spans with strong distribution paths
            hubs = [
                new THREE.Vector3(-0.6, 1.5, -0.3),
                new THREE.Vector3(0.2, 0.2, 0.3),
                new THREE.Vector3(-0.6, -1.5, 0.2)
            ]
            audiences = [
                new THREE.Vector3(2.5, 1.7, -0.2),
                new THREE.Vector3(2.8, 0, 0.2),
                new THREE.Vector3(2.5, -1.7, -0.2)
            ]
        } else if (channelIndex === 2) {
            // Regional NCR: Dense localized metro clusters with shorter, highly interconnected paths
            hubs = [
                new THREE.Vector3(-0.3, 1.3, 0.3),
                new THREE.Vector3(0.1, 0.5, -0.2),
                new THREE.Vector3(-0.1, -0.5, 0.2),
                new THREE.Vector3(-0.3, -1.3, -0.3)
            ]
            audiences = [
                new THREE.Vector3(2.4, 1.6, 0.2),
                new THREE.Vector3(2.6, 0.7, -0.2),
                new THREE.Vector3(2.6, -0.7, 0.2),
                new THREE.Vector3(2.4, -1.6, -0.2)
            ]
        } else {
            // High-Ticket Services: Selective high-value advisory routing conduits
            hubs = [
                new THREE.Vector3(-0.2, 0.85, 0.1),
                new THREE.Vector3(-0.2, -0.85, -0.1)
            ]
            audiences = [
                new THREE.Vector3(2.5, 1.0, 0.15),
                new THREE.Vector3(2.7, 0, 0),
                new THREE.Vector3(2.5, -1.0, -0.15)
            ]
        }

        return { origin, hubs, audiences }
    }, [channelIndex])

    // Generate causal bezier conduits
    const curves = useMemo(() => {
        const list: THREE.QuadraticBezierCurve3[] = []

        // Stage 1 -> 2: Origin -> Hubs
        nodes.hubs.forEach((hub, idx) => {
            const mid = new THREE.Vector3(
                (nodes.origin.x + hub.x) / 2,
                (nodes.origin.y + hub.y) / 2 + (idx === 0 ? 0.3 : idx === nodes.hubs.length - 1 ? -0.3 : 0),
                (hub.z + nodes.origin.z) / 2 + 0.1
            )
            list.push(new THREE.QuadraticBezierCurve3(nodes.origin, mid, hub))
        })

        // Stage 3 -> 4: Hubs -> Audiences
        nodes.hubs.forEach((hub) => {
            nodes.audiences.forEach((aud) => {
                if (Math.abs(hub.y - aud.y) < 1.6) {
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

    useFrame((state) => {
        if (!groupRef.current) return
        groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1
        groupRef.current.rotation.x = Math.cos(state.clock.getElapsedTime() * 0.15) * 0.05
    })

    return (
        <group ref={groupRef}>
            {/* 1. Origin Node (Brand Origin) */}
            <mesh position={nodes.origin}>
                <sphereGeometry args={[0.24, 32, 32]} />
                <meshStandardMaterial
                    color="#D4B270"
                    emissive="#9B7545"
                    emissiveIntensity={1.0}
                    roughness={0.15}
                    metalness={0.9}
                />
            </mesh>

            {/* 2. Hub Nodes (Creators) */}
            {nodes.hubs.map((hub, i) => (
                <mesh key={`hub-${i}`} position={hub}>
                    <sphereGeometry args={[0.18, 32, 32]} />
                    <meshStandardMaterial
                        color="#FAF8F5"
                        emissive="#D4B270"
                        emissiveIntensity={1.2}
                        roughness={0.1}
                        metalness={0.95}
                    />
                </mesh>
            ))}

            {/* 3. Audience Nodes (Verified Buyers) */}
            {nodes.audiences.map((aud, i) => (
                <mesh key={`aud-${i}`} position={aud}>
                    <sphereGeometry args={[0.15, 24, 24]} />
                    <meshStandardMaterial
                        color="#8FA994"
                        emissive="#3F5544"
                        emissiveIntensity={0.85}
                        roughness={0.2}
                        metalness={0.85}
                    />
                </mesh>
            ))}

            {/* 4. Bezier Conduit Lines & Travelling Causal Pulses */}
            {curves.map((curve, idx) => {
                const points = curve.getPoints(24)
                return (
                    <group key={`curve-${idx}`}>
                        <Line
                            points={points}
                            color="#9B7545"
                            lineWidth={1.5}
                            transparent
                            opacity={0.35}
                        />
                        <CausalSignalPulse
                            curve={curve}
                            speed={0.32 + (idx % 3) * 0.1}
                            offset={idx * 0.18}
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

    if (!mounted) return null

    return (
        <div className="w-full h-[340px] sm:h-[400px] relative pointer-events-auto">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 42 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            >
                <ambientLight intensity={0.5} />
                <directionalLight position={[4, 6, 4]} intensity={1.3} color="#FFF8E7" />
                <pointLight position={[-3, -2, 2]} intensity={0.8} color="#D4B270" />

                <CausalNetworkGraph channelIndex={activeIndex} />
            </Canvas>
        </div>
    )
}
