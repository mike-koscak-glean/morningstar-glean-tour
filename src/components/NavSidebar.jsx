import React from "react";

const GLEAN_IMG = "https://app.glean.com/images";

/**
 * MaskedIcon — renders a colorable icon using CSS mask-image,
 * exactly how the real Glean UI does it.
 */
const MaskedIcon = ({ src, size = 20, color }) => (
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

const NavIcon = ({ src, label, active = false, size = 20 }) => (
  <div
    className={`w-10 h-10 flex items-center justify-center rounded-xl cursor-default ${
      active ? "bg-blue-100" : ""
    }`}
    title={label}
  >
    <MaskedIcon
      src={src}
      size={size}
      color={active ? "#1C5BE0" : "#5F6368"}
    />
  </div>
);

const navItems = [
  { src: `${GLEAN_IMG}/nav-bar-home-2.svg`, label: "Home", key: "home" },
  { src: `${GLEAN_IMG}/message-with-sparkles-filled-3.svg`, label: "Chat", key: "chat" },
  { src: `${GLEAN_IMG}/agent-3.svg`, label: "Agents", key: "agents" },
  { src: `${GLEAN_IMG}/users-2.svg`, label: "People", key: "people" },
  { src: `${GLEAN_IMG}/layers-2.svg`, label: "Content", key: "content" },
  { src: `${GLEAN_IMG}/prism.svg`, label: "Prism", key: "prism" },
  { src: `${GLEAN_IMG}/tasks.svg`, label: "Tasks", key: "tasks" },
];

const bottomItems = [
  { src: `${GLEAN_IMG}/insights.svg`, label: "Analytics", size: 22 },
  { src: `${GLEAN_IMG}/feather/tool.svg`, label: "Settings", size: 22 },
];

export default function NavSidebar({ activeView = "home" }) {
  return (
    <nav className="w-[56px] h-full bg-white border-r border-glean-border flex flex-col items-center py-3 flex-shrink-0 pointer-events-none cursor-default select-none">
      {/* Glean Logo */}
      <div className="mb-4 mt-1">
        <img
          src={`${GLEAN_IMG}/glean-logo2.svg`}
          alt="Glean"
          className="w-7 h-7"
          draggable="false"
        />
      </div>

      {/* Main nav icons */}
      <div className="flex flex-col items-center gap-1 flex-1">
        {navItems.map((item) => (
          <NavIcon
            key={item.key}
            src={item.src}
            label={item.label}
            active={activeView === item.key}
          />
        ))}
      </div>

      {/* Bottom icons */}
      <div className="flex flex-col items-center gap-1 mb-1">
        {bottomItems.map((item) => (
          <NavIcon
            key={item.label}
            src={item.src}
            label={item.label}
            size={item.size}
          />
        ))}
        {/* User avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center mt-1">
          <span className="text-white text-xs font-semibold">S</span>
        </div>
      </div>

      {/* Glean wordmark at the very bottom */}
      <div className="mt-2 mb-1 opacity-0 pointer-events-none">
        {/* Hidden — wordmark is behind nav in collapsed state, just like real Glean */}
        <MaskedIcon
          src={`${GLEAN_IMG}/glean-text3.svg`}
          size={48}
          color="#5F6368"
        />
      </div>
    </nav>
  );
}
