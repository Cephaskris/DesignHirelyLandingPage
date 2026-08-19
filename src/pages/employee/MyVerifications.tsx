import { useState, useRef } from "react";
import DashboardShell from "@/components/ui/DashboardShell";

const DISCLAIMER = "STATEMENT OF NON-ADVISORY ROLE: Hirely Verification Services provides factual data verification only and does not make employment or hiring decisions on behalf of the client.";

type DocStatus = "REQUIRED" | "UPLOADED" | "VERIFIED" | "REJECTED";
type CaseStatus = "AWAITING_DOCS" | "UNDER_REVIEW" | "VERIFIED" | "REJECTED";

interface DocSlot {
  key: string;
  label: string;
  hint: string;
  status: DocStatus;
  fileName?: string;
}

interface VerifyCase {
  id: string;
  employer: string;
  tier: "TIER_1" | "TIER_2" | "TIER_3";
  status: CaseStatus;
  requestedAt: string;
  consentGiven: boolean;
  docs: DocSlot[];
}

const MOCK_CASES: VerifyCase[] = [
  {
    id: "CHK-002",
    employer: "QuickServe Nigeria",
    tier: "TIER_2",
    status: "AWAITING_DOCS",
    requestedAt: "Aug 17, 2026",
    consentGiven: false,
    docs: [
      { key: "degree", label: "Degree / HND Certificate", hint: "Upload a clear scan or photo of your certificate", status: "REQUIRED" },
      { key: "nysc", label: "NYSC Certificate or Exemption Letter", hint: "Discharge certificate or exemption letter from NYSC", status: "REQUIRED" },
      { key: "prof_cert", label: "Professional Certification (if any)", hint: "Optional — any relevant professional license", status: "REQUIRED" },
    ],
  },
  {
    id: "CHK-005",
    employer: "NovaTech Solutions Ltd",
    tier: "TIER_1",
    status: "VERIFIED",
    requestedAt: "Aug 14, 2026",
    consentGiven: true,
    docs: [
      { key: "govt_id", label: "Government ID", hint: "", status: "VERIFIED" },
    ],
  },
  {
    id: "CHK-008",
    employer: "Lagos Logistics Hub",
    tier: "TIER_3",
    status: "AWAITING_DOCS",
    requestedAt: "Aug 18, 2026",
    consentGiven: false,
    docs: [
      { key: "utility_bill", label: "Utility Bill or Lease Agreement", hint: "Must show your name and current address (not older than 3 months)", status: "REQUIRED" },
      { key: "guarantor_id", label: "Guarantor Government-Issued ID", hint: "Passport, Driver's License, or National ID of your guarantor", status: "UPLOADED", fileName: "guarantor_id_okafor.pdf" },
    ],
  },
];

const TIER_LABELS = { TIER_1: "Tier 1 — Identity", TIER_2: "Tier 2 — Academic", TIER_3: "Tier 3 — Field" };
const TIER_COLORS = { TIER_1: "#009fe3", TIER_2: "#7c3aed", TIER_3: "#16a34a" };

const STATUS_STYLES: Record<CaseStatus, string> = {
  AWAITING_DOCS: "bg-amber-50 text-amber-700 border-amber-200",
  UNDER_REVIEW: "bg-blue-50 text-blue-700 border-blue-200",
  VERIFIED: "bg-green-50 text-green-700 border-green-200",
  REJECTED: "bg-red-50 text-red-700 border-red-200",
};
const STATUS_LABELS: Record<CaseStatus, string> = {
  AWAITING_DOCS: "Awaiting Your Documents",
  UNDER_REVIEW: "Under Review",
  VERIFIED: "Verified ✓",
  REJECTED: "Rejected",
};

const DOC_STYLES: Record<DocStatus, string> = {
  REQUIRED: "bg-[#f3f3f3] text-[#9ca3af] border-[rgba(0,0,0,0.08)]",
  UPLOADED: "bg-blue-50 text-blue-700 border-blue-200",
  VERIFIED: "bg-green-50 text-green-700 border-green-200",
  REJECTED: "bg-red-50 text-red-600 border-red-200",
};

