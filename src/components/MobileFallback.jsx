import React, { useState } from "react";

const GLEAN_IMG = "https://app.glean.com/images";

export default function MobileFallback() {
  const [emailSent, setEmailSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: select a hidden input
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center px-8 bg-white font-inter">
      {/* Glean logo */}
      <img
        src={`${GLEAN_IMG}/glean-logo2.svg`}
        alt="Glean"
        className="w-12 h-12 mb-8"
        draggable="false"
      />

      {/* Headline */}
      <h1 className="text-xl font-semibold text-glean-text text-center mb-3 leading-snug">
        This demo is best on
        <br />a larger screen
      </h1>

      {/* Body */}
      <p className="text-sm text-glean-gray text-center leading-relaxed mb-8 max-w-[320px]">
        We put this together specifically for your team — open it on a laptop or
        desktop for the full experience.
      </p>

      {/* Send to email button */}
      {!emailSent ? (
        <button
          onClick={() => setEmailSent(true)}
          className="w-full max-w-[280px] bg-glean-blue hover:bg-blue-700 text-white font-medium text-[15px] py-3 rounded-lg transition-colors mb-4"
        >
          Send to my email
        </button>
      ) : (
        <div className="w-full max-w-[280px] bg-green-50 border border-green-200 text-green-700 text-sm font-medium py-3 rounded-lg text-center mb-4">
          Thanks! Check your inbox shortly.
        </div>
      )}

      {/* Copy link row */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-xs text-glean-gray">Or forward this link:</p>
        <div className="flex items-center gap-2 bg-gray-50 border border-glean-border rounded-lg px-3 py-2 max-w-[300px]">
          <span className="text-xs text-glean-text truncate flex-1">
            {currentUrl}
          </span>
          <button
            onClick={handleCopy}
            className="text-xs font-medium text-glean-blue hover:text-blue-700 flex-shrink-0 transition-colors"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      {/* Footer */}
      <p className="text-[11px] text-gray-400 mt-10 text-center">
        Prepared for TransUnion by the Glean team
      </p>
    </div>
  );
}
