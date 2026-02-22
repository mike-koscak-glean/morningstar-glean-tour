Here is your fully reformatted, clean, single copy-paste file for Cursor. Structure is preserved, formatting is normalized, no broken markdown blocks, no inconsistent indentation.

You can drop this directly into a `.md` or `.txt` file and use it as your build spec.

---

# Glean Demo Tour — Cursor Build Instructions

## Overview

Build a React + Tailwind CSS application that recreates the Glean AI Assistant chat UI as a personalized, animated sales demo.

This is a guided narrative experience, not a functional product. The goal is to show a TransUnion executive what Glean would feel like if their company used it. It must feel specific, polished, and intentional.

This will eventually be deployed to a vanity domain such as:

transunion-glean.com

The objective is to generate pipeline interest before a formal demo or sandbox.

---

## Reference Files in This Folder

Use these files heavily for visual and structural reference:

* homepage.html
  Rendered DOM of the Glean new tab / home page

* chat_result.html
  Rendered DOM of an active Glean chat session with a full AI response

* Screenshot 2...3.14.14 PM.png
  Glean homepage with chat input

* Screenshot 2...3.14.44 PM.png
  Full chat response with citations and source cards

* Screenshot 2...3.14.54 PM.png
  Chat response scrolled further

Study these carefully.
The HTML files contain the real rendered DOM. Use them to understand layout hierarchy and spacing. Screenshots are your visual ground truth.

---

## App States

### State 1: Homepage

* Full-screen background image (sunset/sky photo)
* Left navigation sidebar with icons
* Centered chat widget with “Chat” and “Search” tabs
* Greeting:
  Good afternoon, Sarah
* Pre-loaded query:
  What are the top compliance risks flagged in our recent audit documents?
* Subtle helper text:
  Press Enter or click Run to continue →
* Only the Enter key and Run button are interactive.
* Everything else must have:
  pointer-events-none
  cursor-default

---

### State 2: Chat View

* Same left icon navigation sidebar
* Left chat history sidebar approximately 240px wide
* Top bar with “Assistant” label
* Main chat area plays the animation sequence

---

## Animation Sequence

t = 0s
User presses Enter or clicks Run

t = 0.3s
Transition to chat view
User query bubble appears, sliding in from right

t = 0.8s
“✦ Thinking…” indicator appears with gentle pulse animation

t = 3.0s
Thinking fades
“Show work ›” appears briefly in gray

t = 3.2s
AI response begins streaming word by word
Approximately 25ms per word
Citation numbers render as blue superscripts inline as they stream

t ≈ 20s
Response finishes
500ms pause

t ≈ 20.5s
“4 sources” badge fades in

t ≈ 21s
Source cards fade in one by one
150ms stagger

t ≈ 22s
Follow-up input becomes active with blinking cursor

---

## Visual Design

### Brand Assets (Load via URL, Do Not Download)

