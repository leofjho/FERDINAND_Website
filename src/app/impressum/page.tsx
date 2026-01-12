"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Impressum() {
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
  const textSubtleColor = isDarkMode ? "text-white/80" : "text-black/80";
  const borderColor = isDarkMode ? "border-white/10" : "border-black/10";

  return (
    <div className="min-h-screen relative" style={{ cursor: "none" }}>
      <CustomCursor isPinkBackground={!transitionActive} />
      {/* Pink Background */}
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
          <div className="max-w-3xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-6xl font-extralight tracking-tight mb-12 md:mb-16"
            >
              Impressum
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="space-y-8 md:space-y-12"
            >
              {/* Angaben gemaess 5 TMG */}
              <section>
                <h2 className="text-lg md:text-xl font-light mb-4">
                  Angaben gemaeae 5 TMG
                </h2>
                <div className={`${textMutedColor} text-sm md:text-base leading-relaxed space-y-1`}>
                  <p>FERDINAND Studio</p>
                  <p>Musterstrasse 123</p>
                  <p>12345 Musterstadt</p>
                  <p>Deutschland</p>
                </div>
              </section>

              {/* Kontakt */}
              <section>
                <h2 className="text-lg md:text-xl font-light mb-4">Kontakt</h2>
                <div className={`${textMutedColor} text-sm md:text-base leading-relaxed space-y-1`}>
                  <p>Telefon: +49 (0) 123 456789</p>
                  <p>E-Mail: hello@ferdinand.studio</p>
                </div>
              </section>

              {/* Verantwortlich fuer den Inhalt */}
              <section>
                <h2 className="text-lg md:text-xl font-light mb-4">
                  Verantwortlich fuer den Inhalt nach 55 Abs. 2 RStV
                </h2>
                <div className={`${textMutedColor} text-sm md:text-base leading-relaxed space-y-1`}>
                  <p>Max Mustermann</p>
                  <p>Musterstrasse 123</p>
                  <p>12345 Musterstadt</p>
                </div>
              </section>

              {/* Haftungsausschluss */}
              <section>
                <h2 className="text-lg md:text-xl font-light mb-4">
                  Haftungsausschluss
                </h2>
                <div className={`${textMutedColor} text-sm md:text-base leading-relaxed space-y-4`}>
                  <div>
                    <h3 className={`${textSubtleColor} font-medium mb-2`}>
                      Haftung fuer Inhalte
                    </h3>
                    <p>
                      Die Inhalte unserer Seiten wurden mit groesster Sorgfalt
                      erstellt. Fuer die Richtigkeit, Vollstaendigkeit und
                      Aktualitaet der Inhalte koennen wir jedoch keine Gewaehr
                      uebernehmen.
                    </p>
                  </div>
                  <div>
                    <h3 className={`${textSubtleColor} font-medium mb-2`}>
                      Haftung fuer Links
                    </h3>
                    <p>
                      Unser Angebot enthaelt Links zu externen Webseiten
                      Dritter, auf deren Inhalte wir keinen Einfluss haben.
                      Deshalb koennen wir fuer diese fremden Inhalte auch keine
                      Gewaehr uebernehmen.
                    </p>
                  </div>
                </div>
              </section>

              {/* Urheberrecht */}
              <section>
                <h2 className="text-lg md:text-xl font-light mb-4">
                  Urheberrecht
                </h2>
                <p className={`${textMutedColor} text-sm md:text-base leading-relaxed`}>
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
                  diesen Seiten unterliegen dem deutschen Urheberrecht. Die
                  Vervielfaeltigung, Bearbeitung, Verbreitung und jede Art der
                  Verwertung ausserhalb der Grenzen des Urheberrechtes
                  beduerfen der schriftlichen Zustimmung des jeweiligen Autors
                  bzw. Erstellers.
                </p>
              </section>

              {/* Datenschutz */}
              <section>
                <h2 className="text-lg md:text-xl font-light mb-4">
                  Datenschutz
                </h2>
                <p className={`${textMutedColor} text-sm md:text-base leading-relaxed`}>
                  Die Nutzung unserer Webseite ist in der Regel ohne Angabe
                  personenbezogener Daten moeglich. Soweit auf unseren Seiten
                  personenbezogene Daten erhoben werden, erfolgt dies stets auf
                  freiwilliger Basis. Diese Daten werden ohne Ihre
                  ausdrueckliche Zustimmung nicht an Dritte weitergegeben.
                </p>
              </section>
            </motion.div>

            {/* Back Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-12 md:mt-16"
            >
              <Link
                href="/"
                className={`inline-flex items-center gap-2 text-sm ${textFadedColor} hover:opacity-80 transition-colors`}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Zurueck zur Startseite
              </Link>
            </motion.div>
          </div>
        </main>

        <footer className={`${borderColor} border-t py-8 md:py-12 px-6 md:px-16`}>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
            <div className="text-lg md:text-xl font-light tracking-[0.2em] md:tracking-[0.3em] uppercase">
              FERDINAND
            </div>
            <p className={`text-xs md:text-sm ${textFadedColor} text-center`}>
              &copy; 2026 FERDINAND Studio. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
