import { Skeleton } from "../ui/skeleton";
import { SelectItem } from "../ui/select";
import { useGetGroupsQuery } from "@/redux/api/group-api";

function AllGroups() {
  const { data, isLoading } = useGetGroupsQuery();
  if (isLoading) return <Skeleton className="h-12 w-full" />;
  const groups = data?.data || [];
  return (
    <>
      {groups.map((group) => (
        <SelectItem key={group._id} value={group._id}>
          {group.title}
        </SelectItem>
      ))}
    </>
  );
}

export default AllGroups;
