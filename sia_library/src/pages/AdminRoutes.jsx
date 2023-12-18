import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import SideBar from "../components/SideBar";
import { AdministrativeMenu } from "../utils/menuOptions";

export default function AdminRoutes() {
  const { user, isAuthenticated } = useAuth();
  if (isAuthenticated) {
    if (user.role_id === 3) {
      return (
        <div className=" bg-[#151c31]">
          <SideBar MenuOption={AdministrativeMenu}>
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
