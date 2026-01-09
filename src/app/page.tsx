"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

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

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<Set<number>>(new Set());
  const rafRef = useRef<number | null>(null);
  const [nextImageIndex, setNextImageIndex] = useState(0);
  const [isFirstImageLoaded, setIsFirstImageLoaded] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Preload images
  useEffect(() => {
    const loadImages = async () => {
      const loadedSet = new Set<number>();
      for (let i = 0; i < TOTAL_IMAGES; i++) {
        const img = new window.Image();
        img.src = IMAGES[i];
        await new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve; // Continue even if image fails
        });
        loadedSet.add(i);
      }
      setImagesLoaded(loadedSet);
    };
    loadImages();
  }, []);

  const updateImageIndex = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollTop = window.scrollY;
    const maxScroll = container.scrollHeight - window.innerHeight;
    const scrollProgress = Math.min(Math.max(scrollTop / maxScroll, 0), 1);
    const imageIndex = Math.floor(scrollProgress * (TOTAL_IMAGES - 1));
    const newIndex = Math.min(imageIndex, TOTAL_IMAGES - 1);

    // Trigger background transition after first scroll
    if (newIndex > 0 && !hasScrolled) {
      setHasScrolled(true);
    }

    if (newIndex !== nextImageIndex) {
      setNextImageIndex(newIndex);
    }
  }, [nextImageIndex, hasScrolled]);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(updateImageIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateImageIndex();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateImageIndex]);

  // Update current image with smooth transition
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentImageIndex(nextImageIndex);
    }, 50); // Small delay for smooth transition

    return () => clearTimeout(timer);
  }, [nextImageIndex]);

  // Calculate scroll height (enough to scroll through all images)
  const scrollHeight = Math.max(TOTAL_IMAGES * 100, 5000); // 100vh per image, minimum 5000vh

  return (
    <div
      ref={containerRef}
      className="relative bg-[#0a0a0a]"
      style={{ height: `${scrollHeight}vh` }}
    >
      {/* Pink Gradient Background - fades out */}
      <div
        className="fixed inset-0 z-0 transition-opacity duration-[2500ms] ease-in-out"
        style={{
          background: "linear-gradient(180deg, #ff69b4 0%, #ff8cc8 50%, rgba(255, 180, 224, 0.8) 100%)",
          opacity: hasScrolled ? 0 : 1,
        }}
      />

      {/* Black Background - fades in */}
      <div
        className="fixed inset-0 z-0 transition-opacity duration-[2500ms] ease-in-out"
        style={{
          background: "#0a0a0a",
          opacity: hasScrolled ? 1 : 0,
        }}
      />

      {/* Fixed Image Container with Fade Transition */}
      <div className="fixed inset-0 z-10">
        {IMAGES.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{
              zIndex: index === currentImageIndex ? 1 : 0,
            }}
          >
            <Image
              src={src}
              alt={`Marokko ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0 || index === currentImageIndex}
              quality={90}
              onLoad={() => {
                if (index === 0) {
                  setIsFirstImageLoaded(true);
                }
              }}
            />
          </div>
        ))}
      </div>

      {/* Navigation - Fixed */}
      <nav className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-8 md:px-16 py-8 mix-blend-difference">
        <Link
          href="/"
          className="text-2xl font-light tracking-[0.3em] uppercase text-white"
        >
          FERDINAND
        </Link>
        <div className="hidden md:flex items-center gap-12 text-sm tracking-wider text-white">
          <Link href="/work" className="hover:opacity-60 transition-opacity">
            Work
          </Link>
          <Link href="/about" className="hover:opacity-60 transition-opacity">
            About
          </Link>
          <Link href="/contact" className="hover:opacity-60 transition-opacity">
            Contact
          </Link>
        </div>
        <button className="md:hidden text-white">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </nav>

      {/* Scroll Indicator */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-20 mix-blend-difference">
        <div className="flex flex-col items-center gap-3 animate-bounce">
          <span className="text-xs tracking-widest uppercase text-white/60">
            Scroll
          </span>
          <svg
            className="w-5 h-5 text-white/60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
