'use client'

import { useRef, useMemo, useState, useEffect, useCallback } from 'react'
import { Canvas, useFrame, extend } from '@react-three/fiber'
import * as THREE from 'three'

// ── 1. GLSL SHADER DEFINITIONS FOR LIVING LIQUID METAL FIELD ──

const LiquidFieldShaderMaterial = {
    uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uMouseVelocity: { value: 0 },
        uPillar: { value: 0 },
        uColorBase: { value: new THREE.Color('#151714') },
        uColorBrass: { value: new THREE.Color('#D4B270') },
        uColorBronze: { value: new THREE.Color('#9B7545') },
        uColorSage: { value: new THREE.Color('#8FA994') }
    },
    vertexShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uMouseVelocity;
        uniform float uPillar;

        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying float vElevation;
        varying float vMouseDist;

        // Simplex 3D noise implementation
        vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
        vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

        float snoise(vec3 v){
            const vec2 C = vec2(1.0/6.0, 1.0/3.0);
            const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
            vec3 i  = floor(v + dot(v, C.yyy));
            vec3 x0 = v - i + dot(i, C.xxx);
            vec3 g = step(x0.yzx, x0.xyz);
            vec3 l = 1.0 - g;
            vec3 i1 = min( g.xyz, l.zxy );
            vec3 i2 = max( g.xyz, l.zxy );
            vec3 x1 = x0 - i1 + 1.0 * C.xxx;
            vec3 x2 = x0 - i2 + 2.0 * C.xxx;
            vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
            i = mod(i, 289.0 );
            vec4 p = permute( permute( permute(
                        i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                    + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
                    + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
            float n_ = 0.142857142857;
            vec3  ns = n_ * D.wyz - D.xzx;
            vec4 j = p - 49.0 * floor(p * ns.z *ns.z);
            vec4 x_ = floor(j * ns.z);
            vec4 y_ = floor(j - 7.0 * x_ );
            vec4 x = x_ *ns.x + ns.yyyy;
            vec4 y = y_ *ns.x + ns.yyyy;
            vec4 h = 1.0 - abs(x) - abs(y);
            vec4 b0 = vec4( x.xy, y.xy );
            vec4 b1 = vec4( x.zw, y.zw );
            vec4 s0 = floor(b0)*2.0 + 1.0;
            vec4 s1 = floor(b1)*2.0 + 1.0;
            vec4 sh = -step(h, vec4(0.0));
            vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
            vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
            vec3 p0 = vec3(a0.xy,h.x);
            vec3 p1 = vec3(a0.zw,h.y);
            vec3 p2 = vec3(a1.xy,h.z);
            vec3 p3 = vec3(a1.zw,h.w);
            vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
            p0 *= norm.x;
            p1 *= norm.y;
            p2 *= norm.z;
            p3 *= norm.w;
            vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
            m = m * m;
            return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
        }

        void main() {
            vUv = uv;
            vec3 pos = position;

            // Macro viscous undulation
            float macroNoise = snoise(vec3(pos.x * 0.45, pos.y * 0.45, uTime * 0.22)) * 0.35;
            
            // Micro liquid ripples
            float microNoise = snoise(vec3(pos.x * 1.8, pos.y * 1.8, uTime * 0.45)) * 0.12;

            // Mouse pressure & velocity depression well
            float distToMouse = distance(pos.xy, uMouse * vec2(3.2, 2.2));
            vMouseDist = distToMouse;

            float mouseImpulse = exp(-distToMouse * 2.2) * (0.45 + uMouseVelocity * 0.85);
            float rippleWave = sin(distToMouse * 14.0 - uTime * 6.0) * exp(-distToMouse * 2.8) * 0.18 * (uMouseVelocity + 0.3);

            // Pillar-driven structural conduit morphing
            float structuralChannels = 0.0;
            if (uPillar > 0.5 && uPillar < 1.5) {
                // Distribution: radial ripples
                structuralChannels = sin(length(pos.xy) * 6.0 - uTime * 1.5) * 0.08;
            } else if (uPillar >= 1.5) {
                // Growth: directional laminar flow
                structuralChannels = sin(pos.x * 4.0 + pos.y * 2.0 - uTime * 3.0) * 0.12;
            }

            float elevation = macroNoise + microNoise - mouseImpulse + rippleWave + structuralChannels;
            pos.z += elevation;
            vElevation = elevation;

            // Approximate analytical normal from finite difference
            float delta = 0.05;
            float nX = snoise(vec3((pos.x + delta) * 0.45, pos.y * 0.45, uTime * 0.22)) - snoise(vec3((pos.x - delta) * 0.45, pos.y * 0.45, uTime * 0.22));
            float nY = snoise(vec3(pos.x * 0.45, (pos.y + delta) * 0.45, uTime * 0.22)) - snoise(vec3(pos.x * 0.45, (pos.y - delta) * 0.45, uTime * 0.22));
            vec3 customNormal = normalize(vec3(-nX * 2.0, -nY * 2.0, 1.0));

            vNormal = normalMatrix * customNormal;
            vPosition = (modelViewMatrix * vec4(pos, 1.0)).xyz;

            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
    `,
    fragmentShader: `
        uniform vec3 uColorBase;
        uniform vec3 uColorBrass;
        uniform vec3 uColorBronze;
        uniform vec3 uColorSage;
        uniform float uTime;

        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying float vElevation;
        varying float vMouseDist;

        void main() {
            vec3 normal = normalize(vNormal);
            vec3 viewDir = normalize(-vPosition);

            // Fresnel reflection for liquid metal sheen
            float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 3.2);

            // Dual directional light reflection
            vec3 lightDir1 = normalize(vec3(0.5, 0.8, 1.0));
            vec3 lightDir2 = normalize(vec3(-0.8, -0.5, 0.6));

            float diff1 = max(dot(normal, lightDir1), 0.0);
            float diff2 = max(dot(normal, lightDir2), 0.0);

            // Specular highlights
            vec3 halfDir1 = normalize(lightDir1 + viewDir);
            float spec1 = pow(max(dot(normal, halfDir1), 0.0), 32.0);

            vec3 halfDir2 = normalize(lightDir2 + viewDir);
            float spec2 = pow(max(dot(normal, halfDir2), 0.0), 16.0);

            // Fluid color composition
            vec3 baseTone = mix(uColorBase, uColorBronze * 0.4, clamp(vElevation * 1.5 + 0.3, 0.0, 1.0));
            vec3 ridgeColor = mix(baseTone, uColorBrass, clamp(vElevation * 2.2 + fresnel * 0.6, 0.0, 1.0));
            vec3 sageReflect = mix(ridgeColor, uColorSage, fresnel * 0.4 * diff2);

            // Add specular reflections
            vec3 finalColor = sageReflect + (uColorBrass * spec1 * 1.4) + (uColorBronze * spec2 * 0.6);

            // Subsurface depth shading
            float depthVignette = smoothstep(0.0, 3.5, vMouseDist);
            finalColor += uColorBrass * exp(-vMouseDist * 2.5) * 0.35;

            gl_FragColor = vec4(finalColor, 0.94);
        }
    `
}

// ── 2. INTELLIGENT SIGNAL PARTICLES LAYER ──
function IntelligentSignalParticles({ mouse, pillarIndex }: { mouse: React.MutableRefObject<{ x: number; y: number; vx: number; vy: number }>; pillarIndex: number }) {
    const count = 220
    const pointsRef = useRef<THREE.Points>(null)

    // Initial random positions across the liquid plane
    const [positions, initialPositions, velocities] = useMemo(() => {
        const pos = new Float32Array(count * 3)
        const initPos = new Float32Array(count * 3)
        const vels = new Float32Array(count * 3)

        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 6.0
            const y = (Math.random() - 0.5) * 4.4
            const z = 0.05 + Math.random() * 0.15

            pos[i * 3] = x
            pos[i * 3 + 1] = y
            pos[i * 3 + 2] = z

            initPos[i * 3] = x
            initPos[i * 3 + 1] = y
            initPos[i * 3 + 2] = z

            vels[i * 3] = (Math.random() - 0.5) * 0.01
            vels[i * 3 + 1] = (Math.random() - 0.5) * 0.01
            vels[i * 3 + 2] = 0
        }
        return [pos, initPos, vels]
    }, [count])

    useFrame((state, delta) => {
        if (!pointsRef.current) return
        const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute
        const array = posAttr.array as Float32Array
        const time = state.clock.getElapsedTime()

        const targetMouseX = mouse.current.x * 3.0
        const targetMouseY = mouse.current.y * 2.0
        const mSpeed = Math.hypot(mouse.current.vx, mouse.current.vy)

        for (let i = 0; i < count; i++) {
            const idx = i * 3
            const px = array[idx]
            const py = array[idx + 1]

            // Distance to cursor
            const dx = px - targetMouseX
            const dy = py - targetMouseY
            const dist = Math.hypot(dx, dy)

            if (dist < 1.4 && mSpeed > 0.005) {
                // "THE INTELLIGENCE MOMENT": Particles align along cursor streamline
                const tangentX = -mouse.current.vy * 0.08
                const tangentY = mouse.current.vx * 0.08

                velocities[idx] += (tangentX - velocities[idx]) * 0.15
                velocities[idx + 1] += (tangentY - velocities[idx + 1]) * 0.15
            } else {
                // Organic wandering around anchor position
                const origX = initialPositions[idx]
                const origY = initialPositions[idx + 1]
                const wanderX = Math.sin(time * 0.8 + i) * 0.2
                const wanderY = Math.cos(time * 0.6 + i * 0.5) * 0.2

                velocities[idx] += ((origX + wanderX) - px) * 0.04
                velocities[idx + 1] += ((origY + wanderY) - py) * 0.04
            }

            // Damping & integration
            velocities[idx] *= 0.92
            velocities[idx + 1] *= 0.92

            array[idx] += velocities[idx]
            array[idx + 1] += velocities[idx + 1]
            array[idx + 2] = 0.08 + Math.sin(time * 2.0 + px * 2.0) * 0.06
        }

        posAttr.needsUpdate = true
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
            </bufferGeometry>
            <pointsMaterial
                size={0.055}
                color="#D4B270"
                transparent
                opacity={0.85}
                sizeAttenuation
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    )
}

// ── 3. LIQUID FIELD MESH WITH CUSTOM SHADER ──
function LiquidMesh({ mouse, pillarIndex }: { mouse: React.MutableRefObject<{ x: number; y: number; vx: number; vy: number }>; pillarIndex: number }) {
    const meshRef = useRef<THREE.Mesh>(null)
    const materialRef = useRef<THREE.ShaderMaterial>(null)

    const shaderData = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: THREE.UniformsUtils.clone(LiquidFieldShaderMaterial.uniforms),
            vertexShader: LiquidFieldShaderMaterial.vertexShader,
            fragmentShader: LiquidFieldShaderMaterial.fragmentShader,
            transparent: true,
            side: THREE.DoubleSide
        })
    }, [])

    useFrame((state, delta) => {
        if (!materialRef.current) return
        const mat = materialRef.current

        mat.uniforms.uTime.value = state.clock.getElapsedTime()
        mat.uniforms.uPillar.value = pillarIndex

        // Smooth mouse uniform interpolation
        const targetX = mouse.current.x
        const targetY = mouse.current.y
        mat.uniforms.uMouse.value.x += (targetX - mat.uniforms.uMouse.value.x) * 0.12
        mat.uniforms.uMouse.value.y += (targetY - mat.uniforms.uMouse.value.y) * 0.12

        // Mouse velocity decay
        const speed = Math.hypot(mouse.current.vx, mouse.current.vy) * 20.0
        mat.uniforms.uMouseVelocity.value += (speed - mat.uniforms.uMouseVelocity.value) * 0.1
    })

    return (
        <mesh ref={meshRef} position={[0, 0, 0]} rotation={[-0.2, 0, 0]}>
            <planeGeometry args={[6.8, 4.8, 140, 100]} />
            <primitive object={shaderData} ref={materialRef} attach="material" />
        </mesh>
    )
}

// ── 4. CAMERA & SCENE RIG ──
function SceneRig({ mouse, pillarIndex }: { mouse: React.MutableRefObject<{ x: number; y: number; vx: number; vy: number }>; pillarIndex: number }) {
    useFrame((state, delta) => {
        // Subtle cinematic camera response to mouse movement
        state.camera.position.x += (mouse.current.x * 0.35 - state.camera.position.x) * 0.05
        state.camera.position.y += (mouse.current.y * 0.25 - state.camera.position.y) * 0.05
        state.camera.lookAt(0, 0, 0)
    })

    return (
        <>
            <ambientLight intensity={0.4} />
            <directionalLight position={[4, 6, 5]} intensity={1.5} color="#FFF8E7" />
            <directionalLight position={[-4, -3, 3]} intensity={0.8} color="#D4B270" />

            <LiquidMesh mouse={mouse} pillarIndex={pillarIndex} />
            <IntelligentSignalParticles mouse={mouse} pillarIndex={pillarIndex} />
        </>
    )
}

// ── 5. EXPORTED LIQUID GROWTH FIELD COMPONENT ──
export default function LiquidGrowthField({ activePillar = 'software' }: { activePillar?: 'software' | 'distribution' | 'growth' }) {
    const [mounted, setMounted] = useState(false)
    const mouse = useRef({ x: 0, y: 0, vx: 0, vy: 0, lastX: 0, lastY: 0 })

    const pillarIndex = activePillar === 'software' ? 0 : activePillar === 'distribution' ? 1 : 2

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
            <div className="w-full h-full min-h-[380px] flex items-center justify-center bg-[#151714] rounded-3xl">
                <div className="w-8 h-8 rounded-full border-2 border-[#D4B270] border-t-transparent animate-spin" />
            </div>
        )
    }

    return (
        <div className="w-full h-[380px] sm:h-[440px] md:h-[480px] relative pointer-events-auto rounded-3xl overflow-hidden shadow-2xl border border-[#9B7545]/30 bg-[#121310]">
            <Canvas
                camera={{ position: [0, 0, 3.8], fov: 48 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            >
                <SceneRig mouse={mouse} pillarIndex={pillarIndex} />
            </Canvas>
        </div>
    )
}
