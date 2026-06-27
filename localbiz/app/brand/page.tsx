"use client";

import { useState } from "react";

const SETUP_STEPS = [
  {
    id: 1,
    time: "10 min",
    title: "Create Booking Calendar",
    icon: "📅",
    steps: [
      "Go to calendly.com (free account)",
      'Create 15-min "Free Website Audit" slot',
      "Set availability: Mon-Fri 2-5 PM (Romanian time)",
      "Copy your calendar link",
      "Add to Linktree or Instagram bio",
    ],
  },
  {
    id: 2,
    time: "5 min",
    title: "Create Bio Link Hub",
    icon: "🔗",
    steps: [
      "Go to linktree.com (free)",
      '"📅 Book Free Audit" → Calendly link',
      '"💰 See Pricing" → Google Drive PDF link',
      '"💬 Join Community" → WhatsApp group link',
      "Update Instagram bio with Linktree URL NOW",
    ],
  },
  {
    id: 3,
    time: "15 min",
    title: "Create Lead Magnet PDF",
    icon: "📄",
    steps: [
      "Use Canva.com (free) — search 'ebook' template",
      "Option A: 25-Point Website Audit Checklist",
      "Option B: Pricing & Packages Breakdown",
      "Option C: 5 Mistakes Killing Your Sales",
      "Export PDF → Upload to Google Drive → Add to Linktree",
    ],
  },
  {
    id: 4,
    time: "5 min",
    title: "Write DM Templates",
    icon: "💬",
    steps: [
      "Copy templates to Notes app on phone",
      "Template 1: for 'website' comments",
      "Template 2: for price questions",
      "Template 3: for tags/mentions",
    ],
  },
  {
    id: 5,
    time: "1 min",
    title: "Enable Notifications",
    icon: "🔔",
    steps: [
      "Instagram → Settings → Notifications",
      "Turn ON: Direct message notifications",
      'Set phone to "priority" for Instagram DMs',
      "Goal: Reply to DMs within 5 minutes",
    ],
  },
];

const DM_TEMPLATES = [
  {
    label: "For 'website' comments",
    tag: "Template 1",
    color: "violet",
    text: `Hey! 👋 Most businesses lose money because their website doesn't convert. Free audit? Just say YES and we'll send details.`,
  },
  {
    label: "For price questions",
    tag: "Template 2",
    color: "blue",
    text: `Good Q! Depends on your needs (500-5000+). Real question: how much will you MAKE? Free 15min call to figure your number?\n[Calendly link]`,
  },
  {
    label: "For tags/mentions",
    tag: "Template 3",
    color: "emerald",
    text: `Love this! Hey [name] - professional website yet? We helped [similar business] go from 0 to X leads/month. Free audit?\n[Link in bio]`,
  },
];

const POSTS = [
  {
    day: "Monday",
    title: "Business Card Video",
    emoji: "🚀",
    caption: `Meet the LocalBiz Pro team! 🚀\n\nWe build websites that actually CONVERT.\n\nWant to see what your business could look like online?\n\nFree audit: Reply "AUDIT" or click link in bio 👇\n\n#LocalBizPro #WebDesign #AntreprenoruiRomani\n#WebsiteProfesional #OnlineBusiness`,
    cta: "DM for free audit",
  },
  {
    day: "Tuesday",
    title: "Value Post – 3 Reasons",
    emoji: "📱",
    caption: `3 reasons your business needs a professional website in 2024 📱\n\nReason #1: 87% of customers research online before buying\nReason #2: Your competitors are already there\nReason #3: A website works 24/7 (you don't have to!)\n\nSmart move = Better website = More customers\n\nReady? Free 15-min consultation [link in bio] ↗️\n\nWhat's the #1 reason YOU need a website? Comment 👇`,
    cta: "Click link in bio for free consultation",
  },
  {
    day: "Wednesday",
    title: "FAQ – Price Question",
    emoji: "💰",
    caption: `"How much does a website cost?" 💰\n\nGreat question! Honest answer:\n\n🔵 Starter: $500 (5 pages, basics)\n🔵 Growth: $1,500 (10 pages, SEO ready)\n🔵 Pro: $3,000+ (custom, full setup)\n\nBut here's what really matters...\n\nThat $2K investment is bringing clients $50K+ yearly 📈\n\nWhat's YOUR budget looking like? Let's talk:\n[Link in bio] or DM "PRICING"`,
    cta: "Get pricing guide (PDF from Linktree)",
  },
  {
    day: "Thursday",
    title: "Testimonial / Case Study",
    emoji: "🎯",
    caption: `[Business Name] went from ZERO online to 5+ customers/month\n\nThe change? A professional website with clear CTAs.\n\nClient said: "[Quote about their results]"\n\nThis could be YOUR story! 🎯\n\nSimilar business? Let's chat:\n📅 Free audit: [Calendly link in bio]\nDM: "CASE STUDY" for more examples`,
    cta: "Book free audit",
  },
  {
    day: "Friday",
    title: "Community Challenge",
    emoji: "🌍",
    caption: `Challenge: Tag 3 entrepreneurs who NEED a website 🚀\n\nKnow anyone still doing business without proper online presence?\n\nTag them below! Let's build the community of smart business owners.\n\nPs: Their first audit is free if they reach out 👇`,
    cta: "Tag someone + they get free audit offer",
  },
];

