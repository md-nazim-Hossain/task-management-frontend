import Group from "@/components/groups/group";
import type { IGroup } from "@/types";

function Groups() {
  const groupData: IGroup[] = [
    {
      _id: "123e4567-e89b-12d3-a456-426614174000",
      title: "Group 1",
      description: "Description for Group 1",
      creator: {
        _id: "123e4567-e89b-12d3-a456-426614174000",
        fullName: "John Doe",
        email: "johndoe@example.com",
      },
      members: [
        {
          _id: "123e4567-e89b-12d3-a456-426614174000",
          fullName: "John Doe",
          email: "johndoe@example.com",
        },
        {
          _id: "123e4567-e89b-12d3-a456-426614174001",
          fullName: "Jane Smith",
          email: "janesmith@example.com",
        },
      ],
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: "123e4567-e89b-12d3-a456-426614174001",
      title: "Group 2",
      description: "Description for Group 2",
      creator: {
        _id: "123e4567-e89b-12d3-a456-426614174001",
        fullName: "Jane Smith",
        email: "janesmith@example.com",
      },
      members: [
        {
          _id: "123e4567-e89b-12d3-a456-426614174000",
          fullName: "John Doe",
          email: "johndoe@example.com",
        },
        {
          _id: "123e4567-e89b-12d3-a456-426614174001",
          fullName: "Jane Smith",
          email: "janesmith@example.com",
        },
      ],
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: "123e4567-e89b-12d3-a456-426614174002",
      title: "Group 3",
      description: "Description for Group 3",
      creator: {
        _id: "123e4567-e89b-12d3-a456-426614174002",
        fullName: "John Doe",
        email: "johndoe@example.com",
      },
      members: [
        {
          _id: "123e4567-e89b-12d3-a456-426614174000",
          fullName: "John Doe",
          email: "johndoe@example.com",
        },
        {
          _id: "123e4567-e89b-12d3-a456-426614174001",
          fullName: "Jane Smith",
          email: "janesmith@example.com",
        },
      ],
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
  return (
    <div className="flex flex-wrap gap-4">
      {[...groupData, ...groupData].map((group) => (
        <Group className="flex-grow" key={group._id} group={group} />
      ))}
    </div>
  );
}

export default Groups;
