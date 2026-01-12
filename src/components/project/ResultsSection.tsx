"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ResultMetric } from "@/types/project";
import { useInView } from "@/hooks/useLocomotiveScroll";

interface ResultsSectionProps {
  results: ResultMetric[];
  description?: string;
}

function CountUpNumber({
  value,
  prefix = "",
  suffix = "",
  isInView,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  isInView: boolean;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const startTime = Date.now();
    const isDecimal = value % 1 !== 0;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = value * easeOut;

      setDisplayValue(isDecimal ? Math.round(current * 10) / 10 : Math.round(current));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <span>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}

export default function ResultsSection({
  results,
  description,
}: ResultsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.3 });

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
          className="mb-16 text-center md:mb-20"
        >
          <h2 className="mb-4 text-xs tracking-widest uppercase text-white/40">
            Results & Impact
          </h2>
          {description && (
            <p className="mx-auto max-w-2xl text-lg font-light text-white/60">
              {description}
            </p>
          )}
        </motion.div>

        {/* Results Grid */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          {results.map((result, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="mb-2 text-4xl font-extralight md:text-5xl lg:text-6xl">
                <CountUpNumber
                  value={result.value}
                  prefix={result.prefix}
                  suffix={result.suffix}
                  isInView={isInView}
                />
              </div>
              <p className="text-sm tracking-wide text-white/40">
                {result.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
