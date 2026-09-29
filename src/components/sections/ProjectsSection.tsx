"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import ProjectModal from "@/components/ui/ProjectModal";
import { type Project } from "@/constants/projects";
import { projectShimmerBlur } from "@/lib/image-placeholder";

const projects = [
  {
    id: 1,
    title: "Vivet",
    description: "Unapologetic streetwear brand that fuses urban grit with premium aesthetics.",
    tags: ["Branding", "Streetwear", "Logo Design"],
    image: "/images/projects/vivet-v2.webp",
    link: "#",
    featured: true,
    previewImages: [
      {
        src: "/images/projects/vivet-preview-1.webp",
        title: "Digital Ecosystem",
        description: "A seamless and premium shopping experience built across both web and mobile platforms.",
      },
      {
        src: "/images/projects/apparel.webp",
        title: "Signature Apparel",
        description: "Every piece is engineered for the streets, combining raw utilitarian aesthetics.",
      },
      {
        src: "/images/projects/label.webp",
        title: "The Flagship Experience",
        description: "A brutalist yet refined space designed to disrupt the traditional retail experience.",
      },
    ],
  },
  {
    id: 2,
    title: "Revive AI",
    description: "Smart health insights powered by AI. Personalized recommendations and early detection.",
    tags: ["API Integration", "Next.js", "Scikit-learn"],
    image: "/images/projects/revive-dasboard-min-v2.webp",
    link: "#",
    featured: false,
  },
  {
    id: 3,
    title: "Oxen AI Platform",
    description: "Next-gen SaaS platform engineered to democratize artificial intelligence.",
    tags: ["AI SaaS", "Machine Learning", "UX/UI Design"],
    image: "/images/projects/oxen-ai.webp",
    link: "#",
    featured: false,
    previewImages: [
      {
        src: "/images/projects/oxen-preview-1.webp",
        title: "Visual Identity & Branding",
        description: "Forging trust through design with striking geometric precision.",
      },
      {
        src: "/images/projects/oxen-preview-2.webp",
        title: "Intelligent Interface",
        description: "A command center built for clarity. Managing complex ML models effortlessly.",
      },
    ],
  },
  {
    id: 4,
    title: "HYPEBEAST App",
    description: "Streetwear discovery, reimagined. Swipe, save, and shop the latest drops.",
    tags: ["UX/UI Design", "Mobile Optimization", "Usability Testing"],
    image: "/images/projects/hypebeast-app-v2.webp",
    link: "#",
    featured: false,
  },
  {
    id: 5,
    title: "HYPEBEAST Website",
    description: "Premium e-commerce for hypebeasts with lightning-fast checkout experience.",
    tags: ["Full Stack", "Payment Gateway", "Database Design"],
    image: "/images/projects/hypebeast-web-v2.webp",
    link: "#",
    featured: false,
  },
  {
    id: 6,
    title: "Luxe Cafe App",
    description: "Your coffee, your way. Order ahead, skip the line, and earn rewards.",
    tags: ["Mobile App", "Payment Gateway", "Flutter", "Supabase", "Figma"],
    image: "/images/projects/luxe-cafe-app.webp",
    link: "#",
    featured: false,
  },
];

const featuredLayout = [
  {
    projectIndex: 0, // Vivet
    category: "Logo Design",
    date: "● SEPTEMBER 18, 2025",
    aspectRatio: "aspect-[1.5]",
    title: "Vivet Streetwear",
    subtitle: "Unapologetic streetwear brand fusing urban grit with premium aesthetics.",
  },
  {
    projectIndex: 5, // Luxe Cafe App
    category: "Ui UX Design",
    date: "● SEPTEMBER 18, 2025",
    aspectRatio: "aspect-square",
    title: "Luxe Cafe App",
    subtitle: "Clean ordering and rewards application for a premium cafe experience.",
  },
  {
    projectIndex: 3, // HYPEBEAST App
    category: "Mobile Developer",
    date: "● AUGUST 6, 2025",
    aspectRatio: "aspect-[3/4]",
    title: "HYPEBEAST App",
    subtitle: "Streetwear discovery, reimagined. Swipe, save, and shop the latest drops.",
  },
  {
    projectIndex: 2, // Oxen AI Platform
    category: "Website Developer",
    date: "● SEPTEMBER 3, 2025",
    aspectRatio: "aspect-[16/9]",
    title: "Oxen AI Platform",
    subtitle: "Next-gen SaaS platform engineered to democratize machine learning.",
  },
];

