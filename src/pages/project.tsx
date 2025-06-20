import Container from "@/components/shared/container";
import Task from "@/components/tasks/task";
import { tasks } from "@/const/data";
import { ENUM_TASK_STATUS, type IProject } from "@/types";

function Project() {
  return (
    <div className="flex gap-4">
      {Object.values(ENUM_TASK_STATUS).map((item) => (
        <Container
          project={
            {
              title: item.split("_").join(" "),
              slug: item,
              _id: item,
            } as IProject
          }
          title={item.split("_").join(" ")}
          key={item}
          tasks={tasks.filter((task) => task.status === item)}
          render={(task, index) => <Task task={task} key={index} />}
        />
      ))}
    </div>
  );
}

export default Project;
