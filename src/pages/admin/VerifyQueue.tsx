import { useState } from "react";
import DashboardShell from "@/components/ui/DashboardShell";

type CaseStatus = "QUEUED" | "ASSIGNED" | "DOCS_REVIEWED" | "VERIFIED" | "REJECTED" | "FLAGGED";
type Tier = "TIER_2" | "TIER_3";

interface QueueCase {
  id: string;
  candidateName: string;
  employer: string;
  tier: Tier;
  status: CaseStatus;
  submittedAt: string;
  assignedTo: string | null;
  docs: { label: string; status: "PENDING" | "VERIFIED" | "REJECTED" }[];
  notes: string;
}

const MOCK_QUEUE: QueueCase[] = [
  {
    id: "CHK-002", candidateName: "Fatima Bello", employer: "QuickServe Nigeria", tier: "TIER_2",
    status: "ASSIGNED", submittedAt: "Aug 17, 09:55", assignedTo: "Chukwuma O.",
    docs: [
      { label: "Degree Certificate (Bsc Business Admin — UNILAG)", status: "PENDING" },
      { label: "NYSC Certificate — 2019 Batch B", status: "PENDING" },
    ],
    notes: "",
  },
  {
    id: "CHK-006", candidateName: "Yusuf Musa", employer: "TechBridge Solutions", tier: "TIER_2",
    status: "QUEUED", submittedAt: "Aug 18, 11:20", assignedTo: null,
    docs: [
      { label: "Degree Certificate (BEng Computer Engineering — ABU)", status: "PENDING" },
      { label: "Professional License — COREN", status: "PENDING" },
    ],
    notes: "",
  },
  {
    id: "CHK-007", candidateName: "Blessing Okafor", employer: "Lagos Logistics Hub", tier: "TIER_3",
    status: "QUEUED", submittedAt: "Aug 18, 14:03", assignedTo: null,
    docs: [
      { label: "Utility Bill — EKEDC Aug 2026", status: "PENDING" },
      { label: "Guarantor ID — Chukwudi Okafor (Father)", status: "PENDING" },
    ],
    notes: "",
  },
  {
    id: "CHK-004", candidateName: "Taiwo Adeyemi", employer: "NovaTech Solutions Ltd", tier: "TIER_3",
    status: "DOCS_REVIEWED", submittedAt: "Aug 15, 08:00", assignedTo: "Ngozi E.",
    docs: [
      { label: "Utility Bill — IKEDC Jul 2026", status: "VERIFIED" },
      { label: "Guarantor ID — Mr. Adeyemi John", status: "VERIFIED" },
    ],
    notes: "Field agent dispatched. GPS visit scheduled for Aug 20.",
  },
  {
    id: "CHK-005", candidateName: "Emeka Nwosu", employer: "QuickServe Nigeria", tier: "TIER_2",
    status: "REJECTED", submittedAt: "Aug 14, 16:30", assignedTo: "Chukwuma O.",
    docs: [
      { label: "Degree Certificate (suspicious formatting)", status: "REJECTED" },
      { label: "NYSC Certificate", status: "VERIFIED" },
    ],
    notes: "Degree certificate appears forged — font inconsistency on UNILAG seal. Flagged for NDPA audit log.",
  },
];

const AGENTS = ["Chukwuma O.", "Ngozi E.", "Adaeze I.", "Bolarinwa T."];

const STATUS_STYLES: Record<CaseStatus, string> = {
  QUEUED: "bg-amber-50 text-amber-700 border-amber-200",
  ASSIGNED: "bg-blue-50 text-blue-700 border-blue-200",
  DOCS_REVIEWED: "bg-purple-50 text-purple-700 border-purple-200",
  VERIFIED: "bg-green-50 text-green-700 border-green-200",
  REJECTED: "bg-red-50 text-red-700 border-red-200",
  FLAGGED: "bg-rose-50 text-rose-800 border-rose-200",
};

const DOC_STYLES = {
  PENDING: "bg-[#f3f3f3] text-[#6b7280] border-[rgba(0,0,0,0.08)]",
  VERIFIED: "bg-green-50 text-green-700 border-green-200",
  REJECTED: "bg-red-50 text-red-600 border-red-200",
};

