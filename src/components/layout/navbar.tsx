import {
  SIDEBAR_WIDTH,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

import CustomAvatarImage from "@/components/shared/custom-avatar-image";
import { ChevronDown, Lock, LogOut, Plus, Settings } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router";
import CreateAndUpdateProject from "../projects/create-and-update-project";
import CreateAndUpdateGroup from "../groups/create-and-update-group";
import CreateAndUpdateUser from "../users/create-and-update-user";
import ChangePassword from "../users/change-password";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { useLogOutMutation } from "@/redux/api/auth-api";
import { toast } from "sonner";
import { setUser } from "@/redux/slices/auth-slice";
import Notifications from "../notification/notifications";
function Navbar() {
  const dispatch = useDispatch();
  const { open, isMobile } = useSidebar();
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const user = useSelector((state: RootState) => state.auth.user);
  const [logOut] = useLogOutMutation();
  const handleLogout = async () => {
    try {
      await logOut().unwrap();
      toast.success("Logout successful");
      dispatch(setUser(null));
      navigate("/login");
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Something went wrong");
    }
  };

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
        {(pathname === "/" || pathname.startsWith("/projects")) && (
          <CreateAndUpdateProject
            trigger={
              <Button>
                <Plus /> New Project
              </Button>
            }
          />
        )}

        {pathname.startsWith("/groups") && (
          <CreateAndUpdateGroup
            trigger={
              <Button>
                <Plus /> New Group
              </Button>
            }
          />
        )}
        {pathname.startsWith("/users") && (
          <CreateAndUpdateUser
            trigger={
              <Button>
                <Plus /> Add User
              </Button>
            }
          />
        )}
        <Notifications />
        <Popover>
          <PopoverTrigger asChild className="cursor-pointer">
            <div className="flex items-center gap-2">
              <CustomAvatarImage
                alt={user?.fullName as string}
                name={user?.fullName as string}
                src={user?.profileImage as string}
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
              onClick={handleLogout}
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
