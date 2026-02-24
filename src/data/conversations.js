const GLEAN_IMG = "https://app.glean.com/images";

export const flows = [
  /* ═══════════════════════════════════════════════════════
   * FLOW 0 — Sales / GTM
   * ═══════════════════════════════════════════════════════ */
  {
    id: "sales",
    persona: {
      title: "Sales / GTM",
      subtitle: "Strategic Account Executive",
    },
    greeting: "Good afternoon",
    userQuery:
      "Give me a full account overview for Fidelity Investments including contract status, recent Gong call themes, open Salesforce opportunities, and cross-sell potential into PitchBook or Sustainalytics",

    aiResponse: `Here's your **Account 360 overview** for Fidelity Investments:

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

Would you like me to draft a QBR agenda for the Fidelity renewal, or generate a competitive positioning brief against the Bloomberg evaluation?`,

    sources: [
      {
        id: 1,
        title: "Fidelity Investments — Account Record...",
        subtitle: "Salesforce · Institutional Sales",
        iconUrl: `${GLEAN_IMG}/logos/salesforce.svg`,
        iconFallback: null,
        author: "Ryan Parker",
        excerpt:
          "Fidelity holds a $2.4M annual contract across Morningstar Direct ($1.8M, renewed Jan 2025) and Morningstar Data ($620K, up for renewal June 2025). Account has grown 18% YoY driven by expanded Direct seat count.",
      },
      {
        id: 2,
        title: "Gong Call Summary — Fidelity Q4 Review...",
        subtitle: "Gong · Institutional Sales",
        iconUrl: `${GLEAN_IMG}/logos/gong.svg`,
        iconFallback: null,
        author: "Lisa Yamamoto",
        excerpt:
          "14 logged Gong calls over 90 days. Key themes: concerns about historical data accuracy for alt asset classes, ESG integration interest via Sustainalytics, PitchBook private credit dataset demo request from Head of Fixed Income.",
      },
      {
        id: 3,
        title: "Fidelity Engagement Tracker — 2025...",
        subtitle: "SharePoint · CSM Team",
        iconUrl: `${GLEAN_IMG}/logos/sharepoint.svg`,
        iconFallback: null,
        author: "Marcus Johnson",
        excerpt:
          "Most recent call (Feb 12) flagged a potential churn risk — their data ops team is evaluating a Bloomberg terminal expansion for equity analytics. CSM escalation recommended.",
      },
      {
        id: 4,
        title: "Cross-Sell Benchmarking — Inst. Accounts...",
        subtitle: "Tableau · Revenue Ops",
        iconUrl: `${GLEAN_IMG}/logos/tableau.svg`,
        iconFallback: null,
        author: "Priya Mehta",
        excerpt:
          "Based on comparable accounts (T. Rowe Price, Wellington), Fidelity's equity research usage pattern suggests strong fit for Morningstar Indexes licensing ($400K avg.) and Sustainalytics EU Taxonomy module.",
      },
    ],

    followUpQuery:
      "Draft a QBR agenda for the Fidelity Direct renewal in June",

    chatHistory: {
      today: ["Account 360 — Fidelity..."],
      recent: [
        "Q1 Territory Planning — ...",
        "PitchBook Cross-Sell An...",
        "Gong Call Insights — Inst...",
        "Renewal Forecast Q2 20...",
        "Seismic Content Tracker...",
        "Competitive Intel — Bloo...",
      ],
    },

    showWork: {
      searchQuery:
        "Fidelity Investments account contract opportunities call themes 2025",
      searching: [
        {
          icon: `${GLEAN_IMG}/logos/salesforce.svg`,
          iconFallback: null,
          label: "Fidelity Investments — Salesforce Ac...",
        },
        {
          icon: `${GLEAN_IMG}/logos/gong.svg`,
          iconFallback: null,
          label: "Gong Call Summary — Fidelity Q4...",
        },
        { icon: null, iconFallback: null, label: "+8 more" },
      ],
      reading: [
        {
          icon: `${GLEAN_IMG}/logos/salesforce.svg`,
          iconFallback: null,
          label: "Fidelity Investments — Salesforce Ac...",
        },
        {
          icon: `${GLEAN_IMG}/logos/sharepoint.svg`,
          iconFallback: null,
          label: "FI Renewal Playbook — 2025...",
        },
        {
          icon: `${GLEAN_IMG}/logos/confluence3.svg`,
          iconFallback: null,
          label: "Fidelity QBR Prep — Inst. Sales...",
        },
      ],
      synthesizing: {
        icon: `${GLEAN_IMG}/logos/confluence3.svg`,
        iconFallback: null,
        label: "Account 360 Summary",
        note: "Cross-referencing 5 primary sources across Salesforce, Gong, SharePoint, and Tableau to compile a comprehensive account overview.",
      },
    },
  },

  /* ═══════════════════════════════════════════════════════
   * FLOW 1 — Customer Support
   * ═══════════════════════════════════════════════════════ */
  {
    id: "support",
    persona: {
      title: "Customer Support",
      subtitle: "Direct Support Representative",
    },
    greeting: "Good afternoon",
    userQuery:
      "A Morningstar Direct client says their portfolio holdings and performance look wrong compared to their internal system. What are the likely root causes and what troubleshooting steps should I follow?",

    aiResponse: `Here's a structured **troubleshooting guide** for portfolio data mismatch issues in Morningstar Direct:

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

Would you like me to draft a client-facing email explaining the data refresh schedule, or escalate this to the Data Quality team?`,

    sources: [
      {
        id: 1,
        title: "Direct Support — Portfolio Reconciliation SOP",
        subtitle: "Confluence · Product Support",
        iconUrl: `${GLEAN_IMG}/logos/confluence3.svg`,
        iconFallback: null,
        author: "Jennifer Walsh",
        excerpt:
          "Morningstar Direct refreshes portfolio holdings data at 6:00 AM CT for US equities and 11:00 PM CT for international securities. Timing discrepancy with custodian feeds is the #1 root cause of data mismatch tickets (42% of cases).",
      },
      {
        id: 2,
        title: "Portfolio Import Config Guide v4.2",
        subtitle: "SharePoint · Client Services",
        iconUrl: `${GLEAN_IMG}/logos/sharepoint.svg`,
        iconFallback: null,
        author: "David Kim",
        excerpt:
          "Confirm custodian ID mapping, pricing source hierarchy (Morningstar Pricing → Client Override → Custodian), and corporate actions processing. Missed stock splits or dividends are the #2 cause of performance drift.",
      },
      {
        id: 3,
        title: "Known Data Issues — Q1 2025 Tracker",
        subtitle: "Jira · Data Quality",
        iconUrl: `${GLEAN_IMG}/logos/jira3.svg`,
        iconFallback: null,
        author: "Anita Patel",
        excerpt:
          "Currently tracked issue (JIRA DQ-4821) affecting historical NAV data for certain money market funds posted after the Jan 2025 data migration. If variances exceed 1bp, escalate to L2.",
      },
      {
        id: 4,
        title: "Support Case Analytics — Root Cause Report",
        subtitle: "ServiceNow · Support Ops",
        iconUrl: `${GLEAN_IMG}/logos/servicenow.svg`,
        iconFallback: null,
        author: "Operations Analytics",
        excerpt:
          "Root causes by frequency: timing lag on custodian feeds (42%), incorrect benchmark assignment (23%), missing corporate actions (18%), calculation methodology differences (12%).",
      },
    ],

    followUpQuery:
      "Draft a client email explaining the data refresh schedule and known NAV issue",

    chatHistory: {
      today: ["Portfolio Data Mismatch..."],
      recent: [
        "Morningstar Direct API D...",
        "Case Escalation Workflo...",
        "Historical Data Retrieval...",
        "Custom Benchmark Conf...",
        "L2 Handoff Procedures...",
        "Known Issues Tracker — ...",
      ],
    },

    showWork: {
      searchQuery:
        "Morningstar Direct portfolio data mismatch troubleshooting 2025",
      searching: [
        {
          icon: `${GLEAN_IMG}/logos/confluence3.svg`,
          iconFallback: null,
          label: "Direct Support — Portfolio Reco...",
        },
        {
          icon: `${GLEAN_IMG}/logos/sharepoint.svg`,
          iconFallback: null,
          label: "Data Reconciliation SOP — Q1...",
        },
        { icon: null, iconFallback: null, label: "+6 more" },
      ],
      reading: [
        {
          icon: `${GLEAN_IMG}/logos/confluence3.svg`,
          iconFallback: null,
          label: "Direct Support — Portfolio Reco...",
        },
        {
          icon: `${GLEAN_IMG}/logos/sharepoint.svg`,
          iconFallback: null,
          label: "Portfolio Data Quality Checkl...",
        },
        {
          icon: `${GLEAN_IMG}/logos/jira3.svg`,
          iconFallback: null,
          label: "Known Issues — Direct v4.2...",
        },
      ],
      synthesizing: {
        icon: `${GLEAN_IMG}/logos/confluence3.svg`,
        iconFallback: null,
        label: "Support Resolution Guide",
        note: "Cross-referencing 4 primary sources across Confluence, SharePoint, and Jira to compile a comprehensive troubleshooting guide.",
      },
    },
  },

  /* ═══════════════════════════════════════════════════════
   * FLOW 2 — Product / Developer
   * ═══════════════════════════════════════════════════════ */
  {
    id: "product",
    persona: {
      title: "Product / Developer",
      subtitle: "Data Collections Analyst",
    },
    greeting: "Good afternoon",
    userQuery:
      "What is the documented SOP for handling special case prospectuses in Data Collections, specifically for multi-share-class mutual funds with non-standard fee structures?",

    aiResponse: `Here's the documented **SOP for special case prospectuses** in Data Collections, focused on multi-share-class mutual funds with non-standard fee structures:

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

If the fund family is not in the exception guide, escalate to the Senior Data Analyst on rotation via the #data-collections-escalation Teams channel.`,

    sources: [
      {
        id: 1,
        title: "Data Collections — Special Case SOP",
        subtitle: "Confluence · Data Collections",
        iconUrl: `${GLEAN_IMG}/logos/confluence3.svg`,
        iconFallback: null,
        author: "Maria Chen",
        excerpt:
          "Check the Fund Classification Matrix (DC-SOP-2024-041). Special-case if: >6 share classes, CDSC with variable decay, fulcrum fees, or unpublished negotiated institutional fees.",
      },
      {
        id: 2,
        title: "Fee Structure QA Audit — Q3 2024",
        subtitle: "SharePoint · Data Quality",
        iconUrl: `${GLEAN_IMG}/logos/sharepoint.svg`,
        iconFallback: null,
        author: "Tom Brennan",
        excerpt:
          "Cross-validate fee data against SEC EDGAR N-1A filing. Internal QA found a 14% discrepancy rate between prospectus PDFs and EDGAR filings in Q3 2024.",
      },
      {
        id: 3,
        title: "Exception Handling Guide — Fund Families",
        subtitle: "Jira · Data Collections",
        iconUrl: `${GLEAN_IMG}/logos/jira3.svg`,
        iconFallback: null,
        author: "Sarah Liu",
        excerpt:
          "23 active fund families with recurring special-case patterns documented. American Funds Class R shares require independent fee entry for 6 sub-variants (R-1 through R-6).",
      },
    ],

    followUpQuery:
      "Show me the Jira backlog for the prospectus parsing pipeline improvements",

    chatHistory: {
      today: ["Special Case Prospectus..."],
      recent: [
        "Data Collections SOP Mi...",
        "Prospectus Parsing Pipeli...",
        "AWS Data Lake Schema D...",
        "API Rate Limiting — Portfo...",
        "Jira Sprint Retro — DC Te...",
        "Fee Structure Exceptions...",
      ],
    },

    showWork: {
      searchQuery:
        "Data Collections SOP special case prospectus multi-share-class fee",
      searching: [
        {
          icon: `${GLEAN_IMG}/logos/confluence3.svg`,
          iconFallback: null,
          label: "Data Collections — Special Ca...",
        },
        {
          icon: `${GLEAN_IMG}/logos/confluence3.svg`,
          iconFallback: null,
          label: "Prospectus Processing SOP —...",
        },
        { icon: null, iconFallback: null, label: "+5 more" },
      ],
      reading: [
        {
          icon: `${GLEAN_IMG}/logos/confluence3.svg`,
          iconFallback: null,
          label: "Data Collections — Special Ca...",
        },
        {
          icon: `${GLEAN_IMG}/logos/sharepoint.svg`,
          iconFallback: null,
          label: "Multi-Class Fund Handling Pr...",
        },
        {
          icon: `${GLEAN_IMG}/logos/jira3.svg`,
          iconFallback: null,
          label: "Fee Structure Exception Log...",
        },
      ],
      synthesizing: {
        icon: `${GLEAN_IMG}/logos/confluence3.svg`,
        iconFallback: null,
        label: "SOP Documentation",
        note: "Cross-referencing 3 primary sources across Confluence and Jira to compile the relevant SOP documentation.",
      },
    },
  },

  /* ═══════════════════════════════════════════════════════
   * FLOW 3 — Finance
   * ═══════════════════════════════════════════════════════ */
  {
    id: "finance",
    persona: {
      title: "Finance",
      subtitle: "FP&A Analyst",
    },
    greeting: "Good afternoon",
    userQuery:
      "Summarize our Q4 2025 revenue performance by business segment and flag any material variances against the operating plan that exceed 5%",

    aiResponse: `Here's the **Q4 2025 revenue performance summary** by business segment with variances against the operating plan:

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

Would you like me to pull the full segment P&L detail, or generate a variance commentary draft for the board presentation?`,

    sources: [
      {
        id: 1,
        title: "Q4 2025 Revenue Summary — Consolidated",
        subtitle: "SharePoint · FP&A",
        iconUrl: `${GLEAN_IMG}/logos/sharepoint.svg`,
        iconFallback: null,
        author: "Christine Park",
        excerpt:
          "Total Q4 revenue: $804.8M vs. $780.0M plan (+3.2%). PitchBook and Indexes segments drove the upside; Wealth segment underperformed due to AUM-linked fee compression.",
      },
      {
        id: 2,
        title: "FY2025 Operating Plan — Segment Targets",
        subtitle: "SharePoint · Finance",
        iconUrl: `${GLEAN_IMG}/logos/sharepoint.svg`,
        iconFallback: null,
        author: "James Thornton",
        excerpt:
          "PitchBook: 38 new enterprise logos vs. 26 planned. Average deal size up 12% to $142K ARR. LCD add-on contributed $4.1M above plan.",
      },
      {
        id: 3,
        title: "Wealth Segment AUM Report — Q4 2025",
        subtitle: "Tableau · Investment Mgmt",
        iconUrl: `${GLEAN_IMG}/logos/tableau.svg`,
        iconFallback: null,
        author: "Michael Rivera",
        excerpt:
          "Net outflows of $2.8B from TAMP in Oct–Nov, concentrated in advisor channel. Q4 market correction compressed basis-point revenue by ~$3.2M. Q1 2026 forecast revised down 8%.",
      },
      {
        id: 4,
        title: "Index Licensing Pipeline — Q4 Close",
        subtitle: "Salesforce · Index Solutions",
        iconUrl: `${GLEAN_IMG}/logos/salesforce.svg`,
        iconFallback: null,
        author: "Amy Nakamura",
        excerpt:
          "Strong index licensing fees — $2.9M from new ETF product launches tracking Morningstar indexes, $1.8M from expanded US Market Index licensing.",
      },
    ],

    followUpQuery:
      "Generate a variance commentary draft for the board presentation",

    chatHistory: {
      today: ["Q4 Revenue Variance A..."],
      recent: [
        "Segment P&L Rollup — F...",
        "License Revenue Recogni...",
        "PitchBook ARR Tracking...",
        "FY2025 Budget vs Actual...",
        "Cost Allocation Model — ...",
        "Board Deck — Prelim FY...",
      ],
    },

    showWork: {
      searchQuery:
        "Q4 2025 revenue segment performance variance operating plan",
      searching: [
        {
          icon: `${GLEAN_IMG}/logos/sharepoint.svg`,
          iconFallback: null,
          label: "Q4 2025 Revenue Summary —...",
        },
        {
          icon: `${GLEAN_IMG}/logos/sharepoint.svg`,
          iconFallback: null,
          label: "FY2025 Operating Plan — Seg...",
        },
        { icon: null, iconFallback: null, label: "+7 more" },
      ],
      reading: [
        {
          icon: `${GLEAN_IMG}/logos/sharepoint.svg`,
          iconFallback: null,
          label: "Q4 2025 Revenue Summary —...",
        },
        {
          icon: `${GLEAN_IMG}/logos/tableau.svg`,
          iconFallback: null,
          label: "Segment P&L — Q4 Close...",
        },
        {
          icon: `${GLEAN_IMG}/logos/sharepoint.svg`,
          iconFallback: null,
          label: "Board Deck — FY2025 Prelim...",
        },
      ],
      synthesizing: {
        icon: `${GLEAN_IMG}/logos/sharepoint.svg`,
        iconFallback: null,
        label: "Revenue Performance Summary",
        note: "Cross-referencing 4 primary sources across SharePoint, Tableau, and Workday to compile a comprehensive revenue performance summary.",
      },
    },
  },
];
