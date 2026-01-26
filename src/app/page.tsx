"use client";

import { useEffect, useRef, useState, useCallback, useLayoutEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { getProjectPreviews } from "@/data/projects";

// Generate image paths dynamically using AVIF format
const generateImagePaths = () => {
  const imageNames = [
    "001137020001.webp",
    "001137020002.webp",
    "001137020003.webp",
    "001137020004.webp",
    "001137030001.webp",
    "001137030002.webp",
    "001137030003.webp",
    "001137030004.webp",
    "001137030005.webp",
    "001137030006.webp",
    "001137030007.webp",
    "001137030008.webp",
    "001137030009.webp",
    "001137030010.webp",
    "001137030011.webp",
    "001137030012.webp",
    "001137030013.webp",
    "001137030014.webp",
    "001137030015.webp",
    "001137030016.webp",
    "001137030017.webp",
    "001137030018.webp",
    "001137030019.webp",
    "001137030020.webp",
    "001137030021.webp",
    "001137030022.webp",
    "001137030023.webp",
    "001137030024.webp",
    "001137040001.webp",
    "001137040002.webp",
    "001137040003.webp",
    "001137040004.webp",
    "001137040005.webp",
    "001137040006.webp",
    "001137040007.webp",
    "001137040008.webp",
    "001137040009.webp",
    "001137040010.webp",
    "001137040011.webp",
    "001137040012.webp",
    "001137040013.webp",
    "001137040014.webp",
    "001137040015.webp",
    "001137040016.webp",
    "001137040017.webp",
    "001137040018.webp",
    "001137040019.webp",
    "001137040020.webp",
    "001137040021.webp",
    "001137040022.webp",
    "001137040023.webp",
    "001137040024.webp",
    "001137040025.webp",
  ];

  return imageNames.map((name) => `/images/testfotos/${name}`);
};

const IMAGES = generateImagePaths();
const TOTAL_IMAGES = IMAGES.length;

// Distance threshold for new image (in pixels)
const DISTANCE_THRESHOLD = 120;

// Image lifetime in milliseconds
const IMAGE_LIFETIME_DESKTOP = 461;
const IMAGE_LIFETIME_MOBILE = 346;
const FADE_OUT_DURATION = 202;

// Shared title styles for perfect alignment
const TITLE_STYLES = {
  className:
    "text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] lg:tracking-[0.4em] uppercase text-white",
  style: {
    textShadow: "0 2px 20px rgba(0,0,0,0.1)",
  } as React.CSSProperties,
};

// Fixed preview dimensions for accurate centering (10% kleiner)
const PREVIEW_WIDTH_DESKTOP = 252; // px
const PREVIEW_WIDTH_MOBILE = 135; // px

// Max images for performance
const MAX_IMAGES = 24;

interface HoverImage {
  id: number;
  src: string;
  x: number; // Already centered: cursorX - width/2
  y: number; // Already centered: cursorY - height/2
  zIndex: number;
}

const projects = getProjectPreviews();

// Preload images for smoother animation
const preloadImages = () => {
  if (typeof window === "undefined") return;
  IMAGES.forEach((src) => {
    const img = new window.Image();
    img.src = src;
  });
};

export default function Home() {
  const [hoverImages, setHoverImages] = useState<HoverImage[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [imagesPreloaded, setImagesPreloaded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isInHeroSection, setIsInHeroSection] = useState(true);
  const [currentProjectIndex, setCurrentProjectIndex] = useState<number | null>(null);
  const prevProjectIndexRef = useRef<number | null>(null);
  // Track if transitioning from "Projekte" view (null) to a project
  const isFirstOpen = prevProjectIndexRef.current === null && currentProjectIndex !== null;
  // Track if transitioning from a project back to "Projekte" view
  const isClosing = prevProjectIndexRef.current !== null && currentProjectIndex === null;
  // Update ref after render
  useEffect(() => {
    prevProjectIndexRef.current = currentProjectIndex;
  }, [currentProjectIndex]);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showWeiterPulse, setShowWeiterPulse] = useState(false);
  const [scrollUnlocked, setScrollUnlocked] = useState(true); // Scroll immer aktiviert
  const [globalHoveredProject, setGlobalHoveredProject] = useState<number | null>(null); // Für globale Kachel-Hover

  // Contact form state
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactStatus, setContactStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [contactError, setContactError] = useState("");

  // Scroll preservation for contact form
  const contactScrollPosRef = useRef<number | null>(null);
  const isContactSubmittingRef = useRef(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorBlueRef = useRef<HTMLDivElement>(null);
  const workSectionRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const imageIdCounter = useRef(0);
  const zIndexCounter = useRef(1);
  const mousePos = useRef({ x: 0, y: 0 });
  const lastImagePos = useRef({ x: -9999, y: -9999 });
  const rafId = useRef<number | null>(null);

  // No-spawn zone padding around nav (in pixels)
  const NAV_SAFE_MARGIN = 40;
  // No-spawn zone around "Weiter" button on mobile
  const WEITER_BUTTON_MARGIN = 80;
  const weiterButtonRef = useRef<HTMLButtonElement>(null);

  // Haptic feedback helper (nur für Geräte die es unterstützen)
  const triggerHaptic = useCallback((duration: number | number[] = 10) => {
    if (isMobile && navigator.vibrate) {
      try {
        navigator.vibrate(duration);
      } catch (e) {
        // Ignoriere Fehler, nicht alle Geräte unterstützen Vibration
      }
    }
  }, [isMobile]);

  // Scroll to top on page load/refresh
  useEffect(() => {
    window.scrollTo(0, 0);
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  // Preload images on mount for smoother animation
  useEffect(() => {
    preloadImages();
    setImagesPreloaded(true);
  }, []);

  // Detect system color scheme preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Check if mobile/touch device
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.matchMedia("(max-width: 768px)").matches ||
          "ontouchstart" in window;
      setIsMobile(mobile);
      // On mobile, always have a project selected for swipe navigation
      if (mobile && currentProjectIndex === null) {
        setCurrentProjectIndex(0);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [currentProjectIndex]);

  // Track if user is at the very top of the page (for mobile scroll lock)
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const checkIfAtTop = () => {
      setIsAtTop(window.scrollY < 10);
    };
    window.addEventListener("scroll", checkIfAtTop, { passive: true });
    checkIfAtTop();
    return () => window.removeEventListener("scroll", checkIfAtTop);
  }, []);

  // Pulse animation for Weiter button after 2.5s (both mobile and desktop when scroll locked)
  useEffect(() => {
    if (!scrollUnlocked) {
      const timer = setTimeout(() => {
        setShowWeiterPulse(true);
      }, 2500);

      return () => {
        clearTimeout(timer);
        setShowWeiterPulse(false);
      };
    } else {
      setShowWeiterPulse(false);
    }
  }, [scrollUnlocked]);

  // Prevent scroll when menu is open OR scroll not yet unlocked (both mobile and desktop)
  useEffect(() => {
    const preventScroll = (e: Event) => {
      if (!scrollUnlocked || isMenuOpen) {
        e.preventDefault();
      }
    };

    if (isMenuOpen || !scrollUnlocked) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      // Block wheel and touch scroll events
      window.addEventListener("wheel", preventScroll, { passive: false });
      window.addEventListener("touchmove", preventScroll, { passive: false });
    } else {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
    };
  }, [isMenuOpen, scrollUnlocked]);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;

      // Check if in hero section
      const inHero = scrollTop < viewportHeight * 0.8;
      setIsInHeroSection(inHero);

      // Determine active section based on actual section positions
      // Check which section the navigation bar (at top of screen) is currently over
      const sections = ["home", "work", "about", "contact"];
      let newSection = "home";
      const navHeight = 80; // Approximate height where nav buttons are

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Section is active if the nav bar is inside this section
          // (section top is above nav, section bottom is below nav)
          if (rect.top <= navHeight && rect.bottom > navHeight) {
            newSection = sectionId;
          }
        }
      }

      setActiveSection(newSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = useCallback((sectionId: string) => {
    // Temporarily unlock scroll for navigation
    document.body.style.overflow = "unset";

    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  }, []);

  // CONTACT FORM: Scroll restoration - runs BEFORE browser paint
  useLayoutEffect(() => {
    if (contactScrollPosRef.current !== null && isContactSubmittingRef.current) {
      const html = document.documentElement;
      const originalScrollBehavior = html.style.scrollBehavior;
      html.style.scrollBehavior = 'auto';
      window.scrollTo(0, contactScrollPosRef.current);
      requestAnimationFrame(() => {
        html.style.scrollBehavior = originalScrollBehavior;
        contactScrollPosRef.current = null;
        isContactSubmittingRef.current = false;
      });
    }
  }, [contactStatus]);

  // CONTACT FORM: Submit handler
  const submitContactForm = useCallback(async () => {
    // Validation
    if (!contactName.trim()) {
      setContactError("Bitte gib deinen Namen ein.");
      setContactStatus("error");
      return;
    }
    if (!contactEmail.trim() || !contactEmail.includes("@")) {
      setContactError("Bitte gib eine gültige E-Mail ein.");
      setContactStatus("error");
      return;
    }
    if (!contactMessage.trim()) {
      setContactError("Bitte gib eine Nachricht ein.");
      setContactStatus("error");
      return;
    }

    // Capture scroll position BEFORE state changes
    contactScrollPosRef.current = window.scrollY;
    isContactSubmittingRef.current = true;

    setContactStatus("sending");
    setContactError("");

    try {
      const data = new FormData();
      data.append("name", contactName);
      data.append("email", contactEmail);
      data.append("_subject", "Neue Kontaktanfrage von ferdinand.studio");
      data.append("message", contactMessage);

      const res = await fetch("https://formspree.io/f/mpqqwzza", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        contactScrollPosRef.current = window.scrollY;
        setContactStatus("success");
        setContactName("");
        setContactEmail("");
        setContactMessage("");
      } else {
        contactScrollPosRef.current = window.scrollY;
        setContactStatus("error");
        setContactError("Fehler beim Senden. Bitte versuche es erneut.");
      }
    } catch {
      contactScrollPosRef.current = window.scrollY;
      setContactStatus("error");
      setContactError("Netzwerkfehler. Bitte prüfe deine Verbindung.");
    }
  }, [contactName, contactEmail, contactMessage]);

  // Navigate projects (for mobile swipe)
  const prevProject = useCallback(() => {
    triggerHaptic([10, 50, 10]);
    setCurrentProjectIndex((prev) => {
      if (prev === null) return projects.length - 1;
      return prev === 0 ? projects.length - 1 : prev - 1;
    });
  }, [triggerHaptic]);

  const nextProject = useCallback(() => {
    triggerHaptic([10, 50, 10]);
    setCurrentProjectIndex((prev) => {
      if (prev === null) return 0;
      return prev === projects.length - 1 ? 0 : prev + 1;
    });
  }, [triggerHaptic]);

  // Touch swipe handlers for mobile project slider
  const minSwipeDistance = 50;

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextProject();
    } else if (isRightSwipe) {
      prevProject();
    }
  }, [touchStart, touchEnd, nextProject, prevProject]);

  // Instant cursor update using requestAnimationFrame (Desktop only)
  const updateCursor = useCallback(() => {
    const transform = `translate(${mousePos.current.x - 10}px, ${mousePos.current.y - 10}px)`;
    if (cursorRef.current) {
      cursorRef.current.style.transform = transform;
    }
    if (cursorBlueRef.current) {
      cursorBlueRef.current.style.transform = transform;
    }
    rafId.current = requestAnimationFrame(updateCursor);
  }, []);

  // Start RAF loop for cursor (Desktop only)
  useEffect(() => {
    if (isMobile) return;

    rafId.current = requestAnimationFrame(updateCursor);

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [updateCursor, isMobile]);

  // Detect hover over clickable elements (Desktop only)
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
  const getDistance = (
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ): number => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  };

  // Check if cursor is inside the nav no-spawn zone
  const isInNoSpawnZone = useCallback(
    (x: number, y: number): boolean => {
      if (!navRef.current) return false;

      const navRect = navRef.current.getBoundingClientRect();

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
    },
    [NAV_SAFE_MARGIN]
  );

  // Check if cursor is inside the "Weiter" button no-spawn zone (when scroll locked)
  const isInWeiterButtonZone = useCallback(
    (x: number, y: number): boolean => {
      // Only check when scroll is locked and button is visible
      if (scrollUnlocked || !weiterButtonRef.current) return false;

      const buttonRect = weiterButtonRef.current.getBoundingClientRect();

      const expandedLeft = buttonRect.left - WEITER_BUTTON_MARGIN;
      const expandedTop = buttonRect.top - WEITER_BUTTON_MARGIN;
      const expandedRight = buttonRect.right + WEITER_BUTTON_MARGIN;
      const expandedBottom = buttonRect.bottom + WEITER_BUTTON_MARGIN;

      return (
        x >= expandedLeft &&
        x <= expandedRight &&
        y >= expandedTop &&
        y <= expandedBottom
      );
    },
    [scrollUnlocked, WEITER_BUTTON_MARGIN]
  );

  // Spawn image at position (shared logic for mouse and touch)
  const spawnImageAtPosition = useCallback(
    (x: number, y: number) => {
      // Only spawn images when in hero section AND cursor is within hero bounds
      if (!isInHeroSection) return;

      // Max images check
      if (hoverImages.length >= MAX_IMAGES) {
        return;
      }

      // Check if position is within the hero section bounds
      if (heroRef.current) {
        const heroRect = heroRef.current.getBoundingClientRect();
        if (y < heroRect.top || y > heroRect.bottom || x < heroRect.left || x > heroRect.right) {
          return; // Don't spawn if outside hero section
        }
      }

      // Check if position is in the nav no-spawn zone
      if (isInNoSpawnZone(x, y)) {
        setHoverImages([]);
        lastImagePos.current = { x: -9999, y: -9999 };
        return;
      }

      // Check if position is in the "Weiter" button no-spawn zone (mobile)
      if (isInWeiterButtonZone(x, y)) {
        return;
      }

      const distance = getDistance(
        lastImagePos.current.x,
        lastImagePos.current.y,
        x,
        y
      );

      // Use smaller threshold on mobile for more responsive feel
      const threshold = isMobile ? 60 : DISTANCE_THRESHOLD;
      if (distance < threshold) return;

      lastImagePos.current = { x, y };

      // Calculate centered position: cursor should be at exact center of preview
      const previewWidth = isMobile ? PREVIEW_WIDTH_MOBILE : PREVIEW_WIDTH_DESKTOP;
      // Images are landscape (~3:2 ratio), so height ≈ width * 0.67
      const previewHeight = previewWidth * 0.67;

      const centeredX = x - previewWidth / 2;
      const centeredY = y - previewHeight / 2;

      const randomIndex = Math.floor(Math.random() * TOTAL_IMAGES);
      const newImage: HoverImage = {
        id: imageIdCounter.current++,
        src: IMAGES[randomIndex],
        x: centeredX,
        y: centeredY,
        zIndex: zIndexCounter.current++,
      };

      // Limit to 6 images max for performance
      setHoverImages((prev) => {
        const updated = [...prev, newImage];
        return updated.slice(-6);
      });

      const lifetime = isMobile ? IMAGE_LIFETIME_MOBILE : IMAGE_LIFETIME_DESKTOP;
      setTimeout(() => {
        setHoverImages((prev) => prev.filter((img) => img.id !== newImage.id));
      }, lifetime + FADE_OUT_DURATION);
    },
    [isInNoSpawnZone, isInWeiterButtonZone, isInHeroSection, isMobile, hoverImages.length]
  );

  // Handle mouse move for cursor position and images (Desktop only)
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isMobile) return;

      const currentX = e.clientX;
      const currentY = e.clientY;

      mousePos.current = { x: currentX, y: currentY };
      spawnImageAtPosition(currentX, currentY);
    },
    [isMobile, spawnImageAtPosition]
  );

  // Handle touch move for mobile image spawning
  const handleHeroTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isMobile) return;

      const touch = e.touches[0];
      if (touch) {
        spawnImageAtPosition(touch.clientX, touch.clientY);
      }
    },
    [isMobile, spawnImageAtPosition]
  );

  // Handle touch start - spawn first image immediately
  const handleHeroTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!isMobile) return;

      lastImagePos.current = { x: -9999, y: -9999 };

      const touch = e.touches[0];
      if (touch) {
        spawnImageAtPosition(touch.clientX, touch.clientY);
      }
    },
    [isMobile, spawnImageAtPosition]
  );

  // Add mouse move listener (Desktop only)
  useEffect(() => {
    if (isMobile) return;

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove, isMobile]);

  return (
    <div
      className="relative w-screen"
      style={{
        cursor: isMobile ? "auto" : "none",
      }}
    >
      {/* Fixed Navigation */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 px-6 md:px-16 py-6 md:py-8 flex items-center justify-between"
        style={{ zIndex: 100 }}
      >
        {/* Logo - hidden on hero, visible from work section onwards */}
        {/* Color adapts: black on white bg (work section without project), white on dark bg */}
        <button
          onClick={() => scrollToSection("home")}
          className={`text-xl md:text-2xl font-light tracking-[0.2em] md:tracking-[0.3em] uppercase transition-all duration-300 ${
            isInHeroSection ? "opacity-0 pointer-events-none" : "opacity-100"
          } ${
            activeSection === "work"
              ? "text-black"
              : "text-white"
          }`}
          style={{ minHeight: '44px' }}
        >
          FERDINAND
        </button>

        {/* Desktop Menu */}
        <div className={`hidden md:flex items-center gap-4 text-sm tracking-wider transition-colors duration-300 ${
          activeSection === "work"
            ? "text-black"
            : "text-white"
        }`}>
          <button
            onClick={() => scrollToSection("work")}
            className={`px-5 py-2.5 rounded-full liquid-glass-hover ${
              activeSection === "work"
                ? "opacity-100"
                : "opacity-90 hover:opacity-100"
            }`}
          >
            Work
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className={`px-5 py-2.5 rounded-full liquid-glass-hover ${
              activeSection === "about"
                ? "opacity-100"
                : "opacity-90 hover:opacity-100"
            }`}
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className={`px-5 py-2.5 rounded-full liquid-glass-hover ${
              activeSection === "contact"
                ? "opacity-100"
                : "opacity-90 hover:opacity-100"
            }`}
          >
            Contact
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden p-3 -mr-3 transition-colors duration-300 ${
            activeSection === "work" && !isMenuOpen
              ? "text-black"
              : "text-white"
          }`}
          style={{ position: "relative", zIndex: 101, minHeight: '44px', minWidth: '44px' }}
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
            className="fixed inset-0 liquid-glass-overlay md:hidden"
            style={{ zIndex: 200 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex flex-col items-center justify-center h-full gap-8"
            >
              <button
                onClick={() => scrollToSection("home")}
                className={`text-3xl font-light tracking-wider ${
                  activeSection === "home" ? "text-white" : "text-white/60"
                }`}
                style={{ minHeight: '44px', minWidth: '44px' }}
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("work")}
                className={`text-3xl font-light tracking-wider ${
                  activeSection === "work" ? "text-white" : "text-white/60"
                }`}
                style={{ minHeight: '44px', minWidth: '44px' }}
              >
                Work
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className={`text-3xl font-light tracking-wider ${
                  activeSection === "about" ? "text-white" : "text-white/60"
                }`}
                style={{ minHeight: '44px', minWidth: '44px' }}
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className={`text-3xl font-light tracking-wider ${
                  activeSection === "contact" ? "text-white" : "text-white/60"
                }`}
                style={{ minHeight: '44px', minWidth: '44px' }}
              >
                Contact
              </button>
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

      {/* Main Content */}
      <div className="w-full" style={{ margin: 0, padding: 0, overflow: "visible" }}>
        {/* ============================================
            HERO SECTION - Pink Background with Cursor Effect
            ============================================ */}
        <section
          ref={heroRef}
          id="home"
          className={`w-full relative ${isMobile ? "touch-none" : ""}`}
          style={{
            // Mobile: use dynamic viewport height for better mobile browser support
            minHeight: isMobile ? "100dvh" : "100vh",
            height: isMobile ? "100dvh" : "100vh",
            overflow: "visible",
          }}
          onTouchStart={handleHeroTouchStart}
          onTouchMove={handleHeroTouchMove}
        >
          {/* Pink background that extends into notch/safe area */}
          <div
            style={{
              position: "absolute",
              top: isMobile ? "calc(-1 * env(safe-area-inset-top, 0px) - 50px)" : "0",
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(180deg, #ff69b4 0%, #ff69b4 150px, #ff8cc8 50%, rgba(255, 180, 224, 0.8) 100%)",
              zIndex: 0,
            }}
          />
          {/* LAYER 1: Bottom Text Layer - Base Title */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ zIndex: 10 }}
          >
            <h1
              className={TITLE_STYLES.className}
              style={{
                ...TITLE_STYLES.style,
                opacity: 1,
              }}
            >
              FERDINAND
            </h1>
          </div>

          {/* LAYER 2: Middle Layer - Images */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ zIndex: 20 }}
          >
            <AnimatePresence mode="popLayout">
              {hoverImages.map((img) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.2,
                    ease: "easeOut"
                  }}
                  style={{
                    position: "fixed",
                    // Position is pre-calculated to be centered on cursor
                    left: img.x,
                    top: img.y,
                    // Fixed width for accurate centering calculation
                    width: isMobile ? PREVIEW_WIDTH_MOBILE : PREVIEW_WIDTH_DESKTOP,
                    zIndex: img.zIndex,
                    // Scale from center - critical for centered appearance
                    transformOrigin: "center center",
                    willChange: "transform, opacity",
                    pointerEvents: "none",
                  }}
                >
                  <div
                    style={{
                      borderRadius: "12px",
                      boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={img.src}
                      alt=""
                      loading="eager"
                      decoding="async"
                      style={{
                        width: "100%",
                        height: "auto",
                        display: "block",
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* LAYER 3: Top Text Layer - Overlay Title */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ zIndex: 30 }}
          >
            <h1
              className={TITLE_STYLES.className}
              style={{
                ...TITLE_STYLES.style,
                opacity: 0.34,
              }}
            >
              FERDINAND
            </h1>
          </div>

          {/* Weiter Button - shown when scroll is locked, for both mobile and desktop */}
          {!scrollUnlocked && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.8 }}
              className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
              style={{
                zIndex: 40,
                bottom: isMobile ? "calc(env(safe-area-inset-bottom, 24px) + 80px)" : "48px"
              }}
            >
              <button
                ref={weiterButtonRef}
                onClick={() => {
                  triggerHaptic(20);
                  setScrollUnlocked(true);
                  scrollToSection("work");
                }}
                className={`flex items-center gap-3 px-8 py-4 rounded-full liquid-glass-hover text-white text-sm tracking-widest uppercase ${showWeiterPulse ? 'pulse-after-delay' : ''}`}
                style={{ minHeight: '52px' }}
              >
                <span>Weiter</span>
                <motion.svg
                  animate={{ y: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </motion.svg>
              </button>
            </motion.div>
          )}
        </section>

        {/* ============================================
            WORK SECTION - Editorial Style with Overlapping Images
            ============================================ */}
        <section
          ref={workSectionRef}
          id="work"
          className="w-full min-h-screen relative bg-white py-24 md:py-32 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-16">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-16 md:mb-24"
            >
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-extralight tracking-tight text-black mb-6">
                Selected Work
              </h2>
              <p className="text-base md:text-lg text-black/60 max-w-2xl leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </motion.div>

            {/* Mobile: Swipeable Project Carousel */}
            {isMobile ? (
              <div className="relative w-full">
                {/* Swipeable Project Carousel */}
                <div
                  className="relative overflow-hidden rounded-2xl"
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentProjectIndex}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                      className="relative w-full aspect-[3/4] overflow-hidden"
                    >
                      <Link href={`/work/${projects[currentProjectIndex ?? 0].slug}`}>
                        <Image
                          src={projects[currentProjectIndex ?? 0].fullImage.src}
                          alt={projects[currentProjectIndex ?? 0].title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <p className="text-xs tracking-widest uppercase text-white/60 mb-2">
                            {projects[currentProjectIndex ?? 0].category}
                          </p>
                          <h3 className="text-2xl font-light text-white">
                            {projects[currentProjectIndex ?? 0].title}
                          </h3>
                        </div>
                      </Link>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center gap-3 mt-6">
                  {projects.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentProjectIndex(index)}
                      className="relative p-3"
                      style={{ minHeight: '44px', minWidth: '44px' }}
                      aria-label={`Go to project ${index + 1}`}
                    >
                      <span className={`block w-2 h-2 rounded-full transition-all ${
                        currentProjectIndex === index ? "bg-black w-6" : "bg-black/20"
                      }`} />
                    </button>
                  ))}
                </div>

                <p className="text-center text-xs text-black/40 mt-4">
                  Wischen zum Durchblättern
                </p>
              </div>
            ) : (
              /* Desktop: Editorial Image Grid - Asymmetric Overlapping Layout */
              <>
                <div className="relative">
                  {/* Row 1 - Large left, small right */}
                  <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-4 md:mb-8">
                    <motion.div
                      initial={{ opacity: 0, y: 60 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.1 }}
                      className="relative w-full md:w-[60%] aspect-[4/3] md:aspect-[16/10] overflow-hidden group"
                    >
                      <Image
                        src={projects[0]?.fullImage.src || "/images/projects/voumbii.jpg"}
                        alt="Featured work"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 60 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="relative w-full md:w-[40%] aspect-[4/3] md:aspect-[3/4] overflow-hidden group md:-mt-12"
                    >
                      <Image
                        src={projects[1]?.fullImage.src || "/images/projects/event_full.jpg"}
                        alt="Featured work"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                    </motion.div>
                  </div>

                  {/* Row 2 - Three columns with offset */}
                  <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-4 md:mb-8">
                    <motion.div
                      initial={{ opacity: 0, y: 60 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.15 }}
                      className="relative w-full md:w-[30%] aspect-[3/4] overflow-hidden group md:mt-8"
                    >
                      <Image
                        src={projects[2]?.fullImage.src || "/images/projects/website_shooting.jpg"}
                        alt="Featured work"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 60 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.25 }}
                      className="relative w-full md:w-[45%] aspect-[4/3] md:aspect-[16/9] overflow-hidden group md:-mt-16"
                    >
                      <Image
                        src={projects[3]?.fullImage.src || "/images/projects/event2_full.jpg"}
                        alt="Featured work"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 60 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.35 }}
                      className="relative w-full md:w-[25%] aspect-[3/4] md:aspect-[2/3] overflow-hidden group md:mt-24"
                    >
                      <Image
                        src={projects[4]?.fullImage.src || "/images/projects/motorsport.jpg"}
                        alt="Featured work"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                    </motion.div>
                  </div>
                </div>

                {/* Hint text - Desktop only */}
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="mt-12 text-left text-sm text-black/40"
                >
                  Für weitere Projektdetails auf die Kacheln klicken
                </motion.p>
              </>
            )}

          </div>
        </section>

        {/* ============================================
            ABOUT SECTION
            ============================================ */}
        <section id="about" className={`w-full min-h-screen relative transition-colors duration-500 ${isDarkMode ? "bg-[#0a0a0a]" : "bg-white"}`}>
          <div className="flex items-center py-24 md:py-32">
            <div className="w-full max-w-6xl mx-auto px-6 md:px-16">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8 }}
              >
                <h2 className={`text-4xl md:text-6xl font-extralight tracking-tight mb-12 ${isDarkMode ? "text-white" : "text-black"}`}>
                  About FERDINAND
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                  <div>
                    <h3 className={`text-2xl font-light mb-6 ${isDarkMode ? "text-white" : "text-black"}`}>
                      Our Story
                    </h3>
                    <p className={`leading-relaxed mb-6 ${isDarkMode ? "text-white/60" : "text-black/60"}`}>
                      We are a creative studio specializing in visual
                      storytelling, brand identity, and digital experiences. Our
                      team brings together diverse perspectives to create work
                      that resonates.
                    </p>
                    <p className={`leading-relaxed ${isDarkMode ? "text-white/60" : "text-black/60"}`}>
                      Every project is an opportunity to push boundaries and
                      craft something meaningful. We believe in the power of
                      design to transform and inspire.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
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
                    ].map((service, i) => (
                      <div
                        key={i}
                        className={`p-5 md:p-6 rounded-xl transition-all active:scale-[0.98] ${isDarkMode ? "bg-white/5 hover:bg-white/10" : "bg-black/5 hover:bg-black/10"}`}
                      >
                        <h4 className={`text-lg font-light mb-2 ${isDarkMode ? "text-white" : "text-black"}`}>
                          {service.title}
                        </h4>
                        <p className={`text-sm leading-relaxed ${isDarkMode ? "text-white/60" : "text-black/60"}`}>
                          {service.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ============================================
            CONTACT SECTION
            ============================================ */}
        <section id="contact" className={`w-full min-h-screen relative transition-colors duration-500 ${isDarkMode ? "bg-[#0a0a0a]" : "bg-white"}`}>
          <div className="flex items-center py-24 md:py-32">
            <div className="w-full max-w-6xl mx-auto px-6 md:px-16">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8 }}
              >
                <h2 className={`text-4xl md:text-6xl font-extralight tracking-tight mb-6 ${isDarkMode ? "text-white" : "text-black"}`}>
                  Let&apos;s Create Together
                </h2>
                <p className={`text-lg max-w-xl mb-12 ${isDarkMode ? "text-white/60" : "text-black/60"}`}>
                  Have a project in mind? We&apos;d love to hear about it.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                  <div>
                    <div className="mb-8">
                      <h3 className={`text-xs tracking-widest uppercase mb-4 ${isDarkMode ? "text-white/40" : "text-black/40"}`}>
                        Email
                      </h3>
                      <a
                        href="mailto:hello@ferdinand.studio"
                        className={`text-2xl font-light hover:opacity-60 transition-colors ${isDarkMode ? "text-white" : "text-black"}`}
                        style={{ minHeight: '44px', display: 'inline-block', paddingTop: '4px', paddingBottom: '4px' }}
                      >
                        hello@ferdinand.studio
                      </a>
                    </div>

                    <div className="mb-8">
                      <h3 className={`text-xs tracking-widest uppercase mb-4 ${isDarkMode ? "text-white/40" : "text-black/40"}`}>
                        Social
                      </h3>
                      <div className="flex flex-col gap-1 items-start">
                        <a
                          href="#"
                          className={`inline-block text-lg font-light hover:opacity-60 transition-colors py-2 ${isDarkMode ? "text-white" : "text-black"}`}
                          style={{ minHeight: '44px' }}
                        >
                          Instagram
                        </a>
                        <a
                          href="#"
                          className={`inline-block text-lg font-light hover:opacity-60 transition-colors py-2 ${isDarkMode ? "text-white" : "text-black"}`}
                          style={{ minHeight: '44px' }}
                        >
                          Twitter
                        </a>
                        <a
                          href="#"
                          className={`inline-block text-lg font-light hover:opacity-60 transition-colors py-2 ${isDarkMode ? "text-white" : "text-black"}`}
                          style={{ minHeight: '44px' }}
                        >
                          LinkedIn
                        </a>
                      </div>
                    </div>

                    <div>
                      <h3 className={`text-xs tracking-widest uppercase mb-4 ${isDarkMode ? "text-white/40" : "text-black/40"}`}>
                        Location
                      </h3>
                      <p className={`text-lg font-light ${isDarkMode ? "text-white/60" : "text-black/60"}`}>
                        Cologne, Germany
                      </p>
                    </div>
                  </div>

                  <div style={{ minHeight: "400px" }}>
                    {contactStatus === "success" ? (
                      /* SUCCESS MESSAGE */
                      <div className={`rounded-2xl p-8 md:p-12 text-center ${
                        isDarkMode
                          ? "bg-white/5 border border-green-500/30"
                          : "bg-black/5 border border-green-600/30"
                      }`}>
                        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
                          <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h3 className={`text-2xl md:text-3xl font-light mb-3 tracking-tight ${isDarkMode ? "text-white" : "text-black"}`}>
                          Nachricht gesendet!
                        </h3>
                        <p className={`text-base md:text-lg mb-8 ${isDarkMode ? "text-white/60" : "text-black/60"}`}>
                          Vielen Dank! Wir melden uns so schnell wie möglich.
                        </p>
                        <button
                          type="button"
                          onClick={() => setContactStatus("idle")}
                          className={`text-sm tracking-wider uppercase transition-colors ${
                            isDarkMode ? "text-white/60 hover:text-white" : "text-black/60 hover:text-black"
                          }`}
                        >
                          Weitere Nachricht senden
                        </button>
                      </div>
                    ) : (
                      /* FORM FIELDS */
                      <div className="space-y-6">
                        {/* Error Message */}
                        {contactStatus === "error" && contactError && (
                          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                            {contactError}
                          </div>
                        )}

                        <div>
                          <label className={`block text-xs tracking-widest uppercase mb-3 ${isDarkMode ? "text-white/40" : "text-black/40"}`}>
                            Name *
                          </label>
                          <input
                            type="text"
                            value={contactName}
                            onChange={(e) => { setContactName(e.target.value); setContactStatus("idle"); }}
                            className={`w-full rounded-xl px-6 py-4 focus:outline-none transition-colors ${
                              isDarkMode
                                ? "bg-white/5 border border-white/10 focus:border-white/30 text-white placeholder-white/30"
                                : "bg-black/5 border border-black/10 focus:border-black/30 text-black placeholder-black/30"
                            }`}
                            style={{ minHeight: '52px' }}
                            placeholder="Dein Name"
                          />
                        </div>
                        <div>
                          <label className={`block text-xs tracking-widest uppercase mb-3 ${isDarkMode ? "text-white/40" : "text-black/40"}`}>
                            E-Mail *
                          </label>
                          <input
                            type="email"
                            value={contactEmail}
                            onChange={(e) => { setContactEmail(e.target.value); setContactStatus("idle"); }}
                            className={`w-full rounded-xl px-6 py-4 focus:outline-none transition-colors ${
                              isDarkMode
                                ? "bg-white/5 border border-white/10 focus:border-white/30 text-white placeholder-white/30"
                                : "bg-black/5 border border-black/10 focus:border-black/30 text-black placeholder-black/30"
                            }`}
                            style={{ minHeight: '52px' }}
                            placeholder="deine@email.de"
                          />
                        </div>
                        <div>
                          <label className={`block text-xs tracking-widest uppercase mb-3 ${isDarkMode ? "text-white/40" : "text-black/40"}`}>
                            Nachricht *
                          </label>
                          <textarea
                            value={contactMessage}
                            onChange={(e) => { setContactMessage(e.target.value); setContactStatus("idle"); }}
                            rows={4}
                            className={`w-full rounded-xl px-6 py-4 focus:outline-none transition-colors resize-none ${
                              isDarkMode
                                ? "bg-white/5 border border-white/10 focus:border-white/30 text-white placeholder-white/30"
                                : "bg-black/5 border border-black/10 focus:border-black/30 text-black placeholder-black/30"
                            }`}
                            placeholder="Erzähl uns von deinem Projekt..."
                          />
                        </div>
                        <button
                          type="button"
                          disabled={contactStatus === "sending"}
                          onClick={submitContactForm}
                          className={`w-full rounded-full py-4 text-sm tracking-wider uppercase font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] ${
                            isDarkMode
                              ? "bg-white text-black hover:bg-white/90"
                              : "bg-black text-white hover:bg-black/90"
                          }`}
                          style={{ minHeight: '52px' }}
                        >
                          {contactStatus === "sending" ? (
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
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Footer */}
          <div className={`border-t py-8 px-6 md:px-16 mt-auto ${isDarkMode ? "border-white/10" : "border-black/10"}`}>
            <div className={`max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 ${isDarkMode ? "text-white/40" : "text-black/40"}`}>
              <div className="text-xl font-light tracking-[0.3em] uppercase">
                FERDINAND
              </div>
              <div className="flex items-center gap-6">
                <Link
                  href="/impressum"
                  className="text-sm px-4 py-2 rounded-full liquid-glass-hover hover:opacity-80 transition-all"
                >
                  Impressum
                </Link>
                <p className="text-sm">&copy; 2025 FERDINAND Studio</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ============================================
          GLOBAL PROJECT TILES - Fixed at bottom, always visible
          ============================================ */}
      {!isMobile && (
        <>
          {/* Fullscreen Project Overlay */}
          <AnimatePresence>
            {globalHoveredProject !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="fixed inset-0 z-40 pointer-events-none"
              >
                <Image
                  src={projects[globalHoveredProject].fullImage.src}
                  alt={projects[globalHoveredProject].fullImage.alt}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
                {/* Gradient Overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.5) 50%, rgba(10,10,10,0.85) 100%)",
                  }}
                />
                {/* Project Info */}
                <div className="absolute bottom-32 left-0 right-0 px-16">
                  <div className="max-w-6xl mx-auto">
                    <p className="text-sm tracking-widest uppercase text-white/60 mb-2">
                      {projects[globalHoveredProject].category} — {projects[globalHoveredProject].year}
                    </p>
                    <h2 className="text-6xl lg:text-7xl font-extralight tracking-tight text-white mb-4">
                      {projects[globalHoveredProject].title}
                    </h2>
                    <p className="text-lg max-w-xl text-white/70">
                      {projects[globalHoveredProject].shortDescription}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Fixed Tile Strip */}
          <div
            className="fixed bottom-8 left-0 right-0 z-50 px-16 pointer-events-none"
            onMouseLeave={() => setGlobalHoveredProject(null)}
          >
            <motion.div
              className="flex items-end justify-center gap-1 pointer-events-auto w-fit mx-auto"
              layout
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {projects.map((project, index) => {
                const isActive = globalHoveredProject === index;
                return (
                  <Link
                    key={project.slug}
                    href={`/work/${project.slug}`}
                  >
                    <motion.div
                      layout
                      onMouseEnter={() => setGlobalHoveredProject(index)}
                      className="relative cursor-pointer"
                      animate={{
                        opacity: isActive ? 1 : 0.7,
                        y: isActive ? -8 : 0,
                      }}
                      whileHover={{
                        opacity: 1,
                        y: -8,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 28,
                        opacity: { duration: 0.15, ease: "easeOut" }
                      }}
                    >
                      <motion.div
                        className="relative overflow-hidden"
                        animate={{
                          width: isActive ? 40 : 29,
                          height: isActive ? 140 : 102,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 28
                        }}
                      >
                        {project.thumbnailVideo ? (
                          <video
                            src={project.thumbnailVideo.src}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        ) : (
                          <Image
                            src={project.thumbnail.src}
                            alt={project.title}
                            fill
                            className="object-cover"
                            sizes="50px"
                          />
                        )}
                      </motion.div>
                    </motion.div>
                  </Link>
                );
              })}
            </motion.div>
          </div>
        </>
      )}

      {/* Custom Cursor - Desktop only */}
      {!isMobile && (
        <>
          {/* Layer 1: Inversion layer */}
          <div
            ref={cursorRef}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "20px",
              height: "20px",
              borderRadius: "6px",
              backgroundColor: "white",
              mixBlendMode: "difference",
              pointerEvents: "none",
              zIndex: 9998,
              willChange: "transform",
              transition:
                "width 0.2s ease-out, height 0.2s ease-out, margin 0.2s ease-out",
              ...(isHoveringClickable && {
                width: "10px",
                height: "10px",
                marginLeft: "5px",
                marginTop: "5px",
              }),
            }}
          />
          {/* Layer 2: Blue overlay for pink background */}
          <div
            ref={cursorBlueRef}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "20px",
              height: "20px",
              borderRadius: "6px",
              backgroundColor: "#B0E0E6",
              mixBlendMode: "screen",
              opacity: isInHeroSection ? 0.7 : 0,
              pointerEvents: "none",
              zIndex: 9999,
              willChange: "transform",
              transition:
                "width 0.2s ease-out, height 0.2s ease-out, margin 0.2s ease-out, opacity 0.3s ease-out",
              ...(isHoveringClickable && {
                width: "10px",
                height: "10px",
                marginLeft: "5px",
                marginTop: "5px",
              }),
            }}
          />
        </>
      )}
    </div>
  );
}
