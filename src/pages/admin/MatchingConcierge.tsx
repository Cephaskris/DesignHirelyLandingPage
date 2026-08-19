import { useState } from "react";
import DashboardShell from "@/components/ui/DashboardShell";
import { useAppData } from "@/context/AppDataContext";

const CANDIDATES = [
  { id: 1, name: "Amara Okonkwo", role: "Customer Service Representative", location: "Lagos", score: 94 },
  { id: 2, name: "Ngozi Obi", role: "Customer Service Representative", location: "Lagos", score: 88 },
  { id: 3, name: "Emeka Eze", role: "Driver / Logistics Officer", location: "Lagos", score: 97 },
  { id: 4, name: "Musa Ibrahim", role: "Driver / Logistics Officer", location: "Abuja", score: 81 },
  { id: 5, name: "David Adeleke", role: "IT Support Technician", location: "Remote", score: 91 },
  { id: 6, name: "Fatima Bello", role: "Admin / Receptionist", location: "Lagos", score: 85 },
];

const STATUS_STYLES: Record<string, string> = {
  OPEN: "bg-amber-50 text-amber-700 border-amber-200",
  IN_PROGRESS: "bg-blue-50 text-blue-700 border-blue-200",
  PUSHED: "bg-green-50 text-green-700 border-green-200",
  CLOSED: "bg-[#f3f3f3] text-[#9ca3af] border-[rgba(0,0,0,0.1)]",
};

