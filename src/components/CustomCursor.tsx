"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface CustomCursorProps {
  isPinkBackground?: boolean;
  variant?: "circle" | "square";
}

export default function CustomCursor({ isPinkBackground = false, variant = "circle" }: CustomCursorProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);

  const invertRef = useRef<HTMLDivElement>(null);
  const glassRef = useRef<HTMLDivElement>(null);
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
    const x = mousePos.current.x - 12;
    const y = mousePos.current.y - 12;
    if (invertRef.current) {
      invertRef.current.style.transform = `translate(${x}px, ${y}px)`;
    }
    if (glassRef.current) {
      glassRef.current.style.transform = `translate(${x}px, ${y}px)`;
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

  // Cursor size based on hover state
  const size = isHoveringClickable ? 14 : 24;
  const offset = isHoveringClickable ? 5 : 0;
  const borderRadius = "6px";
  const borderWidth = 3;

  return (
    <>
      {/* Layer 1: Color inversion */}
      <div
        ref={invertRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: `${size}px`,
          height: `${size}px`,
          marginLeft: `${offset}px`,
          marginTop: `${offset}px`,
          borderRadius,
          backgroundColor: "white",
          mixBlendMode: "difference",
          pointerEvents: "none",
          zIndex: 9998,
          willChange: "transform",
          transition: "width 0.2s ease-out, height 0.2s ease-out, margin 0.2s ease-out",
        }}
      />
      {/* Layer 2: Glass effect */}
      <div
        ref={glassRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: `${size}px`,
          height: `${size}px`,
          marginLeft: `${offset}px`,
          marginTop: `${offset}px`,
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform",
          transition: "width 0.2s ease-out, height 0.2s ease-out, margin 0.2s ease-out",
        }}
      >
        {variant === "square" ? (
          /* Thin glass border for square variant - no blur inside */
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "6px",
              backgroundColor: "transparent",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 0 8px rgba(255, 255, 255, 0.1), inset 0 0 1px rgba(255, 255, 255, 0.1)",
            }}
          />
        ) : (
          /* Full glass overlay for circle variant */
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              backgroundColor: isPinkBackground
                ? "rgba(135, 206, 235, 0.15)"
                : "rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(8px) saturate(140%)",
              WebkitBackdropFilter: "blur(8px) saturate(140%)",
              border: isPinkBackground
                ? "1px solid rgba(135, 206, 235, 0.3)"
                : "1px solid rgba(255, 255, 255, 0.15)",
              boxShadow: `
                inset 0 1px 1px rgba(255, 255, 255, 0.2),
                inset 0 -1px 1px rgba(0, 0, 0, 0.05),
                0 2px 8px rgba(0, 0, 0, 0.08)
              `,
            }}
          />
        )}
      </div>
    </>
  );
}
