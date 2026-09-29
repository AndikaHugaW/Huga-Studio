"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { CountUp } from "@/components/ui/CountUp";
import { projectShimmerBlur } from "@/lib/image-placeholder";

export default function AboutSection() {
  const containerRef = useRef(null);
  const gridRef = useRef(null);

  // Scroll tracking specifically for the image grid section
  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ["start 95%", "start 40%"]
  });

  // Smooth spring configuration to make reveal feel premium
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 65,
    damping: 26,
    restDelta: 0.001
  });

  // Calculate distinct scroll-driven reveal thresholds for each column
  // Reveal order: Image 4 (trip10) -> Image 3 (ficio) -> Image 2 (aurel) -> Image 1 (fitness)
  
  // COLUMN 4 (trip10) - Custom 0 (starts immediately as scroll enters)
  const h4 = useTransform(smoothProgress, [0, 0.35], ["0px", "280px"]);
  const opacity4 = useTransform(smoothProgress, [0, 0.35], [0, 1]);

  // COLUMN 3 (ficio) - Custom 1
  const h3 = useTransform(smoothProgress, [0.15, 0.55], ["0px", "380px"]);
  const opacity3 = useTransform(smoothProgress, [0.15, 0.55], [0, 1]);

  // COLUMN 2 (aurel) - Custom 2
  const h2 = useTransform(smoothProgress, [0.3, 0.75], ["0px", "500px"]);
  const opacity2 = useTransform(smoothProgress, [0.3, 0.75], [0, 1]);

  // COLUMN 1 (runners) - Custom 3
  const h1 = useTransform(smoothProgress, [0.45, 0.95], ["0px", "620px"]);
  const opacity1 = useTransform(smoothProgress, [0.45, 0.95], [0, 1]);

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative py-24 md:py-32 bg-white text-neutral-900 font-nippo overflow-hidden"
    >
      <div className="relative z-10 max-w-[1800px] mx-auto px-6 md:px-12 lg:px-24">
        
        {/* ══════════════════════════════════════════════
            HEADER SECTION (SPLIT LAYOUT)
            ══════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-24">
          {/* Left: About label */}
          <div className="md:col-span-4">
            <span className="text-[11px] font-bold tracking-[0.2em] text-neutral-900 uppercase">
              ABOUT
            </span>
          </div>

          {/* Right: Description text + Statistics Row nested */}
          <div className="md:col-span-8">
            <p className="text-lg md:text-[22px] font-light leading-[1.5] text-neutral-950 max-w-[800px] tracking-tight">
              Hi, I&apos;m Huga, a freelance developer and designer with a passion for clean UI, user-centric thinking, and thoughtful engineering. With over 4 years of experience, I help startups and businesses turn ideas into meaningful visual stories—whether that&apos;s a digital product or a timeless brand identity.
            </p>

            {/* ══════════════════════════════════════════════
                STATISTICS ROW (nested inside the right column)
                ══════════════════════════════════════════════ */}
            <div className="grid grid-cols-3 gap-6 md:gap-8 border-t border-neutral-100 pt-16 mt-16">
              {/* Stat 1 */}
              <div className="flex flex-col gap-3">
                <div className="flex items-start">
                  <span className="text-[56px] md:text-[68px] font-light leading-none tracking-tighter text-neutral-950 select-none">
                    <CountUp>4</CountUp>
                  </span>
                  <span className="text-xl font-light text-neutral-950 mt-1 select-none">+</span>
                </div>
                <span className="text-[9px] md:text-[10px] font-bold tracking-[0.15em] text-neutral-400 uppercase leading-relaxed">
                  YEARS OF EXPERIENCE
                </span>
              </div>

              {/* Stat 2 */}
              <div className="flex flex-col gap-3">
                <div className="flex items-start">
                  <span className="text-[56px] md:text-[68px] font-light leading-none tracking-tighter text-neutral-950 select-none">
                    <CountUp>40</CountUp>
                  </span>
                  <span className="text-xl font-light text-neutral-950 mt-1 select-none">+</span>
                </div>
                <span className="text-[9px] md:text-[10px] font-bold tracking-[0.15em] text-neutral-400 uppercase leading-relaxed">
                  PROJECTS COMPLETED
                </span>
              </div>

              {/* Stat 3 */}
              <div className="flex flex-col gap-3">
                <div className="flex items-start">
                  <span className="text-[56px] md:text-[68px] font-light leading-none tracking-tighter text-neutral-950 select-none">
                    <CountUp>95</CountUp>
                  </span>
                  <span className="text-xl font-light text-neutral-950 mt-1 select-none">%</span>
                </div>
                <span className="text-[9px] md:text-[10px] font-bold tracking-[0.15em] text-neutral-400 uppercase leading-relaxed">
                  REPEAT CLIENTS
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            STAGGERED IMAGE GRID (SCROLL-DRIVEN REVEAL)
            ══════════════════════════════════════════════ */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 items-end"
        >
          
          {/* COLUMN 1: Mobile Developer (Tallest) */}
          <div className="flex flex-col gap-4 w-full">
            <motion.div
              style={{ height: h1, opacity: opacity1 }}
              className="relative w-full overflow-hidden bg-neutral-100 shadow-sm group"
            >
              <Image
                src="/images/projects/hypebeast-app-v2.webp"
                alt="Mobile Developer project"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 25vw"
                quality={85}
                placeholder="blur"
                blurDataURL={projectShimmerBlur}
              />
            </motion.div>
            <motion.div 
              style={{ opacity: opacity1 }}
              className="flex flex-col font-nippo select-none"
            >
              <span className="text-[10px] font-bold tracking-[0.15em] text-neutral-400">01 / SERVICE</span>
              <span className="text-sm font-medium text-neutral-900 tracking-tight mt-0.5">Mobile Developer</span>
            </motion.div>
          </div>

          {/* COLUMN 2: Website Developer (Medium-tall) */}
          <div className="flex flex-col gap-4 w-full">
            <motion.div
              style={{ height: h2, opacity: opacity2 }}
              className="relative w-full overflow-hidden bg-neutral-100 shadow-sm group"
            >
              <Image
                src="/images/projects/hypebeast-web-v2.webp"
                alt="Website Developer project"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 25vw"
                quality={85}
                placeholder="blur"
                blurDataURL={projectShimmerBlur}
              />
            </motion.div>
            <motion.div 
              style={{ opacity: opacity2 }}
              className="flex flex-col font-nippo select-none"
            >
              <span className="text-[10px] font-bold tracking-[0.15em] text-neutral-400">02 / SERVICE</span>
              <span className="text-sm font-medium text-neutral-900 tracking-tight mt-0.5">Website Developer</span>
            </motion.div>
          </div>

          {/* COLUMN 3: Ui UX Design (Medium-short) */}
          <div className="flex flex-col gap-4 w-full">
            <motion.div
              style={{ height: h3, opacity: opacity3 }}
              className="relative w-full overflow-hidden bg-neutral-100 shadow-sm group"
            >
              <Image
                src="/images/projects/luxe-cafe-app.webp"
                alt="Ui UX Design project"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 25vw"
                quality={85}
                placeholder="blur"
                blurDataURL={projectShimmerBlur}
              />
            </motion.div>
            <motion.div 
              style={{ opacity: opacity3 }}
              className="flex flex-col font-nippo select-none"
            >
              <span className="text-[10px] font-bold tracking-[0.15em] text-neutral-400">03 / SERVICE</span>
              <span className="text-sm font-medium text-neutral-900 tracking-tight mt-0.5">Ui UX Design</span>
            </motion.div>
          </div>

          {/* COLUMN 4: Logo Design (Shortest) */}
          <div className="flex flex-col gap-4 w-full">
            <motion.div
              style={{ height: h4, opacity: opacity4 }}
              className="relative w-full overflow-hidden bg-neutral-100 shadow-sm group"
            >
              <Image
                src="/images/projects/vivet-v2.webp"
                alt="Logo Design project"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 25vw"
                quality={85}
                placeholder="blur"
                blurDataURL={projectShimmerBlur}
              />
            </motion.div>
            <motion.div 
              style={{ opacity: opacity4 }}
              className="flex flex-col font-nippo select-none"
            >
              <span className="text-[10px] font-bold tracking-[0.15em] text-neutral-400">04 / SERVICE</span>
              <span className="text-sm font-medium text-neutral-900 tracking-tight mt-0.5">Logo Design</span>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}