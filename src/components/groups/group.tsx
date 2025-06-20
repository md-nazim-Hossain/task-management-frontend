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
import { useDeleteGroupMutation } from "@/redux/api/group-api";
import { toast } from "sonner";
import MemberLists from "../shared/member-list";

type Props = {
  className?: string;
  group: IGroup;
};

function Group({ group, className }: Props) {
  const members = group?.members || [];
  const [deleteGroup] = useDeleteGroupMutation();

  const handleDeleteGroup = async () => {
    try {
      await deleteGroup(group._id as string).unwrap();
      toast.success("Group deleted successfully");
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Something went wrong");
    }
  };

  return (
    <div
      className={cn(
        "border bg-background h-max shadow rounded-md p-4 min-w-xs max-w-sm space-y-4",
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
              defaultValues={group}
              isEdit
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
              onConfirm={handleDeleteGroup}
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
        <MemberLists members={members} />
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
