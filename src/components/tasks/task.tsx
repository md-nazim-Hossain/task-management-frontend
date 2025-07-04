import {
  ENUM_TASK_PRIORITY,
  ENUM_TASK_STATUS,
  type IGroup,
  type IProject,
  type ITask,
  type ITaskAttachment,
  type IUser,
} from "@/types";
import { Typography } from "@/components/ui/typography";
import CustomAvatarImage from "@/components/shared/custom-avatar-image";
import TaskPriority from "./task-priority";
import { Calendar, Edit, EllipsisVertical, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import CreateAndUpdateTask from "./create-and-update-task";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import AlertModal from "@/components/shared/alert-modal";
import CommentsContainer from "../comments/comments-container";
import { useDeleteTaskMutation } from "@/redux/api/task-api";
import { toast } from "sonner";
import MemberLists from "../shared/member-list";
import FilePreview from "../shared/file-preview";
import { formatFileSize } from "@/utils/file-size";
import { Link } from "react-router";
import { addHTTPPrefix } from "@/utils/image-loader";
import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useDraggable } from "@dnd-kit/core";

type Props = {
  task: ITask & { commentsCount?: number };
  className?: string;
  id: string;
};
function Task({ task, className, id }: Props) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id });

  const user = useSelector((state: RootState) => state.auth.user);
  const status =
    task?.status === ENUM_TASK_STATUS.IN_PROGRESS
      ? "progress"
      : task?.status === ENUM_TASK_STATUS.TODO
      ? "todo"
      : "success";

  const projectId = task?.category as string;
  const creator = task?.creator as IUser;
  const assignedTo = task?.assignedTo as IGroup;
  const members = assignedTo?.members as IUser[];

  const [deleteTask] = useDeleteTaskMutation();
  const attachment = task?.attachment as ITaskAttachment;
  const handleDelete = async () => {
    try {
      await deleteTask(task._id as string).unwrap();
      toast.success("Task deleted successfully");
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Something went wrong");
    }
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0) rotate(3deg)`
          : undefined,
        transition: isDragging ? "none" : "transform 0.2s ease",
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 50 : 1,
        cursor: id == "0" ? "default" : isDragging ? "grabbing" : "grab",
      }}
      className={cn(
        "border bg-background rounded-md p-4 sm:min-w-sm space-y-4",
        isDragging && "ring-2 ring-primary",
        className
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <Typography variant={"h5"}>{task?.title}</Typography>
        <Popover>
          <PopoverTrigger
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            className="p-1 cursor-pointer"
          >
            <EllipsisVertical size={16} />
          </PopoverTrigger>
          <PopoverContent align="end" className="p-1 w-44">
            <CreateAndUpdateTask
              projectId={projectId}
              defaultValues={task}
              isEdit
              trigger={
                <Button
                  variant={"transparent"}
                  className="w-full rounded justify-start font-normal"
                >
                  <Edit /> Edit Task
                </Button>
              }
            />
            {user?._id === task?.creator?._id && (
              <AlertModal
                onConfirm={handleDelete}
                trigger={
                  <Button
                    variant={"transparent"}
                    className="w-full rounded hover:bg-destructive/10 hover:text-destructive text-destructive justify-start font-normal"
                  >
                    <Trash2 /> Delete Task
                  </Button>
                }
              />
            )}
          </PopoverContent>
        </Popover>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1 col-span-2 sm:col-span-1">
          <Typography variant={"muted"}>People</Typography>
          <div className="bg-blue-100 flex items-center gap-2 rounded">
            <CustomAvatarImage
              className="size-6"
              alt={creator?.fullName}
              name={creator?.fullName}
              src={creator?.profileImage as string}
            />
            <Typography variant={"xsmall"}>{creator?.fullName}</Typography>
          </div>
        </div>
        <div className="space-y-1 w-[40%]">
          <Typography variant={"muted"}>Priority</Typography>
          <TaskPriority priority={task?.priority as ENUM_TASK_PRIORITY} />
        </div>

        <div>
          <Typography variant={"muted"}>Status</Typography>
          <Badge className="capitalize" variant={status}>
            {task?.status}
          </Badge>
        </div>

        <div className="col-span-2 sm:col-span-1">
          <Typography variant={"muted"}>Deadline</Typography>
          <div className="bg-red-100 px-2 py-1 rounded flex items-center gap-2">
            <Calendar size={16} />
            <Typography variant={"xsmall"}>
              {new Date(task?.dueDate).toDateString()}
            </Typography>
          </div>
        </div>
      </div>
      <div>
        <Typography variant={"muted"}>Project Name</Typography>
        <Typography variant={"xsmall"}>
          {(task?.category as IProject)?.title}
        </Typography>
      </div>
      {attachment?.fileUrl && (
        <div className="space-y-2">
          <Typography variant={"muted"}>Attachment</Typography>
          <div className="w-full h-[200px] overflow-auto">
            <FilePreview
              fileUrl={attachment?.fileUrl}
              mimeType={attachment?.mimeType}
            />
          </div>
          <div className="flex justify-between items-center gap-2">
            <Typography variant={"muted"} className="flex-1">
              File Size: {formatFileSize(attachment?.size)}
            </Typography>
            <Link
              target="_blank"
              to={addHTTPPrefix(attachment?.fileUrl)}
              className="w-max text-blue-600 hover:underline"
            >
              Full Preview
            </Link>
          </div>
        </div>
      )}
      <Separator />
      <div className="flex items-center justify-between gap-4">
        <MemberLists members={members} />
        <CommentsContainer
          taskId={task?._id as string}
          taskName={task?.title}
          description={task?.description ?? ""}
          trigger={
            <Typography
              className="text-blue-800 cursor-pointer hover:underline"
              variant={"h6"}
            >
              {task?.commentsCount} Comments
            </Typography>
          }
        />
      </div>
    </div>
  );
}

export default Task;
