"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface CustomCursorProps {
  isPinkBackground?: boolean;
}

export default function CustomCursor({ isPinkBackground = false }: CustomCursorProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  // Check if mobile/touch device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.matchMedia("(max-width: 768px)").matches ||
          "ontouchstart" in window
      );
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  // Track mouse position
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

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

  if (isMobile) return null;

  // Pink background: light blue cursor
  // Other backgrounds: white with mix-blend-mode: difference
  const cursorStyle = isPinkBackground
    ? {
        backgroundColor: "#87CEEB",
      }
    : {
        backgroundColor: "white",
        mixBlendMode: "difference" as const,
      };

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "20px",
        height: "20px",
        pointerEvents: "none",
        zIndex: 9999,
        willChange: "transform",
        transition:
          "width 0.2s ease-out, height 0.2s ease-out, margin 0.2s ease-out, background-color 0.3s ease-out",
        ...cursorStyle,
        ...(isHoveringClickable && {
          width: "10px",
          height: "10px",
          marginLeft: "5px",
          marginTop: "5px",
        }),
      }}
    />
  );
}
