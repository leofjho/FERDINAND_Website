"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
import LocomotiveScroll from "locomotive-scroll";

interface LocomotiveContextType {
  scroll: LocomotiveScroll | null;
  isReady: boolean;
}

const LocomotiveContext = createContext<LocomotiveContextType>({
  scroll: null,
  isReady: false,
});

export const useLocomotive = () => useContext(LocomotiveContext);

interface LocomotiveProviderProps {
  children: ReactNode;
  options?: {
    lerp?: number;
    duration?: number;
    smoothWheel?: boolean;
  };
}

export default function LocomotiveProvider({
  children,
  options = {},
}: LocomotiveProviderProps) {
  const scrollRef = useRef<LocomotiveScroll | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setIsReady(true);
      return;
    }

    // Initialize Locomotive Scroll v5
    const initScroll = async () => {
      scrollRef.current = new LocomotiveScroll({
        lenisOptions: {
          lerp: options.lerp ?? 0.1,
          duration: options.duration ?? 1.2,
          orientation: "vertical",
          gestureOrientation: "vertical",
          smoothWheel: options.smoothWheel ?? true,
          wheelMultiplier: 1,
          touchMultiplier: 2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        },
      });

      setIsReady(true);
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(initScroll, 100);

    // Cleanup on unmount or route change
    return () => {
      clearTimeout(timer);
      if (scrollRef.current) {
        scrollRef.current.destroy();
        scrollRef.current = null;
      }
      setIsReady(false);
    };
  }, [options.lerp, options.duration, options.smoothWheel]);

  return (
    <LocomotiveContext.Provider value={{ scroll: scrollRef.current, isReady }}>
      {children}
    </LocomotiveContext.Provider>
  );
}
