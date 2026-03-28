"use client";

import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "./HeroSection.module.css";

gsap.registerPlugin(ScrollTrigger);

/* ── coin service labels ── */
const COIN_LABELS = [
  "SEO /\nContent Writing",
  "CRM\nSoftware",
  "Social Media\nHandling",
  "Web\nDevelopment",
  "Apps\nDevelopment",
  "Google &\nMeta Ads",
];

/* ── Rotating headline phrases ── */
const ROTATING_WORDS = [
  "Revenue Machines",
  "Revenue Systems",
  "Scalable Revenue",
  "Predictable Revenue",
  "Growth Systems",
  "Sales Engine",
  "ROI Growth",
  "Traffic to Sales",
  "Profit First",
  "Premium Leads",
  "High-Value Leads",
  "Client Growth",
  "Full Funnel",
  "Conversion Web",
  "Revenue Engine",
  "No BS Revenue",
];

/* ── 3-phase stack positions (2 rows of 3) ── */
const STACK_POSITIONS = [
  [-1.0, -2.6, 0.3],
  [0, -2.6, 0.2],
  [1.0, -2.6, 0.1],
  [-0.5, -3.8, 0.0],
  [0.5, -3.8, -0.1],
  [0, -3.8, -0.2],
];

/* ── intermediate scatter targets for Phase 2 ── */
const SCATTER_TARGETS = COIN_LABELS.map((_, i) => ({
  x: ((i % 3) - 1) * 0.9,
  y: i < 3 ? -2.8 : -4.0,
  z: 0.5 - i * 0.08,
}));

