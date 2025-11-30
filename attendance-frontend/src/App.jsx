import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import EmployeeDashboard from "./pages/Employee/EmployeeDashboard";
import ManagerDashboard from "./pages/Manager/ManagerDashboard";
import MarkAttendance from "./pages/Employee/MarkAttendance";
import MyHistory from "./pages/Employee/MyHistory";
import Profile from "./pages/Profile";
import AllAttendance from "./pages/Manager/AllAttendance";
import Reports from "./pages/Manager/Reports";
import Layout from "./components/Layout/Layout";
import { useAuth } from "./store/useAuth";

// 1. Helper Component to handle Role-Based Access
const ProtectedRoute = ({ children, roles = [] }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If user has the wrong role, redirect them to THEIR correct dashboard
  if (roles.length && !roles.includes(user?.role)) {
    return <Navigate to={user.role === 'manager' ? '/manager' : '/dashboard'} />;
  }

  return <Layout>{children}</Layout>;
};

// 2. Helper Component for the Root "/" Path
const RootRedirect = () => {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;
  // Smartly redirect based on role
  return <Navigate to={user.role === 'manager' ? '/manager' : '/dashboard'} />;
};

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Smart Root Redirect (FIXES THE BUG) */}
      <Route path="/" element={<RootRedirect />} />

      {/* Employee Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute roles={['employee']}>
          <EmployeeDashboard />
        </ProtectedRoute>
      } />
      <Route path="/mark" element={
        <ProtectedRoute roles={['employee']}>
          <MarkAttendance />
        </ProtectedRoute>
      } />
      <Route path="/history" element={
        <ProtectedRoute roles={['employee']}>
          <MyHistory />
        </ProtectedRoute>
      } />

      {/* Shared Route */}
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />

      {/* Manager Routes */}
      <Route path="/manager" element={
        <ProtectedRoute roles={['manager']}>
          <ManagerDashboard />
        </ProtectedRoute>
      } />
      <Route path="/manager/all" element={
        <ProtectedRoute roles={['manager']}>
          <AllAttendance />
        </ProtectedRoute>
      } />
      <Route path="/manager/reports" element={
        <ProtectedRoute roles={['manager']}>
          <Reports />
        </ProtectedRoute>
      } />
    </Routes>
  );
}