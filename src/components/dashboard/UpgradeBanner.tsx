"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";

export function UpgradeBanner() {
  const { upgradeToPro } = useAuth();
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  async function handleUpgrade() {
    setLoading(true);
    // Simulate payment processing
    await new Promise((r) => setTimeout(r, 1500));
    upgradeToPro();
    setLoading(false);
    setConfirmed(true);
  }

  if (confirmed) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 p-6 text-white shadow-xl shadow-violet-200">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute bottom-0 left-1/2 h-24 w-48 -translate-x-1/2 translate-y-8 rounded-full bg-white/10 blur-2xl" />

      <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🚀</span>
            <h3 className="text-lg font-bold">Upgrade to Pro</h3>
          </div>
          <p className="text-sm text-violet-100 max-w-md leading-relaxed">
            Unlock unlimited API requests, advanced analytics, custom fine-tuning,
            priority support, and your entire team — just{" "}
            <strong className="text-white">$29/month</strong>.
          </p>
          <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1">
            {[
              "Unlimited requests",
              "Priority support",
              "Custom fine-tuning",
              "Team collaboration",
            ].map((item) => (
              <li key={item} className="flex items-center gap-1.5 text-xs text-violet-100">
                <svg className="h-3.5 w-3.5 text-violet-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="shrink-0">
          <Button
            onClick={handleUpgrade}
            isLoading={loading}
            className="bg-white text-violet-700 hover:bg-violet-50 font-bold shadow-lg px-6 py-3 rounded-xl border-0 hover:shadow-xl transition-all"
            size="lg"
          >
            {loading ? "Processing..." : "Upgrade to Pro →"}
          </Button>
          <p className="text-xs text-violet-200 mt-2 text-center">
            14-day free trial. Cancel anytime.
          </p>
        </div>
      </div>
    </div>
  );
}
