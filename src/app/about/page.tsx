"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import { useEffect, useState } from "react";

export default function About() {
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

      <main className="pt-24 md:pt-32 pb-16 md:pb-24 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-6xl font-extralight tracking-tight mb-12 md:mb-20"
          >
            About FERDINAND
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-16 md:mb-32">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h2 className="text-xl md:text-2xl font-light mb-4 md:mb-6">Our Story</h2>
              <p className="text-white/60 text-sm md:text-base leading-relaxed mb-4 md:mb-6">
                We are a creative studio specializing in visual storytelling,
                brand identity, and digital experiences. Our team brings
                together diverse perspectives to create work that resonates.
              </p>
              <p className="text-white/60 text-sm md:text-base leading-relaxed">
                Every project is an opportunity to push boundaries and craft
                something meaningful. We believe in the power of design to
                transform and inspire.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="aspect-square bg-white/5 rounded-lg order-first md:order-last"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-16 md:mb-32"
          >
            <h2 className="text-xl md:text-2xl font-light mb-8 md:mb-12">What We Do</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
              {[
                {
                  title: "Brand Identity",
                  description:
                    "We create distinctive visual identities that capture the essence of your brand.",
                },
                {
                  title: "Motion Design",
                  description:
                    "Dynamic animations and video content that bring your message to life.",
                },
                {
                  title: "Digital Experience",
                  description:
                    "Immersive web experiences that engage and convert your audience.",
                },
              ].map((service, index) => (
                <div
                  key={index}
                  className="p-6 md:p-8 bg-white/5 rounded-lg hover:bg-white/10 active:bg-white/10 transition-colors"
                >
                  <h3 className="text-lg md:text-xl font-light mb-3 md:mb-4">{service.title}</h3>
                  <p className="text-white/60 text-xs md:text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <footer className="border-t border-white/10 py-8 md:py-12 px-6 md:px-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
          <div className="text-lg md:text-xl font-light tracking-[0.2em] md:tracking-[0.3em] uppercase">
            FERDINAND
          </div>
          <p className="text-xs md:text-sm text-white/40 text-center">
            &copy; 2026 FERDINAND Studio. All rights reserved.
          </p>
        </div>
      </footer>
      </div>
    </div>
  );
}
