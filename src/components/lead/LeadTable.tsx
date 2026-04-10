"use client";

import { useTranslations } from "next-intl";
import type { Lead } from "@/lib/agent-lead";
import { exportLeads } from "@/lib/agent-lead";

interface LeadTableProps {
  leads: Lead[];
  slug: string;
  token: string;
}

export default function LeadTable({ leads, slug, token }: LeadTableProps) {
  const t = useTranslations("lead_dashboard");

  const sorted = [...leads].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  function handleExport() {
    exportLeads(slug, token);
  }

  if (leads.length === 0) {
    return (
      <div className="rounded-xl border border-gray-700/50 bg-gray-800/50 p-12 text-center">
        <p className="text-lg font-medium text-white">{t("table_empty_title")}</p>
        <p className="mt-2 text-sm text-gray-400">{t("table_empty_subtitle")}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">
          {t("stats_total_leads")}: {leads.length}
        </h2>
        <button
          onClick={handleExport}
          className="rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
        >
          {t("export_csv")}
        </button>
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-x-auto rounded-xl border border-gray-700/50 md:block">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-700/50 bg-gray-800/80 text-gray-400">
            <tr>
              <th className="px-6 py-4 font-medium">{t("table_name")}</th>
              <th className="px-6 py-4 font-medium">{t("table_email")}</th>
              <th className="px-6 py-4 font-medium">{t("table_phone")}</th>
              <th className="px-6 py-4 font-medium">{t("table_company")}</th>
              <th className="px-6 py-4 font-medium">{t("table_date")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700/50">
            {sorted.map((lead) => (
              <tr key={lead.id} className="bg-gray-800/30 transition-colors hover:bg-gray-800/60">
                <td className="px-6 py-4 text-white">{lead.name}</td>
                <td className="px-6 py-4 text-gray-300">{lead.email ?? "—"}</td>
                <td className="px-6 py-4 text-gray-300">{lead.phone ?? "—"}</td>
                <td className="px-6 py-4 text-gray-300">{lead.company ?? "—"}</td>
                <td className="px-6 py-4 text-gray-400">
                  {new Date(lead.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="flex flex-col gap-3 md:hidden">
        {sorted.map((lead) => (
          <div
            key={lead.id}
            className="rounded-xl border border-gray-700/50 bg-gray-800/50 p-4"
          >
            <p className="font-medium text-white">{lead.name}</p>
            {lead.email && <p className="mt-1 text-sm text-gray-300">{lead.email}</p>}
            {lead.phone && <p className="text-sm text-gray-300">{lead.phone}</p>}
            {lead.company && <p className="text-sm text-gray-400">{lead.company}</p>}
            <p className="mt-2 text-xs text-gray-500">
              {new Date(lead.created_at).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
