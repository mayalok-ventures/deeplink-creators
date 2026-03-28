"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import MaskRevealImage from "@/components/MaskRevealImage";

const HeroSection = dynamic(() => import("@/components/HeroSection"), {
  ssr: false,
});
import TextRevealOnScroll from "@/components/TextRevealOnScroll";
import ServiceStack from "@/components/ServiceStack";
import TechStack from "@/components/TechStack";
import TestimonialSection from "@/components/TestimonialSection";
import FAQSection from "@/components/FAQSection";
import SpotSection from "@/components/SpotSection";
import CounterAnimation from "@/components/CounterAnimation";
import {
  ArrowRight,
  Target,
  BarChart3,
  Users,
  CheckCircle2,
  XCircle,
  Search,
  FileBarChart,
  Presentation,
  Brain,
  Zap,
  TrendingUp,
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

const ease = [0.22, 1, 0.36, 1] as const;

export default function HomePage() {
  const processRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: processScroll } = useScroll({
    target: processRef,
    offset: ["start end", "end start"],
  });
  const processLineHeight = useTransform(
    processScroll,
    [0.1, 0.8],
    ["0%", "100%"],
  );

  return (
    <>
      <HeroSection />
      <SpotSection />

      {/* ═══════════════ TEXT REVEAL + IMAGE SECTION ═══════════════ */}
      <section
        data-anim="img"
        className="py-20 md:py-32 bg-white overflow-hidden"
      >
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text that reveals word-by-word on scroll */}
            <div>
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                whileInView={{ opacity: 1, width: "3rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease }}
                className="block h-[2px] bg-[#C39A2B] mb-8"
              />
              <TextRevealOnScroll
                text="Most agencies sell you vanity metrics. We engineer revenue systems that turn every marketing dollar into measurable pipeline growth."
                className="mb-8"
              />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2, ease }}
                className="text-paragraph text-lg"
              >
                We only measure what matters:{" "}
                <span className="font-semibold text-[#C39A2B]">
                  leads, sales, and ROI
                </span>
                .
              </motion.p>
            </div>

            {/* Mask reveal image */}
            <MaskRevealImage
              src="/images/Revenue Architecture Office.jpeg"
              alt="Revenue Architecture Office"
              className="h-[50vh] md:h-[65vh]"
              direction="left"
            />
          </div>
        </div>
      </section>

      {/* ═══════════════ AGITATION CARDS ═══════════════ */}
      <section
        data-anim="section-glow"
        className="section-padding bg-[#FAFAF8] overflow-hidden"
      >
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <h2
              data-anim="heading"
              className="text-2xl md:text-4xl font-extrabold text-heading mb-6"
            >
              Are You Getting{" "}
              <span className="text-red-400">Vanity Metrics</span> Instead of{" "}
              <span className="text-[#C39A2B]">Real Revenue</span>?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 - slides from left */}
            <motion.div
              data-anim="card"
              initial={{ opacity: 0, x: -60, rotateY: 8 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease }}
              className="bg-white rounded-2xl border border-[#E8E6E1] shadow-sm p-8 transform-gpu"
            >
              <div className="text-red-400 mb-5">
                <Users size={36} />
              </div>
              <h3 className="font-bold text-xl mb-4 text-heading">
                What Others Give You
              </h3>
              <ul className="text-paragraph space-y-3">
                {[
                  "Likes & Followers",
                  "Empty Website Traffic",
                  "Beautiful Reports",
                  "Monthly Retainer Bills",
                ].map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease }}
                    className="flex items-center gap-3"
                  >
                    <span className="text-red-400 inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-500/10 text-xs font-bold flex-shrink-0">
                      ✗
                    </span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Card 2 - RECOMMENDED - rises from below with scale */}
            <motion.div
              data-anim="card"
              initial={{ opacity: 0, y: 80, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.15, ease }}
              className="bg-white rounded-2xl border-2 border-[#C39A2B] shadow-xl p-8 relative transform-gpu md:-mt-4"
            >
              <motion.div
                initial={{ opacity: 0, y: -15, scale: 0.7 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.6,
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                }}
                className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#B87A14] to-[#E0C27A] text-white text-xs font-bold px-5 py-1.5 rounded-full shadow-lg tracking-wider"
              >
                ★ RECOMMENDED
              </motion.div>

              <div className="text-[#C39A2B] mb-5">
                <Target size={36} />
              </div>
              <h3 className="font-bold text-xl mb-4 text-heading">
                What We Deliver
              </h3>
              <ul className="text-paragraph space-y-3">
                {[
                  "Qualified Leads",
                  "Actual Customers",
                  "Revenue Growth",
                  "Clear ROI Proof",
                ].map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.1, ease }}
                    className="flex items-center gap-3"
                  >
                    <span className="text-[#C39A2B] inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#C39A2B]/10 text-xs font-bold flex-shrink-0">
                      ✓
                    </span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Card 3 - slides from right */}
            <motion.div
              data-anim="card"
              initial={{ opacity: 0, x: 60, rotateY: -8 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.3, ease }}
              className="bg-white rounded-2xl border border-[#E8E6E1] shadow-sm p-8 transform-gpu"
            >
              <div className="text-[#C39A2B] mb-5">
                <BarChart3 size={36} />
              </div>
              <h3 className="font-bold text-xl mb-4 text-heading">
                The Difference
              </h3>
              <p className="text-paragraph leading-relaxed">
                We don&apos;t just run Google Ads or Facebook Ads. As NCR&apos;s
                premier Revenue Engineering firm, we build complete{" "}
                <span className="font-semibold text-heading">
                  Revenue Machines
                </span>{" "}
                — enterprise SEO, PPC, and lead generation systems that bring
                you customers 24/7.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ FULL-WIDTH IMAGE BREAK ═══════════════ */}
      <section data-anim="img" className="py-4 bg-white overflow-hidden">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <MaskRevealImage
            src="images/data-drive-maarketing-strategy.jpg"
            alt="Data-Driven Marketing Strategy"
            className="w-full h-[40vh] md:h-[60vh]"
            direction="right"
          />
        </div>
      </section>

      <ServiceStack />
      <TechStack />

      {/* ═══════════════ REVENUE ARCHITECTURE PROCESS (SCROLL-DRIVEN TIMELINE) ═══════════════ */}
      <section className="section-padding bg-white overflow-hidden">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="text-center mb-20"
          >
            <h2
              data-anim="heading"
              className="text-3xl md:text-4xl font-extrabold font-heading text-heading mb-4"
            >
              How We Build{" "}
              <span className="text-gradient">Revenue Architectures</span>
            </h2>
            <p className="text-lg text-paragraph max-w-3xl mx-auto">
              A 3-phase system engineered to transform your business from
              &quot;running campaigns&quot; to &quot;operating a revenue
              machine.&quot;
            </p>
          </motion.div>

          <div ref={processRef} className="relative max-w-5xl mx-auto">
            {/* Animated vertical line */}
            <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-[#E8E6E1]">
              <motion.div
                className="absolute top-0 left-0 right-0 bg-gradient-to-b from-[#C39A2B] to-[#D4AC55] origin-top"
                style={{ height: processLineHeight }}
              />
            </div>

            <div className="space-y-16 lg:space-y-24">
              {[
                {
                  step: "01",
                  title: "Revenue Forensics",
                  subtitle: "Week 1–2",
                  description:
                    "We dissect your current acquisition funnel — every traffic source, every conversion point, every revenue leak. No guesswork. We map the exact points where you're hemorrhaging pipeline.",
                  icon: <Brain size={28} />,
                  image:
                    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
                  side: "left" as const,
                },
                {
                  step: "02",
                  title: "Architecture Deployment",
                  subtitle: "Week 3–6",
                  description:
                    "We engineer your custom revenue architecture — SEO infrastructure, paid media systems, conversion assets, and tracking frameworks. Every component is built to generate measurable pipeline.",
                  icon: <Zap size={28} />,
                  image:
                    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop",
                  side: "right" as const,
                },
                {
                  step: "03",
                  title: "Compound Scaling",
                  subtitle: "Month 2+",
                  description:
                    "Once the architecture is validated, we activate compound scaling — doubling down on what works, eliminating what doesn't, and systematically increasing your customer acquisition velocity.",
                  icon: <TrendingUp size={28} />,
                  image:
                    "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=800&auto=format&fit=crop",
                  side: "left" as const,
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${step.side === "right" ? "lg:flex-row-reverse" : ""}`}
                >
                  {/* Content card */}
                  <motion.div
                    initial={{ opacity: 0, x: step.side === "left" ? -60 : 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease }}
                    className="flex-1 transform-gpu"
                  >
                    <div className="bg-white rounded-2xl border border-[#E8E6E1] shadow-sm p-8 relative">
                      <div className="text-6xl font-extrabold text-[#C39A2B]/8 absolute top-4 right-6 font-heading">
                        {step.step}
                      </div>
                      <div className="w-14 h-14 bg-[#C39A2B]/10 rounded-xl flex items-center justify-center mb-6 text-[#C39A2B]">
                        {step.icon}
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest text-[#C39A2B] mb-2 block">
                        {step.subtitle}
                      </span>
                      <h3 className="text-2xl font-heading font-bold text-heading mb-3">
                        {step.title}
                      </h3>
                      <p className="text-paragraph leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>

                  {/* Center dot on timeline */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: 0.2,
                      type: "spring",
                      stiffness: 200,
                    }}
                    className="hidden lg:flex w-12 h-12 rounded-full bg-white border-2 border-[#C39A2B] items-center justify-center z-10 flex-shrink-0 shadow-md"
                  >
                    <span className="text-sm font-extrabold text-[#C39A2B]">
                      {step.step}
                    </span>
                  </motion.div>

                  {/* Image */}
                  <div className="flex-1">
                    <MaskRevealImage
                      src={step.image}
                      alt={step.title}
                      className="h-[280px] md:h-[320px]"
                      direction={step.side === "left" ? "right" : "left"}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ STATS COUNTER SECTION ═══════════════ */}
      <section className="py-20 bg-[#0F1112] overflow-hidden relative">
        {/* Background texture */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(195,154,43,0.06)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(195,154,43,0.04)_0%,transparent_50%)]" />

        <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              {
                value: 320,
                suffix: "%",
                label: "Average Revenue Lift",
                prefix: "",
              },
              {
                value: 68,
                suffix: "%",
                label: "Lower Cost Per Lead",
                prefix: "",
              },
              {
                value: 150,
                suffix: "+",
                label: "Enterprises Served",
                prefix: "",
              },
              {
                value: 24,
                suffix: "/7",
                label: "Revenue Systems Active",
                prefix: "",
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12, ease }}
                className="text-center transform-gpu"
              >
                <p className="text-4xl md:text-5xl font-extrabold font-heading text-white mb-2">
                  <CounterAnimation
                    target={stat.value}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                    duration={2500}
                  />
                </p>
                <p className="text-sm text-white/40 font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ WHO WE WORK WITH ═══════════════ */}
      <section className="section-padding bg-[#FAFAF8] overflow-hidden">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-heading mb-4">
              We Are <span className="text-[#C39A2B]">Not</span> For Everyone.
            </h2>
            <p className="text-lg text-paragraph max-w-2xl mx-auto">
              We act as an outsourced Growth Partner. We only take on clients
              when we are 100% certain we can scale their net profit.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* WHO THIS IS FOR - slides in from left */}
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease }}
              className="bg-white rounded-2xl border border-[#C39A2B]/20 shadow-sm p-8 transform-gpu hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#C39A2B]/10 rounded-xl flex items-center justify-center">
                  <CheckCircle2 size={24} className="text-[#C39A2B]" />
                </div>
                <h3 className="text-xl font-bold font-heading text-heading">
                  Who This IS For
                </h3>
              </div>
              <ul className="space-y-5">
                {[
                  {
                    title: "Established Enterprises & Manufacturers",
                    desc: "You have a proven product but are losing digital market share to newer competitors.",
                  },
                  {
                    title: "High-Ticket Real Estate & EdTech",
                    desc: "A single customer brings you massive lifetime value, and you need a system to generate them predictably.",
                  },
                  {
                    title: "Aggressive Scalers",
                    desc: "You have the operational capacity to handle a 3X surge in leads and the budget to fuel real growth.",
                  },
                ].map((item, i) => (
                  <motion.li
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.12, ease }}
                    className="flex gap-3"
                  >
                    <span className="text-[#C39A2B] inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#C39A2B]/10 text-xs font-bold flex-shrink-0 mt-0.5">
                      ✓
                    </span>
                    <div>
                      <p className="font-semibold text-heading text-sm">
                        {item.title}
                      </p>
                      <p className="text-paragraph text-sm mt-1">{item.desc}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* WHO THIS IS NOT FOR - slides in from right */}
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.15, ease }}
              className="bg-white rounded-2xl border border-[#E8E6E1] shadow-sm p-8 transform-gpu hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center">
                  <XCircle size={24} className="text-red-400" />
                </div>
                <h3 className="text-xl font-bold font-heading text-heading">
                  Who This Is NOT For
                </h3>
              </div>
              <ul className="space-y-5">
                {[
                  {
                    title: "Early-Stage Startups",
                    desc: 'Looking for "cheap brand awareness" or viral social media posts.',
                  },
                  {
                    title: "Indecisive Operators",
                    desc: "You want guarantees without giving us the control to fix your broken sales funnels.",
                  },
                  {
                    title: "Budget-Shoppers",
                    desc: "You are looking for a ₹15,000/month agency to manage your Facebook page.",
                  },
                ].map((item, i) => (
                  <motion.li
                    key={item.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.12, ease }}
                    className="flex gap-3"
                  >
                    <span className="text-red-400 inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-500/10 text-xs font-bold flex-shrink-0 mt-0.5">
                      ✗
                    </span>
                    <div>
                      <p className="font-semibold text-heading text-sm">
                        {item.title}
                      </p>
                      <p className="text-paragraph text-sm mt-1">{item.desc}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ IMAGE BREAK BEFORE TESTIMONIALS ═══════════════ */}
      <section data-anim="img" className="py-4 bg-[#FAFAF8] overflow-hidden">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MaskRevealImage
              src="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1000&auto=format&fit=crop"
              alt="Strategic Planning"
              className="h-[35vh] md:h-[45vh]"
              direction="up"
            />
            <MaskRevealImage
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000&auto=format&fit=crop"
              alt="Team Collaboration"
              className="h-[35vh] md:h-[45vh]"
              direction="right"
            />
          </div>
        </div>
      </section>

      <TestimonialSection />

      <FAQSection
        title="Got Questions? Here Are Honest Answers."
        subtitle="We don't hide behind jargon. Here's what serious business owners ask us before they sign."
        faqs={[
          {
            question:
              "How is Deeplink Creators different from other digital marketing agencies in NCR?",
            answer:
              'We are not a traditional agency; we are a Revenue Engineering firm. While other agencies sell you "likes, shares, and brand awareness," we strictly focus on your P&L. If a marketing campaign doesn\'t directly decrease your Cost Per Acquisition (CPA) or increase your Net Profit, we shut it down. We use Data Science and Neuro-Marketing to build predictable sales systems.',
          },
          {
            question: "Do you guarantee results or a specific ROI?",
            answer:
              "We guarantee absolute mathematical transparency. In B2B and High-Ticket sales, anyone promising a fixed overnight ROI is lying to you. We guarantee that your ad spend will be tracked to the last rupee, your vanity metrics will be ignored, and every campaign will be ruthlessly optimized to scale your revenue.",
          },
          {
            question:
              "We have burned money on digital marketing before. Why should we trust you?",
            answer:
              "Because we don't operate on guesswork. We start with a brutal ROI Audit of your current systems to show you exactly where your money is leaking (leaky funnels, bad tracking, weak positioning). We fix the foundation before asking you to scale your ad budget.",
          },
          {
            question: "Do you work with all types of businesses?",
            answer:
              'No. We are highly selective. We exclusively partner with high-ticket businesses (Manufacturers, Real Estate Developers, EdTech, and Enterprise SaaS) who have the capacity to scale and are serious about dominating their market. We do not work with early-stage startups looking for "cheap branding."',
          },
          {
            question: "What does your pricing structure look like?",
            answer:
              "Our pricing is structured for serious operators. We do not offer generic ₹15,000/month packages. We operate on a combination of strategic retainers and performance-driven scaling models. Book a Discovery Call, and we will build a custom financial model for your growth.",
          },
        ]}
      />

      {/* ═══════════════ ROI AUDIT ROADMAP ═══════════════ */}
      <section className="section-padding bg-white overflow-hidden">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="text-center mb-16"
          >
            <h2
              data-anim="heading"
              className="text-3xl md:text-4xl font-extrabold font-heading text-heading mb-4"
            >
              What Happens When You{" "}
              <span className="text-[#C39A2B]">Claim Your Audit</span>?
            </h2>
            <p className="text-lg text-paragraph max-w-2xl mx-auto">
              No spam calls. No generic PDF. Here&apos;s exactly what happens
              next.
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <div className="hidden md:block absolute top-0 bottom-0 left-[calc(2rem+1px)] w-[2px] bg-[#E8E6E1]" />

            <div className="space-y-10 md:space-y-12">
              {[
                {
                  step: "01",
                  icon: <Search size={24} />,
                  title: "The Discovery Diagnostic",
                  time: "15 Minutes",
                  desc: "We get on a brief, no-BS call to understand your current CAC (Customer Acquisition Cost) and revenue leaks. No sales pitch — just questions.",
                },
                {
                  step: "02",
                  icon: <FileBarChart size={24} />,
                  title: "The Data Teardown",
                  time: "48 Hours",
                  desc: "Our team analyzes your current ad accounts, SEO positioning, and competitor strategies. We find exactly where your money is leaking.",
                },
                {
                  step: "03",
                  icon: <Presentation size={24} />,
                  title: "The Revenue Blueprint",
                  time: "In-Person / Zoom",
                  desc: "We present a mathematical roadmap showing exactly how we will scale your ARR. If you like it, we partner up. If not, the blueprint is yours to keep.",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: -40, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.15, ease }}
                  className="flex gap-6 md:gap-8 transform-gpu"
                >
                  <div className="flex flex-col items-center flex-shrink-0">
                    <motion.div
                      initial={{ scale: 0, rotate: -90 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: 0.2 + index * 0.15,
                        type: "spring",
                        stiffness: 200,
                      }}
                      className="w-16 h-16 bg-[#C39A2B]/10 border border-[#C39A2B]/20 rounded-2xl flex items-center justify-center text-[#C39A2B] relative z-10"
                    >
                      {item.icon}
                    </motion.div>
                  </div>
                  <div className="bg-white rounded-xl border border-[#E8E6E1] shadow-sm p-6 flex-1 hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-bold uppercase tracking-widest text-[#C39A2B]">
                        Step {item.step}
                      </span>
                      <span className="text-xs text-paragraph bg-[#C39A2B]/10 px-2.5 py-0.5 rounded-full">
                        {item.time}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold font-heading text-heading mb-2">
                      {item.title}
                    </h3>
                    <p className="text-paragraph text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ FINAL CTA ═══════════════ */}
      <section
        data-anim="section-glow"
        className="relative py-24 lg:py-32 bg-[#0F1112] text-white overflow-hidden"
      >
        {/* Subtle background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(195,154,43,0.08)_0%,transparent_60%)]" />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease }}
          className="container-custom px-4 sm:px-6 lg:px-8 text-center relative z-10 transform-gpu"
        >
          <div className="mx-auto max-w-3xl">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "8rem" }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease }}
              className="h-[1px] mx-auto bg-gradient-to-r from-transparent via-[#C39A2B] to-transparent mb-12"
            />
            <h2
              data-anim="heading"
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-heading mb-6 text-white leading-tight"
            >
              Ready to Turn Your Marketing into a{" "}
              <span className="text-gradient">Revenue Machine</span>?
            </h2>
            <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-white/50 leading-relaxed">
              Whether you need enterprise SEO services, performance marketing,
              or a complete digital marketing strategy — get your FREE ROI Audit
              and discover how to get more customers for less money.
            </p>
          </div>
          <motion.div
            data-anim="cta-pulse"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/contact"
              className="group relative bg-gradient-to-r from-[#B87A14] to-[#D4AC55] text-white font-bold py-4 px-9 rounded-full hover:shadow-2xl hover:shadow-[#C39A2B]/20 transition-all duration-300 inline-flex items-center justify-center gap-2 overflow-hidden"
            >
              <span className="relative z-10">Get FREE ROI Audit</span>
              <ArrowRight
                size={20}
                className="relative z-10 group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <Link
              href="/contact"
              className="bg-white/[0.08] border border-white/[0.15] text-white font-semibold py-4 px-9 rounded-full hover:bg-white/[0.15] transition-all duration-300"
            >
              Schedule a Call
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
