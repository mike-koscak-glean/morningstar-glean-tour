import React, { useState, useEffect, useRef, useCallback } from "react";
import ChatSidebar from "./ChatSidebar";
import MessageStream from "./MessageStream";
import SourceCards from "./SourceCards";
import GuidedCallout from "./GuidedCallout";
import FollowUpModal from "./FollowUpModal";
import { userQuery, aiResponse, followUpQuery } from "../data/conversation";

const GLEAN_IMG = "https://app.glean.com/images";

const MaskedIcon = ({ src, size = 16, color = "#5F6368" }) => (
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

/* ── Callout definitions ── */
const CALLOUTS = [
  {
    text: "Employees ask questions in plain English — no special syntax or training needed.",
    arrowSide: "top",
    arrowAlign: "right",
  },
  {
    text: "Glean shows its reasoning. You can inspect which documents it searched and how it formed its answer.",
    arrowSide: "top",
    arrowAlign: "left",
  },
  {
    text: "Every fact is cited. Click any number to jump directly to the source document.",
    arrowSide: "top",
    arrowAlign: "left",
  },
  {
    text: "In a live environment, these open directly in Confluence, Jira, SharePoint — wherever the doc lives.",
    arrowSide: "top",
    arrowAlign: "left",
  },
  {
    text: "Try running a follow-up — in a live environment Glean would pull from your real documents and give you an instant answer.",
    arrowSide: "bottom",
    arrowAlign: "center",
  },
];

export default function GleanChat() {
  /*
   * Phase pipeline:
   *   query → callout0 → thinking → showWork → callout1 →
   *   streaming → callout2 → showSources → callout3 →
   *   typing → callout4 → waitForEnter → done
   */

  const [phase, setPhase] = useState("query");
  const [showWork, setShowWork] = useState(false);
  const [showSources, setShowSources] = useState(false);
  const [demoComplete, setDemoComplete] = useState(false);

  /* ── Follow-up typewriter ── */
  const [followUpText, setFollowUpText] = useState("");
  const [showFollowUp, setShowFollowUp] = useState(false);

  /* ── Refs for callout targets ── */
  const queryBubbleRef = useRef(null);
  const showWorkRef = useRef(null);
  const firstCitationRef = useRef(null);
  const sourceCardsRef = useRef(null);
  const inputBarRef = useRef(null);
  const scrollContainerRef = useRef(null);

  /* ── Phase progression timers ── */
  useEffect(() => {
    if (phase === "query") {
      const t = setTimeout(() => setPhase("callout0"), 700);
      return () => clearTimeout(t);
    }
    if (phase === "thinking") {
      const t = setTimeout(() => {
        setShowWork(true);
        setPhase("showWork");
      }, 2200);
      return () => clearTimeout(t);
    }
    if (phase === "showWork") {
      const t = setTimeout(() => setPhase("callout1"), 400);
      return () => clearTimeout(t);
    }
    if (phase === "showSources") {
      setShowSources(true);
      const t = setTimeout(() => setPhase("callout3"), 700);
      return () => clearTimeout(t);
    }
    if (phase === "typing") {
      // Typewriter-populate the follow-up query character by character
      let charIdx = 0;
      const interval = setInterval(() => {
        charIdx++;
        if (charIdx > followUpQuery.length) {
          clearInterval(interval);
          // Brief pause then show callout 4
          setTimeout(() => setPhase("callout4"), 400);
          return;
        }
        setFollowUpText(followUpQuery.slice(0, charIdx));
      }, 35);
      return () => clearInterval(interval);
    }
  }, [phase]);

  /* ── Callout dismiss handler ── */
  const handleCalloutDismiss = useCallback(() => {
    if (phase === "callout0") {
      setPhase("thinking");
    } else if (phase === "callout1") {
      setPhase("streaming");
    } else if (phase === "callout2") {
      setPhase("showSources");
    } else if (phase === "callout3") {
      // Start auto-typing follow-up
      setPhase("typing");
    } else if (phase === "callout4") {
      // Now waiting for user to press Enter
      setPhase("waitForEnter");
    }
  }, [phase]);

  /* ── When streaming finishes ── */
  const handleStreamComplete = useCallback(() => {
    setTimeout(() => {
      const el = document.querySelector(".citation-circle");
      if (el) firstCitationRef.current = el;
      setPhase("callout2");
    }, 600);
  }, []);

  /* ── Auto-scroll ── */
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      const observer = new MutationObserver(() => {
        el.scrollTop = el.scrollHeight;
      });
      observer.observe(el, {
        childList: true,
        subtree: true,
        characterData: true,
      });
      return () => observer.disconnect();
    }
  }, []);

  /* ── Follow-up Enter handler ── */
  const handleFollowUpKeyDown = (e) => {
    if (e.key === "Enter" && followUpText.trim()) {
      e.preventDefault();
      setShowFollowUp(true);
    }
  };

  /* ── Determine which callout to show ── */
  const getCallout = () => {
    if (phase === "callout0") return { idx: 0, ref: queryBubbleRef };
    if (phase === "callout1") return { idx: 1, ref: showWorkRef };
    if (phase === "callout2")
      return { idx: 2, ref: { current: firstCitationRef.current } };
    if (phase === "callout3") return { idx: 3, ref: sourceCardsRef };
    if (phase === "callout4") return { idx: 4, ref: inputBarRef };
    return null;
  };

  const callout = getCallout();

  /* ── Visibility helpers ── */
  const showThinking =
    phase === "thinking" || phase === "showWork" || phase === "callout1";
  const showStream =
    phase === "streaming" ||
    phase === "callout2" ||
    phase === "showSources" ||
    phase === "callout3" ||
    phase === "typing" ||
    phase === "callout4" ||
    phase === "waitForEnter" ||
    phase === "done";

  // Input is fully interactive only in "waitForEnter" or "done"
  const inputInteractive = phase === "waitForEnter" || phase === "done";
  // Input bar looks active once typing starts
  const inputLooksActive =
    phase === "typing" ||
    phase === "callout4" ||
    phase === "waitForEnter" ||
    phase === "done";

  return (
    <div className="flex-1 h-full flex overflow-hidden">
      <ChatSidebar />

      <div className="flex-1 flex flex-col h-full bg-white overflow-hidden">
        {/* Top bar */}
        <header className="h-12 flex items-center justify-between px-4 border-b border-glean-border flex-shrink-0">
          <div className="flex items-center gap-3 pointer-events-none cursor-default">
            <MaskedIcon src={`${GLEAN_IMG}/feather/menu.svg`} size={16} />
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-glean-text">
            <MaskedIcon
              src={`${GLEAN_IMG}/message-with-sparkles-3.svg`}
              size={16}
            />
            Assistant
          </div>
          <div className="flex items-center gap-2 pointer-events-none cursor-default">
            <MaskedIcon
              src={`${GLEAN_IMG}/feather/more-horizontal.svg`}
              size={16}
            />
            <button className="flex items-center gap-1.5 text-sm text-glean-gray border border-glean-border rounded-lg px-3 py-1.5">
              <MaskedIcon src={`${GLEAN_IMG}/feather/lock.svg`} size={14} />
              Share
            </button>
          </div>
        </header>

        {/* Scrollable chat messages */}
        <div
          ref={scrollContainerRef}
          data-scroll-container
          className="flex-1 overflow-y-auto"
        >
          <div className="max-w-[780px] mx-auto px-6 py-6">
            {/* User query bubble */}
            <div
              ref={queryBubbleRef}
              className="flex justify-end mb-6 slide-in-right"
            >
              <div className="bg-glean-bubble rounded-2xl px-4 py-3 max-w-[85%]">
                <p className="text-[15px] text-glean-text">{userQuery}</p>
              </div>
            </div>

            {/* AI Response area */}
            <div className="mb-4">
              {showWork && (
                <div ref={showWorkRef} className="mb-3 fade-in">
                  <button className="text-sm text-glean-gray flex items-center gap-1 pointer-events-none cursor-default">
                    Show work
                    <MaskedIcon
                      src={`${GLEAN_IMG}/feather/chevron-right.svg`}
                      size={14}
                    />
                  </button>
                </div>
              )}

              {showThinking && (
                <div className="flex items-center gap-2 thinking-pulse fade-in">
                  <MaskedIcon
                    src={`${GLEAN_IMG}/message-with-sparkles-filled-3.svg`}
                    size={18}
                    color="#1C5BE0"
                  />
                  <span className="text-sm text-glean-gray font-medium">
                    Thinking…
                  </span>
                </div>
              )}

              {showStream && (
                <MessageStream
                  text={aiResponse}
                  onComplete={handleStreamComplete}
                />
              )}

              <div ref={sourceCardsRef}>
                <SourceCards visible={showSources} />
              </div>
            </div>
          </div>
        </div>

        {/* Follow-up input bar */}
        <div className="flex-shrink-0 px-6 pb-4 pt-2">
          <div
            ref={inputBarRef}
            className={`max-w-[780px] mx-auto border border-glean-border rounded-2xl transition-all ${
              inputLooksActive ? "shadow-sm" : "opacity-60"
            }`}
          >
            <div className="px-4 py-3">
              {inputInteractive ? (
                /* Fully editable input */
                <input
                  type="text"
                  value={followUpText}
                  onChange={(e) => setFollowUpText(e.target.value)}
                  onKeyDown={handleFollowUpKeyDown}
                  placeholder="Explore a topic…"
                  className="w-full text-[15px] text-glean-text placeholder-gray-400 outline-none bg-transparent"
                  autoFocus
                />
              ) : followUpText ? (
                /* Typewriter preview (read-only, shows chars as they type in) */
                <div className="text-[15px] text-glean-text flex items-center">
                  {followUpText}
                  {phase === "typing" && (
                    <span className="inline-block w-[2px] h-[18px] bg-glean-text ml-0.5 -mb-[3px] cursor-blink" />
                  )}
                </div>
              ) : (
                /* Placeholder */
                <div className="text-[15px] text-gray-400 flex items-center">
                  Explore a topic…
                </div>
              )}
            </div>
            <div className="px-4 pb-3 flex items-center justify-between pointer-events-none cursor-default">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full border border-glean-border flex items-center justify-center">
                  <MaskedIcon
                    src={`${GLEAN_IMG}/feather/plus.svg`}
                    size={14}
                  />
                </div>
                <MaskedIcon
                  src={`${GLEAN_IMG}/feather/globe.svg`}
                  size={16}
                />
                <MaskedIcon src={`${GLEAN_IMG}/building.svg`} size={16} />
                <div className="flex items-center gap-1.5 text-sm text-glean-gray">
                  <MaskedIcon src={`${GLEAN_IMG}/lightbulb-3.svg`} size={16} />
                  <span>Thinking</span>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full flex items-center justify-center">
                  <MaskedIcon src={`${GLEAN_IMG}/voice.svg`} size={16} />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="text-[11px] text-gray-400 text-center mt-3">
            Prepared for Kemper by the Glean team
          </p>
        </div>
      </div>

      {/* ── Guided callout overlay ── */}
      {callout && (
        <GuidedCallout
          key={callout.idx}
          targetRef={callout.ref}
          text={CALLOUTS[callout.idx].text}
          arrowSide={CALLOUTS[callout.idx].arrowSide}
          arrowAlign={CALLOUTS[callout.idx].arrowAlign}
          onDismiss={handleCalloutDismiss}
        />
      )}

      {/* ── Follow-up modal ── */}
      {showFollowUp && (
        <FollowUpModal onClose={() => setShowFollowUp(false)} />
      )}
    </div>
  );
}
