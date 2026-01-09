"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 py-6 md:py-8">
        <Link
          href="/"
          className="text-xl md:text-2xl font-light tracking-[0.2em] md:tracking-[0.3em] uppercase text-white"
        >
          FERDINAND
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-12 text-sm tracking-wider text-white">
          <Link
            href="/work"
            className={`transition-opacity ${
              pathname === "/work" ? "opacity-100" : "opacity-60 hover:opacity-100"
            }`}
          >
            Work
          </Link>
          <Link
            href="/about"
            className={`transition-opacity ${
              pathname === "/about" ? "opacity-100" : "opacity-60 hover:opacity-100"
            }`}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={`transition-opacity ${
              pathname === "/contact" ? "opacity-100" : "opacity-60 hover:opacity-100"
            }`}
          >
            Contact
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2 -mr-2 tap-highlight-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-sm md:hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex flex-col items-center justify-center h-full gap-8"
            >
              <Link
                href="/work"
                className={`text-3xl font-light tracking-wider transition-opacity ${
                  pathname === "/work" ? "text-white" : "text-white/60"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Work
              </Link>
              <Link
                href="/about"
                className={`text-3xl font-light tracking-wider transition-opacity ${
                  pathname === "/about" ? "text-white" : "text-white/60"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className={`text-3xl font-light tracking-wider transition-opacity ${
                  pathname === "/contact" ? "text-white" : "text-white/60"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
