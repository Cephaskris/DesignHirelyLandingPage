import { useState } from "react";
import DashboardShell from "@/components/ui/DashboardShell";

const TEMPLATES = [
  { id: "retail", label: "Retail & Shop", emoji: "🛍️", desc: "Clean storefront look for product businesses" },
  { id: "service", label: "Service Business", emoji: "🔧", desc: "Professional layout for service providers" },
  { id: "food", label: "Food & Catering", emoji: "🍽️", desc: "Warm, inviting design for food businesses" },
  { id: "logistics", label: "Logistics & Delivery", emoji: "🚚", desc: "Bold, fast-moving layout for delivery brands" },
];

const PACKAGES = [
  { id: "basic", label: "Basic Package", price: "₦65,000–₦85,000", items: ["CAC Business Registration", "Domain + Email Setup", "Professional Landing Page"], bonus: "₦10,000 Verify Credits" },
  { id: "full", label: "Full Suite Package", price: "₦150,000–₦250,000", items: ["CAC Registration", "Custom Multi-page Website", "Payment Gateway Integration", "Business Email Suite", "1yr Hosting & Support"], bonus: "₦10,000 Verify Credits", popular: true },
];

type Stage = "select" | "details" | "submitted";

export default function LaunchHub() {
  const [stage, setStage] = useState<Stage>("select");
  const [selectedTemplate, setSelectedTemplate] = useState("service");
  const [selectedPackage, setSelectedPackage] = useState("basic");
  const [businessName, setBusinessName] = useState("");
  const [rcNumber, setRcNumber] = useState("");
  const [domain, setDomain] = useState("");

  return (
    <DashboardShell>
      <div className="max-w-3xl mx-auto flex flex-col gap-6">
        <div>
          <h1 className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-[#29235c] text-2xl">Launch Hub</h1>
          <p className="text-[#6b7280] text-sm mt-0.5">3 steps to get your business online — CAC, domain, and website</p>
        </div>

        {/* Bonus credit badge */}
        <div className="bg-gradient-to-r from-[#29235c] to-[#009fe3] rounded-2xl p-5 flex items-center gap-4">
          <span className="text-3xl">🎁</span>
          <div>
            <p className="font-bold text-white text-base">Free ₦10,000 Hirely Verify Credits</p>
            <p className="text-white/80 text-xs mt-0.5">Every website launch automatically credits your verification wallet</p>
          </div>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2">
          {["Choose", "Details", "Done"].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${(stage === "select" && i === 0) || (stage === "details" && i <= 1) || (stage === "submitted") ? "bg-[#29235c] text-white" : "bg-[#e5e7eb] text-[#9ca3af]"}`}>{i + 1}</div>
              <span className="text-xs text-[#6b7280]">{s}</span>
              {i < 2 && <div className="w-8 h-px bg-[#e5e7eb]" />}
            </div>
          ))}
        </div>

        {stage === "select" && (
          <div className="flex flex-col gap-6">
            {/* Template */}
            <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] p-6">
              <h2 className="font-['Raleway:Bold',sans-serif] font-bold text-[#29235c] mb-4">Choose a website template</h2>
              <div className="grid grid-cols-2 gap-3">
                {TEMPLATES.map(t => (
                  <button key={t.id} onClick={() => setSelectedTemplate(t.id)}
                    className={`p-4 rounded-xl border-2 text-left transition-colors cursor-pointer ${selectedTemplate === t.id ? "border-[#009fe3] bg-[#f0f9ff]" : "border-[rgba(0,0,0,0.1)] hover:border-[#009fe3]/50"}`}>
                    <span className="text-2xl block mb-1">{t.emoji}</span>
                    <p className="font-semibold text-[#29235c] text-sm">{t.label}</p>
                    <p className="text-[#6b7280] text-xs mt-0.5">{t.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Package */}
            <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] p-6">
              <h2 className="font-['Raleway:Bold',sans-serif] font-bold text-[#29235c] mb-4">Select a package</h2>
              <div className="flex flex-col gap-3">
                {PACKAGES.map(p => (
                  <label key={p.id} className={`flex gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${selectedPackage === p.id ? "border-[#009fe3] bg-[#f0f9ff]" : "border-[rgba(0,0,0,0.1)]"}`}>
                    <input type="radio" name="pkg" value={p.id} checked={selectedPackage === p.id} onChange={() => setSelectedPackage(p.id)} className="mt-1 accent-[#009fe3] shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#29235c] text-sm">{p.label}</span>
                        {p.popular && <span className="bg-[#009fe3] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Popular</span>}
                      </div>
                      <ul className="mt-1 space-y-0.5">
                        {p.items.map(item => <li key={item} className="text-[#6b7280] text-xs flex gap-1.5"><span className="text-[#009fe3]">✓</span>{item}</li>)}
                      </ul>
                      <p className="text-green-700 text-xs font-semibold mt-2">🎁 + {p.bonus}</p>
                    </div>
                    <p className="font-['Raleway:Bold',sans-serif] font-bold text-[#29235c] text-sm text-right whitespace-nowrap">{p.price}</p>
                  </label>
                ))}
              </div>
            </div>

            <button onClick={() => setStage("details")}
              className="bg-[#29235c] text-white font-bold py-3 rounded-xl hover:bg-[#1e1656] transition-colors cursor-pointer">
              Continue →
            </button>
          </div>
        )}

        {stage === "details" && (
          <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] p-6 flex flex-col gap-5">
            <h2 className="font-['Raleway:Bold',sans-serif] font-bold text-[#29235c] text-lg">Business Details</h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-semibold text-[#29235c] mb-1.5 block">Registered Business Name</label>
                <input value={businessName} onChange={e => setBusinessName(e.target.value)}
                  className="w-full border border-[rgba(0,0,0,0.12)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#009fe3] focus:ring-2 focus:ring-[#009fe3]/20"
                  placeholder="QuickServe Nigeria Ltd" />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#29235c] mb-1.5 block">CAC RC Number (if already registered)</label>
                <input value={rcNumber} onChange={e => setRcNumber(e.target.value)}
                  className="w-full border border-[rgba(0,0,0,0.12)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#009fe3] focus:ring-2 focus:ring-[#009fe3]/20"
                  placeholder="RC1234567 (leave blank if new)" />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#29235c] mb-1.5 block">Preferred domain name</label>
                <div className="flex items-center border border-[rgba(0,0,0,0.12)] rounded-xl overflow-hidden focus-within:border-[#009fe3] focus-within:ring-2 focus-within:ring-[#009fe3]/20">
                  <input value={domain} onChange={e => setDomain(e.target.value)}
                    className="flex-1 px-4 py-3 text-sm focus:outline-none"
                    placeholder="quickserve" />
                  <span className="bg-[#f3f3f3] px-3 py-3 text-[#6b7280] text-sm border-l border-[rgba(0,0,0,0.1)]">.com.ng</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setStage("select")}
                className="border border-[rgba(0,0,0,0.1)] text-[#29235c] font-bold text-sm px-5 py-3 rounded-xl hover:border-[#29235c] transition-colors cursor-pointer">
                Back
              </button>
              <button onClick={() => setStage("submitted")}
                className="flex-1 bg-[#009fe3] text-white font-bold py-3 rounded-xl hover:bg-[#0090cc] transition-colors cursor-pointer">
                Submit & Pay via Paystack
              </button>
            </div>
          </div>
        )}

        {stage === "submitted" && (
          <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] p-8 flex flex-col items-center gap-4 text-center">
            <span className="text-5xl">🚀</span>
            <h2 className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-[#29235c] text-xl">{"You're on your way!"}</h2>
            <p className="text-[#6b7280] text-sm max-w-sm">Our team will contact you within 24 hours to begin your CAC registration and website setup.</p>
            <div className="bg-green-50 border border-green-200 rounded-xl px-5 py-3">
              <p className="text-green-700 text-sm font-bold">🎁 ₦10,000 Hirely Verify credits added to your wallet!</p>
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
