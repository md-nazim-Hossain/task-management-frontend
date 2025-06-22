import Group from "@/components/groups/group";
import GroupSkeleton from "@/components/groups/group-skeleton";
import { useGetMyGroupsQuery } from "@/redux/api/group-api";

function Groups() {
  const { data, isLoading } = useGetMyGroupsQuery();
  if (isLoading)
    return (
      <div className="flex flex-wrap gap-4">
        {[...Array(4)].map((_, i) => (
          <GroupSkeleton key={i} />
        ))}
      </div>
    );
  const groupsData = data?.data ?? [];
  return (
    <div className="flex flex-wrap gap-4">
      {groupsData?.map((group, index) => (
        <Group group={group} key={index} />
      ))}
    </div>
  );
}

export default Groups;
