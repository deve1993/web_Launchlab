"use client";

import { useTranslations } from "next-intl";
import type { Stats } from "@/lib/agent-lead";

export default function StatsCards({ stats }: { stats: Stats }) {
  const t = useTranslations("lead_dashboard");

  const cards = [
    { label: t("stats_total_leads"), value: stats.totalLeads },
    { label: t("stats_leads_30d"), value: stats.leadsLast30Days },
    { label: t("stats_qualification_rate"), value: `${stats.qualificationRate}%` },
    { label: t("stats_total_sessions"), value: stats.totalSessions },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-xl border border-gray-700/50 bg-gray-800/50 p-6"
        >
          <p className="text-sm text-gray-400">{card.label}</p>
          <p className="mt-2 text-3xl font-semibold text-white">{card.value}</p>
        </div>
      ))}
    </div>
  );
}
