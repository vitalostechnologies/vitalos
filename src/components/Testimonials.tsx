import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Testimonial = {
  quote: string;
  author: string;
  role?: string;
  logo?: string; // optional logo path
};

const ITEMS: Testimonial[] = [
  {
    quote:
      "Vitalos gave our clinicians actionable insights in minutes, not weeks.",
    author: "Dr. Elaine Harper",
    
    logo: "/logos/mindworks.svg",
  },
  {
    quote:
      "The AI triage improved throughput and patient satisfaction simultaneously.",
    author: "James O.",
    
    logo: "/logos/northcare.svg",
  },
  {
    quote:
      "A rare mix of safety, ethics, and real-world impact. We scaled smoothly.",
    author: "Ava R.",
    
    logo: "/logos/wellnest.svg",
  },
];

const Testimonials: React.FC = () => {
  const [idx, setIdx] = useState(0);

  // auto-rotate
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % ITEMS.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="container mx-auto px-6 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">What partners say</h2>

      <div className="relative max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center"
          >
            {ITEMS[idx].logo ? (
              <img
                src={ITEMS[idx].logo}
                alt=""
                className="h-8 mx-auto mb-4 opacity-80"
              />
            ) : null}

            <p className="text-xl md:text-2xl text-white/90 italic">
              “{ITEMS[idx].quote}”
            </p>
            <p className="mt-4 font-semibold">{ITEMS[idx].author}</p>
            <p className="text-white/70">{ITEMS[idx].role}</p>
          </motion.div>
        </AnimatePresence>

        {/* dots */}
        <div className="flex justify-center gap-2 mt-6">
          {ITEMS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-2 w-2 rounded-full ${i === idx ? "bg-[#50E3C2]" : "bg-white/20"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
