import type { ITask } from "@/types";
import Task from "./task";
import { cn } from "@/lib/utils";

type Props = {
  tasks: Array<ITask>;
  className?: string;
};
function Tasks({ tasks, className }: Props) {
  return (
    <div className={cn("flex gap-2", className)}>
      {tasks.map((task, index) => (
        <Task task={task} key={index} />
      ))}
    </div>
  );
}

export default Tasks;
