import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardShell from "@/components/ui/DashboardShell";
import { useAppData } from "@/context/AppDataContext";

type OnboardStatus = "ONBOARDING" | "ACTIVE" | "INACTIVE";
type EmploymentType = "MONTHLY" | "CONTRACT";
type CommissionStatus = "PAID" | "DUE" | "OVERDUE";

interface Hire {
  id: string;
  name: string;
  role: string;
  location: string;
  hiredDate: string;
  onboardStatus: OnboardStatus;
  verifyStatus: "VERIFIED" | "PENDING";
  department: string;
  avatar: string;
  employmentType: EmploymentType;
  monthlySalary?: number;
  contractValue?: number;
  contractDuration?: string;
  commissionStatus: CommissionStatus;
  commissionPaidMonths: number;
  onboardSteps: { label: string; done: boolean }[];
  notes: string;
}

const INITIAL_HIRES: Hire[] = [
  {
    id: "H-001", name: "Amara Okonkwo", role: "Customer Service Representative",
    location: "Victoria Island, Lagos", hiredDate: "Aug 10",
    onboardStatus: "ACTIVE", verifyStatus: "VERIFIED", department: "Customer Experience",
    avatar: "A", employmentType: "MONTHLY", monthlySalary: 85000,
    commissionStatus: "PAID", commissionPaidMonths: 1, notes: "",
    onboardSteps: [
      { label: "Offer accepted", done: true },
      { label: "Documents submitted", done: true },
      { label: "Identity verified", done: true },
      { label: "Role onboarding complete", done: true },
    ],
  },
  {
    id: "H-002", name: "Emeka Eze", role: "Driver / Logistics Officer",
    location: "Ikeja, Lagos", hiredDate: "Aug 14",
    onboardStatus: "ONBOARDING", verifyStatus: "VERIFIED", department: "Logistics",
    avatar: "E", employmentType: "MONTHLY", monthlySalary: 70000,
    commissionStatus: "DUE", commissionPaidMonths: 0, notes: "",
    onboardSteps: [
      { label: "Offer accepted", done: true },
      { label: "Documents submitted", done: true },
      { label: "Identity verified", done: true },
      { label: "Role onboarding complete", done: false },
    ],
  },
  {
    id: "H-003", name: "David Adeleke", role: "IT Support Technician",
    location: "Remote", hiredDate: "Jul 20",
    onboardStatus: "ACTIVE", verifyStatus: "VERIFIED", department: "Technology",
    avatar: "D", employmentType: "CONTRACT", contractValue: 480000, contractDuration: "3 months",
    commissionStatus: "OVERDUE", commissionPaidMonths: 0, notes: "",
    onboardSteps: [
      { label: "Offer accepted", done: true },
      { label: "Documents submitted", done: true },
      { label: "Identity verified", done: true },
      { label: "Role onboarding complete", done: true },
    ],
  },
];

const ONBOARD_STYLES: Record<OnboardStatus, string> = {
  ACTIVE: "bg-green-50 text-green-700 border-green-200",
  ONBOARDING: "bg-amber-50 text-amber-700 border-amber-200",
  INACTIVE: "bg-[#f3f3f3] text-[#9ca3af] border-[rgba(0,0,0,0.1)]",
};

const COMMISSION_STYLES: Record<CommissionStatus, string> = {
  PAID: "bg-green-50 text-green-700 border-green-200",
  DUE: "bg-amber-50 text-amber-700 border-amber-200",
  OVERDUE: "bg-red-50 text-red-700 border-red-200",
};

function calcCommission(hire: Hire, monthlyRate: number, contractRate: number): number {
  if (hire.employmentType === "MONTHLY") {
    return Math.round(((hire.monthlySalary ?? 0) * monthlyRate) / 100);
  }
  return Math.round(((hire.contractValue ?? 0) * contractRate) / 100);
}

