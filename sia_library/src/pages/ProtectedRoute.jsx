import { Outlet, Navigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import NavBar from "../components/NavBar";

export default function ProtectedRoute() {
  const { isAuthenticated, user } = useAuth();

  return isAuthenticated ? (
    <>
      <NavBar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/" />
  );
}
