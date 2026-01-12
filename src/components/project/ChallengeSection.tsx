"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChallengePoint } from "@/types/project";
import { useInView } from "@/hooks/useLocomotiveScroll";

interface ChallengeSectionProps {
  challenge: string;
  challengePoints: ChallengePoint[];
}

export default function ChallengeSection({
  challenge,
  challengePoints,
}: ChallengeSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.15 });

  return (
    <section
      ref={sectionRef}
      className="bg-[#0a0a0a] px-6 py-24 md:px-16 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-20"
        >
          <h2 className="mb-6 text-xs tracking-widest uppercase text-white/40">
            The Challenge
          </h2>
          <p className="max-w-3xl text-2xl font-light leading-relaxed text-white/80 md:text-3xl">
            {challenge}
          </p>
        </motion.div>

        {/* Challenge Points Grid */}
        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {challengePoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="group rounded-xl bg-white/5 p-6 transition-colors hover:bg-white/10 md:p-8"
            >
              {/* Number */}
              <span className="mb-4 inline-block text-4xl font-extralight text-white/20">
                0{index + 1}
              </span>
              <h3 className="mb-3 text-lg font-light md:text-xl">
                {point.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/60">
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
