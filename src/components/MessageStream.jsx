import React, { useState, useEffect, useRef, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CitationBubble from "./CitationBubble";

const SUPERSCRIPT_MAP = {
  "¹": "1",
  "²": "2",
  "³": "3",
  "⁴": "4",
  "⁵": "5",
  "⁶": "6",
  "⁷": "7",
  "⁸": "8",
  "⁹": "9",
};

const CITATION_RE = /[¹²³⁴⁵⁶⁷⁸⁹]/g;

function renderTextWithCitations(text) {
  const parts = [];
  let lastIndex = 0;

  for (const match of text.matchAll(CITATION_RE)) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const num = SUPERSCRIPT_MAP[match[0]];
    parts.push(<CitationBubble key={`cit-${match.index}`} num={num} />);
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts;
}

function processChildren(children) {
  if (typeof children === "string") {
    return renderTextWithCitations(children);
  }
  if (Array.isArray(children)) {
    return children.map((child, i) => {
      if (typeof child === "string") {
        return (
          <React.Fragment key={i}>
            {renderTextWithCitations(child)}
          </React.Fragment>
        );
      }
      return child;
    });
  }
  return children;
}

const remarkPlugins = [remarkGfm];

const citationComponents = {
  p: ({ children }) => <p className="mb-3">{processChildren(children)}</p>,
  strong: ({ children }) => (
    <strong className="font-semibold">{processChildren(children)}</strong>
  ),
};

export default function MessageStream({ text, onComplete }) {
  const [displayedLength, setDisplayedLength] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const scrollRef = useRef(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const words = useMemo(() => text.split(/(\s+)/), [text]);

  const wordBoundaries = useMemo(() => {
    const boundaries = [];
    let pos = 0;
    for (const word of words) {
      pos += word.length;
      boundaries.push(pos);
    }
    return boundaries;
  }, [words]);

  useEffect(() => {
    let wordIndex = 0;
    let completed = false;
    const interval = setInterval(() => {
      if (wordIndex >= wordBoundaries.length) {
        clearInterval(interval);
        if (!completed) {
          completed = true;
          setIsComplete(true);
          onCompleteRef.current?.();
        }
        return;
      }
      setDisplayedLength(wordBoundaries[wordIndex]);
      wordIndex++;
    }, 25);

    return () => clearInterval(interval);
  }, [text, wordBoundaries]);

  useEffect(() => {
    if (scrollRef.current) {
      const container = scrollRef.current.closest("[data-scroll-container]");
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }
  }, [displayedLength]);

  const visibleText = text.slice(0, displayedLength);

  return (
    <div
      ref={scrollRef}
      className="ai-response text-[15px] leading-[1.7] text-glean-text"
    >
      <ReactMarkdown
        remarkPlugins={remarkPlugins}
        components={citationComponents}
      >
        {visibleText}
      </ReactMarkdown>
      {!isComplete && (
        <span className="inline-block w-[2px] h-[18px] bg-glean-text ml-0.5 -mb-[3px] cursor-blink" />
      )}
    </div>
  );
}
