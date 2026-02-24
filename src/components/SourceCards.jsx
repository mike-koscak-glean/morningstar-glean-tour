import React from "react";

/** Renders either an icon image or a colored-circle fallback */
function SourceIcon({ iconUrl, iconFallback, size = "w-full h-full" }) {
  if (iconUrl) {
    return (
      <img
        src={iconUrl}
        alt=""
        className={`${size} object-contain`}
        draggable="false"
      />
    );
  }
  if (iconFallback) {
    return (
      <div
        className="w-full h-full rounded flex items-center justify-center text-white text-xs font-bold"
        style={{ backgroundColor: iconFallback.color }}
      >
        {iconFallback.letter}
      </div>
    );
  }
  return null;
}

export default function SourceCards({ visible, sources }) {
  if (!visible || !sources) return null;

  return (
    <div className="mt-5">
      {/* Sources badge */}
      <div className="flex items-center gap-2 mb-3 fade-in">
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-full border border-glean-border">
          <div className="flex -space-x-1">
            {sources.map((s) => (
              <div
                key={s.id}
                className="w-4 h-4 rounded-sm border border-white overflow-hidden flex-shrink-0"
              >
                <SourceIcon iconUrl={s.iconUrl} iconFallback={s.iconFallback} />
              </div>
            ))}
          </div>
          <span className="text-sm text-glean-gray ml-1">
            {sources.length} sources
          </span>
        </div>
      </div>

      {/* Source cards — responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {sources.map((source, i) => (
          <div
            key={source.id}
            className="fade-in-up bg-white border border-glean-border rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 flex items-center gap-3"
            style={{ animationDelay: `${i * 150}ms` }}
          >
            {/* Icon */}
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 p-1.5 overflow-hidden">
              <SourceIcon
                iconUrl={source.iconUrl}
                iconFallback={source.iconFallback}
              />
            </div>
            {/* Text */}
            <div className="min-w-0">
              <div className="text-xs sm:text-sm font-medium text-glean-text truncate leading-tight">
                {source.title}
              </div>
              <div className="text-[11px] sm:text-xs text-glean-gray mt-0.5 truncate">
                {source.subtitle}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
