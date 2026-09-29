"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { useLenis } from "@/components/providers/SmoothScrollProvider";
import Image from "next/image";
import { projects, type Project } from "@/constants/projects";
import { projectShimmerBlur } from "@/lib/image-placeholder";

const formatTag = (tag: string) => {
  const tagMap: Record<string, string> = {
    "NEXT.JS": "Next.js",
    "SUPABASE": "Supabase",
    "SCIKIT-LEARN": "Scikit-learn",
    "API INTEGRATION": "API Integration",
    "FIGMA": "Figma",
    "UX/UI DESIGN": "UI/UX Design",
    "UI/UX DESIGN": "UI/UX Design",
    "MOBILE OPTIMIZATION": "Mobile Optimization",
    "USABILITY TESTING": "Usability Testing",
    "WEB DESIGN": "Web Design",
    "RESPONSIVE": "Responsive",
    "UI/UX": "UI/UX",
    "FLUTTER": "Flutter",
    "FIREBASE": "Firebase",
    "DART": "Dart",
    "AI SAAS": "AI SaaS",
    "MACHINE LEARNING": "Machine Learning",
    "BRANDING": "Branding",
    "STREETWEAR": "Streetwear",
    "LOGO DESIGN": "Logo Design"
  };
  
  const upperTag = tag.toUpperCase();
  if (tagMap[upperTag]) return tagMap[upperTag];
  
  return tag
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [mounted, setMounted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const lenis = useLenis();
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Bypass Lenis & Handle Scroll
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const handleWheel = (e: WheelEvent) => {
      e.stopPropagation();
    };

    if (isOpen) {
      lenis?.stop();
      overlay.addEventListener("wheel", handleWheel, { passive: true });
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }

    return () => {
      overlay.removeEventListener("wheel", handleWheel);
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [isOpen, lenis]);

  // Escape key to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!mounted || !project) return null;

  // Filter recommendations (other projects)
  const recommendations = projects
    .filter((p) => p.id !== project.id)
    .slice(0, 3);

  const modalContent = (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
          />

          {/* Scrollable Overlay Container */}
          <div
            ref={overlayRef}
            onWheel={(e) => e.stopPropagation()}
            className="relative w-full h-full overflow-y-auto scrollbar-hide py-0 md:py-10"
            onClick={(e) => {
              if (e.target === e.currentTarget) onClose();
            }}
          >
            {/* Inner Content Container */}
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-[1440px] mx-auto bg-white min-h-screen md:min-h-0 md:rounded-3xl overflow-hidden shadow-2xl border border-black/[0.06]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* ── STICKY TOP BAR ── */}
              <div className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-black/[0.06] px-6 md:px-10 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden bg-gradient-to-br from-[#0066ff] to-[#0055cc] p-0.5">
                    <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center">
                      <Image 
                        src="/images/hero/foto-huga.jpg" 
                        alt="Author" 
                        width={40} 
                        height={40} 
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-black font-bold text-[13px] md:text-sm leading-tight">Andika Huga W.</h4>
                    <p className="hidden md:block text-[#0066ff] text-[10px] font-normal uppercase tracking-widest font-sf-pro">Available for work</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 md:gap-4">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsSaved(!isSaved)}
                    className={`h-9 md:h-10 px-3 md:px-5 rounded-xl text-[13px] md:text-sm font-bold transition-all duration-200 border ${
                      isSaved 
                        ? "bg-black text-white border-black" 
                        : "bg-black/5 text-black border-black/10 hover:bg-black/10"
                    }`}
                  >
                    {isSaved ? "Saved" : "Save"}
                  </motion.button>
                  
                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    onClick={() => setIsLiked(!isLiked)}
                    className={`h-9 md:h-10 px-3 md:px-5 rounded-xl text-[13px] md:text-sm font-bold flex items-center gap-2 transition-all duration-300 ${
                      isLiked 
                        ? "bg-[#ea4c89] text-white shadow-[0_0_20px_rgba(234,76,137,0.4)]" 
                        : "bg-black/5 text-black hover:bg-black/10 border border-black/10"
                    }`}
                  >
                    <motion.svg 
                      animate={isLiked ? { scale: [1, 1.4, 1] } : {}}
                      width="16" height="16" viewBox="0 0 24 24" 
                      fill={isLiked ? "currentColor" : "none"} 
                      stroke="currentColor" strokeWidth="2"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </motion.svg>
                    <span className="hidden sm:inline">{isLiked ? "Liked" : "Like"}</span>
                  </motion.button>

                  <button
                    onClick={onClose}
                    className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-black/5 flex items-center justify-center text-black/40 hover:text-black hover:bg-black/10 transition-all md:ml-2"
                  >
                    <svg className="w-[18px] h-[18px] md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                  </button>
                </div>
              </div>

              {/* ── HERO IMAGE ── */}
              <div className="w-full px-6 md:px-10 pt-8">
                <div className="w-full overflow-hidden rounded-2xl bg-[#f4f4f5] ring-1 ring-black/[0.06]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={1440}
                    height={810}
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 95vw, 1440px"
                    className="w-full h-auto object-contain"
                    quality={85}
                    placeholder="blur"
                    blurDataURL={projectShimmerBlur}
                    priority
                  />
                </div>
              </div>

              {/* ── PROJECT TITLE ── */}
              <div className="px-6 md:px-10 pt-12 pb-8">
                <h1 className="text-3xl md:text-5xl font-black text-black mb-6 leading-tight">
                  {project.title}
                </h1>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="px-3.5 py-1.5 bg-black/[0.03] border border-black/[0.06] rounded-md text-xs font-normal text-black/70 font-sf-pro transition-colors duration-300 hover:bg-black/[0.06]">
                      {formatTag(tag)}
                    </span>
                  ))}
                </div>
              </div>

              {/* ── TWO COLUMN BODY ── */}
              <div className="px-6 md:px-10 pb-20 grid lg:grid-cols-12 gap-12 lg:gap-20 border-t border-black/[0.06] pt-12">
                <div className="lg:col-span-8 space-y-6">
                  <p className="text-xl text-black/80 leading-relaxed font-normal font-sf-pro">
                    {project.description}
                  </p>
                  <div className="pt-8 space-y-8 text-black/60 leading-relaxed font-normal font-sf-pro">
                    <p>
                      This project represents a deep dive into modern user experience patterns, 
                      blending high-performance technology with an uncompromising aesthetic. 
                      Every interaction was designed to feel natural and intuitive, reducing 
                      friction while maximizing user engagement.
                    </p>
                    <p>
                      The technical architecture focuses on scalability and accessibility, 
                      ensuring that the platform performs flawlessly across all devices 
                      and network conditions.
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-4 space-y-10">
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <span className="text-[10px] font-normal uppercase tracking-[0.2em] text-black/40 font-sf-pro">Client</span>
                      <p className="text-black font-normal font-sf-pro">Huga Studio Inc.</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-normal uppercase tracking-[0.2em] text-black/40 font-sf-pro">Role</span>
                      <p className="text-black font-normal font-sf-pro">Full Stack Developer & UI Designer</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-normal uppercase tracking-[0.2em] text-black/40 font-sf-pro">Year</span>
                      <p className="text-black font-normal font-sf-pro">2024</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-normal uppercase tracking-[0.2em] text-black/40 font-sf-pro">Tools</span>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {["React", "Next.js", "Framer", "Tailwind"].map(tool => (
                          <span key={tool} className="text-[11px] font-normal text-black/60 bg-black/5 px-2.5 py-1 rounded-md border border-black/[0.06] font-sf-pro">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full py-4 bg-black text-white font-black rounded-xl hover:bg-[#0066ff] transition-colors duration-300"
                  >
                    View Live Site
                  </a>
                </div>
              </div>

              {/* ── PREVIEW IMAGES ── */}
              {project.previewImages && project.previewImages.length > 0 && (
                <div className="px-6 md:px-10 py-16 border-t border-black/[0.06]">
                  <div className="flex flex-col gap-10 md:gap-16">
                    {project.previewImages.map((img: any, idx) => {
                      const src = typeof img === 'string' ? img : img.src;
                      const title = typeof img === 'string' ? null : img.title;
                      const description = typeof img === 'string' ? null : img.description;
                      
                      return (
                        <div key={idx} className="flex flex-col gap-6">
                          <div className="w-full overflow-hidden rounded-2xl bg-[#f4f4f5] ring-1 ring-black/[0.06] group">
                            <Image
                              src={src}
                              alt={title || `${project.title} Preview ${idx + 1}`}
                              width={1440}
                              height={810}
                              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 95vw, 1440px"
                              className="w-full h-auto object-contain group-hover:scale-[1.02] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                              quality={85}
                              loading="lazy"
                              placeholder="blur"
                              blurDataURL={projectShimmerBlur}
                            />
                          </div>
                          {(title || description) && (
                            <div className="w-full text-left space-y-3 md:space-y-5 px-1 md:px-2 mt-2">
                              {title && <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black tracking-tight">{title}</h4>}
                              {description && <p className="text-black/70 text-base md:text-lg lg:text-xl leading-[1.8] font-normal w-full font-sf-pro">{description}</p>}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ── RECOMMENDATIONS SECTION ── */}
              <div className="px-6 md:px-10 py-20 bg-[#fafafa] border-t border-black/[0.06]">
                <div className="flex items-center justify-between mb-10">
                  <h3 className="text-2xl md:text-3xl font-black text-black">More Projects</h3>
                  <div className="h-px flex-1 mx-8 bg-black/[0.06] hidden md:block" />
                  <p className="text-[#0066ff] text-[11px] font-normal uppercase tracking-widest font-sf-pro">Recommended for you</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {recommendations.map((rec) => (
                    <div 
                      key={rec.id}
                      className="group cursor-pointer flex flex-col"
                      onClick={() => {
                        overlayRef.current?.scrollTo({ top: 0, behavior: "smooth" });
                        // We need to change the project. Since it's passed via prop, 
                        // the parent should handle this. For now, we scroll to top.
                      }}
                    >
                      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-4 bg-[#f4f4f5]">
                        <Image
                          src={rec.image}
                          alt={rec.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          quality={80}
                          loading="lazy"
                          placeholder="blur"
                          blurDataURL={projectShimmerBlur}
                        />
                        <div className="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="px-6 py-2 bg-black text-white font-bold rounded-full text-sm shadow-xl">View Work</span>
                        </div>
                      </div>
                      <h4 className="text-lg font-bold text-black group-hover:text-[#0066ff] transition-colors">{rec.title}</h4>
                      <p className="text-black/40 text-sm mt-1 font-normal font-sf-pro">{rec.tags[0]} • {rec.tags[1]}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
