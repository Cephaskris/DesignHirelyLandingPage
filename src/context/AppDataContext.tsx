import { createContext, useContext, useState, type ReactNode } from "react";

/* ── Job Roles ─────────────────────────────────────────────── */
export interface JobRole {
  id: number;
  title: string;
  questions: string[];
}

const DEFAULT_ROLES: JobRole[] = [
  { id: 1, title: "Customer Service Representative", questions: ["Tell us about your customer service experience.", "How do you handle a difficult or angry customer?", "Are you comfortable working shifts?"] },
  { id: 2, title: "Driver / Logistics Officer", questions: ["How many years of driving experience do you have?", "Describe a typical delivery route you have managed.", "Do you have a valid driver's license?"] },
  { id: 3, title: "Admin / Receptionist", questions: ["Walk us through your administrative skills.", "What software tools are you familiar with?", "How do you manage multiple tasks under pressure?"] },
  { id: 4, title: "Cashier / Teller", questions: ["Describe your experience handling cash or POS systems.", "How would you handle a cash discrepancy?", "How do you stay accurate under busy conditions?"] },
  { id: 5, title: "Security Guard", questions: ["What security training or certifications do you have?", "Describe a situation where you had to de-escalate a conflict.", "Are you available for overnight or rotating shifts?"] },
  { id: 6, title: "Cook / Chef", questions: ["What cuisines or cooking styles are you trained in?", "How do you maintain hygiene standards in a kitchen?", "Can you work under high-pressure service conditions?"] },
  { id: 7, title: "IT Support Technician", questions: ["What is your experience with network troubleshooting?", "Describe a hardware or software issue you resolved.", "Are you comfortable with remote support tools?"] },
  { id: 8, title: "Sales & Marketing Officer", questions: ["Tell us about your sales track record.", "How do you generate new leads?", "Describe a successful campaign or pitch you ran."] },
];

/* ── Pricing ────────────────────────────────────────────────── */
export interface CandidatePass {
  id: string;
  label: string;
  price: number;
  days: number;
}

export interface CreditBundle {
  id: string;
  label: string;
  price: number;
  credits: number;
  popular?: boolean;
}

const DEFAULT_PASSES: CandidatePass[] = [
  { id: "3day", label: "3-Day Express Pass", price: 2500, days: 3 },
  { id: "7day", label: "7-Day Active Pass", price: 5000, days: 7 },
  { id: "30day", label: "30-Day Pro Pass", price: 15000, days: 30 },
];

const DEFAULT_BUNDLES: CreditBundle[] = [
  { id: "starter", label: "Starter Bundle", price: 25000, credits: 3 },
  { id: "growth", label: "Growth Bundle", price: 75000, credits: 10, popular: true },
  { id: "enterprise", label: "Enterprise Bundle", price: 250000, credits: 40 },
];

/* ── Commission Structure ───────────────────────────────────── */
export interface CommissionStructure {
  monthlyRate: number;          // % of monthly salary charged to employer
  contractRate: number;         // % of total contract value charged once
  billingCycle: "ONGOING" | "ONE_TIME"; // ONGOING = every month, ONE_TIME = placement fee only
  gracePeriodDays: number;      // days after due date before status → OVERDUE
}

const DEFAULT_COMMISSION: CommissionStructure = {
  monthlyRate: 15,
  contractRate: 10,
  billingCycle: "ONGOING",
  gracePeriodDays: 7,
};

/* ── Talent Requests ────────────────────────────────────────── */
export interface TalentRequest {
  id: string;
  employerId: string;
  company: string;
  role: string;
  count: number;
  location: string;
  salary: string;
  notes: string;
  status: "OPEN" | "IN_PROGRESS" | "PUSHED" | "CLOSED";
  submittedAt: string;
  creditSpent: number;
}

const DEFAULT_REQUESTS: TalentRequest[] = [
  { id: "REQ-001", employerId: "er-001", company: "NovaTech Solutions Ltd", role: "Customer Service Representative", count: 3, location: "Lagos", salary: "₦70,000 – ₦90,000", notes: "Must speak Yoruba and English. Lagos only.", status: "OPEN", submittedAt: "Aug 16", creditSpent: 1 },
  { id: "REQ-002", employerId: "er-001", company: "NovaTech Solutions Ltd", role: "Driver / Logistics Officer", count: 5, location: "Ikeja, Lagos", salary: "₦60,000 – ₦75,000", notes: "Valid Lagos license. Experience with dispatch apps.", status: "IN_PROGRESS", submittedAt: "Aug 15", creditSpent: 1 },
  { id: "REQ-003", employerId: "er-001", company: "NovaTech Solutions Ltd", role: "IT Support Technician", count: 1, location: "Remote", salary: "₦100,000+", notes: "Networking skills required. Remote-friendly.", status: "PUSHED", submittedAt: "Aug 14", creditSpent: 1 },
];

/* ── Pushed Candidates ──────────────────────────────────────── */
export interface PushedCandidate {
  id: number;
  name: string;
  role: string;
  location: string;
  score: number;
  targetEmployerId: string;
  pushedAt: string;
}

/* ── Context ────────────────────────────────────────────────── */
interface AppDataContextValue {
  roles: JobRole[];
  setRoles: (roles: JobRole[]) => void;

  passes: CandidatePass[];
  setPasses: (passes: CandidatePass[]) => void;

  bundles: CreditBundle[];
  setBundles: (bundles: CreditBundle[]) => void;

  pushedCandidates: PushedCandidate[];
  pushCandidate: (candidate: PushedCandidate) => void;
  getPushedForEmployer: (employerId: string) => PushedCandidate[];

  talentRequests: TalentRequest[];
  addTalentRequest: (req: TalentRequest) => void;
  updateRequestStatus: (id: string, status: TalentRequest["status"]) => void;

  commission: CommissionStructure;
  setCommission: (c: CommissionStructure) => void;
}

const AppDataContext = createContext<AppDataContextValue | null>(null);

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [roles, setRoles] = useState<JobRole[]>(DEFAULT_ROLES);
  const [passes, setPasses] = useState<CandidatePass[]>(DEFAULT_PASSES);
  const [bundles, setBundles] = useState<CreditBundle[]>(DEFAULT_BUNDLES);
  const [pushedCandidates, setPushedCandidates] = useState<PushedCandidate[]>([]);
  const [talentRequests, setTalentRequests] = useState<TalentRequest[]>(DEFAULT_REQUESTS);
  const [commission, setCommission] = useState<CommissionStructure>(DEFAULT_COMMISSION);

  const pushCandidate = (candidate: PushedCandidate) => {
    setPushedCandidates(prev => {
      const exists = prev.find(c => c.id === candidate.id && c.targetEmployerId === candidate.targetEmployerId);
      return exists ? prev : [...prev, candidate];
    });
  };

  const getPushedForEmployer = (employerId: string) =>
    pushedCandidates.filter(c => c.targetEmployerId === employerId);

  const addTalentRequest = (req: TalentRequest) =>
    setTalentRequests(prev => [req, ...prev]);

  const updateRequestStatus = (id: string, status: TalentRequest["status"]) =>
    setTalentRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));

  return (
    <AppDataContext.Provider value={{ roles, setRoles, passes, setPasses, bundles, setBundles, pushedCandidates, pushCandidate, getPushedForEmployer, talentRequests, addTalentRequest, updateRequestStatus, commission, setCommission }}>
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error("useAppData must be used within AppDataProvider");
  return ctx;
}
