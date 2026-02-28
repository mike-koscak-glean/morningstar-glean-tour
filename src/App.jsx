import React, { useState, useCallback } from "react";
import { Analytics } from "@vercel/analytics/react";
import NavSidebar from "./components/NavSidebar";
import GleanHome from "./components/GleanHome";
import GleanChat from "./components/GleanChat";
import IntroModal from "./components/IntroModal";
import PersonaSelect from "./components/PersonaSelect";
import { flows } from "./data/conversations";

export default function App() {
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [view, setView] = useState("home"); // "home" | "chat"
  const [showIntro, setShowIntro] = useState(true);

  const handlePersonaSelect = useCallback((idx) => {
    setSelectedPersona(idx);
  }, []);

  const handleRun = useCallback(() => {
    setView("chat");
  }, []);

  const handleIntroDismiss = useCallback(() => {
    setShowIntro(false);
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
            <GleanChat flow={activeFlow} />
          )}
        </div>
      </div>

      {/* Intro modal — shows above everything */}
      {showIntro && <IntroModal onDismiss={handleIntroDismiss} />}
      <Analytics />
    </>
  );
}
