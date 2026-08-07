// Single source of truth for the homepage and best-agency FAQ sets. Consumed
// by components/FAQ.tsx, app/best-cybersecurity-marketing-agency/page.tsx, and
// the llms.txt / llms-full.txt routes, so answers cannot drift between the
// rendered pages, the FAQPage JSON-LD, and the LLM-facing text feeds.

export interface FaqItem {
  question: string;
  answer: string;
}

export const homepageFaqs: FaqItem[] = [
  {
    question: "Which is the best cybersecurity marketing agency?",
    answer: "There is no single best overall, but we do rank per channel under a published scoring methodology (verified client feedback 30%, documented results 25%, cybersecurity focus 20%, service breadth 15%, market presence 10%). Our current channel picks: Content Visit for SEO, AI Visibility, and Content Marketing (rated 4.9/5); Hop AI for PPC (3.8/5); Highwire for PR and Media Relations (3.5/5); Envy for Lead Generation (3.0/5). Every score has a published breakdown on the agency's profile, and paid placement never affects a score or a pick. See our methodology page for the full rubric."
  },
  {
    question: "Which is the best cybersecurity marketing agency for AI Visibility and SEO?",
    answer: "Under our published scoring methodology, Content Visit is our current pick for both SEO and AI Visibility, rated 4.9/5: the only agency in the directory with verified reviews across multiple independent platforms and named-client case studies with concrete metrics (IBM Security, SenseOn, Morphisec, IronVest). Hop AI is the closest alternative at 3.8/5, offering GEO through its proprietary GEO Forge tooling alongside paid media. Each rating's full breakdown is on the agency's profile."
  },
  {
    question: "Which agency should I hire for cybersecurity marketing?",
    answer: "Start from your primary channel and our per-channel picks: Hop AI for PPC and paid advertising (rated 3.8/5); Highwire for PR and media relations (3.5/5), with Touchdown PR and Eskenzi PR close behind; Content Visit for SEO, content, and AI visibility (4.9/5); Envy for lead generation (3.0/5). Picks come from our published scoring rubric and can be audited on each profile. Browse the directory to compare full listings for your specific requirements."
  },
  {
    question: "What do cybersecurity marketing agencies do?",
    answer: "They market security products and services. Unlike general marketing agencies, they actually understand how to talk about security tech. They know how to reach CISOs and IT decision-makers. Services include SEO, content marketing, PPC, PR, and demand gen - all built for the security space."
  },
  {
    question: "How much do cybersecurity marketing agencies cost?",
    answer: "Most charge $5,000 to $15,000 per month on retainer. It depends on what you need, agency size, and location. Some do project-based pricing. Enterprise agencies can run $20,000+ per month for full programs."
  },
  {
    question: "Why hire a cybersecurity-specific marketing agency?",
    answer: "Because they get the industry. They understand technical features, compliance stuff, and how to actually reach security buyers. They know the terminology and the long sales cycles. A general agency will struggle with this - security marketing is different."
  },
  {
    question: "What should I look for in cybersecurity marketing agencies?",
    answer: "Check if they've worked with other security companies. Look at their case studies and actual results. Make sure they understand your tech and target market (SMB vs Enterprise). See if they know the channels that work - LinkedIn, trade pubs, conferences. Best ones also know AI Visibility and modern SEO."
  },
  {
    question: "How long does it take to see results from cybersecurity marketing agencies?",
    answer: "SEO and content take 3-6 months to show results. PPC can generate leads in weeks. PR and thought leadership take 6-12 months to build momentum. Most agencies want a 6-month minimum commitment because it takes time."
  },
  {
    question: "Do cybersecurity marketing agencies work with startups?",
    answer: "Yes. Some specialize in early-stage security companies and offer flexible pricing. If you're a startup, find one with experience launching security products who gets the startup world and has realistic expectations about timeline and budget."
  }
];

