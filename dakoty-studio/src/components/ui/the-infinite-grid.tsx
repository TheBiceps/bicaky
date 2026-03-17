"use client";

import React, { useRef, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";

interface InfiniteGridProps {
  /** Opacity for the hover-revealed grid */
  hoverOpacity?: number;
  /** Radius of the mouse reveal circle in px */
  revealRadius?: number;
  /** Horizontal scroll speed (px per frame) */
  speedX?: number;
  /** Vertical scroll speed (px per frame) */
  speedY?: number;
  /** Grid cell size in px */
  cellSize?: number;
  /** Color of the grid lines */
  color?: string;
  /** Smoothing factor for cursor follow (0-1, lower = smoother) */
  smoothing?: number;
  /** Additional className for the container */
  className?: string;
}

/**
 * High-performance animated infinite grid background.
 * Grid is invisible by default — only visible within a soft radial
 * spotlight that follows the cursor with smooth lerping.
 */
export function InfiniteGrid({
  hoverOpacity = 0.4,
  revealRadius = 350,
  speedX = 0.3,
  speedY = 0.3,
  cellSize = 40,
  color = "#0071e3",
  smoothing = 0.12,
  className,
}: InfiniteGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const offsetRef = useRef({ x: 0, y: 0 });
  // Raw mouse position (updated instantly on mousemove)
  const targetRef = useRef({ x: -9999, y: -9999 });
  // Lerped position (smoothly follows target)
  const currentRef = useRef({ x: -9999, y: -9999 });

  const gridBg = `linear-gradient(to right, ${color} 1px, transparent 1px), linear-gradient(to bottom, ${color} 1px, transparent 1px)`;

  useEffect(() => {
    let lastTime = 0;

    const tick = (time: number) => {
      if (!lastTime) lastTime = time;
      const dt = Math.min(time - lastTime, 32);
      lastTime = time;

      // Scroll grid offset
      offsetRef.current.x = (offsetRef.current.x + speedX * (dt / 16)) % cellSize;
      offsetRef.current.y = (offsetRef.current.y + speedY * (dt / 16)) % cellSize;

      // Lerp mouse position for smooth follow
      const tx = targetRef.current.x;
      const ty = targetRef.current.y;
      if (tx < -5000) {
        // Mouse is off-screen, snap immediately
        currentRef.current.x = tx;
        currentRef.current.y = ty;
      } else {
        currentRef.current.x += (tx - currentRef.current.x) * smoothing;
        currentRef.current.y += (ty - currentRef.current.y) * smoothing;
      }

      const el = gridRef.current;
      if (el) {
        el.style.transform = `translate3d(${offsetRef.current.x}px, ${offsetRef.current.y}px, 0)`;
        // Soft radial fade: fully opaque at center, fades through 60% of radius, fully transparent at edge
        const cx = currentRef.current.x;
        const cy = currentRef.current.y;
        const innerR = Math.round(revealRadius * 0.4);
        el.style.maskImage = `radial-gradient(${revealRadius}px circle at ${cx}px ${cy}px, black ${innerR}px, transparent ${revealRadius}px)`;
        el.style.webkitMaskImage = el.style.maskImage;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [speedX, speedY, cellSize, revealRadius, smoothing]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    targetRef.current.x = e.clientX - rect.left;
    targetRef.current.y = e.clientY - rect.top;
    // On first move, snap the lerped position so there's no initial jump
    if (currentRef.current.x < -5000) {
      currentRef.current.x = targetRef.current.x;
      currentRef.current.y = targetRef.current.y;
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    targetRef.current.x = -9999;
    targetRef.current.y = -9999;
    currentRef.current.x = -9999;
    currentRef.current.y = -9999;
  }, []);

  // Mobile: pulse on touch
  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect || !gridRef.current) return;
      const touch = e.touches[0];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;

      const el = gridRef.current;
      let start: number | null = null;
      const duration = 900;

      const pulse = (time: number) => {
        if (!start) start = time;
        const progress = Math.min((time - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const radius = eased * 600;
        const innerR = Math.round(radius * 0.4);
        const opacity = hoverOpacity * (1 - progress);

        el.style.opacity = String(opacity);
        el.style.maskImage = `radial-gradient(${radius}px circle at ${x}px ${y}px, black ${innerR}px, transparent ${radius}px)`;
        el.style.webkitMaskImage = el.style.maskImage;

        if (progress < 1) {
          requestAnimationFrame(pulse);
        } else {
          el.style.opacity = String(hoverOpacity);
        }
      };

      requestAnimationFrame(pulse);
    },
    [hoverOpacity]
  );

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      style={{ pointerEvents: "auto" }}
    >
      {/* Single grid layer — only visible through cursor spotlight */}
      <div
        ref={gridRef}
        className="absolute will-change-transform"
        style={{
          inset: `-${cellSize}px`,
          opacity: hoverOpacity,
          backgroundImage: gridBg,
          backgroundSize: `${cellSize}px ${cellSize}px`,
          maskImage: "radial-gradient(0px circle at -9999px -9999px, black, transparent)",
          WebkitMaskImage: "radial-gradient(0px circle at -9999px -9999px, black, transparent)",
        }}
      />
    </div>
  );
}

export default InfiniteGrid;