function DocUploadRow({ doc, onUpload }: { doc: DocSlot; onUpload: (key: string, file: File) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div className="flex items-start gap-4 py-4 border-b border-[rgba(0,0,0,0.04)] last:border-0">
      <div className="flex-1 min-w-0">
        <p className="text-[#29235c] text-sm font-semibold">{doc.label}</p>
        {doc.hint && <p className="text-[#9ca3af] text-xs mt-0.5">{doc.hint}</p>}
        {doc.fileName && <p className="text-[#009fe3] text-xs mt-1 font-semibold">📎 {doc.fileName}</p>}
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border mt-1.5 inline-block ${DOC_STYLES[doc.status]}`}>
          {doc.status}
        </span>
      </div>
      {doc.status !== "VERIFIED" && (
        <>
          <input ref={ref} type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png"
            onChange={e => { const f = e.target.files?.[0]; if (f) onUpload(doc.key, f); }} />
          <button onClick={() => ref.current?.click()}
            className={`text-xs font-bold px-3 py-2 rounded-xl cursor-pointer transition-colors whitespace-nowrap shrink-0 ${doc.status === "UPLOADED" ? "bg-[#f3f3f3] text-[#6b7280] hover:bg-[#e5e7eb]" : "bg-[#009fe3] text-white hover:bg-[#0090cc]"}`}>
            {doc.status === "UPLOADED" ? "Replace" : "Upload"}
          </button>
        </>
      )}
    </div>
  );
}

export default function MyVerifications() {
  const [cases, setCases] = useState<VerifyCase[]>(MOCK_CASES);
  const [selected, setSelected] = useState<string | null>("CHK-002");
  const [consentTimestamps, setConsentTimestamps] = useState<Record<string, string>>({});

  const activeCase = cases.find(c => c.id === selected) ?? null;

  const handleUpload = (caseId: string, key: string, file: File) => {
    setCases(prev => prev.map(c => c.id === caseId
      ? { ...c, docs: c.docs.map(d => d.key === key ? { ...d, status: "UPLOADED", fileName: file.name } : d) }
      : c
    ));
  };

  const giveConsent = (caseId: string) => {
    const ts = new Date().toLocaleString();
    setConsentTimestamps(prev => ({ ...prev, [caseId]: ts }));
    setCases(prev => prev.map(c => c.id === caseId ? { ...c, consentGiven: true } : c));
  };

  const submitDocs = (caseId: string) => {
    setCases(prev => prev.map(c => c.id === caseId ? { ...c, status: "UNDER_REVIEW" } : c));
  };

  const allUploaded = (c: VerifyCase) => c.docs.every(d => d.status !== "REQUIRED");
  const pendingCount = cases.filter(c => c.status === "AWAITING_DOCS").length;

  return (
    <DashboardShell>
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        <div>
          <h1 className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-[#29235c] text-2xl">My Verifications</h1>
          <p className="text-[#6b7280] text-sm mt-0.5">Background checks requested by employers · upload your documents to complete each check</p>
        </div>

        {pendingCount > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 flex items-center gap-3">
            <span className="text-2xl shrink-0">⚠️</span>
            <div>
              <p className="font-bold text-amber-800 text-sm">{pendingCount} verification{pendingCount > 1 ? "s" : ""} require your documents</p>
              <p className="text-amber-700 text-xs mt-0.5">Employers are waiting. Upload your documents to keep your application moving forward.</p>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-5">
          {/* Case list */}
          <div className="lg:w-72 shrink-0 flex flex-col gap-2">
            <p className="text-xs font-bold text-[#9ca3af] uppercase tracking-wide px-1">Verification Requests</p>
            {cases.map(c => (
              <div key={c.id} onClick={() => setSelected(c.id)}
                className={`bg-white rounded-2xl border-2 p-4 cursor-pointer transition-all ${selected === c.id ? "border-[#009fe3] bg-[#f0f9ff]" : "border-[rgba(0,0,0,0.06)] hover:border-[#009fe3]/40"}`}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-[#29235c] text-sm">{c.employer}</p>
                    <p className="text-[#9ca3af] text-xs mt-0.5">{c.id} · {c.requestedAt}</p>
                  </div>
                  {c.status === "AWAITING_DOCS" && (
                    <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                  )}
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ background: `${TIER_COLORS[c.tier]}18`, color: TIER_COLORS[c.tier] }}>
                    {TIER_LABELS[c.tier]}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${STATUS_STYLES[c.status]}`}>
                    {STATUS_LABELS[c.status]}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Detail panel */}
          {activeCase ? (
            <div className="flex-1 flex flex-col gap-4">
              {/* Header */}
              <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] p-5">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <p className="font-['Raleway:Bold',sans-serif] font-bold text-[#29235c] text-lg">{activeCase.employer}</p>
                    <p className="text-[#6b7280] text-sm">{activeCase.id} · Requested {activeCase.requestedAt}</p>
                    <p className="text-xs mt-1" style={{ color: TIER_COLORS[activeCase.tier] }}>
                      ● {TIER_LABELS[activeCase.tier]}
                    </p>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${STATUS_STYLES[activeCase.status]}`}>
                    {STATUS_LABELS[activeCase.status]}
                  </span>
                </div>
              </div>

              {/* Verified state */}
              {activeCase.status === "VERIFIED" && (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-6 flex flex-col items-center gap-3 text-center">
                  <span className="text-4xl">🛡️</span>
                  <p className="font-['Raleway:Bold',sans-serif] font-bold text-green-800 text-lg">Verification Complete</p>
                  <p className="text-green-700 text-sm max-w-sm">Your identity has been verified and the result has been shared with {activeCase.employer}.</p>
                  <p className="text-xs text-green-600 bg-white border border-green-200 rounded-xl px-4 py-2 max-w-sm">{DISCLAIMER}</p>
                </div>
              )}

              {/* Under review */}
              {activeCase.status === "UNDER_REVIEW" && (
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 flex items-center gap-4">
                  <span className="text-3xl shrink-0">🔍</span>
                  <div>
                    <p className="font-bold text-blue-800 text-sm">Documents under review</p>
                    <p className="text-blue-700 text-xs mt-0.5">Our team is verifying your submitted documents. This typically takes {activeCase.tier === "TIER_2" ? "3–5" : "5–7"} business days. We will notify you when complete.</p>
                  </div>
                </div>
              )}

              {/* NDPA consent gate */}
              {(activeCase.status === "AWAITING_DOCS") && !activeCase.consentGiven && (
                <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 flex flex-col gap-3">
                  <p className="font-bold text-amber-800 text-sm">⚠️ Consent Required Before You Can Upload</p>
                  <p className="text-amber-700 text-xs leading-relaxed">
                    Before uploading your documents, you must consent to their processing under the <strong>Nigeria Data Protection Act (NDPA 2023)</strong>. Your documents will be stored in an encrypted secure bucket and shared only with <strong>{activeCase.employer}</strong> for verification purposes.
                  </p>
                  <label className="flex gap-3 items-start cursor-pointer bg-white rounded-xl p-4 border border-amber-300">
                    <input type="checkbox" id={`consent-${activeCase.id}`} className="mt-0.5 accent-[#009fe3] w-4 h-4 shrink-0" />
                    <span className="text-xs text-[#374151] leading-relaxed">
                      I grant explicit consent to Hirely and its verification partners to process my personal documents and data strictly for employment verification under the <span className="text-[#009fe3] font-bold">NDPA 2023</span>.
                    </span>
                  </label>
                  <button
                    onClick={() => {
                      const cb = document.getElementById(`consent-${activeCase.id}`) as HTMLInputElement;
                      if (cb?.checked) giveConsent(activeCase.id);
                    }}
                    className="bg-[#29235c] text-white font-bold text-sm py-2.5 rounded-xl hover:bg-[#1e1656] cursor-pointer">
                    Confirm Consent & Proceed
                  </button>
                  {consentTimestamps[activeCase.id] && (
                    <p className="text-xs text-green-700 font-semibold text-center">✓ Consent recorded at {consentTimestamps[activeCase.id]}</p>
                  )}
                </div>
              )}

              {/* Document uploads */}
              {(activeCase.status === "AWAITING_DOCS" && activeCase.consentGiven) && (
                <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] overflow-hidden">
                  <div className="px-6 py-4 border-b border-[rgba(0,0,0,0.06)] bg-[#f8f8fb] flex items-center justify-between">
                    <p className="font-['Raleway:Bold',sans-serif] font-bold text-[#29235c] text-sm">Required Documents</p>
                    <p className="text-xs text-[#9ca3af]">{activeCase.docs.filter(d => d.status !== "REQUIRED").length}/{activeCase.docs.length} uploaded</p>
                  </div>
                  <div className="px-6">
                    {activeCase.docs.map(doc => (
                      <DocUploadRow key={doc.key} doc={doc}
                        onUpload={(key, file) => handleUpload(activeCase.id, key, file)} />
                    ))}
                  </div>
                </div>
              )}

              {/* Submit button */}
              {activeCase.status === "AWAITING_DOCS" && activeCase.consentGiven && (
                <button
                  onClick={() => submitDocs(activeCase.id)}
                  disabled={!allUploaded(activeCase)}
                  className="bg-[#29235c] text-white font-bold py-3 rounded-xl hover:bg-[#1e1656] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">
                  {allUploaded(activeCase) ? "Submit Documents for Review →" : `Upload all required documents first (${activeCase.docs.filter(d => d.status === "REQUIRED").length} remaining)`}
                </button>
              )}

              {/* Consent timestamp record */}
              {activeCase.consentGiven && (
                <div className="text-xs text-[#9ca3af] bg-[#f8f8fb] border border-[rgba(0,0,0,0.06)] rounded-xl px-4 py-3 flex items-start gap-2">
                  <span className="text-green-500 shrink-0">✓</span>
                  <span>NDPA 2023 consent recorded{consentTimestamps[activeCase.id] ? ` at ${consentTimestamps[activeCase.id]}` : ""}. This record is stored in the Hirely compliance audit log.</span>
                </div>
              )}

              {/* Legal disclaimer */}
              <div className="bg-[#29235c]/5 border border-[#29235c]/20 rounded-xl px-4 py-3">
                <p className="text-[#29235c] text-xs leading-relaxed"><span className="font-bold">⚖️ </span>{DISCLAIMER}</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-[#9ca3af] text-sm">
              Select a verification request to view details
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}
