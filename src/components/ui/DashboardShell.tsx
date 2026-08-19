import { useState, type ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth, type UserRole } from "@/context/AuthContext";

interface NavItem { label: string; path: string; icon: ReactNode }

const NAV: Record<UserRole, NavItem[]> = {
  EMPLOYEE: [
    { label: "Dashboard", path: "/employee", icon: <GridIcon /> },
    { label: "Video Studio", path: "/employee/studio", icon: <VideoIcon /> },
    { label: "Offers", path: "/employee/offers", icon: <OfferIcon /> },
  ],
  EMPLOYER: [
    { label: "Dashboard", path: "/employer", icon: <GridIcon /> },
    { label: "Find Candidates", path: "/employer/candidates", icon: <SearchIcon /> },
    { label: "Hirely Verify", path: "/employer/verify", icon: <ShieldIcon /> },
    { label: "Wallet", path: "/employer/wallet", icon: <WalletIcon /> },
    { label: "Launch Hub", path: "/employer/launch", icon: <RocketIcon /> },
  ],
  SUPER_ADMIN: [
    { label: "Dashboard", path: "/admin", icon: <GridIcon /> },
    { label: "Role Manager", path: "/admin/roles", icon: <EditIcon /> },
    { label: "Monetization", path: "/admin/pricing", icon: <CurrencyIcon /> },
    { label: "Matching", path: "/admin/matching", icon: <MatchIcon /> },
    { label: "Audit Desk", path: "/admin/audit", icon: <AuditIcon /> },
  ],
};

export default function DashboardShell({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) return null;
  const nav = NAV[user.role];
  const roleLabel = user.role === "SUPER_ADMIN" ? "Super Admin" : user.role === "EMPLOYEE" ? "Candidate" : "Employer";

  const handleLogout = () => { logout(); navigate("/"); };

  const Sidebar = () => (
    <aside className="flex flex-col h-full bg-[#29235c] text-white w-64 shrink-0">
      <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
        <div className="bg-[#009fe3] w-8 h-8 rounded-lg flex items-center justify-center font-black text-lg">H</div>
        <div>
          <p className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-sm leading-tight">hirely</p>
          <p className="text-white/50 text-[11px]">{roleLabel} Portal</p>
        </div>
      </div>
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
        {nav.map(item => {
          const active = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-['Raleway:SemiBold',sans-serif] font-semibold transition-colors ${active ? "bg-[#009fe3] text-white" : "text-white/70 hover:bg-white/10 hover:text-white"}`}>
              <span className="shrink-0 w-5 h-5">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="px-3 py-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-[#009fe3]/30 flex items-center justify-center text-xs font-bold text-[#009fe3]">
            {user.fullName.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate text-white">{user.fullName}</p>
            <p className="text-[11px] text-white/50 truncate">{user.email}</p>
          </div>
        </div>
        <button onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/10 transition-colors">
          <svg fill="none" width="16" height="16" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Sign out
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8f8fb]">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex flex-col"><Sidebar /></div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="flex flex-col w-64"><Sidebar /></div>
          <div className="flex-1 bg-black/40" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-[rgba(0,0,0,0.06)] px-5 md:px-8 h-14 flex items-center justify-between shrink-0">
          <button className="lg:hidden p-1 text-[#29235c]" onClick={() => setSidebarOpen(true)}>
            <svg fill="none" width="22" height="22" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
          <p className="font-['Raleway:Bold',sans-serif] font-bold text-[#29235c] text-sm hidden lg:block">
            {nav.find(n => n.path === location.pathname)?.label ?? ""}
          </p>
          <div className="flex items-center gap-3 ml-auto">
            {user.role === "EMPLOYER" && (
              <div className="flex items-center gap-1.5 bg-[#f3f3f3] px-3 py-1.5 rounded-full">
                <span className="text-[#009fe3] text-xs font-bold">{user.creditBalance ?? 0}</span>
                <span className="text-[#29235c] text-xs font-semibold">credits</span>
              </div>
            )}
            {user.role === "EMPLOYEE" && user.passExpiresAt && (
              <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-green-700 text-xs font-semibold">Pass Active</span>
              </div>
            )}
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-5 md:p-8">{children}</main>
      </div>
    </div>
  );
}

/* ── Inline icon components ─────────────────────── */
function GridIcon() { return <svg fill="none" viewBox="0 0 24 24" className="w-full h-full"><rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/><rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/><rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/><rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/></svg>; }
function VideoIcon() { return <svg fill="none" viewBox="0 0 24 24" className="w-full h-full"><path d="M15 10l4.553-2.277A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>; }
function OfferIcon() { return <svg fill="none" viewBox="0 0 24 24" className="w-full h-full"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>; }
function SearchIcon() { return <svg fill="none" viewBox="0 0 24 24" className="w-full h-full"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8"/><path d="M21 21l-4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>; }
function ShieldIcon() { return <svg fill="none" viewBox="0 0 24 24" className="w-full h-full"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>; }
function WalletIcon() { return <svg fill="none" viewBox="0 0 24 24" className="w-full h-full"><path d="M21 12V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2v-5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><circle cx="16" cy="12" r="2" stroke="currentColor" strokeWidth="1.8"/></svg>; }
function RocketIcon() { return <svg fill="none" viewBox="0 0 24 24" className="w-full h-full"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10M15 9l-3 3m0 0l-3 3m3-3V5m0 7h7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>; }
function EditIcon() { return <svg fill="none" viewBox="0 0 24 24" className="w-full h-full"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function CurrencyIcon() { return <svg fill="none" viewBox="0 0 24 24" className="w-full h-full"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/><path d="M12 7v10M9 9.5C9 8.12 10.34 7 12 7s3 1.12 3 2.5-1.34 2.5-3 2.5-3 1.12-3 2.5S10.34 17 12 17s3-1.12 3-2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>; }
function MatchIcon() { return <svg fill="none" viewBox="0 0 24 24" className="w-full h-full"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function AuditIcon() { return <svg fill="none" viewBox="0 0 24 24" className="w-full h-full"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8L14 2zM14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
