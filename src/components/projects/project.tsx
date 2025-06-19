import { ENUM_TASK_STATUS, type IProject, type ITask } from "@/types";
import Tasks from "@/components/tasks/tasks";
import { cn } from "@/lib/utils";
import { Typography } from "@/components/ui/typography";
import { Plus } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useDroppable } from "@dnd-kit/core";

type Props = {
  className?: string;
  project: IProject;
  tasks: Array<ITask>;
  id: string;
};
function Project({ className, tasks, id, project }: Props) {
  const { setNodeRef } = useDroppable({
    id,
  });
  return (
    <div
      ref={setNodeRef}
      className={cn("p-3 rounded-md bg-blue-100 space-y-4", className)}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Typography variant={"h5"}>{project?.title}</Typography>
          <Plus size={20} />
        </div>
        <div className="flex items-center justify-between gap-5">
          <Progress
            value={
              (tasks?.filter(
                (task) => task.status === ENUM_TASK_STATUS.COMPLETED
              )?.length /
                tasks?.length) *
              100
            }
            className="flex-1"
          />
          <Typography variant={"muted"} className="w-max">
            {tasks?.length} Tasks
          </Typography>
        </div>
      </div>
      <Tasks tasks={tasks} className="flex-col" />
    </div>
  );
}

export default Project;
