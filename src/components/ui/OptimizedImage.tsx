"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends Omit<ImageProps, "alt"> {
  alt: string; // Make alt required
  fallbackSrc?: string;
  priority?: boolean;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
}

/**
 * Optimized Image component wrapper around Next.js Image
 * 
 * Features:
 * - Always requires alt text for accessibility
 * - Handles missing images with fallback
 * - Supports blur placeholder or color placeholder
 * - Automatic loading priority for above-fold images
 * - Proper error handling
 * 
 * Formats supported: WebP, AVIF (configured in next.config.ts)
 * Next.js automatically serves WebP/AVIF when supported by the browser.
 */
export function OptimizedImage({
  alt,
  src,
  fallbackSrc = "/images/placeholder.svg",
  priority = false,
  placeholder = "blur",
  blurDataURL,
  className,
  onError,
  fill,
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  // Generate blur placeholder if not provided
  // This is a small base64-encoded blur placeholder
  const defaultBlurDataURL =
    blurDataURL ||
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==";

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!hasError && fallbackSrc && imgSrc !== fallbackSrc) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
    onError?.(e);
  };

  return (
    <Image
      src={imgSrc}
      alt={alt}
      priority={priority}
      placeholder={placeholder}
      blurDataURL={placeholder === "blur" ? defaultBlurDataURL : undefined}
      fill={fill}
      className={cn(!fill && "object-cover", className)}
      onError={handleError}
      {...props}
    />
  );
}
