import {
  ENUM_TASK_PRIORITY,
  ENUM_TASK_STATUS,
  type ITask,
  type IUser,
} from "@/types";
import { Typography } from "@/components/ui/typography";
import CustomAvatarImage from "@/components/shared/custom-avatar-image";
import avatar from "@/assets/images/avatar.png";
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

type Props = {
  task: ITask;
  className?: string;
};
function Task({ task, className }: Props) {
  const status =
    task?.status === ENUM_TASK_STATUS.IN_PROGRESS
      ? "progress"
      : task?.status === ENUM_TASK_STATUS.TODO
      ? "todo"
      : "success";

  const projectId = task?.category as string;
  const creator = task?.creator as IUser;
  const [deleteTask] = useDeleteTaskMutation();

  console.log(task);

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
      className={cn(
        "border bg-background rounded-md p-4 min-w-[324px] space-y-4",
        className
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <Typography variant={"h5"}>{task?.title}</Typography>
        <Popover>
          <PopoverTrigger className="p-1 cursor-pointer">
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
          </PopoverContent>
        </Popover>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1 flex-1">
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
        <div>
          <Typography variant={"muted"}>Deadline</Typography>
          <div className="bg-red-100 px-2 py-1 rounded flex items-center gap-2">
            <Calendar size={16} />
            <Typography variant={"xsmall"}>
              {new Date(task?.dueDate).toDateString()}
            </Typography>
          </div>
        </div>
      </div>
      <Separator />
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-1">
          {[1, 2, 3].map((i) => (
            <CustomAvatarImage
              key={i}
              className="size-6"
              alt="avatar"
              name="Akram Khan"
              src={avatar}
            />
          ))}
        </div>
        <CommentsContainer
          taskName={task?.title}
          description={task?.description ?? ""}
          trigger={
            <Typography
              className="text-blue-800 cursor-pointer hover:underline"
              variant={"h6"}
            >
              3 Comments
            </Typography>
          }
        />
      </div>
    </div>
  );
}

export default Task;
