import React, { useState, useCallback, useEffect } from "react";
import NavSidebar from "./components/NavSidebar";
import GleanHome from "./components/GleanHome";
import GleanChat from "./components/GleanChat";
import IntroModal from "./components/IntroModal";
import MobileFallback from "./components/MobileFallback";

export default function App() {
  const [view, setView] = useState("home"); // "home" | "chat"
  const [showIntro, setShowIntro] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  /* ── Mobile check ── */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleRun = useCallback(() => {
    setView("chat");
  }, []);

  const handleIntroDismiss = useCallback(() => {
    setShowIntro(false);
  }, []);

  /* ── Mobile fallback ── */
  if (isMobile) {
    return <MobileFallback />;
  }

  return (
    <>
      <div className="h-screen w-screen flex font-inter overflow-hidden bg-white">
        {/* Left icon navigation — always visible */}
        <NavSidebar activeView={view} />

        {/* Main content area */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {view === "home" ? (
            <div className="flex-1 flex flex-col h-full">
              <GleanHome onRun={handleRun} showGuide={!showIntro} />
              {/* Footer on homepage */}
              <p className="text-[11px] text-gray-400 text-center pb-3 flex-shrink-0">
                Prepared for TransUnion by the Glean team
              </p>
            </div>
          ) : (
            <GleanChat />
          )}
        </div>
      </div>

      {/* Intro modal — shows above everything */}
      {showIntro && <IntroModal onDismiss={handleIntroDismiss} />}
    </>
  );
}
