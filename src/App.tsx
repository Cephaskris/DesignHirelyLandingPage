import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { AppDataProvider } from "@/context/AppDataContext";
import LandingPage from "./LandingPage";

import Login from "@/pages/auth/Login";
import SignUp from "@/pages/auth/SignUp";

import EmployeeDashboard from "@/pages/employee/EmployeeDashboard";
import VideoStudio from "@/pages/employee/VideoStudio";
import OffersHub from "@/pages/employee/OffersHub";
import ProfileBuilder from "@/pages/employee/ProfileBuilder";
import MyVerifications from "@/pages/employee/MyVerifications";

import EmployerDashboard from "@/pages/employer/EmployerDashboard";
import CandidateSearch from "@/pages/employer/CandidateSearch";
import VerifyDesk from "@/pages/employer/VerifyDesk";
import Wallet from "@/pages/employer/Wallet";
import LaunchHub from "@/pages/employer/LaunchHub";
import JobPostings from "@/pages/employer/JobPostings";
import ActiveHires from "@/pages/employer/ActiveHires";

import AdminDashboard from "@/pages/admin/AdminDashboard";
import RoleManager from "@/pages/admin/RoleManager";
import PricingEngine from "@/pages/admin/PricingEngine";
import MatchingConcierge from "@/pages/admin/MatchingConcierge";
import AuditDesk from "@/pages/admin/AuditDesk";
import VerifyQueue from "@/pages/admin/VerifyQueue";
import UserManagement from "@/pages/admin/UserManagement";
import InterviewQuestions from "@/pages/admin/InterviewQuestions";
import VideoVault from "@/pages/admin/VideoVault";

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
      <Route path="/employee/profile" element={<RequireAuth role="EMPLOYEE"><ProfileBuilder /></RequireAuth>} />
      <Route path="/employee/verifications" element={<RequireAuth role="EMPLOYEE"><MyVerifications /></RequireAuth>} />

      <Route path="/employer" element={<RequireAuth role="EMPLOYER"><EmployerDashboard /></RequireAuth>} />
      <Route path="/employer/candidates" element={<RequireAuth role="EMPLOYER"><CandidateSearch /></RequireAuth>} />
      <Route path="/employer/verify" element={<RequireAuth role="EMPLOYER"><VerifyDesk /></RequireAuth>} />
      <Route path="/employer/wallet" element={<RequireAuth role="EMPLOYER"><Wallet /></RequireAuth>} />
      <Route path="/employer/launch" element={<RequireAuth role="EMPLOYER"><LaunchHub /></RequireAuth>} />
      <Route path="/employer/postings" element={<RequireAuth role="EMPLOYER"><JobPostings /></RequireAuth>} />
      <Route path="/employer/hires" element={<RequireAuth role="EMPLOYER"><ActiveHires /></RequireAuth>} />

      <Route path="/admin" element={<RequireAuth role="SUPER_ADMIN"><AdminDashboard /></RequireAuth>} />
      <Route path="/admin/roles" element={<RequireAuth role="SUPER_ADMIN"><RoleManager /></RequireAuth>} />
      <Route path="/admin/pricing" element={<RequireAuth role="SUPER_ADMIN"><PricingEngine /></RequireAuth>} />
      <Route path="/admin/matching" element={<RequireAuth role="SUPER_ADMIN"><MatchingConcierge /></RequireAuth>} />
      <Route path="/admin/audit" element={<RequireAuth role="SUPER_ADMIN"><AuditDesk /></RequireAuth>} />
      <Route path="/admin/verify-queue" element={<RequireAuth role="SUPER_ADMIN"><VerifyQueue /></RequireAuth>} />
      <Route path="/admin/users" element={<RequireAuth role="SUPER_ADMIN"><UserManagement /></RequireAuth>} />
      <Route path="/admin/interview-questions" element={<RequireAuth role="SUPER_ADMIN"><InterviewQuestions /></RequireAuth>} />
      <Route path="/admin/video-vault" element={<RequireAuth role="SUPER_ADMIN"><VideoVault /></RequireAuth>} />

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
