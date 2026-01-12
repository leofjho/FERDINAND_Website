"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// Generate image paths dynamically
const generateImagePaths = () => {
  const imageNames = [
    "001137020001.jpg",
    "001137020002.jpg",
    "001137020003.jpg",
    "001137020004.jpg",
    "001137030001.jpg",
    "001137030002.jpg",
    "001137030003.jpg",
    "001137030004.jpg",
    "001137030005.jpg",
    "001137030006.jpg",
    "001137030007.jpg",
    "001137030008.jpg",
    "001137030009.jpg",
    "001137030010.jpg",
    "001137030011.jpg",
    "001137030012.jpg",
    "001137030013.jpg",
    "001137030014.jpg",
    "001137030015.jpg",
    "001137030016.jpg",
    "001137030017.jpg",
    "001137030018.jpg",
    "001137030019.jpg",
    "001137030020.jpg",
    "001137030021.jpg",
    "001137030022.jpg",
    "001137030023.jpg",
    "001137030024.jpg",
    "001137040001.jpg",
    "001137040002.jpg",
    "001137040003.jpg",
    "001137040004.jpg",
    "001137040005.jpg",
    "001137040006.jpg",
    "001137040007.jpg",
    "001137040008.jpg",
    "001137040009.jpg",
    "001137040010.jpg",
    "001137040011.jpg",
    "001137040012.jpg",
    "001137040013.jpg",
    "001137040014.jpg",
    "001137040015.jpg",
    "001137040016.jpg",
    "001137040017.jpg",
    "001137040018.jpg",
    "001137040019.jpg",
    "001137040020.jpg",
    "001137040021.jpg",
    "001137040022.jpg",
    "001137040023.jpg",
    "001137040024.jpg",
    "001137040025.jpg",
  ];

  return imageNames.map((name) => `/images/marokko/${name}`);
};

const IMAGES = generateImagePaths();
const TOTAL_IMAGES = IMAGES.length;

// Distance threshold for new image (in pixels)
const DISTANCE_THRESHOLD = 120;

// Image lifetime in milliseconds
const IMAGE_LIFETIME = 600;
const FADE_OUT_DURATION = 350;

// Shared title styles for perfect alignment
const TITLE_STYLES = {
  className: "text-4xl md:text-6xl lg:text-7xl font-light tracking-[0.3em] md:tracking-[0.4em] uppercase text-white",
  style: {
    textShadow: "0 2px 20px rgba(0,0,0,0.1)",
  } as React.CSSProperties,
};

interface HoverImage {
  id: number;
  src: string;
  x: number;
  y: number;
  zIndex: number;
}

