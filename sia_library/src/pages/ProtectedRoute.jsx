import { Outlet, Navigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import Navbar from "../components/navbar";
export default function ProtectedRoute() {
  const { isAuthenticated, user } = useAuth();

  return isAuthenticated ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/" />
  );
}
