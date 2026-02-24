import React, { useState, useEffect, useRef, useCallback } from "react";
import ChatSidebar from "./ChatSidebar";
import MessageStream from "./MessageStream";
import SourceCards from "./SourceCards";
import GuidedCallout from "./GuidedCallout";
import FollowUpModal from "./FollowUpModal";
import { SourcesContext } from "./CitationBubble";

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

/** Renders either an icon image or a colored-circle letter fallback */
function DocIcon({ icon, iconFallback, size = 14 }) {
  if (icon) {
    return (
      <img
        src={icon}
        alt=""
        style={{ width: size, height: size }}
        className="flex-shrink-0"
        draggable="false"
      />
    );
  }
  if (iconFallback) {
    return (
      <div
        className="rounded flex items-center justify-center text-white font-bold flex-shrink-0"
        style={{
          width: size,
          height: size,
          fontSize: size * 0.6,
          backgroundColor: iconFallback.color,
        }}
      >
        {iconFallback.letter}
      </div>
    );
  }
  return null;
}

/* ── Build "Show work" steps from flow data ── */
function buildShowWorkSteps(showWork) {
  return [
    {
      heading: "Searching company knowledge",
      items: [
        {
          icon: `${GLEAN_IMG}/feather/search.svg`,
          iconFallback: null,
          label: showWork.searchQuery,
        },
      ],
      docs: showWork.searching,
    },
    {
      heading: "Reading documents",
      items: [],
      docs: showWork.reading,
    },
    {
      heading: "Synthesizing answer",
      items: [],
      docs: [
        {
          icon: showWork.synthesizing.icon,
          iconFallback: showWork.synthesizing.iconFallback,
          label: showWork.synthesizing.label,
        },
      ],
      note: showWork.synthesizing.note,
    },
  ];
}

/* ── Callout definitions (same across all flows) ── */
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
    text: "Want to see Glean answer your team's real questions? Let's set up a live demo.",
    arrowSide: "bottom",
    arrowAlign: "center",
  },
];

