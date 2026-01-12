"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SolutionFeature, ProjectImage } from "@/types/project";
import { useInView } from "@/hooks/useLocomotiveScroll";

interface SolutionSectionProps {
  solution: string;
  solutionFeatures: SolutionFeature[];
  solutionImage: ProjectImage;
}

export default function SolutionSection({
  solution,
  solutionFeatures,
  solutionImage,
}: SolutionSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });

  return (
    <section
      ref={sectionRef}
      className="bg-[#0a0a0a] px-6 py-24 md:px-16 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-20"
        >
          <h2 className="mb-6 text-xs tracking-widest uppercase text-white/40">
            The Solution
          </h2>
          <p className="max-w-3xl text-2xl font-light leading-relaxed text-white/80 md:text-3xl">
            {solution}
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid gap-8 md:grid-cols-2 md:gap-16">
          {/* Sticky Image (on desktop) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative aspect-[4/5] overflow-hidden rounded-xl md:sticky md:top-24"
          >
            <Image
              src={solutionImage.src}
              alt={solutionImage.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>

          {/* Solution Features */}
          <div className="space-y-6 md:space-y-8">
            {solutionFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="group rounded-xl bg-white/5 p-6 transition-colors hover:bg-white/10 md:p-8"
              >
                <div className="mb-4 flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm font-light">
                    0{index + 1}
                  </span>
                  <h3 className="text-lg font-light md:text-xl">
                    {feature.title}
                  </h3>
                </div>
                <p className="pl-14 text-sm leading-relaxed text-white/60">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
