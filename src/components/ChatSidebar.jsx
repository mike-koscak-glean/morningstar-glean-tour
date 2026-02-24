import React from "react";

const GLEAN_IMG = "https://app.glean.com/images";

const MaskedIcon = ({ src, size = 14, color = "#5F6368" }) => (
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

export default function ChatSidebar({ chatHistory }) {
  return (
    <div className="w-[240px] h-full bg-white border-r border-glean-border flex flex-col flex-shrink-0 pointer-events-none cursor-default select-none">
      {/* Header */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[15px] font-semibold text-glean-text">Chat</h2>
          <MaskedIcon src={`${GLEAN_IMG}/sliders-3.svg`} size={14} />
        </div>

        {/* New chat button */}
        <button className="w-full text-left text-sm text-glean-gray flex items-center gap-2 py-2 px-2 rounded-lg hover:bg-gray-50 mb-2">
          <MaskedIcon src={`${GLEAN_IMG}/feather/edit.svg`} size={16} />
          New chat
        </button>

        {/* Search input */}
        <div className="relative mb-3">
          <div className="absolute left-2.5 top-1/2 -translate-y-1/2">
            <MaskedIcon src={`${GLEAN_IMG}/feather/search.svg`} size={14} />
          </div>
          <input
            type="text"
            placeholder="Search by title"
            className="w-full text-sm bg-gray-50 border border-glean-border rounded-lg py-1.5 pl-8 pr-3 outline-none placeholder:text-gray-400"
            readOnly
          />
        </div>
      </div>

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto px-2">
        {/* Today section */}
        <div className="px-2 py-1.5 text-xs font-medium text-glean-gray uppercase tracking-wide">
          Today
        </div>
        {chatHistory.today.map((title) => (
          <div
            key={title}
            className="px-3 py-2 rounded-lg bg-blue-50 text-sm text-glean-blue font-medium truncate mb-0.5"
          >
            {title}
          </div>
        ))}

        {/* Recent section */}
        <div className="px-2 py-1.5 mt-2 text-xs font-medium text-glean-gray uppercase tracking-wide">
          Recent
        </div>
        {chatHistory.recent.map((title) => (
          <div
            key={title}
            className="px-3 py-2 rounded-lg text-sm text-glean-text truncate hover:bg-gray-50 mb-0.5"
          >
            {title}
          </div>
        ))}
      </div>
    </div>
  );
}