const CONVERSION_SCRIPTS = [
  {
    stage: "First DM",
    desc: "They reach out",
    text: `Hey [Name]! 👋 So glad you reached out!\n\nQuick question to make sure I can help:\n1. What's your business type?\n2. Do you have a website already?\n3. What's the biggest challenge with your online presence?\n\nOnce I know more, I can give you a real audit, not BS. 💪`,
  },
  {
    stage: "After They Respond",
    desc: "Send the next step",
    text: `Perfect! That makes sense.\n\nI want to send you two things:\n1. Our free 25-point website audit checklist\n2. A calendar link to book a quick 15-min call (zero pressure)\n\nIn that call, I'll show you exactly what's working and what's costing you money.\n\nCool?\n[Links]`,
  },
  {
    stage: "Before the Call",
    desc: "Reminder message",
    text: `Excited for our chat tomorrow at [time]!\n\nQuick reminder: We'll look at your current situation and I'll show you exactly what could change (no sales pitch, just real talk).\n\nSee you then! 🎯`,
  },
];

const WEEKLY_TIMELINE = [
  { week: "Week 1", goal: "Setup + 5 posts + 40 leads", color: "violet" },
  { week: "Week 2", goal: "Optimize best content + 50 leads + 1-2 clients", color: "blue" },
  { week: "Week 3", goal: "Scale + referral program + 60 leads", color: "emerald" },
  { week: "Week 4", goal: "Systematize + build case studies + 70+ leads", color: "amber" },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="text-xs px-3 py-1 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-all border border-gray-700"
    >
      {copied ? "✓ Copied!" : "Copy"}
    </button>
  );
}

function CheckItem({ children }: { children: React.ReactNode }) {
  const [done, setDone] = useState(false);
  return (
    <li
      onClick={() => setDone(!done)}
      className={`flex items-start gap-3 cursor-pointer group transition-opacity ${done ? "opacity-40" : ""}`}
    >
      <span className={`mt-0.5 w-5 h-5 rounded flex-shrink-0 border-2 flex items-center justify-center transition-all ${done ? "bg-violet-600 border-violet-600" : "border-gray-600 group-hover:border-violet-500"}`}>
        {done && <span className="text-white text-xs">✓</span>}
      </span>
      <span className="text-sm text-gray-300 leading-relaxed">{children}</span>
    </li>
  );
}

