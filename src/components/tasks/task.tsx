import { ENUM_TASK_PRIORITY, type ITask } from "@/types";
import { Typography } from "@/components/ui/typography";
import CustomAvatarImage from "@/components/shared/custom-avatar-image";
import avatar from "@/assets/images/avatar.png";
import TaskPriority from "./task-priority";
import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
type Props = {
  task?: ITask;
};
function Task({ task }: Props) {
  return (
    <div className="border cursor-grab bg-background rounded-md p-4 min-w-[324px] space-y-4">
      <Typography variant={"h5"}>Requirement Analysis</Typography>
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
            <Typography variant={"xsmall"}>Akram Khan</Typography>
          </div>
        </div>
        <div className="space-y-1 w-[40%]">
          <Typography variant={"muted"}>Priority</Typography>
          <TaskPriority priority={ENUM_TASK_PRIORITY.HIGH} />
        </div>

        <div>
          <Typography variant={"muted"}>Status</Typography>
          <Badge variant={"progress"}>In Progress</Badge>
        </div>
        <div>
          <Typography variant={"muted"}>Deadline</Typography>
          <div className="bg-red-100 px-2 py-1 rounded flex items-center gap-2">
            <Calendar size={16} />
            <Typography variant={"xsmall"}>01/01/2023</Typography>
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
