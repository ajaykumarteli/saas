"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";

export function SettingsForm() {
  const { user, updateSettings } = useAuth();

  const [name, setName]       = useState(user?.name ?? "");
  const [company, setCompany] = useState(user?.company ?? "");
  const [saved, setSaved]     = useState(false);
  const [saving, setSaving]   = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    // Simulate async save
    await new Promise((r) => setTimeout(r, 600));
    updateSettings(name.trim(), company.trim());
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const isDirty = name !== (user?.name ?? "") || company !== (user?.company ?? "");

  return (
    <div>
      <CardHeader className="border-none pb-0 mb-0">
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>Update your profile information.</CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <Input
          label="Full Name"
          type="text"
          placeholder="Jane Doe"
          value={name}
          onChange={(e) => { setName(e.target.value); setSaved(false); }}
          hint="Your display name across the platform."
        />
        <Input
          label="Company"
          type="text"
          placeholder="Acme Corp"
          value={company}
          onChange={(e) => { setCompany(e.target.value); setSaved(false); }}
          hint="Your organization or company name."
        />

        <div className="flex items-center gap-3">
          <Button
            type="submit"
            isLoading={saving}
            disabled={!isDirty || saving}
            size="md"
          >
            Save Changes
          </Button>

          {saved && (
            <span className="flex items-center gap-1.5 text-sm font-medium text-emerald-600">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Saved!
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
