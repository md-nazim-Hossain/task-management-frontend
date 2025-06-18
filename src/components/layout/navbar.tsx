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
function Navbar() {
  const { open, isMobile } = useSidebar();
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
        <Button>
          <Plus /> New Task
        </Button>
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
            <Button
              variant={"transparent"}
              className="w-full justify-start font-normal"
            >
              <Lock /> Change Password
            </Button>
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
