import { cn } from "@/lib/utils";
import type { ITaskComment } from "@/types";
import CustomAvatarImage from "@/components/shared/custom-avatar-image";
import { Typography } from "@/components/ui/typography";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Edit, EllipsisVertical, Trash2 } from "lucide-react";
import AlertModal from "@/components/shared/alert-modal";
type Props = {
  comment: ITaskComment;
  className?: string;
};
function Comment({ comment, className }: Props) {
  return (
    <div className={cn("", className)}>
      <div>
        <div className="flex gap-2">
          <CustomAvatarImage
            src={comment?.author?.profileImage as string}
            alt={comment?.author?.fullName}
            name={comment?.author?.fullName}
            className="size-6"
          />
          <Typography variant={"small"}>{comment?.author?.fullName}</Typography>
        </div>
        <Popover>
          <PopoverTrigger asChild className="cursor-pointer">
            <EllipsisVertical />
          </PopoverTrigger>
          <PopoverContent align="end" className="p-2">
            <Button
              variant={"transparent"}
              className="w-full justify-start font-normal"
            >
              <Edit /> Edit
            </Button>
            <AlertModal
              trigger={
                <Button
                  variant={"transparent"}
                  className="w-full rounded hover:bg-destructive/10 hover:text-destructive text-destructive justify-start font-normal"
                >
                  <Trash2 /> Delete
                </Button>
              }
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

export default Comment;
