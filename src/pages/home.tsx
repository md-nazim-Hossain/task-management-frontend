import Project from "@/components/projects/project";
import { projects, tasks } from "@/const/data";
import { DndContext } from "@dnd-kit/core";

function HomePage() {
  return (
    <div className="p-4 flex items-center gap-4">
      <DndContext>
        {projects.map((project, index) => {
          return (
            <div key={index}>
              <DndContext>
                <Project
                  tasks={tasks}
                  project={project}
                  id={index.toString() + project.title}
                />
              </DndContext>
            </div>
          );
        })}
      </DndContext>
    </div>
  );
}

export default HomePage;
