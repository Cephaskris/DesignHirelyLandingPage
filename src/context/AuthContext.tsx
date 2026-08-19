import { createContext, useContext, useState, type ReactNode } from "react";

export type UserRole = "EMPLOYEE" | "EMPLOYER" | "SUPER_ADMIN";

export interface User {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  role: UserRole;
  companyName?: string;
  creditBalance?: number;
  passExpiresAt?: Date | null;
  profileViews?: number;
}

interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  updateUser: (patch: Partial<User>) => void;
  activatePass: (days: number) => void;
  addCredits: (amount: number) => void;
  spendCredit: () => boolean;
}

export interface SignupData {
  email: string;
  password: string;
  fullName: string;
  phone: string;
  role: UserRole;
  companyName?: string;
  targetRoles?: string[];
}

const AuthContext = createContext<AuthContextValue | null>(null);

const DEMO_USERS: Record<string, User> = {
  "candidate@demo.com": {
    id: "emp-001",
    email: "candidate@demo.com",
    fullName: "Amara Okonkwo",
    phone: "08012345678",
    role: "EMPLOYEE",
    passExpiresAt: null,
    profileViews: 14,
  },
  "employer@demo.com": {
    id: "er-001",
    email: "employer@demo.com",
    fullName: "Chidi Nwosu",
    phone: "08098765432",
    role: "EMPLOYER",
    companyName: "NovaTech Solutions Ltd",
    creditBalance: 3,
  },
  "admin@demo.com": {
    id: "adm-001",
    email: "admin@demo.com",
    fullName: "Super Admin",
    phone: "08000000000",
    role: "SUPER_ADMIN",
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, _password: string) => {
    const found = DEMO_USERS[email.toLowerCase()];
    if (!found) throw new Error("Invalid credentials. Try a demo account.");
    setUser({ ...found });
  };

  const signup = async (data: SignupData) => {
    setUser({
      id: `new-${Date.now()}`,
      email: data.email,
      fullName: data.fullName,
      phone: data.phone,
      role: data.role,
      companyName: data.companyName,
      creditBalance: data.role === "EMPLOYER" ? 0 : undefined,
      passExpiresAt: null,
      profileViews: 0,
    });
  };

  const logout = () => setUser(null);

  const updateUser = (patch: Partial<User>) =>
    setUser(prev => prev ? { ...prev, ...patch } : null);

  const activatePass = (days: number) => {
    const expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    updateUser({ passExpiresAt: expiresAt });
  };

  const addCredits = (amount: number) =>
    setUser(prev => prev ? { ...prev, creditBalance: (prev.creditBalance ?? 0) + amount } : null);

  const spendCredit = (): boolean => {
    if (!user || (user.creditBalance ?? 0) < 1) return false;
    setUser(prev => prev ? { ...prev, creditBalance: (prev.creditBalance ?? 0) - 1 } : null);
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateUser, activatePass, addCredits, spendCredit }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
