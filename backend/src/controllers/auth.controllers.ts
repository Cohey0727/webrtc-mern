import { RequestHandler } from "express";
import { Types } from "mongoose";
import { IUser } from "src/models";
import { createUser } from "src/services/auth.service";
import { generateToken, omit } from "src/utils";

type RegisterRequestBody = Omit<IUser, "_id" | "createdAt" | "updatedAt">;

type RegisterResponseBody = {
  message: string;
  user: Omit<IUser, "password"> & { accessToken: string };
};

const register: RequestHandler<any, RegisterResponseBody, RegisterRequestBody> = async (
  req,
  res,
  next,
) => {
  try {
    const { name, email, picture, status, password } = req.body;
    const newUser = await createUser({ name, email, picture, status, password });
    const accessToken = await generateToken(
      { userId: newUser._id },
      "1d",
      process.env.ACCESS_TOKEN_SECRET!,
    );
    const refreshToken = await generateToken(
      { userId: newUser._id },
      "30d",
      process.env.REFRESH_TOKEN_SECRET!,
    );
    res.cookie("refreshtoken", refreshToken, {
      httpOnly: true,
      path: "/api/v1/auth/refreshtoken",
      maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
    });

    res.json({
      message: "register success.",
      user: {
        ...omit(newUser.toJSON(), ["password"]),
        accessToken,
      },
    });
  } catch (e) {
    next(e);
  }
};

const login: RequestHandler = (req, res, next) => {
  try {
    res.status(200).json("Hello login");
  } catch (e) {
    next(e);
  }
};

const logout: RequestHandler = (req, res, next) => {
  try {
    res.status(200).json("Hello logout");
  } catch (e) {
    next(e);
  }
};

const refreshToken: RequestHandler = (req, res, next) => {
  try {
    res.status(200).json("Hello refreshToken");
  } catch (e) {
    next(e);
  }
};

export { register, login, logout, refreshToken };
