"use client";

import Image from "next/image";
import { useState } from "react";

interface ImageWithSkeletonProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  lightMode?: boolean;
}

export default function ImageWithSkeleton({
  src,
  alt,
  fill,
  width,
  height,
  className = "",
  priority = false,
  sizes,
  lightMode = false,
}: ImageWithSkeletonProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {/* Skeleton loader */}
      {isLoading && (
        <div
          className={`absolute inset-0 ${lightMode ? "skeleton-loader-light" : "skeleton-loader"}`}
          style={{ zIndex: 1 }}
        />
      )}
      {/* Actual image */}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={width}
        height={height}
        className={`${className} transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`}
        priority={priority}
        sizes={sizes}
        onLoad={() => setIsLoading(false)}
      />
    </>
  );
}
