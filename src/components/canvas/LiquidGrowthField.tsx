'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// ══════════════════════════════════════════════════════════════════════════════
// ── V12 ARCHITECTURE: CRISP V10 OPTICS + SPATIALLY PERSISTENT FLUID MEMORY ──
// ══════════════════════════════════════════════════════════════════════════════

const DISTURBANCE_NODES = 20

const LiquidFieldShaderMaterial = {
    uniforms: {
        uTime: { value: 0 },
        uNodes: { value: new Array(DISTURBANCE_NODES).fill(0).map(() => new THREE.Vector3(0, 0, 0)) },     // (x, y, energy)
        uNodeExtra: { value: new Array(DISTURBANCE_NODES).fill(0).map(() => new THREE.Vector3(0, 0, 1)) }, // (dirX, dirY, radius)
        uScroll: { value: 0 },
        uAspect: { value: 1.0 },
        uColorBase: { value: new THREE.Color('#10120F') },
        uColorBrass: { value: new THREE.Color('#D4B270') },
        uColorBronze: { value: new THREE.Color('#9B7545') },
        uColorSage: { value: new THREE.Color('#8FA994') }
    },
    vertexShader: `
        #define NODE_COUNT 20

        uniform float uTime;
        uniform vec3 uNodes[NODE_COUNT];       // (x, y, energy)
        uniform vec3 uNodeExtra[NODE_COUNT];   // (dirX, dirY, radius)
        uniform float uScroll;
        uniform float uAspect;

        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying float vElevation;
        varying float vTextZone;
        varying float vRoughness;

        // Simplex 3D noise for crisp resting liquid-metal structure
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

        // 1. Crisp Ambient Liquid Metal Surface (Zero river drift, resting calm sheet with brushed relief)
        float calculateAmbientSurface(vec3 pos, float time, float scroll, float textZoneMask) {
            float microFlow = snoise(vec3(pos.x * 0.35, pos.y * 0.35, time * 0.08)) * 0.024;
            float microTexture = snoise(vec3(pos.x * 2.6, pos.y * 2.6, time * 0.16)) * 0.012;
            float scrollConduit = sin(pos.x * 2.2 + pos.y * 0.8) * 0.05 * scroll;

            float textDamping = mix(1.0, 0.35, textZoneMask);
            return (microFlow + microTexture + scrollConduit) * textDamping;
        }

        // 2. Volume-Conserving Displaced Water Patch (Zero forward lead, centered under contact)
        // Spatially anchored to persistent temporal nodes; ZERO traveling sine waves
        float calculateDisplacedWater(vec2 pos2D) {
            float totalDisplacement = 0.0;

            for (int i = 0; i < NODE_COUNT; i++) {
                float energy = uNodes[i].z;
                if (energy < 0.001) continue;

                vec2 nodePos = uNodes[i].xy;
                vec2 moveDir = uNodeExtra[i].xy;
                vec2 perpDir = vec2(-moveDir.y, moveDir.x);

                vec2 r = pos2D - nodePos;
                float distSq = dot(r, r);

                // Ignore vertices outside the local hand-disturbance footprint (~0.85 unit radius)
                if (distSq > 0.75) continue;

                float s_par = dot(r, moveDir);   // longitudinal axis
                float s_perp = dot(r, perpDir);  // lateral cross-track axis

                // A. Central Contact Depression / Trough (Directly at contact point: s_par = 0.0)
                float troughDip = -exp(-(s_par * s_par) / 0.075 - (s_perp * s_perp) / 0.085) * 0.048;

                // B. Leading Bow Mound (Water pushed forward: peak at s_par = +0.12, zero lead beyond hand)
                float bowRise = exp(-((s_par - 0.12) * (s_par - 0.12)) / 0.055 - (s_perp * s_perp) / 0.15) * 0.038;

                // C. Lateral Shoulder Swells (Water pushed sideways around the moving hand: s_perp = ±0.28)
                float shoulderSwell = exp(-(s_par * s_par) / 0.11 - ((abs(s_perp) - 0.28) * (abs(s_perp) - 0.28)) / 0.035) * 0.032;

                // D. Soft Trailing Wake Mass (Residual fluid mass trailing behind: s_par < 0)
                float trailingMass = exp(-((s_par + 0.22) * (s_par + 0.22)) / 0.12 - (s_perp * s_perp) / 0.14) * 0.026;

                // Volume-balanced displacement for this node
                totalDisplacement += (troughDip + bowRise + shoulderSwell + trailingMass) * energy;
            }

            return totalDisplacement;
        }

        void main() {
            vUv = uv;
            vec3 pos = position;

            // Text Zone Mask (Quiet left hemisphere where headline sits: pos.x < 0.0)
            float textZone = smoothstep(1.0, -1.8, pos.x) * smoothstep(2.5, 0.0, abs(pos.y));
            vTextZone = textZone;

            // Compute total fluid displacement
            float baseElev = calculateAmbientSurface(pos, uTime, uScroll, textZone);
            float waterDisp = calculateDisplacedWater(pos.xy);

            float totalElevation = baseElev + waterDisp;
            pos.z += totalElevation;
            vElevation = totalElevation;

            // High-Precision Analytical Normals directly derived from displaced surface heightfield
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

            // Fluid roughness: polished displaced crests (0.12) vs calm substrate (0.34)
            vRoughness = mix(0.12, 0.34, clamp(-totalElevation * 3.5 + 0.35, 0.0, 1.0));

            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
    `,
    fragmentShader: `
        #define NODE_COUNT 20

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

            // Physically Plausible Fresnel for dark liquid metal
            float NdotV = max(dot(viewDir, normal), 0.0);
            float fresnel = pow(1.0 - NdotV, 3.2);

            // Directional Key Light (Warm Environmental Key)
            vec3 lightKey = normalize(vec3(0.65, 0.85, 0.9));
            float diffKey = max(dot(normal, lightKey), 0.0);

            // Directional Rim Light (Sage Secondary Accent)
            vec3 lightRim = normalize(vec3(-0.7, -0.6, 0.4));
            float diffRim = max(dot(normal, lightRim), 0.0);

            // Dual-Lobe Specular Highlights (Crisp crest glints + broad metallic sheen)
            vec3 halfKey = normalize(lightKey + viewDir);
            float specSharp = pow(max(dot(normal, halfKey), 0.0), mix(56.0, 20.0, vRoughness));
            float specBroad = pow(max(dot(normal, halfKey), 0.0), 14.0);

            vec3 halfRim = normalize(lightRim + viewDir);
            float specRim = pow(max(dot(normal, halfRim), 0.0), 24.0);

            // Deep Obsidian-Graphite Base Albedo with crisp trough ambient occlusion
            vec3 baseTone = uColorBase;
            float ao = clamp(vElevation * 4.5 + 0.95, 0.65, 1.15);
            baseTone *= ao;

            // Environmental Specular & Fresnel Reflections (NO artificial additive light)
            float textDamping = mix(1.0, 0.3, vTextZone);
            vec3 finalColor = baseTone
                            + (uColorBrass * (specSharp * 1.4 + specBroad * 0.35) * textDamping)
                            + (uColorBronze * (specRim * 0.50) * textDamping)
                            + (uColorSage * (fresnel * 0.25 * diffRim) * textDamping);

            // ZERO ADDITIVE CURSOR GLOW — Pure optical reflection of displaced liquid geometry
            gl_FragColor = vec4(finalColor, 1.0);
        }
    `
}

