import { ENUM_TASK_PRIORITY } from "@/types";
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
  description: z.string().optional(),
  dueDate: z
    .string()
    .datetime({ message: "Invalid date format, expected ISO 8601" }),
  priority: z.enum(Object.values(ENUM_TASK_PRIORITY) as [string, ...string[]]),
  assignedTo: z.string().optional(),
  category: z.string().min(1, "Project cannot be empty"),
  attachment: z.instanceof(File).optional(),
});

export type ILoginSchema = z.infer<typeof loginSchema>;
export type ICreateAndUpdateProjectSchema = z.infer<
  typeof createAndUpdateProjectSchema
>;
export type ICreateAndUpdateTaskSchema = z.infer<
  typeof createAndUpdateTaskSchema
>;
export { loginSchema, createAndUpdateProjectSchema, createAndUpdateTaskSchema };
