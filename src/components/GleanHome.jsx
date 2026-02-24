import React, { useEffect, useRef, useState } from "react";
import { greeting, userQuery } from "../data/conversation";

const GLEAN_IMG = "https://app.glean.com/images";

const MaskedIcon = ({ src, size = 16, color = "#5F6368" }) => (
  <div
    style={{
      maskImage: `url(${src})`,
      WebkitMaskImage: `url(${src})`,
      maskSize: "contain",
      WebkitMaskSize: "contain",
      maskRepeat: "no-repeat",
      WebkitMaskRepeat: "no-repeat",
      maskPosition: "center",
      WebkitMaskPosition: "center",
      background: color,
      width: size,
      height: size,
      minWidth: size,
    }}
  />
);

export default function GleanHome({ onRun, showGuide }) {
  const inputRef = useRef(null);
  const runBtnRef = useRef(null);
  const [guideVisible, setGuideVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        onRun();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onRun]);

  useEffect(() => {
    if (showGuide) {
      const t = setTimeout(() => setGuideVisible(true), 500);
      return () => clearTimeout(t);
    }
  }, [showGuide]);

  return (
    <div
      className="flex-1 h-full relative flex items-center justify-center px-4 sm:px-0"
      style={{
        background:
          "url('https://app.glean.com/images/stock/full/cesar-couto-bdDAnGcMIrs-unsplash.jpg') center center / cover no-repeat",
      }}
    >
      {/* Centered chat widget */}
      <div className="w-full max-w-[720px] px-0 sm:px-6">
        {/* Greeting */}
        <h1 className="text-white text-2xl sm:text-[32px] font-semibold mb-4 sm:mb-6 text-center drop-shadow-lg">
          {greeting}
        </h1>

        {/* Chat input card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Tabs */}
          <div className="flex items-center gap-0 px-4 pt-3">
            <button className="px-4 py-2 text-sm font-medium text-glean-blue border-b-2 border-glean-blue pointer-events-none cursor-default">
              Chat
            </button>
            <button className="px-4 py-2 text-sm font-medium text-glean-gray pointer-events-none cursor-default">
              Search
            </button>
          </div>

          {/* Input area */}
          <div className="px-4 pt-3 pb-3">
            <div
              ref={inputRef}
              className="text-sm sm:text-[15px] text-glean-text leading-relaxed min-h-[24px] outline-none"
            >
              {userQuery}
            </div>
          </div>

          {/* Bottom toolbar */}
          <div className="px-4 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 pointer-events-none cursor-default">
              {/* Plus button */}
              <div className="w-8 h-8 rounded-full border border-glean-border flex items-center justify-center">
                <MaskedIcon src={`${GLEAN_IMG}/feather/plus.svg`} size={16} />
              </div>
              {/* Globe icon */}
              <div className="flex items-center gap-1 px-2 py-1 rounded-lg">
                <MaskedIcon src={`${GLEAN_IMG}/feather/globe.svg`} size={16} />
              </div>
              {/* Thinking chip — hide label on very small screens */}
              <div className="flex items-center gap-1.5 text-glean-gray text-sm px-2 py-1 rounded-lg">
                <MaskedIcon
                  src={`${GLEAN_IMG}/lightbulb-3.svg`}
                  size={16}
                />
                <span className="hidden sm:inline">Thinking</span>
              </div>
            </div>

            {/* Run button */}
            <div className="relative">
              <button
                ref={runBtnRef}
                onClick={onRun}
                className="bg-glean-blue hover:bg-blue-700 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors cursor-pointer relative z-[2]"
                aria-label="Run"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M5 3l14 9-14 9V3z" />
                </svg>
              </button>

              {guideVisible && (
                <div className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none">
                  <div className="w-8 h-8 rounded-full border-2 border-glean-blue run-btn-pulse" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Guide callout — right-aligned, pointing at the run button */}
        {guideVisible ? (
          <div className="flex justify-end mt-3 sm:mt-4 fade-in px-2 sm:px-4">
            <div className="bob-animation relative">
              {/* Arrow pointing up toward the run button */}
              <div
                className="absolute -top-2 right-4"
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: "8px solid transparent",
                  borderRight: "8px solid transparent",
                  borderBottom: "8px solid rgba(255,255,255,0.95)",
                }}
              />
              <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg px-4 sm:px-5 py-3 max-w-[320px] sm:max-w-[340px]">
                <p className="text-xs sm:text-sm text-glean-text leading-snug text-center">
                  Tap the
                  <span className="inline-flex items-center justify-center w-5 h-5 bg-glean-blue rounded-full mx-1 align-middle">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                      <path d="M5 3l14 9-14 9V3z" />
                    </svg>
                  </span>
                  button or press{" "}
                  <span className="font-semibold text-glean-blue">Enter</span>{" "}
                  to try Glean
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-white/80 text-xs sm:text-sm text-center mt-3 sm:mt-4 drop-shadow">
            Press Enter or click Run to continue →
          </p>
        )}
      </div>
    </div>
  );
}
