export const greeting = "Good afternoon, Sarah";

export const userQuery =
  "What are the top compliance risks flagged in our recent audit documents?";

export const aiResponse = `Here's a summary of the **top compliance risks** identified across TransUnion's recent audit documentation:

**1. Data Residency & Cross-Border Transfer Violations**
Three internal audit reports from Q3 flagged inconsistencies in how consumer data is classified before international transfer. The GDPR working group noted this as a **Priority 1 item** requiring remediation before Q1.¹

**2. FCRA Adverse Action Notice Gaps**
Legal & Compliance flagged recurring gaps in adverse action notification timelines across two business units. Current SLA adherence is at 84%, below the required 95% threshold. An internal remediation plan was due September 30th.²³

**3. Third-Party Vendor Risk Assessment Backlog**
Procurement and Risk Management have an outstanding backlog of 47 vendor assessments overdue per the annual review cycle. The InfoSec team escalated this in the October all-hands.²

**4. SOC 2 Type II Evidence Collection**
The audit readiness team noted delays in evidence collection for access control and change management controls. Current completion is at 61% with a review deadline in 6 weeks.⁴

Would you like me to pull the full remediation tracker, or surface the relevant owners for each issue?`;

export const sources = [
  {
    id: 1,
    title: "Q3 Compliance Audit Report — GDPR Review",
    subtitle: "Confluence · Updated Oct 14",
    iconUrl: "https://app.glean.com/images/logos/confluence3.svg",
    author: "Maria Chen",
    excerpt:
      "Three internal audit reports from Q3 identified inconsistencies in consumer data classification workflows prior to international transfer. The GDPR working group has designated this a Priority 1 remediation item requiring resolution before Q1 of the next fiscal year.",
  },
  {
    id: 2,
    title: "FCRA Adverse Action Remediation Plan",
    subtitle: "Jira · Legal & Compliance",
    iconUrl: "https://app.glean.com/images/logos/jira3.svg",
    author: "David Park",
    excerpt:
      "Recurring gaps in adverse action notification timelines have been identified across Consumer Lending and Credit Services. Current SLA adherence stands at 84%, significantly below the 95% threshold required by FCRA §615. Remediation plan was due September 30th.",
  },
  {
    id: 3,
    title: "Vendor Risk Assessment Tracker FY2024",
    subtitle: "Google Sheets · Procurement",
    iconUrl: "https://app.glean.com/images/logos/gdrive3.svg",
    author: "Lisa Morales",
    excerpt:
      "As of October 8, 47 vendor assessments remain overdue per the annual review cycle. Critical and high-risk vendors account for 19 of the outstanding reviews. The InfoSec team has escalated this backlog to the October all-hands for executive visibility.",
  },
  {
    id: 4,
    title: "SOC 2 Evidence Collection Status",
    subtitle: "Google Drive · InfoSec",
    iconUrl: "https://app.glean.com/images/logos/gdrive3.svg",
    author: "James Wright",
    excerpt:
      "Evidence collection for SOC 2 Type II audit is currently at 61% completion. Access control and change management control domains are the primary areas with outstanding evidence gaps. Review deadline is in approximately 6 weeks.",
  },
];

export const followUpQuery =
  "Pull the full remediation tracker and show me who owns each issue";

export const chatHistory = {
  today: ["TransUnion Compliance Review"],
  recent: [
    "Q4 Regulatory Filing Status",
    "Consumer Dispute Resolution SLA",
    "Data Governance Framework Update",
    "Annual Risk Assessment Review",
    "CCPA Data Subject Requests",
    "Vendor Onboarding Checklist",
  ],
};
