import { useGetMyNotificationsQuery } from "@/redux/api/notification-api";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { Typography } from "@/components/ui/typography";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { Separator } from "@/components/ui/separator";

import Notification from "./notification";
import { socket } from "@/utils/socket";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

function Notifications() {
  const [open, setOpen] = useState(false);
  const { data, isLoading, refetch } = useGetMyNotificationsQuery();
  const user = useSelector((state: RootState) => state.auth.user);
  useEffect(() => {
    socket.connect();
    socket.emit("join", user?._id);

    socket.on("task_updated", () => {
      refetch();
      console.log("task_updated");
    });
    return () => {
      socket.off("task_updated");
      socket.disconnect();
    };
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size={"icon"}
          variant={"transparent"}
          className="relative w-10 h-10"
        >
          <Bell size={20} />
          {data && (data?.data?.unreadCount ?? 0) > 0 && (
            <div className="absolute top-0 right-0 size-5 text-white rounded-full bg-red-500">
              {(data?.data?.unreadCount ?? 0) > 99
                ? "99+"
                : data?.data?.unreadCount}
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-[450px] max-h-[650px] overflow-auto scrollbar"
      >
        <Typography variant={"h3"}>Notifications</Typography>
        <Separator className="my-2" />
        {isLoading && <Skeleton className="h-12 w-full" />}
        {!isLoading && data && data?.data?.data?.length === 0 && (
          <div className="flex items-center justify-center h-[150px]">
            <Typography variant={"muted"}>No notifications</Typography>
          </div>
        )}
        {!isLoading && data && (data?.data?.data || [])?.length > 0 && (
          <div className="flex flex-col">
            {data?.data?.data?.map((notification) => (
              <Notification
                key={notification._id}
                notification={notification}
              />
            ))}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

export default Notifications;
