"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { GlowButton } from "@/components/shared/glow-button";
import type { SiteSetting } from "@/types";
import { Save } from "lucide-react";

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [changes, setChanges] = useState<Record<string, string>>({});

  useEffect(() => {
    async function fetchSettings() {
      try {
        const { getSettings } = await import("@/actions/settings");
        const data = await getSettings();
        setSettings(data);
      } catch {
        toast.error("Failed to load settings");
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  function handleChange(key: string, value: string) {
    setChanges((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    const changedKeys = Object.keys(changes);
    if (changedKeys.length === 0) {
      toast.info("No changes to save");
      return;
    }

    setSaving(true);
    try {
      const { updateSetting } = await import("@/actions/settings");
      const results = await Promise.all(
        changedKeys.map((key) => updateSetting(key, changes[key]))
      );

      const errors = results.filter((r) => r.error);
      if (errors.length > 0) {
        toast.error(`Failed to save ${errors.length} setting(s)`);
      } else {
        toast.success(`Saved ${changedKeys.length} setting(s)`);
        setChanges({});
        // Refresh settings from server
        const { getSettings } = await import("@/actions/settings");
        const fresh = await getSettings();
        setSettings(fresh);
      }
    } catch {
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  }

  // Group settings by group_name
  const grouped = settings.reduce<Record<string, SiteSetting[]>>(
    (acc, setting) => {
      const group = setting.group_name || "General";
      if (!acc[group]) acc[group] = [];
      acc[group].push(setting);
      return acc;
    },
    {}
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-sm text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-sm text-gray-400">
            Manage site-wide configuration.
          </p>
        </div>
        <GlowButton
          type="button"
          onClick={handleSave}
          disabled={saving || Object.keys(changes).length === 0}
        >
          <Save className="mr-2 h-4 w-4" />
          {saving
            ? "Saving..."
            : `Save Changes${
                Object.keys(changes).length > 0
                  ? ` (${Object.keys(changes).length})`
                  : ""
              }`}
        </GlowButton>
      </div>

      {Object.keys(grouped).length === 0 ? (
        <div className="rounded-xl border border-[#1f1f25] bg-[#111116] p-8 text-center">
          <p className="text-gray-500">No settings configured yet.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(grouped).map(([groupName, groupSettings]) => (
            <div key={groupName}>
              <h2 className="mb-4 text-lg font-semibold capitalize text-white">
                {groupName.replace(/_/g, " ")}
              </h2>
              <div className="rounded-xl border border-[#1f1f25] bg-[#111116] p-6">
                <div className="space-y-5">
                  {groupSettings.map((setting) => (
                    <div key={setting.key} className="space-y-2">
                      <Label
                        htmlFor={setting.key}
                        className="text-gray-300"
                      >
                        {setting.key
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (c) => c.toUpperCase())}
                      </Label>
                      {setting.type === "textarea" ? (
                        <Textarea
                          id={setting.key}
                          rows={4}
                          defaultValue={setting.value}
                          onChange={(e) =>
                            handleChange(setting.key, e.target.value)
                          }
                          className="border-[#1f1f25] bg-[#0b0b0f]"
                        />
                      ) : (
                        <Input
                          id={setting.key}
                          type={
                            setting.type === "number" ? "number" : "text"
                          }
                          defaultValue={setting.value}
                          onChange={(e) =>
                            handleChange(setting.key, e.target.value)
                          }
                          className="border-[#1f1f25] bg-[#0b0b0f]"
                        />
                      )}
                      <p className="text-xs text-gray-600">
                        Key: {setting.key}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
