'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// ══════════════════════════════════════════════════════════════════════════════
// ── 1. GPU 2D WATER SIMULATION SHADERS (ASPECT-SCALED MULTI-SPLASH SOLVER) ──
// ══════════════════════════════════════════════════════════════════════════════

const MAX_SPLASHES = 6

const SimulationShader = {
    uniforms: {
        uCurrentWater: { value: null },                    // Texture from previous frame: R=Height, G=Velocity
        uMouse: { value: new THREE.Vector2(-10, -10) },   // Smoothed cursor UV [0, 1]
        uPrevMouse: { value: new THREE.Vector2(-10, -10) },// Previous smoothed cursor UV
        uVelocity: { value: new THREE.Vector2(0, 0) },    // Cursor velocity vector
        uForceStrength: { value: 0.0 },                   // Instantaneous force magnitude
        uAgitation: { value: 0.0 },                       // Cumulative agitation / churn energy
        uSplashPos: { value: new Array(MAX_SPLASHES).fill(0).map(() => new THREE.Vector2(-10, -10)) },
        uSplashStrength: { value: new Array(MAX_SPLASHES).fill(0) },
        uSplashRadius: { value: new Array(MAX_SPLASHES).fill(0) },
        uAspect: { value: 1.0 },                          // Viewport aspect ratio
        uDelta: { value: 0.016 },
        uDamping: { value: 0.985 },                       // Viscous friction / dissipation rate
        uWaveSpeed: { value: 0.34 },                      // Wave propagation speed constant
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
        #define MAX_SPLASHES 6

        uniform sampler2D uCurrentWater;
        uniform vec2 uMouse;
        uniform vec2 uPrevMouse;
        uniform vec2 uVelocity;
        uniform float uForceStrength;
        uniform float uAgitation;
        uniform vec2 uSplashPos[MAX_SPLASHES];
        uniform float uSplashStrength[MAX_SPLASHES];
        uniform float uSplashRadius[MAX_SPLASHES];
        uniform float uAspect;
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

            // Integrate 2D Wave & Momentum Equation with realistic viscous friction
            float newVelocity = (vCenter + laplacian * uWaveSpeed) * uDamping;
            float newHeight = (hCenter + newVelocity) * uDamping;

            // Aspect scale factor: prevents overly thick/giant footprint on narrow mobile screens
            float aspectScale = clamp(uAspect * 0.7 + 0.3, 0.65, 1.15);

            // ── 1. BUOYANT, GENTLE HAND DRAG & INTENSIFYING AGITATION ──
            if (uForceStrength > 0.001) {
                float segDist = distToSegment(uv, uPrevMouse, uMouse);
                
                // Hand footprint radius scaled proportionally to screen aspect
                float handRadius = 0.028 * aspectScale;
                float forceProfile = exp(-(segDist * segDist) / (2.0 * handRadius * handRadius));

                // Agitation gently enriches the ripple intensity without digging deep pits
                float agitationBoost = 1.0 + min(uAgitation * 0.35, 0.75);
                float impulse = forceProfile * uForceStrength * agitationBoost * aspectScale;

                // Gentle buoyant velocity impulse
                newVelocity -= impulse * 0.065;

                // Subtle fluid micro-churning around active contact zone
                if (uAgitation > 0.2) {
                    float churn = sin(uv.x * 80.0 + uv.y * 80.0) * (uAgitation * 0.004 * forceProfile);
                    newVelocity += churn;
                }
            }

            // ── 2. CONCURRENT MULTI-SPLASH RIPPLES (SCALED PROPORTIONALLY) ──
            for (int i = 0; i < MAX_SPLASHES; i++) {
                if (uSplashStrength[i] > 0.001) {
                    float clickDist = length(uv - uSplashPos[i]);
                    
                    // Fine expanding circular wavefront ring
                    float ringWidth = 0.013 * aspectScale;
                    float ringDist = abs(clickDist - uSplashRadius[i]);
                    float ringProfile = exp(-(ringDist * ringDist) / (2.0 * ringWidth * ringWidth));
                    float centerDip = exp(-(clickDist * clickDist) / (2.0 * 0.015 * 0.015 * aspectScale * aspectScale));

                    // Buoyant splash wave: gentle crest with soft center depression
                    float splashWave = (ringProfile * 0.32 - centerDip * 0.12) * uSplashStrength[i] * 0.10 * aspectScale;
                    newVelocity += splashWave;
                }
            }

            // Write state: R = Surface Height H, G = Surface Velocity V
            gl_FragColor = vec4(newHeight, newVelocity, 0.0, 1.0);
        }
    `
}

// ══════════════════════════════════════════════════════════════════════════════
// ── 2. MAIN RENDER SHADER: UNIFORM SCREEN-WIDE ILLUMINATION & LIGHTER TONES ──
// ══════════════════════════════════════════════════════════════════════════════

const LiquidFieldShaderMaterial = {
    uniforms: {
        uWaterMap: { value: null },           // 2D GPU Water State Texture
        uTime: { value: 0 },
        uScroll: { value: 0 },
        uAspect: { value: 1.0 },
        uColorBase: { value: new THREE.Color('#222720') },   // Lighter, rich obsidian-graphite
        uColorSlate: { value: new THREE.Color('#353C32') },  // Warm metallic slate midtone
        uColorBrass: { value: new THREE.Color('#DFBF82') },  // Glistening champagne brass highlights
        uColorBronze: { value: new THREE.Color('#AD8756') }, // Warm bronze secondary
        uColorSage: { value: new THREE.Color('#9BB8A2') }    // Sage Fresnel edge accent
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

        // 1. Crisp Ambient Liquid Metal Surface (Uniform multi-scale organic detail)
        float calculateAmbientSurface(vec3 pos, float time, float scroll, float aspectScale) {
            float microFlow = snoise(vec3(pos.x * 0.35, pos.y * 0.35, time * 0.08)) * 0.018;
            float microTexture = snoise(vec3(pos.x * 2.8, pos.y * 2.8, time * 0.16)) * 0.009;
            float fineGrain = snoise(vec3(pos.x * 5.2, pos.y * 5.2, time * 0.22)) * 0.005;
            float scrollConduit = sin(pos.x * 2.2 + pos.y * 0.8) * 0.040 * scroll;

            return (microFlow + microTexture + fineGrain + scrollConduit) * aspectScale;
        }

        void main() {
            vUv = uv;
            vec3 pos = position;

            // Aspect scaling factor for mobile proportions
            float aspectScale = clamp(uAspect * 0.7 + 0.3, 0.65, 1.0);

            // Sample simulated physical water heightfield with refined, shallow amplitude
            float heightMultiplier = 0.028 * aspectScale;
            float waterHeight = texture2D(uWaterMap, uv).r * heightMultiplier;
            float baseElev = calculateAmbientSurface(pos, uTime, uScroll, aspectScale);

            float totalElevation = baseElev + waterHeight;
            pos.z += totalElevation;
            vElevation = totalElevation;

            // ── HIGH-PRECISION SHARP ANALYTICAL NORMALS (Tighter delta = 0.008 for crystalline clarity) ──
            vec2 texel = vec2(1.0 / 256.0, 1.0 / 256.0);
            float hL = texture2D(uWaterMap, uv - vec2(texel.x, 0.0)).r * heightMultiplier;
            float hR = texture2D(uWaterMap, uv + vec2(texel.x, 0.0)).r * heightMultiplier;
            float hD = texture2D(uWaterMap, uv - vec2(0.0, texel.y)).r * heightMultiplier;
            float hU = texture2D(uWaterMap, uv + vec2(0.0, texel.y)).r * heightMultiplier;

            float delta = 0.008;
            float ambR = calculateAmbientSurface(pos + vec3(delta, 0.0, 0.0), uTime, uScroll, aspectScale);
            float ambU = calculateAmbientSurface(pos + vec3(0.0, delta, 0.0), uTime, uScroll, aspectScale);

            vec3 dX = vec3(delta, 0.0, (ambR + hR) - (baseElev + waterHeight));
            vec3 dY = vec3(0.0, delta, (ambU + hU) - (baseElev + waterHeight));
            vec3 customNormal = normalize(cross(dX, dY));

            vNormal = normalMatrix * customNormal;
            vPosition = (modelViewMatrix * vec4(pos, 1.0)).xyz;

            // Fluid roughness: crisp polished displaced crests (0.09) vs calm substrate (0.28)
            vRoughness = mix(0.09, 0.28, clamp(-totalElevation * 4.0 + 0.35, 0.0, 1.0));

            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
    `,
    fragmentShader: `
        uniform vec3 uColorBase;
        uniform vec3 uColorSlate;
        uniform vec3 uColorBrass;
        uniform vec3 uColorBronze;
        uniform vec3 uColorSage;
        uniform float uTime;
        uniform float uScroll;

        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying float vElevation;
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

            // Dual-Lobe Crisp Specular Highlights (Sharp crest glints + defined metallic sheen)
            vec3 halfKey = normalize(lightKey + viewDir);
            float specSharp = pow(max(dot(normal, halfKey), 0.0), mix(72.0, 26.0, vRoughness));
            float specBroad = pow(max(dot(normal, halfKey), 0.0), 18.0);

            vec3 halfRim = normalize(lightRim + viewDir);
            float specRim = pow(max(dot(normal, halfRim), 0.0), 28.0);

            // Lighter, Richer Liquid-Metal Substrate (Uniform across left and right screen)
            float ao = clamp(vElevation * 3.5 + 0.98, 0.82, 1.15);
            vec3 baseAlbedo = mix(uColorBase, uColorSlate, fresnel * 0.45 + diffKey * 0.20) * ao;

            // Environmental Specular & Fresnel Reflections (100% UNIFORM SCREEN-WIDE)
            vec3 finalColor = baseAlbedo
                            + (uColorBrass * (specSharp * 1.45 + specBroad * 0.40))
                            + (uColorBronze * (specRim * 0.52))
                            + (uColorSage * (fresnel * 0.30 * diffRim));

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

        // ── 1. EXACT SCREEN-TO-MESH UV PROJECTION (OVERFILL FACTOR 1.3 COMPENSATED) ──
        const targetMouseUV = new THREE.Vector2(
            0.5 + (mouse.current.rawNormX * 0.5) / 1.3,
            0.5 + (mouse.current.rawNormY * 0.5) / 1.3
        )

        // Silky smooth drag follow with slight physical inertia (~45ms lag)
        const dragLerp = 1.0 - Math.exp(-22.0 * dt)
        prevSmoothedMouseUV.current.copy(smoothedMouseUV.current)
        smoothedMouseUV.current.lerp(targetMouseUV, dragLerp)

        const mouseDelta = new THREE.Vector2().subVectors(smoothedMouseUV.current, prevSmoothedMouseUV.current)
        const speed = mouseDelta.length()
        // Calibrated force scaling for natural shallow water
        const instantaneousForce = Math.min(speed * 10.0, 0.35)

        // ── 2. CUMULATIVE AGITATION ACCUMULATION (MORE MOVEMENT = RICHER RIPPLES & LONGER SETTLING) ──
        if (speed > 0.0005) {
            cumulativeAgitation.current = Math.min(cumulativeAgitation.current + speed * 12.0, 2.0)
        }
        // Viscous settling decay for cumulative churn
        cumulativeAgitation.current *= Math.exp(-0.75 * dt)

        // Friction damping adapts dynamically: energized water sustains ripples naturally
        const dynamicDamping = THREE.MathUtils.lerp(0.982, 0.988, Math.min(cumulativeAgitation.current / 2.0, 1.0))

        // ── 3. PROCESS CONCURRENT MULTI-SPLASH CLICKS (IMMEDIATE ON EVERY CLICK) ──
        const splashPosUniform = simMaterial.uniforms.uSplashPos.value as THREE.Vector2[]
        const splashStrengthUniform = simMaterial.uniforms.uSplashStrength.value as number[]
        const splashRadiusUniform = simMaterial.uniforms.uSplashRadius.value as number[]

        // Clear uniform slots initially
        for (let i = 0; i < MAX_SPLASHES; i++) {
            splashPosUniform[i].set(-10, -10)
            splashStrengthUniform[i] = 0
            splashRadiusUniform[i] = 0
        }

        // Update all concurrent active splashes
        for (let i = clicks.current.length - 1; i >= 0; i--) {
            const click = clicks.current[i]
            click.radius += dt * 0.26
            click.strength *= Math.exp(-1.45 * dt)

            if (click.strength < 0.005 || click.radius > 1.2) {
                clicks.current.splice(i, 1)
            } else if (i < MAX_SPLASHES) {
                splashPosUniform[i].set(
                    0.5 + (click.x - 0.5) / 1.3,
                    0.5 + (click.y - 0.5) / 1.3
                )
                splashStrengthUniform[i] = click.strength
                splashRadiusUniform[i] = click.radius
            }
        }

        // Update simulation uniforms
        simMaterial.uniforms.uCurrentWater.value = currentTarget.current.texture
        simMaterial.uniforms.uMouse.value.copy(smoothedMouseUV.current)
        simMaterial.uniforms.uPrevMouse.value.copy(prevSmoothedMouseUV.current)
        simMaterial.uniforms.uVelocity.value.copy(mouseDelta)
        simMaterial.uniforms.uForceStrength.value = instantaneousForce
        simMaterial.uniforms.uAgitation.value = cumulativeAgitation.current
        simMaterial.uniforms.uAspect.value = viewport.aspect
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
// ── 4. CAMERA & SCENE RIG (RESPONSIVE ASPECT-AWARE DISTANCE) ──
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
    const { viewport } = useThree()

    useFrame((state) => {
        const isMobile = viewport.aspect < 1.0
        // Aspect-aware camera distance: pull back smoothly on portrait/mobile screens to scale down water ripples
        const baseZ = isMobile ? 3.95 + (1.0 - Math.min(viewport.aspect, 1.0)) * 2.2 : 3.95

        const targetCamX = mouse.current.x * (isMobile ? 0.08 : 0.16)
        const targetCamY = mouse.current.y * (isMobile ? 0.06 : 0.10) - scrollProgress * 0.4
        const targetCamZ = baseZ - scrollProgress * 0.5

        state.camera.position.x += (targetCamX - state.camera.position.x) * 0.06
        state.camera.position.y += (targetCamY - state.camera.position.y) * 0.06
        state.camera.position.z += (targetCamZ - state.camera.position.z) * 0.06
        state.camera.lookAt(0, -scrollProgress * 0.2, 0)
    })

    return (
        <>
            <ambientLight intensity={0.65} />
            <directionalLight position={[5, 7, 5]} intensity={1.7} color="#FFF8E7" />
            <directionalLight position={[-5, -4, 3]} intensity={0.95} color="#DFBF82" />

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
                strength: 0.65,
                radius: 0.002 // Instantaneous pinpoint ripple on frame 0
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
                camera={{ position: [0, 0, 3.95], fov: 48 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
            >
                <SceneRig mouse={mouse} clicks={clicks} scrollProgress={scrollProgress} />
            </Canvas>
        </div>
    )
}
