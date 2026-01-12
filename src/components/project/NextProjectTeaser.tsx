"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { NextProject } from "@/types/project";
import { useInView, useParallax } from "@/hooks/useLocomotiveScroll";

interface NextProjectTeaserProps {
  nextProject: NextProject;
}

export default function NextProjectTeaser({
  nextProject,
}: NextProjectTeaserProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.2 });
  const parallaxOffset = useParallax(imageRef, 0.15);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden">
      {/* Background Image with Parallax */}
      <div
        ref={imageRef}
        className="absolute inset-0 scale-110"
        style={{
          transform: `translateY(${parallaxOffset}px) scale(1.1)`,
        }}
      >
        <Image
          src={nextProject.thumbnail.src}
          alt={nextProject.thumbnail.alt}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#0a0a0a]/70" />
      </div>

      {/* Content */}
      <Link
        href={`/work/${nextProject.slug}`}
        className="group relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-4 text-xs tracking-widest uppercase text-white/40"
        >
          Next Project
        </motion.span>

        <motion.span
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-2 text-sm tracking-widest uppercase text-white/60"
        >
          {nextProject.category}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl font-extralight tracking-tight transition-all duration-500 group-hover:tracking-wide md:text-6xl lg:text-7xl"
        >
          {nextProject.title}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8"
        >
          <span className="inline-flex items-center gap-2 text-sm tracking-wide text-white/60 transition-colors group-hover:text-white">
            View Project
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
        </motion.div>
      </Link>
    </section>
  );
}
