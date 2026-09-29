"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import TextReveal from "@/components/ui/TextReveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { GridBackground } from "@/components/ui/GridBackground";
import { projectShimmerBlur } from "@/lib/image-placeholder";

const featuredProjects = [
  {
    title: "Vivet Streetwear",
    category: "Branding",
    date: "14 May 2026",
    brand: "Vivet",
    image: "/images/projects/vivet-v2.webp",
    tags: ["Branding", "Streetwear", "Logo Design"],
  },
  {
    title: "Islamy Academy AI",
    category: "Artificial Intelligence",
    date: "15 Aug. 2025",
    brand: "Islamy Academy AI",
    image: "/images/projects/islamy-web.webp",
    tags: ["Next.js", "Scikit-learn", "Figma"],
  },
  {
    title: "Oxen Ai Platform",
    category: "AI SaaS",
    date: "14 May 2026",
    brand: "Oxen Ai",
    image: "/images/projects/oxen-ai.webp",
    tags: ["AI SaaS", "Machine Learning", "UX/UI Design"],
  },
  {
    title: "HYPEBEAST Website",
    category: "Website",
    date: "10 Aug. 2025",
    brand: "HYPEBEAST",
    image: "/images/projects/hypebeast-web-v2.webp",
    tags: ["Website", "E-commerce", "Figma"],
  },
  {
    title: "HYPEBEAST Design App",
    category: "UI/UX Design",
    date: "8 Aug. 2025",
    brand: "HYPEBEAST",
    image: "/images/projects/hypebeast-app-v2.webp",
    tags: ["UI/UX", "Figma", "Mobile App"],
  },
  {
    title: "Luxe Cafe App",
    category: "Mobile App",
    date: "5 Aug. 2025",
    brand: "Luxe Cafe",
    image: "/images/projects/luxe-cafe-app.webp",
    tags: ["Mobile App", "UI/UX", "Food Delivery"],
  },
];

export default function RecentProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide setiap 5 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredProjects.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentProject = featuredProjects[currentIndex];

  return (
    <section ref={ref} className="relative pt-32 pb-0 px-0 bg-white overflow-hidden">
      {/* Grid Background */}
      <GridBackground 
        className="opacity-40" 
        dotColor="rgba(0, 0, 0, 0.05)"
        size={20}
      />

      <div className="relative z-10 max-w-[1800px] mx-auto pb-32 px-6 md:px-12 lg:px-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16"
        >
          {/* Left: Title with Icon */}
          <div className="flex items-center gap-4 mb-6 md:mb-0">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={isInView ? { scale: 1, rotate: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
              className="text-blue-600 text-2xl font-bold"
            >
              *
            </motion.div>
            <TextReveal
              text="Recent Projects"
              variant="word"
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-black uppercase"
              delay={0.4}
            />
          </div>

          {/* Right: Explore Work Link */}
          <MagneticButton
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-lg transition-colors"
            magneticStrength={0.3}
          >
            <span className="font-normal font-nippo">Explore Work</span>
            <motion.svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </motion.svg>
          </MagneticButton>
        </motion.div>

        {/* Featured Project Card */}
        <div className="relative rounded-3xl overflow-hidden border border-gray-200 hover:border-blue-600/30 transition-all duration-500 min-h-[380px] sm:min-h-[480px] md:min-h-[600px] lg:min-h-[650px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 min-h-[380px] sm:min-h-[480px] md:min-h-[600px] lg:min-h-[650px]"
            >
              {/* Background Image */}
              <Image
                src={currentProject.image}
                alt={currentProject.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1800px"
                className="object-cover transition-transform duration-700 ease-out"
                quality={85}
                priority={currentIndex === 0}
                placeholder="blur"
                blurDataURL={projectShimmerBlur}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/5"></div>
              {/* Gradient for readability */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.3) 100%)",
                }}
              />
              {/* Content */}
              <div className="absolute inset-0 h-full min-h-[380px] sm:min-h-[480px] md:min-h-[600px] lg:min-h-[650px] p-6 sm:p-10 md:p-12 lg:p-16 flex flex-col justify-end z-10">
                {/* Project Details */}
                <motion.div
                  key={`details-${currentIndex}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 sm:gap-6 w-full"
                >
                  {/* Left: Tags */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    {currentProject.tags && currentProject.tags.map((tag, index) => (
                      <div key={index} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 rounded-full text-white text-[10px] sm:text-xs md:text-sm font-normal border border-white/30 font-nippo backdrop-blur-sm">
                        {tag}
                      </div>
                    ))}
                    <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 rounded-full text-white text-[10px] sm:text-xs md:text-sm font-normal border border-white/30 font-nippo backdrop-blur-sm">
                      {currentProject.date}
                    </div>
                  </div>

                  {/* Right: Brand */}
                  <div className="text-white text-lg sm:text-xl md:text-2xl font-normal font-nippo self-start md:self-auto drop-shadow-md">
                    {currentProject.brand}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