/* ── canvas gold gradient helper ── */
function drawGoldGradient(ctx, cx, S) {
  const g = ctx.createRadialGradient(cx - 60, cx - 80, 10, cx, cx, 255);
  g.addColorStop(0, "#D4B860");
  g.addColorStop(0.18, "#C9A84C");
  g.addColorStop(0.55, "#A07830");
  g.addColorStop(0.82, "#8B6520");
  g.addColorStop(1, "#5A3E0A");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, S, S);

  // Specular hotspot
  const spec = ctx.createRadialGradient(
    cx - 90,
    cx - 100,
    0,
    cx - 90,
    cx - 100,
    180,
  );
  spec.addColorStop(0, "rgba(255,255,220,0.45)");
  spec.addColorStop(0.5, "rgba(255,240,180,0.15)");
  spec.addColorStop(1, "transparent");
  ctx.fillStyle = spec;
  ctx.fillRect(0, 0, S, S);

  // Bevel rings
  ctx.strokeStyle = "#D4B860";
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.arc(cx, cx, 238, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = "#5A3E0A";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(cx, cx, 229, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = "rgba(0,0,0,0.3)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cx, 222, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = "rgba(212,184,96,0.18)";
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(cx, cx, 200, 0, Math.PI * 2);
  ctx.stroke();
}

/* ── COIN FACE TEXTURE — service label, engraved gold look ── */
function makeFaceTexture(label) {
  const S = 512,
    cx = 256;
  const c = document.createElement("canvas");
  c.width = S;
  c.height = S;
  const ctx = c.getContext("2d");
  ctx.beginPath();
  ctx.arc(cx, cx, 250, 0, Math.PI * 2);
  ctx.clip();
  drawGoldGradient(ctx, cx, S);

  const lines = label.split("\n");
  const lineH = 54;
  const totalH = lines.length * lineH;
  lines.forEach((line, i) => {
    const fs = line.length > 13 ? 36 : line.length > 9 ? 42 : 48;
    const y = cx - totalH / 2 + lineH * i + lineH / 2;
    ctx.font = `900 italic ${fs}px Georgia, serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillText(line, cx + 2, y + 3);
    ctx.fillStyle = "rgba(212,184,96,0.25)";
    ctx.fillText(line, cx - 1, y - 1);
    ctx.fillStyle = "#2E1A00";
    ctx.fillText(line, cx, y);
  });

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/* ── COIN BACK TEXTURE — same label + "DEEPLINK CREATORS" + faint DLC watermark ── */
function makeBackTexture(label) {
  const S = 512,
    cx = 256;
  const c = document.createElement("canvas");
  c.width = S;
  c.height = S;
  const ctx = c.getContext("2d");
  ctx.beginPath();
  ctx.arc(cx, cx, 250, 0, Math.PI * 2);
  ctx.clip();
  drawGoldGradient(ctx, cx, S);

  // Faint DLC watermark (very large, translucent)
  ctx.font = "900 italic 280px Georgia, serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "rgba(90,62,10,0.12)";
  ctx.fillText("DLC", cx, cx);

  // Service label (same as face) — centered above midpoint
  const lines = label.split("\n");
  const lineH = 50;
  const totalH = lines.length * lineH;
  const startY = cx - totalH / 2 - 20;
  lines.forEach((line, i) => {
    const fs = line.length > 13 ? 32 : line.length > 9 ? 38 : 44;
    const y = startY + lineH * i + lineH / 2;
    ctx.font = `900 italic ${fs}px Georgia, serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "rgba(0,0,0,0.45)";
    ctx.fillText(line, cx + 2, y + 3);
    ctx.fillStyle = "rgba(212,184,96,0.25)";
    ctx.fillText(line, cx - 1, y - 1);
    ctx.fillStyle = "#2E1A00";
    ctx.fillText(line, cx, y);
  });

  // "DEEPLINK CREATORS" sub-label below the service text
  ctx.font = "600 22px Georgia, serif";
  ctx.letterSpacing = "0.2em";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#5A3E0A";
  ctx.fillText("DEEPLINK CREATORS", cx, cx + totalH / 2 + 20);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/* ── smoothstep helper ── */
function smoothstep(x) {
  return x * x * (3 - 2 * x);
}
function clamp01(x) {
  return Math.max(0, Math.min(1, x));
}

export default function HeroSection() {
  const wrapperRef = useRef(null);
  const canvasContainerRef = useRef(null); // ← container div, NOT canvas
  const scrollProgressRef = useRef(0);

  /* ── Canvas ready state (text shows immediately, canvas fades in) ── */
  const [canvasReady, setCanvasReady] = useState(false);

  /* ── Rotating text state ── */
  const [wordIdx, setWordIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      setVisible(false);
      setTimeout(() => {
        setWordIdx((i) => (i + 1) % ROTATING_WORDS.length);
        setVisible(true);
      }, 400); // 400ms fade-out → swap → fade-in
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    /* ── Defer Three.js init by 1 frame so hero text paints first ── */
    let rafCleanup = null;
    const timerId = setTimeout(() => {

    /* ── Renderer — lower quality on mobile for speed ── */
    const isMobile = window.innerWidth < 768;
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile, // skip antialias on mobile = big perf win
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.0 : 1.2));
    renderer.shadowMap.enabled = !isMobile; // shadows off on mobile
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.6;
    container.appendChild(renderer.domElement);
    setCanvasReady(true); // ← fade in canvas once it's mounted

    /* ── Scene & Camera ── */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      100,
    );
    camera.position.set(0, 0, 8);

    /* ── Environment map ── */
    const pmrem = new THREE.PMREMGenerator(renderer);
    pmrem.compileEquirectangularShader();
    const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;

    /* ── DLC Cinematic Lighting ── */
    scene.add(new THREE.AmbientLight(0x05050a, 2.0));

    const key = new THREE.DirectionalLight(0xffedb0, 9.0); // boosted from 7.5
    key.position.set(9, 15, 8);
    key.castShadow = !isMobile;
    key.shadow.mapSize.setScalar(1024); // 2048→1024 = 4× less shadow memory
    key.shadow.bias = -0.0005;
    scene.add(key);

    const rim = new THREE.PointLight(0x3a4a6a, 9, 30);
    rim.position.set(-7, 6, -6);
    scene.add(rim);

    // Second rim for edge highlight (opposite side)
    const rim2 = new THREE.PointLight(0xffd090, 6, 20);
    rim2.position.set(5, -4, -4);
    scene.add(rim2);

    const fill = new THREE.PointLight(0xc9780a, 5, 22);
    fill.position.set(5, -8, 4);
    scene.add(fill);

    const topGold = new THREE.PointLight(0xc9a84c, 4, 18);
    topGold.position.set(0, 9, 4);
    scene.add(topGold);

    const spot = new THREE.SpotLight(0xffffff, 16, 40, Math.PI / 9, 0.4, 1.2);
    spot.position.set(0, 3, 14);
    spot.target.position.set(0, 0, 0);
    scene.add(spot, spot.target);

    /* ── Coin geometry — 64 segments (was 128) = 2× faster on GPU ── */
    const coinGeo = new THREE.CylinderGeometry(0.78, 0.74, 0.22, 64, 3, false);

    /* ── Materials ── */
    const edgeMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#7A5010"),
      metalness: 1.0,
      roughness: 0.06,
      envMapIntensity: 2.5,
    });

    /* ── Create 6 coins ── */
    const coinGroup = new THREE.Group();
    scene.add(coinGroup);

    const coinData = COIN_LABELS.map((label, i) => {
      const faceTex = makeFaceTexture(label);
      const backTex = makeBackTexture(label); // per-coin back texture with label

      const faceMat = new THREE.MeshStandardMaterial({
        map: faceTex,
        metalness: 0.98,
        roughness: 0.03,
        envMapIntensity: 2.2,
      });
      const backMat = new THREE.MeshStandardMaterial({
        map: backTex,
        metalness: 0.98,
        roughness: 0.03,
        envMapIntensity: 2.2,
      });

      // CylinderGeometry: [edge(0), face/top(1), back/bottom(2)]
      const mesh = new THREE.Mesh(coinGeo, [edgeMat, faceMat, backMat]);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      coinGroup.add(mesh);

      return {
        mesh,
        baseAngle: (i / 6) * Math.PI * 2,
        idx: i,
      };
    });

    /* ── Shadow plane ── */
    const shadowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(20, 20),
      new THREE.ShadowMaterial({ opacity: 0.35 }),
    );
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -2.5;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    /* ── Particles — 180 (was 500) for 3× less GPU fill ── */
    const pCount = 180;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 18;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 26;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xc9a84c,
      size: 0.028,
      transparent: true,
      opacity: 0.4,
    });
    scene.add(new THREE.Points(pGeo, pMat));

    /* ── ScrollTrigger pin — scrub: 2.2, anticipatePin: 1 ── */
    const st = ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: "top top",
      end: "+=240%", // more scroll = more cinematic
      pin: true,
      anticipatePin: 1, // prevents jump on pin engage
      scrub: 2.2, // smooth cinematic lag
      onUpdate: (self) => {
        scrollProgressRef.current = self.progress;
      },
    });

    /* ── Orbit constants ── */
    const ORBIT_R = 3.2;
    const ORBIT_TILT = 0.3;
    const ORBIT_Z = 1.1;

    /* ── Render loop ── */
    let animId;

    function animate() {
      animId = requestAnimationFrame(animate);
      renderer.info.reset();

      const progress = scrollProgressRef.current;

      /** phase boundaries **/
      const ORBIT_END = 0.72; // orbit phase ends here
      const PHASE2_END = 0.88; // scatter ends here
      const PHASE3_END = 1.0; // stack complete

      // ─── Phase progress values ───
      const orbitT = clamp01(progress / ORBIT_END); // 0→1 during orbit
      const phase2T = clamp01(
        (progress - ORBIT_END) / (PHASE2_END - ORBIT_END),
      );
      const phase3T = clamp01(
        (progress - PHASE2_END) / (PHASE3_END - PHASE2_END),
      );

      const eOrbit = smoothstep(orbitT);
      const ePhase2 = smoothstep(phase2T);
      const ePhase3 = smoothstep(phase3T);

      // ─── Camera: very subtle breathing (no time-based coin movement) ───
      // Use a slow clock just for camera float, NOT for coins
      camera.position.z = 8 + ePhase2 * 1.8;
      camera.lookAt(0, 0, 0);

      coinData.forEach((cd, i) => {
        // ── ORBIT POSITION — purely scroll-driven ──
        // Coins complete ~1.5 full revolutions as orbitT goes 0→1
        const θ = cd.baseAngle + eOrbit * Math.PI * 3.0;

        const orbitX = Math.cos(θ) * ORBIT_R;
        const orbitY = Math.sin(θ) * ORBIT_R * ORBIT_TILT;
        const orbitZ = Math.sin(θ) * ORBIT_Z;

        // Self-spin: 3 full rotations tied to scroll
        const selfSpinY = eOrbit * Math.PI * 6.0;

        if (progress <= ORBIT_END) {
          // ── Phase 1: Pure orbit ──
          cd.mesh.position.set(orbitX, orbitY, orbitZ);
          cd.mesh.rotation.y = selfSpinY;
          cd.mesh.rotation.z = -θ * 0.4;
          cd.mesh.scale.setScalar(1);
          cd.mesh.material.forEach((m) => {
            m.transparent = false;
            m.opacity = 1;
          });
        } else if (progress <= PHASE2_END) {
          // ── Phase 2: Fly from orbit → scatter cluster ──
          const sc = SCATTER_TARGETS[i];
          cd.mesh.position.x = orbitX + (sc.x - orbitX) * ePhase2;
          cd.mesh.position.y = orbitY + (sc.y - orbitY) * ePhase2;
          cd.mesh.position.z = orbitZ + (sc.z - orbitZ) * ePhase2;
          cd.mesh.rotation.y = selfSpinY + ePhase2 * Math.PI * 2; // spin up as flying
          cd.mesh.rotation.z = -θ * 0.4 * (1 - ePhase2);
          cd.mesh.scale.setScalar(1);
          cd.mesh.material.forEach((m) => {
            m.transparent = false;
            m.opacity = 1;
          });
        } else {
          // ── Phase 3: Settle into stacked grid ──
          const sc = SCATTER_TARGETS[i];
          const sp = STACK_POSITIONS[i];
          cd.mesh.position.x = sc.x + (sp[0] - sc.x) * ePhase3;
          cd.mesh.position.y = sc.y + (sp[1] - sc.y) * ePhase3;
          cd.mesh.position.z = sc.z + (sp[2] - sc.z) * ePhase3;

          // Slow rotation to rest, tilt face-up
          cd.mesh.rotation.y = selfSpinY + Math.PI * 2 * (1 - ePhase3 * 0.8);
          cd.mesh.rotation.x = -ePhase3 * 0.3; // lay slightly face-up
          cd.mesh.rotation.z = 0;
          cd.mesh.scale.setScalar(1 - ePhase3 * 0.15); // 85% at final

          // Stacked coins fade slightly (receding into scene)
          const op = 1 - ePhase3 * 0.3;
          cd.mesh.material.forEach((m) => {
            m.transparent = true;
            m.opacity = op;
          });
        }
      });

      // ─── Particle drift ───
      const posArr = pGeo.attributes.position.array;
      for (let i = 0; i < pCount; i++) {
        posArr[i * 3 + 1] += 0.0003;
        if (posArr[i * 3 + 1] > 13) posArr[i * 3 + 1] = -13;
      }
      pGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    } // <-- closing brace for animate()

    // Start render loop
    function startLoop() {
      animId = requestAnimationFrame(animate);
    }
    startLoop();

    /* ── Resize ── */
    function onResize() {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener("resize", onResize);

    /* ── Cleanup ── */
    rafCleanup = () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      st.kill();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      pmrem.dispose();
      envTexture.dispose();
      renderer.dispose();
      coinGeo.dispose();
      pGeo.dispose();
    };
    }, 0); // end setTimeout

    return () => {
      clearTimeout(timerId);
      rafCleanup?.();
    };
  }, []);

  return (
    <div ref={wrapperRef} className={styles.heroWrapper}>
      {/* Background image with vignette */}
      <div className={styles.bgLayer} />

      {/* Cinematic noise grain */}
      <div className={styles.noiseOverlay} aria-hidden="true" />

      {/* Three.js canvas container — React NEVER touches the actual canvas */}
      <div
        ref={canvasContainerRef}
        className={styles.canvasWrap}
        style={{ opacity: canvasReady ? 1 : 0 }}
      />

      {/* Center text */}
      <div className={styles.centerText}>
        <div className={styles.eyebrowPill}>
          <span className={styles.eyebrowDot} />
          <span className={styles.eyebrowText}>Revenue Engineering Firm</span>
        </div>

        <h1 className={styles.headline}>
          Still Burning Money on Ads?
          <br />
          We Build{" "}
          <span
            style={{
              display: "inline-block",
              color: "#D4B860",
              textShadow:
                "0 0 40px rgba(212,184,96,0.6), 0 0 12px rgba(201,168,76,0.4)",
              transition: "opacity 0.4s ease, transform 0.4s ease",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(10px)",
              minWidth: "12ch",
            }}
          >
            {ROTATING_WORDS[wordIdx]}
          </span>
          <br />
          for Businesses Across India.
        </h1>

        <p className={styles.subtitle}>
          We build high-end growth systems for enterprises — Advanced SEO,
          Performance Marketing, and Data-Driven Revenue Architecture.
        </p>

        <div className={styles.ctaRow}>
          <Link href="/services" className={styles.ctaPrimary}>
            Explore Systems
            <ArrowRight size={16} />
          </Link>
          <Link href="/contact" className={styles.ctaSecondary}>
            Get Free Audit
          </Link>
        </div>
      </div>

      {/* Scroll cue */}
      <div className={styles.scrollCue}>
        <span className={styles.scrollLabel}>SCROLL</span>
        <div className={styles.scrollLine} />
      </div>

      {/* Anchor for next section — coins "land" here */}
      <div
        id="next-section-anchor"
        style={{ position: "absolute", bottom: 0, left: 0 }}
      />
    </div>
  );
}
