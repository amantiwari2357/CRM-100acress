import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import { useState, useEffect } from "react";

import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Tickets from "./pages/Tickets";
import CreateUser from "./pages/CreateUser";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import UserManagement from "./pages/UserManagement";
import Developer from "./pages/Developer";
import DeveloperLogin from "./pages/DeveloperLogin";
import DeveloperDashboard from "./pages/DeveloperDashboard";
import ResetPassword from "./pages/ResetPassword";
import TeamEmployees from "./pages/TeamEmployees";
const queryClient = new QueryClient();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("employee");
  const [isLoading, setIsLoading] = useState(true);

  const [isDeveloperLoggedIn, setIsDeveloperLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthStatus = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      const role = localStorage.getItem("userRole") || "employee";

      const developerLoggedIn =
        localStorage.getItem("isDeveloperLoggedIn") === "true";

      setIsLoggedIn(loggedIn);
      setUserRole(role);
      setIsDeveloperLoggedIn(developerLoggedIn);

      setIsLoading(false);
    };

    checkAuthStatus();

    window.addEventListener("storage", checkAuthStatus);
    return () => {
      window.removeEventListener("storage", checkAuthStatus);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route
              path="/login"
              element={!isLoggedIn ? <Login /> : <Navigate to="/" replace />}
            />
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <Dashboard userRole={userRole} />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/leads"
              element={
                isLoggedIn ? (
                  <Leads userRole={userRole} />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/tickets"
              element={
                isLoggedIn ? (
                  <Tickets userRole={userRole} />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/create-admin"
              element={
                isLoggedIn && userRole === "super-admin" ? (
                  <CreateUser userRole={userRole} userType="admin" />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/create-leader"
              element={
                isLoggedIn && userRole === "head-admin" ? (
                  <CreateUser userRole={userRole} userType="leader" />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/create-employee"
              element={
                isLoggedIn && userRole === "team-leader" ? (
                  <CreateUser userRole={userRole} userType="employee" />
                ) : (
                  <Navigate to="/" replace />
                )
              }
              // lsahbs
            />
            <Route
              path="/users"
              element={
                isLoggedIn && userRole === "super-admin" ? (
                  <UserManagement userRole={userRole} />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/settings"
              element={
                isLoggedIn && userRole === "super-admin" ? (
                  <Settings userRole={userRole} />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/developer"
              element={
                (isLoggedIn && userRole === "super-admin") ||
                isDeveloperLoggedIn ? (
                  <Developer userRole={userRole} />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/developer-dashboard"
              element={
                isDeveloperLoggedIn ? (
                  <DeveloperDashboard />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/team"
              element={
                isLoggedIn && userRole === "head-admin" ? (
                  <div className="p-6">
                    <h1 className="text-2xl font-bold">Team Management</h1>
                    <p>Team management interface coming soon...</p>
                  </div>
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
               <Route
              path="/employees"
              element={
                (isLoggedIn && userRole === "team-leader") || isDeveloperLoggedIn ? (
                  <TeamEmployees userRole={userRole} />
                ) : (
                  <Navigate to="/" replace />
                )
              }
              />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
