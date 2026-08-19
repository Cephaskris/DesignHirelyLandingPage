import { useState } from "react";
import DashboardShell from "@/components/ui/DashboardShell";
import { useAppData } from "@/context/AppDataContext";

export default function PricingEngine() {
  const { passes, setPasses, bundles, setBundles, commission, setCommission } = useAppData();
  const [saved, setSaved] = useState(false);
  const [localCommission, setLocalCommission] = useState(commission);

  const updateCommission = (field: keyof typeof localCommission, val: number | string) =>
    setLocalCommission(prev => ({ ...prev, [field]: val }));

  const updatePass = (id: string, field: "price" | "days", val: number) =>
    setPasses(passes.map(p => p.id === id ? { ...p, [field]: val } : p));

  const updateBundle = (id: string, field: "price" | "credits", val: number) =>
    setBundles(bundles.map(b => b.id === id ? { ...b, [field]: val } : b));

  const handleSave = () => {
    setCommission(localCommission);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <DashboardShell>
      <div className="max-w-3xl mx-auto flex flex-col gap-6">
        <div>
          <h1 className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-[#29235c] text-2xl">Monetization Engine</h1>
          <p className="text-[#6b7280] text-sm mt-0.5">Adjust credit prices and candidate pass durations — changes reflect instantly sitewide</p>
        </div>

        {saved && (
          <div className="bg-green-50 border border-green-200 rounded-xl px-5 py-3 text-green-700 text-sm font-semibold">
            ✅ Pricing updated successfully — all portals now reflect the new values
          </div>
        )}

        {/* Candidate passes */}
        <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] overflow-hidden">
          <div className="px-6 py-4 border-b border-[rgba(0,0,0,0.06)] bg-[#f8f8fb]">
            <p className="font-['Raleway:Bold',sans-serif] font-bold text-[#29235c]">Candidate Visibility Passes</p>
            <p className="text-[#9ca3af] text-xs mt-0.5">Prices shown to candidates in the Video Studio</p>
          </div>
          <div className="divide-y divide-[rgba(0,0,0,0.04)]">
            {passes.map(p => (
              <div key={p.id} className="px-6 py-4 flex items-center gap-4 flex-wrap">
                <p className="flex-1 text-[#29235c] text-sm font-semibold min-w-[160px]">{p.label}</p>
                <div className="flex items-center gap-2">
                  <label className="text-xs text-[#9ca3af] whitespace-nowrap">Price (₦)</label>
                  <input type="number" value={p.price} min={0}
                    onChange={e => updatePass(p.id, "price", Number(e.target.value))}
                    className="w-24 border border-[rgba(0,0,0,0.12)] rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#009fe3]" />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs text-[#9ca3af]">Days</label>
                  <input type="number" value={p.days} min={1}
                    onChange={e => updatePass(p.id, "days", Number(e.target.value))}
                    className="w-16 border border-[rgba(0,0,0,0.12)] rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#009fe3]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Employer credit bundles */}
        <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] overflow-hidden">
          <div className="px-6 py-4 border-b border-[rgba(0,0,0,0.06)] bg-[#f8f8fb]">
            <p className="font-['Raleway:Bold',sans-serif] font-bold text-[#29235c]">Employer Credit Bundles</p>
            <p className="text-[#9ca3af] text-xs mt-0.5">Prices shown to employers in the Wallet page</p>
          </div>
          <div className="divide-y divide-[rgba(0,0,0,0.04)]">
            {bundles.map(b => (
              <div key={b.id} className="px-6 py-4 flex items-center gap-4 flex-wrap">
                <p className="flex-1 text-[#29235c] text-sm font-semibold min-w-[160px]">{b.label}</p>
                <div className="flex items-center gap-2">
                  <label className="text-xs text-[#9ca3af] whitespace-nowrap">Price (₦)</label>
                  <input type="number" value={b.price} min={0}
                    onChange={e => updateBundle(b.id, "price", Number(e.target.value))}
                    className="w-28 border border-[rgba(0,0,0,0.12)] rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#009fe3]" />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs text-[#9ca3af]">Credits</label>
                  <input type="number" value={b.credits} min={1}
                    onChange={e => updateBundle(b.id, "credits", Number(e.target.value))}
                    className="w-16 border border-[rgba(0,0,0,0.12)] rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#009fe3]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Commission Structure */}
        <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] overflow-hidden">
          <div className="px-6 py-4 border-b border-[rgba(0,0,0,0.06)] bg-[#f8f8fb]">
            <p className="font-['Raleway:Bold',sans-serif] font-bold text-[#29235c]">Hire Commission Structure</p>
            <p className="text-[#9ca3af] text-xs mt-0.5">% of employee salary/contract value charged to the employer per placement</p>
          </div>

          <div className="px-6 py-5 flex flex-col gap-5">
            {/* Rate inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#f8f8fb] rounded-xl p-4 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">📅</span>
                  <p className="font-semibold text-[#29235c] text-sm">Monthly Salary Hire</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <label className="text-xs text-[#9ca3af] block mb-1">Commission Rate</label>
                    <div className="flex items-center border border-[rgba(0,0,0,0.12)] rounded-xl overflow-hidden focus-within:border-[#009fe3] bg-white">
                      <input type="number" min={0} max={100} step={0.5}
                        value={localCommission.monthlyRate}
                        onChange={e => updateCommission("monthlyRate", Number(e.target.value))}
                        className="w-full px-4 py-2.5 text-sm font-bold text-[#29235c] focus:outline-none" />
                      <span className="px-3 py-2.5 bg-[#f3f3f3] text-[#6b7280] text-sm font-bold border-l border-[rgba(0,0,0,0.1)]">%</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-[#9ca3af] text-[10px]">e.g. ₦80k salary</p>
                    <p className="font-black text-[#29235c] text-base">₦{((80000 * localCommission.monthlyRate) / 100).toLocaleString()}</p>
                    <p className="text-[#9ca3af] text-[10px]">due to Hirely</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#f8f8fb] rounded-xl p-4 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">📋</span>
                  <p className="font-semibold text-[#29235c] text-sm">Contract Hire</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <label className="text-xs text-[#9ca3af] block mb-1">Commission Rate</label>
                    <div className="flex items-center border border-[rgba(0,0,0,0.12)] rounded-xl overflow-hidden focus-within:border-[#009fe3] bg-white">
                      <input type="number" min={0} max={100} step={0.5}
                        value={localCommission.contractRate}
                        onChange={e => updateCommission("contractRate", Number(e.target.value))}
                        className="w-full px-4 py-2.5 text-sm font-bold text-[#29235c] focus:outline-none" />
                      <span className="px-3 py-2.5 bg-[#f3f3f3] text-[#6b7280] text-sm font-bold border-l border-[rgba(0,0,0,0.1)]">%</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-[#9ca3af] text-[10px]">e.g. ₦500k contract</p>
                    <p className="font-black text-[#29235c] text-base">₦{((500000 * localCommission.contractRate) / 100).toLocaleString()}</p>
                    <p className="text-[#9ca3af] text-[10px]">one-time fee</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Billing cycle */}
            <div>
              <label className="text-xs font-semibold text-[#29235c] block mb-2">Monthly Hire Billing Cycle</label>
              <div className="flex gap-3">
                {([
                  { val: "ONGOING", label: "Ongoing Monthly", desc: "Employer pays Hirely % every month the hire is active" },
                  { val: "ONE_TIME", label: "One-time Placement Fee", desc: "Employer pays once at the time of hire only" },
                ] as const).map(opt => (
                  <button key={opt.val} type="button"
                    onClick={() => updateCommission("billingCycle", opt.val)}
                    className={`flex-1 p-4 rounded-xl border-2 text-left transition-colors cursor-pointer ${localCommission.billingCycle === opt.val ? "border-[#009fe3] bg-[#f0f9ff]" : "border-[rgba(0,0,0,0.1)] hover:border-[#009fe3]/50"}`}>
                    <p className={`font-bold text-sm ${localCommission.billingCycle === opt.val ? "text-[#29235c]" : "text-[#374151]"}`}>{opt.label}</p>
                    <p className="text-[#9ca3af] text-xs mt-0.5 leading-snug">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Grace period */}
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="text-xs font-semibold text-[#29235c] block mb-1.5">Payment Grace Period (days)</label>
                <p className="text-[#9ca3af] text-xs mb-2">Commission status changes to OVERDUE after this many days past due date</p>
                <div className="flex items-center gap-2">
                  <input type="number" min={0} max={30} value={localCommission.gracePeriodDays}
                    onChange={e => updateCommission("gracePeriodDays", Number(e.target.value))}
                    className="w-20 border border-[rgba(0,0,0,0.12)] rounded-xl px-4 py-2.5 text-sm font-bold text-[#29235c] focus:outline-none focus:border-[#009fe3]" />
                  <span className="text-[#6b7280] text-sm">days</span>
                </div>
              </div>
              <div className="bg-[#f0f9ff] border border-[#bae6fd] rounded-xl p-4 text-xs text-[#0369a1] max-w-xs">
                <p className="font-bold mb-1">How commission works</p>
                <p>Employers see the commission breakdown before hiring. They pay Hirely directly; the hire is flagged OVERDUE if unpaid after the grace period.</p>
              </div>
            </div>
          </div>
        </div>

        <button onClick={handleSave}
          className="bg-[#29235c] text-white font-bold py-3 rounded-xl hover:bg-[#1e1656] transition-colors cursor-pointer">
          Save All Pricing Changes
        </button>

        {/* Live preview */}
        <div className="bg-[#f8f8fb] rounded-2xl p-5 border border-[rgba(0,0,0,0.06)]">
          <p className="text-xs font-bold text-[#9ca3af] uppercase tracking-wide mb-3">Revenue Preview</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-[#6b7280]">If 100 candidates buy 7-day pass:</p>
              <p className="font-black text-[#29235c] text-lg">₦{((passes.find(p => p.id === "7day")?.price ?? 5000) * 100).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-[#6b7280]">If 20 employers buy Growth Bundle:</p>
              <p className="font-black text-[#29235c] text-lg">₦{((bundles.find(b => b.id === "growth")?.price ?? 75000) * 20).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
