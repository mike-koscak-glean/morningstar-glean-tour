# Morningstar Demo Site — Full Implementation Spec for Cursor

## Background & Context

### What this project is

This is a **personalized, animated sales demo** disguised as a real product experience. It recreates the Glean AI Assistant chat UI and targets **Morningstar** — specifically Sam Castano (IT lead and key champion). The goal is to generate pipeline interest before a formal demo or sandbox.

The demo will be deployed to a vanity domain (e.g., `morningstaraiplatform.com` or similar) and shared directly with Morningstar stakeholders. It must feel **specific, polished, and intentional** — like Glean already knows their world.

### What you're starting from

This repository (`glean-tour/`) is a working React + Tailwind CSS + Vite app that was built for **Kemper Insurance**. It features:

- A welcome modal → homepage with pre-loaded query → animated chat response → guided tooltip callouts → follow-up query → "Book a meeting" modal
- Fully mobile-responsive (works on desktop and phone)
- All demo content lives in `src/data/conversation.js` for easy swapping
- Guided callout tooltips that explain what Glean does at each step
- "Show work" expandable panel showing fictitious AI reasoning
- Source cards with app-specific icons (Confluence, Jira, SharePoint, etc.)
- Citation hover popovers with source excerpts

### What's different for Morningstar

The Kemper demo had **one persona and one flow**. Morningstar has **four personas**, each with their own:

- Pre-loaded query
- AI response (with citations)
- Source cards (with different app icons per persona)
- Sidebar chat history
- "Show work" steps
- Follow-up query suggestion

This means the app needs a **persona selection landing page** before the homepage, and all content must be dynamically loaded based on which persona was chosen.

### Key priorities (from the Kemper build)

1. **Premium feel** — smooth animations, no jank, nothing broken
2. **Mobile-first responsive** — must work on phones (no fallback screen)
3. **Guided experience** — intro modal, tooltip callouts, "Show work" expansion, follow-up intercept
4. **Everything scripted** — this is NOT a functional product; every word is pre-written
5. **Fast load** — all assets from Glean CDN, minimal dependencies
6. **Clean code** — conversation data separated from components

---

## Architecture Changes Required

### New: Persona Selection Landing Page

Before the current welcome modal, add a **persona selection page**. This is the first thing the user sees.

**Design:**
- Full-screen, clean white background
- Morningstar logo (from `misc/Morningstar_Logo.svg.png` — copy to `src/`) centered at top
- Glean logo next to it (same `×` separator pattern as the Kemper intro modal)
- Headline: **"See what Glean could look like for Morningstar"**
- Subheading: "Choose a perspective to explore"
- **4 persona cards** in a 2×2 grid (stacks to 1-column on mobile):

| Card | Title | Subtitle | Icon suggestion |
|------|-------|----------|-----------------|
| 1 | Sales / GTM | Strategic Account Executive | `feather/trending-up.svg` |
| 2 | Customer Support | Direct Support Representative | `feather/headphones.svg` or `feather/message-circle.svg` |
| 3 | Product / Developer | Data Collections Analyst | `feather/code.svg` or `feather/database.svg` |
| 4 | Finance | FP&A Analyst | `feather/bar-chart-2.svg` or `feather/dollar-sign.svg` |

Each card should be:
- White with subtle border (`border-glean-border`), rounded-xl
- Hover: light blue tint or subtle shadow lift
- Click: selects persona and proceeds to the intro modal + demo flow

**Footer:** "Prepared for Morningstar by the Glean team" in small gray text.

### Modified: App State Flow

```
PersonaSelect → IntroModal → GleanHome (with pre-loaded query) → GleanChat (animated response)
```

`App.jsx` needs a new state: `selectedPersona` (null | 0 | 1 | 2 | 3). When null, show the persona selection page. When set, show the rest of the flow (intro modal → home → chat).

### Modified: conversation.js → conversations.js

Rename to `conversations.js` (plural) and restructure as an **array of 4 flow objects**:

