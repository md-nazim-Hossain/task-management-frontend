import Container from "@/components/shared/container";
import ContainerSkeleton from "@/components/shared/container-skeleton";
import Task from "@/components/tasks/task";
import { useGetProjectsQuery } from "@/redux/api/project-api";
import { Link } from "react-router";

function Projects() {
  const { data, isLoading } = useGetProjectsQuery();
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
      {projects.map((project, index) => (
        <Container
          value={
            ((project?.completedTasksCount || 0) /
              (project?.tasks || [])?.length) *
            100
          }
          project={project}
          className="flex-grow"
          title={
            <Link
              className="cursor-pointer hover:underline"
              to={`/dashboard/projects/${project.slug}`}
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

export default Projects;
