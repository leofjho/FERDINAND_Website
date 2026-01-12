"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ProjectImage } from "@/types/project";
import { useInView, useParallax } from "@/hooks/useLocomotiveScroll";

interface VisualShowcaseProps {
  image: ProjectImage;
  caption?: string;
}

export default function VisualShowcase({ image, caption }: VisualShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });
  const parallaxOffset = useParallax(imageRef, 0.2);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Full-width Image Container */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.2 }}
        className="relative h-[60vh] w-full md:h-[80vh]"
      >
        <div
          ref={imageRef}
          className="absolute inset-0 scale-110"
          style={{
            transform: `translateY(${parallaxOffset}px) scale(1.1)`,
          }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>

        {/* Subtle Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/30" />
      </motion.div>

      {/* Caption */}
      {caption && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-[#0a0a0a] px-6 py-8 md:px-16"
        >
          <p className="mx-auto max-w-6xl text-center text-sm tracking-wide text-white/40">
            {caption}
          </p>
        </motion.div>
      )}
    </section>
  );
}
