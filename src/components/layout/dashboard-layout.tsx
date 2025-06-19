import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router";
import { AppSidebar } from "@/components/ui/app-sidebar";
import Navbar from "./navbar";

function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="bg-background flex-1">
        <Navbar />
        <div className="mt-[60px] p-4">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}

export default DashboardLayout;
