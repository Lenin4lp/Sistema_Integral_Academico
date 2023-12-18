import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import SideBar from "../components/SideBar";
import { AcademicMenu } from "../utils/menuOptions";

export default function ProtectedRoute() {
  const { isAuthenticated, user } = useAuth();

  return isAuthenticated ? (
    <>
    <div className="  bg-gradient-to-br from-[#1C274C] to-[#146898]">
      <SideBar MenuOption={AcademicMenu}>
        
            <Outlet />
          </SideBar>
          </div>
    </>
  ) : (
    <Navigate to="/" />
  );
}
