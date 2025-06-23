import Container from "@/components/shared/container";
import ContainerSkeleton from "@/components/shared/container-skeleton";
import Task from "@/components/tasks/task";
import { useGetProjectsQuery } from "@/redux/api/project-api";
import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Link } from "react-router";

function AllProjectsList() {
  const queryParams = useSelector((state: RootState) => state.queryParams);
  const { data, isLoading } = useGetProjectsQuery(queryParams);
  if (isLoading)
    return (
      <div className="flex flex-wrap gap-4">
        {[...Array(4)].map((_, i) => (
          <ContainerSkeleton key={i} />
        ))}
      </div>
    );
  const projects = data?.data || [];

  return (
    <div className="flex flex-wrap gap-4">
      {projects.length === 0 && (
        <div className="text-center text-muted-foreground">
          No projects found
        </div>
      )}
      {projects.length > 0 &&
        projects.map((project, index) => (
          <Container
            value={
              ((project?.completedTasksCount || 0) /
                (project?.tasks || [])?.length) *
              100
            }
            project={project}
            className="flex-grow min-w-sm max-w-md h-max"
            title={
              <Link
                className="cursor-pointer hover:underline"
                to={`/projects/${project.slug}`}
              >
                {project.title}
              </Link>
            }
            key={index}
            tasks={project.tasks || []}
            render={(task, index) => <Task task={task} key={index} />}
          />
        ))}
    </div>
  );
}

export default AllProjectsList;
