import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { Group, Home, List, Trees, User } from "lucide-react";
import logo from "@/assets/Logo.png";

export const AppSidebar: React.FC = () => {
  const { pathname } = useLocation();
  const sidebar = [
    {
      name: "Home",
      href: "/",
      icon: <Home size={20} />,
    },
    {
      name: "All Projects",
      href: "/projects",
      icon: <Trees size={20} />,
    },
    {
      name: "Groups",
      href: "/groups",
      icon: <Group size={20} />,
    },
    {
      name: "Users",
      href: "/users",
      icon: <User size={20} />,
    },
    {
      name: "My Tasks",
      href: "/my-tasks",
      icon: <List size={20} />,
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="items-center justify-center bg-gray-800/70 h-[76px]">
        <img src={logo} width={150} height={28} alt="Logo" />
      </SidebarHeader>
      <SidebarContent className="p-6">
        {sidebar.map((item) => (
          <SidebarMenuButton
            key={item.name}
            asChild
            isActive={pathname === item.href}
            className="duration-100 transition-all ease-in-out"
          >
            <Link
              to={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.icon} {item.name}
            </Link>
          </SidebarMenuButton>
        ))}
      </SidebarContent>
    </Sidebar>
  );
};
