import React, { useState } from "react";
import morningstarLogo from "../morningstar.png";
import { flows } from "../data/conversations";

const GLEAN_IMG = "https://app.glean.com/images";

/* ── Persona card icons (inline SVGs since feather variants aren't on Glean CDN) ── */
const PersonaIcons = {
  sales: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1C5BE0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  support: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1C5BE0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  product: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1C5BE0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  finance: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1C5BE0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
};

export default function PersonaSelect({ onSelect }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [selectedIdx, setSelectedIdx] = useState(null);

  const handleClick = (idx) => {
    setSelectedIdx(idx);
    // Push a unique URL so Vercel Analytics tracks which persona was chosen
    window.history.pushState({}, "", `/${flows[idx].id}`);
    // Short delay for a nice transition feel
    setTimeout(() => onSelect(idx), 300);
  };

  return (
    <div
      className={`min-h-screen w-full flex flex-col items-center px-4 py-8 sm:py-12 overflow-y-auto transition-opacity duration-300 ${
        selectedIdx !== null ? "opacity-0" : "opacity-100"
      }`}
      style={{ background: "linear-gradient(180deg, #FAFBFC 0%, #FFFFFF 50%)" }}
    >
      {/* Spacer to vertically center on tall screens */}
      <div className="flex-1 min-h-[20px]" />
      {/* Logos — Glean × Morningstar */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 fade-in">
        <img
          src={`${GLEAN_IMG}/glean-logo2.svg`}
          alt="Glean"
          className="h-9 sm:h-10"
          draggable="false"
        />
        <span className="text-gray-300 text-lg font-light select-none">×</span>
        <img
          src={morningstarLogo}
          alt="Morningstar"
          className="h-7 sm:h-8"
          draggable="false"
        />
      </div>

      {/* Headline */}
      <h1 className="text-xl sm:text-2xl md:text-[28px] font-semibold text-glean-text text-center mb-2 sm:mb-3 leading-snug fade-in">
        See what Glean could look like for Morningstar
      </h1>

      {/* Subheading */}
      <p className="text-sm sm:text-base text-glean-gray text-center mb-8 sm:mb-10 fade-in">
        Choose a perspective to explore
      </p>

      {/* 2×2 grid of persona cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 w-full max-w-[620px] mb-10 sm:mb-12">
        {flows.map((flow, idx) => (
          <button
            key={flow.id}
            onClick={() => handleClick(idx)}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            className={`fade-in-up group bg-white border rounded-xl px-5 sm:px-6 py-5 sm:py-6 text-left transition-all duration-200 cursor-pointer ${
              hoveredIdx === idx
                ? "border-glean-blue/40 shadow-lg shadow-blue-100/50 -translate-y-0.5"
                : "border-glean-border shadow-sm hover:shadow-md"
            }`}
            style={{ animationDelay: `${idx * 100 + 100}ms` }}
          >
            {/* Icon */}
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 transition-colors duration-200 ${
                hoveredIdx === idx ? "bg-blue-50" : "bg-gray-50"
              }`}
            >
              {PersonaIcons[flow.id]}
            </div>

            {/* Title */}
            <h3 className="text-base sm:text-[17px] font-semibold text-glean-text mb-1">
              {flow.persona.title}
            </h3>

            {/* Subtitle */}
            <p className="text-sm text-glean-gray leading-snug">
              {flow.persona.subtitle}
            </p>
          </button>
        ))}
      </div>

      {/* Bottom spacer to vertically center on tall screens */}
      <div className="flex-1 min-h-[20px]" />

      {/* Footer */}
      <p className="text-[11px] text-gray-400 text-center fade-in pb-2">
        Prepared for Morningstar by the Glean team
      </p>
    </div>
  );
}
