import { type IProject, type ITask } from "@/types";
import { cn } from "@/lib/utils";
import { Typography } from "@/components/ui/typography";
import { Edit, Plus, Trash2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import CreateAndUpdateTask from "../tasks/create-and-update-task";
import CreateAndUpdateProject from "../projects/create-and-update-project";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import AlertModal from "./alert-modal";
import { useDeleteProjectMutation } from "@/redux/api/project-api";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { useDroppable } from "@dnd-kit/core";

type Props = {
  className?: string;
  project: IProject;
  tasks: Array<ITask>;
  render: (task: ITask, index: number) => React.ReactNode;
  style?: React.CSSProperties;
  title: string | React.ReactNode;
  value: number;
  hideProjectAction?: boolean;
  id: string;
};
function Container({
  className,
  tasks,
  render,
  style,
  project,
  title,
  value,
  hideProjectAction = false,
  id,
}: Props) {
  const { setNodeRef, isOver, rect, over } = useDroppable({ id });
  const user = useSelector((state: RootState) => state.auth.user);
  const [deleteProject] = useDeleteProjectMutation();

  const handleDelete = async () => {
    try {
      await deleteProject(project._id as string).unwrap();
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Something went wrong");
    }
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "p-3 rounded-lg space-y-4 transition-colors duration-200",
        isOver ? "bg-blue-100" : "bg-gray-100",
        className
      )}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Typography variant={"h5"} className="capitalize">
            {title}
          </Typography>
          {!hideProjectAction && user?._id === project?.creator?._id && (
            <Popover>
              <PopoverTrigger className="p-1 cursor-pointer">
                <Plus size={20} />
              </PopoverTrigger>
              {user?._id === project?.creator?._id && (
                <PopoverContent align="end" className="p-1 w-44">
                  <CreateAndUpdateProject
                    defaultValues={project}
                    isEdit
                    trigger={
                      <Button
                        variant="transparent"
                        className="w-full rounded justify-start font-normal"
                      >
                        <Edit /> Edit Project
                      </Button>
                    }
                  />
                  <AlertModal
                    onConfirm={handleDelete}
                    trigger={
                      <Button
                        variant="transparent"
                        className="w-full rounded hover:bg-destructive/10 hover:text-destructive text-destructive justify-start font-normal"
                      >
                        <Trash2 /> Delete Project
                      </Button>
                    }
                  />
                </PopoverContent>
              )}
            </Popover>
          )}
        </div>

        {!hideProjectAction && (
          <div className="flex items-center justify-between gap-5">
            <Progress value={value} className="flex-1" />
            <Typography variant={"muted"} className="w-max">
              {tasks?.length} Tasks
            </Typography>
          </div>
        )}
      </div>
      <div
        style={{
          minHeight:
            isOver && over?.rect?.height
              ? `calc(100% + ${over.rect.height}px + ${rect?.current?.height}px + 30px)`
              : undefined,
        }}
        className="space-y-2 max-h-[90vh] overflow-y-auto scrollbar pr-2"
      >
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
