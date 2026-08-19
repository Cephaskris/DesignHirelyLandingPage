import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardShell from "@/components/ui/DashboardShell";
import { useAuth } from "@/context/AuthContext";
import { useAppData } from "@/context/AppDataContext";

const CANDIDATES = [
  { id: 1, name: "Amara Okonkwo", roles: ["Customer Service Representative", "Admin / Receptionist"], location: "Lagos", exp: "3 years", verified: true, videoBlob: null as Blob | null },
  { id: 2, name: "Emeka Eze", roles: ["Driver / Logistics Officer"], location: "Abuja", exp: "5 years", verified: true, videoBlob: null },
  { id: 3, name: "Fatima Bello", roles: ["Admin / Receptionist", "Cashier / Teller"], location: "Lagos", exp: "2 years", verified: false, videoBlob: null },
  { id: 4, name: "David Adeleke", roles: ["IT Support Technician"], location: "Port Harcourt", exp: "4 years", verified: true, videoBlob: null },
  { id: 5, name: "Ngozi Obi", roles: ["Cook / Chef"], location: "Lagos", exp: "6 years", verified: false, videoBlob: null },
  { id: 6, name: "Musa Ibrahim", roles: ["Security Guard", "Driver / Logistics Officer"], location: "Kano", exp: "8 years", verified: true, videoBlob: null },
];