```javascript
export const flows = [
  {
    id: "sales",
    greeting: "Good afternoon, Sam",
    userQuery: "...",
    aiResponse: `...`,
    sources: [...],
    followUpQuery: "...",
    chatHistory: { today: [...], recent: [...] },
    showWork: { searchQuery: "...", steps: [...] },
  },
  { id: "support", ... },
  { id: "product", ... },
  { id: "finance", ... },
];
```

All components that currently import from `conversation.js` need to accept the active flow as a prop or via context instead.

### Modified: IntroModal

- Replace `kemper.png` with the Morningstar logo (`misc/Morningstar_Logo.svg.png` → copy to `src/morningstar.png`)
- Change all "Kemper" references to "Morningstar"
- Update bullets to reference Morningstar's tools:
  - 🔍 "One place to search and chat across all your company's tools — **Salesforce, Confluence, SharePoint, ServiceNow, Jira**, and more"
  - ⚡ "Answers grounded in your actual documents, with citations so you can verify every claim"
  - 🔒 "Enterprise-grade security — Glean respects existing permissions, so people only see what they're allowed to"

### Modified: index.html

- `<title>Glean — Morningstar</title>`

### Modified: All "Kemper" text references

Search-and-replace across all files:
- "Prepared for Kemper by the Glean team" → "Prepared for Morningstar by the Glean team"
- "for Kemper" → "for Morningstar"

### Modified: GleanChat.jsx

The "Show work" steps and callout texts need to read from the active flow data instead of being hardcoded. Currently `SHOW_WORK_STEPS` and `CALLOUTS` are hardcoded constants — they should either:
- Be part of each flow object in `conversations.js`, OR
- Have the search-query and document names dynamically pulled from the flow

