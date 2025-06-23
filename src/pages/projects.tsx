import AllProjectsList from "@/components/projects/all-project-lists";
import SearchAndFilter from "@/components/shared/search-and-filter";

function Projects() {
  return (
    <div>
      <SearchAndFilter disabled={["priority"]} />
      <AllProjectsList />
    </div>
  );
}

export default Projects;
