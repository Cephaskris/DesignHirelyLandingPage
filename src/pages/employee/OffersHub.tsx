import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardShell from "@/components/ui/DashboardShell";

type OfferStatus = "PENDING" | "ACCEPTED" | "DECLINED";

type JourneyStep = {
  label: string;
  detail: string;
  done: boolean;
  active: boolean;
  actionLabel?: string;
  actionPath?: string;
};

interface Offer {
  id: number;
  company: string;
  role: string;
  salary: string;
  location: string;
  meetingType: string;
  status: OfferStatus;
  date: string;
  desc: string;
  interviewDate?: string;
  interviewLocation?: string;
  verificationRequested?: boolean;
  verificationComplete?: boolean;
  onboardingStarted?: boolean;
}

const MOCK_OFFERS: Offer[] = [
  {
    id: 1, company: "QuickServe Nigeria", role: "Customer Service Representative",
    salary: "₦80,000", location: "Victoria Island, Lagos", meetingType: "PHYSICAL",
    status: "PENDING", date: "Aug 18, 2026",
    desc: "We are looking for a polite, professional customer service rep to manage walk-in clients at our Lagos branch. Must be fluent in English and Yoruba.",
  },
  {
    id: 2, company: "Lagos Logistics Hub", role: "Driver / Delivery Officer",
    salary: "₦65,000", location: "Ikeja, Lagos", meetingType: "PHYSICAL",
    status: "ACCEPTED", date: "Aug 15, 2026",
    desc: "Responsible for timely delivery of parcels across metropolitan Lagos. Valid driver's license required.",
    interviewDate: "Aug 22, 2026 · 10:00 AM",
    interviewLocation: "12 Commerce Road, Ikeja",
    verificationRequested: true,
    verificationComplete: false,
    onboardingStarted: false,
  },
  {
    id: 3, company: "TechBridge Solutions", role: "IT Support Technician",
    salary: "₦120,000", location: "Remote", meetingType: "VIRTUAL",
    status: "DECLINED", date: "Aug 12, 2026",
    desc: "Level 1 IT support for a remote-first SaaS company. Handle tickets, setup devices, and troubleshoot network issues.",
  },
];

function buildJourney(offer: Offer): JourneyStep[] {
  return [
    {
      label: "Offer Received",
      detail: `You received an offer from ${offer.company} on ${offer.date}.`,
      done: true,
      active: false,
    },
    {
      label: "Offer Accepted",
      detail: "You accepted. The employer has been notified and is preparing next steps.",
      done: offer.status === "ACCEPTED",
      active: offer.status === "PENDING",
    },
    {
      label: "Identity Verification",
      detail: offer.verificationRequested
        ? offer.verificationComplete
          ? "Your identity has been verified by Hirely."
          : "The employer has requested a background check. Upload your documents to proceed."
        : "Awaiting employer's verification request.",
      done: !!offer.verificationComplete,
      active: !!offer.verificationRequested && !offer.verificationComplete,
      actionLabel: offer.verificationRequested && !offer.verificationComplete ? "Upload Documents →" : undefined,
      actionPath: "/employee/verifications",
    },
    {
      label: "Interview Scheduled",
      detail: offer.interviewDate
        ? `${offer.interviewDate}${offer.interviewLocation ? " · " + offer.interviewLocation : ""}`
        : "The employer will share interview details once verification is complete.",
      done: !!offer.interviewDate && !!offer.verificationComplete,
      active: !!offer.interviewDate && !offer.verificationComplete,
    },
    {
      label: "Onboarding",
      detail: offer.onboardingStarted
        ? "Your onboarding has begun. Welcome to the team!"
        : "Onboarding begins after your interview is confirmed.",
      done: !!offer.onboardingStarted,
      active: false,
    },
  ];
}

