import { ENUM_TASK_PRIORITY, ENUM_TASK_STATUS } from "@/types";
import z from "zod";
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const createAndUpdateProjectSchema = z.object({
  title: z.string().min(3),
  status: z.boolean().default(true).optional(),
});

const createAndUpdateTaskSchema = z.object({
  title: z.string().min(3, "Name must be at least 3 characters long"),
  description: z.string().min(3, "Description is required"),
  dueDate: z
    .string()
    .datetime({ message: "Invalid date format, expected ISO 8601" }),
  priority: z.enum(
    Object.values(ENUM_TASK_PRIORITY) as [
      ENUM_TASK_PRIORITY,
      ...ENUM_TASK_PRIORITY[]
    ]
  ),
  assignedTo: z.string().optional(),
  category: z.string().min(1, "Project cannot be empty"),
  attachment: z.any().optional(),
  status: z
    .enum(
      Object.values(ENUM_TASK_STATUS) as [
        ENUM_TASK_STATUS,
        ...ENUM_TASK_STATUS[]
      ]
    )
    .default(ENUM_TASK_STATUS.TODO)
    .optional(),
});

const createAndUpdateGroupSchema = z.object({
  title: z.string().min(3, "Name must be at least 3 characters long"),
  description: z.string().optional(),
  image: z.any().optional(),
  status: z.boolean().default(true).optional(),
  members: z.array(z.any()).optional(),
});

const addAndUpdateUserSchema = z
  .object({
    fullName: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email(),
    status: z.boolean().default(true).optional(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
    profileImage: z.instanceof(File).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const changePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const addCommentSchema = z.object({
  comment: z.string().min(1, "Comment cannot be empty"),
});

export type ILoginSchema = z.infer<typeof loginSchema>;
export type ICreateAndUpdateProjectSchema = z.infer<
  typeof createAndUpdateProjectSchema
>;
export type ICreateAndUpdateTaskSchema = z.infer<
  typeof createAndUpdateTaskSchema
>;
export type ICreateAndUpdateGroupSchema = z.infer<
  typeof createAndUpdateGroupSchema
>;
export type IAddAndUpdateUserSchema = z.infer<typeof addAndUpdateUserSchema>;
export type IChangePasswordSchema = z.infer<typeof changePasswordSchema>;
export type IAddCommentSchema = z.infer<typeof addCommentSchema>;
export {
  loginSchema,
  createAndUpdateProjectSchema,
  createAndUpdateTaskSchema,
  createAndUpdateGroupSchema,
  addAndUpdateUserSchema,
  changePasswordSchema,
  addCommentSchema,
};
