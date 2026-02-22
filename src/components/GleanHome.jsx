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

  // Show the guide callout after a brief delay once intro modal is dismissed
  useEffect(() => {
    if (showGuide) {
      const t = setTimeout(() => setGuideVisible(true), 500);
      return () => clearTimeout(t);
    }
  }, [showGuide]);

  return (
    <div
      className="flex-1 h-full relative flex items-center justify-center"
      style={{
        background:
          "url('https://app.glean.com/images/stock/full/cesar-couto-bdDAnGcMIrs-unsplash.jpg') center center / cover no-repeat",
      }}
    >
      {/* Centered chat widget */}
      <div className="w-full max-w-[720px] px-6">
        {/* Greeting */}
        <h1 className="text-white text-[32px] font-semibold mb-6 text-center drop-shadow-lg">
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
              className="text-[15px] text-glean-text leading-relaxed min-h-[24px] outline-none"
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
              {/* Thinking chip */}
              <div className="flex items-center gap-1.5 text-glean-gray text-sm px-2 py-1 rounded-lg">
                <MaskedIcon
                  src={`${GLEAN_IMG}/lightbulb-3.svg`}
                  size={16}
                />
                <span>Thinking</span>
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

              {/* Pulsing ring around Run button */}
              {guideVisible && (
                <div className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none">
                  <div className="w-8 h-8 rounded-full border-2 border-glean-blue run-btn-pulse" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Guide callout — appears below the card after intro modal dismissed */}
        {guideVisible ? (
          <div className="flex justify-center mt-5 fade-in">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg px-5 py-3 flex items-center gap-3 max-w-[380px]">
              <div className="flex-shrink-0">
                <MaskedIcon
                  src={`${GLEAN_IMG}/feather/corner-down-left.svg`}
                  size={18}
                  color="#1C5BE0"
                />
              </div>
              <p className="text-sm text-glean-text leading-snug">
                This query is pre-loaded for the demo.
                <span className="font-medium text-glean-blue ml-1">
                  Press Enter
                </span>{" "}
                or click the blue button to see Glean in action.
              </p>
            </div>
          </div>
        ) : (
          <p className="text-white/80 text-sm text-center mt-4 drop-shadow">
            Press Enter or click Run to continue →
          </p>
        )}
      </div>
    </div>
  );
}
