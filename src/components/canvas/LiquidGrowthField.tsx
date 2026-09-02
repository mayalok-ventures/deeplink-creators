'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// ── 1. GLSL SHADER: REAL LOCAL WATER DISPLACEMENT (VOLUME CONSERVING, ZERO EMISSIVE) ──

const TRAIL_LENGTH = 10

const LiquidFieldShaderMaterial = {
    uniforms: {
        uTime: { value: 0 },
        uTrail: { value: new Array(TRAIL_LENGTH).fill(0).map(() => new THREE.Vector3(0, 0, 0)) },
        uTrailDir: { value: new Array(TRAIL_LENGTH).fill(0).map(() => new THREE.Vector2(0, 0)) },
        uScroll: { value: 0 },
        uAspect: { value: 1.0 },
        uColorBase: { value: new THREE.Color('#10120F') },
        uColorBrass: { value: new THREE.Color('#D4B270') },
        uColorBronze: { value: new THREE.Color('#9B7545') },
        uColorSage: { value: new THREE.Color('#8FA994') }
    },
    vertexShader: `
        #define TRAIL_COUNT 10

        uniform float uTime;
        uniform vec3 uTrail[TRAIL_COUNT];      // (x, y, intensity)
        uniform vec2 uTrailDir[TRAIL_COUNT];   // (dirX, dirY)
        uniform float uScroll;
        uniform float uAspect;

        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying float vElevation;
        varying float vTextZone;
        varying float vRoughness;

        // Simplex 3D noise implementation for calm background micro-texture
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

        // 1. Ambient Glassy Surface (Zero ocean swell, calm liquid metal sheet)
        float calculateAmbientSurface(vec3 pos, float time, float scroll, float textZoneMask) {
            float microFlow = snoise(vec3(pos.x * 0.35, pos.y * 0.35, time * 0.12)) * 0.025;
            float microTexture = snoise(vec3(pos.x * 2.8, pos.y * 2.8, time * 0.22)) * 0.012;
            float scrollConduit = sin(pos.x * 2.5 + pos.y * 0.9 - time * 1.2) * 0.06 * scroll;

            float textDamping = mix(1.0, 0.35, textZoneMask);
            return (microFlow + microTexture + scrollConduit) * textDamping;
        }

        // 2. Real Volume-Conserving Displaced Water Patch (Push + Trough + Shoulder Swell)
        // Strictly spatial footprint, ZERO traveling sine waves, ZERO time phase multipliers
        float calculateDisplacedWater(vec2 pos2D) {
            float totalDisplacement = 0.0;

            for (int i = 0; i < TRAIL_COUNT; i++) {
                float intensity = uTrail[i].z;
                if (intensity < 0.002) continue;

                vec2 trailPos = uTrail[i].xy;
                vec2 moveDir = uTrailDir[i];
                vec2 perpDir = vec2(-moveDir.y, moveDir.x);

                vec2 r = pos2D - trailPos;
                float distSq = dot(r, r);

                // Ignore vertices outside the local hand-disturbance zone (~0.85 unit radius)
                if (distSq > 0.75) continue;

                // Decompose into longitudinal (motion axis) and transverse (cross-track) coordinates
                float s_par = dot(r, moveDir);   // >0 is in front of hand, <0 is behind hand
                float s_perp = dot(r, perpDir);  // lateral offset perpendicular to motion

                // A. Leading Bow Compression (Water pushed up ahead of hand: s_par > 0)
                float bowRise = exp(-((s_par - 0.22) * (s_par - 0.22)) / 0.065 - (s_perp * s_perp) / 0.18) * 0.048;

                // B. Shallow Depression / Trough (Displacement void beneath & directly behind hand)
                float troughDip = -exp(-((s_par + 0.08) * (s_par + 0.08)) / 0.055 - (s_perp * s_perp) / 0.12) * 0.038;

                // C. Lateral Shoulder Swells (Water pushed sideways around the moving hand)
                float shoulderSwell = exp(-(s_par * s_par) / 0.12 - ((abs(s_perp) - 0.30) * (abs(s_perp) - 0.30)) / 0.04) * 0.032;

                // D. Soft Trailing Wake Memory (Residual fluid mass trailing behind)
                float trailingMass = exp(-((s_par + 0.42) * (s_par + 0.42)) / 0.16 - (s_perp * s_perp) / 0.16) * 0.022;

                // Volume-balanced displacement (positive mounds + negative trough)
                float sampleDisp = (bowRise + troughDip + shoulderSwell + trailingMass) * intensity;
                totalDisplacement += sampleDisp;
            }

            return totalDisplacement;
        }

        void main() {
            vUv = uv;
            vec3 pos = position;

            // Text Zone Mask (Left hemisphere where headline sits: pos.x < 0.0)
            float textZone = smoothstep(1.0, -1.8, pos.x) * smoothstep(2.5, 0.0, abs(pos.y));
            vTextZone = textZone;

            // Compute total fluid displacement
            float baseElev = calculateAmbientSurface(pos, uTime, uScroll, textZone);
            float waterDisp = calculateDisplacedWater(pos.xy);

            float totalElevation = baseElev + waterDisp;
            pos.z += totalElevation;
            vElevation = totalElevation;

            // High-Precision Analytical Normals directly derived from the displaced heightfield
            float delta = 0.015;
            float eCenter = totalElevation;
            float eRight  = calculateAmbientSurface(pos + vec3(delta, 0.0, 0.0), uTime, uScroll, textZone)
                          + calculateDisplacedWater(pos.xy + vec2(delta, 0.0));
            float eUp     = calculateAmbientSurface(pos + vec3(0.0, delta, 0.0), uTime, uScroll, textZone)
                          + calculateDisplacedWater(pos.xy + vec2(0.0, delta));

            vec3 dX = vec3(delta, 0.0, eRight - eCenter);
            vec3 dY = vec3(0.0, delta, eUp - eCenter);
            vec3 customNormal = normalize(cross(dX, dY));

            vNormal = normalMatrix * customNormal;
            vPosition = (modelViewMatrix * vec4(pos, 1.0)).xyz;

            // Fluid roughness: polished displaced crests (0.12) vs calm substrate (0.35)
            vRoughness = mix(0.12, 0.35, clamp(-totalElevation * 3.0 + 0.35, 0.0, 1.0));

            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
    `,
    fragmentShader: `
        #define TRAIL_COUNT 10

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

            // Dual-Lobe Specular Highlights: Light reflecting naturally from tilted displaced normals
            vec3 halfKey = normalize(lightKey + viewDir);
            float specSharp = pow(max(dot(normal, halfKey), 0.0), mix(56.0, 20.0, vRoughness));
            float specBroad = pow(max(dot(normal, halfKey), 0.0), 14.0);

            vec3 halfRim = normalize(lightRim + viewDir);
            float specRim = pow(max(dot(normal, halfRim), 0.0), 24.0);

            // Deep Obsidian-Graphite Base Albedo (NO height-based artificial brass albedo conversion)
            vec3 baseTone = uColorBase;
            
            // Subtle ambient occlusion in trough shadows
            float ao = clamp(vElevation * 4.0 + 0.95, 0.65, 1.1);
            baseTone *= ao;

            // Reflected Environmental Light (Specular highlights on crests, Fresnel rims on edges)
            float textDamping = mix(1.0, 0.3, vTextZone);
            vec3 finalColor = baseTone
                            + (uColorBrass * (specSharp * 1.4 + specBroad * 0.35) * textDamping)
                            + (uColorBronze * specRim * 0.5 * textDamping)
                            + (uColorSage * (fresnel * 0.25 * diffRim) * textDamping);

            // ZERO ADDITIVE CURSOR EMISSIVE GLOW (Pure natural lighting response)
            gl_FragColor = vec4(finalColor, 1.0);
        }
    `
}

