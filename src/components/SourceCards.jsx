import React from "react";
import { sources } from "../data/conversation";

export default function SourceCards({ visible }) {
  if (!visible) return null;

  return (
    <div className="mt-5">
      {/* Sources badge */}
      <div className="flex items-center gap-2 mb-3 fade-in">
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-full border border-glean-border">
          <div className="flex -space-x-1">
            {sources.map((s) => (
              <img
                key={s.id}
                src={s.iconUrl}
                alt=""
                className="w-4 h-4 rounded-sm border border-white"
                draggable="false"
              />
            ))}
          </div>
          <span className="text-sm text-glean-gray ml-1">
            {sources.length} sources
          </span>
        </div>
      </div>

      {/* Source cards */}
      <div className="flex gap-3 flex-wrap">
        {sources.map((source, i) => (
          <div
            key={source.id}
            className="fade-in-up bg-white border border-glean-border rounded-lg px-4 py-3 flex items-center gap-3 min-w-[260px] max-w-[300px] flex-1"
            style={{ animationDelay: `${i * 150}ms` }}
          >
            {/* Icon */}
            <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 p-1.5">
              <img
                src={source.iconUrl}
                alt=""
                className="w-full h-full object-contain"
                draggable="false"
              />
            </div>
            {/* Text */}
            <div className="min-w-0">
              <div className="text-sm font-medium text-glean-text truncate leading-tight">
                {source.title}
              </div>
              <div className="text-xs text-glean-gray mt-0.5 truncate">
                {source.subtitle}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