export default function OffersHub() {
  const [selected, setSelected] = useState<number | null>(1);
  const [offers, setOffers] = useState<Offer[]>(MOCK_OFFERS);

  const selectedOffer = offers.find(o => o.id === selected) ?? null;

  const respond = (id: number, decision: "ACCEPTED" | "DECLINED") =>
    setOffers(prev => prev.map(o => o.id === id ? { ...o, status: decision } : o));

  const journey = selectedOffer?.status === "ACCEPTED" ? buildJourney(selectedOffer) : null;

  return (
    <DashboardShell>
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        <div>
          <h1 className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-[#29235c] text-2xl">Job Offers</h1>
          <p className="text-[#6b7280] text-sm mt-0.5">Review and respond to offers from employers</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-5 min-h-[500px]">
          {/* Offer list */}
          <div className="lg:w-80 shrink-0 flex flex-col gap-2">
            {offers.map(o => (
              <button key={o.id} onClick={() => setSelected(o.id)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all cursor-pointer ${selected === o.id ? "border-[#009fe3] bg-[#f0f9ff]" : "border-[rgba(0,0,0,0.06)] bg-white hover:border-[#009fe3]/40"}`}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-[#29235c] text-sm">{o.role}</p>
                    <p className="text-[#6b7280] text-xs mt-0.5">{o.company}</p>
                  </div>
                  <StatusPill status={o.status} />
                </div>
                <p className="text-[#009fe3] text-xs font-semibold mt-2">{o.salary}/mo</p>
                {o.status === "ACCEPTED" && o.verificationRequested && !o.verificationComplete && (
                  <p className="text-amber-600 text-[10px] font-bold mt-1.5">⚠ Docs needed</p>
                )}
              </button>
            ))}
          </div>

          {/* Detail panel */}
          {selectedOffer && (
            <div className="flex-1 bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] p-6 md:p-8 flex flex-col gap-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-[#29235c] text-xl">{selectedOffer.role}</h2>
                  <p className="text-[#6b7280] text-sm mt-0.5">{selectedOffer.company}</p>
                </div>
                <StatusPill status={selectedOffer.status} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Detail label="Salary" value={`${selectedOffer.salary}/month`} />
                <Detail label="Location" value={selectedOffer.location} />
                <Detail label="Interview" value={selectedOffer.meetingType} />
                <Detail label="Received" value={selectedOffer.date} />
              </div>

              <div>
                <p className="text-xs font-semibold text-[#29235c] uppercase tracking-wide mb-2">Job Description</p>
                <p className="text-[#374151] text-sm leading-relaxed">{selectedOffer.desc}</p>
              </div>

              {/* Pending actions */}
              {selectedOffer.status === "PENDING" && (
                <div className="flex gap-3 pt-2">
                  <button onClick={() => respond(selectedOffer.id, "ACCEPTED")}
                    className="flex-1 bg-[#29235c] text-white font-bold py-3 rounded-xl hover:bg-[#1e1656] transition-colors cursor-pointer">
                    Accept Offer ✓
                  </button>
                  <button onClick={() => respond(selectedOffer.id, "DECLINED")}
                    className="flex-1 border border-[rgba(0,0,0,0.1)] text-[#6b7280] font-bold py-3 rounded-xl hover:border-red-300 hover:text-red-600 transition-colors cursor-pointer">
                    Decline
                  </button>
                </div>
              )}

              {/* Post-acceptance journey */}
              {selectedOffer.status === "ACCEPTED" && journey && (
                <div className="flex flex-col gap-1">
                  <p className="text-xs font-semibold text-[#29235c] uppercase tracking-wide mb-3">Your Journey</p>

                  {/* Urgent action banner */}
                  {selectedOffer.verificationRequested && !selectedOffer.verificationComplete && (
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center justify-between gap-4 mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-xl shrink-0">📄</span>
                        <div>
                          <p className="font-bold text-amber-800 text-sm">Action Required: Upload your documents</p>
                          <p className="text-amber-700 text-xs mt-0.5">{selectedOffer.company} has initiated a background check. Your interview will be confirmed once verification is complete.</p>
                        </div>
                      </div>
                      <Link to="/employee/verifications"
                        className="bg-amber-500 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-amber-600 transition-colors whitespace-nowrap shrink-0">
                        Upload Docs →
                      </Link>
                    </div>
                  )}

                  {/* Timeline */}
                  <div className="flex flex-col">
                    {journey.map((step, i) => (
                      <div key={i} className="flex gap-4">
                        {/* Connector column */}
                        <div className="flex flex-col items-center shrink-0 w-8">
                          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${step.done ? "bg-[#009fe3] border-[#009fe3]" : step.active ? "bg-white border-[#009fe3]" : "bg-white border-[#e5e7eb]"}`}>
                            {step.done
                              ? <svg fill="none" width="13" height="13" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                              : step.active
                                ? <div className="w-2.5 h-2.5 rounded-full bg-[#009fe3]" />
                                : <div className="w-2.5 h-2.5 rounded-full bg-[#e5e7eb]" />
                            }
                          </div>
                          {i < journey.length - 1 && (
                            <div className={`w-0.5 flex-1 my-1 min-h-[24px] ${step.done ? "bg-[#009fe3]" : "bg-[#e5e7eb]"}`} />
                          )}
                        </div>

                        {/* Step content */}
                        <div className={`pb-5 flex-1 ${i === journey.length - 1 ? "pb-0" : ""}`}>
                          <p className={`font-semibold text-sm leading-snug ${step.done ? "text-[#29235c]" : step.active ? "text-[#29235c]" : "text-[#9ca3af]"}`}>
                            {step.label}
                            {step.active && <span className="ml-2 text-[10px] font-bold text-[#009fe3] bg-[#e0f4fc] px-1.5 py-0.5 rounded-full">NOW</span>}
                          </p>
                          <p className={`text-xs mt-0.5 leading-relaxed ${step.done || step.active ? "text-[#6b7280]" : "text-[#c4c9d1]"}`}>
                            {step.detail}
                          </p>
                          {step.actionLabel && step.actionPath && (
                            <Link to={step.actionPath}
                              className="mt-2 inline-block text-xs font-bold text-[#009fe3] hover:underline">
                              {step.actionLabel}
                            </Link>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Interview card */}
                  {selectedOffer.interviewDate && (
                    <div className="bg-[#f0f9ff] border border-[#bae6fd] rounded-2xl p-4 mt-1 flex items-start gap-3">
                      <span className="text-2xl shrink-0">📅</span>
                      <div>
                        <p className="font-bold text-[#0369a1] text-sm">Interview Scheduled</p>
                        <p className="text-[#0369a1] text-xs mt-0.5 font-semibold">{selectedOffer.interviewDate}</p>
                        {selectedOffer.interviewLocation && (
                          <p className="text-[#0369a1] text-xs mt-0.5">{selectedOffer.interviewLocation}</p>
                        )}
                        <p className="text-[#0369a1]/70 text-[10px] mt-1.5">
                          {selectedOffer.meetingType === "PHYSICAL" ? "Bring a valid ID and printed CV." : "A video call link will be sent to your email."}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {selectedOffer.status === "DECLINED" && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                  <p className="text-red-700 font-semibold text-sm">You declined this offer.</p>
                  <Link to="/employee/profile" className="mt-2 inline-block text-xs text-red-600 font-bold hover:underline">
                    Update your profile to attract better matches →
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}

const StatusPill = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    PENDING: "bg-amber-50 text-amber-700 border-amber-200",
    ACCEPTED: "bg-green-50 text-green-700 border-green-200",
    DECLINED: "bg-red-50 text-red-700 border-red-200",
  };
  return <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border shrink-0 ${styles[status] ?? ""}`}>{status}</span>;
};

const Detail = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-[#f8f8fb] rounded-xl p-3">
    <p className="text-[#9ca3af] text-[11px] font-semibold uppercase tracking-wide">{label}</p>
    <p className="text-[#29235c] text-sm font-semibold mt-0.5">{value}</p>
  </div>
);
