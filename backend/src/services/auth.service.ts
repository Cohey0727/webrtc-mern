import createHttpError from "http-errors";
import { getUserCollection, UserModel, UserSchema } from "src/models";
import { ZodError } from "zod";
import bcrypt from "bcrypt";
import { removeUndefined } from "src/utils";

const defaultUserData = {
  picture: "https://webrtc-mern.vercel.app/person.png",
};

const createUser = async (userData: UserModel) => {
  try {
    // Merge default user data with user data from request body
    userData = { ...defaultUserData, ...removeUndefined(userData) };

    // Validate user schema
    UserSchema.parse(userData);

    const collection = getUserCollection();
    // Check if user already exists
    const existsEmail = await collection.findOne({
      email: userData.email,
    });

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    if (existsEmail) {
      throw createHttpError.Conflict(`Email ${userData.email} already exists.`);
    }
    await collection.insertOne(userData);
  } catch (e) {
    if (e instanceof ZodError) {
      throw createHttpError.BadRequest(JSON.parse(e.message));
    }
    throw e;
  }
};

export { createUser };
