import { useState } from "react";
import DashboardShell from "@/components/ui/DashboardShell";
import { useAppData } from "@/context/AppDataContext";

type ReviewStatus = "PENDING" | "APPROVED" | "FLAGGED";

interface VideoAnswer {
  question: string;
  duration: string;
  recordedAt: string;
}

interface CandidateVideo {
  id: string;
  name: string;
  role: string;
  location: string;
  submittedAt: string;
  passActive: boolean;
  reviewStatus: ReviewStatus;
  answers: VideoAnswer[];
  adminNote: string;
  avatar: string;
}

const MOCK_VIDEOS: CandidateVideo[] = [
  {
    id: "V-001", name: "Amara Okonkwo", role: "Customer Service Representative",
    location: "Lagos", submittedAt: "Aug 18, 2026", passActive: true,
    reviewStatus: "APPROVED", avatar: "A",
    adminNote: "Excellent communication. Recommend for employer push.",
    answers: [
      { question: "Tell us about your customer service experience.", duration: "1:42", recordedAt: "Aug 18" },
      { question: "How do you handle a difficult or angry customer?", duration: "2:05", recordedAt: "Aug 18" },
      { question: "Are you comfortable working shifts?", duration: "0:58", recordedAt: "Aug 18" },
    ],
  },
  {
    id: "V-002", name: "Emeka Eze", role: "Driver / Logistics Officer",
    location: "Abuja", submittedAt: "Aug 17, 2026", passActive: true,
    reviewStatus: "APPROVED", avatar: "E",
    adminNote: "",
    answers: [
      { question: "How many years of driving experience do you have?", duration: "1:10", recordedAt: "Aug 17" },
      { question: "Describe a typical delivery route you have managed.", duration: "1:55", recordedAt: "Aug 17" },
      { question: "Do you have a valid driver's license?", duration: "0:45", recordedAt: "Aug 17" },
    ],
  },
  {
    id: "V-003", name: "Fatima Bello", role: "Admin / Receptionist",
    location: "Lagos", submittedAt: "Aug 16, 2026", passActive: false,
    reviewStatus: "PENDING", avatar: "F",
    adminNote: "",
    answers: [
      { question: "Walk us through your administrative skills.", duration: "2:20", recordedAt: "Aug 16" },
      { question: "What software tools are you familiar with?", duration: "1:30", recordedAt: "Aug 16" },
    ],
  },
  {
    id: "V-004", name: "David Adeleke", role: "IT Support Technician",
    location: "Port Harcourt", submittedAt: "Aug 15, 2026", passActive: true,
    reviewStatus: "FLAGGED", avatar: "D",
    adminNote: "Responses inconsistent with CV. Flag for manual review.",
    answers: [
      { question: "What is your experience with network troubleshooting?", duration: "1:00", recordedAt: "Aug 15" },
      { question: "Describe a hardware or software issue you resolved.", duration: "0:50", recordedAt: "Aug 15" },
    ],
  },
  {
    id: "V-005", name: "Ngozi Obi", role: "Cook / Chef",
    location: "Lagos", submittedAt: "Aug 14, 2026", passActive: true,
    reviewStatus: "PENDING", avatar: "N",
    adminNote: "",
    answers: [
      { question: "What cuisines or cooking styles are you trained in?", duration: "2:10", recordedAt: "Aug 14" },
      { question: "How do you maintain hygiene standards in a kitchen?", duration: "1:40", recordedAt: "Aug 14" },
    ],
  },
  {
    id: "V-006", name: "Musa Ibrahim", role: "Security Guard",
    location: "Kano", submittedAt: "Aug 13, 2026", passActive: false,
    reviewStatus: "PENDING", avatar: "M",
    adminNote: "",
    answers: [
      { question: "What security training or certifications do you have?", duration: "1:25", recordedAt: "Aug 13" },
      { question: "Describe a situation where you had to de-escalate a conflict.", duration: "2:30", recordedAt: "Aug 13" },
    ],
  },
];

const STATUS_STYLES: Record<ReviewStatus, string> = {
  PENDING: "bg-amber-50 text-amber-700 border-amber-200",
  APPROVED: "bg-green-50 text-green-700 border-green-200",
  FLAGGED: "bg-red-50 text-red-700 border-red-200",
};

