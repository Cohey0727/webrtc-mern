import { MongoDB } from "src/configs";
import { z } from "zod";

const UserSchema = z.object({
  name: z.string().min(3).max(255),
  email: z.string().email(),
  picture: z.string().url().optional(),
  status: z.string().min(3).max(255),
  password: z.string().min(8).max(32),
});

type UserModel = z.infer<typeof UserSchema>;

const getUserCollection = () => MongoDB.db.collection<UserModel>("users");

export { UserSchema, UserModel, getUserCollection };
