"use client";

import { useEffect, useState, RefObject } from "react";
import { useLocomotive } from "@/components/locomotive/LocomotiveProvider";

interface ScrollProgress {
  progress: number;
  isInView: boolean;
}

export function useLocomotiveScroll() {
  const { scroll, isReady } = useLocomotive();

  const scrollTo = (
    target: string | HTMLElement | number,
    options?: { offset?: number; duration?: number }
  ) => {
    if (scroll) {
      scroll.scrollTo(target, options);
    }
  };

  return { scroll, isReady, scrollTo };
}

export function useInView(
  ref: RefObject<HTMLElement | null>,
  options?: { threshold?: number; once?: boolean }
) {
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const threshold = options?.threshold ?? 0.2;
  const once = options?.once ?? true;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // If already animated and once is true, skip
    if (once && hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) {
            setHasAnimated(true);
            observer.disconnect();
          }
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [ref, threshold, once, hasAnimated]);

  return isInView;
}

export function useScrollProgress(ref: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState<ScrollProgress>({
    progress: 0,
    isInView: false,
  });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementTop = rect.top;
      const elementHeight = rect.height;

      // Progress: 0 when element enters viewport, 1 when it leaves
      const rawProgress =
        (windowHeight - elementTop) / (windowHeight + elementHeight);
      const clampedProgress = Math.max(0, Math.min(1, rawProgress));

      const isInView = rect.top < windowHeight && rect.bottom > 0;

      setProgress({
        progress: clampedProgress,
        isInView,
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [ref]);

  return progress;
}

export function useParallax(
  ref: RefObject<HTMLElement | null>,
  speed: number = 0.5
) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Check if mobile
    const isMobile = window.innerWidth < 768;

    if (prefersReducedMotion || isMobile) {
      return;
    }

    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      const distance = elementCenter - viewportCenter;

      setOffset(distance * speed * -1);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [ref, speed]);

  return offset;
}
