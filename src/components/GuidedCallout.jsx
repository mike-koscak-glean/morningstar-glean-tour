import React, { useState, useEffect, useRef } from "react";

/**
 * GuidedCallout — positions a tooltip callout near a target element.
 *
 * Props:
 *   targetRef   — React ref to the DOM element to point at
 *   text        — callout body text
 *   arrowSide   — "top" (arrow points up, callout below target)
 *                  "bottom" (arrow points down, callout above target)
 *   arrowAlign  — "left" | "center" | "right" — horizontal arrow position
 *   onDismiss   — called when "Got it →" is clicked
 *   offsetY     — vertical gap from target (default 14)
 */
export default function GuidedCallout({
  targetRef,
  text,
  arrowSide = "top",
  arrowAlign = "left",
  onDismiss,
  offsetY = 14,
}) {
  const [pos, setPos] = useState(null);
  const calloutRef = useRef(null);

  useEffect(() => {
    const compute = () => {
      if (!targetRef?.current) return;
      const rect = targetRef.current.getBoundingClientRect();
      const vw = window.innerWidth;
      // Responsive width: narrower on small screens
      const calloutW = vw < 640 ? Math.min(300, vw - 24) : 340;

      // Horizontal: centre callout on target, then clamp
      let left;
      if (arrowAlign === "right") {
        left = rect.right - calloutW;
      } else if (arrowAlign === "center") {
        left = rect.left + rect.width / 2 - calloutW / 2;
      } else {
        left = rect.left;
      }

      // Clamp to viewport
      if (left < 12) left = 12;
      if (left + calloutW > vw - 12) {
        left = vw - 12 - calloutW;
      }

      // Vertical
      let top;
      if (arrowSide === "top") {
        top = rect.bottom + offsetY;
      } else {
        const calloutH = calloutRef.current?.offsetHeight || 130;
        top = rect.top - calloutH - offsetY;
      }

      // Clamp vertically too
      if (top < 8) top = 8;

      // Compute arrow left relative to the callout
      const targetCenterX = rect.left + rect.width / 2;
      let arrowLeft = targetCenterX - left;
      arrowLeft = Math.max(20, Math.min(calloutW - 20, arrowLeft));

      setPos({ top, left, arrowLeft, calloutW });
    };

    compute();
    window.addEventListener("resize", compute);
    window.addEventListener("scroll", compute, true);
    const timer = setTimeout(compute, 80);
    return () => {
      window.removeEventListener("resize", compute);
      window.removeEventListener("scroll", compute, true);
      clearTimeout(timer);
    };
  }, [targetRef, arrowSide, arrowAlign, offsetY]);

  if (!pos) return null;

  return (
    <>
      <div
        ref={calloutRef}
        className="callout-bubble fixed z-[95] bg-white border border-glean-border rounded-xl shadow-lg px-4 sm:px-5 py-3 sm:py-4"
        style={{
          top: pos.top,
          left: pos.left,
          width: pos.calloutW,
          maxWidth: "calc(100vw - 24px)",
        }}
      >
        {/* Arrow */}
        <div
          className="absolute"
          style={{
            left: pos.arrowLeft,
            ...(arrowSide === "top" ? { top: -7 } : { bottom: -7 }),
            width: 14,
            height: 14,
            transform: "translateX(-50%) rotate(45deg)",
            background: "white",
            borderRadius: "2px",
            ...(arrowSide === "top"
              ? {
                  borderLeft: "1px solid #E8EAED",
                  borderTop: "1px solid #E8EAED",
                }
              : {
                  borderRight: "1px solid #E8EAED",
                  borderBottom: "1px solid #E8EAED",
                }),
          }}
        />

        <p className="text-xs sm:text-sm text-glean-text leading-relaxed mb-2 sm:mb-3">
          {text}
        </p>
        <button
          onClick={onDismiss}
          className="text-xs sm:text-sm font-medium text-glean-blue hover:text-blue-700 transition-colors"
        >
          Got it →
        </button>
      </div>
    </>
  );
}
