"use client";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { Feature } from "@/types";

const allFeatures: Feature[] = [
  {
    id: "api-access",
    title: "API Access",
    description: "Connect to the NovaAI API and power your applications.",
    isPro: false,
    icon: "🔗",
  },
  {
    id: "basic-analytics",
    title: "Basic Analytics",
    description: "Track usage, requests, and response times.",
    isPro: false,
    icon: "📊",
  },
  {
    id: "community-support",
    title: "Community Support",
    description: "Access the NovaAI community forum and documentation.",
    isPro: false,
    icon: "👥",
  },
  {
    id: "advanced-analytics",
    title: "Advanced Analytics",
    description: "Deep insights, custom reports, cohort analysis, and export.",
    isPro: true,
    icon: "📈",
  },
  {
    id: "priority-support",
    title: "Priority Support (24/7)",
    description: "Dedicated support engineer with 1hr response SLA.",
    isPro: true,
    icon: "⚡",
  },
  {
    id: "fine-tuning",
    title: "Custom Model Fine-Tuning",
    description: "Train AI on your own data for specialized use cases.",
    isPro: true,
    icon: "🧠",
  },
  {
    id: "team-collab",
    title: "Team Collaboration",
    description: "Shared workspaces, roles, and real-time collaboration.",
    isPro: true,
    icon: "🤝",
  },
  {
    id: "sso",
    title: "SSO & Advanced Security",
    description: "SAML/OIDC SSO, audit logs, IP allowlisting, and RBAC.",
    isPro: true,
    icon: "🔒",
  },
];

interface FeatureListProps {
  isPro: boolean;
}

export function FeatureList({ isPro }: FeatureListProps) {
  const visibleFeatures = isPro
    ? allFeatures
    : allFeatures.filter((f) => !f.isPro);

  const lockedFeatures = !isPro ? allFeatures.filter((f) => f.isPro) : [];

  return (
    <div>
      <CardHeader className="mb-0 pb-0 border-none">
        <CardTitle>Your Features</CardTitle>
        <CardDescription>
          {isPro
            ? "You have access to all Pro features."
            : "Upgrade to Pro to unlock all features."}
        </CardDescription>
      </CardHeader>

      <div className="grid sm:grid-cols-2 gap-3 mt-4">
        {visibleFeatures.map((feature) => (
          <div
            key={feature.id}
            className="flex items-start gap-3 p-3 rounded-xl bg-emerald-50 border border-emerald-100"
          >
            <span className="text-xl shrink-0">{feature.icon}</span>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-slate-800">{feature.title}</p>
                {feature.isPro && <Badge variant="pro">Pro</Badge>}
              </div>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{feature.description}</p>
            </div>
          </div>
        ))}

        {lockedFeatures.map((feature) => (
          <div
            key={feature.id}
            className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 opacity-60"
          >
            <span className="text-xl shrink-0 grayscale">{feature.icon}</span>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-slate-500">{feature.title}</p>
                <Badge variant="pro">Pro</Badge>
                <span className="text-slate-400">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
