import mongoose from "mongoose";
import createHttpError from "http-errors";
import { IUser, UserModel } from "src/models";
import bcrypt from "bcrypt";
import { removeUndefined } from "src/utils";

type UserData = Omit<IUser, "_id" | "createdAt" | "updatedAt">;

const defaultUserData = {
  picture: "https://webrtc-mern.vercel.app/person.png",
};

const createUser = async (userData: UserData) => {
  try {
    // Merge default user data
    userData = { ...defaultUserData, ...removeUndefined(userData) };

    // Check if user already exists
    const existsEmail = await UserModel.findOne({ email: userData.email });
    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 8);
    userData.password = hashedPassword;

    if (existsEmail) {
      throw createHttpError.Conflict(`Email ${userData.email} already exists.`);
    }

    const user = await new UserModel(userData).save();
    return user;
  } catch (e) {
    if (e instanceof mongoose.MongooseError) {
      throw createHttpError.BadRequest(e.message);
    }
    throw e;
  }
};

export { createUser };
