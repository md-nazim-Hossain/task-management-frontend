import { cn } from "@/lib/utils";
import type { IUser } from "@/types";
import CustomAvatarImage from "./custom-avatar-image";

type Props = {
  members: Array<Pick<IUser, "_id" | "fullName" | "email" | "profileImage">>;
  className?: string;
};
function MemberLists({ members = [], className }: Props) {
  const visibleMembers = members?.slice(0, 3);
  const extraCount = members.length - visibleMembers.length;
  return (
    <div className={cn("flex items-center space-x-[-8px]", className)}>
      {visibleMembers.map((member, idx) => (
        <CustomAvatarImage
          key={idx}
          name={member?.fullName}
          alt={member?.fullName}
          src={member?.profileImage as string}
          className="size-7 rounded-full border-2 border-white shadow-sm"
        />
      ))}

      {extraCount > 0 && (
        <div className="size-7 relative z-10 rounded-full bg-gray-200 text-gray-700 text-xs font-medium flex items-center justify-center border-2 border-white shadow-sm">
          +{extraCount}
        </div>
      )}
    </div>
  );
}

export default MemberLists;
