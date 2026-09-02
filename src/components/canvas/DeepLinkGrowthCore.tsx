'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sphere, Torus, Octahedron, Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

// ── 1. PROCEDURAL INNER PARTICLE SWARM ──
function ParticleSwarm({ count = 180, mouse }: { count?: number; mouse: React.MutableRefObject<{ x: number; y: number; vx: number; vy: number }> }) {
    const pointsRef = useRef<THREE.Points>(null)

    const [positions, colors] = useMemo(() => {
        const pos = new Float32Array(count * 3)
        const cols = new Float32Array(count * 3)
        const gold = new THREE.Color('#D4B270')
        const brass = new THREE.Color('#9B7545')
        const sage = new THREE.Color('#8FA994')

        for (let i = 0; i < count; i++) {
            const r = 1.4 + Math.random() * 1.6
            const theta = THREE.MathUtils.randFloatSpread(360)
            const phi = THREE.MathUtils.randFloatSpread(360)

            pos[i * 3] = r * Math.sin(theta) * Math.cos(phi)
            pos[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi)
            pos[i * 3 + 2] = r * Math.cos(theta)

            const chosen = Math.random() > 0.6 ? gold : Math.random() > 0.3 ? brass : sage
            cols[i * 3] = chosen.r
            cols[i * 3 + 1] = chosen.g
            cols[i * 3 + 2] = chosen.b
        }
        return [pos, cols]
    }, [count])

    useFrame((state, delta) => {
        if (!pointsRef.current) return
        pointsRef.current.rotation.y += delta * 0.15 + mouse.current.vx * 0.05
        pointsRef.current.rotation.x += delta * 0.08 + mouse.current.vy * 0.05
    })

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={colors.length / 3}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <PointMaterial
                size={0.065}
                vertexColors
                transparent
                opacity={0.85}
                sizeAttenuation
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    )
}

// ── 2. METALLIC WIREFRAME OCTAHEDRON LATTICE ──
function CoreLattice({ mouse, activePillar }: { mouse: React.MutableRefObject<{ x: number; y: number; vx: number; vy: number }>; activePillar: string }) {
    const meshRef = useRef<THREE.Group>(null)
    const torusRef = useRef<THREE.Mesh>(null)

    useFrame((state, delta) => {
        if (!meshRef.current) return

        // Smooth rotation influenced by mouse position & velocity
        meshRef.current.rotation.y += delta * 0.4 + mouse.current.x * delta * 0.8
        meshRef.current.rotation.x += delta * 0.2 + mouse.current.y * delta * 0.5
        meshRef.current.rotation.z += delta * 0.1

        if (torusRef.current) {
            torusRef.current.rotation.z -= delta * 0.5
            torusRef.current.rotation.x += delta * 0.3
        }
    })

    const scale = activePillar === 'software' ? 1.05 : activePillar === 'distribution' ? 1.15 : 0.95

    return (
        <group ref={meshRef} scale={[scale, scale, scale]}>
            {/* Primary Octahedral Core */}
            <mesh>
                <octahedronGeometry args={[1.35, 0]} />
                <meshStandardMaterial
                    color="#D4B270"
                    wireframe
                    roughness={0.2}
                    metalness={0.9}
                    emissive="#7A5B32"
                    emissiveIntensity={0.25}
                />
            </mesh>

            {/* Inner Distorted Translucent Core */}
            <Sphere args={[0.85, 32, 32]}>
                <MeshDistortMaterial
                    color="#9B7545"
                    speed={2}
                    distort={0.35}
                    radius={0.85}
                    roughness={0.1}
                    metalness={0.8}
                    transparent
                    opacity={0.7}
                />
            </Sphere>

            {/* Orbiting Torus Ring */}
            <mesh ref={torusRef} rotation={[Math.PI / 4, 0, 0]}>
                <torusGeometry args={[1.8, 0.02, 16, 100]} />
                <meshStandardMaterial
                    color="#FAF8F5"
                    emissive="#D4B270"
                    emissiveIntensity={0.4}
                    roughness={0.1}
                    metalness={0.95}
                />
            </mesh>
        </group>
    )
}

// ── 3. SCENE CONTAINER ──
function CoreScene({ activePillar, mouse }: { activePillar: string; mouse: React.MutableRefObject<{ x: number; y: number; vx: number; vy: number }> }) {
    return (
        <>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 8, 5]} intensity={1.4} color="#FFF8E7" />
            <pointLight position={[-4, -3, -2]} intensity={0.9} color="#D4B270" />
            <pointLight position={[3, 2, 4]} intensity={0.8} color="#8FA994" />

            <Float speed={2} rotationIntensity={0.4} floatIntensity={0.5}>
                <CoreLattice mouse={mouse} activePillar={activePillar} />
                <ParticleSwarm mouse={mouse} count={160} />
            </Float>
        </>
    )
}

// ── 4. EXPORTED CANVAS COMPONENT (Client Only) ──
export default function DeepLinkGrowthCore({ activePillar = 'software' }: { activePillar?: string }) {
    const [mounted, setMounted] = useState(false)
    const mouse = useRef({ x: 0, y: 0, vx: 0, vy: 0, lastX: 0, lastY: 0 })

    useEffect(() => {
        setMounted(true)

        const handleMouseMove = (e: MouseEvent) => {
            const normX = (e.clientX / window.innerWidth) * 2 - 1
            const normY = -(e.clientY / window.innerHeight) * 2 + 1

            mouse.current.vx = (normX - mouse.current.lastX) * 0.5
            mouse.current.vy = (normY - mouse.current.lastY) * 0.5
            mouse.current.lastX = normX
            mouse.current.lastY = normY
            mouse.current.x = normX
            mouse.current.y = normY
        }

        window.addEventListener('mousemove', handleMouseMove, { passive: true })
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    if (!mounted) {
        return (
            <div className="w-full h-full min-h-[360px] flex items-center justify-center bg-[#181A16]/50 rounded-2xl">
                <div className="w-8 h-8 rounded-full border-2 border-[#9B7545] border-t-transparent animate-spin" />
            </div>
        )
    }

    return (
        <div className="w-full h-[360px] sm:h-[400px] md:h-[440px] relative pointer-events-auto">
            <Canvas
                camera={{ position: [0, 0, 4.5], fov: 45 }}
                dpr={[1, 2]}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: 'high-performance',
                }}
            >
                <CoreScene activePillar={activePillar} mouse={mouse} />
            </Canvas>
        </div>
    )
}
