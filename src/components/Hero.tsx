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

/* ======================== Component ======================== */
export default function Hero({ title, subtitle, primaryCta, secondaryCta }: HeroProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const gridRef = React.useRef<HTMLDivElement>(null);
  const blobARef = React.useRef<HTMLDivElement>(null);
  const blobBRef = React.useRef<HTMLDivElement>(null);
  const blobCRef = React.useRef<HTMLDivElement>(null);

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
      mouseX = (e.clientX - rect.left) / rect.width - 0.5;
      mouseY = (e.clientY - rect.top) / rect.height - 0.5;
      if (!raf) tick();
    };

    const tick = () => {
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;

      if (!prefersReduced) {
        const grid = gridRef.current;
        const a = blobARef.current;
        const b = blobBRef.current;
        const c = blobCRef.current;

        const rot = currentX * 4;
        const lift = currentY * -14;
        const shiftX = currentX * 18;
        const shiftY = currentY * 18;

        if (grid) grid.style.transform =
          `perspective(900px) rotateX(45deg) translate3d(${shiftX * 0.45}px, ${lift * 0.45}px, 0)`;
        if (a) a.style.transform = `translate3d(${shiftX * 0.9}px, ${shiftY * 0.55}px,0) scale(1.03) rotate(${rot}deg)`;
        if (b) b.style.transform = `translate3d(${shiftX * -0.55}px, ${shiftY * -0.75}px,0) scale(1.05) rotate(${-rot}deg)`;
        if (c) c.style.transform = `translate3d(${shiftX * 0.35}px, ${shiftY * -0.35}px,0) scale(0.99) rotate(${rot * 0.6}deg)`;
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

/* ======================== Background Layers ======================== */

function AuroraBackground({ blobARef, blobBRef, blobCRef }: AuroraBackgroundProps) {
  return (
    <>
      <style>{`
        @keyframes driftA { 0%{transform:translate3d(-10%,-10%,0) scale(1)} 50%{transform:translate3d(10%,5%,0) scale(1.05)} 100%{transform:translate3d(-5%,10%,0) scale(1.02)} }
        @keyframes driftB { 0%{transform:translate3d(15%,0,0) scale(1.1)} 50%{transform:translate3d(-10%,-5%,0) scale(1.05)} 100%{transform:translate3d(0,10%,0) scale(1.08)} }
        @keyframes driftC { 0%{transform:translate3d(-5%,10%,0) scale(.9)} 50%{transform:translate3d(10%,-10%,0) scale(1)} 100%{transform:translate3d(-10%,0,0) scale(.95)} }
        @keyframes shimmer { 0%{opacity:.28} 50%{opacity:.52} 100%{opacity:.28} }
      `}</style>

      {/* z-0 so it's visible under content (z-10) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Base gradient wash */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(1200px 600px at 50% 0%, rgba(80,227,194,0.14), transparent 60%), radial-gradient(1200px 600px at 50% 100%, rgba(80,227,194,0.08), transparent 60%)",
          }}
        />

        {/* Aurora blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            ref={blobARef}
            className="absolute w-[60vw] h-[60vw] top-[-10%] left-[-10%] rounded-full blur-[120px] opacity-35"
            style={{
              background: "radial-gradient(closest-side, rgba(80,227,194,0.8), rgba(80,227,194,0.12), transparent 70%)",
              animation: "driftA 18s ease-in-out infinite alternate, shimmer 6s ease-in-out infinite",
              filter: "saturate(130%)",
            }}
          />
          <div
            ref={blobBRef}
            className="absolute w-[50vw] h-[50vw] bottom-[-15%] right-[-10%] rounded-full blur-[110px] opacity-30"
            style={{
              background: "radial-gradient(closest-side, rgba(180,255,240,0.75), rgba(180,255,240,0.1), transparent 70%)",
              animation: "driftB 22s ease-in-out infinite alternate, shimmer 7.5s ease-in-out infinite",
              filter: "saturate(120%)",
            }}
          />
          <div
            ref={blobCRef}
            className="absolute w-[45vw] h-[45vw] top-[20%] left-[40%] rounded-full blur-[140px] opacity-24"
            style={{
              background: "radial-gradient(closest-side, rgba(160,140,255,0.55), rgba(160,140,255,0.08), transparent 70%)",
              animation: "driftC 26s ease-in-out infinite alternate, shimmer 9s ease-in-out infinite",
            }}
          />
        </div>

        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(1200px 600px at 50% 50%, transparent 40%, rgba(0,0,0,0.35) 100%)",
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
        @keyframes gridFloat { 0%{transform:translateY(0);opacity:.24} 50%{transform:translateY(-10px);opacity:.34} 100%{transform:translateY(0);opacity:.24} }
        @keyframes scan { 0%{transform:translateY(-100%);opacity:0} 20%{opacity:.28} 50%{opacity:.18} 100%{transform:translateY(100%);opacity:0} }
      `}</style>

      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-x-0 bottom-[-10%] h-[120%] opacity-35"
          style={{
            WebkitMaskImage: "linear-gradient(to top, transparent 0%, black 20%, black 80%, transparent 100%)",
            maskImage: "linear-gradient(to top, transparent 0%, black 20%, black 80%, transparent 100%)",
          }}
        >
          <div
            ref={gridRef}
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(80,227,194,0.24), rgba(80,227,194,0.24)), repeating-linear-gradient(to right, rgba(255,255,255,0.08) 0, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 48px), repeating-linear-gradient(to top, rgba(255,255,255,0.08) 0, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 48px)",
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
              "linear-gradient(to bottom, rgba(80,227,194,0) 0%, rgba(80,227,194,0.18) 50%, rgba(80,227,194,0) 100%)",
            mixBlendMode: "screen",
            animation: "scan 5.5s linear infinite",
          }}
        />
      </div>
    </>
  );
}