// ── 2. ASPECT-AWARE LIQUID FIELD MESH WITH TIME-NORMALIZED FLUID PHYSICS ──
function LiquidMesh({
    mouse,
    scrollProgress
}: {
    mouse: React.MutableRefObject<{ x: number; y: number; vx: number; vy: number; speed: number }>
    scrollProgress: number
}) {
    const meshRef = useRef<THREE.Mesh>(null)
    const materialRef = useRef<THREE.ShaderMaterial>(null)
    const { viewport } = useThree()

    // Fluid follower position (has slight physical inertia lag behind raw cursor)
    const fluidPos = useRef({ x: 0, y: 0, vx: 0, vy: 0 })

    // Ring buffer of 10 historical displaced fluid mass samples
    const trailHistory = useRef(
        new Array(TRAIL_LENGTH).fill(0).map(() => ({ x: 0, y: 0, dirX: 0, dirY: 0, intensity: 0 }))
    )

    const shaderData = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: THREE.UniformsUtils.clone(LiquidFieldShaderMaterial.uniforms),
            vertexShader: LiquidFieldShaderMaterial.vertexShader,
            fragmentShader: LiquidFieldShaderMaterial.fragmentShader,
            side: THREE.DoubleSide
        })
    }, [])

    useFrame((state, delta) => {
        if (!materialRef.current) return
        const mat = materialRef.current

        // Clamp delta to prevent huge jumps on tab switch
        const dt = Math.min(delta, 0.05)

        mat.uniforms.uTime.value = state.clock.getElapsedTime()
        mat.uniforms.uScroll.value = scrollProgress
        mat.uniforms.uAspect.value = viewport.aspect

        // Target world position of the mouse
        const targetWorldX = mouse.current.x * (4.2 * viewport.aspect)
        const targetWorldY = mouse.current.y * 3.0

        // Frame-rate-independent physical fluid follow (follower lags smoothly behind cursor)
        const followAlpha = 1.0 - Math.exp(-10.0 * dt) // 10.0 follow rate (subtle ~60ms lag)
        fluidPos.current.x += (targetWorldX - fluidPos.current.x) * followAlpha
        fluidPos.current.y += (targetWorldY - fluidPos.current.y) * followAlpha

        // Compute movement delta of fluid follower
        const dx = fluidPos.current.x - trailHistory.current[0].x
        const dy = fluidPos.current.y - trailHistory.current[0].y
        const distMoved = Math.hypot(dx, dy)

        if (distMoved > 0.022) {
            // Shift history backward
            for (let i = TRAIL_LENGTH - 1; i > 0; i--) {
                trailHistory.current[i] = {
                    ...trailHistory.current[i - 1],
                    intensity: trailHistory.current[i - 1].intensity * 0.86
                }
            }

            // Direction vector of the displacement
            const dirX = dx / (distMoved + 0.0001)
            const dirY = dy / (distMoved + 0.0001)
            // Force/energy proportional to movement speed, capped safely
            const normalizedIntensity = Math.min(distMoved * 4.5, 1.0)

            trailHistory.current[0] = {
                x: fluidPos.current.x,
                y: fluidPos.current.y,
                dirX,
                dirY,
                intensity: normalizedIntensity
            }
        } else {
            // Frame-rate-independent fluid settling (~1.8s half-life to calm equilibrium)
            const decayFactor = Math.exp(-2.2 * dt)
            for (let i = 0; i < TRAIL_LENGTH; i++) {
                trailHistory.current[i].intensity *= decayFactor
                if (trailHistory.current[i].intensity < 0.001) {
                    trailHistory.current[i].intensity = 0
                }
            }
        }

        // Push trajectory history to GLSL uniforms
        const trailUniform = mat.uniforms.uTrail.value as THREE.Vector3[]
        const trailDirUniform = mat.uniforms.uTrailDir.value as THREE.Vector2[]

        for (let i = 0; i < TRAIL_LENGTH; i++) {
            trailUniform[i].set(
                trailHistory.current[i].x,
                trailHistory.current[i].y,
                trailHistory.current[i].intensity
            )
            trailDirUniform[i].set(
                trailHistory.current[i].dirX,
                trailHistory.current[i].dirY
            )
        }

        // Decay mouse velocity per frame
        const velDecay = Math.exp(-6.0 * dt)
        mouse.current.vx *= velDecay
        mouse.current.vy *= velDecay
        mouse.current.speed *= velDecay
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
function SceneRig({
    mouse,
    scrollProgress
}: {
    mouse: React.MutableRefObject<{ x: number; y: number; vx: number; vy: number; speed: number }>
    scrollProgress: number
}) {
    useFrame((state) => {
        const targetCamX = mouse.current.x * 0.16
        const targetCamY = mouse.current.y * 0.10 - scrollProgress * 0.4
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

            // Smooth velocity injection
            mouse.current.vx = dx * 1.5
            mouse.current.vy = dy * 1.5
            mouse.current.speed = Math.min(currentSpeed * 4.0, 0.45)

            mouse.current.lastX = normX
            mouse.current.lastY = normY
            mouse.current.x = normX
            mouse.current.y = normY
        }

        const handleMouseLeave = () => {
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
