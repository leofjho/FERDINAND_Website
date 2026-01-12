"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useLocomotiveScroll";

interface ProjectOverviewProps {
  shortDescription: string;
  technologies?: string[];
  client?: string;
}

export default function ProjectOverview({
  shortDescription,
  technologies,
  client,
}: ProjectOverviewProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.2 });

  return (
    <section
      ref={sectionRef}
      className="bg-[#0a0a0a] px-6 py-24 md:px-16 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="mb-6 text-xs tracking-widest uppercase text-white/40">
              Overview
            </h2>
            <p className="text-xl font-light leading-relaxed text-white/80 md:text-2xl">
              {shortDescription}
            </p>
          </motion.div>

          {/* Quick Facts */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {client && (
              <div>
                <h3 className="mb-2 text-xs tracking-widest uppercase text-white/40">
                  Client
                </h3>
                <p className="text-lg font-light">{client}</p>
              </div>
            )}

            {technologies && technologies.length > 0 && (
              <div>
                <h3 className="mb-3 text-xs tracking-widest uppercase text-white/40">
                  Services
                </h3>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-white/5 px-4 py-2 text-sm text-white/70"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