// ══════════════════════════════════════════════════════════════════════════════
// ── 2. ASPECT-AWARE LIQUID FIELD MESH WITH 20-NODE SPATIAL PERSISTENCE ──
// ══════════════════════════════════════════════════════════════════════════════

interface SpatialDisturbanceNode {
    x: number
    y: number
    dirX: number
    dirY: number
    initialEnergy: number
    birthTime: number
}

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

    // Fluid follower position (subtle ~40ms physical inertia lag behind raw cursor)
    const fluidPos = useRef({ x: 0, y: 0 })
    const lastSpawnPos = useRef({ x: 0, y: 0 })
    const lastSpawnTime = useRef(0)

    // Array of 20 persistent spatial disturbance nodes
    const nodes = useRef<SpatialDisturbanceNode[]>(
        new Array(DISTURBANCE_NODES).fill(0).map(() => ({
            x: 0,
            y: 0,
            dirX: 0,
            dirY: 0,
            initialEnergy: 0,
            birthTime: 0
        }))
    )
    const activeSlot = useRef(0)

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
        const now = state.clock.getElapsedTime()

        mat.uniforms.uTime.value = now
        mat.uniforms.uScroll.value = scrollProgress
        mat.uniforms.uAspect.value = viewport.aspect

        // Target world position of the mouse
        const targetWorldX = mouse.current.x * (4.2 * viewport.aspect)
        const targetWorldY = mouse.current.y * 3.0

        // Smooth physical follower (very subtle lag: ~40ms)
        const followAlpha = 1.0 - Math.exp(-18.0 * dt)
        fluidPos.current.x += (targetWorldX - fluidPos.current.x) * followAlpha
        fluidPos.current.y += (targetWorldY - fluidPos.current.y) * followAlpha

        // Compute movement delta since last disturbance node spawn
        const dx = fluidPos.current.x - lastSpawnPos.current.x
        const dy = fluidPos.current.y - lastSpawnPos.current.y
        const distMoved = Math.hypot(dx, dy)
        const timeSinceSpawn = now - lastSpawnTime.current

        // Continuous local energy injection: spawn new node along path or refresh if swirling in place
        if (distMoved > 0.10 || (distMoved > 0.03 && timeSinceSpawn > 0.08)) {
            const dirX = dx / (distMoved + 0.0001)
            const dirY = dy / (distMoved + 0.0001)
            const speedEnergy = Math.min(distMoved * 4.5, 1.0)

            // Spawn into next ring-buffer slot (Old nodes stay permanently in their world position!)
            const slot = activeSlot.current % DISTURBANCE_NODES
            nodes.current[slot] = {
                x: fluidPos.current.x,
                y: fluidPos.current.y,
                dirX,
                dirY,
                initialEnergy: Math.max(speedEnergy, 0.4),
                birthTime: now
            }

            activeSlot.current++
            lastSpawnPos.current = { x: fluidPos.current.x, y: fluidPos.current.y }
            lastSpawnTime.current = now
        }

        // Push temporal nodes array to GLSL uniforms with strict elapsed physical time decay
        // (Half-life ~0.63s, total settling lifetime ~2.2s; moving cursor does NOT kill older nodes!)
        const nodesUniform = mat.uniforms.uNodes.value as THREE.Vector3[]
        const nodeExtraUniform = mat.uniforms.uNodeExtra.value as THREE.Vector3[]

        for (let i = 0; i < DISTURBANCE_NODES; i++) {
            const node = nodes.current[i]
            if (node.initialEnergy > 0) {
                const age = now - node.birthTime
                const currentEnergy = node.initialEnergy * Math.exp(-1.1 * age)

                if (currentEnergy > 0.001) {
                    nodesUniform[i].set(node.x, node.y, currentEnergy)
                    nodeExtraUniform[i].set(node.dirX, node.dirY, 1.0)
                } else {
                    nodesUniform[i].set(node.x, node.y, 0)
                }
            } else {
                nodesUniform[i].set(0, 0, 0)
            }
        }

        // Decay mouse velocity tracking
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

// ══════════════════════════════════════════════════════════════════════════════
// ── 3. CAMERA & SCENE RIG ──
// ══════════════════════════════════════════════════════════════════════════════

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

// ══════════════════════════════════════════════════════════════════════════════
// ── 4. EXPORTED PURE LIQUID GROWTH FIELD CANVAS ──
// ══════════════════════════════════════════════════════════════════════════════

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
