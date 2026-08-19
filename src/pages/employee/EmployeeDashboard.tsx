import { Link } from "react-router-dom";
import DashboardShell from "@/components/ui/DashboardShell";
import { useAuth } from "@/context/AuthContext";

const MOCK_OFFERS = [
  { id: 1, company: "QuickServe Nigeria", role: "Customer Service Rep", salary: "₦80,000/mo", status: "PENDING", date: "Aug 18" },
  { id: 2, company: "Lagos Logistics Hub", role: "Driver / Delivery", salary: "₦65,000/mo", status: "ACCEPTED", date: "Aug 15" },
];

export default function EmployeeDashboard() {
  const { user } = useAuth();
  const passActive = user?.passExpiresAt && user.passExpiresAt > new Date();
  const daysLeft = passActive && user?.passExpiresAt
    ? Math.ceil((user.passExpiresAt.getTime() - Date.now()) / 86400000)
    : 0;

  return (
    <DashboardShell>
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        {/* Welcome */}
        <div>
          <h1 className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-[#29235c] text-2xl">
            Welcome, {user?.fullName?.split(" ")[0]} 👋
          </h1>
          <p className="text-[#6b7280] text-sm mt-0.5">Here is your candidate overview.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <StatCard label="Profile Views" value={String(user?.profileViews ?? 0)} accent="#009fe3" />
          <StatCard label="Active Offers" value="2" accent="#29235c" />
          <StatCard label="Pass Status" value={passActive ? `${daysLeft}d left` : "Inactive"} accent={passActive ? "#16a34a" : "#dc2626"} />
        </div>

        {/* Pass banner */}
        {!passActive && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-['Raleway:Bold',sans-serif] font-bold text-amber-800 text-base">Your visibility pass is inactive</p>
              <p className="text-amber-700 text-sm mt-0.5">Employers cannot find you. Activate a pass to appear in search results.</p>
            </div>
            <Link to="/employee/studio"
              className="bg-amber-500 text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-amber-600 transition-colors whitespace-nowrap">
              Activate Pass
            </Link>
          </div>
        )}

        {passActive && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-green-500 shrink-0" />
              <div>
                <p className="font-['Raleway:Bold',sans-serif] font-bold text-green-800 text-base">Pass active — you are visible to employers</p>
                <p className="text-green-700 text-sm mt-0.5">{daysLeft} days remaining on your current pass.</p>
              </div>
            </div>
            <Link to="/employee/studio" className="text-green-700 text-sm font-semibold hover:underline">Update video →</Link>
          </div>
        )}

        {/* Recent offers */}
        <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(0,0,0,0.06)]">
            <p className="font-['Raleway:Bold',sans-serif] font-bold text-[#29235c] text-base">Recent Offers</p>
            <Link to="/employee/offers" className="text-[#009fe3] text-sm font-semibold hover:underline">View all</Link>
          </div>
          <div className="divide-y divide-[rgba(0,0,0,0.05)]">
            {MOCK_OFFERS.map(o => (
              <div key={o.id} className="flex items-center justify-between px-6 py-4 gap-4">
                <div>
                  <p className="font-semibold text-[#29235c] text-sm">{o.role}</p>
                  <p className="text-[#6b7280] text-xs mt-0.5">{o.company} · {o.salary}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#9ca3af]">{o.date}</span>
                  <StatusBadge status={o.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ActionCard to="/employee/studio" title="Record Video Intro" desc="Complete your guided video interview questions" color="#29235c" />
          <ActionCard to="/employee/offers" title="Review Offers" desc="You have 1 pending offer awaiting your response" color="#009fe3" />
        </div>
      </div>
    </DashboardShell>
  );
}

function StatCard({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] p-5">
      <p className="text-[#6b7280] text-xs font-semibold uppercase tracking-wide mb-1">{label}</p>
      <p className="font-['Raleway:Bold',sans-serif] font-bold text-2xl" style={{ color: accent }}>{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    PENDING: "bg-amber-50 text-amber-700 border-amber-200",
    ACCEPTED: "bg-green-50 text-green-700 border-green-200",
    DECLINED: "bg-red-50 text-red-700 border-red-200",
  };
  return <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${map[status] ?? ""}`}>{status}</span>;
}

function ActionCard({ to, title, desc, color }: { to: string; title: string; desc: string; color: string }) {
  return (
    <Link to={to} className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] p-6 hover:shadow-md transition-shadow group">
      <div className="w-2 h-2 rounded-full mb-3" style={{ backgroundColor: color }} />
      <p className="font-['Raleway:Bold',sans-serif] font-bold text-[#29235c] text-base group-hover:text-[#009fe3] transition-colors">{title}</p>
      <p className="text-[#6b7280] text-xs mt-1">{desc}</p>
    </Link>
  );
}
