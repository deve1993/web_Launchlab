const API_BASE = "https://agentlead.fl1.it";

export interface Lead {
  id: string;
  session_id: string;
  skill_id: string;
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  budget: string | null;
  use_case: string | null;
  timeline: string | null;
  is_decision_maker: boolean | null;
  qualified_at: string;
  created_at: string;
}

export interface Stats {
  totalLeads: number;
  totalSessions: number;
  leadsLast30Days: number;
  qualificationRate: number;
}

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

async function apiFetch<T>(path: string, token: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "x-api-token": token },
  });
  if (!res.ok) {
    throw new ApiError(res.status, `API error: ${res.status}`);
  }
  return res.json();
}

export async function fetchLeads(slug: string, token: string): Promise<Lead[]> {
  const data = await apiFetch<{ leads: Lead[] }>(`/api/skills/${slug}/leads`, token);
  return data.leads;
}

export async function fetchStats(slug: string, token: string): Promise<Stats> {
  return apiFetch<Stats>(`/api/skills/${slug}/stats`, token);
}

export async function exportLeads(slug: string, token: string): Promise<void> {
  const res = await fetch(`${API_BASE}/api/skills/${slug}/leads/export`, {
    headers: { "x-api-token": token },
  });
  if (!res.ok) {
    throw new ApiError(res.status, `Export error: ${res.status}`);
  }
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `leads-${slug}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
