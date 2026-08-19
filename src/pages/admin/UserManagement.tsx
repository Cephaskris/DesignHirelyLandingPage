import { useState } from "react";
import DashboardShell from "@/components/ui/DashboardShell";

type UserRole = "EMPLOYEE" | "EMPLOYER";
type AccountStatus = "ACTIVE" | "SUSPENDED" | "PENDING_KYC" | "FLAGGED";

interface ManagedUser {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  status: AccountStatus;
  joinedAt: string;
  lastActive: string;
  profileComplete: number;
  extra: string;
}

const MOCK_USERS: ManagedUser[] = [
  { id: "cd-001", fullName: "Amara Okonkwo", email: "amara@example.com", role: "EMPLOYEE", status: "ACTIVE", joinedAt: "Aug 10", lastActive: "Aug 18", profileComplete: 92, extra: "Customer Service · Lagos" },
  { id: "cd-002", fullName: "Emeka Eze", email: "emeka@example.com", role: "EMPLOYEE", status: "ACTIVE", joinedAt: "Aug 12", lastActive: "Aug 17", profileComplete: 78, extra: "Driver / Logistics · Lagos" },
  { id: "cd-003", fullName: "Ngozi Obi", email: "ngozi@example.com", role: "EMPLOYEE", status: "ACTIVE", joinedAt: "Aug 14", lastActive: "Aug 18", profileComplete: 85, extra: "Customer Service · Abuja" },
  { id: "cd-004", fullName: "Musa Ibrahim", email: "musa@example.com", role: "EMPLOYEE", status: "PENDING_KYC", joinedAt: "Aug 15", lastActive: "Aug 15", profileComplete: 40, extra: "Driver / Logistics · Kano" },
  { id: "cd-005", fullName: "Blessing Okafor", email: "blessing@example.com", role: "EMPLOYEE", status: "FLAGGED", joinedAt: "Aug 8", lastActive: "Aug 16", profileComplete: 95, extra: "Admin / Receptionist · Lagos" },
  { id: "er-001", fullName: "Chidi Nwosu", email: "employer@demo.com", role: "EMPLOYER", status: "ACTIVE", joinedAt: "Aug 5", lastActive: "Aug 18", profileComplete: 100, extra: "NovaTech Solutions Ltd · Lagos" },
  { id: "er-002", fullName: "Amaka Osei", email: "amaka@quickserve.ng", role: "EMPLOYER", status: "ACTIVE", joinedAt: "Aug 9", lastActive: "Aug 17", profileComplete: 88, extra: "QuickServe Nigeria · Port Harcourt" },
  { id: "er-003", fullName: "Tunde Balogun", email: "tunde@lagosbiz.ng", role: "EMPLOYER", status: "PENDING_KYC", joinedAt: "Aug 17", lastActive: "Aug 17", profileComplete: 55, extra: "Lagos Logistics Hub · Lagos" },
  { id: "er-004", fullName: "Femi Adesola", email: "femi@techbridgeng.com", role: "EMPLOYER", status: "SUSPENDED", joinedAt: "Jul 30", lastActive: "Aug 10", profileComplete: 70, extra: "TechBridge Solutions · Abuja" },
];

const STATUS_STYLES: Record<AccountStatus, string> = {
  ACTIVE: "bg-green-50 text-green-700 border-green-200",
  SUSPENDED: "bg-red-50 text-red-600 border-red-200",
  PENDING_KYC: "bg-amber-50 text-amber-700 border-amber-200",
  FLAGGED: "bg-rose-50 text-rose-700 border-rose-200",
};

