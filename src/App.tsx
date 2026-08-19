import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { AppDataProvider } from "@/context/AppDataContext";
import LandingPage from "./LandingPage";

import Login from "@/pages/auth/Login";
import SignUp from "@/pages/auth/SignUp";

import EmployeeDashboard from "@/pages/employee/EmployeeDashboard";
import VideoStudio from "@/pages/employee/VideoStudio";
import OffersHub from "@/pages/employee/OffersHub";

import EmployerDashboard from "@/pages/employer/EmployerDashboard";
import CandidateSearch from "@/pages/employer/CandidateSearch";
import VerifyDesk from "@/pages/employer/VerifyDesk";
import Wallet from "@/pages/employer/Wallet";
import LaunchHub from "@/pages/employer/LaunchHub";

import AdminDashboard from "@/pages/admin/AdminDashboard";
import RoleManager from "@/pages/admin/RoleManager";
import PricingEngine from "@/pages/admin/PricingEngine";
import MatchingConcierge from "@/pages/admin/MatchingConcierge";
import AuditDesk from "@/pages/admin/AuditDesk";

function RequireAuth({ children, role }: { children: React.ReactNode; role?: string }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      <Route path="/employee" element={<RequireAuth role="EMPLOYEE"><EmployeeDashboard /></RequireAuth>} />
      <Route path="/employee/studio" element={<RequireAuth role="EMPLOYEE"><VideoStudio /></RequireAuth>} />
      <Route path="/employee/offers" element={<RequireAuth role="EMPLOYEE"><OffersHub /></RequireAuth>} />

      <Route path="/employer" element={<RequireAuth role="EMPLOYER"><EmployerDashboard /></RequireAuth>} />
      <Route path="/employer/candidates" element={<RequireAuth role="EMPLOYER"><CandidateSearch /></RequireAuth>} />
      <Route path="/employer/verify" element={<RequireAuth role="EMPLOYER"><VerifyDesk /></RequireAuth>} />
      <Route path="/employer/wallet" element={<RequireAuth role="EMPLOYER"><Wallet /></RequireAuth>} />
      <Route path="/employer/launch" element={<RequireAuth role="EMPLOYER"><LaunchHub /></RequireAuth>} />

      <Route path="/admin" element={<RequireAuth role="SUPER_ADMIN"><AdminDashboard /></RequireAuth>} />
      <Route path="/admin/roles" element={<RequireAuth role="SUPER_ADMIN"><RoleManager /></RequireAuth>} />
      <Route path="/admin/pricing" element={<RequireAuth role="SUPER_ADMIN"><PricingEngine /></RequireAuth>} />
      <Route path="/admin/matching" element={<RequireAuth role="SUPER_ADMIN"><MatchingConcierge /></RequireAuth>} />
      <Route path="/admin/audit" element={<RequireAuth role="SUPER_ADMIN"><AuditDesk /></RequireAuth>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppDataProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </AppDataProvider>
    </BrowserRouter>
  );
}