export default function Home() {
  const [hoverImages, setHoverImages] = useState<HoverImage[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const imageIdCounter = useRef(0);
  const zIndexCounter = useRef(1);
  const mousePos = useRef({ x: 0, y: 0 });
  const lastImagePos = useRef({ x: -9999, y: -9999 });
  const rafId = useRef<number | null>(null);

  // No-spawn zone padding around nav (in pixels)
  const NAV_SAFE_MARGIN = 40;

  // Check if mobile/touch device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches || "ontouchstart" in window);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  // Instant cursor update using requestAnimationFrame
  const updateCursor = useCallback(() => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${mousePos.current.x - 10}px, ${mousePos.current.y - 10}px)`;
    }
    rafId.current = requestAnimationFrame(updateCursor);
  }, []);

  // Start RAF loop for cursor
  useEffect(() => {
    if (isMobile) return;

    rafId.current = requestAnimationFrame(updateCursor);

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [updateCursor, isMobile]);

  // Detect hover over clickable elements
  useEffect(() => {
    if (isMobile) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.getAttribute("role") === "button" ||
        target.closest("a") !== null ||
        target.closest("button") !== null ||
        target.closest("[role='button']") !== null;

      if (isClickable) {
        setIsHoveringClickable(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const relatedTarget = e.relatedTarget as HTMLElement | null;

      const wasClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.getAttribute("role") === "button" ||
        target.closest("a") !== null ||
        target.closest("button") !== null ||
        target.closest("[role='button']") !== null;

      const isStillClickable =
        relatedTarget &&
        (relatedTarget.tagName === "A" ||
          relatedTarget.tagName === "BUTTON" ||
          relatedTarget.getAttribute("role") === "button" ||
          relatedTarget.closest("a") !== null ||
          relatedTarget.closest("button") !== null ||
          relatedTarget.closest("[role='button']") !== null);

      if (wasClickable && !isStillClickable) {
        setIsHoveringClickable(false);
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [isMobile]);

  // Calculate distance between two points
  const getDistance = (x1: number, y1: number, x2: number, y2: number): number => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  };

  // Check if cursor is inside the nav no-spawn zone
  const isInNoSpawnZone = useCallback((x: number, y: number): boolean => {
    if (!navRef.current) return false;

    const navRect = navRef.current.getBoundingClientRect();

    // Expand the nav bounding box by the safe margin
    const expandedLeft = navRect.left - NAV_SAFE_MARGIN;
    const expandedTop = navRect.top - NAV_SAFE_MARGIN;
    const expandedRight = navRect.right + NAV_SAFE_MARGIN;
    const expandedBottom = navRect.bottom + NAV_SAFE_MARGIN;

    return (
      x >= expandedLeft &&
      x <= expandedRight &&
      y >= expandedTop &&
      y <= expandedBottom
    );
  }, [NAV_SAFE_MARGIN]);

  // Handle mouse move for cursor position and images
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isMobile) return;

      const currentX = e.clientX;
      const currentY = e.clientY;

      mousePos.current = { x: currentX, y: currentY };

      // Check if cursor is in the nav no-spawn zone
      if (isInNoSpawnZone(currentX, currentY)) {
        // Clear all images immediately when entering no-spawn zone
        setHoverImages([]);
        // Reset last image position so spawning resumes normally when leaving
        lastImagePos.current = { x: -9999, y: -9999 };
        return;
      }

      const distance = getDistance(
        lastImagePos.current.x,
        lastImagePos.current.y,
        currentX,
        currentY
      );

      if (distance < DISTANCE_THRESHOLD) return;

      lastImagePos.current = { x: currentX, y: currentY };

      const randomIndex = Math.floor(Math.random() * TOTAL_IMAGES);
      const newImage: HoverImage = {
        id: imageIdCounter.current++,
        src: IMAGES[randomIndex],
        x: currentX,
        y: currentY,
        zIndex: zIndexCounter.current++,
      };

      setHoverImages((prev) => [...prev, newImage]);

      setTimeout(() => {
        setHoverImages((prev) => prev.filter((img) => img.id !== newImage.id));
      }, IMAGE_LIFETIME + FADE_OUT_DURATION);
    },
    [isMobile, isInNoSpawnZone]
  );

  // Add mouse move listener
  useEffect(() => {
    if (isMobile) return;

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove, isMobile]);

  return (
    <div
      className="relative h-screen w-screen overflow-hidden"
      style={{ cursor: isMobile ? "auto" : "none" }}
    >
      {/* Pink Gradient Background - z-index: 0 */}
      <div
        className="fixed inset-0"
        style={{
          zIndex: 0,
          background:
            "linear-gradient(180deg, #ff69b4 0%, #ff8cc8 50%, rgba(255, 180, 224, 0.8) 100%)",
        }}
      />

      {/* ============================================
          THREE-LAYER TITLE COMPOSITION
          ============================================

          Layer 1 (Bottom): Base title - z-index: 10
          Layer 2 (Middle): Image layer - z-index: 20
          Layer 3 (Top):    Overlay title - z-index: 30

          All layers share the same parent container
          for pixel-perfect alignment.
      */}

      {/* LAYER 1: Bottom Text Layer - Base Title (z-index: 10) */}
      <div
        className="fixed inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 10 }}
      >
        <h1
          className={TITLE_STYLES.className}
          style={{
            ...TITLE_STYLES.style,
            opacity: 1, // 100% opacity - always visible
          }}
        >
          FERDINAND
        </h1>
      </div>

      {/* LAYER 2: Middle Layer - Images (z-index: 20) */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 20 }}
      >
        <AnimatePresence>
          {hoverImages.map((img) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: FADE_OUT_DURATION / 1000 } }}
              transition={{ opacity: { duration: 0.3 } }}
              style={{
                position: "fixed",
                left: `${img.x}px`,
                top: `${img.y}px`,
                transform: "translate(-50%, -50%)",
                zIndex: img.zIndex,
                width: "20vw",
                minWidth: "200px",
                maxWidth: "400px",
              }}
            >
              {/* Inner div: handles scale animation from center */}
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ scale: { duration: 0.3 } }}
                style={{ transformOrigin: "center center" }}
              >
                <div
                  style={{
                    borderRadius: "24px",
                    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={img.src}
                    alt="Hover image"
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                    }}
                  />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* LAYER 3: Top Text Layer - Overlay Title (z-index: 30) */}
      <div
        className="fixed inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 30 }}
      >
        <h1
          className={TITLE_STYLES.className}
          style={{
            ...TITLE_STYLES.style,
            opacity: 0.15, // 15% opacity - subtle overlay on images
          }}
        >
          FERDINAND
        </h1>
      </div>

      {/* Navigation - z-index: 100 (above all content layers) */}
      <nav
        ref={navRef}
        className="fixed top-0 right-0 px-6 md:px-16 py-6 md:py-8"
        style={{ zIndex: 100 }}
      >
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm tracking-wider text-white">
          <Link
            href="/work"
            className="relative px-4 py-2 opacity-80 hover:opacity-100 transition-all duration-200 rounded-lg hover:backdrop-blur-md hover:bg-white/10"
          >
            Work
          </Link>
          <Link
            href="/about"
            className="relative px-4 py-2 opacity-80 hover:opacity-100 transition-all duration-200 rounded-lg hover:backdrop-blur-md hover:bg-white/10"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="relative px-4 py-2 opacity-80 hover:opacity-100 transition-all duration-200 rounded-lg hover:backdrop-blur-md hover:bg-white/10"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2 -mr-2"
          style={{ position: "relative", zIndex: 101 }}
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

      {/* Mobile Menu Overlay - z-index: 200 */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#0a0a0a] md:hidden"
            style={{ zIndex: 200 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex flex-col items-center justify-center h-full gap-8"
            >
              <Link
                href="/"
                className="text-3xl font-light tracking-wider text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/work"
                className="text-3xl font-light tracking-wider text-white/60"
                onClick={() => setIsMenuOpen(false)}
              >
                Work
              </Link>
              <Link
                href="/about"
                className="text-3xl font-light tracking-wider text-white/60"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-3xl font-light tracking-wider text-white/60"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="mt-8 pt-8 border-t border-white/10">
                <Link
                  href="/impressum"
                  className="text-sm text-white/40 tracking-wider"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Impressum
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Cursor - z-index: 9999 (always on top) */}
      {!isMobile && (
        <div
          ref={cursorRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "20px",
            height: "20px",
            backgroundColor: "white",
            mixBlendMode: "difference",
            pointerEvents: "none",
            zIndex: 9999,
            willChange: "transform",
            // Smooth scale transition for hover effect
            transition: "width 0.2s ease-out, height 0.2s ease-out, margin 0.2s ease-out",
            ...(isHoveringClickable && {
              width: "10px",
              height: "10px",
              marginLeft: "5px",
              marginTop: "5px",
            }),
          }}
        />
      )}
    </div>
  );
}
