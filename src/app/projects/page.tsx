"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { projects as originalProjects, Project } from "@/constants/projects";
import ProjectModal from "@/components/ui/ProjectModal";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchComponent from "@/components/ui/animated-glowing-search-bar";
import { projectShimmerBlur } from "@/lib/image-placeholder";

// ─── Categories ────────────────────────────────────────────────────────────────

const categories = [
  "All Projects",
  "UI / UX Design",
  "Mobile App",
  "Website",
  "Logo Design",
  "Machine Learning",
  "AI",
];

// ─── Projects Data ─────────────────────────────────────────────────────────────

const allProjectsData: Project[] = Array.from({ length: 20 }, (_, i) => {
  const original = originalProjects[i % originalProjects.length];
  const isOriginal = i < originalProjects.length;
  let title = isOriginal ? original.title : (i + 1).toString().padStart(2, "0");

  let category = original.category;
  let description = original.description;
  let tags = original.tags;
  let previewImages = original.previewImages;

  if (i === 6) {
    title = "Oxen Ai";
    category = "AI";
    description =
      "Oxen Ai is a next-generation SaaS platform engineered to democratize artificial intelligence. Built for scale and speed, it transforms complex data pipelines into intuitive, visual workflows.";
    tags = ["AI SAAS", "MACHINE LEARNING", "UX/UI DESIGN"];
    previewImages = [
      {
        src: "/images/projects/oxen-preview-1.webp",
        title: "Visual Identity & Branding",
        description:
          "Forging trust through design. The Oxen Ai visual identity strips away the complexity of artificial intelligence.",
      },
      {
        src: "/images/projects/oxen-preview-2.webp",
        title: "Intelligent Interface",
        description:
          "A command center built for clarity. Managing complex ML models has never felt this effortless.",
      },
    ];
  }
  if (i === 7) {
    title = "Vivet";
    category = "Logo Design";
    description =
      "Vivet is an unapologetic, high-octane streetwear brand born in Indonesia. Fusing urban grit with premium aesthetics, Vivet redefines modern street culture.";
    tags = ["BRANDING", "STREETWEAR", "LOGO DESIGN"];
    previewImages = [
      {
        src: "/images/projects/vivet-preview-1.webp",
        title: "Digital Ecosystem",
        description: "A seamless and premium shopping experience built across both web and mobile platforms.",
      },
      {
        src: "/images/projects/apparel.webp",
        title: "Signature Apparel",
        description: "Every piece is engineered for the streets, combining raw utilitarian aesthetics with premium heavyweight fabrics.",
      },
      {
        src: "/images/projects/label.webp",
        title: "The Flagship Experience",
        description: "A brutalist yet refined space designed to disrupt the traditional retail experience.",
      },
    ];
  }
  if (i === 8) {
    title = "Islamy Academy AI";
    category = "AI";
    description =
      "An intelligent e-learning ecosystem designed to modernize Islamic education with personalized AI pathing and smart interactive tools.";
    tags = ["EdTech", "AI", "Website"];
  }
  if (i === 9) { title = "Veraflora"; category = "Logo Design"; tags = ["Branding", "Logo Design", "UI/UX"]; }
  if (i === 10) { title = "Nexa"; category = "Logo Design"; tags = ["Branding", "Logo Design", "UI/UX"]; }

  let image = original.image;
  if (i === 6) image = "/images/projects/oxen-ai.webp";
  else if (i === 7) image = "/images/projects/vivet-v2.webp";
  else if (i === 8) image = "/images/projects/islamy-web.webp";
  else if (i >= 9) image = "https://placehold.co/800x500/111111/111111/png";

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const year = 2024 + (i % 3);
  const month = months[i % months.length];
  const day = ((i * 7) % 28) + 1;
  const date = `${day} ${month} ${year}`;

  return { ...original, id: i + 1, title, category, description, tags, image, date, previewImages };
});

// ─── Helpers ───────────────────────────────────────────────────────────────────

const formatTag = (tag: string) => {
  const map: Record<string, string> = {
    "NEXT.JS": "Next.js", "SUPABASE": "Supabase", "SCIKIT-LEARN": "Scikit-learn",
    "API INTEGRATION": "API Integration", "FIGMA": "Figma", "UX/UI DESIGN": "UI/UX Design",
    "UI/UX DESIGN": "UI/UX Design", "MOBILE OPTIMIZATION": "Mobile Optimization",
    "USABILITY TESTING": "Usability Testing", "FLUTTER": "Flutter", "FIREBASE": "Firebase",
    "AI SAAS": "AI SaaS", "MACHINE LEARNING": "Machine Learning", "BRANDING": "Branding",
    "STREETWEAR": "Streetwear", "LOGO DESIGN": "Logo Design",
  };
  return map[tag.toUpperCase()] ?? tag.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
};