export default function VideoVault() {
  const { roles } = useAppData();
  const roleNames = ["All Roles", ...roles.map(r => r.title)];

  const [videos, setVideos] = useState<CandidateVideo[]>(MOCK_VIDEOS);
  const [selected, setSelected] = useState<string | null>("V-001");
  const [filterRole, setFilterRole] = useState("All Roles");
  const [filterStatus, setFilterStatus] = useState<"ALL" | ReviewStatus>("ALL");
  const [search, setSearch] = useState("");
  const [playingIdx, setPlayingIdx] = useState<number | null>(null);
  const [noteInput, setNoteInput] = useState<Record<string, string>>({});

  const filtered = videos.filter(v => {
    const matchRole = filterRole === "All Roles" || v.role === filterRole;
    const matchStatus = filterStatus === "ALL" || v.reviewStatus === filterStatus;
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) || v.role.toLowerCase().includes(search.toLowerCase());
    return matchRole && matchStatus && matchSearch;
  });

  const active = videos.find(v => v.id === selected) ?? null;

  const setStatus = (id: string, status: ReviewStatus) =>
    setVideos(prev => prev.map(v => v.id === id ? { ...v, reviewStatus: status } : v));

  const saveNote = (id: string) => {
    const note = noteInput[id] ?? "";
    setVideos(prev => prev.map(v => v.id === id ? { ...v, adminNote: note } : v));
  };

  const counts = {
    pending: videos.filter(v => v.reviewStatus === "PENDING").length,
    approved: videos.filter(v => v.reviewStatus === "APPROVED").length,
    flagged: videos.filter(v => v.reviewStatus === "FLAGGED").length,
  };

  return (
    <DashboardShell>
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        <div>
          <h1 className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-[#29235c] text-2xl">Video Vault</h1>
          <p className="text-[#6b7280] text-sm mt-0.5">Review all candidate video interview recordings</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Pending Review", value: counts.pending, color: "#f59e0b" },
            { label: "Approved", value: counts.approved, color: "#16a34a" },
            { label: "Flagged", value: counts.flagged, color: "#dc2626" },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] px-5 py-4">
              <p className="text-[#9ca3af] text-xs font-semibold uppercase tracking-wide">{s.label}</p>
              <p className="font-['Raleway:Bold',sans-serif] font-bold text-2xl mt-1" style={{ color: s.color }}>{s.value}</p>
            </div>
          ))}
        </div>

        {counts.pending > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 flex items-center gap-3">
            <span className="text-xl shrink-0">⏳</span>
            <p className="text-amber-800 text-sm font-semibold">
              {counts.pending} video submission{counts.pending > 1 ? "s" : ""} pending your review. Approved candidates become visible to employers.
            </p>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or role…"
            className="border border-[rgba(0,0,0,0.12)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#009fe3] bg-white w-52" />
          <select value={filterRole} onChange={e => setFilterRole(e.target.value)}
            className="border border-[rgba(0,0,0,0.12)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#009fe3] bg-white">
            {roleNames.map(r => <option key={r}>{r}</option>)}
          </select>
          <div className="flex gap-1.5 flex-wrap">
            {(["ALL", "PENDING", "APPROVED", "FLAGGED"] as const).map(s => (
              <button key={s} onClick={() => setFilterStatus(s)}
                className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${filterStatus === s ? "bg-[#29235c] text-white border-[#29235c]" : "border-[rgba(0,0,0,0.1)] text-[#6b7280] hover:border-[#29235c]"}`}>
                {s === "ALL" ? "All" : s}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-5">
          {/* Candidate list */}
          <div className="lg:w-72 shrink-0 flex flex-col gap-2">
            {filtered.length === 0 && (
              <p className="text-[#9ca3af] text-sm italic px-1">No recordings match the filter.</p>
            )}
            {filtered.map(v => (
              <div key={v.id} onClick={() => { setSelected(v.id); setPlayingIdx(null); }}
                className={`bg-white rounded-2xl border-2 p-4 cursor-pointer transition-all ${selected === v.id ? "border-[#009fe3] bg-[#f0f9ff]" : "border-[rgba(0,0,0,0.06)] hover:border-[#009fe3]/40"}`}>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#29235c]/10 flex items-center justify-center font-black text-[#29235c] text-sm shrink-0">{v.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[#29235c] text-sm truncate">{v.name}</p>
                    <p className="text-[#6b7280] text-xs truncate">{v.role}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${STATUS_STYLES[v.reviewStatus]}`}>
                    {v.reviewStatus}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[#9ca3af] text-[10px]">{v.submittedAt} · {v.answers.length} answers</span>
                  {!v.passActive && <span className="text-[10px] text-[#9ca3af] bg-[#f3f3f3] px-1.5 py-0.5 rounded-full">No pass</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Detail panel */}
          {active ? (
            <div className="flex-1 flex flex-col gap-4">
              {/* Candidate header */}
              <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] p-6">
                <div className="flex items-start gap-4 flex-wrap">
                  <div className="w-12 h-12 rounded-2xl bg-[#29235c]/10 flex items-center justify-center font-black text-[#29235c] text-xl shrink-0">
                    {active.avatar}
                  </div>
                  <div className="flex-1">
                    <h2 className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-[#29235c] text-xl">{active.name}</h2>
                    <p className="text-[#6b7280] text-sm mt-0.5">{active.role} · {active.location}</p>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${STATUS_STYLES[active.reviewStatus]}`}>
                    {active.reviewStatus}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-4">
                  <div className="bg-[#f8f8fb] rounded-xl p-3">
                    <p className="text-[#9ca3af] text-[10px] font-semibold uppercase tracking-wide">Submitted</p>
                    <p className="font-semibold text-[#29235c] text-sm mt-0.5">{active.submittedAt}</p>
                  </div>
                  <div className="bg-[#f8f8fb] rounded-xl p-3">
                    <p className="text-[#9ca3af] text-[10px] font-semibold uppercase tracking-wide">Videos</p>
                    <p className="font-semibold text-[#29235c] text-sm mt-0.5">{active.answers.length} recorded</p>
                  </div>
                  <div className="bg-[#f8f8fb] rounded-xl p-3">
                    <p className="text-[#9ca3af] text-[10px] font-semibold uppercase tracking-wide">Pass</p>
                    <p className={`font-semibold text-sm mt-0.5 ${active.passActive ? "text-green-600" : "text-[#9ca3af]"}`}>
                      {active.passActive ? "Active" : "Expired"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Video answers */}
              <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] p-5 flex flex-col gap-4">
                <p className="font-bold text-[#29235c] text-sm">Video Answers</p>
                {active.answers.map((ans, i) => (
                  <div key={i} className="border border-[rgba(0,0,0,0.06)] rounded-xl overflow-hidden">
                    <div className="px-4 py-3 bg-[#f8f8fb] border-b border-[rgba(0,0,0,0.05)]">
                      <div className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#29235c]/10 flex items-center justify-center text-[10px] font-black text-[#29235c] shrink-0 mt-0.5">{i + 1}</span>
                        <p className="text-sm text-[#29235c] font-semibold leading-snug">{ans.question}</p>
                      </div>
                    </div>

                    {playingIdx === i ? (
                      <div className="bg-[#1a1a2e] aspect-video flex flex-col items-center justify-center gap-3 relative">
                        <button onClick={() => setPlayingIdx(null)}
                          className="absolute top-3 right-3 text-white/60 hover:text-white text-lg cursor-pointer">✕</button>
                        <span className="text-4xl">🎬</span>
                        <p className="text-white/60 text-sm text-center px-6">
                          Candidate's recorded video response would stream here from secure storage.
                        </p>
                        <p className="text-white/40 text-xs">{ans.duration} · Recorded {ans.recordedAt}</p>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between px-4 py-3">
                        <div className="flex items-center gap-3">
                          <button onClick={() => setPlayingIdx(i)}
                            className="w-9 h-9 rounded-full bg-[#29235c] flex items-center justify-center hover:bg-[#009fe3] transition-colors cursor-pointer shrink-0">
                            <svg fill="white" width="12" height="12" viewBox="0 0 24 24"><path d="M5 3l14 9-14 9V3z"/></svg>
                          </button>
                          <span className="text-[#6b7280] text-xs">Play answer · {ans.duration}</span>
                        </div>
                        <span className="text-[#9ca3af] text-[10px]">{ans.recordedAt}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Admin actions */}
              <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] p-5 flex flex-col gap-4">
                <p className="font-bold text-[#29235c] text-sm">Review Decision</p>

                <div className="flex flex-wrap gap-2">
                  <button onClick={() => setStatus(active.id, "APPROVED")}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border-2 transition-colors cursor-pointer ${active.reviewStatus === "APPROVED" ? "bg-green-600 text-white border-green-600" : "border-green-200 text-green-700 hover:bg-green-50"}`}>
                    ✓ Approve
                  </button>
                  <button onClick={() => setStatus(active.id, "FLAGGED")}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border-2 transition-colors cursor-pointer ${active.reviewStatus === "FLAGGED" ? "bg-red-600 text-white border-red-600" : "border-red-200 text-red-600 hover:bg-red-50"}`}>
                    ⚑ Flag for Review
                  </button>
                  <button onClick={() => setStatus(active.id, "PENDING")}
                    className={`px-4 py-2.5 rounded-xl text-sm font-bold border-2 transition-colors cursor-pointer ${active.reviewStatus === "PENDING" ? "bg-[#29235c] text-white border-[#29235c]" : "border-[rgba(0,0,0,0.1)] text-[#6b7280] hover:border-[#29235c]"}`}>
                    Reset to Pending
                  </button>
                </div>

                {active.reviewStatus === "APPROVED" && (
                  <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-xs text-green-700 font-semibold">
                    ✓ This candidate is visible to employers in candidate search and eligible for Matching Concierge pushes.
                  </div>
                )}
                {active.reviewStatus === "FLAGGED" && (
                  <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-xs text-red-700 font-semibold">
                    ⚑ Flagged candidates are hidden from employer search until resolved.
                  </div>
                )}
              </div>

              {/* Admin notes */}
              <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] p-5 flex flex-col gap-3">
                <p className="font-bold text-[#29235c] text-sm">Admin Notes</p>
                {active.adminNote && noteInput[active.id] === undefined && (
                  <div className="bg-[#f8f8fb] rounded-xl px-4 py-3 text-sm text-[#374151] italic">"{active.adminNote}"</div>
                )}
                <textarea
                  value={noteInput[active.id] ?? active.adminNote}
                  onChange={e => setNoteInput(prev => ({ ...prev, [active.id]: e.target.value }))}
                  rows={2} placeholder="Add private notes about this candidate's interview…"
                  className="w-full border border-[rgba(0,0,0,0.1)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#009fe3] resize-none" />
                <button onClick={() => saveNote(active.id)}
                  className="self-start bg-[#29235c] text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#1e1656] transition-colors cursor-pointer">
                  Save Note
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-[#9ca3af] text-sm py-20">
              Select a candidate to review their recordings
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}
