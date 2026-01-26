"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import { useEffect, useState, useRef, useLayoutEffect } from "react";

export default function Contact() {
  const [transitionActive, setTransitionActive] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Scroll position preservation
  const scrollPosRef = useRef<number | null>(null);
  const isSubmittingRef = useRef(false);

  // AGGRESSIVE scroll restoration - runs BEFORE browser paint
  useLayoutEffect(() => {
    if (scrollPosRef.current !== null && isSubmittingRef.current) {
      // Disable smooth scroll temporarily
      const html = document.documentElement;
      const originalScrollBehavior = html.style.scrollBehavior;
      html.style.scrollBehavior = 'auto';

      // Force scroll position
      window.scrollTo(0, scrollPosRef.current);

      // Restore smooth scroll after a frame
      requestAnimationFrame(() => {
        html.style.scrollBehavior = originalScrollBehavior;
        scrollPosRef.current = null;
        isSubmittingRef.current = false;
      });
    }
  }, [status]);

  // Detect system color scheme
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setTransitionActive(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // SIMPLE SUBMIT FUNCTION
  async function submitForm() {
    // Validation
    if (!name.trim()) {
      setErrorMsg("Bitte gib deinen Namen ein.");
      setStatus("error");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Bitte gib eine gültige E-Mail ein.");
      setStatus("error");
      return;
    }
    if (!message.trim()) {
      setErrorMsg("Bitte gib eine Nachricht ein.");
      setStatus("error");
      return;
    }

    // CAPTURE scroll position BEFORE any state changes
    scrollPosRef.current = window.scrollY;
    isSubmittingRef.current = true;

    setStatus("sending");
    setErrorMsg("");

    try {
      const data = new FormData();
      data.append("name", name);
      data.append("email", email);
      data.append("_subject", "Neue Kontaktanfrage von ferdinand.studio");
      data.append("message", message);

      const res = await fetch("https://formspree.io/f/mpqqwzza", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        // Recapture scroll before state change
        scrollPosRef.current = window.scrollY;
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        scrollPosRef.current = window.scrollY;
        setStatus("error");
        setErrorMsg("Fehler beim Senden. Bitte versuche es erneut.");
      }
    } catch {
      scrollPosRef.current = window.scrollY;
      setStatus("error");
      setErrorMsg("Netzwerkfehler. Bitte prüfe deine Verbindung.");
    }
  }

  // Colors
  const bg = isDarkMode ? "#0a0a0a" : "#ffffff";
  const textColor = isDarkMode ? "text-white" : "text-black";
  const textMuted = isDarkMode ? "text-white/60" : "text-black/60";
  const textFaded = isDarkMode ? "text-white/40" : "text-black/40";
  const borderColor = isDarkMode ? "border-white/10" : "border-black/10";
  const inputBg = isDarkMode ? "bg-white/5" : "bg-black/5";
  const inputBorder = isDarkMode ? "border-white/10 focus:border-white/30" : "border-black/10 focus:border-black/30";
  const placeholder = isDarkMode ? "placeholder-white/30" : "placeholder-black/30";

  return (
    <div className="min-h-screen relative" style={{ cursor: "none" }}>
      <CustomCursor isPinkBackground={!transitionActive} />

      {/* Pink Background */}
      <div
        className="fixed inset-0 z-0 transition-opacity duration-[2500ms] ease-in-out"
        style={{
          background: "linear-gradient(180deg, #ff69b4 0%, #ff8cc8 50%, rgba(255, 180, 224, 0.8) 100%)",
          opacity: transitionActive ? 0 : 1,
        }}
      />

      {/* Final Background */}
      <div
        className="fixed inset-0 z-0 transition-opacity duration-[2500ms] ease-in-out"
        style={{ background: bg, opacity: transitionActive ? 1 : 0 }}
      />

      {/* Content */}
      <div
        className={`relative z-10 min-h-screen transition-colors duration-[2500ms] ease-in-out ${textColor}`}
        style={{ backgroundColor: transitionActive ? bg : "transparent" }}
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
              className={`${textMuted} text-base md:text-lg max-w-xl mb-12 md:mb-20`}
            >
              Have a project in mind? We&apos;d love to hear about it.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="order-last md:order-first"
              >
                <div className="mb-8 md:mb-12">
                  <h2 className={`text-[10px] md:text-xs tracking-widest uppercase ${textFaded} mb-3 md:mb-4`}>
                    Email
                  </h2>
                  <a
                    href="mailto:hello@ferdinand.studio"
                    className="text-xl md:text-2xl font-light hover:opacity-60 transition-colors break-all"
                  >
                    hello@ferdinand.studio
                  </a>
                </div>

                <div className="mb-8 md:mb-12">
                  <h2 className={`text-[10px] md:text-xs tracking-widest uppercase ${textFaded} mb-3 md:mb-4`}>
                    Social
                  </h2>
                  <div className="flex flex-row md:flex-col gap-6 md:gap-3 items-start">
                    <a href="#" className="inline-block text-base md:text-lg font-light hover:opacity-60 transition-colors">Instagram</a>
                    <a href="#" className="inline-block text-base md:text-lg font-light hover:opacity-60 transition-colors">Twitter</a>
                    <a href="#" className="inline-block text-base md:text-lg font-light hover:opacity-60 transition-colors">LinkedIn</a>
                  </div>
                </div>

                <div>
                  <h2 className={`text-[10px] md:text-xs tracking-widest uppercase ${textFaded} mb-3 md:mb-4`}>
                    Location
                  </h2>
                  <p className={`text-base md:text-lg font-light ${textMuted}`}>Cologne, Germany</p>
                </div>
              </motion.div>

              {/* Form Area - fixed height container to prevent layout shift */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{ minHeight: "500px" }}
              >
                {status === "success" ? (
                  /* SUCCESS MESSAGE */
                  <div className={`${isDarkMode ? "liquid-glass-input" : "liquid-glass-hover"} rounded-2xl p-8 md:p-12 text-center`}>
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
                      <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-light mb-3 tracking-tight">Nachricht gesendet!</h3>
                    <p className={`${textMuted} text-base md:text-lg mb-8`}>
                      Vielen Dank! Wir melden uns so schnell wie möglich.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className={`${isDarkMode ? "liquid-glass-hover" : "liquid-glass-hover"} px-6 py-3 rounded-xl text-sm tracking-wider uppercase`}
                    >
                      Weitere Nachricht senden
                    </button>
                  </div>
                ) : (
                  /* FORM FIELDS */
                  <div className="space-y-4 md:space-y-6">
                    {/* Error Message */}
                    {status === "error" && errorMsg && (
                      <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                        {errorMsg}
                      </div>
                    )}

                    {/* Name */}
                    <div>
                      <label className={`block text-[10px] md:text-xs tracking-widest uppercase ${textFaded} mb-2 md:mb-3`}>
                        Name *
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => { setName(e.target.value); setStatus("idle"); }}
                        className={`w-full ${isDarkMode ? "liquid-glass-input" : "liquid-glass-hover"} rounded-xl px-4 md:px-6 py-3 md:py-4 text-base ${placeholder}`}
                        placeholder="Dein Name"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className={`block text-[10px] md:text-xs tracking-widest uppercase ${textFaded} mb-2 md:mb-3`}>
                        E-Mail *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
                        className={`w-full ${isDarkMode ? "liquid-glass-input" : "liquid-glass-hover"} rounded-xl px-4 md:px-6 py-3 md:py-4 text-base ${placeholder}`}
                        placeholder="deine@email.de"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className={`block text-[10px] md:text-xs tracking-widest uppercase ${textFaded} mb-2 md:mb-3`}>
                        Nachricht *
                      </label>
                      <textarea
                        value={message}
                        onChange={(e) => { setMessage(e.target.value); setStatus("idle"); }}
                        rows={6}
                        className={`w-full ${isDarkMode ? "liquid-glass-input" : "liquid-glass-hover"} rounded-xl px-4 md:px-6 py-3 md:py-4 text-base ${placeholder} resize-none`}
                        placeholder="Deine Nachricht..."
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="button"
                      disabled={status === "sending"}
                      onClick={submitForm}
                      className={`w-full ${isDarkMode ? "liquid-glass text-white" : "bg-black text-white hover:bg-black/90"} rounded-full py-3 md:py-4 text-sm tracking-wider uppercase font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
                    >
                      {status === "sending" ? (
                        <>
                          <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>Wird gesendet...</span>
                        </>
                      ) : (
                        "Nachricht senden"
                      )}
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </main>

        <footer className={`${borderColor} border-t py-8 md:py-12 px-6 md:px-16`}>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
            <div className="text-lg md:text-xl font-light tracking-[0.2em] md:tracking-[0.3em] uppercase">
              FERDINAND
            </div>
            <div className="flex items-center gap-4 md:gap-6">
              <a href="/impressum" className={`text-xs md:text-sm ${textFaded} hover:opacity-80 transition-colors`}>
                Impressum
              </a>
              <p className={`text-xs md:text-sm ${textFaded} text-center`}>
                &copy; 2026 FERDINAND Studio
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
