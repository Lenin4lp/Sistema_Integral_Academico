import { Outlet, Navigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";

export default function AdminRoutes() {
  const { user, isAuthenticated } = useAuth();
  if (isAuthenticated) {
    if (user.role_id === 3) {
      return (
        <div className=" bg-[#151c31]">
          <SideBar>
            <Outlet />
          </SideBar>
        </div>
      );
    } else {
      return <Navigate to="/" />;
    }
  } else {
    return <Navigate to="/" />;
  }
}
