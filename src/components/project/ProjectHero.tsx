"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ProjectImage } from "@/types/project";
import { useParallax } from "@/hooks/useLocomotiveScroll";

interface ProjectHeroProps {
  title: string;
  category: string;
  year: string;
  client?: string;
  heroImage: ProjectImage;
}

export default function ProjectHero({
  title,
  category,
  year,
  client,
  heroImage,
}: ProjectHeroProps) {
  const imageRef = useRef<HTMLDivElement>(null);
  const parallaxOffset = useParallax(imageRef, 0.3);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Parallax */}
      <div
        ref={imageRef}
        className="absolute inset-0 scale-110"
        style={{
          transform: `translateY(${parallaxOffset}px) scale(1.1)`,
        }}
      >
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-16 md:px-16 md:pb-24">
        <div className="max-w-6xl">
          {/* Meta Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-4 flex flex-wrap items-center gap-4 text-sm tracking-widest uppercase text-white/60"
          >
            <span>{category}</span>
            <span className="hidden md:inline">•</span>
            <span>{year}</span>
            {client && (
              <>
                <span className="hidden md:inline">•</span>
                <span className="hidden md:inline">{client}</span>
              </>
            )}
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl font-extralight tracking-tight md:text-7xl lg:text-8xl"
          >
            {title}
          </motion.h1>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-[10px] tracking-widest uppercase text-white/40">
            Scroll
          </span>
          <svg
            className="h-4 w-4 text-white/40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
