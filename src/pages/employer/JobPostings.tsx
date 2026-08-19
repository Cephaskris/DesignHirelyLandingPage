import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardShell from "@/components/ui/DashboardShell";
import { useAppData } from "@/context/AppDataContext";
import { useAuth } from "@/context/AuthContext";

type PostingStatus = "OPEN" | "MATCHING" | "FILLED" | "CLOSED";

interface JobPosting {
  id: string;
  role: string;
  salary: string;
  location: string;
  workType: "On-site" | "Remote" | "Hybrid";
  positions: number;
  description: string;
  requirements: string;
  status: PostingStatus;
  createdAt: string;
  matchedCount: number;
}

const INITIAL_POSTINGS: JobPosting[] = [
  {
    id: "JOB-001", role: "Customer Service Representative", salary: "₦70,000 – ₦90,000",
    location: "Victoria Island, Lagos", workType: "On-site", positions: 3,
    description: "Handle walk-in and phone enquiries for our Lagos branch. Must be fluent in English and Yoruba.",
    requirements: "Minimum OND · 1 year experience · Friendly demeanour",
    status: "MATCHING", createdAt: "Aug 16", matchedCount: 2,
  },
  {
    id: "JOB-002", role: "Driver / Logistics Officer", salary: "₦60,000 – ₦75,000",
    location: "Ikeja, Lagos", workType: "On-site", positions: 5,
    description: "Timely delivery of parcels across metropolitan Lagos.",
    requirements: "Valid Class B licence · 2+ years driving · Smart phone literate",
    status: "OPEN", createdAt: "Aug 18", matchedCount: 0,
  },
];

const STATUS_STYLES: Record<PostingStatus, string> = {
  OPEN: "bg-amber-50 text-amber-700 border-amber-200",
  MATCHING: "bg-blue-50 text-blue-700 border-blue-200",
  FILLED: "bg-green-50 text-green-700 border-green-200",
  CLOSED: "bg-[#f3f3f3] text-[#9ca3af] border-[rgba(0,0,0,0.1)]",
};
const STATUS_LABELS: Record<PostingStatus, string> = {
  OPEN: "Open — Awaiting Match",
  MATCHING: "Hirely Matching…",
  FILLED: "Filled ✓",
  CLOSED: "Closed",
};

const WORK_TYPES = ["On-site", "Remote", "Hybrid"] as const;

const BLANK_FORM = {
  role: "", salary: "", location: "", workType: "On-site" as const,
  positions: 1, description: "", requirements: "",
};

const BLANK_REQUEST = { role: "", count: 1, location: "", salary: "", notes: "" };

