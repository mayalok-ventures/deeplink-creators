'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// ── 1. GLSL SHADER DEFINITIONS FOR ATMOSPHERIC LIQUID GROWTH FIELD ──

const LiquidFieldShaderMaterial = {
    uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uMouseVelocity: { value: 0 },
        uScroll: { value: 0 },
        uColorBase: { value: new THREE.Color('#141613') },
        uColorBrass: { value: new THREE.Color('#D4B270') },
        uColorBronze: { value: new THREE.Color('#9B7545') },
        uColorSage: { value: new THREE.Color('#8FA994') }
    },
    vertexShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uMouseVelocity;
        uniform float uScroll;

        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying float vElevation;
        varying float vMouseDist;
        varying float vEdgeFalloff;

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

            // Organic edge distance falloff for seamless blending
            vec2 centeredUv = (uv - 0.5) * 2.0;
            float edgeDist = length(centeredUv);
            vEdgeFalloff = smoothstep(1.0, 0.4, edgeDist);

            // 1. Chaotic Macro Viscous Flow (State 01)
            float chaosNoise = snoise(vec3(pos.x * 0.4, pos.y * 0.4, uTime * 0.2)) * 0.35;
            float microNoise = snoise(vec3(pos.x * 1.5, pos.y * 1.5, uTime * 0.4)) * 0.1;

            // 2. Continuous Scroll-Driven Organization into Stream Conduits (State 02 -> 03)
            float organizedChannels = sin(pos.x * 3.5 + pos.y * 1.5 - uTime * 2.5) * 0.2 * uScroll;
            float triConduit = (sin(pos.y * 4.0 - uTime * 2.0) * 0.15 + sin(pos.x * 3.0) * 0.1) * smoothstep(0.3, 0.8, uScroll);

            // 3. Physical Cursor Wake & Pressure Well
            float distToMouse = distance(pos.xy, uMouse * vec2(4.0, 2.8));
            vMouseDist = distToMouse;

            float mousePressure = exp(-distToMouse * 2.0) * (0.4 + uMouseVelocity * 0.8);
            float rippleWake = sin(distToMouse * 12.0 - uTime * 5.0) * exp(-distToMouse * 2.2) * 0.16 * (uMouseVelocity + 0.25);

            float totalElevation = (mix(chaosNoise + microNoise, organizedChannels + triConduit, uScroll * 0.8) - mousePressure + rippleWake) * vEdgeFalloff;
            pos.z += totalElevation;
            vElevation = totalElevation;

            // Analytical finite-difference normal calculation
            float delta = 0.04;
            float nX = snoise(vec3((pos.x + delta) * 0.4, pos.y * 0.4, uTime * 0.2)) - snoise(vec3((pos.x - delta) * 0.4, pos.y * 0.4, uTime * 0.2));
            float nY = snoise(vec3(pos.x * 0.4, (pos.y + delta) * 0.4, uTime * 0.2)) - snoise(vec3(pos.x * 0.4, (pos.y - delta) * 0.4, uTime * 0.2));
            vec3 customNormal = normalize(vec3(-nX * 2.2, -nY * 2.2, 1.0));

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
        uniform float uScroll;

        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying float vElevation;
        varying float vMouseDist;
        varying float vEdgeFalloff;

        void main() {
            vec3 normal = normalize(vNormal);
            vec3 viewDir = normalize(-vPosition);

            // Physically plausible liquid metal Fresnel
            float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 3.0);

            // Directional key and rim lighting
            vec3 lightKey = normalize(vec3(0.6, 0.9, 1.0));
            vec3 lightRim = normalize(vec3(-0.7, -0.6, 0.5));

            float diffKey = max(dot(normal, lightKey), 0.0);
            float diffRim = max(dot(normal, lightRim), 0.0);

            // Specular reflections
            vec3 halfKey = normalize(lightKey + viewDir);
            float specKey = pow(max(dot(normal, halfKey), 0.0), 36.0);

            vec3 halfRim = normalize(lightRim + viewDir);
            float specRim = pow(max(dot(normal, halfRim), 0.0), 18.0);

            // Fluid color composition with continuous organization
            vec3 baseTone = mix(uColorBase, uColorBronze * 0.5, clamp(vElevation * 1.6 + 0.3, 0.0, 1.0));
            vec3 ridgeColor = mix(baseTone, uColorBrass, clamp(vElevation * 2.4 + fresnel * 0.7, 0.0, 1.0));
            vec3 sageAccent = mix(ridgeColor, uColorSage, fresnel * 0.35 * diffRim);

            // Final physical composite with specular glints
            vec3 finalColor = sageAccent + (uColorBrass * specKey * 1.5) + (uColorBronze * specRim * 0.7);

            // Subsurface light around cursor
            finalColor += uColorBrass * exp(-vMouseDist * 2.2) * 0.4;

            // Organic alpha falloff at edges for seamless environmental blending
            float alpha = smoothstep(0.0, 0.3, vEdgeFalloff) * 0.92;

            gl_FragColor = vec4(finalColor, alpha);
        }
    `
}

// ── 2. INTELLIGENT SIGNAL PARTICLES (Signal to System Progression) ──
function IntelligentSignalParticles({ mouse, scrollProgress }: { mouse: React.MutableRefObject<{ x: number; y: number; vx: number; vy: number }>; scrollProgress: number }) {
    const count = 260
    const pointsRef = useRef<THREE.Points>(null)

    const [positions, initialPositions, velocities] = useMemo(() => {
        const pos = new Float32Array(count * 3)
        const initPos = new Float32Array(count * 3)
        const vels = new Float32Array(count * 3)

        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 8.0
            const y = (Math.random() - 0.5) * 5.5
            const z = 0.08 + Math.random() * 0.18

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

    useFrame((state) => {
        if (!pointsRef.current) return
        const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute
        const array = posAttr.array as Float32Array
        const time = state.clock.getElapsedTime()

        const targetMouseX = mouse.current.x * 3.8
        const targetMouseY = mouse.current.y * 2.5
        const mSpeed = Math.hypot(mouse.current.vx, mouse.current.vy)

        for (let i = 0; i < count; i++) {
            const idx = i * 3
            const px = array[idx]
            const py = array[idx + 1]

            // Distance to cursor
            const dx = px - targetMouseX
            const dy = py - targetMouseY
            const dist = Math.hypot(dx, dy)

            if (dist < 1.6 && mSpeed > 0.003) {
                // "THE INTELLIGENCE MOMENT": Cursor streamlines
                const tangentX = -mouse.current.vy * 0.09
                const tangentY = mouse.current.vx * 0.09
                velocities[idx] += (tangentX - velocities[idx]) * 0.16
                velocities[idx + 1] += (tangentY - velocities[idx + 1]) * 0.16
            } else if (scrollProgress > 0.2) {
                // SCROLL TRANSFORMATION: Signals align into directional conduit streams
                const conduitY = (Math.floor((i / count) * 3) - 1) * 1.4
                const flowSpeed = 0.015 + (i % 3) * 0.008
                velocities[idx] += flowSpeed * (1.0 + scrollProgress)
                velocities[idx + 1] += (conduitY - py) * 0.03 * scrollProgress

                // Wrap around X boundary
                if (array[idx] > 4.2) {
                    array[idx] = -4.2
                }
            } else {
                // Organic viscous wandering around anchor position
                const origX = initialPositions[idx]
                const origY = initialPositions[idx + 1]
                const wanderX = Math.sin(time * 0.7 + i) * 0.25
                const wanderY = Math.cos(time * 0.5 + i * 0.5) * 0.25

                velocities[idx] += ((origX + wanderX) - px) * 0.035
                velocities[idx + 1] += ((origY + wanderY) - py) * 0.035
            }

            // Damping & integration
            velocities[idx] *= 0.93
            velocities[idx + 1] *= 0.93

            array[idx] += velocities[idx]
            array[idx + 1] += velocities[idx + 1]
            array[idx + 2] = 0.1 + Math.sin(time * 2.0 + px * 2.0) * 0.07
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
                size={0.05}
                color="#D4B270"
                transparent
                opacity={0.88}
                sizeAttenuation
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    )
}

// ── 3. LIQUID FIELD MESH ──
function LiquidMesh({ mouse, scrollProgress }: { mouse: React.MutableRefObject<{ x: number; y: number; vx: number; vy: number }>; scrollProgress: number }) {
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

    useFrame((state) => {
        if (!materialRef.current) return
        const mat = materialRef.current

        mat.uniforms.uTime.value = state.clock.getElapsedTime()
        mat.uniforms.uScroll.value = scrollProgress

        // Smooth mouse uniform interpolation
        mat.uniforms.uMouse.value.x += (mouse.current.x - mat.uniforms.uMouse.value.x) * 0.1
        mat.uniforms.uMouse.value.y += (mouse.current.y - mat.uniforms.uMouse.value.y) * 0.1

        // Mouse velocity decay
        const speed = Math.hypot(mouse.current.vx, mouse.current.vy) * 22.0
        mat.uniforms.uMouseVelocity.value += (speed - mat.uniforms.uMouseVelocity.value) * 0.1
    })

    return (
        <mesh ref={meshRef} position={[0, 0, 0]} rotation={[-0.15, 0, 0]}>
            <planeGeometry args={[8.4, 5.8, 160, 120]} />
            <primitive object={shaderData} ref={materialRef} attach="material" />
        </mesh>
    )
}

// ── 4. CAMERA & SCENE RIG ──
function SceneRig({ mouse, scrollProgress }: { mouse: React.MutableRefObject<{ x: number; y: number; vx: number; vy: number }>; scrollProgress: number }) {
    useFrame((state) => {
        // Continuous camera inertia linked to mouse & scroll progress
        const targetCamX = mouse.current.x * 0.4
        const targetCamY = mouse.current.y * 0.3 - scrollProgress * 0.5
        const targetCamZ = 3.6 - scrollProgress * 0.6

        state.camera.position.x += (targetCamX - state.camera.position.x) * 0.05
        state.camera.position.y += (targetCamY - state.camera.position.y) * 0.05
        state.camera.position.z += (targetCamZ - state.camera.position.z) * 0.05
        state.camera.lookAt(0, -scrollProgress * 0.3, 0)
    })

    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 7, 5]} intensity={1.6} color="#FFF8E7" />
            <directionalLight position={[-5, -4, 3]} intensity={0.9} color="#D4B270" />

            <LiquidMesh mouse={mouse} scrollProgress={scrollProgress} />
            <IntelligentSignalParticles mouse={mouse} scrollProgress={scrollProgress} />
        </>
    )
}

// ── 5. EXPORTED LIQUID GROWTH FIELD CANVAS ──
export default function LiquidGrowthField({ scrollProgress = 0 }: { scrollProgress?: number }) {
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

    if (!mounted) return null

    return (
        <div className="absolute inset-0 w-full h-full pointer-events-auto z-0 overflow-hidden">
            <Canvas
                camera={{ position: [0, 0, 3.6], fov: 48 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            >
                <SceneRig mouse={mouse} scrollProgress={scrollProgress} />
            </Canvas>
        </div>
    )
}