export default function CandidateSearch() {
  const { user, spendCredit } = useAuth();
  const { roles } = useAppData();
  const roleNames = ["All Roles", ...roles.map(r => r.title)];

  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [offerSent, setOfferSent] = useState<number[]>([]);
  const [offerForm, setOfferForm] = useState({ title: "", salary: "", location: "", meeting: "PHYSICAL", desc: "" });
  const [videoModal, setVideoModal] = useState<{ name: string } | null>(null);
  const [noCredits, setNoCredits] = useState(false);

  const filtered = CANDIDATES.filter(c => {
    const matchRole = roleFilter === "All Roles" || c.roles.includes(roleFilter);
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.location.toLowerCase().includes(search.toLowerCase());
    return matchRole && matchSearch;
  });
  const selected = CANDIDATES.find(c => c.id === selectedId);

  const handleWatchVideo = (name: string) => {
    setNoCredits(false);
    setVideoModal({ name });
  };

  const sendOffer = () => {
    if (!selectedId) return;
    const spent = spendCredit();
    if (!spent) { setNoCredits(true); return; }
    setOfferSent(prev => [...prev, selectedId]);
    setSelectedId(null);
    setNoCredits(false);
  };

  return (
    <DashboardShell>
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        <div>
          <h1 className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-[#29235c] text-2xl">Find Candidates</h1>
          <p className="text-[#6b7280] text-sm mt-0.5">Browse pre-screened video profiles and send offers</p>
        </div>

        {noCredits && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center justify-between gap-4">
            <p className="text-amber-800 text-sm font-semibold">⚠️ You have no credits left. Top up your wallet to send offers.</p>
            <Link to="/employer/wallet" className="bg-amber-500 text-white text-xs font-bold px-4 py-2 rounded-xl whitespace-nowrap hover:bg-amber-600 transition-colors">Top Up →</Link>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or location…"
            className="flex-1 border border-[rgba(0,0,0,0.12)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#009fe3] focus:ring-2 focus:ring-[#009fe3]/20 bg-white" />
          <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)}
            className="border border-[rgba(0,0,0,0.12)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#009fe3] bg-white">
            {roleNames.map(r => <option key={r}>{r}</option>)}
          </select>
        </div>

        <div className="flex flex-col lg:flex-row gap-5">
          {/* Candidate grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map(c => (
              <div key={c.id}
                className={`bg-white rounded-2xl border-2 p-5 transition-all cursor-pointer ${selectedId === c.id ? "border-[#009fe3]" : "border-[rgba(0,0,0,0.06)] hover:border-[#009fe3]/40"}`}
                onClick={() => setSelectedId(c.id === selectedId ? null : c.id)}>
                <div className="flex items-start justify-between gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#29235c]/10 flex items-center justify-center font-black text-[#29235c] text-base shrink-0">
                    {c.name.charAt(0)}
                  </div>
                  {c.verified && <span className="bg-green-50 text-green-700 border border-green-200 text-[10px] font-bold px-2 py-0.5 rounded-full">✓ Verified</span>}
                </div>
                <p className="font-['Raleway:Bold',sans-serif] font-bold text-[#29235c] text-sm mt-2">{c.name}</p>
                <p className="text-[#6b7280] text-xs mt-0.5">{c.roles[0]} · {c.location} · {c.exp}</p>

                {/* Video thumbnail */}
                <button
                  onClick={e => { e.stopPropagation(); handleWatchVideo(c.name); }}
                  className="mt-3 bg-[#1a1a2e] rounded-xl h-20 w-full flex items-center justify-center gap-2 hover:bg-[#29235c] transition-colors group">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <svg fill="white" width="12" height="12" viewBox="0 0 24 24"><path d="M5 3l14 9-14 9V3z"/></svg>
                  </div>
                  <span className="text-white/70 text-xs">Watch intro</span>
                </button>

                {offerSent.includes(c.id)
                  ? <div className="mt-3 text-center text-xs text-green-700 font-semibold bg-green-50 py-1.5 rounded-lg">Offer Sent ✓</div>
                  : <button onClick={e => { e.stopPropagation(); setSelectedId(c.id); }}
                      className="mt-3 w-full bg-[#29235c] text-white text-xs font-bold py-2 rounded-xl hover:bg-[#1e1656] transition-colors cursor-pointer">
                      Send Offer
                    </button>
                }
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="col-span-2 text-center py-16 text-[#9ca3af]">No candidates match your search.</div>
            )}
          </div>

          {/* Offer panel */}
          {selected && !offerSent.includes(selected.id) && (
            <div className="lg:w-80 shrink-0 bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] p-6 flex flex-col gap-4 h-fit">
              <div>
                <p className="font-['Raleway:Bold',sans-serif] font-bold text-[#29235c] text-base">Send Offer to {selected.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[#009fe3] text-xs font-bold">{user?.creditBalance ?? 0} credits remaining</span>
                  <span className="text-[#9ca3af] text-xs">· costs 1 credit</span>
                </div>
              </div>
              {[
                { label: "Job Title", key: "title", placeholder: "e.g. Customer Service Rep" },
                { label: "Salary (₦/mo)", key: "salary", placeholder: "e.g. 80000" },
                { label: "Work Location", key: "location", placeholder: "e.g. Victoria Island, Lagos" },
              ].map(f => (
                <div key={f.key}>
                  <label className="text-xs font-semibold text-[#29235c] mb-1 block">{f.label}</label>
                  <input value={offerForm[f.key as keyof typeof offerForm]} placeholder={f.placeholder}
                    onChange={e => setOfferForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                    className="w-full border border-[rgba(0,0,0,0.12)] rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#009fe3] focus:ring-2 focus:ring-[#009fe3]/20" />
                </div>
              ))}
              <div>
                <label className="text-xs font-semibold text-[#29235c] mb-1 block">Interview Type</label>
                <select value={offerForm.meeting} onChange={e => setOfferForm(prev => ({ ...prev, meeting: e.target.value }))}
                  className="w-full border border-[rgba(0,0,0,0.12)] rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#009fe3] bg-white">
                  <option value="PHYSICAL">Physical</option>
                  <option value="VIRTUAL">Virtual</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-[#29235c] mb-1 block">Job Description</label>
                <textarea value={offerForm.desc} onChange={e => setOfferForm(prev => ({ ...prev, desc: e.target.value }))} rows={3}
                  className="w-full border border-[rgba(0,0,0,0.12)] rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#009fe3] resize-none"
                  placeholder="Brief description of the role…" />
              </div>
              <div className="flex gap-2 pt-1">
                <button onClick={() => setSelectedId(null)}
                  className="flex-1 border border-[rgba(0,0,0,0.1)] text-[#6b7280] text-sm font-bold py-2.5 rounded-xl cursor-pointer hover:border-[#29235c] transition-colors">
                  Cancel
                </button>
                <button onClick={sendOffer}
                  className="flex-1 bg-[#009fe3] text-white text-sm font-bold py-2.5 rounded-xl hover:bg-[#0090cc] transition-colors cursor-pointer">
                  Send (1cr)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Video modal */}
      {videoModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-5" onClick={() => setVideoModal(null)}>
          <div className="bg-white rounded-2xl overflow-hidden max-w-lg w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-[rgba(0,0,0,0.06)]">
              <p className="font-bold text-[#29235c] text-sm">{videoModal.name} — Video Intro</p>
              <button onClick={() => setVideoModal(null)} className="text-[#9ca3af] hover:text-[#29235c] transition-colors cursor-pointer text-lg leading-none">✕</button>
            </div>
            <div className="bg-[#1a1a2e] aspect-video flex flex-col items-center justify-center gap-3">
              <span className="text-white/40 text-5xl">🎬</span>
              <p className="text-white/60 text-sm text-center px-6">
                In production, the candidate's recorded video responses would stream here from private storage. This is a preview placeholder.
              </p>
            </div>
            <div className="px-5 py-4">
              <p className="text-xs text-[#9ca3af]">Viewing this profile will consume 1 credit when an offer is sent.</p>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
