import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth, type UserRole } from "@/context/AuthContext";
import hirelyLogo from "@/assets/hirely-logo.png";
import { useAppData } from "@/context/AppDataContext";

export default function SignUp() {
  const { signup, user } = useAuth();
  const { roles } = useAppData();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const defaultRole = (params.get("role") as UserRole) ?? "EMPLOYEE";

  const [role, setRole] = useState<UserRole>(defaultRole);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [ndpaConsent, setNdpaConsent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleRole = (r: string) =>
    setSelectedRoles(prev => prev.includes(r) ? prev.filter(x => x !== r) : [...prev, r]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!ndpaConsent) { setError("You must agree to the NDPA 2023 data consent."); return; }
    if (role === "EMPLOYEE" && selectedRoles.length === 0) { setError("Select at least one job role."); return; }
    setLoading(true);
    try {
      await signup({ email, password, fullName, phone, role, companyName, targetRoles: selectedRoles });
    } catch {
      setError("Signup failed. Please try again.");
      setLoading(false);
      return;
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      const dest = user.role === "SUPER_ADMIN" ? "/admin" : user.role === "EMPLOYER" ? "/employer" : "/employee";
      navigate(dest, { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-[#f3f3f3] flex flex-col items-center justify-start px-5 py-12">
      <Link to="/" className="mb-8">
        <img src={hirelyLogo} alt="Hirely" className="h-9 w-auto object-contain" />
      </Link>
      <div className="bg-white rounded-2xl shadow-sm border border-[rgba(0,0,0,0.06)] p-8 w-full max-w-lg">
        <h1 className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-[#29235c] text-2xl mb-1">Create your account</h1>
        <p className="text-[#6b7280] text-sm mb-6">{"Join Hirely — Nigeria's trusted hiring platform"}</p>

        {/* Role toggle */}
        <div className="flex rounded-xl border border-[rgba(0,0,0,0.1)] p-1 gap-1 mb-6">
          {(["EMPLOYEE", "EMPLOYER"] as UserRole[]).map(r => (
            <button key={r} type="button" onClick={() => setRole(r)}
              className={`flex-1 py-2 rounded-lg text-sm font-['Raleway:Bold',sans-serif] font-bold transition-colors cursor-pointer ${role === r ? "bg-[#29235c] text-white" : "text-[#29235c] hover:bg-[#f3f3f3]"}`}>
              {r === "EMPLOYEE" ? "I am a Candidate" : "I am an Employer"}
            </button>
          ))}
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#29235c] mb-1.5">Full name</label>
              <input value={fullName} onChange={e => setFullName(e.target.value)} required
                className="w-full border border-[rgba(0,0,0,0.12)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#009fe3] focus:ring-2 focus:ring-[#009fe3]/20 transition-all"
                placeholder="Amara Okonkwo" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#29235c] mb-1.5">Phone number</label>
              <input value={phone} onChange={e => setPhone(e.target.value)} required
                className="w-full border border-[rgba(0,0,0,0.12)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#009fe3] focus:ring-2 focus:ring-[#009fe3]/20 transition-all"
                placeholder="080XXXXXXXX" />
            </div>
          </div>

          {role === "EMPLOYER" && (
            <div>
              <label className="block text-sm font-semibold text-[#29235c] mb-1.5">Company name</label>
              <input value={companyName} onChange={e => setCompanyName(e.target.value)} required
                className="w-full border border-[rgba(0,0,0,0.12)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#009fe3] focus:ring-2 focus:ring-[#009fe3]/20 transition-all"
                placeholder="NovaTech Solutions Ltd" />
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-[#29235c] mb-1.5">Email address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              className="w-full border border-[rgba(0,0,0,0.12)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#009fe3] focus:ring-2 focus:ring-[#009fe3]/20 transition-all"
              placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#29235c] mb-1.5">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={8}
              className="w-full border border-[rgba(0,0,0,0.12)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#009fe3] focus:ring-2 focus:ring-[#009fe3]/20 transition-all"
              placeholder="Min. 8 characters" />
          </div>

          {/* Dynamic job roles from AppDataContext */}
          {role === "EMPLOYEE" && (
            <div>
              <label className="block text-sm font-semibold text-[#29235c] mb-2">Job roles you are interested in</label>
              <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                {roles.map(r => (
                  <button key={r.id} type="button" onClick={() => toggleRole(r.title)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors cursor-pointer ${selectedRoles.includes(r.title) ? "bg-[#29235c] text-white border-[#29235c]" : "bg-white text-[#29235c] border-[rgba(0,0,0,0.12)] hover:border-[#29235c]"}`}>
                    {r.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* NDPA Consent */}
          <label className="flex gap-3 items-start cursor-pointer bg-[#f3f3f3] rounded-xl p-4">
            <input type="checkbox" checked={ndpaConsent} onChange={e => setNdpaConsent(e.target.checked)}
              className="mt-0.5 accent-[#009fe3]" />
            <span className="text-xs text-[#6b7280] leading-relaxed">
              I agree to the processing of my personal data under the <span className="text-[#009fe3] font-semibold">Nigeria Data Protection Act (NDPA 2023)</span>. My data will be used for employment matching and verification purposes only.
            </span>
          </label>

          <button type="submit" disabled={loading}
            className="bg-[#009fe3] text-white font-['Raleway:Bold',sans-serif] font-bold py-3 rounded-xl mt-1 hover:bg-[#0090cc] transition-colors disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2">
            {loading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Creating account…</> : "Create account"}
          </button>
        </form>
        <p className="text-center text-sm text-[#6b7280] mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-[#009fe3] font-semibold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
