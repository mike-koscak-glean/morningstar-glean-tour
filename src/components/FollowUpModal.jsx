import React from "react";

export default function FollowUpModal() {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 modal-backdrop"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[440px] px-5 sm:px-8 py-6 sm:py-8 modal-card">
        {/* Headline */}
        <h2 className="text-lg font-semibold text-glean-text text-center mb-3 leading-snug">
          Want to see Glean answer
          <br />
          your real questions?
        </h2>

        {/* Body */}
        <p className="text-sm text-glean-gray text-center leading-relaxed mb-6">
          In a live Glean environment, you'd get a real answer here — connected
          to Kemper's actual documents and tools. Let's set up 30 minutes to
          show you the real thing.
        </p>

        {/* Primary CTA — only option */}
        <a
          href="#book"
          className="block w-full bg-glean-blue hover:bg-blue-700 text-white font-medium text-[15px] py-3 rounded-lg transition-colors text-center"
        >
          Book a meeting →
        </a>
      </div>
    </div>
  );
}
