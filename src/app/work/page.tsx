"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import { useEffect, useState } from "react";

const projects = [
  { title: "Brand Identity", category: "Branding", year: "2024" },
  { title: "Motion Design", category: "Animation", year: "2024" },
  { title: "Digital Experience", category: "Web", year: "2023" },
  { title: "Visual Campaign", category: "Photography", year: "2023" },
  { title: "Product Launch", category: "Campaign", year: "2023" },
  { title: "Corporate Identity", category: "Branding", year: "2022" },
];

export default function Work() {
  const [transitionActive, setTransitionActive] = useState(false);

  useEffect(() => {
    // Start transition after a tiny delay to ensure page is visible
    const timer = setTimeout(() => {
      setTransitionActive(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Pink Background - same as landing page */}
      <div
        className="fixed inset-0 z-0 transition-opacity duration-[2500ms] ease-in-out"
        style={{
          background: "linear-gradient(180deg, #ff69b4 0%, #ff8cc8 50%, rgba(255, 180, 224, 0.8) 100%)",
          opacity: transitionActive ? 0 : 1,
        }}
      />
      
      {/* Black Background - fades in */}
      <div
        className="fixed inset-0 z-0 transition-opacity duration-[2500ms] ease-in-out"
        style={{
          background: "#0a0a0a",
          opacity: transitionActive ? 1 : 0,
        }}
      />
      
      {/* Content */}
      <div
        className="relative z-10 min-h-screen transition-colors duration-[2500ms] ease-in-out"
        style={{
          backgroundColor: transitionActive ? '#0a0a0a' : 'transparent',
        }}
      >
        <Navigation />

      <main className="pt-32 pb-24 px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-extralight tracking-tight mb-6"
          >
            Selected Work
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-white/60 text-lg max-w-xl mb-20"
          >
            A curated selection of projects that showcase our approach to
            visual storytelling and brand building.
          </motion.p>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative aspect-[4/3] bg-white/5 rounded-lg overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs tracking-widest uppercase text-white/60">
                      {project.category}
                    </p>
                    <p className="text-xs text-white/40">{project.year}</p>
                  </div>
                  <h3 className="text-2xl font-light">{project.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t border-white/10 py-12 px-8 md:px-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-xl font-light tracking-[0.3em] uppercase">
            FERDINAND
          </div>
          <p className="text-sm text-white/40">
            &copy; 2026 FERDINAND Studio. All rights reserved.
          </p>
        </div>
      </footer>
      </div>
    </div>
  );
}
