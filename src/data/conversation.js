export const greeting = "Good afternoon, Jason";

export const userQuery =
  "What process changes have we implemented to reduce auto claims cycle time this year?";

export const aiResponse = `Here's a summary of the **key process changes** implemented across Kemper's auto claims operations to reduce cycle time in 2024:

**1. FNOL Triage Redesign**
The Claims Design team rolled out a redesigned First Notice of Loss triage workflow in Q2, consolidating three legacy intake paths into a single digital-first flow. Initial results show a **22% reduction in average triage time** across the Birmingham and Dallas service centers. The full rollout was tracked in Jira under the FNOL Modernization epic.¹

**2. Automated Severity Scoring**
A new severity scoring model was deployed in August, integrating historical loss data with real-time adjuster inputs. Early data from the Q3 cycle time dashboard shows the model is **reducing manual review steps by approximately 35%**, allowing adjusters to prioritize complex claims faster.²³

**3. Vendor Assignment SLA Overhaul**
Procurement and Claims Ops restructured the vendor assignment process, cutting the average vendor dispatch time from 4.2 days to 1.8 days. The updated SLA framework was approved in the September steering committee and is now being tracked in the master process tracker.³

**4. Centralized Process Documentation**
The Design, Process & Improvement team completed a migration of all active SOPs and workflow documents into a unified Confluence space, replacing the previous SharePoint/email hybrid system. As of October, **94% of active procedures** are now version-controlled and searchable in one location.⁴

Would you like me to pull the full cycle time dashboard, or show the Jira roadmap for upcoming process improvements?`;

export const sources = [
  {
    id: 1,
    title: "FNOL Triage Redesign — Q2 Implementation Review",
    subtitle: "Confluence · Claims Design",
    iconUrl: "https://app.glean.com/images/logos/confluence3.svg",
    author: "Sarah Mitchell",
    excerpt:
      "The redesigned FNOL triage workflow consolidated three legacy intake paths into a single digital-first flow. Pilot results from Q2 show a **22% reduction in average triage time** across the Birmingham and Dallas service centers.",
  },
  {
    id: 2,
    title: "Auto Claims Cycle Time Dashboard — Q3 Results",
    subtitle: "SharePoint · Claims Analytics",
    iconUrl: "https://app.glean.com/images/logos/sharepoint3.svg",
    author: "Kevin Torres",
    excerpt:
      "Q3 cycle time data shows the automated severity scoring model is reducing manual review steps by approximately 35%. Average end-to-end claim resolution dropped from 18.4 days to 14.1 days across property and casualty lines.",
  },
  {
    id: 3,
    title: "Vendor Assignment SLA Framework v2.0",
    subtitle: "Jira · Claims Ops",
    iconUrl: "https://app.glean.com/images/logos/jira3.svg",
    author: "Amanda Chen",
    excerpt:
      "The restructured vendor assignment process reduced average dispatch time from 4.2 days to 1.8 days. The updated SLA framework was approved in the September steering committee and is tracked in the master process tracker.",
  },
  {
    id: 4,
    title: "Claims SOP Migration Tracker",
    subtitle: "Confluence · Design, Process & Improvement",
    iconUrl: "https://app.glean.com/images/logos/confluence3.svg",
    author: "Jason Lootens",
    excerpt:
      "Migration of all active SOPs and workflow documents into unified Confluence space is at 94% completion. Remaining items are catastrophe-specific runbooks pending legal review, expected complete by end of Q4.",
  },
];

export const followUpQuery =
  "Show me the Jira roadmap for upcoming process improvements in Q1";

export const chatHistory = {
  today: ["Claims Cycle Time Improvements"],
  recent: [
    "FNOL Workflow Redesign Status",
    "Catastrophe Claims Procedures",
    "Vendor Performance Metrics Q3",
    "Auto Claims SOP Updates",
    "Severity Scoring Model Results",
    "Claims Steering Committee Notes",
  ],
};
