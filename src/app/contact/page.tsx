"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import { useEffect, useState } from "react";

export default function Contact() {
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
            className="text-3xl md:text-6xl font-extralight tracking-tight mb-4 md:mb-6"
          >
            Let&apos;s Create Together
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-white/60 text-base md:text-lg max-w-xl mb-12 md:mb-20"
          >
            Have a project in mind? We&apos;d love to hear about it. Get in
            touch and let&apos;s bring your vision to life.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-last md:order-first"
            >
              <div className="mb-8 md:mb-12">
                <h2 className="text-[10px] md:text-xs tracking-widest uppercase text-white/40 mb-3 md:mb-4">
                  Email
                </h2>
                <a
                  href="mailto:hello@ferdinand.studio"
                  className="text-xl md:text-2xl font-light hover:text-white/60 active:text-white/60 transition-colors break-all"
                >
                  hello@ferdinand.studio
                </a>
              </div>

              <div className="mb-8 md:mb-12">
                <h2 className="text-[10px] md:text-xs tracking-widest uppercase text-white/40 mb-3 md:mb-4">
                  Social
                </h2>
                <div className="flex flex-row md:flex-col gap-6 md:gap-3">
                  <a
                    href="#"
                    className="text-base md:text-lg font-light hover:text-white/60 active:text-white/60 transition-colors"
                  >
                    Instagram
                  </a>
                  <a
                    href="#"
                    className="text-base md:text-lg font-light hover:text-white/60 active:text-white/60 transition-colors"
                  >
                    Twitter
                  </a>
                  <a
                    href="#"
                    className="text-base md:text-lg font-light hover:text-white/60 active:text-white/60 transition-colors"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>

              <div>
                <h2 className="text-[10px] md:text-xs tracking-widest uppercase text-white/40 mb-3 md:mb-4">
                  Location
                </h2>
                <p className="text-base md:text-lg font-light text-white/80">
                  Berlin, Germany
                </p>
              </div>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-4 md:space-y-6"
            >
              <div>
                <label className="block text-[10px] md:text-xs tracking-widest uppercase text-white/40 mb-2 md:mb-3">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 md:px-6 py-3 md:py-4 text-base text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-[10px] md:text-xs tracking-widest uppercase text-white/40 mb-2 md:mb-3">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 md:px-6 py-3 md:py-4 text-base text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-[10px] md:text-xs tracking-widest uppercase text-white/40 mb-2 md:mb-3">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 md:px-6 py-3 md:py-4 text-base text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors resize-none"
                  placeholder="Tell us about your project"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-white text-black rounded-full py-3 md:py-4 text-sm tracking-wider uppercase font-medium hover:bg-white/90 active:bg-white/80 transition-colors"
              >
                Send Message
              </button>
            </motion.form>
          </div>
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
