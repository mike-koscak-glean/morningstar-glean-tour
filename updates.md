This is exactly the right move. If you are going to build a custom demo, you want it grounded in what they already use.

Based on your DNS results, here is what Kemper is almost certainly running:

Core Infrastructure Signals
1. Microsoft 365 / Azure

Evidence

MX → mail.protection.outlook.com

SPF → include:spf.protection.outlook.com

Implication

Exchange Online

Outlook

Likely SharePoint Online

Likely OneDrive

Likely Teams

Azure AD / Entra ID

This is their backbone.

2. Atlassian

Evidence

atlassian-domain-verification=...

They almost certainly use:

Jira

Confluence

Possibly Jira Service Management

Given his title (Director, Design, Process & Improvement in Claims), Confluence + Jira is very likely heavily used.

3. JetBrains

Evidence

jetbrains-domain-verification=...

This suggests:

They have developers

Likely using IntelliJ, Rider, or other JetBrains IDEs

Possibly TeamCity or Space

This is useful if you want to hint at engineering documentation silos.

4. Exclaimer

Evidence

include:spf.exclaimer.net

Email signature management platform.
This confirms centralized M365 governance.

5. Workhuman

Evidence

include:spf1.workhuman.com

Employee recognition / HR platform.

6. Salesforce Marketing Cloud (ExactTarget)

Evidence

include:cust-spf.exacttarget.com

Used for:

Marketing automation

Email campaigns

Possibly customer comms

7. OpenAI

Evidence

Two openai-domain-verification records

This is interesting.

It means:

Someone internally verified domain ownership with OpenAI

They likely have an OpenAI enterprise account

Could be experimenting with GPT integrations

That is an opening.

8. Google (Site Verification)

Probably just for:

Google Search Console

Analytics

Possibly some Google Workspace tools

9. Uber

Domain verification likely for:

Corporate Uber account

Expense / travel management

10. Bitrise

Mobile CI/CD platform.
This suggests:

They may have a mobile app

Engineering maturity

Summary: What Their Stack Likely Looks Like

Microsoft 365 (email, docs, collaboration)

SharePoint

OneDrive

Teams

Jira

Confluence

Salesforce Marketing Cloud

Engineering CI/CD tools

Possibly OpenAI experimentation

This is a very “standard enterprise” stack.

Now Let’s Think Strategically

You are selling Glean.

Given this stack, their pain likely lives in:

SharePoint document sprawl

Confluence duplication

Jira ticket archaeology

Email knowledge locked in Outlook

Claims process documentation fragmentation

Cross-team knowledge in Claims vs IT vs Ops

Given his title:
Director – Design, Process & Improvement (Claims)

This is perfect.

He is:

Process oriented

Probably dealing with SOPs

Handling cross-functional coordination

Trying to improve claim cycle time

If You Build a Custom Demo, Here Is the Angle

Do NOT demo generic “AI assistant.”

Make it hyper specific.

Narrative Hook

“Imagine your claims design team could instantly surface:

The latest approved SOP

Related Jira improvement tickets

Prior root cause analysis documents

Customer complaint trends

Process changes implemented in the last 6 months”

All in one answer.

Custom Demo Structure For Him

If you build your fake TransUnion-style site, for Kemper you would simulate:

Prompt 1

“What process changes reduced claim cycle time in Q4?”

AI response:

Pull from Confluence improvement docs

Reference Jira ticket numbers

Cite SharePoint dashboards

Mention Teams discussions

Prompt 2

“Show me the most recent catastrophe claims workflow updates.”

AI response:

Surface workflow doc

Highlight change log

Pull Slack or Teams thread

Show ownership

Prompt 3

“What recurring issues are we seeing in auto claims FNOL?”

AI response:

Pull CRM summary

Pull internal analysis

Pull call transcript insight

Reference process redesign initiative

Important: Use What You Saw

Because they verified OpenAI, you can safely say:

“Many teams experiment with copilots inside individual tools. What we see is those experiments create intelligence inside silos.”

That lands without being aggressive.

The Real Strategic Angle

Since they are Microsoft-heavy:

You position as:

Complement to Copilot

Not replacing it

Cross-system intelligence layer

Especially since they use Atlassian + M365.
Copilot does not unify Jira + Confluence + Salesforce well.

That is your wedge.

If You Want To Get Very Tactical

Before building demo:

Check LinkedIn for:

“Kemper Jira”

“Kemper Confluence”

“Kemper SharePoint”

Look for job postings mentioning tech stack.

Check BuiltWith on kemper.com.

You can tune the fake citations to feel real.

My Advice

Build a 3-minute hyper-targeted “Claims Process Improvement AI” experience.

Make it feel like:

It knows their workflow

It understands insurance

It speaks in claims language

That is how you convert a “we already have something in flight” into:

“Okay, let’s at least take a call.”

If you want, I can:

Help you write the exact prompts and AI responses

Craft a tight follow-up email to reopen this thread

Or design a full narrative flow for your custom demo site

This is very winnable.