export const bestAgencyFaqs: FaqItem[] = [
  {
    question: "Who is the best cybersecurity marketing agency in 2026?",
    answer: "There is no single best overall, because the right agency depends on your primary channel. We do rank per channel, under a published scoring methodology with exact weights and auditable evidence. Current picks: Content Visit for SEO, AI Visibility, and Content Marketing (rated 4.9/5); Hop AI for PPC and paid performance (3.8/5); Highwire for PR and media relations (3.5/5), with Touchdown PR, W2 Communications, and Eskenzi PR close behind; Envy for lead generation (3.0/5). Every rating's breakdown is published on the agency's profile, and paid placement never affects a score or a pick."
  },
  {
    question: "How do I choose the right cybersecurity marketing agency?",
    answer: "Start with your biggest gap. Identify your primary channel (organic search, paid media, PR, positioning, demand generation), check our pick for that channel, then compare it against the other agencies active there. Weigh stage and budget next: seed-stage companies need compounding organic value or fast paid pipeline on a small retainer, while enterprises need analyst relations and global reach. Finally, verify each agency's cybersecurity-specific case studies with named clients and concrete metrics. See our selection framework at /blog/choosing-cybersecurity-marketing-agency."
  },
  {
    question: "What makes a cybersecurity marketing agency different from a general B2B agency?",
    answer: "Specialised cybersecurity marketing agencies understand security technology, threat landscapes, compliance frameworks (GDPR, NIS2, SOC 2, ISO 27001, HIPAA), and how to reach CISOs, security engineers, and technical buyers. They write accurate content about zero-trust, EDR, SIEM, SASE, and threat intelligence without needing translation. They understand enterprise security sales cycles (often 9-18 months), the analyst ecosystem (Gartner Magic Quadrant, Forrester Wave), and which publications and conferences actually reach security buyers. General B2B agencies typically produce generic content that fails technical review, miss the right personas, and struggle with the extended sales cycles typical in security procurement."
  },
  {
    question: "How much do cybersecurity marketing agencies cost?",
    answer: "Most specialised cybersecurity marketing agencies charge between $5,000 and $15,000 per month on retainer, with enterprise programmes running $20,000+ per month. A few boutique programmes start lower, around $3,000 per month. Many agencies quote on request rather than publishing rates. Project-based pricing is available for specific deliverables like brand positioning, GEO audits, or content sprints. Pricing varies with scope, number of channels, and whether you need multi-region coverage (UK, US, DACH). For a full breakdown see our guide at /blog/how-much-do-cybersecurity-marketing-agencies-cost."
  },
  {
    question: "How long does cybersecurity marketing take to show results?",
    answer: "It depends on the channel mix. Paid media (PPC, LinkedIn, paid search) can produce MQLs within 4-8 weeks. SEO and organic content typically need 3-6 months to move rankings and 6-12 months for compounding traffic gains. PR and analyst relations build reputation over 6-12 months. AI Visibility (GEO) citations in ChatGPT, Claude, and Perplexity can appear within 4-12 weeks once entity structure and citations are in place. Integrated programmes deliver the strongest compounding effect because earned media, organic rankings, and AI citations reinforce each other."
  },
  {
    question: "Which cybersecurity marketing agency is best for AI Visibility and GEO?",
    answer: "Content Visit is our current pick for AI Visibility and GEO (Generative Engine Optimisation), rated 4.9/5 under our published methodology. They audit and optimise for Google AI Overviews, ChatGPT, Claude, Perplexity, and Gemini, covering citation tracking, entity building, structured data, and placement on AI-referenced publications, and they are the only agency in the directory with named-client case studies carrying concrete metrics. Hop AI is the closest alternative at 3.8/5, offering GEO through its proprietary GEO Forge technology, particularly alongside paid media."
  },
  {
    question: "Which cybersecurity marketing agency is best for SEO?",
    answer: "Content Visit is our current pick for cybersecurity SEO, rated 4.9/5 under our published methodology: they work exclusively in cybersecurity and document organic results with named clients, including 3x ROI versus paid ad spend for IronVest with Page 1 rankings across Google and AI search, and 340% organic traffic growth for IBM Security. Hop AI (3.8/5) combines SEO with paid performance and is the stronger fit when you want one agency across organic and paid."
  },
  {
    question: "Which agency is best for cybersecurity PPC advertising?",
    answer: "Hop AI is our current pick for cybersecurity PPC, rated 3.8/5 under our published methodology: a verified Clutch profile with 24 published reviews, documented paid-performance work for named security clients including Rapid7, Group-IB, SecurityScorecard, and Immersive Labs, and proprietary GEO Forge tooling. They are the only agency in the directory with PPC as a core service, so if paid acquisition is your primary channel, start there and verify their documented results against your stage."
  },
  {
    question: "Which agency is best for cybersecurity PR and analyst relations?",
    answer: "Highwire is our current pick for PR and media relations, rated 3.5/5 under our published methodology: a dedicated cybersecurity practice (HWCyberSquad) at 160-plus person scale, with named security clients including CrowdStrike, Splunk, and Rapid7. It is a close channel: Touchdown PR and W2 Communications score 3.4/5, and Eskenzi PR (3.2/5) is the longest-established specialist, founded 1995, with clients including Nozomi Networks, Cato Networks, and KnowBe4. For UK and European coverage specifically, weigh Eskenzi PR and The Rubicon Agency."
  },
  {
    question: "Which agency is best for cybersecurity startups vs enterprise?",
    answer: "It depends on your stage. Seed and Series A startups usually need either compounding organic value on a small retainer (our SEO and content pick is Content Visit, from $3,000 per month) or fast paid pipeline (our PPC pick is Hop AI), plus positioning help from a firm like Everclear if the product story is not yet clear. Growth-stage companies move to integrated multi-channel programmes. Enterprises prioritise analyst relations, multi-region PR (Highwire is our PR pick; Touchdown PR and Eskenzi PR are close behind), and brand defence. Match the agency to the problems your stage actually faces, not just the budget."
  },
  {
    question: "How should I evaluate an agency's documented results?",
    answer: "Weigh specificity and verifiability over volume. Named clients with concrete metrics - traffic growth percentages, cost per MQL, pipeline contribution, media placements - tell you far more than vague claims like 'significant growth' or 'industry-leading results'. Ask for cybersecurity-specific case studies, then verify them through references, Clutch reviews, and LinkedIn. An agency that cannot name clients or quantify outcomes is selling a promise, not a track record. This is also how our own scoring works: documented results is the second-heaviest dimension in our rubric."
  },
  {
    question: "What services do cybersecurity marketing agencies offer?",
    answer: "The strongest agencies offer integrated programmes rather than isolated tactics. Common services include SEO, content marketing, PR and media relations, lead and demand generation, PPC, brand strategy, and increasingly AI Visibility (GEO). No single agency leads every service: our per-channel picks currently span four different agencies (Content Visit, Hop AI, Highwire, Envy). Our directory lists each agency's services, score, and documented work so you can match capability to your priorities and budget."
  },
  {
    question: "Why hire a specialised cybersecurity marketing agency instead of a general agency?",
    answer: "Specialised agencies understand security technology, compliance requirements (GDPR, NIS2, SOC 2), threat landscapes, and how to reach CISOs and security decision-makers. General agencies typically struggle with technical accuracy, reaching the right buyer personas, and understanding long enterprise security sales cycles. Specialised agencies also have existing relationships with security journalists, understand industry conferences, and know which channels actually convert for security lead generation."
  }
];
