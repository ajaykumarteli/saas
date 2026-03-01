"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

const stats = [
  { label: "Active Users", value: "50K+" },
  { label: "AI Requests / Day", value: "2M+" },
  { label: "Uptime", value: "99.9%" },
];

const featureHighlights = [
  { icon: "⚡", text: "Blazing-fast AI inference" },
  { icon: "🔒", text: "Enterprise-grade security" },
  { icon: "📊", text: "Real-time analytics" },
  { icon: "🔗", text: "100+ integrations" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white pt-32 pb-20 px-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-violet-100 opacity-60 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-purple-100 opacity-60 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-indigo-50 opacity-40 blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto text-center">
        {/* Announcement badge */}
        <div className="inline-flex items-center gap-2 bg-violet-50 border border-violet-200 rounded-full px-4 py-1.5 mb-8">
          <span className="h-2 w-2 rounded-full bg-violet-500 animate-pulse" />
          <span className="text-sm font-medium text-violet-700">
            Introducing NovaAI 2.0 — Now 10x faster
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-tight tracking-tight mb-6">
          The AI Platform
          <br />
          <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Built for Scale
          </span>
        </h1>

        {/* Subheadline */}
        <p className="max-w-2xl mx-auto text-xl text-slate-500 leading-relaxed mb-10">
          Supercharge your workflow with NovaAI — the all-in-one AI platform
          for teams that move fast. Automate tasks, generate insights, and
          unlock the full potential of AI.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link href="/signup">
            <Button size="lg" className="shadow-lg shadow-violet-200 hover:shadow-xl hover:shadow-violet-300 transition-all">
              Start Free Trial
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" size="lg">
              Sign In to Dashboard
            </Button>
          </Link>
        </div>

        {/* Feature highlights */}
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          {featureHighlights.map((f) => (
            <div key={f.text} className="flex items-center gap-2 text-sm text-slate-600 font-medium">
              <span>{f.icon}</span>
              <span>{f.text}</span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                {stat.value}
              </span>
              <span className="text-sm text-slate-500 mt-1">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Dashboard preview mockup */}
      <div className="relative max-w-4xl mx-auto mt-20">
        <div className="bg-white rounded-2xl shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden">
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border-b border-slate-100">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            <span className="h-3 w-3 rounded-full bg-emerald-400" />
            <div className="flex-1 mx-4 bg-slate-100 rounded-md h-5 max-w-xs" />
          </div>
          {/* Mock dashboard content */}
          <div className="p-6 bg-slate-50 min-h-48">
            <div className="grid grid-cols-3 gap-4 mb-4">
              {["API Calls", "Tokens Used", "Response Time"].map((label, i) => (
                <div key={label} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                  <div className="text-xs text-slate-500 mb-1">{label}</div>
                  <div
                    className="h-6 rounded bg-gradient-to-r from-violet-200 to-purple-200"
                    style={{ width: `${60 + i * 15}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-8 w-8 rounded-lg bg-violet-100" />
                <div className="flex-1">
                  <div className="h-3 w-32 bg-slate-100 rounded mb-1" />
                  <div className="h-2 w-20 bg-slate-50 rounded" />
                </div>
              </div>
              <div className="space-y-2">
                {[80, 55, 70].map((w, i) => (
                  <div key={i} className={`h-2 rounded bg-slate-100`} style={{ width: `${w}%` }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
