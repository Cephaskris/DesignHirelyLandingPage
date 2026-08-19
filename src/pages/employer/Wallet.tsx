import { useState } from "react";
import DashboardShell from "@/components/ui/DashboardShell";
import { useAuth } from "@/context/AuthContext";
import { useAppData } from "@/context/AppDataContext";

const HISTORY = [
  { id: "TXN-001", desc: "Offer sent to Amara Okonkwo", credits: -1, date: "Aug 18" },
  { id: "TXN-002", desc: "Growth Bundle top-up", credits: 10, date: "Aug 15" },
  { id: "TXN-003", desc: "Offer sent to Emeka Eze", credits: -1, date: "Aug 14" },
  { id: "TXN-004", desc: "Starter Bundle top-up", credits: 3, date: "Aug 10" },
];

export default function Wallet() {
  const { user, addCredits } = useAuth();
  const { bundles } = useAppData();
  const [selectedBundleId, setSelectedBundleId] = useState(bundles.find(b => b.popular)?.id ?? bundles[0]?.id);
  const [paying, setPaying] = useState(false);
  const [paid, setPaid] = useState<number | null>(null);

  const handlePay = () => {
    const bundle = bundles.find(b => b.id === selectedBundleId);
    if (!bundle) return;
    setPaying(true);
    setTimeout(() => {
      addCredits(bundle.credits);
      setPaid(bundle.credits);
      setPaying(false);
    }, 1800);
  };

  return (
    <DashboardShell>
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        <div>
          <h1 className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-[#29235c] text-2xl">Workspace Wallet</h1>
          <p className="text-[#6b7280] text-sm mt-0.5">Top up connection credits to hire candidates</p>
        </div>

        {/* Balance card */}
        <div className="bg-[#29235c] rounded-2xl p-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-white/60 text-xs font-semibold uppercase tracking-wide">Current Balance</p>
            <p className="font-['Raleway:Bold',sans-serif] font-bold text-white text-3xl mt-1">
              {user?.creditBalance ?? 0} <span className="text-xl font-semibold">credits</span>
            </p>
          </div>
          <div className="text-right text-white/70 text-sm">
            <p>1 credit = 1 offer dispatch</p>
            <p className="text-xs mt-0.5">or 5 candidate video views</p>
          </div>
        </div>

        {paid !== null && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3">
            <span className="text-2xl">✅</span>
            <p className="text-green-700 font-bold text-sm">Payment successful! <strong>{paid} credits</strong> added to your wallet.</p>
          </div>
        )}

        {/* Bundle picker */}
        <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] p-6 flex flex-col gap-4">
          <h2 className="font-['Raleway:Bold',sans-serif] font-bold text-[#29235c] text-base">Buy Credit Bundle</h2>
          <div className="flex flex-col gap-3">
            {bundles.map(b => (
              <label key={b.id} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${selectedBundleId === b.id ? "border-[#009fe3] bg-[#f0f9ff]" : "border-[rgba(0,0,0,0.1)]"}`}>
                <input type="radio" name="bundle" value={b.id} checked={selectedBundleId === b.id} onChange={() => setSelectedBundleId(b.id)} className="accent-[#009fe3]" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#29235c] text-sm">{b.label}</span>
                    {b.popular && <span className="bg-[#009fe3] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Popular</span>}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-['Raleway:Bold',sans-serif] font-bold text-[#29235c] text-base">₦{b.price.toLocaleString()}</p>
                  <p className="text-[#009fe3] text-xs font-bold">{b.credits} credits</p>
                </div>
              </label>
            ))}
          </div>
          <button onClick={handlePay} disabled={paying}
            className="bg-[#009fe3] text-white font-bold py-3 rounded-xl hover:bg-[#0090cc] transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2">
            {paying
              ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Processing Paystack…</>
              : "Pay via Paystack →"}
          </button>
          <p className="text-center text-xs text-[#9ca3af]">Secured by Paystack · Instant NGN processing</p>
        </div>

        {/* Transaction history */}
        <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] overflow-hidden">
          <div className="px-6 py-4 border-b border-[rgba(0,0,0,0.06)]">
            <p className="font-['Raleway:Bold',sans-serif] font-bold text-[#29235c]">Transaction History</p>
          </div>
          <div className="divide-y divide-[rgba(0,0,0,0.04)]">
            {HISTORY.map(h => (
              <div key={h.id} className="flex items-center justify-between px-6 py-4">
                <div>
                  <p className="text-[#29235c] text-sm font-semibold">{h.desc}</p>
                  <p className="text-[#9ca3af] text-xs mt-0.5">{h.id} · {h.date}</p>
                </div>
                <span className={`font-bold text-sm ${h.credits > 0 ? "text-green-600" : "text-red-500"}`}>
                  {h.credits > 0 ? `+${h.credits}` : h.credits} cr
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
