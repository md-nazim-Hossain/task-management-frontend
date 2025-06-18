export type IUser = {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  status: boolean;
  passwordChangeAt?: Date;
  profileImage?: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type IProject = {
  _id: string;
  title: string;
  creator: IUser;
  status: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export type ITaskAttachment = {
  fileName: string;
  fileUrl: string;
  mimeType: string;
};
export type ITask = {
  _id?: string;
  title: string;
  description: string;
  status?: ENUM_TASK_STATUS;
  creator: IUser;
  dueDate: Date;
  assignedTo?: IGroup;
  category: IProject;
  priority?: ENUM_TASK_PRIORITY;
  attachment?: ITaskAttachment;
  createdAt?: Date;
  updatedAt?: Date;
};

export type ITaskComment = {
  _id?: string;
  task: ITask;
  author: IUser;
  comment: string;
  isEdited: boolean;
  parentComment?: ITaskComment;
  replies?: Array<ITaskComment>;
  lastEditedAt?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type IGroup = {
  _id: string;
  title: string;
  description?: string;
  image?: string;
  creator: IUser;
  members: Array<IUser>;
  status: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export enum ENUM_USER_ROLE {
  SUPER_ADMIN = "super_admin",
  ADMIN = "admin",
  USER = "user",
}

export enum ENUM_TASK_STATUS {
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  TODO = "todo",
}

export enum ENUM_TASK_PRIORITY {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}
