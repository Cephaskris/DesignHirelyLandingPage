import { useState, useRef } from "react";
import DashboardShell from "@/components/ui/DashboardShell";

const DISCLAIMER =
  "STATEMENT OF NON-ADVISORY ROLE: Hirely Verification Services provides factual data verification only and does not make employment or hiring decisions on behalf of the client.";

const TIERS = [
  {
    id: "TIER_1",
    label: "Tier 1 — Identity & Civil",
    badge: "Instant",
    price: "₦1,500 / check",
    sla: "Instant – 24 hrs",
    color: "#009fe3",
    checks: ["NIN Validation", "BVN Name Match", "Passport / Driver's License", "NIMC Database Cross-Check"],
    desc: "Automated real-time identity lookup against NIMC and NIBSS databases.",
  },
  {
    id: "TIER_2",
    label: "Tier 2 — Academic & Statutory",
    badge: "3–5 Days",
    price: "₦15,000 / check",
    sla: "3 – 5 business days",
    color: "#7c3aed",
    checks: ["Degree / HND Certificate", "NYSC Certificate or Exemption", "Professional License Check", "CAC Company Search"],
    desc: "Document routing to Super Admin Queue and tertiary institution portal checks.",
  },
  {
    id: "TIER_3",
    label: "Tier 3 — Field & Comprehensive",
    badge: "5–7 Days",
    price: "₦25,000 / check",
    sla: "5 – 7 business days",
    color: "#16a34a",
    checks: ["Geotagged Address Visit", "Work History Verification", "Guarantor Check & SMS Ping", "Utility Bill Authentication"],
    desc: "Physical field agent dispatch with GPS coordinates, photo evidence, and Termii-automated guarantor sign-off.",
  },
];

const INITIAL_CASES = [
  { id: "CHK-001", name: "Emeka Eze", nin: "****5821", tier: "TIER_1", status: "VERIFIED", date: "Aug 16", result: { ninMatch: true, bvnMatch: true, dob: "1992-03-11" } },
  { id: "CHK-002", name: "Fatima Bello", nin: "****3340", tier: "TIER_2", status: "IN_PROGRESS", date: "Aug 17", result: null },
  { id: "CHK-003", name: "David Adeleke", nin: "****7704", tier: "TIER_1", status: "PENDING_CONSENT", date: "Aug 18", result: null },
];

type VerifyStage = "list" | "select_tier" | "intake" | "processing" | "result" | "queued";
type CaseStatus = "VERIFIED" | "IN_PROGRESS" | "PENDING_CONSENT" | "FLAGGED" | "QUEUED";

interface Case {
  id: string;
  name: string;
  nin: string;
  tier: string;
  status: CaseStatus;
  date: string;
  result: { ninMatch: boolean; bvnMatch: boolean; dob: string } | null;
}

interface FileSlot {
  label: string;
  key: string;
  required?: boolean;
  accept?: string;
}

const TIER1_FILES: FileSlot[] = [
  { label: "Passport Photo or Driver's License", key: "govt_id", required: true, accept: ".jpg,.jpeg,.png,.pdf" },
];

const TIER2_FILES: FileSlot[] = [
  { label: "Degree / HND Certificate", key: "degree", required: true, accept: ".pdf,.jpg,.jpeg,.png" },
  { label: "NYSC Certificate or Exemption Letter", key: "nysc", required: true, accept: ".pdf,.jpg,.jpeg,.png" },
  { label: "Professional License / Certification", key: "prof_cert", required: false, accept: ".pdf,.jpg,.jpeg,.png" },
];

const TIER3_FILES: FileSlot[] = [
  { label: "Utility Bill or Lease Agreement", key: "utility_bill", required: true, accept: ".pdf,.jpg,.jpeg,.png" },
  { label: "Guarantor Government-Issued ID", key: "guarantor_id", required: true, accept: ".pdf,.jpg,.jpeg,.png" },
];