// ─── Featured Card (RecentProjects style) ─────────────────────────────────────────

function FeaturedCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      onClick={onOpen}
      className="relative rounded-3xl overflow-hidden transition-all duration-500 min-h-[600px] sm:min-h-[800px] md:min-h-[1000px] lg:min-h-[1150px] cursor-pointer group mb-16"
    >
      {/* Background Image */}
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        quality={85}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1800px"
        placeholder="blur"
        blurDataURL={projectShimmerBlur}
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />

      {/* Gradient to darken bottom for readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.3) 100%)",
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 h-full p-6 sm:p-10 md:p-12 lg:p-16 flex flex-col justify-end z-10">
        {/* Project Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 w-full"
        >
          {/* Left: Tags */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {project.tags.slice(0, 3).map((tag, index) => (
              <div
                key={index}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 rounded-full text-white text-[10px] sm:text-xs md:text-sm font-normal border border-white/30 font-nippo backdrop-blur-sm shadow-sm"
              >
                {formatTag(tag)}
              </div>
            ))}
            <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 rounded-full text-white text-[10px] sm:text-xs md:text-sm font-normal border border-white/30 font-nippo backdrop-blur-sm shadow-sm">
              {project.date || "14 May 2026"}
            </div>
          </div>

          {/* Right: Brand */}
          <div className="text-white text-lg sm:text-xl md:text-2xl font-normal font-nippo self-start md:self-auto drop-shadow-md">
            {project.title}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Grid Card ─────────────────────────────────────────────────────────────────

function GridCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: Math.min(index * 0.07, 0.45), ease: [0.25, 0.46, 0.45, 0.94] }}
      onClick={onOpen}
      className="group relative cursor-pointer flex flex-col"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#111114] mb-5">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-[1.04] transition-transform duration-600 ease-out opacity-90 group-hover:opacity-100"
          quality={82}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL={projectShimmerBlur}
          loading="lazy"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center backdrop-blur-[2px]">
          <span className="px-5 py-2.5 bg-white text-black text-[11px] font-sf-pro font-semibold tracking-wide rounded-full translate-y-3 group-hover:translate-y-0 transition-transform duration-300 shadow-xl">
            View Case Study
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2 flex-grow">
        <p className="text-[10px] font-sf-pro uppercase tracking-[0.25em] text-[#0066ff]/70">
          {project.category}
        </p>
        <h3 className="font-nippo text-xl md:text-2xl font-medium text-black/85 group-hover:text-black transition-colors duration-300 leading-tight">
          {project.title}
        </h3>
        <p className="text-black/35 font-sf-pro text-[13px] leading-[1.75] line-clamp-2 font-light mt-0.5">
          {project.description}
        </p>
        <p className="text-black/20 font-sf-pro text-[11px] tracking-wide mt-2">
          {project.tags.slice(0, 3).map(formatTag).join(" · ")}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Filter Dropdown ─────────────────────────────────────────────────────────────

