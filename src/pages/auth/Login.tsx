import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import hirelyLogo from "@/assets/hirely-logo.png";

export default function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
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
    <div className="min-h-screen bg-[#f3f3f3] flex flex-col items-center justify-center px-5 py-12">
      <Link to="/" className="mb-8">
        <img src={hirelyLogo} alt="Hirely" className="h-9 w-auto object-contain" />
      </Link>
      <div className="bg-white rounded-2xl shadow-sm border border-[rgba(0,0,0,0.06)] p-8 w-full max-w-md">
        <h1 className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-[#29235c] text-2xl mb-1">Welcome back</h1>
        <p className="text-[#6b7280] text-sm mb-6">Sign in to your Hirely account</p>

        <div className="bg-[#f0f9ff] border border-[#bae6fd] rounded-xl p-4 mb-6 text-sm">
          <p className="font-semibold text-[#0369a1] mb-1">Demo Accounts</p>
          <div className="flex flex-col gap-1">
            {[
              { label: "Candidate", email: "candidate@demo.com" },
              { label: "Employer", email: "employer@demo.com" },
              { label: "Super Admin", email: "admin@demo.com" },
            ].map(d => (
              <button key={d.email} type="button"
                onClick={() => { setEmail(d.email); setPassword("demo"); }}
                className="text-left text-[#0369a1] hover:text-[#0284c7] text-xs cursor-pointer">
                <span className="font-semibold">{d.label}:</span> {d.email}
              </button>
            ))}
          </div>
          <p className="text-[#0369a1] opacity-70 text-xs mt-1">Click a row to auto-fill · any password works</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-4">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold text-[#29235c] mb-1.5">Email address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              className="w-full border border-[rgba(0,0,0,0.12)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#009fe3] focus:ring-2 focus:ring-[#009fe3]/20 transition-all"
              placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#29235c] mb-1.5">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
              className="w-full border border-[rgba(0,0,0,0.12)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#009fe3] focus:ring-2 focus:ring-[#009fe3]/20 transition-all"
              placeholder="••••••••" />
          </div>
          <button type="submit" disabled={loading}
            className="bg-[#009fe3] text-white font-['Raleway:Bold',sans-serif] font-bold py-3 rounded-xl mt-1 hover:bg-[#0090cc] transition-colors disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2">
            {loading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Signing in…</> : "Sign in"}
          </button>
        </form>
        <p className="text-center text-sm text-[#6b7280] mt-5">
          {"Don't have an account? "}
          <Link to="/signup" className="text-[#009fe3] font-semibold hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
