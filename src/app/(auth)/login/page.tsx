"use client";

import { useState } from "react";
import { loginAction } from "@/actions/auth";
import { GlowButton } from "@/components/shared/glow-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await loginAction(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border border-[#1f1f25] bg-[#111116] p-6">
      <h1 className="mb-2 text-xl font-semibold text-white">Admin Login</h1>
      <p className="mb-6 text-sm text-gray-400">
        Sign in to access the dashboard.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="admin@silverarch.dev"
            className="border-[#1f1f25] bg-[#0b0b0f]"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            placeholder="••••••••"
            className="border-[#1f1f25] bg-[#0b0b0f]"
          />
        </div>

        {error && (
          <p className="rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
            {error}
          </p>
        )}

        <GlowButton type="submit" disabled={loading} className="w-full">
          {loading ? "Signing in..." : "Sign In"}
        </GlowButton>
      </form>
    </div>
  );
}
