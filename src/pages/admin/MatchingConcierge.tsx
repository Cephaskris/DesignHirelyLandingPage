import { useState } from "react";
import DashboardShell from "@/components/ui/DashboardShell";
import { useAppData } from "@/context/AppDataContext";

const REQUESTS = [
  { id: "REQ-001", employerId: "er-001", company: "NovaTech Solutions Ltd", role: "Customer Service", count: 3, notes: "Must speak Yoruba and English. Lagos only.", status: "OPEN" },
  { id: "REQ-002", employerId: "er-001", company: "Lagos Logistics Hub", role: "Driver / Logistics", count: 5, notes: "Valid Lagos license. Experience with dispatch apps.", status: "IN_PROGRESS" },
  { id: "REQ-003", employerId: "er-001", company: "TechBridge Solutions", role: "IT Support", count: 1, notes: "Networking skills required. Remote-friendly.", status: "PUSHED" },
];

const CANDIDATES = [
  { id: 1, name: "Amara Okonkwo", role: "Customer Service", location: "Lagos", score: 94 },
  { id: 2, name: "Ngozi Obi", role: "Customer Service", location: "Lagos", score: 88 },
  { id: 3, name: "Emeka Eze", role: "Driver / Logistics", location: "Lagos", score: 97 },
  { id: 4, name: "Musa Ibrahim", role: "Driver / Logistics", location: "Abuja", score: 81 },
  { id: 5, name: "David Adeleke", role: "IT Support", location: "Remote", score: 91 },
];

export default function MatchingConcierge() {
  const { pushCandidate, pushedCandidates } = useAppData();
  const [selectedReq, setSelectedReq] = useState<string | null>("REQ-001");

  const req = REQUESTS.find(r => r.id === selectedReq);
  const matchedCandidates = CANDIDATES.filter(c => req && c.role.toLowerCase().includes(req.role.toLowerCase().split(" ")[0]));

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
  };

  return (
    <DashboardShell>
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        <div>
          <h1 className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-[#29235c] text-2xl">Matching Concierge</h1>
          <p className="text-[#6b7280] text-sm mt-0.5">Curate and push candidate recommendations to employer dashboards</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-5">
          {/* Request list */}
          <div className="lg:w-72 shrink-0 flex flex-col gap-2">
            <p className="text-xs font-bold text-[#9ca3af] uppercase tracking-wide px-1">Employer Requests</p>
            {REQUESTS.map(r => (
              <button key={r.id} onClick={() => setSelectedReq(r.id)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all cursor-pointer ${selectedReq === r.id ? "border-[#009fe3] bg-[#f0f9ff]" : "border-[rgba(0,0,0,0.06)] bg-white hover:border-[#009fe3]/40"}`}>
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-[#29235c] text-sm">{r.company}</p>
                  <ReqStatus status={r.status} />
                </div>
                <p className="text-[#6b7280] text-xs mt-0.5">{r.role} · {r.count} needed</p>
              </button>
            ))}
          </div>

          {/* Concierge panel */}
          {req && (
            <div className="flex-1 flex flex-col gap-4">
              <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-bold text-[#29235c] text-base">{req.company}</p>
                    <p className="text-[#009fe3] text-sm font-semibold">{req.role} × {req.count}</p>
                  </div>
                  <ReqStatus status={req.status} />
                </div>
                <p className="text-[#6b7280] text-sm mt-3 bg-[#f8f8fb] rounded-xl p-3">{req.notes}</p>
              </div>

              <p className="text-xs font-bold text-[#9ca3af] uppercase tracking-wide px-1">Matched Candidates — Push to Employer Dashboard</p>
              <div className="flex flex-col gap-3">
                {matchedCandidates.length === 0 && (
                  <p className="text-[#9ca3af] text-sm italic px-1">No candidates matched for this role yet.</p>
                )}
                {matchedCandidates.map(c => {
                  const alreadyPushed = isPushed(c.id, req.employerId);
                  return (
                    <div key={c.id} className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] p-5 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#29235c]/10 flex items-center justify-center font-black text-[#29235c]">{c.name.charAt(0)}</div>
                      <div className="flex-1">
                        <p className="font-semibold text-[#29235c] text-sm">{c.name}</p>
                        <p className="text-[#6b7280] text-xs mt-0.5">{c.role} · {c.location}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-center">
                          <p className="font-black text-[#29235c] text-lg leading-none">{c.score}</p>
                          <p className="text-[#9ca3af] text-[10px]">match</p>
                        </div>
                        {alreadyPushed
                          ? <span className="text-xs font-bold text-green-700 bg-green-50 border border-green-200 px-3 py-1.5 rounded-xl">Pushed ✓</span>
                          : <button onClick={() => handlePush(c)}
                              className="bg-[#009fe3] text-white text-xs font-bold px-3 py-1.5 rounded-xl hover:bg-[#0090cc] transition-colors cursor-pointer">
                              Push to Employer
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
          )}
        </div>
      </div>
    </DashboardShell>
  );
}

function ReqStatus({ status }: { status: string }) {
  const m: Record<string, string> = {
    OPEN: "bg-amber-50 text-amber-700 border-amber-200",
    IN_PROGRESS: "bg-blue-50 text-blue-700 border-blue-200",
    PUSHED: "bg-green-50 text-green-700 border-green-200",
  };
  return <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${m[status] ?? ""}`}>{status.replace("_", " ")}</span>;
}