export default function ActiveHires() {
  const { commission } = useAppData();
  const [hires, setHires] = useState<Hire[]>(INITIAL_HIRES);
  const [selected, setSelected] = useState<string | null>("H-001");
  const [noteMap, setNoteMap] = useState<Record<string, string>>({});

  const active = hires.find(h => h.id === selected) ?? null;

  const setOnboardStatus = (id: string, status: OnboardStatus) =>
    setHires(prev => prev.map(h => h.id === id ? { ...h, onboardStatus: status } : h));

  const markCommissionPaid = (id: string) =>
    setHires(prev => prev.map(h =>
      h.id === id ? { ...h, commissionStatus: "PAID", commissionPaidMonths: h.commissionPaidMonths + 1 } : h
    ));

  const toggleStep = (id: string, stepIdx: number) =>
    setHires(prev => prev.map(h => {
      if (h.id !== id) return h;
      const steps = h.onboardSteps.map((s, i) => i === stepIdx ? { ...s, done: !s.done } : s);
      return { ...h, onboardSteps: steps, onboardStatus: steps.every(s => s.done) ? "ACTIVE" : "ONBOARDING" };
    }));

  const counts = {
    active: hires.filter(h => h.onboardStatus === "ACTIVE").length,
    onboarding: hires.filter(h => h.onboardStatus === "ONBOARDING").length,
  };

  const totalCommissionDue = hires
    .filter(h => h.commissionStatus !== "PAID")
    .reduce((sum, h) => sum + calcCommission(h, commission.monthlyRate, commission.contractRate), 0);

  const overdueCount = hires.filter(h => h.commissionStatus === "OVERDUE").length;

  return (
    <DashboardShell>
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        <div>
          <h1 className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-[#29235c] text-2xl">Active Hires</h1>
          <p className="text-[#6b7280] text-sm mt-0.5">Track your workforce, onboarding progress, and Hirely commission payments</p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Active", value: counts.active, color: "#16a34a" },
            { label: "Onboarding", value: counts.onboarding, color: "#f59e0b" },
            { label: "Total Hires", value: hires.length, color: "#29235c" },
            { label: "Commission Due", value: `₦${totalCommissionDue.toLocaleString()}`, color: overdueCount > 0 ? "#dc2626" : "#009fe3" },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] px-4 py-4">
              <p className="text-[#9ca3af] text-xs font-semibold uppercase tracking-wide">{s.label}</p>
              <p className="font-['Raleway:Bold',sans-serif] font-bold text-xl mt-1 truncate" style={{ color: s.color }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Commission rate info bar */}
        <div className="bg-[#29235c] rounded-2xl px-5 py-4 flex flex-wrap items-center gap-4 justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl">💼</span>
            <div>
              <p className="font-bold text-white text-sm">Hirely Commission Rates</p>
              <p className="text-white/60 text-xs mt-0.5">Set by Hirely — applied to every placement</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="text-center">
              <p className="text-white/50 text-[10px] uppercase tracking-wide">Monthly Hire</p>
              <p className="font-black text-[#009fe3] text-lg">{commission.monthlyRate}%</p>
              <p className="text-white/40 text-[10px]">{commission.billingCycle === "ONGOING" ? "per month" : "one-time"}</p>
            </div>
            <div className="w-px bg-white/10 self-stretch" />
            <div className="text-center">
              <p className="text-white/50 text-[10px] uppercase tracking-wide">Contract Hire</p>
              <p className="font-black text-[#009fe3] text-lg">{commission.contractRate}%</p>
              <p className="text-white/40 text-[10px]">of contract value</p>
            </div>
            <div className="w-px bg-white/10 self-stretch" />
            <div className="text-center">
              <p className="text-white/50 text-[10px] uppercase tracking-wide">Grace Period</p>
              <p className="font-black text-white text-lg">{commission.gracePeriodDays}</p>
              <p className="text-white/40 text-[10px]">days</p>
            </div>
          </div>
        </div>

        {/* Overdue alert */}
        {overdueCount > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-2xl px-5 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xl shrink-0">⚠️</span>
              <p className="text-red-700 font-bold text-sm">
                {overdueCount} hire{overdueCount > 1 ? "s have" : " has"} overdue commission payments. Settle to avoid service interruption.
              </p>
            </div>
            <span className="text-red-700 font-black text-sm whitespace-nowrap">₦{hires.filter(h => h.commissionStatus === "OVERDUE").reduce((s, h) => s + calcCommission(h, commission.monthlyRate, commission.contractRate), 0).toLocaleString()} overdue</span>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-5">
          {/* Hire list */}
          <div className="lg:w-72 shrink-0 flex flex-col gap-3">
            {hires.length === 0 && (
              <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] p-8 text-center text-[#9ca3af] text-sm">
                <p className="text-4xl mb-3">👥</p>
                <p>No active hires yet.</p>
                <Link to="/employer/candidates" className="mt-3 inline-block text-[#009fe3] text-xs font-bold hover:underline">Find Candidates →</Link>
              </div>
            )}
            {hires.map(h => {
              const commAmt = calcCommission(h, commission.monthlyRate, commission.contractRate);
              return (
                <div key={h.id} onClick={() => setSelected(h.id)}
                  className={`bg-white rounded-2xl border-2 p-4 cursor-pointer transition-all ${selected === h.id ? "border-[#009fe3] bg-[#f0f9ff]" : "border-[rgba(0,0,0,0.06)] hover:border-[#009fe3]/40"}`}>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#29235c]/10 flex items-center justify-center font-black text-[#29235c] text-sm shrink-0">{h.avatar}</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[#29235c] text-sm truncate">{h.name}</p>
                      <p className="text-[#6b7280] text-xs truncate">{h.role}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${ONBOARD_STYLES[h.onboardStatus]}`}>
                      {h.onboardStatus}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${COMMISSION_STYLES[h.commissionStatus]}`}>
                        {h.commissionStatus}
                      </span>
                    </div>
                    <p className="text-[#29235c] text-xs font-bold">₦{commAmt.toLocaleString()}{h.employmentType === "MONTHLY" && commission.billingCycle === "ONGOING" ? "/mo" : ""}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detail panel */}
          {active ? (
            <div className="flex-1 flex flex-col gap-4">
              {/* Header card */}
              <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] p-6">
                <div className="flex items-start gap-4 flex-wrap">
                  <div className="w-14 h-14 rounded-2xl bg-[#29235c]/10 flex items-center justify-center font-black text-[#29235c] text-2xl shrink-0">{active.avatar}</div>
                  <div className="flex-1">
                    <h2 className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-[#29235c] text-xl">{active.name}</h2>
                    <p className="text-[#6b7280] text-sm mt-0.5">{active.role} · {active.department}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full border ${ONBOARD_STYLES[active.onboardStatus]}`}>{active.onboardStatus}</span>
                      {active.verifyStatus === "VERIFIED" && (
                        <span className="bg-green-50 text-green-700 border border-green-200 text-xs font-bold px-3 py-1 rounded-full">✓ Verified</span>
                      )}
                      <span className="bg-[#f3f3f3] text-[#6b7280] border border-[rgba(0,0,0,0.1)] text-xs font-bold px-3 py-1 rounded-full">
                        {active.employmentType === "MONTHLY" ? "Monthly Hire" : "Contract"}
                      </span>
                    </div>
                  </div>
                  <Link to="/employer/verify" className="text-xs font-bold text-[#009fe3] border border-[#009fe3]/30 px-4 py-2 rounded-xl hover:bg-[#f0f9ff] transition-colors whitespace-nowrap">
                    Re-verify →
                  </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
                  {[
                    { label: "Location", value: active.location },
                    { label: active.employmentType === "MONTHLY" ? "Monthly Salary" : "Contract Value", value: active.employmentType === "MONTHLY" ? `₦${(active.monthlySalary ?? 0).toLocaleString()}` : `₦${(active.contractValue ?? 0).toLocaleString()}` },
                    { label: "Hired", value: active.hiredDate },
                    { label: active.employmentType === "CONTRACT" ? "Duration" : "Months Active", value: active.employmentType === "CONTRACT" ? (active.contractDuration ?? "—") : `${active.commissionPaidMonths} paid` },
                  ].map(d => (
                    <div key={d.label} className="bg-[#f8f8fb] rounded-xl p-3">
                      <p className="text-[#9ca3af] text-[10px] font-semibold uppercase tracking-wide">{d.label}</p>
                      <p className="font-semibold text-[#29235c] text-sm mt-0.5 truncate">{d.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Commission breakdown card */}
              <div className={`rounded-2xl border-2 p-5 flex flex-col gap-4 ${active.commissionStatus === "OVERDUE" ? "border-red-200 bg-red-50" : active.commissionStatus === "DUE" ? "border-amber-200 bg-amber-50" : "border-green-200 bg-green-50"}`}>
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <p className="font-bold text-[#29235c] text-sm">Hirely Commission</p>
                    <p className="text-[#6b7280] text-xs mt-0.5">
                      {active.employmentType === "MONTHLY"
                        ? `${commission.monthlyRate}% of ₦${(active.monthlySalary ?? 0).toLocaleString()} monthly salary${commission.billingCycle === "ONGOING" ? " · billed monthly" : " · one-time placement fee"}`
                        : `${commission.contractRate}% of ₦${(active.contractValue ?? 0).toLocaleString()} contract value · one-time fee`}
                    </p>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${COMMISSION_STYLES[active.commissionStatus]}`}>
                    {active.commissionStatus}
                  </span>
                </div>

                {/* Breakdown table */}
                <div className="bg-white rounded-xl overflow-hidden border border-[rgba(0,0,0,0.06)]">
                  <div className="grid grid-cols-3 px-4 py-2.5 bg-[#f8f8fb] border-b border-[rgba(0,0,0,0.05)]">
                    <p className="text-[10px] font-bold text-[#9ca3af] uppercase tracking-wide">Description</p>
                    <p className="text-[10px] font-bold text-[#9ca3af] uppercase tracking-wide text-center">Rate</p>
                    <p className="text-[10px] font-bold text-[#9ca3af] uppercase tracking-wide text-right">Amount</p>
                  </div>
                  <div className="px-4 py-3 grid grid-cols-3 items-center">
                    <p className="text-sm text-[#374151]">
                      {active.employmentType === "MONTHLY"
                        ? commission.billingCycle === "ONGOING" ? "Monthly commission" : "Placement fee"
                        : "Contract commission"}
                    </p>
                    <p className="text-sm text-[#374151] text-center font-semibold">
                      {active.employmentType === "MONTHLY" ? commission.monthlyRate : commission.contractRate}%
                    </p>
                    <p className="text-sm font-black text-[#29235c] text-right">
                      ₦{calcCommission(active, commission.monthlyRate, commission.contractRate).toLocaleString()}
                    </p>
                  </div>
                  {active.commissionPaidMonths > 0 && active.employmentType === "MONTHLY" && commission.billingCycle === "ONGOING" && (
                    <div className="px-4 py-3 grid grid-cols-3 items-center border-t border-[rgba(0,0,0,0.04)] bg-green-50/50">
                      <p className="text-xs text-green-700 col-span-2">Paid months: {active.commissionPaidMonths}</p>
                      <p className="text-xs font-bold text-green-700 text-right">
                        ₦{(calcCommission(active, commission.monthlyRate, commission.contractRate) * active.commissionPaidMonths).toLocaleString()} total paid
                      </p>
                    </div>
                  )}
                  <div className="px-4 py-3 border-t border-[rgba(0,0,0,0.06)] bg-[#f8f8fb] flex items-center justify-between">
                    <p className="text-sm font-bold text-[#29235c]">
                      {active.commissionStatus === "PAID" ? "Amount Last Paid" : "Amount Due Now"}
                    </p>
                    <p className="text-base font-black text-[#29235c]">
                      ₦{calcCommission(active, commission.monthlyRate, commission.contractRate).toLocaleString()}
                    </p>
                  </div>
                </div>

                {active.commissionStatus === "OVERDUE" && (
                  <div className="flex items-center gap-2 text-red-700 text-xs font-semibold">
                    <span>⚠️</span>
                    <span>This payment is overdue by more than {commission.gracePeriodDays} days. Please settle immediately to avoid access restrictions.</span>
                  </div>
                )}

                {active.commissionStatus !== "PAID" && (
                  <button onClick={() => markCommissionPaid(active.id)}
                    className="w-full bg-[#29235c] text-white font-bold py-3 rounded-xl hover:bg-[#1e1656] transition-colors cursor-pointer flex items-center justify-center gap-2">
                    <svg fill="none" width="16" height="16" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
                    Pay ₦{calcCommission(active, commission.monthlyRate, commission.contractRate).toLocaleString()} via Paystack →
                  </button>
                )}
                {active.commissionStatus === "PAID" && (
                  <div className="flex items-center gap-2 justify-center text-green-700 text-sm font-bold">
                    <span>✓</span>
                    <span>Commission paid{active.employmentType === "MONTHLY" && commission.billingCycle === "ONGOING" ? ` · ${active.commissionPaidMonths} month${active.commissionPaidMonths !== 1 ? "s" : ""} total` : ""}</span>
                  </div>
                )}
              </div>

              {/* Onboarding checklist */}
              <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] p-5">
                <p className="font-bold text-[#29235c] text-sm mb-3">Onboarding Checklist</p>
                <div className="flex flex-col gap-2">
                  {active.onboardSteps.map((step, i) => (
                    <div key={i} onClick={() => toggleStep(active.id, i)}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#f8f8fb] cursor-pointer transition-colors select-none">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${step.done ? "bg-[#009fe3] border-[#009fe3]" : "border-[#d1d5db]"}`}>
                        {step.done && <svg fill="none" width="10" height="10" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg>}
                      </div>
                      <p className={`text-sm flex-1 ${step.done ? "line-through text-[#9ca3af]" : "text-[#29235c] font-medium"}`}>{step.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status + notes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] p-5">
                  <p className="font-bold text-[#29235c] text-sm mb-3">Update Status</p>
                  <div className="flex flex-col gap-2">
                    {(["ONBOARDING", "ACTIVE", "INACTIVE"] as OnboardStatus[]).map(s => (
                      <button key={s} onClick={() => setOnboardStatus(active.id, s)}
                        className={`px-4 py-2.5 rounded-xl text-xs font-bold border-2 transition-colors cursor-pointer text-left ${active.onboardStatus === s ? "bg-[#29235c] text-white border-[#29235c]" : "border-[rgba(0,0,0,0.1)] text-[#6b7280] hover:border-[#29235c]"}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] p-5">
                  <p className="font-bold text-[#29235c] text-sm mb-2">Internal Notes</p>
                  <textarea value={noteMap[active.id] ?? active.notes}
                    onChange={e => setNoteMap(prev => ({ ...prev, [active.id]: e.target.value }))}
                    rows={4} placeholder="Add private notes…"
                    className="w-full border border-[rgba(0,0,0,0.1)] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#009fe3] resize-none" />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-[#9ca3af] text-sm py-20">Select a hire to view details</div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}
