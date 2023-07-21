import bcrypt from "bcrypt";
import mongoose from "mongoose";
import createHttpError from "http-errors";
import { IUser, UserModel } from "src/models";
import { hashPassword, removeUndefined } from "src/utils";
import { logger } from "src/configs";

type CreateUserData = Omit<IUser, "_id" | "createdAt" | "updatedAt">;

const defaultUserData = {
  picture: "https://webrtc-mern.vercel.app/person.png",
};

const createUser = async (data: CreateUserData) => {
  try {
    // Merge default user data
    data = { ...defaultUserData, ...removeUndefined(data) };

    // Check if user already exists
    const existsEmail = await UserModel.findOne({ email: data.email });
    // Hash password
    const hashedPassword = await hashPassword(data.password);
    data.password = hashedPassword;

    if (existsEmail) {
      throw createHttpError.Conflict(`Email ${data.email} already exists.`);
    }

    const user = await new UserModel(data).save();
    return user;
  } catch (e) {
    if (e instanceof mongoose.MongooseError) {
      throw createHttpError.BadRequest(e.message);
    }
    throw e;
  }
};

type SignInUserData = {
  email: string;
  password: string;
};

const signInUser = async (data: SignInUserData) => {
  const { email, password } = data;
  const user = await UserModel.findOne({ email });
  if (!user) {
    logger.info(`User with email ${email} not found.`);
    throw createHttpError.Unauthorized("Incorrect email or password.");
  }

  const matchedPassword = await bcrypt.compare(password, user.password);
  if (matchedPassword) {
    logger.info(`Incorrect password for user with email ${email}.`);
    throw createHttpError.Unauthorized("Incorrect email or password.");
  }
  return user;
};

export { createUser, signInUser };
