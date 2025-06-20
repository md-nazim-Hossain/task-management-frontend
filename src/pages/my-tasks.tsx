import Container from "@/components/shared/container";
import ContainerSkeleton from "@/components/shared/container-skeleton";
import Task from "@/components/tasks/task";
import { useGetMyTasksQuery } from "@/redux/api/task-api";
import _ from "lodash";

function MyTasks() {
  const { data, isLoading } = useGetMyTasksQuery();
  if (isLoading) {
    return (
      <div className="flex flex-wrap gap-4">
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
    <div className="flex gap-4">
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
            render={(task, index) => <Task task={task} key={index} />}
          />
        );
      })}
    </div>
  );
}

export default MyTasks;
