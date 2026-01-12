"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getProjectPreviews } from "@/data/projects";
import LocomotiveProvider from "@/components/locomotive/LocomotiveProvider";

const projects = getProjectPreviews();

export default function Work() {
  const [transitionActive, setTransitionActive] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Detect system color scheme
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTransitionActive(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  // Background color based on system preference
  const backgroundColor = isDarkMode ? "#0a0a0a" : "#ffffff";
  const textColor = isDarkMode ? "text-white" : "text-black";
  const textMutedColor = isDarkMode ? "text-white/60" : "text-black/60";
  const textFadedColor = isDarkMode ? "text-white/40" : "text-black/40";
  const borderColor = isDarkMode ? "border-white/10" : "border-black/10";

  return (
    <LocomotiveProvider options={{ lerp: 0.08, duration: 1.4 }}>
      <div className="min-h-screen relative" style={{ cursor: "none" }}>
        <CustomCursor isPinkBackground={!transitionActive} />
        {/* Pink Background - same as landing page */}
        <div
          className="fixed inset-0 z-0 transition-opacity duration-[2500ms] ease-in-out"
          style={{
            background:
              "linear-gradient(180deg, #ff69b4 0%, #ff8cc8 50%, rgba(255, 180, 224, 0.8) 100%)",
            opacity: transitionActive ? 0 : 1,
          }}
        />

        {/* Final Background - fades in (dark or light based on system preference) */}
        <div
          className="fixed inset-0 z-0 transition-opacity duration-[2500ms] ease-in-out"
          style={{
            background: backgroundColor,
            opacity: transitionActive ? 1 : 0,
          }}
        />

        {/* Content */}
        <div
          className={`relative z-10 min-h-screen transition-colors duration-[2500ms] ease-in-out ${textColor}`}
          style={{
            backgroundColor: transitionActive ? backgroundColor : "transparent",
          }}
        >
          <Navigation />

          <main className="pt-24 md:pt-32 pb-16 md:pb-24 px-6 md:px-16">
            <div className="max-w-6xl mx-auto">
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-3xl md:text-6xl font-extralight tracking-tight mb-4 md:mb-6"
              >
                Selected Work
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className={`${textMutedColor} text-base md:text-lg max-w-xl mb-12 md:mb-20`}
              >
                A curated selection of projects that showcase our approach to
                visual storytelling and brand building.
              </motion.p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.slug}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    whileHover={{ y: -8 }}
                    className={`group relative aspect-[4/3] ${isDarkMode ? "bg-white/5" : "bg-black/5"} rounded-lg overflow-hidden`}
                  >
                    {/* Project Thumbnail */}
                    <Image
                      src={project.thumbnail.src}
                      alt={project.thumbnail.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 md:opacity-70 md:group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-[10px] md:text-xs tracking-widest uppercase text-white/60">
                          {project.category}
                        </p>
                        <p className="text-[10px] md:text-xs text-white/40">
                          {project.year}
                        </p>
                      </div>
                      <h3 className="text-xl md:text-2xl font-light text-white">
                        {project.title}
                      </h3>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </main>

          <footer className={`${borderColor} border-t py-8 md:py-12 px-6 md:px-16`}>
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
              <div className="text-lg md:text-xl font-light tracking-[0.2em] md:tracking-[0.3em] uppercase">
                FERDINAND
              </div>
              <div className="flex items-center gap-4 md:gap-6">
                <a href="/impressum" className={`text-xs md:text-sm ${textFadedColor} hover:${textMutedColor} transition-colors`}>
                  Impressum
                </a>
                <p className={`text-xs md:text-sm ${textFadedColor} text-center`}>
                  &copy; 2026 FERDINAND Studio
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </LocomotiveProvider>
  );
}
