'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// ══════════════════════════════════════════════════════════════════════════════
// ── 1. GPU 2D WATER SIMULATION SHADERS (PING-PONG WAVE EQUATION SOLVER) ──
// ══════════════════════════════════════════════════════════════════════════════

const SimulationShader = {
    uniforms: {
        uCurrentWater: { value: null },                    // Texture from previous frame: R=Height, G=Velocity
        uMouse: { value: new THREE.Vector2(-10, -10) },   // Smoothed cursor UV [0, 1]
        uPrevMouse: { value: new THREE.Vector2(-10, -10) },// Previous smoothed cursor UV
        uVelocity: { value: new THREE.Vector2(0, 0) },    // Cursor velocity vector
        uForceStrength: { value: 0.0 },                   // Instantaneous force magnitude
        uAgitation: { value: 0.0 },                       // Cumulative agitation / churn energy
        uClickPos: { value: new THREE.Vector2(-10, -10) },// Click splash epicenter UV
        uClickStrength: { value: 0.0 },                   // Click splash impulse strength
        uClickRadius: { value: 0.0 },                     // Expanding splash radius
        uDelta: { value: 0.016 },
        uDamping: { value: 0.988 },                       // Viscous friction / dissipation rate
        uWaveSpeed: { value: 0.36 },                      // Wave propagation speed constant
        uTexelSize: { value: new THREE.Vector2(1 / 256, 1 / 256) }
    },
    vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform sampler2D uCurrentWater;
        uniform vec2 uMouse;
        uniform vec2 uPrevMouse;
        uniform vec2 uVelocity;
        uniform float uForceStrength;
        uniform float uAgitation;
        uniform vec2 uClickPos;
        uniform float uClickStrength;
        uniform float uClickRadius;
        uniform float uDelta;
        uniform float uDamping;
        uniform float uWaveSpeed;
        uniform vec2 uTexelSize;

        varying vec2 vUv;

        // Distance from point p to line segment [a, b]
        float distToSegment(vec2 p, vec2 a, vec2 b) {
            vec2 pa = p - a, ba = b - a;
            float h = clamp(dot(pa, ba) / dot(ba, ba + 0.00001), 0.0, 1.0);
            return length(pa - ba * h);
        }

        void main() {
            vec2 uv = vUv;

            // Sample 4-neighborhood for discrete 2D Laplacian operator
            vec4 center = texture2D(uCurrentWater, uv);
            float hCenter = center.r;
            float vCenter = center.g;

            float hLeft  = texture2D(uCurrentWater, uv - vec2(uTexelSize.x, 0.0)).r;
            float hRight = texture2D(uCurrentWater, uv + vec2(uTexelSize.x, 0.0)).r;
            float hDown  = texture2D(uCurrentWater, uv - vec2(0.0, uTexelSize.y)).r;
            float hUp    = texture2D(uCurrentWater, uv + vec2(0.0, uTexelSize.y)).r;

            // Discrete 2D Laplacian operator
            float laplacian = (hLeft + hRight + hDown + hUp) - 4.0 * hCenter;

            // Integrate 2D Wave & Momentum Equation with viscous friction
            float newVelocity = (vCenter + laplacian * uWaveSpeed) * uDamping;
            float newHeight = (hCenter + newVelocity) * uDamping;

            // ── 1. REALISTIC CONTINUOUS DRAG & INTENSIFYING AGITATION ──
            if (uForceStrength > 0.001) {
                float segDist = distToSegment(uv, uPrevMouse, uMouse);
                
                // Hand footprint width expands slightly with movement speed and agitation
                float handRadius = 0.038 + min(uAgitation * 0.008, 0.025);
                float forceProfile = exp(-(segDist * segDist) / (2.0 * handRadius * handRadius));

                // Cumulative agitation intensifies the local ripple amplitude and churn
                float agitationBoost = 1.0 + uAgitation * 1.4;
                float impulse = forceProfile * uForceStrength * agitationBoost;

                // Volume-conserving displacement: central dip + lateral wake displacement
                newVelocity -= impulse * 0.48;
                newHeight   -= impulse * 0.16;

                // Subtle fluid micro-churning around the agitated contact zone
                if (uAgitation > 0.3) {
                    float churn = sin(uv.x * 90.0 + uv.y * 90.0) * cos(uv.x * 60.0) * (uAgitation * 0.022 * forceProfile);
                    newVelocity += churn;
                }
            }

            // ── 2. SLOW-MOTION CIRCULAR SPLASH (CLICK IMPULSE) ──
            if (uClickStrength > 0.001) {
                float clickDist = length(uv - uClickPos);
                
                // Expanding circular wavefront ring
                float ringWidth = 0.016;
                float ringDist = abs(clickDist - uClickRadius);
                float ringProfile = exp(-(ringDist * ringDist) / (2.0 * ringWidth * ringWidth));
                
                // Central splash depression
                float centerDip = exp(-(clickDist * clickDist) / (2.0 * 0.025 * 0.025));

                float splashWave = (ringProfile * 0.75 - centerDip * 0.55) * uClickStrength;
                newVelocity += splashWave * 0.65;
                newHeight   += splashWave * 0.25;
            }

            // Write state: R = Surface Height H, G = Surface Velocity V
            gl_FragColor = vec4(newHeight, newVelocity, 0.0, 1.0);
        }
    `
}

// ══════════════════════════════════════════════════════════════════════════════
// ── 2. MAIN RENDER SHADER: CRISP V10 OPTICS DRIVEN BY SIMULATED WATER MAP ──
// ══════════════════════════════════════════════════════════════════════════════

const LiquidFieldShaderMaterial = {
    uniforms: {
        uWaterMap: { value: null },           // 2D GPU Water State Texture
        uTime: { value: 0 },
        uScroll: { value: 0 },
        uAspect: { value: 1.0 },
        uColorBase: { value: new THREE.Color('#10120F') },
        uColorBrass: { value: new THREE.Color('#D4B270') },
        uColorBronze: { value: new THREE.Color('#9B7545') },
        uColorSage: { value: new THREE.Color('#8FA994') }
    },
    vertexShader: `
        uniform sampler2D uWaterMap;
        uniform float uTime;
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

        void main() {
            vUv = uv;
            vec3 pos = position;

            // Text Zone Mask (Quiet left hemisphere where headline sits: pos.x < 0.0)
            float textZone = smoothstep(1.0, -1.8, pos.x) * smoothstep(2.5, 0.0, abs(pos.y));
            vTextZone = textZone;

            // Sample simulated physical water heightfield from the 2D GPU Water State texture
            float waterHeight = texture2D(uWaterMap, uv).r * 0.32;
            float baseElev = calculateAmbientSurface(pos, uTime, uScroll, textZone);

            float totalElevation = baseElev + waterHeight;
            pos.z += totalElevation;
            vElevation = totalElevation;

            // ── HIGH-PRECISION ANALYTICAL NORMALS (Derived directly from simulated water grid) ──
            vec2 texel = vec2(1.0 / 256.0, 1.0 / 256.0);
            float hL = texture2D(uWaterMap, uv - vec2(texel.x, 0.0)).r * 0.32;
            float hR = texture2D(uWaterMap, uv + vec2(texel.x, 0.0)).r * 0.32;
            float hD = texture2D(uWaterMap, uv - vec2(0.0, texel.y)).r * 0.32;
            float hU = texture2D(uWaterMap, uv + vec2(0.0, texel.y)).r * 0.32;

            float delta = 0.015;
            float ambR = calculateAmbientSurface(pos + vec3(delta, 0.0, 0.0), uTime, uScroll, textZone);
            float ambU = calculateAmbientSurface(pos + vec3(0.0, delta, 0.0), uTime, uScroll, textZone);

            vec3 dX = vec3(delta, 0.0, (ambR + hR) - (baseElev + waterHeight));
            vec3 dY = vec3(0.0, delta, (ambU + hU) - (baseElev + waterHeight));
            vec3 customNormal = normalize(cross(dX, dY));

            vNormal = normalMatrix * customNormal;
            vPosition = (modelViewMatrix * vec4(pos, 1.0)).xyz;

            // Fluid roughness: polished displaced crests (0.12) vs calm substrate (0.34)
            vRoughness = mix(0.12, 0.34, clamp(-totalElevation * 3.5 + 0.35, 0.0, 1.0));

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
// ── 3. GPU WATER SIMULATOR & PING-PONG CONTROLLER ──
// ══════════════════════════════════════════════════════════════════════════════

const SIM_SIZE = 256

function LiquidMesh({
    mouse,
    clicks,
    scrollProgress
}: {
    mouse: React.MutableRefObject<{ x: number; y: number; vx: number; vy: number; speed: number; rawNormX: number; rawNormY: number }>
    clicks: React.MutableRefObject<Array<{ x: number; y: number; time: number; strength: number; radius: number }>>
    scrollProgress: number
}) {
    const meshRef = useRef<THREE.Mesh>(null)
    const materialRef = useRef<THREE.ShaderMaterial>(null)
    const { gl, viewport } = useThree()

    // Smooth fluid follower for silky, realistic cursor drag
    const smoothedMouseUV = useRef(new THREE.Vector2(0.5, 0.5))
    const prevSmoothedMouseUV = useRef(new THREE.Vector2(0.5, 0.5))
    const cumulativeAgitation = useRef(0.0)

    // Ping-Pong Render Targets for 2D GPU Wave State Simulation
    const { rtA, rtB, simScene, simCamera, simMaterial } = useMemo(() => {
        const options: THREE.RenderTargetOptions = {
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter,
            format: THREE.RGBAFormat,
            type: THREE.HalfFloatType,
            depthBuffer: false,
            stencilBuffer: false
        }

        const rtA = new THREE.WebGLRenderTarget(SIM_SIZE, SIM_SIZE, options)
        const rtB = new THREE.WebGLRenderTarget(SIM_SIZE, SIM_SIZE, options)

        // Clear render targets initially
        gl.setRenderTarget(rtA)
        gl.clearColor()
        gl.clear()
        gl.setRenderTarget(rtB)
        gl.clearColor()
        gl.clear()
        gl.setRenderTarget(null)

        const simScene = new THREE.Scene()
        const simCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

        const simMaterial = new THREE.ShaderMaterial({
            uniforms: THREE.UniformsUtils.clone(SimulationShader.uniforms),
            vertexShader: SimulationShader.vertexShader,
            fragmentShader: SimulationShader.fragmentShader
        })

        const quadMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), simMaterial)
        simScene.add(quadMesh)

        return { rtA, rtB, simScene, simCamera, simMaterial }
    }, [gl])

    // Track ping-pong buffer swap
    const currentTarget = useRef(rtA)
    const previousTarget = useRef(rtB)

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

        // Clamp delta to prevent simulation blowup on tab switch
        const dt = Math.min(delta, 0.05)
        const now = state.clock.getElapsedTime()

        // ── 1. SMOOTH REALISTIC CURSOR DRAG FOLLOWER ──
        const targetMouseUV = new THREE.Vector2(
            mouse.current.rawNormX * 0.5 + 0.5,
            mouse.current.rawNormY * 0.5 + 0.5
        )

        // Silky smooth drag follow with slight physical inertia (~45ms lag)
        const dragLerp = 1.0 - Math.exp(-22.0 * dt)
        prevSmoothedMouseUV.current.copy(smoothedMouseUV.current)
        smoothedMouseUV.current.lerp(targetMouseUV, dragLerp)

        const mouseDelta = new THREE.Vector2().subVectors(smoothedMouseUV.current, prevSmoothedMouseUV.current)
        const speed = mouseDelta.length()
        const instantaneousForce = Math.min(speed * 26.0, 1.0)

        // ── 2. CUMULATIVE AGITATION ACCUMULATION (MORE MOVEMENT = STRONGER & LONGER EFFECTS) ──
        if (speed > 0.0005) {
            cumulativeAgitation.current = Math.min(cumulativeAgitation.current + speed * 32.0, 4.0)
        }
        // Viscous settling decay for cumulative churn
        cumulativeAgitation.current *= Math.exp(-0.65 * dt)

        // Friction damping adapts dynamically: energized agitated water sustains ripples longer
        const dynamicDamping = THREE.MathUtils.lerp(0.985, 0.991, Math.min(cumulativeAgitation.current / 3.0, 1.0))

        // ── 3. PROCESS CLICK SPLASH (SLOW-MOTION CIRCULAR WAVE IMPULSE) ──
        let activeClickStrength = 0.0
        let activeClickRadius = 0.0
        let activeClickPos = new THREE.Vector2(-10, -10)

        if (clicks.current.length > 0) {
            const click = clicks.current[0]
            const age = now - click.time
            // Splash expands slowly outward (~0.28 UV units/sec) over ~2.4 seconds
            click.radius += dt * 0.28
            click.strength *= Math.exp(-1.3 * dt)

            activeClickPos.set(click.x, click.y)
            activeClickStrength = click.strength
            activeClickRadius = click.radius

            if (click.strength < 0.005 || click.radius > 1.2) {
                clicks.current.shift()
            }
        }

        // Update simulation uniforms
        simMaterial.uniforms.uCurrentWater.value = currentTarget.current.texture
        simMaterial.uniforms.uMouse.value.copy(smoothedMouseUV.current)
        simMaterial.uniforms.uPrevMouse.value.copy(prevSmoothedMouseUV.current)
        simMaterial.uniforms.uVelocity.value.copy(mouseDelta)
        simMaterial.uniforms.uForceStrength.value = instantaneousForce
        simMaterial.uniforms.uAgitation.value = cumulativeAgitation.current
        simMaterial.uniforms.uClickPos.value.copy(activeClickPos)
        simMaterial.uniforms.uClickStrength.value = activeClickStrength
        simMaterial.uniforms.uClickRadius.value = activeClickRadius
        simMaterial.uniforms.uDamping.value = dynamicDamping
        simMaterial.uniforms.uDelta.value = dt

        // Render simulation step into write target
        gl.setRenderTarget(previousTarget.current)
        gl.render(simScene, simCamera)
        gl.setRenderTarget(null)

        // Swap ping-pong buffers
        const temp = currentTarget.current
        currentTarget.current = previousTarget.current
        previousTarget.current = temp

        // ── 4. RENDER MAIN CRISP SURFACE MESH WITH SIMULATED WATER TEXTURE ──
        mat.uniforms.uWaterMap.value = currentTarget.current.texture
        mat.uniforms.uTime.value = now
        mat.uniforms.uScroll.value = scrollProgress
        mat.uniforms.uAspect.value = viewport.aspect
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
// ── 4. CAMERA & SCENE RIG ──
// ══════════════════════════════════════════════════════════════════════════════

function SceneRig({
    mouse,
    clicks,
    scrollProgress
}: {
    mouse: React.MutableRefObject<{ x: number; y: number; vx: number; vy: number; speed: number; rawNormX: number; rawNormY: number }>
    clicks: React.MutableRefObject<Array<{ x: number; y: number; time: number; strength: number; radius: number }>>
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

            <LiquidMesh mouse={mouse} clicks={clicks} scrollProgress={scrollProgress} />
        </>
    )
}

// ══════════════════════════════════════════════════════════════════════════════
// ── 5. EXPORTED PURE LIQUID GROWTH FIELD CANVAS ──
// ══════════════════════════════════════════════════════════════════════════════

export default function LiquidGrowthField({ scrollProgress = 0 }: { scrollProgress?: number }) {
    const [mounted, setMounted] = useState(false)
    const mouse = useRef({ x: 0, y: 0, vx: 0, vy: 0, speed: 0, rawNormX: 0, rawNormY: 0 })
    const clicks = useRef<Array<{ x: number; y: number; time: number; strength: number; radius: number }>>([])

    useEffect(() => {
        setMounted(true)

        const handleMouseMove = (e: MouseEvent) => {
            const normX = (e.clientX / window.innerWidth) * 2 - 1
            const normY = -(e.clientY / window.innerHeight) * 2 + 1

            const dx = normX - mouse.current.rawNormX
            const dy = normY - mouse.current.rawNormY
            const currentSpeed = Math.hypot(dx, dy)

            mouse.current.vx = dx * 1.5
            mouse.current.vy = dy * 1.5
            mouse.current.speed = Math.min(currentSpeed * 4.0, 0.45)

            mouse.current.rawNormX = normX
            mouse.current.rawNormY = normY
            mouse.current.x = normX
            mouse.current.y = normY
        }

        const handlePointerDown = (e: MouseEvent) => {
            const uvX = e.clientX / window.innerWidth
            const uvY = 1.0 - (e.clientY / window.innerHeight)

            clicks.current.push({
                x: uvX,
                y: uvY,
                time: performance.now() / 1000.0,
                strength: 1.0,
                radius: 0.008
            })
        }

        const handleMouseLeave = () => {
            mouse.current.vx = 0
            mouse.current.vy = 0
            mouse.current.speed = 0
        }

        window.addEventListener('mousemove', handleMouseMove, { passive: true })
        window.addEventListener('pointerdown', handlePointerDown, { passive: true })
        window.addEventListener('mouseleave', handleMouseLeave, { passive: true })
        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('pointerdown', handlePointerDown)
            window.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [])

    if (!mounted) return null

    return (
        <div className="absolute inset-0 w-full h-full pointer-events-auto z-0 overflow-hidden cursor-pointer">
            <Canvas
                camera={{ position: [0, 0, 3.6], fov: 48 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
            >
                <SceneRig mouse={mouse} clicks={clicks} scrollProgress={scrollProgress} />
            </Canvas>
        </div>
    )
}
