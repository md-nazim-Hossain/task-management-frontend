import Container from "@/components/shared/container";
import Task from "@/components/tasks/task";
import { projects, tasks } from "@/const/data";
import { Link } from "react-router";

function Projects() {
  return (
    <div className="flex flex-wrap gap-4">
      {projects.map((project, index) => (
        <Container
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
          tasks={tasks}
          render={(task, index) => <Task task={task} key={index} />}
        />
      ))}
    </div>
  );
}

export default Projects;
