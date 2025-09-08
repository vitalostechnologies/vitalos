import React from "react";

type SectionHeroProps = {
  title: string;
  subtitle?: string;
  /** Height utility classes */
  heightClass?: string; // e.g., "h-40 md:h-48"
  /** Green opacity for the center band (0–1, defaults 0.18) */
  greenOpacity?: number;
  className?: string;
};

const SectionHero: React.FC<SectionHeroProps> = ({
  title,
  subtitle,
  heightClass = "h-40 md:h-48",
  greenOpacity = 0.18,
  className = "",
}) => {
  // clamp opacity to safe range
  const op = Math.max(0, Math.min(1, greenOpacity));
  const gradient = `linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(80,227,194,${op}) 50%, rgba(0,0,0,1) 100%)`;

  return (
    <section
      className={`relative w-full overflow-hidden bg-black ${heightClass} mb-12 ${className}`}
    >
      {/* Center band with toned-down green */}
      <div className="absolute inset-0" style={{ backgroundImage: gradient }} />
      {/* Soft vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.65)_80%)]" />
      {/* Content */}
      <div className="container mx-auto h-full px-6 flex flex-col items-center justify-center text-center relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
          {title}
        </h1>
        {subtitle ? (
          <h2 className="mt-3 text-lg md:text-xl font-bold text-white/90">
            {subtitle}
          </h2>
        ) : null}
      </div>
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#50E3C2]/60 to-transparent" />
    </section>
  );
};

export default SectionHero;