The callout tooltip texts can stay the same across all flows (they're about explaining Glean, not persona-specific).

### Modified: ChatSidebar.jsx

Currently reads `chatHistory` from conversation.js. Needs to accept the active flow's chat history as a prop.

### Modified: SourceCards.jsx

Currently reads `sources` from conversation.js. Needs to accept sources as a prop.

### Modified: GleanHome.jsx

Currently reads `greeting` and `userQuery` from conversation.js. Needs to accept these as props from the active flow.

---

## Content for All 4 Flows

### Global Config

- **Greeting name:** "Good afternoon, Sam"
- **Footer:** "Prepared for Morningstar by the Glean team"
- **Welcome modal heading:** "See what Glean could look like for Morningstar"

---

### Flow 1: Sales / GTM

**Target Persona:** Strategic Account Executive, Institutional Sales

**Sidebar:**
- TODAY: "Account 360 — Fidelity..."
- RECENT:
  - "Q1 Territory Planning — ..."
  - "PitchBook Cross-Sell An..."
  - "Gong Call Insights — Inst..."
  - "Renewal Forecast Q2 20..."
  - "Seismic Content Tracker..."
  - "Competitive Intel — Bloo..."

**Pre-loaded Query:**
> Give me a full account overview for Fidelity Investments including contract status, recent Gong call themes, open Salesforce opportunities, and cross-sell potential into PitchBook or Sustainalytics

**Show Work:**
- Searching: `Fidelity Investments account contract opportunities call themes 2025`
  - Fidelity Investments — Salesforce Ac... (Salesforce icon)
  - Gong Call Summary — Fidelity Q4... (Gong icon)
  - +8 more
- Reading:
  - Fidelity Investments — Salesforce Ac... (Salesforce icon)
  - FI Renewal Playbook — 2025... (SharePoint icon)
  - Fidelity QBR Prep — Inst. Sales... (Confluence icon)
- Synthesizing:
  - Account 360 Summary (Confluence icon)
  - "Cross-referencing 5 primary sources across Salesforce, Gong, SharePoint, and Tableau to compile a comprehensive account overview."

**AI Response (Markdown):**

```markdown
Here's your **Account 360 overview** for Fidelity Investments:

**1. Contract & Revenue Summary**
Fidelity holds a $2.4M annual contract across Morningstar Direct ($1.8M, renewed Jan 2025) and Morningstar Data ($620K, up for renewal June 2025). The account has grown 18% YoY, driven by expanded Direct seat count from 85 to 112 analysts in their equity research group.¹

**2. Recent Engagement Activity**
Over the past 90 days, there have been 14 logged Gong calls with Fidelity stakeholders. Key themes include: concerns about historical data accuracy for alternative asset classes, interest in ESG integration via Sustainalytics, and a request from their Head of Fixed Income for a PitchBook private credit dataset demo. The most recent call (Feb 12) flagged a potential churn risk — their data ops team is evaluating a Bloomberg terminal expansion for equity analytics.²³

**3. Open Salesforce Opportunities**
- **Sustainalytics ESG Data Feed** — $340K, Stage 3 (Proposal), close date March 2025
- **PitchBook LCD Add-On** — $180K, Stage 2 (Discovery), close date Q2 2025
- **Direct Enterprise Renewal** — $1.8M, Stage 4 (Negotiation), close date June 2025¹

**4. Cross-Sell Recommendations**
Based on similar accounts (T. Rowe Price, Wellington), Fidelity's equity research usage pattern suggests strong fit for:
- Morningstar Indexes licensing for internal benchmark creation (avg. deal at comparable firms: $400K)
- Sustainalytics EU Taxonomy module given their SFDR reporting obligations⁴

Would you like me to draft a QBR agenda for the Fidelity renewal, or generate a competitive positioning brief against the Bloomberg evaluation?
```

**Source Cards:**

| # | Icon | Title | Subtitle |
|---|------|-------|----------|
| 1 | `logos/salesforce.svg` (or closest available) | Fidelity Investments — Account Record... | Salesforce · Institutional Sales |
| 2 | `logos/gong.svg` (or closest) | Gong Call Summary — Fidelity Q4 Review... | Gong · Institutional Sales |
| 3 | `logos/sharepoint.svg` | Fidelity Engagement Tracker — 2025... | SharePoint · CSM Team |
| 4 | `logos/tableau.svg` (or closest) | Cross-Sell Benchmarking — Inst. Accounts... | Tableau · Revenue Ops |

**Follow-up Query:** "Draft a QBR agenda for the Fidelity Direct renewal in June"

---

### Flow 2: Customer Support

**Target Persona:** Morningstar Direct Customer Support Representative (L1)

**Sidebar:**
- TODAY: "Portfolio Data Mismatch..."
- RECENT:
  - "Morningstar Direct API D..."
  - "Case Escalation Workflo..."
  - "Historical Data Retrieval..."
  - "Custom Benchmark Conf..."
  - "L2 Handoff Procedures..."
  - "Known Issues Tracker — ..."

**Pre-loaded Query:**
> A Morningstar Direct client says their portfolio holdings and performance look wrong compared to their internal system. What are the likely root causes and what troubleshooting steps should I follow?

**Show Work:**
- Searching: `Morningstar Direct portfolio data mismatch troubleshooting 2025`
  - Direct Support — Portfolio Reco... (Confluence icon)
  - Data Reconciliation SOP — Q1... (SharePoint icon)
  - +6 more
- Reading:
  - Direct Support — Portfolio Reco... (Confluence icon)
  - Portfolio Data Quality Checkl... (SharePoint icon)
  - Known Issues — Direct v4.2... (Jira icon)
- Synthesizing:
  - Support Resolution Guide (Confluence icon)
  - "Cross-referencing 4 primary sources across Confluence, SharePoint, and Jira to compile a comprehensive troubleshooting guide."

**AI Response (Markdown):**

```markdown
Here's a structured **troubleshooting guide** for portfolio data mismatch issues in Morningstar Direct:

**1. Verify Data Feed Timing**
The most common root cause is a timing discrepancy between the client's custodian feed and Morningstar's data refresh cycle. Morningstar Direct refreshes portfolio holdings data at 6:00 AM CT for US equities and 11:00 PM CT for international securities. If the client is comparing mid-day, the data may not yet reflect overnight transactions. Ask the client when they last ran their internal reconciliation.¹

**2. Check Portfolio Import Configuration**
Confirm the client's portfolio is using the correct data feed mapping. Navigate to Portfolio → Settings → Import Configuration and verify:
- Custodian ID mapping matches their internal system
- Pricing source hierarchy is set correctly (default: Morningstar Pricing → Client Override → Custodian)
- Corporate actions processing is enabled — missed stock splits or dividends are the #2 cause of performance drift²¹

**3. Run Reconciliation**
Run the Holdings Reconciliation Report (Portfolio → Reports → Reconciliation) to identify specific securities with variances. Cross-reference against the Known Data Issues log — there is a currently tracked issue (JIRA DQ-4821) affecting historical NAV data for certain money market funds posted after the Jan 2025 data migration. If variances exceed 1bp on performance, escalate to L2 with the reconciliation export attached.³

**4. Root Causes by Frequency**
- Timing lag on custodian feeds — 42% of cases
- Incorrect benchmark assignment — 23% of cases
- Missing corporate actions — 18% of cases
- Calculation methodology differences (gross vs. net, geometric vs. arithmetic) — 12%⁴

Would you like me to draft a client-facing email explaining the data refresh schedule, or escalate this to the Data Quality team?
```

**Source Cards:**

| # | Icon | Title | Subtitle |
|---|------|-------|----------|
| 1 | `logos/confluence3.svg` | Direct Support — Portfolio Reconciliation SOP | Confluence · Product Support |
| 2 | `logos/sharepoint.svg` | Portfolio Import Config Guide v4.2 | SharePoint · Client Services |
| 3 | `logos/jira3.svg` | Known Data Issues — Q1 2025 Tracker | Jira · Data Quality |
| 4 | `logos/servicenow.svg` (or closest) | Support Case Analytics — Root Cause Report | ServiceNow · Support Ops |

**Follow-up Query:** "Draft a client email explaining the data refresh schedule and known NAV issue"

---

### Flow 3: Product / Developer

**Target Persona:** Data Collections Analyst / Product Engineer

**Sidebar:**
- TODAY: "Special Case Prospectus..."
- RECENT:
  - "Data Collections SOP Mi..."
  - "Prospectus Parsing Pipeli..."
  - "AWS Data Lake Schema D..."
  - "API Rate Limiting — Portfo..."
  - "Jira Sprint Retro — DC Te..."
  - "Fee Structure Exceptions..."

**Pre-loaded Query:**
> What is the documented SOP for handling special case prospectuses in Data Collections, specifically for multi-share-class mutual funds with non-standard fee structures?

**Show Work:**
- Searching: `Data Collections SOP special case prospectus multi-share-class fee`
  - Data Collections — Special Ca... (Confluence icon)
  - Prospectus Processing SOP —... (Confluence icon)
  - +5 more
- Reading:
  - Data Collections — Special Ca... (Confluence icon)
  - Multi-Class Fund Handling Pr... (SharePoint icon)
  - Fee Structure Exception Log... (Jira icon)
- Synthesizing:
  - SOP Documentation (Confluence icon)
  - "Cross-referencing 3 primary sources across Confluence and Jira to compile the relevant SOP documentation."

**AI Response (Markdown):**

```markdown
Here's the documented **SOP for special case prospectuses** in Data Collections, focused on multi-share-class mutual funds with non-standard fee structures:

**1. Initial Classification**
When a prospectus is received for a multi-share-class fund, check the Fund Classification Matrix (DC-SOP-2024-041) to determine if it qualifies as "special case." A prospectus is special-case if any of the following apply:
- More than 6 share classes with distinct fee schedules
- Contains contingent deferred sales charges (CDSC) with variable decay schedules
- Includes performance-based fee adjustments (fulcrum fees)
- Has institutional share classes with negotiated management fees not published in the prospectus¹

**2. Data Entry Workflow**
For qualifying special-case prospectuses:
- Tag the document in the intake queue with label SC-MULTICLASS
- Pull the fee schedule template from SharePoint (Templates → Fee Structures → Multi-Class) and populate each share class row independently
- Cross-validate fee data against the SEC EDGAR N-1A filing — internal QA found a **14% discrepancy rate** between prospectus PDFs and EDGAR filings in Q3 2024
- If the CDSC schedule uses a non-standard decay period (anything other than 1/3/5/7-year), flag in Jira under DQ-FeeException with severity "Medium"²³

**3. Known Exceptions**
The Exception Handling Guide (DC-EXC-2024-009) documents 23 active fund families with recurring special-case patterns:
- **American Funds** — Class R shares have 6 sub-variants (R-1 through R-6) each requiring independent fee entry
- **PIMCO Institutional** — Negotiated fee waivers require manual override of the standard fee import pipeline
- **Vanguard Admiral/Investor** — Minimum investment thresholds impact fee tier assignment logic¹³

If the fund family is not in the exception guide, escalate to the Senior Data Analyst on rotation via the #data-collections-escalation Teams channel.
```

**Source Cards:**

| # | Icon | Title | Subtitle |
|---|------|-------|----------|
| 1 | `logos/confluence3.svg` | Data Collections — Special Case SOP | Confluence · Data Collections |
| 2 | `logos/sharepoint.svg` | Fee Structure QA Audit — Q3 2024 | SharePoint · Data Quality |
| 3 | `logos/jira3.svg` | Exception Handling Guide — Fund Families | Jira · Data Collections |

> **Note:** This flow only has 3 source cards (not 4). Adjust the source card rendering accordingly.

**Follow-up Query:** "Show me the Jira backlog for the prospectus parsing pipeline improvements"

---

### Flow 4: Finance

**Target Persona:** FP&A Analyst / Finance Business Partner

**Sidebar:**
- TODAY: "Q4 Revenue Variance A..."
- RECENT:
  - "Segment P&L Rollup — F..."
  - "License Revenue Recogni..."
  - "PitchBook ARR Tracking..."
  - "FY2025 Budget vs Actual..."
  - "Cost Allocation Model — ..."
  - "Board Deck — Prelim FY..."

**Pre-loaded Query:**
> Summarize our Q4 2025 revenue performance by business segment and flag any material variances against the operating plan that exceed 5%

**Show Work:**
- Searching: `Q4 2025 revenue segment performance variance operating plan`
  - Q4 2025 Revenue Summary —... (SharePoint icon)
  - FY2025 Operating Plan — Seg... (SharePoint icon)
  - +7 more
- Reading:
  - Q4 2025 Revenue Summary —... (SharePoint icon)
  - Segment P&L — Q4 Close... (Tableau icon)
  - Board Deck — FY2025 Prelim... (SharePoint icon)
- Synthesizing:
  - Revenue Performance Summary (SharePoint icon)
  - "Cross-referencing 4 primary sources across SharePoint, Tableau, and Workday to compile a comprehensive revenue performance summary."

**AI Response (Markdown):**

```markdown
Here's the **Q4 2025 revenue performance summary** by business segment with variances against the operating plan:

| Segment | Q4 Actual | Q4 Plan | Variance | Var % | Flag |
|---------|-----------|---------|----------|-------|------|
| Morningstar Data & Analytics | $412.3M | $398.0M | +$14.3M | +3.6% | — |
| PitchBook | $189.7M | $176.5M | +$13.2M | +7.5% | ⚠ |
| Morningstar Wealth | $54.1M | $61.8M | -$7.7M | -12.5% | 🔴 |
| Morningstar Retirement | $31.2M | $29.4M | +$1.8M | +6.1% | ⚠ |
| Morningstar Indexes | $68.9M | $64.2M | +$4.7M | +7.3% | ⚠ |
| Sustainalytics | $48.6M | $50.1M | -$1.5M | -3.0% | — |
| **Total** | **$804.8M** | **$780.0M** | **+$24.8M** | **+3.2%** | — |

**Material Variances (>5%):**

**1. PitchBook (+7.5% / +$13.2M)**
Driven by accelerated enterprise license adoption in private equity. 38 new enterprise logos closed in Q4 vs. 26 planned, with average deal size increasing 12% to $142K ARR. The LCD (Leveraged Commentary & Data) add-on contributed $4.1M above plan.¹²

**2. Morningstar Wealth (-12.5% / -$7.7M)**
Primary driver is lower-than-expected AUM-linked fee revenue due to net outflows of $2.8B from turnkey asset management portfolios (TAMP) in October–November, concentrated in the advisor channel. The Q4 market correction also compressed basis-point revenue by approximately $3.2M. Investment management is revising Q1 2026 forecast downward by 8%.³²

**3. Morningstar Retirement (+6.1% / +$1.8M)**
Positive variance from higher-than-expected plan participant growth (+4.2% QoQ) in the mid-market managed accounts segment.²

**4. Morningstar Indexes (+7.3% / +$4.7M)**
Strong index licensing fees — $2.9M from new ETF product launches by third-party issuers tracking Morningstar-proprietary indexes, and $1.8M from expanded Morningstar US Market Index licensing with a major asset manager.¹⁴

Would you like me to pull the full segment P&L detail, or generate a variance commentary draft for the board presentation?
```

**Source Cards:**

| # | Icon | Title | Subtitle |
|---|------|-------|----------|
| 1 | `logos/sharepoint.svg` | Q4 2025 Revenue Summary — Consolidated | SharePoint · FP&A |
| 2 | `logos/sharepoint.svg` | FY2025 Operating Plan — Segment Targets | SharePoint · Finance |
| 3 | `logos/tableau.svg` (or closest) | Wealth Segment AUM Report — Q4 2025 | Tableau · Investment Mgmt |
| 4 | `logos/salesforce.svg` (or closest) | Index Licensing Pipeline — Q4 Close | Salesforce · Index Solutions |

**Follow-up Query:** "Generate a variance commentary draft for the board presentation"

---

## Icon Availability Notes

The Glean CDN (`https://app.glean.com/images/`) has these confirmed icons:
- `logos/confluence3.svg` — Confluence
- `logos/sharepoint.svg` — SharePoint
- `logos/jira3.svg` — Jira

For the following icons referenced in the Morningstar flows, **check if they exist** at the Glean CDN. If not, use the closest match or a generic icon:
- `logos/salesforce.svg` or `logos/salesforce3.svg` — Salesforce
- `logos/gong.svg` — Gong
- `logos/tableau.svg` — Tableau
- `logos/servicenow.svg` — ServiceNow

The file `image_urls_combined_unique.txt` in the repo root has the full list of available Glean asset URLs. Reference it. If an icon isn't available, use a colored circle with the first letter as a fallback.

---

## File Changes Summary

### New files:
- `src/components/PersonaSelect.jsx` — Persona selection landing page
- `src/morningstar.png` — Copy from `misc/Morningstar_Logo.svg.png`

### Renamed/restructured:
- `src/data/conversation.js` → `src/data/conversations.js` (array of 4 flows)

### Modified:
- `src/App.jsx` — Add persona selection state, route to PersonaSelect first
- `src/components/IntroModal.jsx` — Morningstar branding
- `src/components/GleanHome.jsx` — Accept flow props instead of importing directly
- `src/components/GleanChat.jsx` — Accept flow props, dynamic Show Work steps
- `src/components/ChatSidebar.jsx` — Accept chatHistory prop
- `src/components/SourceCards.jsx` — Accept sources prop
- `src/components/MessageStream.jsx` — Accept text prop (already does)
- `src/components/FollowUpModal.jsx` — "Morningstar" references
- `index.html` — Title change to "Glean — Morningstar"

### Deleted:
- `src/kemper.png` — Replace with morningstar logo
- `src/components/MobileFallback.jsx` — Already unused, can remove if present

---

## Detailed Component Architecture

### App.jsx (new flow)

```
State: selectedPersona (null | 0 | 1 | 2 | 3)
State: showIntro (true)
State: view ("home" | "chat")

if selectedPersona === null → render <PersonaSelect onSelect={...} />
else if showIntro → render normal app + <IntroModal />
else → render GleanHome or GleanChat

Pass `flows[selectedPersona]` data down to all child components.
```

### PersonaSelect.jsx

This is the new landing page. Design notes:
- Use Morningstar's brand colors (dark blue/navy) as accent if desired, but keep the Glean blue for consistency
- The 4 cards should feel equal in weight — no card should look "primary"
- On mobile: stack cards vertically (1 column)
- On tablet+: 2×2 grid
- Subtle entrance animation (fade-in-up)
- Each card click sets `selectedPersona` and transitions to the intro modal

### conversations.js structure

```javascript
export const flows = [
  {
    id: "sales",
    persona: { title: "Sales / GTM", subtitle: "Strategic Account Executive" },
    greeting: "Good afternoon, Sam",
    userQuery: "Give me a full account overview for Fidelity...",
    aiResponse: `...full markdown with citations...`,
    sources: [
      {
        id: 1,
        title: "Fidelity Investments — Account Record...",
        subtitle: "Salesforce · Institutional Sales",
        iconUrl: "https://app.glean.com/images/logos/salesforce.svg",
        author: "...",
        excerpt: "...",
      },
      // ...
    ],
    followUpQuery: "Draft a QBR agenda for the Fidelity Direct renewal in June",
    chatHistory: {
      today: ["Account 360 — Fidelity..."],
      recent: ["Q1 Territory Planning — ...", ...],
    },
    showWork: {
      searchQuery: "Fidelity Investments account contract opportunities call themes 2025",
      searching: [
        { icon: "logos/salesforce.svg", label: "Fidelity Investments — Salesforce Ac..." },
        { icon: "logos/gong.svg", label: "Gong Call Summary — Fidelity Q4..." },
        { icon: null, label: "+8 more" },
      ],
      reading: [
        { icon: "logos/salesforce.svg", label: "Fidelity Investments — Salesforce Ac..." },
        { icon: "logos/sharepoint.svg", label: "FI Renewal Playbook — 2025..." },
        { icon: "logos/confluence3.svg", label: "Fidelity QBR Prep — Inst. Sales..." },
      ],
      synthesizing: {
        icon: "logos/confluence3.svg",
        label: "Account 360 Summary",
        note: "Cross-referencing 5 primary sources across Salesforce, Gong, SharePoint, and Tableau...",
      },
    },
  },
  // ... 3 more flows
];
```

---

## Styling & Branding

### Morningstar Brand

- **Logo:** Use `misc/Morningstar_Logo.svg.png` (copy to `src/morningstar.png`)
- **Colors:** Keep Glean blue (#1C5BE0) as the primary accent. Don't try to use Morningstar's red — this is a Glean demo, not a Morningstar-branded product
- **Font:** Keep Inter (same as Kemper version)

### Persona Select page style

- Background: white or very light gray
- Cards: white, rounded-xl, subtle border, hover state with shadow
- Optional: a subtle gradient or the Glean sunset background image with low opacity

---

## Animation & UX Flow (per persona)

The animation sequence is **identical** to the Kemper version. Don't change the timing or flow — it's been carefully tuned:

1. User selects persona → persona selection fades out
2. Intro modal appears (fade-in)
3. User clicks "Show me how it works" → modal closes, homepage visible
4. Homepage shows greeting + pre-loaded query + bobbing "try Glean" callout
5. User presses Enter or taps Run button → transitions to chat view
6. **Callout 0** (points at query bubble): "Employees ask questions in plain English — no special syntax or training needed"
7. User clicks "Got it" → thinking animation starts
8. **Callout 1** (points at Show work): "Glean shows its reasoning. You can inspect which documents it searched and how it formed its answer"
9. User clicks "Got it" → Show work auto-expands, then streaming begins
10. Response streams word-by-word (~25ms/word)
11. **Callout 2** (points at last citation): "Every fact is cited. Click any number to jump directly to the source document"
12. User clicks "Got it" → source cards fade in
13. **Callout 3** (points at source cards): "In a live environment, these open directly in Confluence, Jira, SharePoint — wherever the doc lives"
14. User clicks "Got it" → follow-up query auto-types into input
15. **Callout 4** (points at input): "Want to see Glean answer your team's real questions? Let's set up a live demo."
16. User clicks "Got it" → **Book a Meeting modal** appears (no dismiss option, only "Book a meeting →")

---

## Critical Implementation Notes

1. **The Finance flow has a markdown table.** Make sure `react-markdown` + `remark-gfm` renders tables correctly. You may need to add Tailwind table styles (`table`, `th`, `td` with borders and padding). Test this carefully.

2. **Flow 3 (Product) only has 3 source cards**, not 4. The "X sources" badge should say "3 sources" for that flow. Make sure the source card count is dynamic.

3. **Citation numbers must render as separate circles.** Adjacent citations like `²³` must render as two individual blue circles, not "23". This was a bug in the Kemper build that was fixed — the fix is already in `MessageStream.jsx`.

4. **Auto-scroll on callouts.** The Kemper build adds auto-scroll when callouts appear (callout 2, 3, 4). Keep this behavior.

5. **GuidedCallout.jsx has viewport-aware positioning.** It auto-flips above/below based on available space. Don't break this — it's critical for mobile.

6. **The "Book a meeting" modal has no dismiss option.** Only a "Book a meeting →" button. This was intentional. The `href` is `#book` (placeholder for a Calendly URL).

7. **Mobile responsive.** The Kemper build was made fully responsive. Keep all the responsive classes (`hidden md:block`, `sm:`, responsive padding, etc.).

8. **All icons from Glean CDN.** Reference `image_urls_combined_unique.txt` for available URLs. Use `mask-image` technique for icons that need to be colored (see existing `MaskedIcon` component pattern used throughout the codebase).

9. **"Show work" panel auto-expands** when the user dismisses Callout 1. This was a specific design decision — users might not click "Show work" on their own, so we expand it for them to see the thinking steps.

10. **The persona selection page should feel like a premium landing page**, not a settings screen. Think of it as the "cover page" of the demo.

---

## Systems Referenced by Flow

| System | Flow 1 (Sales) | Flow 2 (Support) | Flow 3 (Product) | Flow 4 (Finance) |
|--------|:-:|:-:|:-:|:-:|
| Salesforce | ✓ | | | ✓ |
| Gong | ✓ | | | |
| SharePoint | ✓ | ✓ | ✓ | ✓ |
| Confluence | ✓ | ✓ | ✓ | |
| Jira | | ✓ | ✓ | |
| Tableau | ✓ | | | ✓ |
| ServiceNow | | ✓ | | |

These are all confirmed Morningstar systems from discovery calls.

---

## Quick Start for the AI

1. Copy `misc/Morningstar_Logo.svg.png` to `src/morningstar.png`
2. Rename `src/data/conversation.js` to `src/data/conversations.js`
3. Restructure the data file with all 4 flows (content provided above)
4. Create `src/components/PersonaSelect.jsx`
5. Update `src/App.jsx` to add persona selection state
6. Update all components to accept flow data as props instead of importing directly
7. Search-replace "Kemper" → "Morningstar" everywhere
8. Update `index.html` title
9. Update `IntroModal.jsx` with Morningstar logo
10. Test each flow end-to-end, especially the Finance table rendering
11. Test on mobile (375px width)
12. Build and deploy
