'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// ── 1. GLSL SHADER: DIRECTIONAL MOVING-FLUID WAKE + DARK LIQUID-METAL OPTICS ──

const LiquidFieldShaderMaterial = {
    uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uMouseVelocity: { value: new THREE.Vector2(0, 0) },
        uMouseSpeed: { value: 0 },
        uScroll: { value: 0 },
        uAspect: { value: 1.0 },
        uColorBase: { value: new THREE.Color('#10120F') },
        uColorBrass: { value: new THREE.Color('#D4B270') },
        uColorBronze: { value: new THREE.Color('#9B7545') },
        uColorSage: { value: new THREE.Color('#8FA994') }
    },
    vertexShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        uniform vec2 uMouseVelocity;
        uniform float uMouseSpeed;
        uniform float uScroll;
        uniform float uAspect;

        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying float vElevation;
        varying float vMouseDist;
        varying float vTextZone;
        varying float vRoughness;

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

        // 1. Calm Ambient Fluid Surface (Glassy, resting state with subtle internal streamlines)
        float calculateBaseSurface(vec3 pos, float time, float scroll, float textZoneMask) {
            float macroFlow = snoise(vec3(pos.x * 0.22, pos.y * 0.22, time * 0.16)) * 0.15;
            float midStream = sin(pos.x * 1.5 + pos.y * 0.7 - time * 0.7 + macroFlow * 1.4) * 0.075;
            float microTexture = snoise(vec3(pos.x * 2.8, pos.y * 2.8, time * 0.35)) * 0.02;
            float scrollConduits = sin(pos.x * 2.5 + pos.y * 0.9 - time * 1.4) * 0.12 * scroll;

            float activityDamping = mix(1.0, 0.35, textZoneMask);
            return (macroFlow + midStream + microTexture + scrollConduits) * activityDamping;
        }

        // 2. Anisotropic Directional Moving-Object Fluid Wake (NO circular dip/ripple source)
        float calculateDirectionalWake(vec2 pos2D, vec2 mousePos, vec2 mouseVel, float speed) {
            // If stationary, ZERO disturbance generated -> calm water
            if (speed < 0.002) return 0.0;

            vec2 toPoint = pos2D - mousePos;
            vec2 moveDir = normalize(mouseVel);
            vec2 perpDir = vec2(-moveDir.y, moveDir.x);

            // Coordinate projection:
            // s_parallel: positive = ahead of cursor, negative = trailing behind cursor
            // s_perp: cross-track perpendicular distance from movement axis
            float s_parallel = dot(toPoint, moveDir);
            float s_perp = dot(toPoint, perpDir);

            // A. Bow Wave: Gentle fluid rise ahead of cursor (s_parallel > 0)
            float bowWave = 0.0;
            if (s_parallel > 0.0 && s_parallel < 0.35) {
                bowWave = exp(-s_parallel * 8.0 - abs(s_perp) * 6.0) * (0.04 * speed);
            }

            // B. Trailing Kelvin Wake: Directional V-shaped wave trailing BEHIND cursor (s_parallel <= 0)
            float trailingWake = 0.0;
            if (s_parallel <= 0.0) {
                float behindDist = -s_parallel;
                // V-shaped wake expands gradually behind movement axis
                float wakeWidth = 0.14 + behindDist * 0.42;
                float crossTrackAtten = exp(-(s_perp * s_perp) / (2.0 * wakeWidth * wakeWidth));
                float lengthAtten = exp(-behindDist * 2.0);

                // Wake waves along the trajectory
                float wakePhase = behindDist * 16.0 - (s_perp * s_perp) * 10.0;
                float wakeOscillation = sin(wakePhase) * (0.13 * speed);

                trailingWake = wakeOscillation * crossTrackAtten * lengthAtten;
            }

            return bowWave + trailingWake;
        }

        void main() {
            vUv = uv;
            vec3 pos = position;

            // Text Zone Mask (Left side where headline sits: pos.x < 0.0)
            float textZone = smoothstep(1.0, -1.8, pos.x) * smoothstep(2.5, 0.0, abs(pos.y));
            vTextZone = textZone;

            // Mouse coordinates in aspect-aware world space
            vec2 mouseWorldPos = uMouse * vec2(4.2 * uAspect, 3.0);
            vMouseDist = distance(pos.xy, mouseWorldPos);

            // Compute total fluid displacement
            float baseElev = calculateBaseSurface(pos, uTime, uScroll, textZone);
            float wakeElev = calculateDirectionalWake(pos.xy, mouseWorldPos, uMouseVelocity, uMouseSpeed);

            float totalElevation = baseElev + wakeElev;
            pos.z += totalElevation;
            vElevation = totalElevation;

            // High-Precision Analytical Normals (Captures directional wake crest reflections)
            float delta = 0.012;
            float eCenter = totalElevation;
            float eRight  = calculateBaseSurface(pos + vec3(delta, 0.0, 0.0), uTime, uScroll, textZone)
                          + calculateDirectionalWake(pos.xy + vec2(delta, 0.0), mouseWorldPos, uMouseVelocity, uMouseSpeed);
            float eUp     = calculateBaseSurface(pos + vec3(0.0, delta, 0.0), uTime, uScroll, textZone)
                          + calculateDirectionalWake(pos.xy + vec2(0.0, delta), mouseWorldPos, uMouseVelocity, uMouseSpeed);

            vec3 dX = vec3(delta, 0.0, eRight - eCenter);
            vec3 dY = vec3(0.0, delta, eUp - eCenter);
            vec3 customNormal = normalize(cross(dX, dY));

            vNormal = normalMatrix * customNormal;
            vPosition = (modelViewMatrix * vec4(pos, 1.0)).xyz;

            // Fluid roughness variation: polished wake crests (0.12) vs calm base (0.38)
            vRoughness = mix(0.12, 0.38, clamp(-totalElevation * 2.2 + 0.4, 0.0, 1.0));

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
        uniform float uMouseSpeed;

        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying float vElevation;
        varying float vMouseDist;
        varying float vTextZone;
        varying float vRoughness;

        void main() {
            vec3 normal = normalize(vNormal);
            vec3 viewDir = normalize(-vPosition);

            // Physically Plausible Fresnel for liquid metal
            float NdotV = max(dot(viewDir, normal), 0.0);
            float fresnel = pow(1.0 - NdotV, 3.2);

            // Directional Key Light (Warm Environmental Key)
            vec3 lightKey = normalize(vec3(0.65, 0.85, 0.9));
            float diffKey = max(dot(normal, lightKey), 0.0);

            // Directional Rim Light (Sage Secondary Accent)
            vec3 lightRim = normalize(vec3(-0.7, -0.6, 0.4));
            float diffRim = max(dot(normal, lightRim), 0.0);

            // Dual-Lobe Crisp Specular Highlights
            vec3 halfKey = normalize(lightKey + viewDir);
            float specSharp = pow(max(dot(normal, halfKey), 0.0), mix(56.0, 20.0, vRoughness));
            float specBroad = pow(max(dot(normal, halfKey), 0.0), 14.0);

            vec3 halfRim = normalize(lightRim + viewDir);
            float specRim = pow(max(dot(normal, halfRim), 0.0), 24.0);

            // Liquid Metal Color Composition
            // 1. Deep Obsidian-Graphite Base
            vec3 baseTone = mix(uColorBase, uColorBronze * 0.4, clamp(vElevation * 2.0 + 0.4, 0.0, 1.0));
            // 2. Warm Burnished Brass Highlights on Wake Crests
            vec3 ridgeColor = mix(baseTone, uColorBrass, clamp(vElevation * 2.8 + fresnel * 0.65, 0.0, 1.0));
            // 3. Subtle Sage Subsurface Accent
            vec3 sageAccent = mix(ridgeColor, uColorSage, fresnel * 0.28 * diffRim);

            // Text Zone Contrast Control (Quiet left zone for crisp typography)
            float textDamping = mix(1.0, 0.3, vTextZone);
            vec3 finalColor = sageAccent
                            + (uColorBrass * (specSharp * 1.5 + specBroad * 0.45) * textDamping)
                            + (uColorBronze * specRim * 0.65 * textDamping);

            // Subtle trailing wake illumination when moving (Zero when stationary)
            finalColor += uColorBrass * exp(-vMouseDist * 3.0) * (0.25 * uMouseSpeed);

            // Full-bleed coverage: 100% solid atmospheric liquid environment
            gl_FragColor = vec4(finalColor, 1.0);
        }
    `
}

// ── 2. ASPECT-AWARE LIQUID FIELD MESH ──
function LiquidMesh({ mouse, scrollProgress }: { mouse: React.MutableRefObject<{ x: number; y: number; vx: number; vy: number; speed: number }>; scrollProgress: number }) {
    const meshRef = useRef<THREE.Mesh>(null)
    const materialRef = useRef<THREE.ShaderMaterial>(null)
    const { viewport } = useThree()

    const shaderData = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: THREE.UniformsUtils.clone(LiquidFieldShaderMaterial.uniforms),
            vertexShader: LiquidFieldShaderMaterial.vertexShader,
            fragmentShader: LiquidFieldShaderMaterial.fragmentShader,
            side: THREE.DoubleSide
        })
    }, [])

    useFrame((state) => {
        if (!materialRef.current) return
        const mat = materialRef.current

        mat.uniforms.uTime.value = state.clock.getElapsedTime()
        mat.uniforms.uScroll.value = scrollProgress
        mat.uniforms.uAspect.value = viewport.aspect

        // Smooth mouse coordinate tracking
        mat.uniforms.uMouse.value.x += (mouse.current.x - mat.uniforms.uMouse.value.x) * 0.18
        mat.uniforms.uMouse.value.y += (mouse.current.y - mat.uniforms.uMouse.value.y) * 0.18

        // Directional velocity vector tracking
        mat.uniforms.uMouseVelocity.value.x += (mouse.current.vx - mat.uniforms.uMouseVelocity.value.x) * 0.2
        mat.uniforms.uMouseVelocity.value.y += (mouse.current.vy - mat.uniforms.uMouseVelocity.value.y) * 0.2

        // Speed tracking with smooth dissipation
        mat.uniforms.uMouseSpeed.value += (mouse.current.speed - mat.uniforms.uMouseSpeed.value) * 0.22
        mat.uniforms.uMouseSpeed.value *= 0.90 // Dissipates rapidly to 0 when cursor stops

        // Decay velocity per frame
        mouse.current.vx *= 0.88
        mouse.current.vy *= 0.88
        mouse.current.speed *= 0.88
    })

    // Sized to overfill viewport dimensions completely
    const planeW = viewport.width * 1.3
    const planeH = viewport.height * 1.3

    return (
        <mesh ref={meshRef} position={[0, 0, 0]} rotation={[-0.1, 0, 0]}>
            <planeGeometry args={[planeW, planeH, 180, 130]} />
            <primitive object={shaderData} ref={materialRef} attach="material" />
        </mesh>
    )
}

// ── 3. CAMERA & SCENE RIG ──
function SceneRig({ mouse, scrollProgress }: { mouse: React.MutableRefObject<{ x: number; y: number; vx: number; vy: number; speed: number }>; scrollProgress: number }) {
    useFrame((state) => {
        const targetCamX = mouse.current.x * 0.22
        const targetCamY = mouse.current.y * 0.15 - scrollProgress * 0.4
        const targetCamZ = 3.6 - scrollProgress * 0.5

        state.camera.position.x += (targetCamX - state.camera.position.x) * 0.06
        state.camera.position.y += (targetCamY - state.camera.position.y) * 0.06
        state.camera.position.z += (targetCamZ - state.camera.position.z) * 0.06
        state.camera.lookAt(0, -scrollProgress * 0.2, 0)
    })

    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 7, 5]} intensity={1.5} color="#FFF8E7" />
            <directionalLight position={[-5, -4, 3]} intensity={0.8} color="#D4B270" />

            <LiquidMesh mouse={mouse} scrollProgress={scrollProgress} />
        </>
    )
}

// ── 4. EXPORTED PURE LIQUID GROWTH FIELD CANVAS ──
export default function LiquidGrowthField({ scrollProgress = 0 }: { scrollProgress?: number }) {
    const [mounted, setMounted] = useState(false)
    const mouse = useRef({ x: 0, y: 0, vx: 0, vy: 0, lastX: 0, lastY: 0, speed: 0 })

    useEffect(() => {
        setMounted(true)

        const handleMouseMove = (e: MouseEvent) => {
            const normX = (e.clientX / window.innerWidth) * 2 - 1
            const normY = -(e.clientY / window.innerHeight) * 2 + 1

            const dx = normX - mouse.current.lastX
            const dy = normY - mouse.current.lastY
            const currentSpeed = Math.hypot(dx, dy)

            // Inject velocity and speed with smooth capping
            mouse.current.vx = dx * 1.8
            mouse.current.vy = dy * 1.8
            mouse.current.speed = Math.min(currentSpeed * 4.5, 0.45)

            mouse.current.lastX = normX
            mouse.current.lastY = normY
            mouse.current.x = normX
            mouse.current.y = normY
        }

        const handleMouseLeave = () => {
            // When mouse leaves, reset velocity to zero naturally
            mouse.current.vx = 0
            mouse.current.vy = 0
            mouse.current.speed = 0
        }

        window.addEventListener('mousemove', handleMouseMove, { passive: true })
        window.addEventListener('mouseleave', handleMouseLeave, { passive: true })
        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [])

    if (!mounted) return null

    return (
        <div className="absolute inset-0 w-full h-full pointer-events-auto z-0 overflow-hidden">
            <Canvas
                camera={{ position: [0, 0, 3.6], fov: 48 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
            >
                <SceneRig mouse={mouse} scrollProgress={scrollProgress} />
            </Canvas>
        </div>
    )
}
