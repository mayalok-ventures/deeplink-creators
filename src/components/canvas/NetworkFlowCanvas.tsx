'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Line, Sphere } from '@react-three/drei'
import * as THREE from 'three'

// ── 1. CAUSAL TRAVELLING SIGNAL PULSE ──
function CausalSignalPulse({ curve, speed = 0.5, color = '#D4B270', offset = 0 }: { curve: THREE.QuadraticBezierCurve3; speed?: number; color?: string; offset?: number }) {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (!meshRef.current) return
        const t = (state.clock.getElapsedTime() * speed + offset) % 1
        const pos = curve.getPoint(t)
        meshRef.current.position.set(pos.x, pos.y, pos.z)
    })

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[0.075, 16, 16]} />
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

// ── 2. DYNAMIC NETWORK TOPOLOGY GRAPH ──
function CausalNetworkGraph({ channelIndex = 0 }: { channelIndex: number }) {
    const groupRef = useRef<THREE.Group>(null)

    // Dynamic node coordinates configured per industry vertical
    const nodes = useMemo(() => {
        // Channel 0: B2B & Tech (Focused 3-Hub Stream)
        // Channel 1: Industrial (Wide Engineering Spans)
        // Channel 2: Regional NCR (Dense Localized Clusters)
        // Channel 3: High-Ticket (Focused Vertical Conduits)
        const origin = new THREE.Vector3(-2.8, 0, 0)
        let hubs: THREE.Vector3[] = []
        let audiences: THREE.Vector3[] = []

        if (channelIndex === 0) {
            // B2B: Concentrated executive hubs
            hubs = [
                new THREE.Vector3(-0.3, 1.2, 0.2),
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(-0.3, -1.2, -0.2)
            ]
            audiences = [
                new THREE.Vector3(2.5, 1.5, 0.1),
                new THREE.Vector3(2.7, 0.5, -0.1),
                new THREE.Vector3(2.7, -0.5, 0.1),
                new THREE.Vector3(2.5, -1.5, -0.1)
            ]
        } else if (channelIndex === 1) {
            // Industrial: Wide machinery spans
            hubs = [
                new THREE.Vector3(-0.5, 1.5, -0.3),
                new THREE.Vector3(0.2, 0.2, 0.3),
                new THREE.Vector3(-0.5, -1.5, 0.2)
            ]
            audiences = [
                new THREE.Vector3(2.6, 1.8, -0.2),
                new THREE.Vector3(2.8, 0, 0.2),
                new THREE.Vector3(2.6, -1.8, -0.2)
            ]
        } else if (channelIndex === 2) {
            // Regional NCR: Dense metro network
            hubs = [
                new THREE.Vector3(-0.2, 1.4, 0.4),
                new THREE.Vector3(0.1, 0.6, -0.2),
                new THREE.Vector3(-0.1, -0.6, 0.2),
                new THREE.Vector3(-0.2, -1.4, -0.4)
            ]
            audiences = [
                new THREE.Vector3(2.4, 1.7, 0.3),
                new THREE.Vector3(2.6, 0.8, -0.2),
                new THREE.Vector3(2.6, -0.8, 0.2),
                new THREE.Vector3(2.4, -1.7, -0.3)
            ]
        } else {
            // High-Ticket: Focused advisory nodes
            hubs = [
                new THREE.Vector3(-0.1, 0.9, 0.1),
                new THREE.Vector3(-0.1, -0.9, -0.1)
            ]
            audiences = [
                new THREE.Vector3(2.5, 1.0, 0.2),
                new THREE.Vector3(2.7, 0, 0),
                new THREE.Vector3(2.5, -1.0, -0.2)
            ]
        }

        return { origin, hubs, audiences }
    }, [channelIndex])

    // Generate causal bezier conduits
    const curves = useMemo(() => {
        const list: THREE.QuadraticBezierCurve3[] = []

        // Origin -> Hubs
        nodes.hubs.forEach((hub, idx) => {
            const mid = new THREE.Vector3(
                (nodes.origin.x + hub.x) / 2,
                (nodes.origin.y + hub.y) / 2 + (idx === 0 ? 0.3 : idx === nodes.hubs.length - 1 ? -0.3 : 0),
                (hub.z + nodes.origin.z) / 2 + 0.1
            )
            list.push(new THREE.QuadraticBezierCurve3(nodes.origin, mid, hub))
        })

        // Hubs -> Audiences
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
        groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.25) * 0.12
        groupRef.current.rotation.x = Math.cos(state.clock.getElapsedTime() * 0.18) * 0.06
    })

    return (
        <group ref={groupRef}>
            {/* 1. Origin Node (Brand) */}
            <mesh position={nodes.origin}>
                <sphereGeometry args={[0.24, 32, 32]} />
                <meshStandardMaterial
                    color="#D4B270"
                    emissive="#9B7545"
                    emissiveIntensity={0.9}
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
                        emissiveIntensity={1.1}
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
                        emissiveIntensity={0.8}
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
                            opacity={0.38}
                        />
                        <CausalSignalPulse
                            curve={curve}
                            speed={0.35 + (idx % 3) * 0.12}
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
