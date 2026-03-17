"use client";

import React, { useEffect, useRef, useState } from 'react';

interface Pointer {
  x?: number;
  y?: number;
}

interface Particle {
  ox: number;
  oy: number;
  cx: number;
  cy: number;
  or: number;
  cr: number;
  pv: number;
  ov: number;
  f: number;
  vx: number;
  vy: number;
  touched: boolean;
  rgb: number[];
  draw: () => void;
  pushFrom: (px: number, py: number, interactionRadius: number) => void;
  move: () => boolean;
}

interface TextBox {
  str: string;
  x?: number;
  y?: number;
  w?: number;
  h?: number;
}

export interface ParticleTextEffectProps {
  text?: string;
  colors?: string[];
  className?: string;
  animationForce?: number;
  particleDensity?: number;
}

const ParticleTextEffect: React.FC<ParticleTextEffectProps> = ({
  text = 'HOVER!',
  colors = [
    'ffad70', 'f7d297', 'edb9a1', 'e697ac', 'b38dca',
    '9c76db', '705cb5', '43428e', '2c2142'
  ],
  className = '',
  animationForce = 80,
  particleDensity = 4,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const pointerRef = useRef<Pointer>({});
  const prevPointerRef = useRef<Pointer>({});
  const hasPointerRef = useRef<boolean>(false);
  const interactionRadiusRef = useRef<number>(100);
  const [canvasSize, setCanvasSize] = useState<{ width: number; height: number }>({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 600,
  });
  const [textBox] = useState<TextBox>({ str: text });

  const rand = (max = 1, min = 0, dec = 0): number => {
    return +(min + Math.random() * (max - min)).toFixed(dec);
  };

  class ParticleClass implements Particle {
    ox: number;
    oy: number;
    cx: number;
    cy: number;
    or: number;
    cr: number;
    pv: number;
    ov: number;
    f: number;
    vx: number;
    vy: number;
    touched: boolean;
    rgb: number[];

    constructor(x: number, y: number, rgb: number[] = [rand(128), rand(128), rand(128)]) {
      this.ox = x;
      this.oy = y;
      this.cx = x;
      this.cy = y;
      this.or = rand(7, 2);
      this.cr = this.or;
      this.pv = 0;
      this.ov = 0;
      this.f = rand(animationForce + 15, animationForce - 15);
      this.vx = 0;
      this.vy = 0;
      this.touched = false;
      this.rgb = rgb.map(c => Math.max(0, c + rand(13, -13)));
    }

    draw() {
      const ctx = ctxRef.current;
      if (!ctx) return;
      ctx.fillStyle = `rgb(${this.rgb.join(',')})`;
      ctx.beginPath();
      ctx.arc(this.cx, this.cy, this.cr, 0, 2 * Math.PI);
      ctx.fill();
    }

    // Push particle away from a point
    pushFrom(px: number, py: number, interactionRadius: number) {
      const dx = this.cx - px;
      const dy = this.cy - py;
      const dist = Math.hypot(dx, dy);

      if (dist < interactionRadius && dist > 0) {
        const force = Math.min(this.f, (interactionRadius - dist) / dist * 2);
        const pushX = (dx / dist) * force;
        const pushY = (dy / dist) * force;
        this.cx += pushX;
        this.cy += pushY;
        this.vx += pushX * 0.3;
        this.vy += pushY * 0.3;
        this.touched = true;
      }
    }

    move() {
      let moved = false;

      if (this.touched) {
        // This particle was pushed — it drifts freely, never snaps back
        this.cx += this.vx;
        this.cy += this.vy;
        this.vx *= 0.995;
        this.vy *= 0.995;

        // Subtle random wandering
        this.vx += (Math.random() - 0.5) * 0.08;
        this.vy += (Math.random() - 0.5) * 0.08;

        // Soft bounce off canvas edges
        const canvas = canvasRef.current;
        if (canvas) {
          if (this.cx < 0) { this.cx = 0; this.vx *= -0.5; }
          if (this.cx > canvas.width) { this.cx = canvas.width; this.vx *= -0.5; }
          if (this.cy < 0) { this.cy = 0; this.vy *= -0.5; }
          if (this.cy > canvas.height) { this.cy = canvas.height; this.vy *= -0.5; }
        }

        moved = Math.abs(this.vx) > 0.01 || Math.abs(this.vy) > 0.01;
      } else {
        // Untouched particle — stays in place (restores if nudged)
        const odx = this.ox - this.cx;
        const ody = this.oy - this.cy;
        const od = Math.hypot(odx, ody);

        if (od > 1) {
          const restore = Math.min(od * 0.1, 3);
          this.cx += (odx / od) * restore;
          this.cy += (ody / od) * restore;
          moved = true;
        }
      }

      this.draw();
      return moved;
    }
  }

  const dottify = () => {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas || !textBox.x || !textBox.y || !textBox.w || !textBox.h) return;

    const data = ctx.getImageData(textBox.x, textBox.y, textBox.w, textBox.h).data;
    const pixels = data.reduce((arr: any[], _, i, d) => {
      if (i % 4 === 0) {
        arr.push({
          x: (i / 4) % textBox.w!,
          y: Math.floor((i / 4) / textBox.w!),
          rgb: d.slice(i, i + 4),
        });
      }
      return arr;
    }, []).filter(p => p.rgb[3] && !(p.x % particleDensity) && !(p.y % particleDensity));

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pixels.forEach((p, i) => {
      particlesRef.current[i] = new ParticleClass(
        textBox.x! + p.x,
        textBox.y! + p.y,
        p.rgb.slice(0, 3)
      );
      particlesRef.current[i].draw();
    });

    particlesRef.current.splice(pixels.length, particlesRef.current.length);
  };

  const write = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    textBox.str = text;
    // Start large — 70% of canvas height — then shrink to fit width
    let fontSize = Math.floor(canvas.height * 0.7);
    ctx.font = `900 ${fontSize}px Verdana, sans-serif`;
    let measuredW = ctx.measureText(textBox.str).width;
    while (measuredW > canvas.width * 0.92 && fontSize > 10) {
      fontSize -= 1;
      ctx.font = `900 ${fontSize}px Verdana, sans-serif`;
      measuredW = ctx.measureText(textBox.str).width;
    }
    textBox.h = fontSize;
    interactionRadiusRef.current = Math.max(30, textBox.h * 1.2);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    textBox.w = Math.round(measuredW);
    textBox.x = 0.5 * (canvas.width - textBox.w);
    textBox.y = 0.5 * (canvas.height - textBox.h);

    const gradient = ctx.createLinearGradient(textBox.x, textBox.y, textBox.x + textBox.w, textBox.y + textBox.h);
    const N = colors.length - 1;
    colors.forEach((c, i) => gradient.addColorStop(i / N, `#${c}`));

    ctx.fillStyle = gradient;
    ctx.fillText(textBox.str, 0.5 * canvas.width, 0.5 * canvas.height);

    dottify();
  };

  // Apply pointer interaction along the interpolated path from prev to current pointer
  const applyPointerForce = () => {
    const px = pointerRef.current.x;
    const py = pointerRef.current.y;
    if (px === undefined || py === undefined || !hasPointerRef.current) return;

    const prevX = prevPointerRef.current.x;
    const prevY = prevPointerRef.current.y;
    const radius = interactionRadiusRef.current;

    if (prevX !== undefined && prevY !== undefined) {
      // Interpolate between previous and current pointer position
      const dx = px - prevX;
      const dy = py - prevY;
      const dist = Math.hypot(dx, dy);
      // Sample every ~half-radius along the path
      const steps = Math.max(1, Math.ceil(dist / (radius * 0.4)));

      for (let s = 0; s <= steps; s++) {
        const t = s / steps;
        const ix = prevX + dx * t;
        const iy = prevY + dy * t;
        particlesRef.current.forEach(p => p.pushFrom(ix, iy, radius));
      }
    } else {
      // First point — just apply at current position
      particlesRef.current.forEach(p => p.pushFrom(px, py, radius));
    }
  };

  const animate = () => {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;

    // Apply pointer force with interpolation
    applyPointerForce();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let anyMoved = false;
    particlesRef.current.forEach(p => {
      if (p.move()) {
        anyMoved = true;
      }
    });

    // Keep animating as long as any particle is moving
    if (anyMoved || hasPointerRef.current) {
      animationIdRef.current = requestAnimationFrame(animate);
    } else {
      animationIdRef.current = null;
    }

    // Save current pointer as previous for next frame interpolation
    prevPointerRef.current = { x: pointerRef.current.x, y: pointerRef.current.y };
  };

  const initialize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;

    // Re-acquire context after canvas resize (resizing resets canvas state)
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctxRef.current = ctx;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    write();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!container) return;

    const measure = () => {
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      setCanvasSize({
        width: Math.floor(rect.width),
        height: Math.floor(rect.height),
      });
    };

    measure();

    const ro = new ResizeObserver(() => measure());
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, colors, animationForce, particleDensity, canvasSize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctxRef.current = ctx;
    initialize();

    return () => {
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    // Save previous before updating
    prevPointerRef.current = { x: pointerRef.current.x, y: pointerRef.current.y };

    pointerRef.current.x = (e.clientX - rect.left) * scaleX;
    pointerRef.current.y = (e.clientY - rect.top) * scaleY;
    hasPointerRef.current = true;

    if (!animationIdRef.current) animate();
  };

  const handlePointerLeave = () => {
    hasPointerRef.current = false;
    prevPointerRef.current = {};
    pointerRef.current.x = undefined;
    pointerRef.current.y = undefined;
    if (!animationIdRef.current) animate();
  };

  const handlePointerEnter = () => {
    hasPointerRef.current = true;
    prevPointerRef.current = {};
  };

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerEnter={handlePointerEnter}
    />
  );
};

export { ParticleTextEffect };