export default function JobPostings() {
  const { roles, addTalentRequest, talentRequests } = useAppData();
  const { user, spendCredit } = useAuth();
  const [postings, setPostings] = useState<JobPosting[]>(INITIAL_POSTINGS);
  const [selected, setSelected] = useState<string | null>("JOB-001");
  const [creating, setCreating] = useState(false);
  const [requesting, setRequesting] = useState(false);
  const [form, setForm] = useState(BLANK_FORM);
  const [reqForm, setReqForm] = useState(BLANK_REQUEST);
  const [filterStatus, setFilterStatus] = useState<"ALL" | PostingStatus>("ALL");
  const [submitted, setSubmitted] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [noCredits, setNoCredits] = useState(false);

  const myRequests = talentRequests.filter(r => r.employerId === (user?.id ?? "er-001"));

  const filtered = postings.filter(p => filterStatus === "ALL" || p.status === filterStatus);
  const active = postings.find(p => p.id === selected) ?? null;

  const field = (key: keyof typeof form, val: string | number) =>
    setForm(prev => ({ ...prev, [key]: val }));

  const submitPosting = () => {
    if (!form.role || !form.location || !form.description) return;
    const newPosting: JobPosting = {
      id: `JOB-00${postings.length + 1}`,
      ...form,
      salary: form.salary || "Negotiable",
      status: "OPEN",
      createdAt: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
      matchedCount: 0,
    };
    setPostings(prev => [newPosting, ...prev]);
    setCreating(false);
    setSubmitted(true);
    setSelected(newPosting.id);
    setForm(BLANK_FORM);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const closePosting = (id: string) =>
    setPostings(prev => prev.map(p => p.id === id ? { ...p, status: "CLOSED" } : p));

  const submitRequest = () => {
    if (!reqForm.role || !reqForm.location) return;
    const spent = spendCredit();
    if (!spent) { setNoCredits(true); return; }
    setNoCredits(false);
    addTalentRequest({
      id: `REQ-${Date.now()}`,
      employerId: user?.id ?? "er-001",
      company: user?.companyName ?? user?.fullName ?? "Your Company",
      role: reqForm.role,
      count: reqForm.count,
      location: reqForm.location,
      salary: reqForm.salary || "Negotiable",
      notes: reqForm.notes,
      status: "OPEN",
      submittedAt: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
      creditSpent: 1,
    });
    setRequesting(false);
    setRequestSent(true);
    setReqForm(BLANK_REQUEST);
    setTimeout(() => setRequestSent(false), 4000);
  };

  const reqField = (key: keyof typeof reqForm, val: string | number) =>
    setReqForm(prev => ({ ...prev, [key]: val }));

  const counts = {
    open: postings.filter(p => p.status === "OPEN").length,
    matching: postings.filter(p => p.status === "MATCHING").length,
    filled: postings.filter(p => p.status === "FILLED").length,
  };

  return (
    <DashboardShell>
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-[#29235c] text-2xl">Job Postings</h1>
            <p className="text-[#6b7280] text-sm mt-0.5">Post vacancies and let Hirely match the right candidates to you</p>
          </div>
          {!creating && (
            <button onClick={() => { setCreating(true); setSelected(null); }}
              className="bg-[#009fe3] text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-[#0090cc] transition-colors cursor-pointer whitespace-nowrap">
              + Post Vacancy
            </button>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Open", value: counts.open, color: "#f59e0b" },
            { label: "Being Matched", value: counts.matching, color: "#009fe3" },
            { label: "Filled", value: counts.filled, color: "#16a34a" },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] px-5 py-4">
              <p className="text-[#9ca3af] text-xs font-semibold uppercase tracking-wide">{s.label}</p>
              <p className="font-['Raleway:Bold',sans-serif] font-bold text-2xl mt-1" style={{ color: s.color }}>{s.value}</p>
            </div>
          ))}
        </div>

        {submitted && (
          <div className="bg-green-50 border border-green-200 rounded-2xl px-5 py-4 flex items-center gap-3">
            <span className="text-xl">✅</span>
            <p className="text-green-700 font-bold text-sm">Vacancy posted! Hirely will begin matching candidates and notify you when results are ready.</p>
          </div>
        )}

        {requestSent && (
          <div className="bg-green-50 border border-green-200 rounded-2xl px-5 py-4 flex items-center gap-3">
            <span className="text-xl">🤝</span>
            <p className="text-green-700 font-bold text-sm">Concierge request submitted! Our team will hand-pick candidates and push them to your dashboard within 24–48 hours.</p>
          </div>
        )}

        {noCredits && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 flex items-center justify-between gap-4">
            <p className="text-amber-800 text-sm font-semibold">⚠️ No credits remaining. Top up your wallet to request concierge matching.</p>
            <Link to="/employer/wallet" className="bg-amber-500 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-amber-600 transition-colors whitespace-nowrap">Top Up →</Link>
          </div>
        )}

        {/* Concierge request panel */}
        <div className="bg-white rounded-2xl border-2 border-[#29235c]/10 overflow-hidden">
          <div className="flex items-center justify-between gap-4 px-6 py-4 bg-gradient-to-r from-[#29235c] to-[#1e1656]">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🤝</span>
              <div>
                <p className="font-bold text-white text-sm">Request Concierge Matching</p>
                <p className="text-white/70 text-xs">Let our team hand-pick verified candidates — costs 1 credit per request</p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
                <span className="text-[#009fe3] text-xs font-bold">{user?.creditBalance ?? 0}</span>
                <span className="text-white/70 text-xs">credits</span>
              </div>
              {!requesting && (
                <button onClick={() => { setRequesting(true); setCreating(false); setSelected(null); }}
                  className="bg-[#009fe3] text-white font-bold text-xs px-4 py-2 rounded-xl hover:bg-[#0090cc] transition-colors cursor-pointer whitespace-nowrap">
                  + New Request
                </button>
              )}
            </div>
          </div>

          {requesting && (
            <div className="p-6 border-t border-[rgba(0,0,0,0.06)] bg-[#f8f8fb] flex flex-col gap-4">
              <p className="font-bold text-[#29235c] text-sm">What talent are you looking for?</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#29235c] mb-1.5 block">Role Needed <span className="text-red-500">*</span></label>
                  <select value={reqForm.role} onChange={e => reqField("role", e.target.value)}
                    className="w-full border border-[rgba(0,0,0,0.12)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#009fe3] bg-white">
                    <option value="">Select a role…</option>
                    {roles.map(r => <option key={r.id}>{r.title}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#29235c] mb-1.5 block">Number of Candidates</label>
                  <input type="number" min={1} max={20} value={reqForm.count}
                    onChange={e => reqField("count", Number(e.target.value))}
                    className="w-full border border-[rgba(0,0,0,0.12)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#009fe3]" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#29235c] mb-1.5 block">Location <span className="text-red-500">*</span></label>
                  <input value={reqForm.location} onChange={e => reqField("location", e.target.value)}
                    className="w-full border border-[rgba(0,0,0,0.12)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#009fe3]"
                    placeholder="e.g. Victoria Island, Lagos" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#29235c] mb-1.5 block">Salary Range (₦/month)</label>
                  <input value={reqForm.salary} onChange={e => reqField("salary", e.target.value)}
                    className="w-full border border-[rgba(0,0,0,0.12)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#009fe3]"
                    placeholder="e.g. ₦70,000 – ₦90,000" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-[#29235c] mb-1.5 block">Special Requirements or Notes</label>
                <textarea value={reqForm.notes} onChange={e => reqField("notes", e.target.value)} rows={2}
                  className="w-full border border-[rgba(0,0,0,0.12)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#009fe3] resize-none"
                  placeholder="e.g. Must speak Yoruba, experience with POS systems, available immediately…" />
              </div>
              <div className="bg-[#f0f9ff] border border-[#bae6fd] rounded-xl px-4 py-3 text-xs text-[#0369a1] font-semibold">
                💳 This request will deduct 1 credit from your wallet (current balance: {user?.creditBalance ?? 0} credits).
              </div>
              <div className="flex gap-3">
                <button onClick={() => { setRequesting(false); setReqForm(BLANK_REQUEST); setNoCredits(false); }}
                  className="border border-[rgba(0,0,0,0.1)] text-[#6b7280] font-bold text-sm px-5 py-3 rounded-xl hover:border-[#29235c] transition-colors cursor-pointer">
                  Cancel
                </button>
                <button onClick={submitRequest} disabled={!reqForm.role || !reqForm.location}
                  className="flex-1 bg-[#29235c] text-white font-bold py-3 rounded-xl hover:bg-[#1e1656] transition-colors cursor-pointer disabled:opacity-40 flex items-center justify-center gap-2">
                  Submit Request (1 credit) →
                </button>
              </div>
            </div>
          )}

          {/* My past requests */}
          {myRequests.length > 0 && !requesting && (
            <div className="divide-y divide-[rgba(0,0,0,0.04)]">
              {myRequests.slice(0, 3).map(r => (
                <div key={r.id} className="flex items-center justify-between gap-4 px-6 py-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[#29235c] text-sm truncate">{r.role} × {r.count}</p>
                    <p className="text-[#9ca3af] text-xs">{r.location} · Submitted {r.submittedAt}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border shrink-0 ${
                    r.status === "OPEN" ? "bg-amber-50 text-amber-700 border-amber-200" :
                    r.status === "IN_PROGRESS" ? "bg-blue-50 text-blue-700 border-blue-200" :
                    r.status === "PUSHED" ? "bg-green-50 text-green-700 border-green-200" :
                    "bg-[#f3f3f3] text-[#9ca3af] border-[rgba(0,0,0,0.1)]"
                  }`}>{r.status.replace("_", " ")}</span>
                </div>
              ))}
            </div>
          )}

          {myRequests.length === 0 && !requesting && (
            <div className="px-6 py-4 text-[#9ca3af] text-xs">No concierge requests yet. Submit one above to get hand-picked candidates.</div>
          )}
        </div>

        {/* Concierge info banner */}
        <div className="bg-gradient-to-r from-[#29235c] to-[#009fe3] rounded-2xl p-5 flex items-center gap-4">
          <span className="text-3xl shrink-0">🤝</span>
          <div>
            <p className="font-bold text-white text-sm">How Hirely Matching Works</p>
            <p className="text-white/80 text-xs mt-0.5">Post your vacancy → Our Matching Concierge curates the best-fit candidates from the verified pool → Shortlisted profiles appear on your dashboard within 24–48 hours.</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-5">
          {/* Posting list */}
          <div className="lg:w-72 shrink-0 flex flex-col gap-3">
            {/* Filter */}
            <div className="flex flex-wrap gap-1.5">
              {(["ALL", "OPEN", "MATCHING", "FILLED", "CLOSED"] as const).map(s => (
                <button key={s} onClick={() => setFilterStatus(s)}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold border transition-colors cursor-pointer ${filterStatus === s ? "bg-[#29235c] text-white border-[#29235c]" : "border-[rgba(0,0,0,0.12)] text-[#6b7280] hover:border-[#29235c]"}`}>
                  {s === "ALL" ? "All" : STATUS_LABELS[s].split(" ")[0]}
                </button>
              ))}
            </div>

            {filtered.length === 0 && !creating && (
              <p className="text-[#9ca3af] text-sm italic px-1">No postings match the filter.</p>
            )}
            {filtered.map(p => (
              <div key={p.id} onClick={() => { setSelected(p.id); setCreating(false); }}
                className={`bg-white rounded-2xl border-2 p-4 cursor-pointer transition-all ${selected === p.id && !creating ? "border-[#009fe3] bg-[#f0f9ff]" : "border-[rgba(0,0,0,0.06)] hover:border-[#009fe3]/40"}`}>
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-[#29235c] text-sm leading-snug">{p.role}</p>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 whitespace-nowrap ${STATUS_STYLES[p.status]}`}>
                    {p.status}
                  </span>
                </div>
                <p className="text-[#6b7280] text-xs mt-1">{p.location} · {p.positions} position{p.positions > 1 ? "s" : ""}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[#9ca3af] text-[10px]">{p.createdAt}</span>
                  {p.matchedCount > 0 && (
                    <span className="bg-[#009fe3]/10 text-[#009fe3] text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {p.matchedCount} matched
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Detail / Create panel */}
          <div className="flex-1">
            {/* Create form */}
            {creating && (
              <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] p-6 flex flex-col gap-5">
                <p className="font-['Raleway:Bold',sans-serif] font-bold text-[#29235c] text-lg">Post a New Vacancy</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#29235c] mb-1.5 block">Job Role <span className="text-red-500">*</span></label>
                    <select value={form.role} onChange={e => field("role", e.target.value)}
                      className="w-full border border-[rgba(0,0,0,0.12)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#009fe3] bg-white">
                      <option value="">Select a role…</option>
                      {roles.map(r => <option key={r.id}>{r.title}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#29235c] mb-1.5 block">Number of Positions</label>
                    <input type="number" min={1} value={form.positions}
                      onChange={e => field("positions", Number(e.target.value))}
                      className="w-full border border-[rgba(0,0,0,0.12)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#009fe3]" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#29235c] mb-1.5 block">Salary Range (₦/month)</label>
                    <input value={form.salary} onChange={e => field("salary", e.target.value)}
                      className="w-full border border-[rgba(0,0,0,0.12)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#009fe3]"
                      placeholder="e.g. ₦70,000 – ₦90,000" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#29235c] mb-1.5 block">Location <span className="text-red-500">*</span></label>
                    <input value={form.location} onChange={e => field("location", e.target.value)}
                      className="w-full border border-[rgba(0,0,0,0.12)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#009fe3]"
                      placeholder="e.g. Victoria Island, Lagos" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#29235c] mb-2 block">Work Type</label>
                  <div className="flex gap-2">
                    {WORK_TYPES.map(t => (
                      <button key={t} type="button" onClick={() => field("workType", t)}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-bold border-2 transition-colors cursor-pointer ${form.workType === t ? "bg-[#29235c] text-white border-[#29235c]" : "border-[rgba(0,0,0,0.1)] text-[#6b7280] hover:border-[#29235c]"}`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#29235c] mb-1.5 block">Job Description <span className="text-red-500">*</span></label>
                  <textarea value={form.description} onChange={e => field("description", e.target.value)} rows={3}
                    className="w-full border border-[rgba(0,0,0,0.12)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#009fe3] resize-none"
                    placeholder="Describe the day-to-day duties of this role…" />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#29235c] mb-1.5 block">Requirements & Qualifications</label>
                  <textarea value={form.requirements} onChange={e => field("requirements", e.target.value)} rows={2}
                    className="w-full border border-[rgba(0,0,0,0.12)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#009fe3] resize-none"
                    placeholder="e.g. Minimum OND · 2 years experience · Valid driver's license" />
                </div>

                <div className="bg-[#f0f9ff] border border-[#bae6fd] rounded-xl px-4 py-3 text-xs text-[#0369a1]">
                  🤝 Once posted, Hirely's Matching Concierge will shortlist verified candidates from the pool and push the best matches directly to your dashboard.
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setCreating(false)}
                    className="border border-[rgba(0,0,0,0.1)] text-[#6b7280] font-bold text-sm px-5 py-3 rounded-xl hover:border-[#29235c] transition-colors cursor-pointer">
                    Cancel
                  </button>
                  <button onClick={submitPosting} disabled={!form.role || !form.location || !form.description}
                    className="flex-1 bg-[#29235c] text-white font-bold py-3 rounded-xl hover:bg-[#1e1656] transition-colors cursor-pointer disabled:opacity-40">
                    Post Vacancy →
                  </button>
                </div>
              </div>
            )}

            {/* Posting detail */}
            {active && !creating && (
              <div className="flex flex-col gap-4">
                <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] p-6">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <h2 className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-[#29235c] text-xl">{active.role}</h2>
                      <p className="text-[#6b7280] text-sm mt-0.5">{active.location} · {active.workType} · {active.positions} position{active.positions > 1 ? "s" : ""}</p>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${STATUS_STYLES[active.status]}`}>
                      {STATUS_LABELS[active.status]}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                    {[
                      { label: "Salary", value: active.salary },
                      { label: "Posted", value: active.createdAt },
                      { label: "Candidates Matched", value: String(active.matchedCount) },
                    ].map(d => (
                      <div key={d.label} className="bg-[#f8f8fb] rounded-xl p-3">
                        <p className="text-[#9ca3af] text-[10px] font-semibold uppercase tracking-wide">{d.label}</p>
                        <p className="font-semibold text-[#29235c] text-sm mt-0.5">{d.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] p-5 flex flex-col gap-3">
                  <p className="font-bold text-[#29235c] text-sm">Job Description</p>
                  <p className="text-[#374151] text-sm leading-relaxed">{active.description}</p>
                  {active.requirements && (
                    <>
                      <p className="font-bold text-[#29235c] text-sm mt-1">Requirements</p>
                      <p className="text-[#374151] text-sm leading-relaxed">{active.requirements}</p>
                    </>
                  )}
                </div>

                {active.status === "MATCHING" && (
                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full border-2 border-blue-400 border-t-transparent animate-spin shrink-0" />
                    <div>
                      <p className="font-bold text-blue-800 text-sm">Hirely Concierge is matching candidates</p>
                      <p className="text-blue-700 text-xs mt-0.5">
                        {active.matchedCount > 0
                          ? `${active.matchedCount} candidate${active.matchedCount > 1 ? "s have" : " has"} been shortlisted and will appear on your dashboard.`
                          : "Our team is reviewing verified candidates for this role. Expect results within 24–48 hours."}
                      </p>
                    </div>
                  </div>
                )}

                {active.status === "OPEN" && (
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-amber-800 text-sm">
                    ⏳ This vacancy has been received. Our Matching Concierge will begin reviewing candidates within a few hours.
                  </div>
                )}

                {active.status !== "CLOSED" && active.status !== "FILLED" && (
                  <button onClick={() => closePosting(active.id)}
                    className="border-2 border-red-200 text-red-600 font-bold text-sm py-2.5 rounded-xl hover:bg-red-50 transition-colors cursor-pointer">
                    Close Vacancy
                  </button>
                )}
              </div>
            )}

            {!active && !creating && (
              <div className="flex-1 flex items-center justify-center text-[#9ca3af] text-sm py-20">
                Select a posting to view details
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
