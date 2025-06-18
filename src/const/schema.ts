import z from "zod";
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const createAndUpdateProjectSchema = z.object({
  title: z.string().min(3),
  status: z.boolean().default(true).optional(),
});

export type ILoginSchema = z.infer<typeof loginSchema>;
export type ICreateAndUpdateProjectSchema = z.infer<
  typeof createAndUpdateProjectSchema
>;
export { loginSchema, createAndUpdateProjectSchema };