function FileDropzone({ slot, file, onFile }: { slot: FileSlot; file: File | null; onFile: (f: File) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div>
      <p className="text-xs font-semibold text-[#29235c] mb-1.5">
        {slot.label} {slot.required ? <span className="text-red-500">*</span> : <span className="text-[#9ca3af]">(optional)</span>}
      </p>
      <div
        onClick={() => ref.current?.click()}
        className={`border-2 border-dashed rounded-xl px-4 py-5 flex flex-col items-center gap-1.5 cursor-pointer transition-colors ${file ? "border-[#009fe3] bg-[#f0f9ff]" : "border-[rgba(0,0,0,0.12)] bg-[#fafafa] hover:border-[#009fe3]/50"}`}>
        <input ref={ref} type="file" accept={slot.accept} className="hidden" onChange={e => e.target.files?.[0] && onFile(e.target.files[0])} />
        {file
          ? <><span className="text-[#009fe3] text-xl">📎</span><p className="text-[#009fe3] text-xs font-semibold text-center">{file.name}</p></>
          : <><span className="text-[#9ca3af] text-xl">☁️</span><p className="text-[#9ca3af] text-xs">Click to upload · PDF, JPG, PNG</p></>}
      </div>
    </div>
  );
}

function CaseStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    VERIFIED: "bg-green-50 text-green-700 border-green-200",
    IN_PROGRESS: "bg-blue-50 text-blue-700 border-blue-200",
    PENDING_CONSENT: "bg-amber-50 text-amber-700 border-amber-200",
    FLAGGED: "bg-red-50 text-red-700 border-red-200",
    QUEUED: "bg-purple-50 text-purple-700 border-purple-200",
  };
  const labels: Record<string, string> = {
    VERIFIED: "Verified ✓", IN_PROGRESS: "In Progress", PENDING_CONSENT: "Awaiting Consent", FLAGGED: "Flagged ⚠", QUEUED: "In Queue",
  };
  return <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${styles[status] ?? ""}`}>{labels[status] ?? status}</span>;
}

export default function VerifyDesk() {
  const [stage, setStage] = useState<VerifyStage>("list");
  const [cases, setCases] = useState<Case[]>(INITIAL_CASES as Case[]);
  const [selectedTierId, setSelectedTierId] = useState("TIER_1");
  const [step, setStep] = useState(1);

  // Tier 1 fields
  const [candidateName, setCandidateName] = useState("");
  const [nin, setNin] = useState("");
  const [bvn, setBvn] = useState("");
  // Tier 3 extra
  const [address, setAddress] = useState("");
  const [lga, setLga] = useState("");
  const [guarantorName, setGuarantorName] = useState("");
  const [guarantorPhone, setGuarantorPhone] = useState("");
  const [guarantorRel, setGuarantorRel] = useState("");
  // Files
  const [files, setFiles] = useState<Record<string, File>>({});
  // NDPA consent
  const [ndpaConsent, setNdpaConsent] = useState(false);
  const [consentTime] = useState(new Date().toLocaleString());
  const [error, setError] = useState("");
  const [viewCase, setViewCase] = useState<Case | null>(null);

  const tier = TIERS.find(t => t.id === selectedTierId)!;

  const resetForm = () => {
    setStep(1); setCandidateName(""); setNin(""); setBvn(""); setAddress(""); setLga("");
    setGuarantorName(""); setGuarantorPhone(""); setGuarantorRel(""); setFiles({}); setNdpaConsent(false); setError("");
  };

  const setFile = (key: string, f: File) => setFiles(prev => ({ ...prev, [key]: f }));

  const validateStep1 = () => {
    if (!candidateName.trim()) return "Candidate full name is required.";
    if (selectedTierId === "TIER_1") {
      if (nin.length !== 11) return "NIN must be exactly 11 digits.";
      if (bvn.length !== 11) return "BVN must be exactly 11 digits.";
      if (!files["govt_id"]) return "Government-issued ID document is required for Tier 1.";
    }
    if (selectedTierId === "TIER_2") {
      if (!files["degree"]) return "Degree / HND certificate is required.";
      if (!files["nysc"]) return "NYSC certificate or exemption letter is required.";
    }
    if (selectedTierId === "TIER_3") {
      if (!address.trim()) return "Residential address is required.";
      if (!lga.trim()) return "Local Government Area is required.";
      if (!files["utility_bill"]) return "Utility bill or lease agreement is required.";
      if (!guarantorName.trim()) return "Guarantor full name is required.";
      if (!guarantorPhone.trim()) return "Guarantor phone number is required.";
      if (!files["guarantor_id"]) return "Guarantor government-issued ID is required.";
    }
    return null;
  };

  const advanceToConsent = () => {
    const err = validateStep1();
    if (err) { setError(err); return; }
    setError("");
    setStep(2);
  };

  const submitCheck = () => {
    if (!ndpaConsent) { setError("Candidate NDPA 2023 consent is mandatory. Please confirm the checkbox."); return; }
    setError("");
    setStage("processing");
    if (selectedTierId === "TIER_1") {
      setTimeout(() => {
        const newCase: Case = {
          id: `CHK-00${cases.length + 4}`,
          name: candidateName,
          nin: `****${nin.slice(-4)}`,
          tier: selectedTierId,
          status: "VERIFIED",
          date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
          result: { ninMatch: true, bvnMatch: true, dob: "1993-07-22" },
        };
        setCases(prev => [newCase, ...prev]);
        setViewCase(newCase);
        setStage("result");
        resetForm();
      }, 2800);
    } else {
      const newCase: Case = {
        id: `CHK-00${cases.length + 4}`,
        name: candidateName,
        nin: nin ? `****${nin.slice(-4)}` : "N/A",
        tier: selectedTierId,
        status: "QUEUED",
        date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
        result: null,
      };
      setTimeout(() => {
        setCases(prev => [newCase, ...prev]);
        setStage("queued");
        resetForm();
      }, 1200);
    }
  };

  return (
    <DashboardShell>
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-[#29235c] text-2xl">Hirely Verify Desk</h1>
            <p className="text-[#6b7280] text-sm mt-0.5">NDPA-compliant background checks · Three-tier verification engine</p>
          </div>
          {stage === "list" && (
            <button onClick={() => { resetForm(); setSelectedTierId("TIER_1"); setStage("select_tier"); }}
              className="bg-[#009fe3] text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-[#0090cc] transition-colors cursor-pointer whitespace-nowrap">
              + New Check
            </button>
          )}
          {(stage !== "list") && (
            <button onClick={() => { setStage("list"); resetForm(); }}
              className="border border-[rgba(0,0,0,0.1)] text-[#29235c] font-bold text-sm px-4 py-2.5 rounded-xl hover:border-[#29235c] transition-colors cursor-pointer whitespace-nowrap">
              ← Back
            </button>
          )}
        </div>

        {/* Legal disclaimer */}
        <div className="bg-[#29235c]/5 border border-[#29235c]/20 rounded-xl px-5 py-3">
          <p className="text-[#29235c] text-xs leading-relaxed"><span className="font-bold">⚖️ Legal: </span>{DISCLAIMER}</p>
        </div>

        {/* ─── STAGE: LIST ─── */}
        {stage === "list" && (
          <>
            {/* Tier cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {TIERS.map(t => (
                <div key={t.id} className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] p-5 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white" style={{ background: t.color }}>{t.badge}</span>
                    <span className="font-black text-sm" style={{ color: t.color }}>{t.price}</span>
                  </div>
                  <p className="font-['Raleway:Bold',sans-serif] font-bold text-[#29235c] text-sm mt-1">{t.label}</p>
                  <p className="text-[#9ca3af] text-xs">{t.desc}</p>
                  <ul className="flex flex-col gap-0.5 mt-auto pt-2">
                    {t.checks.map(ch => <li key={ch} className="text-[#374151] text-xs flex gap-1.5"><span className="text-green-500">✓</span>{ch}</li>)}
                  </ul>
                </div>
              ))}
            </div>

            {/* Cases */}
            <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] overflow-hidden">
              <div className="px-6 py-4 border-b border-[rgba(0,0,0,0.06)] flex items-center justify-between">
                <p className="font-['Raleway:Bold',sans-serif] font-bold text-[#29235c]">Verification Cases</p>
                <span className="text-xs text-[#9ca3af]">{cases.length} total</span>
              </div>
              <div className="divide-y divide-[rgba(0,0,0,0.04)]">
                {cases.map(c => (
                  <div key={c.id} className="flex items-center justify-between px-6 py-4 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#29235c]/10 flex items-center justify-center font-black text-[#29235c] text-xs">{c.name.charAt(0)}</div>
                      <div>
                        <p className="font-semibold text-[#29235c] text-sm">{c.name}</p>
                        <p className="text-[#9ca3af] text-xs">{c.id} · {c.tier.replace("_", " ")} · {c.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <CaseStatusBadge status={c.status} />
                      {c.status === "VERIFIED" && (
                        <button onClick={() => { setViewCase(c); setStage("result"); }}
                          className="text-xs text-[#009fe3] font-semibold hover:underline cursor-pointer">View Report</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ─── STAGE: SELECT TIER ─── */}
        {stage === "select_tier" && (
          <div className="flex flex-col gap-4">
            <p className="font-['Raleway:Bold',sans-serif] font-bold text-[#29235c]">Select Verification Tier</p>
            {TIERS.map(t => (
              <label key={t.id}
                className={`flex gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${selectedTierId === t.id ? "border-[#009fe3] bg-[#f0f9ff]" : "border-[rgba(0,0,0,0.08)] bg-white hover:border-[#009fe3]/40"}`}>
                <input type="radio" name="tier" value={t.id} checked={selectedTierId === t.id}
                  onChange={() => setSelectedTierId(t.id)} className="mt-1 accent-[#009fe3] shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <p className="font-bold text-[#29235c] text-sm">{t.label}</p>
                    <span className="font-black text-sm" style={{ color: t.color }}>{t.price}</span>
                  </div>
                  <p className="text-[#6b7280] text-xs mt-0.5">SLA: {t.sla}</p>
                  <p className="text-[#6b7280] text-xs mt-1">{t.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {t.checks.map(ch => <span key={ch} className="text-[10px] font-semibold px-2 py-0.5 rounded" style={{ background: `${t.color}15`, color: t.color }}>{ch}</span>)}
                  </div>
                </div>
              </label>
            ))}
            <button onClick={() => setStage("intake")}
              className="bg-[#29235c] text-white font-bold py-3 rounded-xl hover:bg-[#1e1656] transition-colors cursor-pointer mt-2">
              Continue with {tier.label} →
            </button>
          </div>
        )}

        {/* ─── STAGE: INTAKE ─── */}
        {stage === "intake" && (
          <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] p-6 md:p-8 flex flex-col gap-6">
            {/* Progress */}
            <div className="flex items-center gap-3">
              {["Candidate Data", "NDPA Consent"].map((s, i) => (
                <div key={s} className="flex items-center gap-2 flex-1">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${step > i + 1 ? "bg-green-500 text-white" : step === i + 1 ? "bg-[#29235c] text-white" : "bg-[#f3f3f3] text-[#9ca3af]"}`}>{step > i + 1 ? "✓" : i + 1}</div>
                  <p className={`text-xs font-semibold ${step === i + 1 ? "text-[#29235c]" : "text-[#9ca3af]"}`}>{s}</p>
                  {i < 1 && <div className="flex-1 h-px bg-[rgba(0,0,0,0.08)]" />}
                </div>
              ))}
            </div>

            {/* Step 1 — Candidate Data */}
            {step === 1 && (
              <div className="flex flex-col gap-5">
                <div>
                  <p className="font-['Raleway:Bold',sans-serif] font-bold text-[#29235c] text-base">{tier.label}</p>
                  <p className="text-[#9ca3af] text-xs mt-0.5">{tier.desc}</p>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#29235c] mb-1.5 block">Candidate full name <span className="text-red-500">*</span></label>
                  <input value={candidateName} onChange={e => setCandidateName(e.target.value)}
                    className="w-full border border-[rgba(0,0,0,0.12)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#009fe3] focus:ring-2 focus:ring-[#009fe3]/20"
                    placeholder="e.g. Emeka Chukwuemeka Eze" />
                </div>

                {/* TIER 1 fields */}
                {selectedTierId === "TIER_1" && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-[#29235c] mb-1.5 block">NIN (11 digits) <span className="text-red-500">*</span></label>
                        <input value={nin} onChange={e => setNin(e.target.value.replace(/\D/g, "").slice(0, 11))} maxLength={11}
                          className="w-full border border-[rgba(0,0,0,0.12)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#009fe3] focus:ring-2 focus:ring-[#009fe3]/20 font-mono tracking-widest"
                          placeholder="12345678901" />
                        <p className="text-[#9ca3af] text-[10px] mt-1">National Identity Number via NIMC</p>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-[#29235c] mb-1.5 block">BVN (11 digits) <span className="text-red-500">*</span></label>
                        <input value={bvn} onChange={e => setBvn(e.target.value.replace(/\D/g, "").slice(0, 11))} maxLength={11}
                          className="w-full border border-[rgba(0,0,0,0.12)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#009fe3] focus:ring-2 focus:ring-[#009fe3]/20 font-mono tracking-widest"
                          placeholder="22456789012" />
                        <p className="text-[#9ca3af] text-[10px] mt-1">Bank Verification Number via NIBSS</p>
                      </div>
                    </div>
                    {TIER1_FILES.map(slot => <FileDropzone key={slot.key} slot={slot} file={files[slot.key] ?? null} onFile={f => setFile(slot.key, f)} />)}
                  </>
                )}

                {/* TIER 2 fields */}
                {selectedTierId === "TIER_2" && (
                  <div className="flex flex-col gap-4">
                    <p className="text-xs text-[#6b7280] bg-purple-50 border border-purple-200 rounded-xl px-4 py-3">
                      📋 Upload the following documents. They will be routed to the Super Admin Queue for institutional verification.
                    </p>
                    {TIER2_FILES.map(slot => <FileDropzone key={slot.key} slot={slot} file={files[slot.key] ?? null} onFile={f => setFile(slot.key, f)} />)}
                  </div>
                )}

                {/* TIER 3 fields */}
                {selectedTierId === "TIER_3" && (
                  <div className="flex flex-col gap-5">
                    <p className="text-xs text-[#6b7280] bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                      📍 A field agent will be dispatched to the address provided with GPS tagging. An automated SMS will be sent to the listed guarantor.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <label className="text-xs font-semibold text-[#29235c] mb-1.5 block">Residential address <span className="text-red-500">*</span></label>
                        <input value={address} onChange={e => setAddress(e.target.value)}
                          className="w-full border border-[rgba(0,0,0,0.12)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#009fe3] focus:ring-2 focus:ring-[#009fe3]/20"
                          placeholder="12 Adeola Odeku Street, Victoria Island" />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-[#29235c] mb-1.5 block">Local Government Area <span className="text-red-500">*</span></label>
                        <input value={lga} onChange={e => setLga(e.target.value)}
                          className="w-full border border-[rgba(0,0,0,0.12)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#009fe3] focus:ring-2 focus:ring-[#009fe3]/20"
                          placeholder="Eti-Osa, Lagos" />
                      </div>
                      <div className="flex items-end">
                        <div className="w-full bg-[#f8f8fb] border border-[rgba(0,0,0,0.08)] rounded-xl px-4 py-3 flex items-center gap-2 text-xs text-[#9ca3af]">
                          <span>📍</span> GPS coordinates auto-captured on field agent visit
                        </div>
                      </div>
                    </div>

                    {TIER3_FILES.map(slot => <FileDropzone key={slot.key} slot={slot} file={files[slot.key] ?? null} onFile={f => setFile(slot.key, f)} />)}

                    <div className="border-t border-[rgba(0,0,0,0.06)] pt-4">
                      <p className="font-semibold text-[#29235c] text-sm mb-4">Guarantor Details</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold text-[#29235c] mb-1.5 block">Guarantor full name <span className="text-red-500">*</span></label>
                          <input value={guarantorName} onChange={e => setGuarantorName(e.target.value)}
                            className="w-full border border-[rgba(0,0,0,0.12)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#009fe3] focus:ring-2 focus:ring-[#009fe3]/20"
                            placeholder="Mrs. Ngozi Eze" />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-[#29235c] mb-1.5 block">Guarantor phone <span className="text-red-500">*</span></label>
                          <input value={guarantorPhone} onChange={e => setGuarantorPhone(e.target.value)}
                            className="w-full border border-[rgba(0,0,0,0.12)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#009fe3] focus:ring-2 focus:ring-[#009fe3]/20"
                            placeholder="08012345678" />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-[#29235c] mb-1.5 block">Relationship</label>
                          <select value={guarantorRel} onChange={e => setGuarantorRel(e.target.value)}
                            className="w-full border border-[rgba(0,0,0,0.12)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#009fe3] bg-white">
                            <option value="">Select…</option>
                            {["Family Member", "Former Employer", "Community Leader", "Religious Leader", "Friend"].map(r => <option key={r}>{r}</option>)}
                          </select>
                        </div>
                        <div className="flex items-end">
                          <div className="w-full bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-xs text-green-700">
                            ✉️ Automated SMS sign-off link sent to guarantor phone via Termii on submission
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {error && <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">{error}</p>}

                <button onClick={advanceToConsent}
                  className="bg-[#29235c] text-white font-bold py-3 rounded-xl hover:bg-[#1e1656] transition-colors cursor-pointer">
                  Continue to Consent Gate →
                </button>
              </div>
            )}

            {/* Step 2 — NDPA Consent */}
            {step === 2 && (
              <div className="flex flex-col gap-5">
                <div>
                  <p className="font-['Raleway:Bold',sans-serif] font-bold text-[#29235c] text-base">Mandatory NDPA 2023 Consent Gate</p>
                  <p className="text-[#9ca3af] text-xs mt-0.5">This consent is legally required under the Nigeria Data Protection Act 2023 before any verification may proceed.</p>
                </div>

                <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-600 text-lg">⚠️</span>
                    <p className="font-bold text-amber-800 text-sm">Consent Required Before Submission</p>
                  </div>
                  <p className="text-amber-800 text-xs leading-relaxed">
                    By proceeding, you confirm that <strong>{candidateName || "the candidate"}</strong> has been fully informed of and has given explicit written consent for Hirely and its verification partners to:
                  </p>
                  <ul className="text-amber-800 text-xs space-y-1 ml-4 list-disc">
                    <li>Access and process their identity numbers (NIN/BVN) via NIMC and NIBSS databases</li>
                    <li>Store uploaded documents in a private, encrypted secure bucket</li>
                    <li>Share verification outcomes with the requesting employer only</li>
                    <li>Retain audit logs for a minimum of 5 years per NDPA 2023 Section 25</li>
                  </ul>
                  <label className="flex gap-3 items-start cursor-pointer mt-2 bg-white rounded-xl p-4 border border-amber-300">
                    <input type="checkbox" checked={ndpaConsent} onChange={e => setNdpaConsent(e.target.checked)} className="mt-0.5 accent-[#009fe3] w-4 h-4 shrink-0" />
                    <span className="text-xs text-[#374151] leading-relaxed font-medium">
                      I hereby confirm that <strong>{candidateName || "the candidate"}</strong> has granted explicit consent under the{" "}
                      <span className="text-[#009fe3] font-bold">Nigeria Data Protection Act (NDPA 2023)</span> for Hirely and its verification partners to process their personal data, identity numbers, and uploaded documents strictly for employment verification purposes.
                      <span className="block text-[#9ca3af] mt-1 text-[10px]">Consent timestamp: {consentTime}</span>
                    </span>
                  </label>
                </div>

                <div className="bg-[#f8f8fb] rounded-xl p-4 border border-[rgba(0,0,0,0.06)]">
                  <p className="text-xs font-bold text-[#29235c] mb-2">Submission Summary</p>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-[#6b7280]">
                    <span>Candidate:</span><span className="text-[#29235c] font-semibold">{candidateName}</span>
                    <span>Tier:</span><span className="text-[#29235c] font-semibold">{tier.label}</span>
                    <span>Cost:</span><span style={{ color: tier.color }} className="font-bold">{tier.price}</span>
                    <span>SLA:</span><span className="text-[#29235c]">{tier.sla}</span>
                  </div>
                </div>

                {error && <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">{error}</p>}

                <div className="flex gap-3">
                  <button onClick={() => { setStep(1); setError(""); }}
                    className="border border-[rgba(0,0,0,0.1)] text-[#29235c] font-bold text-sm px-5 py-3 rounded-xl hover:border-[#29235c] cursor-pointer">
                    ← Back
                  </button>
                  <button onClick={submitCheck}
                    className="flex-1 bg-[#009fe3] text-white font-bold py-3 rounded-xl hover:bg-[#0090cc] transition-colors cursor-pointer">
                    Submit Verification Request
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─── STAGE: PROCESSING ─── */}
        {stage === "processing" && (
          <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] p-10 flex flex-col items-center gap-5 text-center">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-4 border-[#009fe3]/20" />
              <div className="absolute inset-0 rounded-full border-4 border-[#009fe3] border-t-transparent animate-spin" />
            </div>
            <div>
              <p className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-[#29235c] text-xl">Querying NIMC & NIBSS…</p>
              <p className="text-[#6b7280] text-sm mt-1">Running identity lookup via QoreID · This takes 2–3 seconds</p>
            </div>
            <div className="flex flex-col gap-2 w-full max-w-xs text-left">
              {["Connecting to NIMC NIN database", "Validating BVN via NIBSS", "Cross-referencing name & date of birth"].map((s, i) => (
                <div key={s} className="flex items-center gap-2 text-xs text-[#6b7280]">
                  <span className="w-4 h-4 rounded-full bg-[#009fe3] flex items-center justify-center text-white text-[8px] shrink-0 animate-pulse" style={{ animationDelay: `${i * 0.4}s` }}>✓</span>
                  {s}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── STAGE: RESULT (Tier 1 verified) ─── */}
        {stage === "result" && viewCase && (
          <div className="flex flex-col gap-4">
            <div className="bg-green-50 border-2 border-green-300 rounded-2xl p-6 flex flex-col gap-4">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-green-500 flex items-center justify-center text-white text-2xl shrink-0">🛡️</div>
                <div>
                  <p className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-green-800 text-xl">Identity Verified</p>
                  <p className="text-green-700 text-sm mt-0.5">NIN and BVN have been successfully cross-referenced against NIMC and NIBSS databases.</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                {[
                  { label: "NIN Status", value: "✓ Matched", ok: true },
                  { label: "BVN Status", value: "✓ Matched", ok: true },
                  { label: "Name Match", value: "✓ Confirmed", ok: true },
                  { label: "Date of Birth", value: viewCase.result?.dob ?? "—", ok: true },
                  { label: "Case ID", value: viewCase.id, ok: null },
                  { label: "NIN (masked)", value: viewCase.nin, ok: null },
                ].map(r => (
                  <div key={r.label} className="bg-white rounded-xl p-3 border border-green-200">
                    <p className="text-[#9ca3af] text-[10px] font-semibold">{r.label}</p>
                    <p className={`text-sm font-bold mt-0.5 ${r.ok === true ? "text-green-700" : r.ok === false ? "text-red-600" : "text-[#29235c]"}`}>{r.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Audit trail */}
            <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] overflow-hidden">
              <div className="px-6 py-3 border-b border-[rgba(0,0,0,0.06)] bg-[#f8f8fb]">
                <p className="font-bold text-[#29235c] text-xs uppercase tracking-wide">Audit Log — Section 84, Evidence Act 2011</p>
              </div>
              <div className="divide-y divide-[rgba(0,0,0,0.04)]">
                {[
                  { action: "CONSENT_RECORDED", note: "NDPA 2023 consent timestamped and saved" },
                  { action: "NIN_LOOKUP_SUCCESS", note: "NIMC API returned positive match for NIN" },
                  { action: "BVN_LOOKUP_SUCCESS", note: "NIBSS API confirmed BVN name match" },
                  { action: "REPORT_GENERATED", note: "PDF report created and stored in secure bucket" },
                ].map((log, i) => (
                  <div key={i} className="flex items-start gap-3 px-5 py-3 text-xs">
                    <span className="font-mono text-[#9ca3af] shrink-0">{new Date().toLocaleTimeString()}</span>
                    <span className="font-bold text-[#009fe3] font-mono shrink-0">{log.action}</span>
                    <span className="text-[#6b7280]">{log.note}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-[#29235c]/5 border border-[#29235c]/20 rounded-xl px-5 py-4">
              <p className="text-[#29235c] text-xs leading-relaxed font-medium">{DISCLAIMER}</p>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 border-2 border-[#29235c] text-[#29235c] font-bold py-3 rounded-xl hover:bg-[#29235c] hover:text-white transition-colors cursor-pointer">
                ⬇ Download PDF Report
              </button>
              <button onClick={() => { setStage("list"); setViewCase(null); }}
                className="flex-1 bg-[#009fe3] text-white font-bold py-3 rounded-xl hover:bg-[#0090cc] transition-colors cursor-pointer">
                Back to Cases
              </button>
            </div>
          </div>
        )}

        {/* ─── STAGE: QUEUED (Tier 2 / 3) ─── */}
        {stage === "queued" && (
          <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] p-8 flex flex-col items-center gap-4 text-center">
            <span className="text-5xl">{selectedTierId === "TIER_3" ? "📍" : "📋"}</span>
            <div>
              <h2 className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-[#29235c] text-xl">
                {selectedTierId === "TIER_2" ? "Documents Queued for Review" : "Field Agent Dispatch Scheduled"}
              </h2>
              <p className="text-[#6b7280] text-sm mt-1 max-w-sm">
                {selectedTierId === "TIER_2"
                  ? "Uploaded documents have been routed to the Super Admin verification queue. Institutional portal checks will begin within 24 hours."
                  : "A field agent has been dispatched. An automated SMS sign-off link has been sent to the guarantor's phone via Termii. Expected completion in 5–7 business days."}
              </p>
            </div>
            <div className="text-xs text-[#6b7280] bg-[#f8f8fb] rounded-xl px-5 py-3 max-w-sm">SLA: <span className="font-bold text-[#29235c]">{tier.sla}</span></div>
            <p className="text-[10px] text-[#9ca3af] max-w-sm leading-relaxed">{DISCLAIMER}</p>
            <button onClick={() => setStage("list")}
              className="bg-[#009fe3] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#0090cc] transition-colors cursor-pointer mt-2">
              Back to Cases
            </button>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
