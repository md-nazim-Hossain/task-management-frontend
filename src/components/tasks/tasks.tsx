import type { ITask } from "@/types";
import React from "react";
import Task from "./task";
import { cn } from "@/lib/utils";

type Props = {
  tasks?: Array<ITask>;
  className?: string;
};
function Tasks({ tasks, className }: Props) {
  return (
    <div className={cn("flex gap-2", className)}>
      {Array.from({ length: 10 }).map((_, index) => (
        <Task key={index} />
      ))}
    </div>
  );
}

export default Tasks;
