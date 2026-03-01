"use client";

import { useState } from "react";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { FeatureList } from "@/components/dashboard/FeatureList";
import { SettingsForm } from "@/components/dashboard/SettingsForm";
import { UpgradeBanner } from "@/components/dashboard/UpgradeBanner";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { formatDate } from "@/lib/utils";

type Tab = "overview" | "features" | "settings";

function DashboardContent() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isPro = user?.plan === "pro";

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar (desktop) */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-x-hidden">
        {/* Mobile top bar */}
        <header className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-slate-100 sticky top-0 z-40 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center">
              <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-bold text-slate-800 text-sm">Nova<span className="text-violet-600">AI</span></span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={isPro ? "pro" : "free"}>{isPro ? "⚡ Pro" : "Free"}</Badge>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-600"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </header>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-100 px-4 py-3 space-y-1 shadow-sm">
            {(["overview", "features", "settings"] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium capitalize transition-colors ${
                  activeTab === tab ? "bg-violet-50 text-violet-700" : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {tab}
              </button>
            ))}
            <Button
              variant="ghost"
              size="sm"
              fullWidth
              onClick={logout}
              className="text-red-500 hover:bg-red-50 justify-start"
            >
              Log Out
            </Button>
          </div>
        )}

        {/* Page content */}
        <main className="flex-1 px-4 sm:px-8 py-8 max-w-5xl w-full mx-auto">
          {/* Welcome header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {user?.name
                  ? `Welcome back, ${user.name.split(" ")[0]}! 👋`
                  : "Welcome to NovaAI! 👋"}
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                {user?.email} &mdash; Member since {formatDate(user?.createdAt ?? "")}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Badge variant={isPro ? "pro" : "free"} className="text-sm px-3 py-1">
                {isPro ? "⚡ Pro Plan" : "Free Plan"}
              </Badge>
            </div>
          </div>

          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Stats row */}
              <StatsCards plan={user?.plan ?? "free"} />

              {/* Upgrade banner (free users only) */}
              {!isPro && <UpgradeBanner />}

              {/* Pro success banner */}
              {isPro && (
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100">
                  <span className="text-2xl">🎉</span>
                  <div>
                    <p className="text-sm font-bold text-emerald-800">You&apos;re on the Pro plan!</p>
                    <p className="text-xs text-emerald-600">All features unlocked. Enjoy unlimited AI power.</p>
                  </div>
                </div>
              )}

              {/* Quick actions */}
              <Card>
                <h2 className="text-base font-bold text-slate-800 mb-4">Quick Actions</h2>
                <div className="grid sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => setActiveTab("features")}
                    className="flex items-center gap-3 p-3 rounded-xl bg-violet-50 hover:bg-violet-100 border border-violet-100 transition-colors text-left"
                  >
                    <span className="text-xl">⚡</span>
                    <div>
                      <p className="text-sm font-semibold text-violet-800">View Features</p>
                      <p className="text-xs text-violet-500">See what&apos;s available</p>
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab("settings")}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-100 transition-colors text-left"
                  >
                    <span className="text-xl">⚙️</span>
                    <div>
                      <p className="text-sm font-semibold text-slate-700">Settings</p>
                      <p className="text-xs text-slate-400">Update your profile</p>
                    </div>
                  </button>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 border border-blue-100">
                    <span className="text-xl">📖</span>
                    <div>
                      <p className="text-sm font-semibold text-blue-800">API Docs</p>
                      <p className="text-xs text-blue-500">Integration guides</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* FEATURES TAB */}
          {activeTab === "features" && (
            <div className="space-y-6">
              {!isPro && <UpgradeBanner />}
              <Card>
                <FeatureList isPro={isPro} />
              </Card>
            </div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <Card>
                <SettingsForm />
              </Card>

              {/* Account details */}
              <Card>
                <h3 className="text-base font-bold text-slate-800 mb-4">Account Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-slate-50">
                    <span className="text-sm text-slate-500">Email</span>
                    <span className="text-sm font-medium text-slate-800">{user?.email}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-slate-50">
                    <span className="text-sm text-slate-500">Plan</span>
                    <Badge variant={isPro ? "pro" : "free"}>
                      {isPro ? "⚡ Pro" : "Free"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-slate-500">Member Since</span>
                    <span className="text-sm font-medium text-slate-800">
                      {formatDate(user?.createdAt ?? "")}
                    </span>
                  </div>
                </div>
              </Card>

              {/* Danger zone */}
              <Card className="border-red-100">
                <h3 className="text-base font-bold text-red-700 mb-2">Session</h3>
                <p className="text-sm text-slate-500 mb-4">
                  Sign out from your current session. Your data will be preserved.
                </p>
                <Button variant="danger" size="sm" onClick={logout}>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Log Out
                </Button>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  );
}
