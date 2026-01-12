"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { GalleryImage } from "@/types/project";
import { useInView } from "@/hooks/useLocomotiveScroll";

interface ImageGalleryProps {
  images: GalleryImage[];
  variant?: "horizontal" | "grid";
}

export default function ImageGallery({
  images,
  variant = "horizontal",
}: ImageGalleryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });

  if (variant === "grid") {
    return (
      <section
        ref={sectionRef}
        className="bg-[#0a0a0a] px-6 py-24 md:px-16 md:py-32"
      >
        <div className="mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-12 text-xs tracking-widest uppercase text-white/40"
          >
            Gallery
          </motion.h2>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative aspect-[4/3] overflow-hidden rounded-lg"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Horizontal Scroll Variant
  return (
    <section ref={sectionRef} className="bg-[#0a0a0a] py-24 md:py-32">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-12 px-6 text-xs tracking-widest uppercase text-white/40 md:px-16"
      >
        Gallery
      </motion.h2>

      {/* Horizontal Scroll Container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="scrollbar-hide flex gap-4 overflow-x-auto px-6 pb-4 md:gap-6 md:px-16"
      >
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative aspect-[4/3] w-[80vw] flex-shrink-0 overflow-hidden rounded-lg md:w-[45vw] lg:w-[35vw]"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 80vw, (max-width: 1024px) 45vw, 35vw"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
            {image.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <p className="text-sm text-white/80">{image.caption}</p>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
