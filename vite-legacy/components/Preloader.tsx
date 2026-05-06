import React from "react";

type Props = { visible: boolean };

const Preloader: React.FC<Props> = ({ visible }) => {
  if (!visible) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/30 border-t-white" />
        <p className="text-white/80 text-sm tracking-wide">Loading…</p>
      </div>
    </div>
  );
};

export default Preloader;
