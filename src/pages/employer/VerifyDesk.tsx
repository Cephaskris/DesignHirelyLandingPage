import { useState } from "react";
import DashboardShell from "@/components/ui/DashboardShell";

const DISCLAIMER = "STATEMENT OF NON-ADVISORY ROLE: Hirely Verification Services provides factual data verification only and does not make employment or hiring decisions on behalf of the client.";

const TIERS = [
  { id: "TIER_1", label: "Tier 1 — Identity & Civil", price: "₦1,500", sla: "Instant – 24 hrs", checks: ["NIN Validation", "BVN Name Match", "Driver's License", "Passport Verification"] },
  { id: "TIER_2", label: "Tier 2 — Academic & Statutory", price: "₦15,000", sla: "3 – 5 business days", checks: ["Tertiary Institution Audit", "NYSC Certificate Check", "CAC Company Search"] },
  { id: "TIER_3", label: "Tier 3 — Field & Comprehensive", price: "₦25,000", sla: "5 – 7 business days", checks: ["Geotagged Address Visit", "Work History Verification", "Guarantor Check"] },
];

const MOCK_CASES = [
  { id: "CHK-001", name: "Emeka Eze", tier: "TIER_1", status: "VERIFIED", date: "Aug 16" },
  { id: "CHK-002", name: "Fatima Bello", tier: "TIER_2", status: "IN_PROGRESS", date: "Aug 17" },
  { id: "CHK-003", name: "David Adeleke", tier: "TIER_1", status: "PENDING_CONSENT", date: "Aug 18" },
];

type Stage = "list" | "new" | "submitted";