function FilterDropdown({
  categories,
  selectedCategory,
  onSelect,
  isOpen,
  onClose,
}: {
  categories: string[];
  selectedCategory: string;
  onSelect: (cat: string) => void;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute right-0 top-full mt-3 w-56 bg-white border border-black/10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] overflow-hidden z-50 p-2 font-sf-pro">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              onSelect(cat);
              onClose();
            }}
            className={`w-full text-left px-4 py-2.5 text-sm rounded-xl transition-all duration-200 ${
              selectedCategory === cat 
                ? "bg-[#0066ff] text-white font-medium shadow-md shadow-[#0066ff]/20" 
                : "text-black/60 hover:bg-black/5 hover:text-black"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Projects");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredProjects = allProjectsData.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      project.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All Projects" ||
      (selectedCategory === "Website" && project.category.toLowerCase().includes("web")) ||
      (selectedCategory === "Mobile App" && (project.category.toLowerCase().includes("mobile") || project.category.toLowerCase().includes("app"))) ||
      (selectedCategory === "Machine Learning" && project.tags.some((t) => t.toLowerCase().includes("scikit-learn"))) ||
      (selectedCategory === "AI" && (project.title.toLowerCase().includes("ai") || project.description.toLowerCase().includes("ai") || project.category.toLowerCase() === "ai")) ||
      (selectedCategory === "Logo Design" && project.category.toLowerCase().includes("logo")) ||
      (selectedCategory === "UI / UX Design" && (project.category.includes("Design") || project.tags.some((t) => t.toLowerCase().includes("ui"))));

    return matchesSearch && matchesCategory;
  });

  // Find the featured project for the currently selected category
  let featuredProject = filteredProjects.find((p) => p.featured) || filteredProjects[0] || null;

  // Custom featured project overrides based on selected category
  if (selectedCategory === "UI / UX Design") {
    const hypebeastApp = filteredProjects.find((p) => p.title === "HYPEBEAST Design App");
    if (hypebeastApp) {
      featuredProject = hypebeastApp;
    }
  } else if (selectedCategory === "AI") {
    const oxenAi = filteredProjects.find((p) => p.title === "Oxen Ai");
    if (oxenAi) {
      featuredProject = oxenAi;
    }
  } else if (selectedCategory === "Mobile App") {
    const luxeCafe = filteredProjects.find((p) => p.title === "Luxe Cafe");
    if (luxeCafe) {
      featuredProject = luxeCafe;
    }
  } else if (selectedCategory === "Website") {
    const hypebeastWeb = filteredProjects.find((p) => p.title === "HYPEBEAST Website");
    if (hypebeastWeb) {
      featuredProject = hypebeastWeb;
    }
  }

  // The rest of the projects go into the grid
  const gridProjects = featuredProject
    ? filteredProjects.filter((p) => p.id !== featuredProject.id)
    : filteredProjects;

  return (
    <main className="bg-white min-h-screen flex flex-col">
      <Navbar />

      <section className="relative pt-32 pb-24 overflow-hidden flex-grow">
        {/* Ambient */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at top, rgba(0,102,255,0.08) 0%, transparent 65%)",
            filter: "blur(60px)",
          }}
        />

        <div className="relative z-10 max-w-[1800px] mx-auto px-6 md:px-12 lg:px-24">

          {/* ── Page header ── */}
          <div className="mb-16">
            <div className="flex justify-center mb-6">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-black/30 hover:text-black/60 transition-colors duration-200 font-sf-pro text-xs uppercase tracking-[0.25em]"
              >
                Home &gt; Projects
              </Link>
            </div>

            {/* Centered Big Title */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-center font-nippo text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-black mb-10 uppercase"
            >
              Selected Work
            </motion.h1>

            {/* Centered Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative max-w-3xl mx-auto mb-8 z-20 flex justify-center"
            >
              <div className="relative w-full max-w-2xl">
                <SearchComponent
                  value={searchQuery}
                  onChange={setSearchQuery}
                  onFilterClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  selectedCategory={selectedCategory}
                />

                {/* Dropdown */}
                <FilterDropdown
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onSelect={setSelectedCategory}
                  isOpen={isDropdownOpen}
                  onClose={() => setIsDropdownOpen(false)}
                />
              </div>
            </motion.div>

            {/* Centered Category Pills */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto"
            >
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-5 py-2.5 rounded-full text-xs font-bold font-sf-pro tracking-wider transition-all duration-300 border ${
                      isActive
                        ? "bg-[#0066ff] text-white border-[#0066ff] shadow-lg shadow-[#0066ff]/20"
                        : "bg-transparent text-black/50 border-black/[0.08] hover:border-[#0066ff]/40 hover:text-[#0066ff] hover:bg-[#0066ff]/5"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </motion.div>
          </div>

          {/* ── Content ── */}
          {filteredProjects.length > 0 ? (
            <>
              {/* Featured Project */}
              {featuredProject && (
                <FeaturedCard
                  project={featuredProject}
                  onOpen={() => setSelectedProject(featuredProject)}
                />
              )}

              {/* Divider / Section Header (Tous les projets style) */}
              {gridProjects.length > 0 && (
                <div className="flex items-center justify-between mb-12 pt-8">
                  <h3 className="font-nippo text-lg sm:text-2xl md:text-3xl lg:text-4xl font-normal text-black uppercase tracking-wide">
                    All Projects
                  </h3>

                  <div className="relative flex items-center justify-end cursor-pointer group">
                    {/* Pill */}
                    <div className="px-5 py-2.5 bg-[#0066ff]/5 backdrop-blur-md border border-[#0066ff]/15 group-hover:border-[#0066ff]/35 rounded-full text-black/80 group-hover:text-black text-xs font-semibold font-sf-pro tracking-wider transition-all duration-300 shadow-[0_4px_20px_rgba(0,102,255,0.04)]">
                      Gallery View
                    </div>
                  </div>
                </div>
              )}

              {/* Grid — all other projects */}
              {gridProjects.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
                  {gridProjects.map((project, i) => (
                    <GridCard
                      key={project.id}
                      project={project}
                      index={i}
                      onOpen={() => setSelectedProject(project)}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="py-32 text-center border border-white/[0.05] rounded-3xl">
              <p className="text-black/30 text-lg mb-4 font-sf-pro">No projects found.</p>
              <button
                onClick={() => { setSearchQuery(""); setSelectedCategory("All Projects"); }}
                className="text-[#0066ff] font-sf-pro text-sm hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />

      <ProjectModal
        project={selectedProject}
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
      />
    </main>
  );
}
