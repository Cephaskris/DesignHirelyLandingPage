import { useState } from "react";
import DashboardShell from "@/components/ui/DashboardShell";

const MOCK_OFFERS = [
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
  },
  {
    id: 3, company: "TechBridge Solutions", role: "IT Support Technician",
    salary: "₦120,000", location: "Remote", meetingType: "VIRTUAL",
    status: "DECLINED", date: "Aug 12, 2026",
    desc: "Level 1 IT support for a remote-first SaaS company. Handle tickets, setup devices, and troubleshoot network issues.",
  },
];

export default function OffersHub() {
  const [selected, setSelected] = useState<number | null>(1);
  const [offers, setOffers] = useState(MOCK_OFFERS);

  const selectedOffer = offers.find(o => o.id === selected);

  const respond = (id: number, decision: "ACCEPTED" | "DECLINED") => {
    setOffers(prev => prev.map(o => o.id === id ? { ...o, status: decision } : o));
  };

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
              {selectedOffer.status === "ACCEPTED" && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                  <p className="text-green-700 font-semibold text-sm">✅ You accepted this offer. The employer will contact you shortly.</p>
                </div>
              )}
              {selectedOffer.status === "DECLINED" && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                  <p className="text-red-700 font-semibold text-sm">You declined this offer.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}

function StatusPill({ status }: { status: string }) {
  const styles: Record<string, string> = {
    PENDING: "bg-amber-50 text-amber-700 border-amber-200",
    ACCEPTED: "bg-green-50 text-green-700 border-green-200",
    DECLINED: "bg-red-50 text-red-700 border-red-200",
  };
  return <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border shrink-0 ${styles[status] ?? ""}`}>{status}</span>;
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#f8f8fb] rounded-xl p-3">
      <p className="text-[#9ca3af] text-[11px] font-semibold uppercase tracking-wide">{label}</p>
      <p className="text-[#29235c] text-sm font-semibold mt-0.5">{value}</p>
    </div>
  );
}
