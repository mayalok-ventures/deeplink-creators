'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// ── 1. GLSL SHADER: WATER-LIKE FLUID DYNAMICS + DARK LIQUID-METAL OPTICS ──

const LiquidFieldShaderMaterial = {
    uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uMouseVelocity: { value: 0 },
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
        uniform float uMouseVelocity;
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

        // 1. Calm Ambient Liquid Surface (Subtle, organic fluid currents)
        float calculateBaseSurface(vec3 pos, float time, float scroll, float textZoneMask) {
            // Calm Macro Currents
            float macroFlow = snoise(vec3(pos.x * 0.22, pos.y * 0.22, time * 0.18)) * 0.16;
            // Gentle Secondary Streamlines
            float midStream = sin(pos.x * 1.6 + pos.y * 0.7 - time * 0.8 + macroFlow * 1.5) * 0.08;
            // Micro-Texture Sheen
            float microTexture = snoise(vec3(pos.x * 2.8, pos.y * 2.8, time * 0.35)) * 0.025;
            // Scroll Alignment Stream
            float scrollConduits = sin(pos.x * 2.5 + pos.y * 0.9 - time * 1.5) * 0.12 * scroll;

            float activityDamping = mix(1.0, 0.35, textZoneMask);
            return (macroFlow + midStream + microTexture + scrollConduits) * activityDamping;
        }

        // 2. High-Mobility Water-Like Ripple Wavefronts
        float calculateWaterRipples(vec2 pos2D, vec2 mousePos, float time, float velocity) {
            float dist = distance(pos2D, mousePos);
            float velFactor = clamp(velocity * 0.7, 0.0, 0.4);

            // Localized fingertip-touch pressure well (tight radius, low displacement)
            float localTouch = exp(-dist * 4.8) * (0.09 + velFactor * 0.22);

            // Primary fast-traveling water ripple wavefront (high speed, sharp wave crest)
            float primaryWave = sin(dist * 20.0 - time * 11.0) * exp(-dist * 3.0) * (0.07 + velFactor * 0.15);

            // Secondary capillary ripple (crisp micro-ring dispersion)
            float capillaryWave = sin(dist * 34.0 - time * 16.0) * exp(-dist * 4.2) * (0.035 + velFactor * 0.06);

            return -localTouch + primaryWave + capillaryWave;
        }

        void main() {
            vUv = uv;
            vec3 pos = position;

            // Text Zone Mask (Left side where headline sits: pos.x < 0.0)
            float textZone = smoothstep(1.0, -1.8, pos.x) * smoothstep(2.5, 0.0, abs(pos.y));
            vTextZone = textZone;

            // Mouse coordinate in world space
            vec2 mouseWorldPos = uMouse * vec2(4.2 * uAspect, 3.0);
            vMouseDist = distance(pos.xy, mouseWorldPos);

            // Compute total water displacement
            float baseElev = calculateBaseSurface(pos, uTime, uScroll, textZone);
            float waterRipple = calculateWaterRipples(pos.xy, mouseWorldPos, uTime, uMouseVelocity);

            float totalElevation = baseElev + waterRipple;
            pos.z += totalElevation;
            vElevation = totalElevation;

            // High-Precision Analytical Normals (Reacts sharply to water ripple crests)
            float delta = 0.012;
            float eCenter = totalElevation;
            float eRight  = calculateBaseSurface(pos + vec3(delta, 0.0, 0.0), uTime, uScroll, textZone)
                          + calculateWaterRipples(pos.xy + vec2(delta, 0.0), mouseWorldPos, uTime, uMouseVelocity);
            float eUp     = calculateBaseSurface(pos + vec3(0.0, delta, 0.0), uTime, uScroll, textZone)
                          + calculateWaterRipples(pos.xy + vec2(0.0, delta), mouseWorldPos, uTime, uMouseVelocity);

            vec3 dX = vec3(delta, 0.0, eRight - eCenter);
            vec3 dY = vec3(0.0, delta, eUp - eCenter);
            vec3 customNormal = normalize(cross(dX, dY));

            vNormal = normalMatrix * customNormal;
            vPosition = (modelViewMatrix * vec4(pos, 1.0)).xyz;

            // Water-like polished surface: low roughness on ripple crests (0.10) vs calm base (0.35)
            vRoughness = mix(0.12, 0.42, clamp(-totalElevation * 2.5 + 0.4, 0.0, 1.0));

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

            // Dual-Lobe Crisp Specular Highlights on Traveling Water Ripples
            vec3 halfKey = normalize(lightKey + viewDir);
            float specSharp = pow(max(dot(normal, halfKey), 0.0), mix(56.0, 20.0, vRoughness));
            float specBroad = pow(max(dot(normal, halfKey), 0.0), 14.0);

            vec3 halfRim = normalize(lightRim + viewDir);
            float specRim = pow(max(dot(normal, halfRim), 0.0), 24.0);

            // Liquid Metal Color Composition
            // 1. Deep Obsidian-Graphite Base
            vec3 baseTone = mix(uColorBase, uColorBronze * 0.4, clamp(vElevation * 2.2 + 0.4, 0.0, 1.0));
            // 2. Warm Burnished Brass Highlights on Water Wavefronts
            vec3 ridgeColor = mix(baseTone, uColorBrass, clamp(vElevation * 3.0 + fresnel * 0.65, 0.0, 1.0));
            // 3. Subtle Sage Subsurface Accent
            vec3 sageAccent = mix(ridgeColor, uColorSage, fresnel * 0.28 * diffRim);

            // Text Zone Contrast Control (Quiet left zone for crisp typography)
            float textDamping = mix(1.0, 0.3, vTextZone);
            vec3 finalColor = sageAccent
                            + (uColorBrass * (specSharp * 1.5 + specBroad * 0.45) * textDamping)
                            + (uColorBronze * specRim * 0.65 * textDamping);

            // Ripple wavefront light enhancement
            finalColor += uColorBrass * exp(-vMouseDist * 3.5) * 0.3;

            // Full-bleed coverage: 100% solid atmospheric liquid environment
            gl_FragColor = vec4(finalColor, 1.0);
        }
    `
}

// ── 2. ASPECT-AWARE LIQUID FIELD MESH ──
function LiquidMesh({ mouse, scrollProgress }: { mouse: React.MutableRefObject<{ x: number; y: number; vx: number; vy: number }>; scrollProgress: number }) {
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

        // Fast, water-like mouse coordinate tracking
        mat.uniforms.uMouse.value.x += (mouse.current.x - mat.uniforms.uMouse.value.x) * 0.15
        mat.uniforms.uMouse.value.y += (mouse.current.y - mat.uniforms.uMouse.value.y) * 0.15

        // Fast mouse velocity dissipation (water dissipates energy quickly)
        const speed = Math.hypot(mouse.current.vx, mouse.current.vy) * 22.0
        mat.uniforms.uMouseVelocity.value += (speed - mat.uniforms.uMouseVelocity.value) * 0.18
        mat.uniforms.uMouseVelocity.value *= 0.94
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
function SceneRig({ mouse, scrollProgress }: { mouse: React.MutableRefObject<{ x: number; y: number; vx: number; vy: number }>; scrollProgress: number }) {
    useFrame((state) => {
        // Continuous smooth camera inertia
        const targetCamX = mouse.current.x * 0.25
        const targetCamY = mouse.current.y * 0.18 - scrollProgress * 0.4
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
                gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
            >
                <SceneRig mouse={mouse} scrollProgress={scrollProgress} />
            </Canvas>
        </div>
    )
}