Glean logo:
[https://app.glean.com/images/glean-logo2.svg](https://app.glean.com/images/glean-logo2.svg)

Background image:
[https://app.glean.com/images/stock/full/cesar-couto-bdDAnGcMIrs-unsplash.jpg](https://app.glean.com/images/stock/full/cesar-couto-bdDAnGcMIrs-unsplash.jpg)

---

### Colors

Primary blue: #1C5BE0
Nav sidebar background: #FFFFFF
Sidebar icons inactive: #5F6368
Chat input background: #FFFFFF
Response text: #1F1F1F
Thinking text: #5F6368
Citation superscripts: #1C5BE0
Source card border: #E8EAED
User query bubble: #F1F3F4

---

### Font

Inter from Google Fonts
Use throughout the app.

Response body styling:

* Font size: 15px
* Line height: 1.7

---

## Layout

### Left Icon Navigation (56px wide)

* White background
* Full height
* Subtle right border
* Glean logo at top
* Icons:

  * Home
  * Chat (active state = blue pill background)
  * Agents
  * People
  * Content
  * Prism
  * Tasks
* Bottom icons:

  * Analytics
  * Settings
  * User avatar

---

### Chat History Sidebar (Chat View Only)

Width: 240px

* “Chat” heading with filter icon
* “+ New chat” button
* “Search by title” input
* Section: Today

  * TransUnion Compliance Review (active, highlighted blue)
* Section: Recent

  * Six fake chat titles

---

### Top Bar

* Hamburger icon (left)
* “Assistant” centered
* “···” and “Share” on the right

---

### Chat Input

* Placeholder text:
  Explore a topic...
* Bottom toolbar with:

  * +
  * Globe icon
  * Attachment icon
  * “✦ Thinking”

---

### User Query Bubble

* Right aligned
* Background: #F1F3F4
* Rounded 2xl corners

---

### AI Response

* Left aligned
* No bubble
* Full width
* Rendered as Markdown

---

## Scripted Content

### User Query

What are the top compliance risks flagged in our recent audit documents?

---

### AI Response

Here’s a summary of the **top compliance risks** identified across TransUnion’s recent audit documentation:

**1. Data Residency & Cross-Border Transfer Violations**
Three internal audit reports from Q3 flagged inconsistencies in how consumer data is classified before international transfer. The GDPR working group noted this as a **Priority 1 item** requiring remediation before Q1.¹

**2. FCRA Adverse Action Notice Gaps**
Legal & Compliance flagged recurring gaps in adverse action notification timelines across two business units. Current SLA adherence is at 84%, below the required 95% threshold. An internal remediation plan was due September 30th.² ³

**3. Third-Party Vendor Risk Assessment Backlog**
Procurement and Risk Management have an outstanding backlog of 47 vendor assessments overdue per the annual review cycle. The InfoSec team escalated this in the October all-hands.²

**4. SOC 2 Type II Evidence Collection**
The audit readiness team noted delays in evidence collection for access control and change management controls. Current completion is at 61% with a review deadline in 6 weeks.⁴

Would you like me to pull the full remediation tracker, or surface the relevant owners for each issue?

---

## Source Cards

1. Q3 Compliance Audit Report — GDPR Review
   Confluence · Updated Oct 14
   Icon background: blue

2. FCRA Adverse Action Remediation Plan
   Jira · Legal & Compliance
   Icon background: blue

3. Vendor Risk Assessment Tracker FY2024
   Google Sheets · Procurement
   Icon background: green

4. SOC 2 Evidence Collection Status
   Google Drive · InfoSec
   Icon background: gray

Each card:

* White background
* Rounded-lg
* Subtle border: #E8EAED
* Icon on left
* Title dark
* Subtitle gray

---

## File Structure

glean-tour/
├── src/
│   ├── App.jsx
│   ├── components/
│   │   ├── NavSidebar.jsx
│   │   ├── GleanHome.jsx
│   │   ├── GleanChat.jsx
│   │   ├── ChatSidebar.jsx
│   │   ├── MessageStream.jsx
│   │   └── SourceCards.jsx
│   ├── data/
│   │   └── conversation.js
│   └── index.css
├── index.html
├── tailwind.config.js
└── vite.config.js

All demo content must live inside conversation.js so it can be swapped per customer.

---

## Tech Stack

* Vite + React
* Tailwind CSS
* Inter font via Google Fonts
* react-markdown + remark-gfm for rendering bold and bullets
* No external animation libraries
* Use CSS transitions and React hooks for typewriter effect

---

## Critical Rules

1. Only Enter and Run button are interactive. Everything else must use pointer-events-none and cursor-default.
2. Demo runs automatically after trigger.
3. Typewriter must feel like real AI streaming.
4. No errors, broken states, or loading spinners visible at any time.
5. Desktop only. Target 1280px and above.
6. The final impression must feel purpose-built for TransUnion.
