"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { PricingPlan } from "@/types";

const plans: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    description: "Perfect for individuals and side projects.",
    features: [
      "500 AI requests / month",
      "1 workspace",
      "Basic analytics",
      "Community support",
      "API access (limited)",
    ],
    cta: "Get Started Free",
    highlighted: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$29",
    description: "For professionals and growing teams.",
    features: [
      "Unlimited AI requests",
      "Unlimited workspaces",
      "Advanced analytics & reports",
      "Priority support (24/7)",
      "Full API access",
      "Custom AI model fine-tuning",
      "Team collaboration tools",
      "SSO & advanced security",
    ],
    cta: "Start Pro Trial",
    highlighted: true,
  },
];

function CheckIcon() {
  return (
    <svg className="h-4 w-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="py-24 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-violet-600 bg-violet-50 px-4 py-1.5 rounded-full mb-4">
            Simple Pricing
          </span>
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">
            Find the plan that fits you
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Start for free, upgrade when you need more power. No hidden fees,
            cancel any time.
          </p>
        </div>

        {/* Plans grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              padding="lg"
              className={
                plan.highlighted
                  ? "border-violet-300 ring-2 ring-violet-500 shadow-xl shadow-violet-100 relative"
                  : ""
              }
            >
              {plan.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-violet-600 to-purple-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-800 mb-1">{plan.name}</h3>
                <p className="text-slate-500 text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-slate-900">{plan.price}</span>
                  <span className="text-slate-400 text-sm">/month</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <CheckIcon />
                    <span className="text-sm text-slate-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/signup" className="block">
                <Button
                  fullWidth
                  variant={plan.highlighted ? "primary" : "outline"}
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </Link>
            </Card>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-sm text-slate-400 mt-10">
          All plans include a 14-day free trial. No credit card required.
        </p>
      </div>
    </section>
  );
}
