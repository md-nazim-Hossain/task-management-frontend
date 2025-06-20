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
  slug: string;
  creator: Pick<IUser, "_id" | "fullName" | "email">;
  tasks?: Array<ITask>;
  status: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  completedTasksCount?: number;
};

export type ITaskAttachment = {
  fileName: string;
  fileUrl: string;
  mimeType: string;
  size: number;
};
export type ITask = {
  _id?: string;
  title: string;
  description: string;
  status?: ENUM_TASK_STATUS;
  creator: Pick<IUser, "_id" | "fullName" | "email">;
  dueDate: string;
  assignedTo?: IGroup | string;
  category: IProject | string;
  priority?: ENUM_TASK_PRIORITY;
  attachment?: ITaskAttachment | File;
  createdAt?: Date;
  updatedAt?: Date;
};

export type ITaskComment = {
  _id?: string;
  task: ITask;
  author: Pick<IUser, "_id" | "fullName" | "email" | "profileImage">;
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
  creator: Pick<IUser, "_id" | "fullName" | "email" | "profileImage">;
  members: Array<Pick<IUser, "_id" | "fullName" | "email" | "profileImage">>;
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
export type IAPIResponse<T = unknown> = {
  success: boolean;
  data: T | null;
  message: string;
  error: string | null;
  meta?: IPaginationMeta;
};

export type IPaginationMeta = {
  previousId: number | null;
  nextId: number | null;
  currentId: number;
  total: number;
  totalPage: number;
  limit: number;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
  user: IUser;
};

export type IFromUpdateData = {
  id: string;
  body: FormData;
};

export type INotification = {
  _id: string;
  sender: IUser;
  receiver: IUser;
  message: string;
  notificationType: string;
  isRead: boolean;
  createdAt?: string;
  updatedAt?: string;
  task: ITask;
};
