import type { IProject, ITask } from "@/types";
import Tasks from "@/components/tasks/tasks";
import { cn } from "@/lib/utils";
import { Typography } from "@/components/ui/typography";
import { Plus } from "lucide-react";
import { Progress } from "@/components/ui/progress";

type Props = {
  className?: string;
  project?: IProject;
  tasks?: Array<ITask>;
};
function Project({ className, tasks }: Props) {
  return (
    <div className={cn("p-3 rounded-md bg-blue-100 space-y-4", className)}>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Typography variant={"h5"}>Requirement Analysis</Typography>
          <Plus size={20} />
        </div>
        <div className="flex items-center justify-between gap-5">
          <Progress value={50} className="flex-1" />
          <Typography variant={"muted"} className="w-max">
            3 Tasks
          </Typography>
        </div>
      </div>
      <Tasks tasks={tasks} className="flex-col" />
    </div>
  );
}

export default Project;
