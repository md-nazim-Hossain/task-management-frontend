import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { Home, Trees } from "lucide-react";
import logo from "@/assets/Logo.png";

export const AppSidebar: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="items-center justify-center bg-gray-800/70 h-[76px]">
        <img src={logo} width={150} height={28} alt="Logo" />
      </SidebarHeader>
      <SidebarContent className="p-6">
        <SidebarMenuButton
          asChild
          isActive={pathname === "/dashboard"}
          className="duration-100 transition-all ease-in-out"
        >
          <Link
            to="/dashboard"
            aria-current={pathname === "/dashboard" ? "page" : undefined}
          >
            <Home size={20} /> Home
          </Link>
        </SidebarMenuButton>
        <SidebarMenuButton
          asChild
          isActive={pathname === "/dashboard/projects"}
          className="duration-100 transition-all ease-in-out"
        >
          <Link
            to="/dashboard/projects"
            aria-current={
              pathname === "/dashboard/projects" ? "page" : undefined
            }
          >
            <Trees size={20} /> Projects
          </Link>
        </SidebarMenuButton>
      </SidebarContent>
    </Sidebar>
  );
};
