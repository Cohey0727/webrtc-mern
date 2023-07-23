import { z } from "zod";

const RegisterFormSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  passwordConfirmation: z.string().min(8),
});

type RegisterFormValues = z.infer<typeof RegisterFormSchema>;

export type { RegisterFormValues };
export { RegisterFormSchema };
