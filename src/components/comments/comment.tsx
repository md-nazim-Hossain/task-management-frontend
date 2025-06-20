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
import { useDeleteTaskCommentMutation } from "@/redux/api/task-comment-api";
import { toast } from "sonner";
import { useState } from "react";
import AddComment from "./add-comment";
import { formatDistanceToNow } from "date-fns";
type Props = {
  comment: ITaskComment;
  className?: string;
};
function Comment({ comment, className }: Props) {
  const [deleteTaskComment] = useDeleteTaskCommentMutation();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const handleDelete = async () => {
    try {
      await deleteTaskComment(comment._id as string).unwrap();
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Something went wrong");
    }
  };

  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex gap-3 justify-between">
        <div className="flex gap-2">
          <CustomAvatarImage
            src={comment?.author?.profileImage as string}
            alt={comment?.author?.fullName}
            name={comment?.author?.fullName}
            className="size-7"
          />
          <div className="flex flex-col gap-1">
            <Typography variant={"small"}>
              {comment?.author?.fullName}
              <span className="text-muted-foreground text-xs ml-1">
                {formatDistanceToNow(new Date(comment?.createdAt as string), {
                  addSuffix: true,
                })}{" "}
                {comment?.isEdited ? "(edited)" : ""}
              </span>
            </Typography>
            <Typography variant={"muted"}>{comment?.comment}</Typography>
          </div>
        </div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild className="cursor-pointer">
            <EllipsisVertical size={20} />
          </PopoverTrigger>
          <PopoverContent align="end" className="p-2">
            <Button
              variant={"transparent"}
              onClick={() => {
                setOpen(false);
                setEdit(true);
              }}
              className="w-full justify-start font-normal"
            >
              <Edit /> Edit
            </Button>
            <AlertModal
              onConfirm={handleDelete}
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
      {edit && (
        <AddComment
          taskId={comment?.task?._id as string}
          isEdit
          comment={comment}
          onSuccess={() => setEdit(false)}
        />
      )}
    </div>
  );
}

export default Comment;
