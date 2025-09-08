import React from "react";
import type { CTA } from "../types";

/* ======================== Types ======================== */
type HeroProps = {
  title: string;
  subtitle: string;
  primaryCta?: CTA;
  secondaryCta?: CTA;
};

interface AuroraBackgroundProps {
  blobARef: React.RefObject<HTMLDivElement | null>;
  blobBRef: React.RefObject<HTMLDivElement | null>;
  blobCRef: React.RefObject<HTMLDivElement | null>;
}

interface HoloGridProps {
  gridRef: React.RefObject<HTMLDivElement | null>;
}

interface ParticleFieldProps {
  parallax: React.MutableRefObject<{ x: number; y: number }>;
}

/* ======================== Component ======================== */
export default function Hero({ title, subtitle, primaryCta, secondaryCta }: HeroProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const gridRef = React.useRef<HTMLDivElement>(null);
  const blobARef = React.useRef<HTMLDivElement>(null);
  const blobBRef = React.useRef<HTMLDivElement>(null);
  const blobCRef = React.useRef<HTMLDivElement>(null);

  // Share parallax values with ParticleField
  const parallaxRef = React.useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Parallax (mouse move)
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let raf = 0;
    let mouseX = 0, mouseY = 0, currentX = 0, currentY = 0;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX = Math.max(-0.6, Math.min(0.6, nx));
      mouseY = Math.max(-0.6, Math.min(0.6, ny));
      if (!raf) tick();
    };

    const tick = () => {
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;

      // Share to particle field
      parallaxRef.current.x = currentX;
      parallaxRef.current.y = currentY;

      if (!prefersReduced) {
        const grid = gridRef.current;
        const a = blobARef.current;
        const b = blobBRef.current;
        const c = blobCRef.current;

        const rot = currentX * 4;
        const lift = currentY * -14;
        const shiftX = currentX * 18;
        const shiftY = currentY * 18;

        if (grid)
          grid.style.transform =
            `perspective(900px) rotateX(45deg) translate3d(${shiftX * 0.45}px, ${lift * 0.45}px, 0)`;
        if (a)
          a.style.transform = `translate3d(${shiftX * 0.9}px, ${shiftY * 0.55}px,0) scale(1.03) rotate(${rot}deg)`;
        if (b)
          b.style.transform = `translate3d(${shiftX * -0.55}px, ${shiftY * -0.75}px,0) scale(1.05) rotate(${-rot}deg)`;
        if (c)
          c.style.transform = `translate3d(${shiftX * 0.35}px, ${shiftY * -0.35}px,0) scale(0.99) rotate(${rot * 0.6}deg)`;
      }

      if (Math.abs(currentX - mouseX) > 0.002 || Math.abs(currentY - mouseY) > 0.002) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[80vh] flex items-center justify-center px-6 overflow-hidden">
      {/* Order: particles (deep) -> aurora -> grid -> content */}
      <ParticleField parallax={parallaxRef} />
      <AuroraBackground blobARef={blobARef} blobBRef={blobBRef} blobCRef={blobCRef} />
      <HoloGrid gridRef={gridRef} />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight">{title}</h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8">{subtitle}</p>

        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          {primaryCta && (
            <button
              onClick={primaryCta.onClick}
              className="px-8 py-3 bg-[#50E3C2] text-black font-semibold rounded-full text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#50E3C2]/40"
            >
              {primaryCta.label}
            </button>
          )}
          {secondaryCta && (
            <button
              onClick={secondaryCta.onClick}
              className="px-8 py-3 bg-transparent text-[#50E3C2] font-semibold border-2 border-[#50E3C2] rounded-full text-lg transition-all duration-300 hover:scale-105 hover:bg-[#50E3C2] hover:text-black"
            >
              {secondaryCta.label}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

/* ======================== Particle Field (Canvas) ======================== */

function ParticleField({ parallax }: ParticleFieldProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const rafRef = React.useRef<number | null>(null);
  const prefersReduced = React.useRef<boolean>(false);

  React.useEffect(() => {
    prefersReduced.current = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1)); // cap DPR
    let w = 0, h = 0;

    type P = { x: number; y: number; z: number; r: number; s: number; tw: number; t: number };
    let particles: P[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = Math.floor(rect.width);
      h = Math.floor(rect.height);
      canvas.width = Math.floor(w * DPR);
      canvas.height = Math.floor(h * DPR);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      const count = Math.floor((w * h) / 18000); // density
      particles = new Array(count).fill(0).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: 0.4 + Math.random() * 0.6,                         // depth
        r: 0.6 + Math.random() * 1.6,                         // radius
        s: (Math.random() * 0.15 + 0.05) * (Math.random() > 0.6 ? 1 : -1), // drift
        tw: 2 + Math.random() * 4,                            // twinkle speed
        t: Math.random() * Math.PI * 2,                       // twinkle phase
      }));
    };

    const draw = (ts: number) => {
      ctx.clearRect(0, 0, w, h);

      const px = parallax.current.x;
      const py = parallax.current.y;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // drift
        p.y += p.s;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        // parallax (deeper => less move)
        const ox = -px * 22 * (1 / (p.z * 2));
        const oy = -py * 22 * (1 / (p.z * 2));

        // twinkle
        p.t += (prefersReduced.current ? 0.002 : 0.006) * p.tw;
        const alpha = 0.15 + 0.35 * (0.5 + 0.5 * Math.sin(p.t + ts * 0.0005));

        // slight teal tint
        const teal = 200 + Math.round(30 * p.z);
        ctx.beginPath();
        ctx.arc(p.x + ox, p.y + oy, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${teal},255,240,${alpha})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    const obs = new ResizeObserver(resize);
    obs.observe(canvas);

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      obs.disconnect();
    };
  }, [parallax]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        WebkitMaskImage: "radial-gradient(70% 60% at 50% 50%, black 60%, transparent 100%)",
        maskImage: "radial-gradient(70% 60% at 50% 50%, black 60%, transparent 100%)",
      }}
    />
  );
}

