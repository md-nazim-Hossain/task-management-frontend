import Container from "@/components/shared/container";
import ContainerSkeleton from "@/components/shared/container-skeleton";
import Task from "@/components/tasks/task";
import type { IAPIResponse, ITask } from "@/types";
import _ from "lodash";

type Props = {
  data: IAPIResponse<ITask[]> | undefined;
  isLoading: boolean;
  isFetching: boolean;
};
function MyTasks({ data, isLoading, isFetching }: Props) {
  if (isLoading || isFetching) {
    return (
      <div className="flex flex-col sm:flex-row flex-wrap gap-4">
        {[...Array(4)].map((_, i) => (
          <ContainerSkeleton key={i} />
        ))}
      </div>
    );
  }
  const tasks = data?.data || [];
  const groupTasks = _.groupBy(tasks, "status");

  const statusOrder = ["todo", "in_progress", "completed"];
  return (
    <div className="flex flex-row flex-wrap gap-4">
      {statusOrder.map((status) => {
        const statusTasks = groupTasks[status] || [];
        return (
          <Container
            value={0}
            key={status}
            hideProjectAction
            project={
              {
                title: "",
                slug: status,
                _id: "",
              } as any
            }
            title={status.replace("_", " ")}
            tasks={statusTasks}
            className="flex-grow sm:min-w-sm max-w-md h-max"
            render={(task, index) => <Task task={task} key={index} />}
          />
        );
      })}
    </div>
  );
}

export default MyTasks;
