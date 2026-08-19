import { useState } from "react";
import DashboardShell from "@/components/ui/DashboardShell";
import { useAppData } from "@/context/AppDataContext";

export default function PricingEngine() {
  const { passes, setPasses, bundles, setBundles } = useAppData();
  const [saved, setSaved] = useState(false);

  const updatePass = (id: string, field: "price" | "days", val: number) =>
    setPasses(passes.map(p => p.id === id ? { ...p, [field]: val } : p));

  const updateBundle = (id: string, field: "price" | "credits", val: number) =>
    setBundles(bundles.map(b => b.id === id ? { ...b, [field]: val } : b));

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

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