export default function BrandPage() {
  const [activePost, setActivePost] = useState(0);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-gray-800">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/50 via-gray-950 to-gray-950" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
        <div className="relative max-w-5xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" />
            <span className="text-xs text-violet-400 font-semibold tracking-wider uppercase">Lead Gen Playbook</span>
          </div>
          <h1 className="text-5xl font-black mb-4 leading-tight">
            LocalBiz Pro<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
              Quick Start Guide
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mb-8">
            1 hour of setup today. 30 minutes a day. 40+ leads by end of week.
          </p>
          <div className="flex flex-wrap gap-4">
            {[
              { label: "Week 1 Target", value: "40 Leads" },
              { label: "Month 1 Goal", value: "4-8 Clients" },
              { label: "Daily Time", value: "30 min" },
            ].map((s) => (
              <div key={s.label} className="bg-gray-900 border border-gray-800 rounded-xl px-5 py-3">
                <p className="text-xs text-gray-500 uppercase tracking-wider">{s.label}</p>
                <p className="text-xl font-black text-white">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-16">

        {/* Setup Phase */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center text-sm font-black">1</div>
            <div>
              <h2 className="text-2xl font-black">Setup Phase</h2>
              <p className="text-gray-500 text-sm">Do this today — 1 hour total</p>
            </div>
          </div>
          <div className="grid gap-4">
            {SETUP_STEPS.map((step) => (
              <div key={step.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{step.icon}</span>
                    <div>
                      <h3 className="font-bold text-white">Step {step.id}: {step.title}</h3>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-violet-400 bg-violet-400/10 px-3 py-1 rounded-full">{step.time}</span>
                </div>
                <ul className="space-y-2">
                  {step.steps.map((s, i) => (
                    <CheckItem key={i}>{s}</CheckItem>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* DM Templates */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-sm font-black">2</div>
            <div>
              <h2 className="text-2xl font-black">DM Templates</h2>
              <p className="text-gray-500 text-sm">Copy to Notes app for quick replies</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {DM_TEMPLATES.map((t) => (
              <div key={t.tag} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded-full">{t.tag}</span>
                  <CopyButton text={t.text} />
                </div>
                <p className="text-xs text-gray-500 mb-3">{t.label}</p>
                <p className="text-sm text-gray-300 leading-relaxed flex-1 whitespace-pre-line">{t.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Daily Action Plan */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-sm font-black">3</div>
            <div>
              <h2 className="text-2xl font-black">Daily Action Plan</h2>
              <p className="text-gray-500 text-sm">30 min/day — every single day</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                time: "9-10 AM",
                title: "Morning Check",
                duration: "10 min",
                color: "violet",
                items: ["Check overnight DMs — reply to ALL (use templates)", "Respond personally to all comments", "Note which posts got most engagement"],
              },
              {
                time: "10-11 AM",
                title: "Post Content",
                duration: "5 min",
                color: "blue",
                items: ["Mon: Business card video", "Tue: Value post (benefits/results)", "Wed: FAQ or tips", "Thu: Testimonial", "Fri: Community challenge", "Sat: Behind-the-scenes", "Sun: Weekly recap + CTA"],
              },
              {
                time: "6-7 PM",
                title: "Engagement Sprint",
                duration: "10 min",
                color: "emerald",
                items: ["Post evening content", "Reply to ALL new DMs", "Like + comment on 10-15 similar accounts", "Check trending hashtags in your niche"],
              },
            ].map((block) => (
              <div key={block.title} className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold">{block.title}</h3>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    block.color === "violet" ? "text-violet-400 bg-violet-400/10" :
                    block.color === "blue" ? "text-blue-400 bg-blue-400/10" :
                    "text-emerald-400 bg-emerald-400/10"
                  }`}>{block.duration}</span>
                </div>
                <p className="text-xs text-gray-500 mb-4">{block.time}</p>
                <ul className="space-y-2">
                  {block.items.map((item, i) => (
                    <CheckItem key={i}>{item}</CheckItem>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Content Queue */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-amber-600 flex items-center justify-center text-sm font-black">4</div>
            <div>
              <h2 className="text-2xl font-black">This Week&apos;s Content Queue</h2>
              <p className="text-gray-500 text-sm">5 posts ready to go — click to preview captions</p>
            </div>
          </div>
          <div className="flex gap-2 mb-4 flex-wrap">
            {POSTS.map((p, i) => (
              <button
                key={i}
                onClick={() => setActivePost(i)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activePost === i
                    ? "bg-amber-600 text-white"
                    : "bg-gray-900 border border-gray-800 text-gray-400 hover:border-gray-600"
                }`}
              >
                {p.emoji} {p.day}
              </button>
            ))}
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-lg">{POSTS[activePost].title}</h3>
                <p className="text-xs text-gray-500">Post {activePost + 1} of 5 · {POSTS[activePost].day} 10 AM</p>
              </div>
              <CopyButton text={POSTS[activePost].caption} />
            </div>
            <div className="bg-gray-950 rounded-xl p-4 mb-4 border border-gray-800">
              <pre className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed font-sans">{POSTS[activePost].caption}</pre>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">CTA:</span>
              <span className="text-xs text-amber-400 font-medium">{POSTS[activePost].cta}</span>
            </div>
          </div>
        </section>

        {/* Conversion Scripts */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-sm font-black">5</div>
            <div>
              <h2 className="text-2xl font-black">Lead Conversion Scripts</h2>
              <p className="text-gray-500 text-sm">Use these when they DM you</p>
            </div>
          </div>
          <div className="space-y-4">
            {CONVERSION_SCRIPTS.map((s, i) => (
              <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-rose-600 flex items-center justify-center text-xs font-black">{i + 1}</span>
                    <div>
                      <h3 className="font-bold">{s.stage}</h3>
                      <p className="text-xs text-gray-500">{s.desc}</p>
                    </div>
                  </div>
                  <CopyButton text={s.text} />
                </div>
                <div className="bg-gray-950 rounded-xl p-4 border border-gray-800">
                  <pre className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed font-sans">{s.text}</pre>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Do / Don't */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gray-600 flex items-center justify-center text-sm font-black">6</div>
            <h2 className="text-2xl font-black">Common Mistakes to Avoid</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-red-950/30 border border-red-900/40 rounded-2xl p-6">
              <h3 className="font-bold text-red-400 mb-4 flex items-center gap-2"><span>❌</span> Don&apos;t Do This</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                {[
                  "Not responding to DMs within 5 minutes (kills conversion)",
                  "Using too many hashtags (looks spammy, algorithm punishes)",
                  "Posting at random times (timing = 80% of reach)",
                  "Not asking for the sale (just 'building community' won't pay bills)",
                  "Generic captions (boring = ignored)",
                  "Ignoring top comments (engagement signals lead to more reach)",
                ].map((m, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5 flex-shrink-0">✗</span>
                    {m}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-emerald-950/30 border border-emerald-900/40 rounded-2xl p-6">
              <h3 className="font-bold text-emerald-400 mb-4 flex items-center gap-2"><span>✅</span> Do This Instead</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                {[
                  "Fast reply (< 5 min) = 60% of people say YES to call",
                  "Personal touch (use their name) = Trust building",
                  "Clear CTA (book call, audit, etc) = Action",
                  "Daily posts = Algorithm loves consistency",
                  "Respond in Romanian (personal connection)",
                  "Reference Romanian businesses & local pain points",
                ].map((m, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span>
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 30-Day Timeline */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-sm font-black">7</div>
            <div>
              <h2 className="text-2xl font-black">Next 30 Days</h2>
              <p className="text-gray-500 text-sm">Target: 4-8 new paying clients from Instagram only</p>
            </div>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {WEEKLY_TIMELINE.map((w, i) => (
              <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-600 to-blue-600" style={{ opacity: (i + 1) * 0.25 }} />
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{w.week}</p>
                <p className="text-sm text-gray-300 leading-relaxed">{w.goal}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Immediate Action CTA */}
        <section className="bg-gradient-to-br from-violet-900/40 to-blue-900/30 border border-violet-800/40 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-black mb-2">Immediate Action</h2>
          <p className="text-gray-400 mb-8">Next 30 minutes. That&apos;s all it takes to start.</p>
          <div className="grid md:grid-cols-3 gap-3 max-w-2xl mx-auto mb-8">
            {[
              "Create Calendly account",
              "Create Linktree account",
              "Update Instagram bio link",
              "Copy DM templates to phone",
              "Enable DM notifications",
              "Schedule first 3 posts",
            ].map((action, i) => (
              <CheckItem key={i}>{action}</CheckItem>
            ))}
          </div>
          <p className="text-2xl font-black text-violet-400">Go! 🚀</p>
        </section>

      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-6 text-center text-xs text-gray-600">
        LocalBiz Pro · localbizpro.allibuild.com/brand
      </footer>
    </div>
  );
}
