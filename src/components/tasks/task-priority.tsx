import low from "@/assets/images/low.png";
import medium from "@/assets/images/medium.png";
import high from "@/assets/images/high.png";
import type { ENUM_TASK_PRIORITY } from "@/types";
import { Typography } from "../ui/typography";
import { cn } from "@/lib/utils";

type Props = {
  priority: ENUM_TASK_PRIORITY;
};
function TaskPriority({ priority }: Props) {
  const img = priority === "low" ? low : priority === "medium" ? medium : high;
  return (
    <div className="flex items-center gap-2 rounded p-[2px]">
      <img src={img} width={16} height={16} alt="priority" />
      <Typography
        variant={"xsmall"}
        className={cn(
          "capitalize font-medium",
          priority === "low" && "text-green-800",
          priority === "medium" && "text-yellow-600",
          priority === "high" && "text-red-700"
        )}
      >
        {priority}
      </Typography>
    </div>
  );
}

export default TaskPriority;
