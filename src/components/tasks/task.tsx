import { ENUM_TASK_PRIORITY, ENUM_TASK_STATUS, type ITask } from "@/types";
import { Typography } from "@/components/ui/typography";
import CustomAvatarImage from "@/components/shared/custom-avatar-image";
import avatar from "@/assets/images/avatar.png";
import TaskPriority from "./task-priority";
import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
type Props = {
  task: ITask;
};
function Task({ task }: Props) {
  const status =
    task?.status === ENUM_TASK_STATUS.IN_PROGRESS
      ? "progress"
      : task?.status === ENUM_TASK_STATUS.TODO
      ? "todo"
      : "success";

  return (
    <div
      className={cn(
        "border bg-background rounded-md p-4 min-w-[324px] space-y-4"
      )}
    >
      <Typography variant={"h5"}>{task?.title}</Typography>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1 flex-1">
          <Typography variant={"muted"}>People</Typography>
          <div className="bg-blue-100 flex items-center gap-2 rounded">
            <CustomAvatarImage
              className="size-6"
              alt="avatar"
              name="Akram Khan"
              src={avatar}
            />
            <Typography variant={"xsmall"}>
              {task?.creator?.fullName}
            </Typography>
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
        <Typography className="text-blue-800" variant={"h6"}>
          3 Comments
        </Typography>
      </div>
    </div>
  );
}

export default Task;
