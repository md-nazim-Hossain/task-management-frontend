import {
  ENUM_TASK_PRIORITY,
  ENUM_TASK_STATUS,
  type IProject,
  type ITask,
} from "@/types";

export const projects: IProject[] = [
  {
    _id: "1",
    title: "LMS Platform Development",
    creator: {
      _id: "u1",
      fullName: "Alice Johnson",
      email: "alice@example.com",
    },
    status: true,
    createdAt: new Date("2025-05-01T10:00:00Z"),
    updatedAt: new Date("2025-05-10T15:30:00Z"),
  },
  {
    _id: "2",
    title: "E-commerce Site Redesign",
    creator: {
      _id: "u2",
      fullName: "Bob Smith",
      email: "bob@example.com",
    },
    status: false,
    createdAt: new Date("2025-04-12T08:20:00Z"),
    updatedAt: new Date("2025-04-18T11:45:00Z"),
  },
  {
    _id: "3",
    title: "Mobile App for Event Booking",
    creator: {
      _id: "u3",
      fullName: "Carol Davis",
      email: "carol@example.com",
    },
    status: true,
    createdAt: new Date("2025-03-20T13:15:00Z"),
    updatedAt: new Date("2025-03-27T09:10:00Z"),
  },
  {
    _id: "4",
    title: "Company Internal Dashboard",
    creator: {
      _id: "u4",
      fullName: "David Wilson",
      email: "david@example.com",
    },
    status: false,
    createdAt: new Date("2025-02-05T14:00:00Z"),
    updatedAt: new Date("2025-02-15T10:25:00Z"),
  },
];

export const tasks: ITask[] = [
  {
    _id: "t1",
    title: "Design Dashboard UI",
    description: "Create the main dashboard layout and components",
    status: ENUM_TASK_STATUS.IN_PROGRESS,
    creator: {
      _id: "u1",
      fullName: "Alice Johnson",
      email: "alice@example.com",
    },
    dueDate: new Date("2025-06-30"),
    category: {
      _id: "p1",
      title: "Admin Panel Revamp",
      creator: {
        _id: "u1",
        fullName: "Alice Johnson",
        email: "alice@example.com",
      },
      status: true,
    },
    priority: ENUM_TASK_PRIORITY.HIGH,
    attachment: {
      fileName: "dashboard-sketch.png",
      fileUrl: "https://example.com/dashboard-sketch.png",
      mimeType: "image/png",
    },
    createdAt: new Date("2025-06-01"),
    updatedAt: new Date("2025-06-15"),
  },

  {
    _id: "t2",
    title: "Integrate Payment Gateway",
    description: "Use Stripe for online payments integration",
    status: ENUM_TASK_STATUS.TODO,
    creator: {
      _id: "u2",
      fullName: "Bob Smith",
      email: "bob@example.com",
    },
    dueDate: new Date("2025-07-05"),

    category: {
      _id: "p2",
      title: "E-Commerce Backend",
      creator: {
        _id: "u2",
        fullName: "Bob Smith",
        email: "bob@example.com",
      },
      status: true,
    },
    priority: ENUM_TASK_PRIORITY.MEDIUM,
    createdAt: new Date("2025-06-10"),
    updatedAt: new Date("2025-06-10"),
  },

  {
    _id: "t3",
    title: "Write Test Cases",
    description: "Add unit and integration tests for product API",
    status: ENUM_TASK_STATUS.IN_PROGRESS,
    creator: {
      _id: "u3",
      fullName: "Carol Davis",
      email: "carol@example.com",
    },
    dueDate: new Date("2025-06-28"),

    category: {
      _id: "p2",
      title: "E-Commerce Backend",
      creator: {
        _id: "u2",
        fullName: "Bob Smith",
        email: "bob@example.com",
      },
      status: true,
    },
    priority: ENUM_TASK_PRIORITY.LOW,
    attachment: {
      fileName: "test-plan.pdf",
      fileUrl: "https://example.com/test-plan.pdf",
      mimeType: "application/pdf",
    },
    createdAt: new Date("2025-06-12"),
    updatedAt: new Date("2025-06-16"),
  },

  {
    _id: "t4",
    title: "Fix Responsive Issues",
    description: "Resolve layout bugs on tablet and mobile views",
    status: ENUM_TASK_STATUS.COMPLETED,
    creator: {
      _id: "u4",
      fullName: "David Wilson",
      email: "david@example.com",
    },
    dueDate: new Date("2025-06-15"),
    category: {
      _id: "p1",
      title: "Admin Panel Revamp",
      creator: {
        _id: "u1",
        fullName: "Alice Johnson",
        email: "alice@example.com",
      },
      status: true,
    },
    priority: ENUM_TASK_PRIORITY.MEDIUM,
    createdAt: new Date("2025-06-01"),
    updatedAt: new Date("2025-06-14"),
  },
];
