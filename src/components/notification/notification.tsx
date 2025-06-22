import type { INotification } from "@/types";
import { formatDistanceToNow } from "date-fns";
import {
  useDeleteNotificationMutation,
  useReadNotificationMutation,
} from "@/redux/api/notification-api";
import { toast } from "sonner";
import CustomAvatarImage from "@/components/shared/custom-avatar-image";
import { Typography } from "@/components/ui/typography";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, EllipsisVertical, Trash2 } from "lucide-react";
import AlertModal from "@/components/shared/alert-modal";
import { useState } from "react";
type Props = {
  notification: INotification;
};
function Notification({ notification }: Props) {
  const [open, setOpen] = useState(false);
  const [deleteNotification] = useDeleteNotificationMutation();
  const [readNotification] = useReadNotificationMutation();
  const handleAction = async (id: string, type: string) => {
    try {
      if (type === "delete") {
        await deleteNotification(id).unwrap();
      } else {
        await readNotification(id).unwrap();
      }
      setOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Something went wrong");
    }
  };

  return (
    <div
      key={notification._id}
      className="hover:bg-muted py-2 pl-5 pr-2 rounded-md space-y-1"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 relative">
          {!notification?.isRead && (
            <span className="size-1.5 absolute top-1/2 -left-3 -translate-y-1/2 rounded-full bg-destructive inline-block"></span>
          )}
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
        <Popover open={open} onOpenChange={setOpen}>
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
              onClick={() => handleAction(notification._id as string, "read")}
            >
              <Check /> {notification?.isRead ? "Read" : "Mark as read"}
            </Button>
            <AlertModal
              onConfirm={() =>
                handleAction(notification._id as string, "delete")
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
      <Typography variant={"muted"}>{notification?.message}</Typography>
    </div>
  );
}

export default Notification;
