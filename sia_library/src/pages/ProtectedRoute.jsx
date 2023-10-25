import { Outlet, Navigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}
