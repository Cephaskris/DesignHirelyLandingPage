import { Link } from "react-router-dom";
import DashboardShell from "@/components/ui/DashboardShell";
import { useAuth } from "@/context/AuthContext";
import { useAppData } from "@/context/AppDataContext";

export default function EmployerDashboard() {
  const { user } = useAuth();
  const { getPushedForEmployer } = useAppData();
  const pushed = getPushedForEmployer(user?.id ?? "");

  return (
    <DashboardShell>
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        <div>
          <h1 className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-[#29235c] text-2xl">
            Welcome, {user?.companyName ?? user?.fullName} 👋
          </h1>
          <p className="text-[#6b7280] text-sm mt-0.5">Manage hiring, verification, and your workspace.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Credits", value: String(user?.creditBalance ?? 0), color: "#009fe3" },
            { label: "Offers Sent", value: "5", color: "#29235c" },
            { label: "Active Checks", value: "2", color: "#f59e0b" },
            { label: "Hires Made", value: "3", color: "#16a34a" },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] p-5">
              <p className="text-[#6b7280] text-xs font-semibold uppercase tracking-wide mb-1">{s.label}</p>
              <p className="font-['Raleway:Bold',sans-serif] font-bold text-2xl" style={{ color: s.color }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Low credits warning */}
        {(user?.creditBalance ?? 0) < 2 && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-bold text-amber-800 text-sm">Low credit balance</p>
              <p className="text-amber-700 text-xs mt-0.5">You need credits to view candidate videos and send offers.</p>
            </div>
            <Link to="/employer/wallet" className="bg-amber-500 text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-amber-600 transition-colors whitespace-nowrap">
              Top up Wallet →
            </Link>
          </div>
        )}

        {/* Pushed recommendations */}
        {pushed.length > 0 && (
          <div className="bg-white rounded-2xl border-2 border-[#009fe3]/30 overflow-hidden">
            <div className="px-6 py-4 border-b border-[rgba(0,0,0,0.06)] bg-[#f0f9ff] flex items-center gap-2">
              <span className="text-lg">🤝</span>
              <p className="font-['Raleway:Bold',sans-serif] font-bold text-[#29235c]">Hirely Concierge Recommendations</p>
              <span className="ml-auto bg-[#009fe3] text-white text-xs font-bold px-2 py-0.5 rounded-full">{pushed.length} new</span>
            </div>
            <div className="divide-y divide-[rgba(0,0,0,0.04)]">
              {pushed.map(c => (
                <div key={c.id} className="flex items-center gap-4 px-6 py-4">
                  <div className="w-9 h-9 rounded-full bg-[#29235c]/10 flex items-center justify-center font-black text-[#29235c]">
                    {c.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-[#29235c] text-sm">{c.name}</p>
                    <p className="text-[#6b7280] text-xs">{c.role} · {c.location}</p>
                  </div>
                  <div className="text-center mr-2">
                    <p className="font-black text-[#29235c] text-base leading-none">{c.score}</p>
                    <p className="text-[#9ca3af] text-[10px]">match</p>
                  </div>
                  <Link to="/employer/candidates" className="bg-[#009fe3] text-white text-xs font-bold px-3 py-1.5 rounded-xl hover:bg-[#0090cc] transition-colors">
                    View →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick action grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { to: "/employer/postings", title: "Job Postings", desc: "Post vacancies and track matching", emoji: "📋" },
            { to: "/employer/hires", title: "Active Hires", desc: "Track onboarding and workforce status", emoji: "👥" },
            { to: "/employer/candidates", title: "Find Candidates", desc: "Search pre-screened video profiles", emoji: "🔍" },
            { to: "/employer/verify", title: "Hirely Verify", desc: "Run background checks on any candidate", emoji: "🛡️" },
            { to: "/employer/wallet", title: "Top Up Credits", desc: "Fund your workspace wallet", emoji: "💳" },
            { to: "/employer/launch", title: "Launch Your Website", desc: "Get 3 steps to your business online", emoji: "🚀" },
          ].map(a => (
            <Link key={a.to} to={a.to}
              className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] p-6 hover:shadow-md transition-shadow group">
              <span className="text-3xl mb-3 block">{a.emoji}</span>
              <p className="font-['Raleway:Bold',sans-serif] font-bold text-[#29235c] text-base group-hover:text-[#009fe3] transition-colors">{a.title}</p>
              <p className="text-[#6b7280] text-xs mt-1">{a.desc}</p>
            </Link>
          ))}
        </div>

        {/* Recent offers */}
        <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] overflow-hidden">
          <div className="px-6 py-4 border-b border-[rgba(0,0,0,0.06)]">
            <p className="font-['Raleway:Bold',sans-serif] font-bold text-[#29235c]">Recent Offers Sent</p>
          </div>
          <div className="divide-y divide-[rgba(0,0,0,0.04)]">
            {[
              { name: "Amara Okonkwo", role: "Customer Service", salary: "₦80k", status: "ACCEPTED" },
              { name: "Emeka Eze", role: "Driver / Logistics", salary: "₦65k", status: "PENDING" },
              { name: "Fatima Bello", role: "Admin Assistant", salary: "₦70k", status: "PENDING" },
            ].map((r, i) => (
              <div key={i} className="flex items-center justify-between px-6 py-4">
                <div>
                  <p className="font-semibold text-[#29235c] text-sm">{r.name}</p>
                  <p className="text-[#6b7280] text-xs">{r.role} · {r.salary}/mo</p>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${r.status === "ACCEPTED" ? "bg-green-50 text-green-700 border-green-200" : "bg-amber-50 text-amber-700 border-amber-200"}`}>
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