export default function UserManagement() {
  const [users, setUsers] = useState<ManagedUser[]>(MOCK_USERS);
  const [roleFilter, setRoleFilter] = useState<"ALL" | UserRole>("ALL");
  const [statusFilter, setStatusFilter] = useState<"ALL" | AccountStatus>("ALL");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = users.filter(u =>
    (roleFilter === "ALL" || u.role === roleFilter) &&
    (statusFilter === "ALL" || u.status === statusFilter) &&
    (u.fullName.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()))
  );

  const activeUser = users.find(u => u.id === selected) ?? null;

  const updateStatus = (id: string, status: AccountStatus) =>
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status } : u));

  const counts = {
    total: users.length,
    candidates: users.filter(u => u.role === "EMPLOYEE").length,
    employers: users.filter(u => u.role === "EMPLOYER").length,
    pendingKyc: users.filter(u => u.status === "PENDING_KYC").length,
    flagged: users.filter(u => u.status === "FLAGGED").length,
  };

  return (
    <DashboardShell>
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        <div>
          <h1 className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-[#29235c] text-2xl">User Management</h1>
          <p className="text-[#6b7280] text-sm mt-0.5">View, search, and moderate all registered candidates and employers</p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { label: "Total Users", value: counts.total, color: "#29235c" },
            { label: "Candidates", value: counts.candidates, color: "#009fe3" },
            { label: "Employers", value: counts.employers, color: "#7c3aed" },
            { label: "Pending KYC", value: counts.pendingKyc, color: "#f59e0b" },
            { label: "Flagged", value: counts.flagged, color: "#ef4444" },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] px-4 py-4">
              <p className="text-[#9ca3af] text-[10px] font-semibold uppercase tracking-wide">{s.label}</p>
              <p className="font-['Raleway:Bold',sans-serif] font-bold text-xl mt-1" style={{ color: s.color }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Pending KYC alert */}
        {counts.pendingKyc > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 flex items-center justify-between gap-4">
            <div>
              <p className="font-bold text-amber-800 text-sm">⚠ {counts.pendingKyc} accounts awaiting KYC approval</p>
              <p className="text-amber-700 text-xs mt-0.5">Employers with pending KYC cannot access Verify or Candidate Search until approved.</p>
            </div>
            <button onClick={() => setStatusFilter("PENDING_KYC")}
              className="bg-amber-500 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-amber-600 cursor-pointer whitespace-nowrap">
              Review Now
            </button>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-5">
          {/* Left — list */}
          <div className="flex-1 flex flex-col gap-3 min-w-0">
            {/* Filters + search */}
            <div className="flex flex-col sm:flex-row gap-3">
              <input value={search} onChange={e => setSearch(e.target.value)}
                className="flex-1 border border-[rgba(0,0,0,0.12)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#009fe3] focus:ring-2 focus:ring-[#009fe3]/20"
                placeholder="Search by name or email…" />
              <div className="flex gap-2 flex-wrap">
                {(["ALL", "EMPLOYEE", "EMPLOYER"] as const).map(r => (
                  <button key={r} onClick={() => setRoleFilter(r)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${roleFilter === r ? "bg-[#29235c] text-white border-[#29235c]" : "border-[rgba(0,0,0,0.12)] text-[#6b7280] hover:border-[#29235c]"}`}>
                    {r === "ALL" ? "All Roles" : r === "EMPLOYEE" ? "Candidates" : "Employers"}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              {(["ALL", "ACTIVE", "PENDING_KYC", "FLAGGED", "SUSPENDED"] as const).map(s => (
                <button key={s} onClick={() => setStatusFilter(s)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors cursor-pointer ${statusFilter === s ? "bg-[#29235c] text-white border-[#29235c]" : "border-[rgba(0,0,0,0.12)] text-[#6b7280] hover:border-[#29235c]"}`}>
                  {s === "ALL" ? "All Statuses" : s.replace("_", " ")}
                </button>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] overflow-hidden">
              {filtered.length === 0 && (
                <p className="text-[#9ca3af] text-sm italic p-6 text-center">No users match the current filters.</p>
              )}
              <div className="divide-y divide-[rgba(0,0,0,0.04)]">
                {filtered.map(u => (
                  <div key={u.id} onClick={() => setSelected(u.id === selected ? null : u.id)}
                    className={`flex items-center gap-4 px-5 py-4 cursor-pointer transition-colors flex-wrap ${selected === u.id ? "bg-[#f0f9ff]" : "hover:bg-[#f8f8fb]"}`}>
                    <div className="w-9 h-9 rounded-full bg-[#29235c]/10 flex items-center justify-center font-black text-[#29235c] text-sm shrink-0">
                      {u.fullName.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-[140px]">
                      <p className="font-semibold text-[#29235c] text-sm">{u.fullName}</p>
                      <p className="text-[#9ca3af] text-xs">{u.email}</p>
                    </div>
                    <div className="hidden sm:block text-[#6b7280] text-xs min-w-[140px]">{u.extra}</div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border whitespace-nowrap ${u.role === "EMPLOYEE" ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-purple-50 text-purple-700 border-purple-200"}`}>
                        {u.role === "EMPLOYEE" ? "Candidate" : "Employer"}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border whitespace-nowrap ${STATUS_STYLES[u.status]}`}>
                        {u.status.replace("_", " ")}
                      </span>
                    </div>
                    {/* Profile completeness bar */}
                    <div className="w-16 hidden md:block">
                      <div className="h-1.5 rounded-full bg-[#f3f3f3] overflow-hidden">
                        <div className="h-full rounded-full bg-[#009fe3]" style={{ width: `${u.profileComplete}%` }} />
                      </div>
                      <p className="text-[#9ca3af] text-[10px] mt-0.5 text-right">{u.profileComplete}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — user detail */}
          {activeUser && (
            <div className="lg:w-72 shrink-0 flex flex-col gap-4">
              <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] p-5 flex flex-col gap-4">
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#29235c]/10 flex items-center justify-center font-black text-[#29235c] text-2xl">
                    {activeUser.fullName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-['Raleway:Bold',sans-serif] font-bold text-[#29235c]">{activeUser.fullName}</p>
                    <p className="text-[#6b7280] text-xs">{activeUser.email}</p>
                    <p className="text-[#9ca3af] text-xs mt-0.5">{activeUser.extra}</p>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${STATUS_STYLES[activeUser.status]}`}>
                    {activeUser.status.replace("_", " ")}
                  </span>
                </div>

                <div className="flex flex-col gap-2 text-xs border-t border-[rgba(0,0,0,0.06)] pt-3">
                  {[
                    { label: "User ID", value: activeUser.id },
                    { label: "Role", value: activeUser.role === "EMPLOYEE" ? "Candidate" : "Employer" },
                    { label: "Joined", value: activeUser.joinedAt },
                    { label: "Last Active", value: activeUser.lastActive },
                  ].map(r => (
                    <div key={r.label} className="flex justify-between">
                      <span className="text-[#9ca3af]">{r.label}</span>
                      <span className="font-semibold text-[#29235c]">{r.value}</span>
                    </div>
                  ))}
                  <div className="mt-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-[#9ca3af]">Profile</span>
                      <span className="font-semibold text-[#29235c]">{activeUser.profileComplete}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-[#f3f3f3] overflow-hidden">
                      <div className="h-full rounded-full bg-[#009fe3] transition-all" style={{ width: `${activeUser.profileComplete}%` }} />
                    </div>
                  </div>
                </div>

                {/* Status actions */}
                <div className="flex flex-col gap-2 border-t border-[rgba(0,0,0,0.06)] pt-3">
                  <p className="text-xs font-bold text-[#29235c]">Account Actions</p>
                  {activeUser.status !== "ACTIVE" && (
                    <button onClick={() => updateStatus(activeUser.id, "ACTIVE")}
                      className="w-full bg-green-600 text-white text-xs font-bold py-2.5 rounded-xl hover:bg-green-700 cursor-pointer">
                      ✓ Activate Account
                    </button>
                  )}
                  {activeUser.status === "PENDING_KYC" && (
                    <button onClick={() => updateStatus(activeUser.id, "ACTIVE")}
                      className="w-full bg-[#009fe3] text-white text-xs font-bold py-2.5 rounded-xl hover:bg-[#0090cc] cursor-pointer">
                      ✓ Approve KYC
                    </button>
                  )}
                  {activeUser.status !== "FLAGGED" && (
                    <button onClick={() => updateStatus(activeUser.id, "FLAGGED")}
                      className="w-full border-2 border-amber-400 text-amber-700 text-xs font-bold py-2.5 rounded-xl hover:bg-amber-50 cursor-pointer">
                      ⚠ Flag for Review
                    </button>
                  )}
                  {activeUser.status !== "SUSPENDED" && (
                    <button onClick={() => updateStatus(activeUser.id, "SUSPENDED")}
                      className="w-full border-2 border-red-300 text-red-600 text-xs font-bold py-2.5 rounded-xl hover:bg-red-50 cursor-pointer">
                      ✗ Suspend Account
                    </button>
                  )}
                </div>

                {activeUser.role === "EMPLOYER" && (
                  <div className="border-t border-[rgba(0,0,0,0.06)] pt-3">
                    <p className="text-xs font-bold text-[#29235c] mb-2">Employer KYC</p>
                    {[
                      { label: "CAC Registration", done: activeUser.profileComplete > 70 },
                      { label: "Director ID verified", done: activeUser.profileComplete > 85 },
                      { label: "Business address confirmed", done: activeUser.profileComplete === 100 },
                    ].map(k => (
                      <div key={k.label} className="flex items-center gap-2 text-xs mb-1.5">
                        <span className={k.done ? "text-green-600" : "text-[#9ca3af]"}>{k.done ? "✓" : "○"}</span>
                        <span className={k.done ? "text-[#374151]" : "text-[#9ca3af]"}>{k.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}
