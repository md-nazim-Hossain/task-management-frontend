import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import logo from "@/assets/Logo.png";
import { Link } from "react-router";
import { Home, Plus, Trees } from "lucide-react";
import CreateAndUpdateProject from "../projects/create-and-update-project";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="items-center justify-center bg-gray-800/70 h-[76px]">
        <img src={logo} width={150} height={28} alt="Logo" />
      </SidebarHeader>
      <SidebarContent className="p-6">
        <SidebarMenuButton asChild>
          <Link to="/dashboard">
            <Home /> Home
          </Link>
        </SidebarMenuButton>
        <CreateAndUpdateProject
          trigger={
            <SidebarMenuButton>
              <div className="flex items-center justify-between w-full">
                <span className="flex items-center gap-2">
                  <Trees size={16} /> Project
                </span>
                <Plus size={16} />
              </div>
            </SidebarMenuButton>
          }
        />

        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
