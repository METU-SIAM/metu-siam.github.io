"use client";

import { useEffect, useRef } from "react";

// Particles drifting along the field of a smooth function: the angle at (x, y)
// is a sum of a few sines that slowly change with time. Only runs while the
// hero is on screen and the tab is visible; with reduced motion it draws the
// streamlines once and stops.

function field(x: number, y: number, t: number) {
  return (
    Math.sin(x * 1.7 + t * 0.11) * 1.1 +
    Math.cos(y * 2.3 - t * 0.07) * 0.9 +
    Math.sin((x + y) * 1.1 + t * 0.05) * 0.8
  );
}

export function FlowField({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let t = 0;
    let seed = 7;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    type P = { x: number; y: number; life: number; gold: boolean };
    let ps: P[] = [];

    const spawn = (p: P) => {
      p.x = rand() * w;
      p.y = rand() * h;
      p.life = 60 + rand() * 160;
      p.gold = rand() < 0.12;
    };

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(900, (w * h) / 900));
      ps = Array.from({ length: n }, () => {
        const p = { x: 0, y: 0, life: 0, gold: false };
        spawn(p);
        return p;
      });
      ctx.clearRect(0, 0, w, h);
    };

    const step = (fade: boolean) => {
      if (fade) {
        // fade old strokes toward transparent, keeping the navy behind visible
        ctx.globalCompositeOperation = "destination-out";
        ctx.fillStyle = "rgba(0,0,0,0.045)";
        ctx.fillRect(0, 0, w, h);
        ctx.globalCompositeOperation = "source-over";
      }
      const s = 1 / Math.max(w, h);
      ctx.lineWidth = 1;
      for (const gold of [false, true]) {
        ctx.strokeStyle = gold ? "rgba(226,169,68,0.55)" : "rgba(122,178,230,0.32)";
        ctx.beginPath();
        for (const p of ps) {
          if (p.gold !== gold) continue;
          const a = field(p.x * s * 3, p.y * s * 3, t);
          const nx = p.x + Math.cos(a) * 1.2;
          const ny = p.y + Math.sin(a) * 1.2;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(nx, ny);
          p.x = nx;
          p.y = ny;
          if (--p.life < 0 || nx < 0 || ny < 0 || nx > w || ny > h) spawn(p);
        }
        ctx.stroke();
      }
      t += 1 / 60;
    };

    const loop = () => {
      if (visible && !document.hidden) step(true);
      raf = requestAnimationFrame(loop);
    };

    resize();
    if (reduced) {
      for (let k = 0; k < 140; k++) step(false);
    } else {
      raf = requestAnimationFrame(loop);
    }

    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) for (let k = 0; k < 140; k++) step(false);
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
