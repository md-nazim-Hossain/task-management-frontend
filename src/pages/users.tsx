import User from "@/components/users/user";
import UserSkeleton from "@/components/users/user-skeleton";
import { useGetUsersQuery } from "@/redux/api/user-api";

function Users() {
  const { data, isLoading } = useGetUsersQuery();
  if (isLoading)
    return (
      <div className="flex flex-wrap gap-4">
        {[...Array(4)].map((_, i) => (
          <UserSkeleton key={i} />
        ))}
      </div>
    );
  const users = data?.data || [];
  return (
    <div className="flex flex-wrap gap-4">
      {users.map((user, index) => (
        <User totalUsers={users.length} user={user} key={index} />
      ))}
    </div>
  );
}

export default Users;
