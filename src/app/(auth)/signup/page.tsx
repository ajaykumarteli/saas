"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { isValidEmail, isValidPassword } from "@/lib/utils";

export default function SignupPage() {
  const router = useRouter();
  const { signup, isAuthenticated, isLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPw] = useState("");
  const [errors, setErrors] = useState<{
    email?: string; password?: string; confirmPassword?: string; form?: string;
  }>({});
  const [submitting, setSubmitting] = useState(false);
  const [confirmTouched, setConfirmTouched] = useState(false);

  useEffect(() => {
    if (!isLoading && isAuthenticated) router.replace("/dashboard");
  }, [isAuthenticated, isLoading, router]);

  function validate() {
    const next: typeof errors = {};
    if (!email) next.email = "Email is required.";
    else if (!isValidEmail(email)) next.email = "Enter a valid email.";
    if (!password) next.password = "Password is required.";
    else if (!isValidPassword(password)) next.password = "Must be at least 8 characters.";
    if (!confirmPassword) next.confirmPassword = "Please confirm your password.";
    else if (password !== confirmPassword) next.confirmPassword = "Passwords do not match.";
    return next;
  }

  const isFormValid =
    isValidEmail(email) &&
    isValidPassword(password) &&
    password === confirmPassword &&
    confirmPassword.length > 0;

  // Real-time inline validation for confirm password
  const validateConfirmPassword = useCallback(() => {
    if (!confirmTouched || confirmPassword.length === 0) return;
    if (password !== confirmPassword) {
      setErrors((p) => ({ ...p, confirmPassword: "Passwords do not match." }));
    } else {
      setErrors((p) => ({ ...p, confirmPassword: undefined }));
    }
  }, [password, confirmPassword, confirmTouched]);

  useEffect(() => {
    validateConfirmPassword();
  }, [validateConfirmPassword]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length) { setErrors(v); return; }

    setSubmitting(true);
    setErrors({});
    try {
      await signup({ email, password, confirmPassword });
      router.push("/dashboard");
    } catch (err) {
      setErrors({ form: (err as Error).message });
    } finally {
      setSubmitting(false);
    }
  }

  if (isLoading) return null;

  const passwordStrength = password.length === 0 ? 0
    : password.length < 8 ? 1
      : password.length < 12 ? 2
        : 3;

  const strengthLabel = ["", "Weak", "Good", "Strong"];
  const strengthColor = ["", "bg-red-400", "bg-amber-400", "bg-emerald-500"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50 flex items-center justify-center px-4 py-12">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 h-72 w-72 rounded-full bg-violet-100 opacity-50 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-purple-100 opacity-50 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center shadow-md shadow-violet-200">
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-slate-800">
              Nova<span className="text-violet-600">AI</span>
            </span>
          </Link>
        </div>

        <Card padding="lg">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-800">Create your account</h1>
            <p className="text-sm text-slate-500 mt-1">
              Start your free trial — no credit card required
            </p>
          </div>

          {errors.form && (
            <div className="mb-4 flex items-start gap-2 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
              <svg className="h-4 w-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <Input
              label="Email address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined, form: undefined })); }}
              error={errors.email}
              autoComplete="email"
            />

            <div className="flex flex-col gap-1">
              <Input
                label="Password"
                type="password"
                placeholder="Min. 8 characters"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: undefined })); }}
                error={errors.password}
                autoComplete="new-password"
              />
              {/* Password strength indicator */}
              {password.length > 0 && (
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex gap-1 flex-1">
                    {[1, 2, 3].map((level) => (
                      <div
                        key={level}
                        className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${passwordStrength >= level ? strengthColor[passwordStrength] : "bg-slate-100"
                          }`}
                      />
                    ))}
                  </div>
                  <span className={`text-xs font-medium ${passwordStrength === 1 ? "text-red-500" : passwordStrength === 2 ? "text-amber-500" : "text-emerald-500"
                    }`}>
                    {strengthLabel[passwordStrength]}
                  </span>
                </div>
              )}
            </div>

            <Input
              label="Confirm password"
              type="password"
              placeholder="Repeat your password"
              value={confirmPassword}
              onChange={(e) => { setConfirmPw(e.target.value); setConfirmTouched(true); }}
              onBlur={() => setConfirmTouched(true)}
              error={errors.confirmPassword}
              autoComplete="new-password"
            />

            <Button
              type="submit"
              fullWidth
              size="lg"
              isLoading={submitting}
              disabled={!isFormValid || submitting}
              className="mt-2"
            >
              Create Account
            </Button>
          </form>

          <p className="mt-4 text-center text-xs text-slate-400">
            By signing up you agree to our{" "}
            <a href="#" className="underline hover:text-slate-600">Terms</a> &amp;{" "}
            <a href="#" className="underline hover:text-slate-600">Privacy Policy</a>.
          </p>

          <div className="mt-5 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-violet-600 hover:text-violet-700 hover:underline">
              Sign in
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
