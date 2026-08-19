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
}

const AppDataContext = createContext<AppDataContextValue | null>(null);

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [roles, setRoles] = useState<JobRole[]>(DEFAULT_ROLES);
  const [passes, setPasses] = useState<CandidatePass[]>(DEFAULT_PASSES);
  const [bundles, setBundles] = useState<CreditBundle[]>(DEFAULT_BUNDLES);
  const [pushedCandidates, setPushedCandidates] = useState<PushedCandidate[]>([]);

  const pushCandidate = (candidate: PushedCandidate) => {
    setPushedCandidates(prev => {
      const exists = prev.find(c => c.id === candidate.id && c.targetEmployerId === candidate.targetEmployerId);
      return exists ? prev : [...prev, candidate];
    });
  };

  const getPushedForEmployer = (employerId: string) =>
    pushedCandidates.filter(c => c.targetEmployerId === employerId);

  return (
    <AppDataContext.Provider value={{ roles, setRoles, passes, setPasses, bundles, setBundles, pushedCandidates, pushCandidate, getPushedForEmployer }}>
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error("useAppData must be used within AppDataProvider");
  return ctx;
}