/* ======================== Background Layers ======================== */

function AuroraBackground({ blobARef, blobBRef, blobCRef }: AuroraBackgroundProps) {
  return (
    <>
      <style>{`
        @keyframes driftA { 0%{transform:translate3d(-10%,-10%,0) scale(1)} 50%{transform:translate3d(10%,5%,0) scale(1.05)} 100%{transform:translate3d(-5%,10%,0) scale(1.02)} }
        @keyframes driftB { 0%{transform:translate3d(15%,0,0) scale(1.1)} 50%{transform:translate3d(-10%,-5%,0) scale(1.05)} 100%{transform:translate3d(0,10%,0) scale(1.08)} }
        @keyframes driftC { 0%{transform:translate3d(-5%,10%,0) scale(.9)} 50%{transform:translate3d(10%,-10%,0) scale(1)} 100%{transform:translate3d(-10%,0,0) scale(.95)} }
        @keyframes shimmer { 0%{opacity:.35} 50%{opacity:.65} 100%{opacity:.35} }
      `}</style>

      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Base wash */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(1200px 600px at 50% 0%, rgba(80,227,194,0.2), transparent 60%), radial-gradient(1200px 600px at 50% 100%, rgba(80,227,194,0.12), transparent 60%)",
          }}
        />

        {/* Blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            ref={blobARef}
            className="absolute w-[55vw] h-[55vw] top-[-10%] left-[-10%] rounded-full blur-[90px] opacity-50"
            style={{
              background: "radial-gradient(closest-side, rgba(80,227,194,0.9), rgba(80,227,194,0.15), transparent 70%)",
              animation: "driftA 18s ease-in-out infinite alternate, shimmer 6s ease-in-out infinite",
              filter: "saturate(150%)",
            }}
          />
          <div
            ref={blobBRef}
            className="absolute w-[50vw] h-[50vw] bottom-[-15%] right-[-10%] rounded-full blur-[90px] opacity-45"
            style={{
              background: "radial-gradient(closest-side, rgba(180,255,240,0.85), rgba(180,255,240,0.12), transparent 70%)",
              animation: "driftB 22s ease-in-out infinite alternate, shimmer 7.5s ease-in-out infinite",
              filter: "saturate(130%)",
            }}
          />
          <div
            ref={blobCRef}
            className="absolute w-[45vw] h-[45vw] top-[20%] left-[40%] rounded-full blur-[100px] opacity-35"
            style={{
              background: "radial-gradient(closest-side, rgba(160,140,255,0.7), rgba(160,140,255,0.12), transparent 70%)",
              animation: "driftC 26s ease-in-out infinite alternate, shimmer 9s ease-in-out infinite",
              filter: "saturate(160%)",
            }}
          />
        </div>

        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(1200px 600px at 50% 50%, transparent 40%, rgba(0,0,0,0.4) 100%)",
          }}
        />
      </div>
    </>
  );
}

function HoloGrid({ gridRef }: HoloGridProps) {
  return (
    <>
      <style>{`
        @keyframes gridFloat { 0%{transform:translateY(0);opacity:.35} 50%{transform:translateY(-10px);opacity:.45} 100%{transform:translateY(0);opacity:.35} }
        @keyframes scan { 0%{transform:translateY(-100%);opacity:0} 20%{opacity:.35} 50%{opacity:.25} 100%{transform:translateY(100%);opacity:0} }
      `}</style>

      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-x-0 bottom-[-10%] h-[120%] opacity-45"
          style={{
            WebkitMaskImage:
              "linear-gradient(to top, transparent 0%, black 20%, black 80%, transparent 100%)",
            maskImage:
              "linear-gradient(to top, transparent 0%, black 20%, black 80%, transparent 100%)",
          }}
        >
          <div
            ref={gridRef}
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(80,227,194,0.3), rgba(80,227,194,0.3)), repeating-linear-gradient(to right, rgba(255,255,255,0.12) 0, rgba(255,255,255,0.12) 1px, transparent 1px, transparent 48px), repeating-linear-gradient(to top, rgba(255,255,255,0.12) 0, rgba(255,255,255,0.12) 1px, transparent 1px, transparent 48px)",
              backgroundBlendMode: "soft-light, normal, normal",
              transform: "perspective(900px) rotateX(45deg)",
              transformOrigin: "50% 100%",
              filter: "blur(0.2px)",
              animation: "gridFloat 8s ease-in-out infinite",
            }}
          />
        </div>

        <div
          className="absolute inset-x-0 top-0 h-full"
          style={{
            background:
              "linear-gradient(to bottom, rgba(80,227,194,0) 0%, rgba(80,227,194,0.25) 50%, rgba(80,227,194,0) 100%)",
            mixBlendMode: "screen",
            animation: "scan 5.5s linear infinite",
          }}
        />
      </div>
    </>
  );
}
