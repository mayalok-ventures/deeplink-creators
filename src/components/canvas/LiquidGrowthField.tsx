'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// ── 1. GLSL SHADER DEFINITIONS WITH CONTROLLED CONTRAST & VISCOUS FLUID DYNAMICS ──

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
        varying float vTextZone;

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
            vEdgeFalloff = smoothstep(1.0, 0.35, edgeDist);

            // Text Zone Mask (Left hemisphere where headline sits: pos.x < 0.2)
            // In this zone, dampen amplitude so text remains 100% legible
            float textZone = smoothstep(0.8, -1.8, pos.x) * smoothstep(2.2, 0.0, abs(pos.y));
            vTextZone = textZone;
            float activityDamping = mix(1.0, 0.45, textZone);

            // 1. Viscous Fluid Flow (Macro + Micro)
            float chaosNoise = snoise(vec3(pos.x * 0.35, pos.y * 0.35, uTime * 0.18)) * 0.3 * activityDamping;
            float microNoise = snoise(vec3(pos.x * 1.2, pos.y * 1.2, uTime * 0.3)) * 0.08 * activityDamping;

            // 2. Continuous Scroll-Driven Organization into 3 System Conduits
            float organizedChannels = sin(pos.x * 3.0 + pos.y * 1.2 - uTime * 2.0) * 0.18 * uScroll;
            float triConduit = (sin(pos.y * 3.5 - uTime * 1.8) * 0.12 + sin(pos.x * 2.5) * 0.08) * smoothstep(0.25, 0.8, uScroll);

            // 3. Physical Cursor Force & Viscous Wake
            float distToMouse = distance(pos.xy, uMouse * vec2(3.8, 2.6));
            vMouseDist = distToMouse;

            float mousePressure = exp(-distToMouse * 2.2) * (0.35 + uMouseVelocity * 0.7);
            float rippleWake = sin(distToMouse * 10.0 - uTime * 4.5) * exp(-distToMouse * 2.0) * 0.14 * (uMouseVelocity + 0.2);

            float totalElevation = (mix(chaosNoise + microNoise, organizedChannels + triConduit, uScroll * 0.8) - mousePressure + rippleWake) * vEdgeFalloff;
            pos.z += totalElevation;
            vElevation = totalElevation;

            // Analytical finite-difference normal calculation
            float delta = 0.04;
            float nX = snoise(vec3((pos.x + delta) * 0.35, pos.y * 0.35, uTime * 0.18)) - snoise(vec3((pos.x - delta) * 0.35, pos.y * 0.35, uTime * 0.18));
            float nY = snoise(vec3(pos.x * 0.35, (pos.y + delta) * 0.35, uTime * 0.18)) - snoise(vec3(pos.x * 0.35, (pos.y - delta) * 0.35, uTime * 0.18));
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
        uniform float uScroll;

        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying float vElevation;
        varying float vMouseDist;
        varying float vEdgeFalloff;
        varying float vTextZone;

        void main() {
            vec3 normal = normalize(vNormal);
            vec3 viewDir = normalize(-vPosition);

            // Physically plausible Fresnel
            float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 3.0);

            // Directional key and rim lighting
            vec3 lightKey = normalize(vec3(0.6, 0.8, 1.0));
            vec3 lightRim = normalize(vec3(-0.6, -0.5, 0.4));

            float diffKey = max(dot(normal, lightKey), 0.0);
            float diffRim = max(dot(normal, lightRim), 0.0);

            // Specular highlights
            vec3 halfKey = normalize(lightKey + viewDir);
            float specKey = pow(max(dot(normal, halfKey), 0.0), 32.0);

            vec3 halfRim = normalize(lightRim + viewDir);
            float specRim = pow(max(dot(normal, halfRim), 0.0), 16.0);

            // Fluid Color Tones
            vec3 baseTone = mix(uColorBase, uColorBronze * 0.4, clamp(vElevation * 1.5 + 0.3, 0.0, 1.0));
            vec3 ridgeColor = mix(baseTone, uColorBrass, clamp(vElevation * 2.2 + fresnel * 0.6, 0.0, 1.0));
            vec3 sageAccent = mix(ridgeColor, uColorSage, fresnel * 0.3 * diffRim);

            // Quiet zone contrast control behind typography (vTextZone)
            // Suppress harsh specular glints in text zone to guarantee razor-sharp headline readability
            float specFactor = mix(1.0, 0.25, vTextZone);
            vec3 finalColor = sageAccent + (uColorBrass * specKey * 1.3 * specFactor) + (uColorBronze * specRim * 0.6 * specFactor);

            // Cursor subsurface warmth
            finalColor += uColorBrass * exp(-vMouseDist * 2.2) * 0.35;

            // Organic alpha falloff at edges
            float alpha = smoothstep(0.0, 0.28, vEdgeFalloff) * mix(0.9, 0.7, vTextZone);

            gl_FragColor = vec4(finalColor, alpha);
        }
    `
}

// ── 2. PHYSICALLY DERIVED PARTICLES (Derived from Fluid Velocity Field) ──
function FluidSuspendedParticles({ mouse, scrollProgress }: { mouse: React.MutableRefObject<{ x: number; y: number; vx: number; vy: number }>; scrollProgress: number }) {
    const count = 220
    const pointsRef = useRef<THREE.Points>(null)

    const [positions, velocities] = useMemo(() => {
        const pos = new Float32Array(count * 3)
        const vels = new Float32Array(count * 3)

        for (let i = 0; i < count; i++) {
            // Bias particle distribution toward the right side so text zone remains clean
            const x = -3.2 + Math.random() * 6.8
            const y = (Math.random() - 0.5) * 5.0
            const z = 0.06 + Math.random() * 0.14

            pos[i * 3] = x
            pos[i * 3 + 1] = y
            pos[i * 3 + 2] = z

            vels[i * 3] = 0
            vels[i * 3 + 1] = 0
            vels[i * 3 + 2] = 0
        }
        return [pos, vels]
    }, [count])

    useFrame((state) => {
        if (!pointsRef.current) return
        const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute
        const array = posAttr.array as Float32Array
        const time = state.clock.getElapsedTime()

        const targetMouseX = mouse.current.x * 3.8
        const targetMouseY = mouse.current.y * 2.6
        const mSpeed = Math.hypot(mouse.current.vx, mouse.current.vy)

        for (let i = 0; i < count; i++) {
            const idx = i * 3
            const px = array[idx]
            const py = array[idx + 1]

            // 1. Fluid Velocity Field at Particle Position (px, py)
            // Macro fluid circulation
            const fluidVx = Math.cos(py * 0.7 + time * 0.35) * 0.007 + (scrollProgress * 0.018)
            const fluidVy = -Math.sin(px * 0.7 + time * 0.25) * 0.005 - (scrollProgress * 0.012)

            // Particles inherit fluid velocity via viscous drag
            velocities[idx] += (fluidVx - velocities[idx]) * 0.06
            velocities[idx + 1] += (fluidVy - velocities[idx + 1]) * 0.06

            // 2. Cursor Pressure Well & Momentum Handoff
            const dx = px - targetMouseX
            const dy = py - targetMouseY
            const dist = Math.hypot(dx, dy)

            if (dist < 1.6 && mSpeed > 0.001) {
                // Physical displacement + wake velocity
                const pushForce = Math.exp(-dist * 2.2) * 0.035
                const pushX = (dx / (dist + 0.01)) * pushForce + mouse.current.vx * 0.07
                const pushY = (dy / (dist + 0.01)) * pushForce + mouse.current.vy * 0.07

                velocities[idx] += pushX
                velocities[idx + 1] += pushY
            }

            // 3. Scroll Organization into 3 System Conduits
            if (scrollProgress > 0.25) {
                const conduitY = (Math.floor((i / count) * 3) - 1) * 1.3
                velocities[idx + 1] += (conduitY - py) * 0.025 * scrollProgress
                velocities[idx] += 0.012 * scrollProgress
            }

            // 4. Physical Viscous Damping (Inertia + Drag)
            velocities[idx] *= 0.93
            velocities[idx + 1] *= 0.93

            // Integrate position
            array[idx] += velocities[idx]
            array[idx + 1] += velocities[idx + 1]
            array[idx + 2] = 0.08 + Math.sin(time * 1.8 + px * 1.5) * 0.05

            // Boundary wrapping
            if (array[idx] > 4.2) array[idx] = -3.8
            if (array[idx] < -3.8) array[idx] = 4.2
            if (array[idx + 1] > 2.8) array[idx + 1] = -2.8
            if (array[idx + 1] < -2.8) array[idx + 1] = 2.8
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
                size={0.045}
                color="#D4B270"
                transparent
                opacity={0.8}
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
        mat.uniforms.uMouse.value.x += (mouse.current.x - mat.uniforms.uMouse.value.x) * 0.08
        mat.uniforms.uMouse.value.y += (mouse.current.y - mat.uniforms.uMouse.value.y) * 0.08

        // Mouse velocity decay
        const speed = Math.hypot(mouse.current.vx, mouse.current.vy) * 20.0
        mat.uniforms.uMouseVelocity.value += (speed - mat.uniforms.uMouseVelocity.value) * 0.08
    })

    return (
        <mesh ref={meshRef} position={[0, 0, 0]} rotation={[-0.12, 0, 0]}>
            <planeGeometry args={[8.4, 5.8, 160, 120]} />
            <primitive object={shaderData} ref={materialRef} attach="material" />
        </mesh>
    )
}

// ── 4. CAMERA & SCENE RIG ──
function SceneRig({ mouse, scrollProgress }: { mouse: React.MutableRefObject<{ x: number; y: number; vx: number; vy: number }>; scrollProgress: number }) {
    useFrame((state) => {
        // Continuous camera inertia linked to mouse & scroll progress
        const targetCamX = mouse.current.x * 0.35
        const targetCamY = mouse.current.y * 0.25 - scrollProgress * 0.45
        const targetCamZ = 3.6 - scrollProgress * 0.5

        state.camera.position.x += (targetCamX - state.camera.position.x) * 0.05
        state.camera.position.y += (targetCamY - state.camera.position.y) * 0.05
        state.camera.position.z += (targetCamZ - state.camera.position.z) * 0.05
        state.camera.lookAt(0, -scrollProgress * 0.25, 0)
    })

    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 7, 5]} intensity={1.5} color="#FFF8E7" />
            <directionalLight position={[-5, -4, 3]} intensity={0.8} color="#D4B270" />

            <LiquidMesh mouse={mouse} scrollProgress={scrollProgress} />
            <FluidSuspendedParticles mouse={mouse} scrollProgress={scrollProgress} />
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