export default function VerifyDesk() {
  const [stage, setStage] = useState<Stage>("list");
  const [selectedTier, setSelectedTier] = useState("TIER_1");
  const [candidateName, setCandidateName] = useState("");
  const [nin, setNin] = useState("");
  const [ndpaConsent, setNdpaConsent] = useState(false);
  const [error, setError] = useState("");

  const submit = () => {
    if (!ndpaConsent) { setError("Candidate NDPA consent is required before initiating any check."); return; }
    if (!candidateName || !nin) { setError("Candidate name and NIN are required."); return; }
    setStage("submitted");
    setError("");
  };

  return (
    <DashboardShell>
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-[#29235c] text-2xl">Hirely Verify Desk</h1>
            <p className="text-[#6b7280] text-sm mt-0.5">Run NDPA-compliant background checks on candidates</p>
          </div>
          {stage === "list" && (
            <button onClick={() => setStage("new")}
              className="bg-[#009fe3] text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-[#0090cc] transition-colors cursor-pointer whitespace-nowrap">
              + New Check
            </button>
          )}
        </div>

        {/* Disclaimer banner */}
        <div className="bg-[#29235c]/5 border border-[#29235c]/20 rounded-xl p-4">
          <p className="text-[#29235c] text-xs leading-relaxed"><span className="font-bold">⚖️ Legal Notice: </span>{DISCLAIMER}</p>
        </div>

        {/* Case list */}
        {stage === "list" && (
          <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] overflow-hidden">
            <div className="px-6 py-4 border-b border-[rgba(0,0,0,0.06)]">
              <p className="font-['Raleway:Bold',sans-serif] font-bold text-[#29235c]">Active Cases</p>
            </div>
            <div className="divide-y divide-[rgba(0,0,0,0.04)]">
              {MOCK_CASES.map(c => (
                <div key={c.id} className="flex items-center justify-between px-6 py-4 gap-4">
                  <div>
                    <p className="font-semibold text-[#29235c] text-sm">{c.name}</p>
                    <p className="text-[#6b7280] text-xs mt-0.5">{c.id} · {c.tier.replace("_", " ")} · {c.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <CaseStatus status={c.status} />
                    {c.status === "VERIFIED" && (
                      <button className="text-xs text-[#009fe3] font-semibold hover:underline cursor-pointer">Download PDF</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* New check form */}
        {stage === "new" && (
          <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] p-6 md:p-8 flex flex-col gap-6">
            <h2 className="font-['Raleway:Bold',sans-serif] font-bold text-[#29235c] text-lg">Request a Background Check</h2>

            {/* Tier picker */}
            <div className="flex flex-col gap-3">
              <p className="text-sm font-semibold text-[#29235c]">Select verification tier</p>
              {TIERS.map(t => (
                <label key={t.id} className={`flex gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${selectedTier === t.id ? "border-[#009fe3] bg-[#f0f9ff]" : "border-[rgba(0,0,0,0.1)]"}`}>
                  <input type="radio" name="tier" value={t.id} checked={selectedTier === t.id} onChange={() => setSelectedTier(t.id)} className="mt-1 accent-[#009fe3] shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-bold text-[#29235c] text-sm">{t.label}</p>
                      <p className="font-['Montserrat:Black',sans-serif] font-black text-[#009fe3] text-sm">{t.price}</p>
                    </div>
                    <p className="text-[#6b7280] text-xs mt-0.5">SLA: {t.sla}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {t.checks.map(ch => <span key={ch} className="bg-[#f3f3f3] text-[#29235c] text-[10px] font-semibold px-2 py-0.5 rounded">{ch}</span>)}
                    </div>
                  </div>
                </label>
              ))}
            </div>

            {/* Candidate details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#29235c] mb-1.5 block">Candidate full name</label>
                <input value={candidateName} onChange={e => setCandidateName(e.target.value)}
                  className="w-full border border-[rgba(0,0,0,0.12)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#009fe3] focus:ring-2 focus:ring-[#009fe3]/20"
                  placeholder="Emeka Eze" />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#29235c] mb-1.5 block">NIN (National Identity Number)</label>
                <input value={nin} onChange={e => setNin(e.target.value)} maxLength={11}
                  className="w-full border border-[rgba(0,0,0,0.12)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#009fe3] focus:ring-2 focus:ring-[#009fe3]/20"
                  placeholder="12345678901" />
              </div>
            </div>

            {/* NDPA consent */}
            <label className="flex gap-3 items-start cursor-pointer bg-amber-50 border border-amber-200 rounded-xl p-4">
              <input type="checkbox" checked={ndpaConsent} onChange={e => setNdpaConsent(e.target.checked)} className="mt-0.5 accent-[#009fe3]" />
              <span className="text-xs text-amber-800 leading-relaxed">
                <span className="font-bold">NDPA 2023 Consent:</span> I confirm the candidate has given explicit written consent for this background verification check, timestamped at {new Date().toLocaleString()}.
              </span>
            </label>

            {error && <p className="text-red-600 text-sm bg-red-50 rounded-xl px-4 py-3">{error}</p>}

            <div className="flex gap-3">
              <button onClick={() => setStage("list")}
                className="border border-[rgba(0,0,0,0.1)] text-[#29235c] font-bold text-sm px-5 py-3 rounded-xl hover:border-[#29235c] transition-colors cursor-pointer">
                Cancel
              </button>
              <button onClick={submit}
                className="flex-1 bg-[#29235c] text-white font-bold py-3 rounded-xl hover:bg-[#1e1656] transition-colors cursor-pointer">
                Submit Check Request
              </button>
            </div>
          </div>
        )}

        {/* Submitted */}
        {stage === "submitted" && (
          <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] p-8 flex flex-col items-center gap-4 text-center">
            <span className="text-5xl">🛡️</span>
            <h2 className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-[#29235c] text-xl">Check Submitted</h2>
            <p className="text-[#6b7280] text-sm max-w-sm">Your verification request for <strong>{candidateName}</strong> has been logged. You will receive a notification when the report is ready.</p>
            <p className="text-[#29235c] text-xs font-semibold bg-[#f3f3f3] rounded-xl px-4 py-2">{DISCLAIMER}</p>
            <button onClick={() => { setStage("list"); setCandidateName(""); setNin(""); setNdpaConsent(false); }}
              className="bg-[#009fe3] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#0090cc] transition-colors cursor-pointer mt-2">
              Back to Cases
            </button>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}

function CaseStatus({ status }: { status: string }) {
  const map: Record<string, string> = {
    VERIFIED: "bg-green-50 text-green-700 border-green-200",
    IN_PROGRESS: "bg-blue-50 text-blue-700 border-blue-200",
    PENDING_CONSENT: "bg-amber-50 text-amber-700 border-amber-200",
    FLAGGED: "bg-red-50 text-red-700 border-red-200",
  };
  const labels: Record<string, string> = {
    VERIFIED: "Verified ✓", IN_PROGRESS: "In Progress", PENDING_CONSENT: "Pending Consent", FLAGGED: "Flagged ⚠",
  };
  return <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${map[status] ?? ""}`}>{labels[status] ?? status}</span>;
}
