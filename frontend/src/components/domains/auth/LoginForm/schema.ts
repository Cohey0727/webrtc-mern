import { z } from "zod";

const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type LoginFormValues = z.infer<typeof LoginFormSchema>;

export type { LoginFormValues };
export { LoginFormSchema };
