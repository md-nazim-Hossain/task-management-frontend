import { ENUM_TASK_STATUS, type IProject, type ITask } from "@/types";
import { cn } from "@/lib/utils";
import { Typography } from "@/components/ui/typography";
import { Plus } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import CreateAndUpdateTask from "../tasks/create-and-update-task";
import CreateAndUpdateProject from "../projects/create-and-update-project";

type Props = {
  className?: string;
  project: IProject;
  tasks: Array<ITask>;
  render: (task: ITask, index: number) => React.ReactNode;
  style?: React.CSSProperties;
  title: string | React.ReactNode;
};
function Container({ className, tasks, render, style, project, title }: Props) {
  return (
    <div
      style={style}
      className={cn(
        "p-3 h-max rounded-lg bg-blue-100 space-y-4 max-w-sm",
        className
      )}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Typography variant={"h5"} className="capitalize">
            {title}
          </Typography>
          <CreateAndUpdateProject
            defaultValues={project}
            isEdit
            trigger={<Plus size={20} />}
          />
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
      <div className="space-y-2">
        {tasks.map((task, index) => render(task, index))}
      </div>
      <CreateAndUpdateTask
        projectId={project._id}
        trigger={
          <Button
            variant={"transparent"}
            size={"sm"}
            className="hover:bg-transparent p-1 h-max text-muted-foreground"
          >
            <Plus size={20} /> Add Task
          </Button>
        }
      />
    </div>
  );
}

export default Container;
