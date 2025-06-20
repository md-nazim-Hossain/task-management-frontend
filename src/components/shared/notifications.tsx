import {
  useDeleteNotificationMutation,
  useGetMyNotificationsQuery,
  useReadNotificationMutation,
} from "@/redux/api/notification-api";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Skeleton } from "../ui/skeleton";
import { Typography } from "../ui/typography";
import { useState } from "react";
import { Button } from "../ui/button";
import { Bell, Check, EllipsisVertical, Trash2 } from "lucide-react";
import CustomAvatarImage from "./custom-avatar-image";
import { Separator } from "../ui/separator";
import { formatDistanceToNow } from "date-fns";
import AlertModal from "./alert-modal";
import { toast } from "sonner";

function Notifications() {
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetMyNotificationsQuery();
  const [deleteNotification] = useDeleteNotificationMutation();
  const [readNotification] = useReadNotificationMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteNotification(id).unwrap();
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Something went wrong");
    }
  };

  const handleRead = async (id: string) => {
    try {
      await readNotification(id).unwrap();
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Something went wrong");
    }
  };
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
      <PopoverContent align="end" className="w-[450px]">
        <Typography variant={"h3"}>Notifications</Typography>
        <Separator className="my-2" />
        {isLoading && <Skeleton className="h-12 w-full" />}
        {!isLoading && data && data?.data?.data?.length === 0 && (
          <Typography variant={"muted"}>No notifications</Typography>
        )}
        {!isLoading && data && (data?.data?.data || [])?.length > 0 && (
          <div className="flex flex-col">
            {data?.data?.data?.map((notification) => (
              <div
                key={notification._id}
                className="hover:bg-muted p-2 rounded-md space-y-1"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <CustomAvatarImage
                      name={notification?.sender?.fullName}
                      alt={notification?.sender?.fullName}
                      src={notification?.sender?.profileImage as string}
                      className="size-7"
                    />
                    <div className="flex flex-col gap-1">
                      <Typography variant={"small"}>
                        {notification?.sender?.fullName}{" "}
                        <span className="text-muted-foreground text-xs">
                          {formatDistanceToNow(
                            new Date(notification?.createdAt as string),
                            {
                              addSuffix: true,
                            }
                          )}
                        </span>
                      </Typography>
                    </div>
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button size={"icon"} variant={"transparent"}>
                        <EllipsisVertical size={20} />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="p-2">
                      <Button
                        disabled={notification?.isRead}
                        variant={"transparent"}
                        className="w-full text-left justify-start font-normal"
                        onClick={() => handleRead(notification._id as string)}
                      >
                        <Check />{" "}
                        {notification?.isRead ? "Read" : "Mark as read"}
                      </Button>
                      <AlertModal
                        onConfirm={() =>
                          handleDelete(notification._id as string)
                        }
                        title="Delete Notification"
                        description="Are you sure you want to delete this notification?"
                        trigger={
                          <Button
                            variant={"transparent"}
                            className="w-full rounded hover:bg-destructive/10 hover:text-destructive text-destructive justify-start font-normal"
                          >
                            <Trash2 /> Delete Task
                          </Button>
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <Typography variant={"muted"}>
                  {notification?.message}
                </Typography>
              </div>
            ))}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

export default Notifications;