export default function MatchingConcierge() {
  const { pushCandidate, pushedCandidates, talentRequests, updateRequestStatus } = useAppData();
  const [selectedReq, setSelectedReq] = useState<string | null>(talentRequests[0]?.id ?? null);
  const [filterStatus, setFilterStatus] = useState<"ALL" | "OPEN" | "IN_PROGRESS" | "PUSHED" | "CLOSED">("ALL");

  const filtered = talentRequests.filter(r => filterStatus === "ALL" || r.status === filterStatus);
  const req = talentRequests.find(r => r.id === selectedReq);

  const matchedCandidates = CANDIDATES.filter(c =>
    req && c.role.toLowerCase().includes(req.role.toLowerCase().split(" ")[0])
  );

  const isPushed = (candidateId: number, employerId: string) =>
    pushedCandidates.some(c => c.id === candidateId && c.targetEmployerId === employerId);

  const handlePush = (candidate: typeof CANDIDATES[0]) => {
    if (!req) return;
    pushCandidate({
      id: candidate.id,
      name: candidate.name,
      role: candidate.role,
      location: candidate.location,
      score: candidate.score,
      targetEmployerId: req.employerId,
      pushedAt: new Date().toISOString(),
    });
    if (req.status === "OPEN") updateRequestStatus(req.id, "IN_PROGRESS");
  };

  const counts = {
    open: talentRequests.filter(r => r.status === "OPEN").length,
    inProgress: talentRequests.filter(r => r.status === "IN_PROGRESS").length,
    pushed: talentRequests.filter(r => r.status === "PUSHED").length,
  };

  return (
    <DashboardShell>
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        <div>
          <h1 className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-[#29235c] text-2xl">Matching Concierge</h1>
          <p className="text-[#6b7280] text-sm mt-0.5">Curate and push candidate recommendations to employer dashboards</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Open Requests", value: counts.open, color: "#f59e0b" },
            { label: "In Progress", value: counts.inProgress, color: "#009fe3" },
            { label: "Completed", value: counts.pushed, color: "#16a34a" },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] px-5 py-4">
              <p className="text-[#9ca3af] text-xs font-semibold uppercase tracking-wide">{s.label}</p>
              <p className="font-['Raleway:Bold',sans-serif] font-bold text-2xl mt-1" style={{ color: s.color }}>{s.value}</p>
            </div>
          ))}
        </div>

        {counts.open > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 flex items-center gap-3">
            <span className="text-xl shrink-0">🤝</span>
            <p className="text-amber-800 text-sm font-semibold">
              {counts.open} new employer request{counts.open > 1 ? "s" : ""} waiting. Push matched candidates to fulfil them.
            </p>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-5">
          {/* Request list */}
          <div className="lg:w-72 shrink-0 flex flex-col gap-3">
            <div className="flex flex-wrap gap-1.5">
              {(["ALL", "OPEN", "IN_PROGRESS", "PUSHED"] as const).map(s => (
                <button key={s} onClick={() => setFilterStatus(s)}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold border transition-colors cursor-pointer ${filterStatus === s ? "bg-[#29235c] text-white border-[#29235c]" : "border-[rgba(0,0,0,0.12)] text-[#6b7280] hover:border-[#29235c]"}`}>
                  {s === "ALL" ? "All" : s.replace("_", " ")}
                </button>
              ))}
            </div>

            {filtered.length === 0 && (
              <p className="text-[#9ca3af] text-sm italic px-1">No requests match the filter.</p>
            )}

            {filtered.map(r => (
              <button key={r.id} onClick={() => setSelectedReq(r.id)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all cursor-pointer ${selectedReq === r.id ? "border-[#009fe3] bg-[#f0f9ff]" : "border-[rgba(0,0,0,0.06)] bg-white hover:border-[#009fe3]/40"}`}>
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-[#29235c] text-sm leading-snug">{r.company}</p>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${STATUS_STYLES[r.status]}`}>
                    {r.status.replace("_", " ")}
                  </span>
                </div>
                <p className="text-[#6b7280] text-xs mt-0.5">{r.role} × {r.count}</p>
                <p className="text-[#9ca3af] text-[10px] mt-1">{r.location} · {r.submittedAt}</p>
              </button>
            ))}
          </div>

          {/* Concierge panel */}
          {req ? (
            <div className="flex-1 flex flex-col gap-4">
              {/* Request detail */}
              <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] p-5">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <p className="font-['Raleway:Bold',sans-serif] font-bold text-[#29235c] text-base">{req.company}</p>
                    <p className="text-[#009fe3] text-sm font-semibold mt-0.5">{req.role} × {req.count}</p>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${STATUS_STYLES[req.status]}`}>
                    {req.status.replace("_", " ")}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                  {[
                    { label: "Location", value: req.location },
                    { label: "Salary", value: req.salary },
                    { label: "Submitted", value: req.submittedAt },
                  ].map(d => (
                    <div key={d.label} className="bg-[#f8f8fb] rounded-xl p-3">
                      <p className="text-[#9ca3af] text-[10px] font-semibold uppercase tracking-wide">{d.label}</p>
                      <p className="font-semibold text-[#29235c] text-sm mt-0.5">{d.value}</p>
                    </div>
                  ))}
                </div>

                {req.notes && (
                  <div className="mt-3 bg-[#f8f8fb] rounded-xl p-3">
                    <p className="text-[#9ca3af] text-[10px] font-semibold uppercase tracking-wide mb-1">Employer Notes</p>
                    <p className="text-[#374151] text-sm">{req.notes}</p>
                  </div>
                )}

                {/* Status actions */}
                <div className="flex gap-2 mt-4">
                  {(["OPEN", "IN_PROGRESS", "PUSHED", "CLOSED"] as const).map(s => (
                    <button key={s} onClick={() => updateRequestStatus(req.id, s)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border-2 transition-colors cursor-pointer ${req.status === s ? "bg-[#29235c] text-white border-[#29235c]" : "border-[rgba(0,0,0,0.1)] text-[#6b7280] hover:border-[#29235c]"}`}>
                      {s.replace("_", " ")}
                    </button>
                  ))}
                </div>
              </div>

              {/* Candidate matches */}
              <p className="text-xs font-bold text-[#9ca3af] uppercase tracking-wide px-1">
                Matched Candidates — Push to {req.company}
              </p>

              {matchedCandidates.length === 0 && (
                <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] p-6 text-center text-[#9ca3af] text-sm">
                  No verified candidates found for this role yet.
                </div>
              )}

              <div className="flex flex-col gap-3">
                {matchedCandidates.map(c => {
                  const alreadyPushed = isPushed(c.id, req.employerId);
                  return (
                    <div key={c.id} className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] p-5 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#29235c]/10 flex items-center justify-center font-black text-[#29235c] shrink-0">
                        {c.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-[#29235c] text-sm">{c.name}</p>
                        <p className="text-[#6b7280] text-xs mt-0.5">{c.role} · {c.location}</p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="text-center">
                          <p className="font-black text-[#29235c] text-lg leading-none">{c.score}</p>
                          <p className="text-[#9ca3af] text-[10px]">match</p>
                        </div>
                        {alreadyPushed
                          ? <span className="text-xs font-bold text-green-700 bg-green-50 border border-green-200 px-3 py-1.5 rounded-xl">Pushed ✓</span>
                          : <button onClick={() => handlePush(c)}
                              className="bg-[#009fe3] text-white text-xs font-bold px-3 py-1.5 rounded-xl hover:bg-[#0090cc] transition-colors cursor-pointer">
                              Push →
                            </button>
                        }
                      </div>
                    </div>
                  );
                })}
              </div>

              {pushedCandidates.filter(c => c.targetEmployerId === req.employerId).length > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-xl px-5 py-3 text-green-700 text-xs font-semibold">
                  ✅ {pushedCandidates.filter(c => c.targetEmployerId === req.employerId).length} candidate(s) pushed — visible on {req.company}&apos;s dashboard now
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-[#9ca3af] text-sm py-20">
              Select a request to begin matching
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}
