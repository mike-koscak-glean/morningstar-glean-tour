import React, { useState, useRef, useEffect, useContext, createContext } from "react";

/** Context so CitationBubble can access the active flow's sources */
export const SourcesContext = createContext([]);

export default function CitationBubble({ num }) {
  const sources = useContext(SourcesContext);
  const [hovered, setHovered] = useState(false);
  const [popoverStyle, setPopoverStyle] = useState({});
  const bubbleRef = useRef(null);
  const popoverRef = useRef(null);

  const source = sources.find((s) => s.id === Number(num));

  // Position popover so it doesn't overflow the viewport
  useEffect(() => {
    if (hovered && bubbleRef.current && popoverRef.current) {
      const bubbleRect = bubbleRef.current.getBoundingClientRect();
      const popover = popoverRef.current;
      const popoverRect = popover.getBoundingClientRect();

      const style = {};

      // Horizontal: center under the bubble, but clamp to viewport
      let left =
        bubbleRect.left + bubbleRect.width / 2 - popoverRect.width / 2;
      if (left < 8) left = 8;
      if (left + popoverRect.width > window.innerWidth - 8) {
        left = window.innerWidth - 8 - popoverRect.width;
      }
      style.left = left + "px";

      // Vertical: prefer below, fall back to above
      const spaceBelow = window.innerHeight - bubbleRect.bottom;
      if (spaceBelow >= popoverRect.height + 8) {
        style.top = bubbleRect.bottom + 6 + "px";
      } else {
        style.top = bubbleRect.top - popoverRect.height - 6 + "px";
      }

      setPopoverStyle(style);
    }
  }, [hovered]);

  if (!source) {
    return <span className="citation-circle">{num}</span>;
  }

  /** Render either an icon image or a colored-circle fallback */
  const renderIcon = () => {
    if (source.iconUrl) {
      return (
        <img
          src={source.iconUrl}
          alt=""
          className="w-full h-full object-contain"
          draggable="false"
        />
      );
    }
    if (source.iconFallback) {
      return (
        <div
          className="w-full h-full rounded flex items-center justify-center text-white text-[10px] font-bold"
          style={{ backgroundColor: source.iconFallback.color }}
        >
          {source.iconFallback.letter}
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <span
        ref={bubbleRef}
        className="citation-circle"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {num}
      </span>

      {hovered && (
        <div
          ref={popoverRef}
          className="citation-popover"
          style={popoverStyle}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Header */}
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 p-1 overflow-hidden">
              {renderIcon()}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium text-glean-text leading-tight truncate">
                {source.title}
              </div>
              <div className="text-xs text-glean-gray mt-0.5">
                {source.author} · {source.subtitle}
              </div>
            </div>
          </div>

          {/* Excerpt */}
          <div className="citation-popover-excerpt">
            <span className="citation-popover-highlight">
              {source.excerpt}
            </span>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-glean-border">
            <span className="text-xs text-glean-gray">1 of 1 excerpts</span>
          </div>
        </div>
      )}
    </>
  );
}
