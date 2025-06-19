import { cn } from "@/lib/utils";
import type { IGroup } from "@/types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { Edit, EllipsisVertical, Plus, Trash2 } from "lucide-react";
import CreateAndUpdateGroup from "./create-and-update-group";
import AlertModal from "@/components/shared/alert-modal";
import CustomAvatarImage from "@/components/shared/custom-avatar-image";
import avatar from "@/assets/images/avatar.png";
import { format } from "date-fns";

type Props = {
  className?: string;
  group: IGroup;
};

function Group({ group, className }: Props) {
  const members = group?.members || [];
  const visibleMembers = members.slice(0, 3);
  const extraCount = members.length - visibleMembers.length;

  return (
    <div
      className={cn(
        "border bg-background shadow rounded-md p-4 min-w-xs max-w-sm space-y-4",
        className
      )}
    >
      {/* Header: title + actions */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <CustomAvatarImage
            name={group?.title}
            alt={group?.title}
            src={avatar}
            className="size-6"
          />
          <Typography variant={"h5"}>{group?.title}</Typography>
        </div>
        <Popover>
          <PopoverTrigger className="p-1 cursor-pointer">
            <EllipsisVertical size={16} />
          </PopoverTrigger>
          <PopoverContent align="end" className="p-1 w-44">
            <Button
              variant={"transparent"}
              className="w-full rounded justify-start font-normal"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Members
            </Button>
            <CreateAndUpdateGroup
              trigger={
                <Button
                  variant={"transparent"}
                  className="w-full rounded justify-start font-normal"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Group
                </Button>
              }
            />
            <AlertModal
              trigger={
                <Button
                  variant={"transparent"}
                  className="w-full rounded hover:bg-destructive/10 hover:text-destructive text-destructive justify-start font-normal"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Group
                </Button>
              }
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Description */}
      <Typography variant={"muted"}>{group?.description}</Typography>

      {/* Members */}
      <div>
        <Typography variant={"small"} className="uppercase font-normal mb-1">
          Members
        </Typography>
        <div className="flex items-center space-x-[-8px]">
          {visibleMembers.map((member, idx) => (
            <CustomAvatarImage
              key={idx}
              name={member?.fullName}
              alt={member?.fullName}
              src={avatar}
              className="size-7 rounded-full border-2 border-white shadow-sm"
            />
          ))}

          {extraCount > 0 && (
            <div className="size-7 relative z-10 rounded-full bg-gray-200 text-gray-700 text-xs font-medium flex items-center justify-center border-2 border-white shadow-sm">
              +{extraCount}
            </div>
          )}
        </div>
      </div>

      {/* Creator & Created Date */}
      <div className="pt-2 border-t text-sm text-muted-foreground flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CustomAvatarImage
            name={group?.creator?.fullName}
            alt={group?.creator?.fullName}
            src={avatar}
            className="size-6 rounded-full"
          />
          <span>{group?.creator?.fullName}</span>
        </div>
        {group?.createdAt && (
          <span className="text-xs text-gray-500">
            {format(new Date(group.createdAt), "PPP")}
          </span>
        )}
      </div>
    </div>
  );
}

export default Group;
