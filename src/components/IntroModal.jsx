import React, { useState } from "react";

const GLEAN_IMG = "https://app.glean.com/images";

const MaskedIcon = ({ src, size = 20, color = "#1C5BE0" }) => (
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

const bullets = [
  {
    icon: `${GLEAN_IMG}/feather/search.svg`,
    text: "One place to search and chat across all your company's tools — Confluence, Jira, SharePoint, Teams, and more",
  },
  {
    icon: `${GLEAN_IMG}/lightbulb-3.svg`,
    text: "Answers grounded in your actual documents, with citations so you can verify every claim",
  },
  {
    icon: `${GLEAN_IMG}/feather/lock.svg`,
    text: "Enterprise-grade security — Glean respects existing permissions, so people only see what they're allowed to",
  },
];

export default function IntroModal({ onDismiss }) {
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    setTimeout(onDismiss, 250);
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center px-4 ${
        closing ? "modal-backdrop-out" : "modal-backdrop"
      }`}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.55)" }}
    >
      <div
        className={`bg-white rounded-2xl shadow-2xl w-full max-w-[480px] px-8 py-8 ${
          closing ? "modal-card-out" : "modal-card"
        }`}
      >
        {/* Prepared for label */}
        <p className="text-xs text-glean-gray text-center mb-5 tracking-wide">
          Prepared for Kemper by the Glean team
        </p>

        {/* Glean logo */}
        <div className="flex justify-center mb-6">
          <img
            src={`${GLEAN_IMG}/glean-logo2.svg`}
            alt="Glean"
            className="w-10 h-10"
            draggable="false"
          />
        </div>

        {/* Headline */}
        <h1 className="text-xl font-semibold text-glean-text text-center mb-6 leading-snug">
          See what Glean could look like
          <br />
          for Kemper
        </h1>

        {/* Bullet points */}
        <div className="flex flex-col gap-4 mb-8">
          {bullets.map((b, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="mt-0.5 flex-shrink-0">
                <MaskedIcon src={b.icon} size={18} color="#1C5BE0" />
              </div>
              <p className="text-sm text-glean-text leading-relaxed">
                {b.text}
              </p>
            </div>
          ))}
        </div>

        {/* CTA button */}
        <button
          onClick={handleClose}
          className="w-full bg-glean-blue hover:bg-blue-700 text-white font-medium text-[15px] py-3 rounded-lg transition-colors"
        >
          Show me how it works →
        </button>

        {/* Sub-text */}
        <p className="text-xs text-glean-gray text-center mt-4">
          This is a personalized demo — no login required
        </p>
      </div>
    </div>
  );
}
