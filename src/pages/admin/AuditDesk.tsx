import { useState } from "react";
import DashboardShell from "@/components/ui/DashboardShell";

const DISCLAIMER = "STATEMENT OF NON-ADVISORY ROLE: Hirely Verification Services provides factual data verification only and does not make employment or hiring decisions on behalf of the client.";

const AUDIT_LOGS = [
  { id: "LOG-001", caseId: "CHK-001", operator: "admin@demo.com", action: "REPORT_VIEWED", ip: "41.58.102.xx", time: "Aug 18, 14:32", consent: true },
  { id: "LOG-002", caseId: "CHK-002", operator: "admin@demo.com", action: "STATUS_UPDATED → IN_PROGRESS", ip: "41.58.102.xx", time: "Aug 17, 10:11", consent: true },
  { id: "LOG-003", caseId: "CHK-003", operator: "employer@demo.com", action: "CASE_CREATED", ip: "105.112.44.xx", time: "Aug 18, 09:00", consent: false },
  { id: "LOG-004", caseId: "CHK-001", operator: "admin@demo.com", action: "REPORT_GENERATED", ip: "41.58.102.xx", time: "Aug 16, 17:45", consent: true },
];

const CASES = [
  { id: "CHK-001", name: "Emeka Eze", tier: "TIER_1", status: "VERIFIED", employer: "Lagos Logistics Hub", consentTs: "Aug 15, 08:30" },
  { id: "CHK-002", name: "Fatima Bello", tier: "TIER_2", status: "IN_PROGRESS", employer: "QuickServe Nigeria", consentTs: "Aug 17, 09:55" },
  { id: "CHK-003", name: "David Adeleke", tier: "TIER_1", status: "PENDING_CONSENT", employer: "TechBridge Solutions", consentTs: null },
];

export default function AuditDesk() {
  const [tab, setTab] = useState<"cases" | "logs">("cases");
  const [filter, setFilter] = useState("ALL");

  const filteredCases = CASES.filter(c => filter === "ALL" || c.status === filter);

  return (
    <DashboardShell>
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        <div>
          <h1 className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-[#29235c] text-2xl">Audit & Compliance Desk</h1>
          <p className="text-[#6b7280] text-sm mt-0.5">Review verification cases and NDPA consent logs (Evidence Act § 84)</p>
        </div>

        {/* Disclaimer */}
        <div className="bg-[#29235c]/5 border border-[#29235c]/20 rounded-xl p-4">
          <p className="text-[#29235c] text-xs leading-relaxed"><span className="font-bold">⚖️ Legal Notice: </span>{DISCLAIMER}</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[rgba(0,0,0,0.08)] gap-1">
          {(["cases", "logs"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-5 py-2.5 text-sm font-bold capitalize transition-colors cursor-pointer border-b-2 -mb-px ${tab === t ? "border-[#009fe3] text-[#009fe3]" : "border-transparent text-[#9ca3af] hover:text-[#29235c]"}`}>
              {t === "cases" ? "Verification Cases" : "Tamper-Evident Logs"}
            </button>
          ))}
        </div>

        {tab === "cases" && (
          <div className="flex flex-col gap-4">
            {/* Filter */}
            <div className="flex gap-2 flex-wrap">
              {["ALL", "PENDING_CONSENT", "IN_PROGRESS", "VERIFIED", "FLAGGED"].map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors cursor-pointer ${filter === f ? "bg-[#29235c] text-white border-[#29235c]" : "border-[rgba(0,0,0,0.12)] text-[#6b7280] hover:border-[#29235c]"}`}>
                  {f.replace("_", " ")}
                </button>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] overflow-hidden">
              <div className="divide-y divide-[rgba(0,0,0,0.04)]">
                {filteredCases.map(c => (
                  <div key={c.id} className="px-6 py-4 flex items-center gap-4 flex-wrap">
                    <div className="flex-1 min-w-[180px]">
                      <p className="font-semibold text-[#29235c] text-sm">{c.name}</p>
                      <p className="text-[#6b7280] text-xs mt-0.5">{c.id} · {c.employer} · {c.tier.replace("_", " ")}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[#9ca3af] text-[10px] font-semibold uppercase">NDPA Consent</p>
                      {c.consentTs
                        ? <p className="text-green-700 text-xs font-bold mt-0.5">✓ {c.consentTs}</p>
                        : <p className="text-red-500 text-xs font-bold mt-0.5">⚠ Missing</p>
                      }
                    </div>
                    <CaseStatusBadge status={c.status} />
                    <div className="flex gap-2">
                      {c.status === "VERIFIED" && <button className="text-xs text-[#009fe3] font-semibold hover:underline cursor-pointer">PDF</button>}
                      {c.status === "PENDING_CONSENT" && <button className="text-xs text-amber-600 font-semibold hover:underline cursor-pointer">Chase</button>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "logs" && (
          <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] overflow-hidden">
            <div className="px-6 py-4 border-b border-[rgba(0,0,0,0.06)] flex items-center justify-between">
              <p className="font-['Raleway:Bold',sans-serif] font-bold text-[#29235c] text-sm">Immutable Audit Trail</p>
              <button className="bg-[#f3f3f3] text-[#29235c] text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-[#e5e7eb] transition-colors cursor-pointer">Export CSV</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#f8f8fb] text-left">
                    {["Log ID", "Case", "Operator", "Action", "IP Address", "Timestamp", "Consent"].map(h => (
                      <th key={h} className="px-4 py-3 text-[#9ca3af] text-xs font-bold uppercase tracking-wide whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(0,0,0,0.04)]">
                  {AUDIT_LOGS.map(log => (
                    <tr key={log.id} className="hover:bg-[#f8f8fb] transition-colors">
                      <td className="px-4 py-3 text-[#29235c] text-xs font-mono">{log.id}</td>
                      <td className="px-4 py-3 text-[#29235c] text-xs font-mono">{log.caseId}</td>
                      <td className="px-4 py-3 text-[#374151] text-xs">{log.operator}</td>
                      <td className="px-4 py-3 text-[#374151] text-xs whitespace-nowrap">{log.action}</td>
                      <td className="px-4 py-3 text-[#374151] text-xs font-mono">{log.ip}</td>
                      <td className="px-4 py-3 text-[#374151] text-xs whitespace-nowrap">{log.time}</td>
                      <td className="px-4 py-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${log.consent ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
                          {log.consent ? "✓ Yes" : "✗ No"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}

function CaseStatusBadge({ status }: { status: string }) {
  const m: Record<string, string> = {
    VERIFIED: "bg-green-50 text-green-700 border-green-200",
    IN_PROGRESS: "bg-blue-50 text-blue-700 border-blue-200",
    PENDING_CONSENT: "bg-amber-50 text-amber-700 border-amber-200",
    FLAGGED: "bg-red-50 text-red-700 border-red-200",
  };
  return <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border whitespace-nowrap ${m[status] ?? ""}`}>{status.replace("_", " ")}</span>;
}