export default function VerifyQueue() {
  const [cases, setCases] = useState<QueueCase[]>(MOCK_QUEUE);
  const [selected, setSelected] = useState<string | null>("CHK-002");
  const [tierFilter, setTierFilter] = useState<"ALL" | Tier>("ALL");
  const [statusFilter, setStatusFilter] = useState<"ALL" | CaseStatus>("ALL");

  const filtered = cases.filter(c =>
    (tierFilter === "ALL" || c.tier === tierFilter) &&
    (statusFilter === "ALL" || c.status === statusFilter)
  );

  const activeCase = cases.find(c => c.id === selected) ?? null;

  const update = (id: string, patch: Partial<QueueCase>) =>
    setCases(prev => prev.map(c => c.id === id ? { ...c, ...patch } : c));

  const updateDoc = (caseId: string, docLabel: string, status: "VERIFIED" | "REJECTED") =>
    setCases(prev => prev.map(c => c.id === caseId
      ? { ...c, docs: c.docs.map(d => d.label === docLabel ? { ...d, status } : d) }
      : c
    ));

  const QUEUE_COUNTS = {
    total: cases.length,
    queued: cases.filter(c => c.status === "QUEUED").length,
    active: cases.filter(c => c.status === "ASSIGNED" || c.status === "DOCS_REVIEWED").length,
    done: cases.filter(c => c.status === "VERIFIED" || c.status === "REJECTED").length,
  };

  return (
    <DashboardShell>
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        <div>
          <h1 className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-[#29235c] text-2xl">Verification Queue</h1>
          <p className="text-[#6b7280] text-sm mt-0.5">Process Tier 2 document reviews and Tier 3 field checks · assign agents · approve or reject</p>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Total Cases", value: QUEUE_COUNTS.total, color: "#29235c" },
            { label: "Awaiting Action", value: QUEUE_COUNTS.queued, color: "#f59e0b" },
            { label: "In Progress", value: QUEUE_COUNTS.active, color: "#009fe3" },
            { label: "Completed", value: QUEUE_COUNTS.done, color: "#16a34a" },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] px-5 py-4">
              <p className="text-[#9ca3af] text-xs font-semibold uppercase tracking-wide">{s.label}</p>
              <p className="font-['Raleway:Bold',sans-serif] font-bold text-2xl mt-1" style={{ color: s.color }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {(["ALL", "TIER_2", "TIER_3"] as const).map(t => (
            <button key={t} onClick={() => setTierFilter(t)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors cursor-pointer ${tierFilter === t ? "bg-[#29235c] text-white border-[#29235c]" : "border-[rgba(0,0,0,0.12)] text-[#6b7280] hover:border-[#29235c]"}`}>
              {t === "ALL" ? "All Tiers" : t.replace("_", " ")}
            </button>
          ))}
          <div className="w-px bg-[rgba(0,0,0,0.1)] mx-1" />
          {(["ALL", "QUEUED", "ASSIGNED", "DOCS_REVIEWED", "VERIFIED", "REJECTED"] as const).map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors cursor-pointer ${statusFilter === s ? "bg-[#29235c] text-white border-[#29235c]" : "border-[rgba(0,0,0,0.12)] text-[#6b7280] hover:border-[#29235c]"}`}>
              {s === "ALL" ? "All Statuses" : s.replace("_", " ")}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-5">
          {/* Case list */}
          <div className="lg:w-80 shrink-0 flex flex-col gap-2">
            {filtered.length === 0 && (
              <p className="text-[#9ca3af] text-sm italic px-1">No cases match the selected filters.</p>
            )}
            {filtered.map(c => (
              <div key={c.id} onClick={() => setSelected(c.id)}
                className={`bg-white rounded-2xl border-2 p-4 cursor-pointer transition-all ${selected === c.id ? "border-[#009fe3] bg-[#f0f9ff]" : "border-[rgba(0,0,0,0.06)] hover:border-[#009fe3]/40"}`}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-[#29235c] text-sm">{c.candidateName}</p>
                    <p className="text-[#6b7280] text-xs mt-0.5">{c.id} · {c.employer}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 whitespace-nowrap ${STATUS_STYLES[c.status]}`}>
                    {c.status.replace("_", " ")}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${c.tier === "TIER_2" ? "bg-purple-50 text-purple-700" : "bg-green-50 text-green-700"}`}>
                    {c.tier.replace("_", " ")}
                  </span>
                  <span className="text-[#9ca3af] text-[10px]">{c.submittedAt}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Case detail panel */}
          {activeCase ? (
            <div className="flex-1 flex flex-col gap-4">
              {/* Header */}
              <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] p-5">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <p className="font-['Raleway:Bold',sans-serif] font-bold text-[#29235c] text-lg">{activeCase.candidateName}</p>
                    <p className="text-[#6b7280] text-sm">{activeCase.id} · {activeCase.employer} · Submitted {activeCase.submittedAt}</p>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${STATUS_STYLES[activeCase.status]}`}>
                    {activeCase.status.replace("_", " ")}
                  </span>
                </div>

                {/* Assign agent */}
                <div className="flex items-center gap-3 mt-4 flex-wrap">
                  <label className="text-xs font-semibold text-[#29235c]">Assigned Agent:</label>
                  <select
                    value={activeCase.assignedTo ?? ""}
                    onChange={e => update(activeCase.id, {
                      assignedTo: e.target.value || null,
                      status: e.target.value ? (activeCase.status === "QUEUED" ? "ASSIGNED" : activeCase.status) : activeCase.status,
                    })}
                    className="border border-[rgba(0,0,0,0.12)] rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#009fe3] bg-white">
                    <option value="">Unassigned</option>
                    {AGENTS.map(a => <option key={a}>{a}</option>)}
                  </select>

                  {/* Status update */}
                  <select
                    value={activeCase.status}
                    onChange={e => update(activeCase.id, { status: e.target.value as CaseStatus })}
                    className="border border-[rgba(0,0,0,0.12)] rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#009fe3] bg-white">
                    {(["QUEUED", "ASSIGNED", "DOCS_REVIEWED", "VERIFIED", "REJECTED", "FLAGGED"] as CaseStatus[]).map(s => (
                      <option key={s} value={s}>{s.replace("_", " ")}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Tier-specific context */}
              {activeCase.tier === "TIER_3" && (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-5 flex flex-col gap-2">
                  <p className="font-bold text-green-800 text-sm">📍 Tier 3 — Field Agent Checklist</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-green-800 mt-1">
                    {[
                      "Dispatch field agent to residential address",
                      "Confirm GPS-tagged photo on arrival",
                      "Validate utility bill against address",
                      "Confirm guarantor SMS sign-off received (Termii)",
                    ].map((step, i) => (
                      <label key={step} className="flex items-start gap-2 cursor-pointer">
                        <input type="checkbox" className="mt-0.5 accent-green-600" />
                        <span><span className="font-bold">{i + 1}.</span> {step}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {activeCase.tier === "TIER_2" && (
                <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5 flex flex-col gap-2">
                  <p className="font-bold text-purple-800 text-sm">📋 Tier 2 — Document Review Checklist</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-purple-800 mt-1">
                    {[
                      "Log into WES / institution portal to verify degree",
                      "Cross-reference NYSC certificate serial with NYSC portal",
                      "Check professional license on issuing body website",
                      "Confirm candidate name matches Hirely profile exactly",
                    ].map((step, i) => (
                      <label key={step} className="flex items-start gap-2 cursor-pointer">
                        <input type="checkbox" className="mt-0.5 accent-purple-600" />
                        <span><span className="font-bold">{i + 1}.</span> {step}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Document review */}
              <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] overflow-hidden">
                <div className="px-6 py-4 border-b border-[rgba(0,0,0,0.06)] bg-[#f8f8fb]">
                  <p className="font-['Raleway:Bold',sans-serif] font-bold text-[#29235c] text-sm">Submitted Documents</p>
                </div>
                <div className="divide-y divide-[rgba(0,0,0,0.04)]">
                  {activeCase.docs.map(doc => (
                    <div key={doc.label} className="px-6 py-4 flex items-center gap-4 flex-wrap">
                      <div className="flex-1 min-w-[200px]">
                        <p className="text-[#374151] text-sm">{doc.label}</p>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border mt-1 inline-block ${DOC_STYLES[doc.status]}`}>
                          {doc.status}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateDoc(activeCase.id, doc.label, "VERIFIED")}
                          className={`text-xs font-bold px-3 py-1.5 rounded-xl border-2 transition-colors cursor-pointer ${doc.status === "VERIFIED" ? "bg-green-500 text-white border-green-500" : "border-green-400 text-green-700 hover:bg-green-50"}`}>
                          ✓ Verified
                        </button>
                        <button
                          onClick={() => updateDoc(activeCase.id, doc.label, "REJECTED")}
                          className={`text-xs font-bold px-3 py-1.5 rounded-xl border-2 transition-colors cursor-pointer ${doc.status === "REJECTED" ? "bg-red-500 text-white border-red-500" : "border-red-300 text-red-600 hover:bg-red-50"}`}>
                          ✗ Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] p-5">
                <label className="font-['Raleway:Bold',sans-serif] font-bold text-[#29235c] text-sm block mb-2">
                  Case Notes <span className="text-[#9ca3af] font-normal text-xs">(appended to audit log)</span>
                </label>
                <textarea
                  value={activeCase.notes}
                  onChange={e => update(activeCase.id, { notes: e.target.value })}
                  rows={3}
                  className="w-full border border-[rgba(0,0,0,0.12)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#009fe3] focus:ring-2 focus:ring-[#009fe3]/20 resize-none"
                  placeholder="Add verification notes, rejection reasons, or field agent observations…"
                />
              </div>

              {/* Final actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => update(activeCase.id, { status: "VERIFIED" })}
                  className="flex-1 bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 transition-colors cursor-pointer">
                  ✓ Mark Verified & Notify Employer
                </button>
                <button
                  onClick={() => update(activeCase.id, { status: "REJECTED" })}
                  className="flex-1 bg-red-500 text-white font-bold py-3 rounded-xl hover:bg-red-600 transition-colors cursor-pointer">
                  ✗ Reject & Notify Employer
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-[#9ca3af] text-sm">
              Select a case to review
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}
