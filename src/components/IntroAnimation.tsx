"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface IntroAnimationProps {
  onComplete: () => void;
}

const letters = "FERDINAND".split("");

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [phase, setPhase] = useState<"center" | "moving" | "done">("center");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);

    // Phase 1: Show centered (2s)
    const timer1 = setTimeout(() => {
      setPhase("moving");
    }, 2000);

    // Phase 2: After all letters animated (longer duration)
    const timer2 = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener("resize", handleResize);
    };
  }, [onComplete]);

  // Navigation position values
  const navPaddingX = isMobile ? 24 : 64; // px-6 = 24px, px-16 = 64px
  const navPaddingY = isMobile ? 24 : 32; // py-6 = 24px, py-8 = 32px

  return (
    <motion.div
      className="fixed inset-0 z-[100]"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === "done" ? 0 : 1 }}
      transition={{ duration: 0.5 }}
      style={{
        pointerEvents: phase === "done" ? "none" : "auto",
        background:
          "linear-gradient(180deg, #ff69b4 0%, #ff8cc8 50%, rgba(255, 180, 224, 0.8) 100%)",
      }}
    >
      {/* Letters container */}
      <motion.div
        className="absolute flex"
        initial={{
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          top: phase === "moving" || phase === "done" ? navPaddingY : "50%",
          left: phase === "moving" || phase === "done" ? navPaddingX : "50%",
          x: phase === "moving" || phase === "done" ? "0%" : "-50%",
          y: phase === "moving" || phase === "done" ? "0%" : "-50%",
        }}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          fontSize: isMobile ? "1.25rem" : "1.5rem", // text-xl / text-2xl
          fontWeight: 300,
          letterSpacing: isMobile ? "0.2em" : "0.3em", // tracking-[0.2em] / tracking-[0.3em]
          textTransform: "uppercase",
        }}
      >
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            className="text-white inline-block"
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              opacity: {
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut",
              },
              y: {
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              },
            }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
}
