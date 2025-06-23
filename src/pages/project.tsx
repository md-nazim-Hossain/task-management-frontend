import { useDraggable, useDroppable } from "@dnd-kit/core";
import Container from "@/components/shared/container";
import type { IProject, ITask } from "@/types";
import Task from "@/components/tasks/task";
import ContainerSkeleton from "@/components/shared/container-skeleton";
import { useParams } from "react-router";
import { useGetSingleProjectQuery } from "@/redux/api/project-api";
import _ from "lodash";
import DndProvider from "@/components/providers/dnd-provider";

function Project() {
  const params = useParams();

  const { data, isLoading, refetch } = useGetSingleProjectQuery({
    slug: params.slug,
  } as any);

  const projectArray = data?.data || [];
  const project = (
    projectArray.length ? projectArray[0] : { tasks: [] }
  ) as IProject;
  const projectTasks = project?.tasks || [];
  const groupTasks = _.groupBy(projectTasks, "status");
  const statusOrder = ["todo", "in_progress", "completed"];

  if (isLoading) {
    return (
      <div className="flex flex-wrap gap-4">
        {[...Array(4)].map((_, i) => (
          <ContainerSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <DndProvider project={project} refetch={refetch}>
      <div className="flex gap-4 flex-wrap">
        {statusOrder.map((status) => {
          const statusTasks = groupTasks[status] || [];
          return (
            <DroppableContext task={statusTasks[0]} key={status} id={status}>
              <Container
                value={
                  ((project?.completedTasksCount || 0) /
                    (project?.tasks || [])?.length) *
                  100
                }
                project={project}
                title={status.split("_").join(" ")}
                tasks={statusTasks as ITask[]}
                render={(task) => (
                  <DragContext key={task._id} id={task._id as string}>
                    <Task task={task} />
                  </DragContext>
                )}
              />
            </DroppableContext>
          );
        })}
      </div>
    </DndProvider>
  );
}

export default Project;

const DroppableContext = ({
  children,
  task,
  id,
}: {
  children: React.ReactNode;
  id: string;
  task: ITask;
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });
  const style = {
    border: isOver ? "2px solid #4f46e5" : undefined,
  };
  return (
    <div
      ref={setNodeRef}
      className="relative flex-grow min-w-sm max-w-md h-max overflow-x-hidden"
      style={{
        ...style,
      }}
    >
      {children}
      {isOver && (
        <div className="absolute top-20 left-0 w-full h-full">
          <Task task={task} className="opacity-20" />
        </div>
      )}
    </div>
  );
};

const DragContext = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
    });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0 : 1,
    cursor: "grab",
    zIndex: 100,
  };
  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
};
