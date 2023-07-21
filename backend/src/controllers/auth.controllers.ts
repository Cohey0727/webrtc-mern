import { RequestHandler } from "express";
import { UserModel } from "src/models";
import { createUser } from "src/services/auth.service";

type RegisterRequestBody = UserModel;

type RegisterResponseBody = {
  message: string;
};

const register: RequestHandler<
  any,
  RegisterResponseBody,
  RegisterRequestBody
> = async (req, res, next) => {
  try {
    const { name, email, picture, status, password } = req.body;
    await createUser({ name, email, picture, status, password });
    res.status(200).json({ message: "success" });
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
