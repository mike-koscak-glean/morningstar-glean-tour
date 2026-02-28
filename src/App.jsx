import React, { useState, useCallback, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import NavSidebar from "./components/NavSidebar";
import GleanHome from "./components/GleanHome";
import GleanChat from "./components/GleanChat";
import IntroModal from "./components/IntroModal";
import PersonaSelect from "./components/PersonaSelect";
import { flows } from "./data/conversations";

/** Map a URL pathname like "/sales" → flow index, or null for unknown/root */
function personaIdxFromPath(pathname) {
  const slug = pathname.replace(/^\//, "").toLowerCase();
  const idx = flows.findIndex((f) => f.id === slug);
  return idx >= 0 ? idx : null;
}

export default function App() {
  // Initialise from the URL so deep-links like /sales work directly
  const [selectedPersona, setSelectedPersona] = useState(() =>
    personaIdxFromPath(window.location.pathname)
  );
  const [view, setView] = useState("home"); // "home" | "chat"
  const [showIntro, setShowIntro] = useState(true);

  // Handle browser back/forward navigation
  useEffect(() => {
    const onPopState = () => {
      const idx = personaIdxFromPath(window.location.pathname);
      if (idx === null) {
        // Back to root — reset to persona selection
        setSelectedPersona(null);
        setView("home");
        setShowIntro(true);
      } else {
        setSelectedPersona(idx);
      }
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const handlePersonaSelect = useCallback((idx) => {
    setSelectedPersona(idx);
  }, []);

  const handleRun = useCallback(() => {
    setView("chat");
  }, []);

  const handleIntroDismiss = useCallback(() => {
    setShowIntro(false);
  }, []);

  const handleRestart = useCallback(() => {
    window.history.pushState({}, "", "/");
    setSelectedPersona(null);
    setView("home");
    setShowIntro(true);
  }, []);

  // Show persona selection page when no persona is chosen
  if (selectedPersona === null) {
    return (
      <>
        <PersonaSelect onSelect={handlePersonaSelect} />
        <Analytics />
      </>
    );
  }

  const activeFlow = flows[selectedPersona];

  return (
    <>
      <div className="h-screen w-screen flex font-inter overflow-hidden bg-white">
        {/* Left icon navigation — hidden on mobile */}
        <div className="hidden md:block">
          <NavSidebar activeView={view} />
        </div>

        {/* Main content area */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {view === "home" ? (
            <div className="flex-1 flex flex-col h-full">
              <GleanHome
                onRun={handleRun}
                showGuide={!showIntro}
                greeting={activeFlow.greeting}
                userQuery={activeFlow.userQuery}
              />
              {/* Footer on homepage */}
              <p className="text-[11px] text-gray-400 text-center pb-3 flex-shrink-0">
                Prepared for Morningstar by the Glean team
              </p>
            </div>
          ) : (
            <GleanChat flow={activeFlow} onRestart={handleRestart} />
          )}
        </div>
      </div>

      {/* Intro modal — shows above everything */}
      {showIntro && <IntroModal onDismiss={handleIntroDismiss} />}
      <Analytics />
    </>
  );
}