interface ProjectCardProps {
  layout: typeof featuredLayout[0];
  projectData: typeof projects[0];
  onClick: () => void;
  isInView: boolean;
  idx: number;
}

function ProjectCard({
  layout,
  projectData,
  onClick,
  isInView,
  idx,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Track the scroll progress of the card relative to the viewport
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Parallax transformations based on scroll position
  // Image moves slightly vertically within its container
  const yImage = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  // Text floats slightly at a different speed for layered depth
  const yText = useTransform(scrollYProgress, [0, 1], ["10px", "-10px"]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className="bg-white px-0 pt-6 sm:pt-8 pb-12 sm:pb-16 flex flex-col justify-start gap-6 sm:gap-8 min-h-[550px] lg:min-h-[75vh] xl:min-h-[80vh] group cursor-pointer"
    >
      {/* 1. Date at the top */}
      <div className="px-6 md:px-8 xl:px-10 text-[9px] sm:text-[10px] font-semibold text-neutral-450 uppercase tracking-wider font-mono">
        {layout.date}
      </div>

      {/* 2. Image (with parallax translation inside an overflow-hidden wrapper, overlapping margins to prevent subpixel gaps) */}
      <div className={`relative w-[calc(100%+4px)] -ml-[2px] ${layout.aspectRatio} overflow-hidden bg-transparent`}>
        <motion.div
          style={{ y: yImage }}
          className="absolute -top-[12%] -bottom-[12%] -left-[2px] -right-[2px]"
        >
          <Image
            src={projectData.image}
            alt={layout.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            priority={idx < 2}
            placeholder="blur"
            blurDataURL={projectShimmerBlur}
            onLoad={() => setImageLoaded(true)}
            style={{
              filter: imageLoaded ? "blur(0px)" : "blur(20px)",
            }}
            className="object-cover rounded-none transition-[filter] duration-[1000ms] ease-out group-hover:scale-[1.04] transition-transform duration-700 ease-out z-0 scale-[1.01]"
            quality={85}
          />
        </motion.div>
      </div>

      {/* 3. Text content underneath with vertical scroll-linked parallax */}
      <motion.div 
        style={{ y: yText }}
        className="px-6 md:px-8 xl:px-10 flex flex-col gap-2.5 mt-1"
      >
        <span className="text-[10px] font-bold text-neutral-450 uppercase tracking-widest font-nippo group-hover:text-blue-600 transition-colors duration-300">
          {layout.category}
        </span>
        <h3 className="text-sm sm:text-base lg:text-lg font-normal leading-[1.4] tracking-tight text-neutral-900 font-satoshi">
          {layout.title} — {layout.subtitle}
        </h3>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" ref={containerRef} className="relative min-h-screen bg-white text-black border-t border-b border-neutral-200 font-sf-pro select-none flex flex-col justify-between">
      
      {/* 1. Main Grid: Horizontal and vertical lines are created by 1px gaps. Constrained by max-width and centered. */}
      <div className="max-w-[1800px] mx-auto w-full border-x border-neutral-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-neutral-200 gap-[1px] flex-grow min-h-screen relative">
        
        {/* Desktop Header Row Background grid at z-0 to preserve cell gaps */}
        <div className="absolute top-0 left-0 right-0 h-[160px] grid grid-cols-4 gap-[1px] bg-neutral-200 z-0 hidden lg:grid">
          <div className="bg-white h-full w-full" />
          <div className="bg-white h-full w-full" />
          <div className="bg-white h-full w-full" />
          <div className="bg-white h-full w-full" />
        </div>

        {/* Desktop Marquee Background layer (animasi teks slide) at z-10 */}
        <div className="absolute top-0 left-0 right-0 h-[160px] pointer-events-none overflow-hidden flex items-center z-10 bg-transparent hidden lg:flex">
          <div className="whitespace-nowrap flex text-[6vw] font-extrabold text-black/[0.04] tracking-widest font-nippo select-none uppercase animate-marquee-slow">
            <span>DESIGN • DEVELOPMENT • BRANDING • UIUX • PROJECTS •&nbsp;</span>
            <span>DESIGN • DEVELOPMENT • BRANDING • UIUX • PROJECTS •&nbsp;</span>
          </div>
        </div>

        {/* ==========================================
            DESKTOP HEADER ROW (lg:grid)
           ========================================== */}
        {/* Col 1 Header: Brand logo aligned left */}
        <div className="hidden lg:flex bg-transparent items-start justify-start pt-8 pb-6 px-6 md:px-8 xl:px-10 min-h-[160px] relative z-20">
          <div className="flex items-center gap-1.5">
            <Image
              src="/images/logo/Logo2.png"
              alt="Huga Logo"
              width={72}
              height={24}
              className="h-6 w-auto object-contain"
              priority
            />
            <span className="text-sm font-bold tracking-tight text-black font-nippo">
              Huga Studio
            </span>
          </div>
        </div>
        
        {/* Col 2 Header: Top label and PROJECTS title */}
        <div className="hidden lg:flex flex-col bg-transparent items-start justify-between pt-8 pb-6 px-6 md:px-8 xl:px-10 min-h-[160px] relative z-20">
          <div className="text-[9px] font-bold text-neutral-450 uppercase tracking-widest font-mono">
            ● 04 SELECTED PROJECTS
          </div>
          <h2 className="text-[3.8vw] font-bold tracking-tighter text-black select-none uppercase leading-none font-nippo mt-auto">
            PROJECTS
          </h2>
        </div>
        
        {/* Col 3 Header: Top menu/label */}
        <div className="hidden lg:flex bg-transparent items-start justify-start pt-8 pb-6 px-6 md:px-8 xl:px-10 min-h-[160px] relative z-20">
          <div className="text-[9px] font-bold text-neutral-450 uppercase tracking-widest font-mono">
            + DESIGN & CODE
          </div>
        </div>
        
        {/* Col 4 Header: Top right See all link */}
        <div className="hidden lg:flex bg-transparent items-start justify-end pt-8 pb-6 px-6 md:px-8 xl:px-10 min-h-[160px] relative z-20">
          <Link 
            href="/projects"
            className="text-[9px] font-bold uppercase tracking-widest text-neutral-800 hover:text-black transition-colors flex items-center gap-1 font-mono"
          >
            All projects <span className="text-[9px]">↗</span>
          </Link>
        </div>

        {/* ==========================================
            MOBILE / TABLET HEADER (lg:hidden)
           ========================================== */}
        <div className="lg:hidden col-span-full bg-transparent p-6 flex justify-between items-end border-b border-neutral-200 relative overflow-hidden min-h-[120px]">
          {/* Mobile Header Background */}
          <div className="absolute inset-0 bg-white z-0" />
          
          {/* Marquee for mobile background (animasi teks slide) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center z-10 bg-transparent">
            <div className="whitespace-nowrap flex text-[10vw] font-extrabold text-black/[0.03] tracking-widest font-nippo select-none uppercase animate-marquee-slow">
              <span>DESIGN • DEVELOPMENT • BRANDING • UIUX • PROJECTS •&nbsp;</span>
              <span>DESIGN • DEVELOPMENT • BRANDING • UIUX • PROJECTS •&nbsp;</span>
            </div>
          </div>
          
          <div className="relative z-20 flex flex-col gap-1.5">
            <div className="text-[9px] font-bold text-neutral-450 uppercase tracking-widest font-mono">
              ● 04 SELECTED PROJECTS
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter text-black font-nippo uppercase">
              PROJECTS
            </h2>
          </div>
          <Link 
            href="/projects"
            className="relative z-20 text-[10px] font-bold uppercase tracking-wider text-neutral-800 hover:text-black flex items-center gap-1 font-mono"
          >
            See all ↗
          </Link>
        </div>

        {/* ==========================================
            BODY ROW (Col 1, 2, 3, 4) 
           ========================================== */}
        {featuredLayout.map((layout, idx) => {
          const projectData = projects[layout.projectIndex];
          return (
            <ProjectCard
              key={idx}
              idx={idx}
              layout={layout}
              projectData={projectData}
              onClick={() => setSelectedProject(projectData as Project)}
              isInView={isInView}
            />
          );
        })}

      </div>

      {/* Detail Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}