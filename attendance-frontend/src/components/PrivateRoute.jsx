import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/useAuth";

export default function PrivateRoute({ children, allowed=[] }){
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (allowed.length && !allowed.includes(user.role)) return <Navigate to="/" />;
  return children;
}