export default function GleanChat({ flow }) {
  const {
    userQuery,
    aiResponse,
    followUpQuery,
    sources,
    chatHistory,
    showWork: showWorkData,
  } = flow;

  const SHOW_WORK_STEPS = buildShowWorkSteps(showWorkData);

  const [phase, setPhase] = useState("query");
  const [showWork, setShowWork] = useState(false);
  const [showSources, setShowSources] = useState(false);
  const [workExpanded, setWorkExpanded] = useState(false);

  const [followUpText, setFollowUpText] = useState("");
  const [showFollowUp, setShowFollowUp] = useState(false);

  const queryBubbleRef = useRef(null);
  const showWorkRef = useRef(null);
  const citationRef = useRef(null);
  const sourceCardsRef = useRef(null);
  const inputBarRef = useRef(null);
  const scrollContainerRef = useRef(null);

  /* ── Helper: scroll chat to bottom ── */
  const scrollToBottom = useCallback(() => {
    const el = scrollContainerRef.current;
    if (el) {
      requestAnimationFrame(() => {
        el.scrollTop = el.scrollHeight;
      });
    }
  }, []);

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
      let charIdx = 0;
      const interval = setInterval(() => {
        charIdx++;
        if (charIdx > followUpQuery.length) {
          clearInterval(interval);
          setTimeout(() => setPhase("callout4"), 400);
          return;
        }
        setFollowUpText(followUpQuery.slice(0, charIdx));
      }, 35);
      return () => clearInterval(interval);
    }
  }, [phase, followUpQuery]);

  /* ── Auto-scroll when callout phases activate ── */
  useEffect(() => {
    if (
      phase === "callout2" ||
      phase === "callout3" ||
      phase === "callout4" ||
      phase === "showSources" ||
      phase === "typing"
    ) {
      const t = setTimeout(scrollToBottom, 100);
      return () => clearTimeout(t);
    }
  }, [phase, scrollToBottom]);

  const handleCalloutDismiss = useCallback(() => {
    if (phase === "callout0") setPhase("thinking");
    else if (phase === "callout1") {
      setWorkExpanded(true);
      setPhase("streaming");
    } else if (phase === "callout2") setPhase("showSources");
    else if (phase === "callout3") setPhase("typing");
    else if (phase === "callout4") {
      setShowFollowUp(true);
    }
  }, [phase]);

  /* ── When streaming finishes, find last citation for the callout ── */
  const handleStreamComplete = useCallback(() => {
    setTimeout(() => {
      const allCitations = document.querySelectorAll(".citation-circle");
      const target =
        allCitations.length > 0
          ? allCitations[allCitations.length - 1]
          : null;
      if (target) citationRef.current = target;
      setPhase("callout2");
    }, 600);
  }, []);

  /* ── Auto-scroll on content mutations ── */
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

  const getCallout = () => {
    if (phase === "callout0") return { idx: 0, ref: queryBubbleRef };
    if (phase === "callout1") return { idx: 1, ref: showWorkRef };
    if (phase === "callout2")
      return { idx: 2, ref: { current: citationRef.current } };
    if (phase === "callout3") return { idx: 3, ref: sourceCardsRef };
    if (phase === "callout4") return { idx: 4, ref: inputBarRef };
    return null;
  };

  const callout = getCallout();

  const showThinking =
    phase === "thinking" || phase === "showWork" || phase === "callout1";
  const showStream =
    phase === "streaming" ||
    phase === "callout2" ||
    phase === "showSources" ||
    phase === "callout3" ||
    phase === "typing" ||
    phase === "callout4" ||
    phase === "done";
  const inputLooksActive =
    phase === "typing" || phase === "callout4" || phase === "done";

  return (
    <SourcesContext.Provider value={sources}>
      <div className="flex-1 h-full flex overflow-hidden">
        {/* Chat sidebar — hidden on mobile */}
        <div className="hidden lg:block">
          <ChatSidebar chatHistory={chatHistory} />
        </div>

        <div className="flex-1 flex flex-col h-full bg-white overflow-hidden">
          {/* Top bar */}
          <header className="h-12 flex items-center justify-between px-3 sm:px-4 border-b border-glean-border flex-shrink-0">
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
              <button className="hidden sm:flex items-center gap-1.5 text-sm text-glean-gray border border-glean-border rounded-lg px-3 py-1.5">
                <MaskedIcon
                  src={`${GLEAN_IMG}/feather/lock.svg`}
                  size={14}
                />
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
            <div className="max-w-[780px] mx-auto px-3 sm:px-6 py-4 sm:py-6 pb-8 sm:pb-10">
              {/* User query bubble */}
              <div
                ref={queryBubbleRef}
                className="flex justify-end mb-4 sm:mb-6 slide-in-right"
              >
                <div className="bg-glean-bubble rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 max-w-[90%] sm:max-w-[85%]">
                  <p className="text-sm sm:text-[15px] text-glean-text">
                    {userQuery}
                  </p>
                </div>
              </div>

              {/* AI Response area */}
              <div className="mb-4">
                {/* Show work toggle + expandable panel */}
                {showWork && (
                  <div ref={showWorkRef} className="mb-3 fade-in">
                    <button
                      onClick={() => setWorkExpanded((v) => !v)}
                      className="text-sm text-glean-gray flex items-center gap-1 cursor-pointer hover:text-glean-text transition-colors"
                    >
                      Show work
                      <MaskedIcon
                        src={
                          workExpanded
                            ? `${GLEAN_IMG}/feather/chevron-down.svg`
                            : `${GLEAN_IMG}/feather/chevron-right.svg`
                        }
                        size={14}
                      />
                    </button>

                    {/* Expanded work panel */}
                    {workExpanded && (
                      <div className="mt-3 ml-1 border-l-2 border-blue-100 pl-4 space-y-4 fade-in">
                        {SHOW_WORK_STEPS.map((step, i) => (
                          <div key={i}>
                            <p className="text-xs font-semibold text-glean-text mb-2">
                              {step.heading}
                            </p>
                            {step.items.map((item, j) => (
                              <div
                                key={j}
                                className="flex items-center gap-2 mb-1.5"
                              >
                                <DocIcon
                                  icon={item.icon}
                                  iconFallback={item.iconFallback}
                                  size={14}
                                />
                                <span className="text-xs text-glean-gray font-mono truncate">
                                  {item.label}
                                </span>
                              </div>
                            ))}
                            <div className="flex flex-wrap gap-1.5 mt-1">
                              {step.docs.map((doc, k) => (
                                <div
                                  key={k}
                                  className="flex items-center gap-1.5 bg-gray-50 border border-glean-border rounded-md px-2 py-1"
                                >
                                  <DocIcon
                                    icon={doc.icon}
                                    iconFallback={doc.iconFallback}
                                    size={14}
                                  />
                                  <span className="text-[11px] text-glean-text truncate max-w-[180px]">
                                    {doc.label}
                                  </span>
                                </div>
                              ))}
                            </div>
                            {step.note && (
                              <p className="text-[11px] text-glean-gray mt-2 leading-relaxed italic">
                                {step.note}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
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
                  <SourceCards visible={showSources} sources={sources} />
                </div>
              </div>
            </div>
          </div>

          {/* Follow-up input bar */}
          <div className="flex-shrink-0 px-3 sm:px-6 pb-3 sm:pb-4 pt-2">
            <div
              ref={inputBarRef}
              className={`max-w-[780px] mx-auto border border-glean-border rounded-2xl transition-all ${
                inputLooksActive ? "shadow-sm" : "opacity-60"
              }`}
            >
              <div className="px-3 sm:px-4 py-2.5 sm:py-3">
                {followUpText ? (
                  <div className="text-sm sm:text-[15px] text-glean-text flex items-center flex-wrap">
                    {followUpText}
                    {phase === "typing" && (
                      <span className="inline-block w-[2px] h-[18px] bg-glean-text ml-0.5 -mb-[3px] cursor-blink" />
                    )}
                  </div>
                ) : (
                  <div className="text-sm sm:text-[15px] text-gray-400 flex items-center">
                    Explore a topic…
                  </div>
                )}
              </div>
              <div className="px-3 sm:px-4 pb-2.5 sm:pb-3 flex items-center justify-between pointer-events-none cursor-default">
                <div className="flex items-center gap-2 sm:gap-3">
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
                  <MaskedIcon
                    src={`${GLEAN_IMG}/building.svg`}
                    size={16}
                  />
                  <div className="hidden sm:flex items-center gap-1.5 text-sm text-glean-gray">
                    <MaskedIcon
                      src={`${GLEAN_IMG}/lightbulb-3.svg`}
                      size={16}
                    />
                    <span>Thinking</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center">
                    <MaskedIcon
                      src={`${GLEAN_IMG}/voice.svg`}
                      size={16}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <p className="text-[11px] text-gray-400 text-center mt-2 sm:mt-3">
              Prepared for Morningstar by the Glean team
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

        {/* ── Book meeting modal ── */}
        {showFollowUp && <FollowUpModal />}
      </div>
    </SourcesContext.Provider>
  );
}
