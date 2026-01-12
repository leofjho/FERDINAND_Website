"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import { useEffect, useState } from "react";

export default function Contact() {
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
  const inputBg = isDarkMode ? "bg-white/5" : "bg-black/5";
  const inputBorder = isDarkMode ? "border-white/10 focus:border-white/30" : "border-black/10 focus:border-black/30";
  const placeholderColor = isDarkMode ? "placeholder-white/30" : "placeholder-black/30";

  return (
    <div className="min-h-screen relative" style={{ cursor: "none" }}>
      <CustomCursor isPinkBackground={!transitionActive} />
      {/* Pink Background - same as landing page */}
      <div
        className="fixed inset-0 z-0 transition-opacity duration-[2500ms] ease-in-out"
        style={{
          background: "linear-gradient(180deg, #ff69b4 0%, #ff8cc8 50%, rgba(255, 180, 224, 0.8) 100%)",
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
          backgroundColor: transitionActive ? backgroundColor : 'transparent',
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
              className={`${textMutedColor} text-base md:text-lg max-w-xl mb-12 md:mb-20`}
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
                  <h2 className={`text-[10px] md:text-xs tracking-widest uppercase ${textFadedColor} mb-3 md:mb-4`}>
                    Email
                  </h2>
                  <a
                    href="mailto:hello@ferdinand.studio"
                    className={`text-xl md:text-2xl font-light hover:opacity-60 transition-colors break-all`}
                  >
                    hello@ferdinand.studio
                  </a>
                </div>

                <div className="mb-8 md:mb-12">
                  <h2 className={`text-[10px] md:text-xs tracking-widest uppercase ${textFadedColor} mb-3 md:mb-4`}>
                    Social
                  </h2>
                  <div className="flex flex-row md:flex-col gap-6 md:gap-3">
                    <a
                      href="#"
                      className="text-base md:text-lg font-light hover:opacity-60 transition-colors"
                    >
                      Instagram
                    </a>
                    <a
                      href="#"
                      className="text-base md:text-lg font-light hover:opacity-60 transition-colors"
                    >
                      Twitter
                    </a>
                    <a
                      href="#"
                      className="text-base md:text-lg font-light hover:opacity-60 transition-colors"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>

                <div>
                  <h2 className={`text-[10px] md:text-xs tracking-widest uppercase ${textFadedColor} mb-3 md:mb-4`}>
                    Location
                  </h2>
                  <p className={`text-base md:text-lg font-light ${textMutedColor}`}>
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
                  <label className={`block text-[10px] md:text-xs tracking-widest uppercase ${textFadedColor} mb-2 md:mb-3`}>
                    Name
                  </label>
                  <input
                    type="text"
                    className={`w-full ${inputBg} border ${inputBorder} rounded-lg px-4 md:px-6 py-3 md:py-4 text-base ${placeholderColor} focus:outline-none transition-colors`}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className={`block text-[10px] md:text-xs tracking-widest uppercase ${textFadedColor} mb-2 md:mb-3`}>
                    Email
                  </label>
                  <input
                    type="email"
                    className={`w-full ${inputBg} border ${inputBorder} rounded-lg px-4 md:px-6 py-3 md:py-4 text-base ${placeholderColor} focus:outline-none transition-colors`}
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className={`block text-[10px] md:text-xs tracking-widest uppercase ${textFadedColor} mb-2 md:mb-3`}>
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className={`w-full ${inputBg} border ${inputBorder} rounded-lg px-4 md:px-6 py-3 md:py-4 text-base ${placeholderColor} focus:outline-none transition-colors resize-none`}
                    placeholder="Tell us about your project"
                  />
                </div>
                <button
                  type="submit"
                  className={`w-full ${isDarkMode ? "bg-white text-black hover:bg-white/90" : "bg-black text-white hover:bg-black/90"} rounded-full py-3 md:py-4 text-sm tracking-wider uppercase font-medium transition-colors`}
                >
                  Send Message
                </button>
              </motion.form>
            </div>
          </div>
        </main>

        <footer className={`${borderColor} border-t py-8 md:py-12 px-6 md:px-16`}>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
            <div className="text-lg md:text-xl font-light tracking-[0.2em] md:tracking-[0.3em] uppercase">
              FERDINAND
            </div>
            <div className="flex items-center gap-4 md:gap-6">
              <a href="/impressum" className={`text-xs md:text-sm ${textFadedColor} hover:opacity-80 transition-colors`}>
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
  );
}
