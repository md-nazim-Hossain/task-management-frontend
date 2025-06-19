import {
  SIDEBAR_WIDTH,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

import avatar from "@/assets/images/avatar.png";
import CustomAvatarImage from "@/components/shared/custom-avatar-image";
import { ChevronDown, Lock, LogOut, Plus, Settings } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useLocation, useParams } from "react-router";
import CreateAndUpdateProject from "../projects/create-and-update-project";
import CreateAndUpdateTask from "../tasks/create-and-update-task";
import CreateAndUpdateGroup from "../groups/create-and-update-group";
import CreateAndUpdateUser from "../users/create-and-update-user";
import ChangePassword from "../users/change-password";
function Navbar() {
  const { open, isMobile } = useSidebar();
  const pathname = useLocation().pathname;
  const params = useParams();
  return (
    <div
      style={{
        width: `calc(100% - ${
          open ? (isMobile ? "0px" : SIDEBAR_WIDTH) : "0px"
        })`,
      }}
      className={`h-[60px] z-50 bg-background px-4 flex items-center justify-between fixed top-0 right-0 shadow`}
    >
      <SidebarTrigger />
      <div className="flex items-center gap-5">
        {pathname === "/dashboard" ||
          (pathname === "/dashboard/projects" && (
            <CreateAndUpdateProject
              trigger={
                <Button>
                  <Plus /> New Project
                </Button>
              }
            />
          ))}
        {(pathname === "/dashboard/projects/" + params?.slug ||
          pathname === "/dashboard/my-tasks") && (
          <CreateAndUpdateTask
            trigger={
              <Button>
                <Plus /> New Task
              </Button>
            }
          />
        )}
        {pathname === "/dashboard/groups" && (
          <CreateAndUpdateGroup
            trigger={
              <Button>
                <Plus /> New Group
              </Button>
            }
          />
        )}
        {pathname === "/dashboard/users" && (
          <CreateAndUpdateUser
            trigger={
              <Button>
                <Plus /> Add User
              </Button>
            }
          />
        )}
        <Popover>
          <PopoverTrigger asChild className="cursor-pointer">
            <div className="flex items-center gap-2">
              <CustomAvatarImage
                alt="avatar"
                src={avatar}
                className="size-10"
              />
              <ChevronDown size={24} />
            </div>
          </PopoverTrigger>
          <PopoverContent align="end" className="p-2">
            <Button
              variant={"transparent"}
              className="w-full justify-start font-normal"
            >
              <Settings /> Account Settings
            </Button>
            <ChangePassword
              trigger={
                <Button
                  variant={"transparent"}
                  className="w-full justify-start font-normal"
                >
                  <Lock /> Change Password
                </Button>
              }
            />
            <Button
              variant={"transparent"}
              className="w-full justify-start font-normal"
            >
              <LogOut /> Logout
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

export default Navbar;
