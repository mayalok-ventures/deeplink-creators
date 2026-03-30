"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "./HeroSection.module.css";

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

export default function HeroSection() {
  const [wordIdx, setWordIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIdx((i) => (i + 1) % ROTATING_WORDS.length);
        setVisible(true);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleVideoEnd = useCallback(() => {
    setVideoEnded(true);
  }, []);

  return (
    <section className={styles.heroWrapper}>
      {/* Background video — auto-plays, replaced by image on end */}
      <div className={styles.bgLayer}>
        {!videoEnded && (
          <video
            ref={videoRef}
            className={styles.bgVideo}
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={handleVideoEnd}
          >
            <source src="/images/hero-video.mp4" type="video/mp4" />
          </video>
        )}
        {videoEnded && (
          <img
            src="/images/hero.png"
            alt=""
            className={styles.bgImage}
          />
        )}
      </div>

      {/* Cinematic noise grain */}
      <div className={styles.noiseOverlay} aria-hidden="true" />

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
    </section>
  );
}
