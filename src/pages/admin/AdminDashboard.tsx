import { Link } from "react-router-dom";
import DashboardShell from "@/components/ui/DashboardShell";

const STATS = [
  { label: "Total Users", value: "1,248", delta: "+34 this week", color: "#009fe3" },
  { label: "Active Candidates", value: "392", delta: "+12 today", color: "#29235c" },
  { label: "Open Verify Cases", value: "47", delta: "8 flagged", color: "#f59e0b" },
  { label: "Revenue (NGN)", value: "₦3.2M", delta: "+₦420k this week", color: "#16a34a" },
];

const RECENT_ACTIVITY = [
  { text: "New employer registered: TechBridge Solutions", time: "5m ago", type: "employer" },
  { text: "Verify case CHK-049 flagged for manual review", time: "12m ago", type: "flag" },
  { text: "Candidate Amara Okonkwo completed video interview", time: "28m ago", type: "video" },
  { text: "₦75,000 Growth Bundle purchased by QuickServe Nigeria", time: "1hr ago", type: "payment" },
  { text: "New job role added: Digital Marketing Specialist", time: "2hr ago", type: "role" },
];

const ICON_MAP: Record<string, string> = { employer: "🏢", flag: "⚠️", video: "🎬", payment: "💳", role: "📋" };

export default function AdminDashboard() {
  return (
    <DashboardShell>
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        <div>
          <h1 className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-[#29235c] text-2xl">Super Admin Portal</h1>
          <p className="text-[#6b7280] text-sm mt-0.5">Platform overview, monetization, and compliance</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] p-5">
              <p className="text-[#9ca3af] text-xs font-semibold uppercase tracking-wide">{s.label}</p>
              <p className="font-['Raleway:Bold',sans-serif] font-bold text-2xl mt-1" style={{ color: s.color }}>{s.value}</p>
              <p className="text-[#9ca3af] text-xs mt-1">{s.delta}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Recent activity */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] overflow-hidden">
            <div className="px-6 py-4 border-b border-[rgba(0,0,0,0.06)]">
              <p className="font-['Raleway:Bold',sans-serif] font-bold text-[#29235c]">Recent Activity</p>
            </div>
            <div className="divide-y divide-[rgba(0,0,0,0.04)]">
              {RECENT_ACTIVITY.map((a, i) => (
                <div key={i} className="flex items-start gap-3 px-6 py-4">
                  <span className="text-lg shrink-0">{ICON_MAP[a.type]}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#374151] text-sm">{a.text}</p>
                  </div>
                  <span className="text-[#9ca3af] text-xs whitespace-nowrap shrink-0">{a.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick nav */}
          <div className="flex flex-col gap-3">
            {[
              { to: "/admin/users", label: "User Management", desc: "View, moderate, and approve all accounts", emoji: "👥" },
              { to: "/admin/verify-queue", label: "Verification Queue", desc: "Process Tier 2 & 3 cases · assign agents", emoji: "✅" },
              { to: "/admin/roles", label: "Role & Question Manager", desc: "Manage job roles and interview prompts", emoji: "📋" },
              { to: "/admin/pricing", label: "Monetization Engine", desc: "Adjust credit prices and pass durations", emoji: "💰" },
              { to: "/admin/matching", label: "Matching Concierge", desc: "Curate and push candidate recommendations", emoji: "🤝" },
              { to: "/admin/audit", label: "Audit & Compliance Desk", desc: "Review logs and NDPA consent records", emoji: "🔍" },
            ].map(a => (
              <Link key={a.to} to={a.to}
                className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] p-5 hover:shadow-md transition-shadow group">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{a.emoji}</span>
                  <div>
                    <p className="font-['Raleway:Bold',sans-serif] font-bold text-[#29235c] text-sm group-hover:text-[#009fe3] transition-colors">{a.label}</p>
                    <p className="text-[#9ca3af] text-xs mt-0.5">{a.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
