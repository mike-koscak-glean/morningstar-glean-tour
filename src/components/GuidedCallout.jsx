import React, { useState, useEffect, useRef } from "react";

/**
 * GuidedCallout — positions a tooltip callout near a target element.
 *
 * Automatically flips above/below the target if the callout would overflow
 * the viewport, ensuring the "Got it →" button is always accessible.
 */
export default function GuidedCallout({
  targetRef,
  text,
  arrowSide: preferredArrowSide = "top",
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
      const vh = window.innerHeight;
      const calloutW = vw < 640 ? Math.min(300, vw - 24) : 340;
      const calloutH = calloutRef.current?.offsetHeight || 140;
      const margin = 12; // safe edge margin

      // ── Horizontal positioning ──
      let left;
      if (arrowAlign === "right") {
        left = rect.right - calloutW;
      } else if (arrowAlign === "center") {
        left = rect.left + rect.width / 2 - calloutW / 2;
      } else {
        left = rect.left;
      }
      // Clamp horizontally
      if (left < margin) left = margin;
      if (left + calloutW > vw - margin) left = vw - margin - calloutW;

      // ── Vertical positioning — auto-flip if needed ──
      let actualArrowSide = preferredArrowSide;
      let top;

      if (preferredArrowSide === "top") {
        // Prefer below target
        top = rect.bottom + offsetY;
        // If callout would overflow bottom, flip above
        if (top + calloutH > vh - margin) {
          top = rect.top - calloutH - offsetY;
          actualArrowSide = "bottom";
        }
      } else {
        // Prefer above target
        top = rect.top - calloutH - offsetY;
        // If callout would overflow top, flip below
        if (top < margin) {
          top = rect.bottom + offsetY;
          actualArrowSide = "top";
        }
      }

      // Final clamp — ensure never off-screen on either edge
      if (top + calloutH > vh - margin) {
        top = vh - margin - calloutH;
      }
      if (top < margin) top = margin;

      // ── Arrow position ──
      const targetCenterX = rect.left + rect.width / 2;
      let arrowLeft = targetCenterX - left;
      arrowLeft = Math.max(20, Math.min(calloutW - 20, arrowLeft));

      setPos({ top, left, arrowLeft, calloutW, actualArrowSide });
    };

    compute();
    window.addEventListener("resize", compute);
    window.addEventListener("scroll", compute, true);
    // Re-compute a few times as the callout renders and its height becomes known
    const t1 = setTimeout(compute, 50);
    const t2 = setTimeout(compute, 150);
    return () => {
      window.removeEventListener("resize", compute);
      window.removeEventListener("scroll", compute, true);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [targetRef, preferredArrowSide, arrowAlign, offsetY]);

  if (!pos) return null;

  const side = pos.actualArrowSide;

  return (
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
          ...(side === "top" ? { top: -7 } : { bottom: -7 }),
          width: 14,
          height: 14,
          transform: "translateX(-50%) rotate(45deg)",
          background: "white",
          borderRadius: "2px",
          ...(side === "top"
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
  );
}
