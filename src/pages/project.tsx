import Container from "@/components/shared/container";
import ContainerSkeleton from "@/components/shared/container-skeleton";
import Task from "@/components/tasks/task";
import { useGetSingleProjectQuery } from "@/redux/api/project-api";
import { type IProject, type ITask } from "@/types";
import { useParams } from "react-router";
import _ from "lodash";
function Project() {
  const params = useParams();
  const { data, isLoading } = useGetSingleProjectQuery({
    slug: params.slug,
  } as any);
  if (isLoading)
    return (
      <div className="flex flex-wrap gap-4">
        {[...Array(4)].map((_, i) => (
          <ContainerSkeleton key={i} />
        ))}
      </div>
    );
  const projectArray = data?.data || [];
  const project = (
    projectArray.length ? projectArray[0] : { tasks: [] }
  ) as IProject;
  const projectTasks = project?.tasks || [];
  const groupTasks = _.groupBy(projectTasks, "status");
  return (
    <div className="flex gap-4 flex-wrap">
      {Object.entries(groupTasks).map(([status, tasks]) => {
        return (
          <Container
            value={
              ((project?.completedTasksCount || 0) /
                (project?.tasks || [])?.length) *
              100
            }
            key={status}
            project={project}
            title={status.split("_").join(" ")}
            tasks={tasks as ITask[]}
            render={(task, index) => <Task task={task} key={index} />}
          />
        );
      })}
    </div>
  );
}

export default Project;
