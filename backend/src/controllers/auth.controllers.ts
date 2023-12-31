import createHttpError from "http-errors";
import { CookieOptions, RequestHandler } from "express";
import { IUser } from "src/models";
import { createUser, signInUser } from "src/services/auth.service";
import { generateToken, omit, verifyToken } from "src/utils";
import context from "src/context";

type RegisterRequest = {
  name: string;
  email: string;
  picture: string;
  status: string;
  password: string;
};

type RegisterResponse = {
  message: string;
  accessToken: string;
  user: Omit<IUser, "password">;
};

const refreshTokenCookieOptions: CookieOptions = {
  httpOnly: true,
  path: "/api/v1/auth/token",
  maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
  sameSite: context.isLocal ? "lax" : "none",
  secure: !context.isLocal,
};

const register: RequestHandler<any, RegisterResponse, RegisterRequest> = async (req, res, next) => {
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
    res.cookie("refresh_token", refreshToken, refreshTokenCookieOptions);

    res.json({
      message: "register success.",
      accessToken,
      user: omit(newUser.toJSON(), ["password"]),
    });
  } catch (e) {
    next(e);
  }
};

type LoginRequest = {
  email: string;
  password: string;
};

type LoginResponse = {
  accessToken: string;
  user: Omit<IUser, "password">;
};

const login: RequestHandler<any, LoginResponse, LoginRequest> = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await signInUser({ email, password });
    const accessToken = await generateToken(
      { userId: user._id },
      "1d",
      process.env.ACCESS_TOKEN_SECRET!,
    );
    const refreshToken = await generateToken(
      { userId: user._id },
      "30d",
      process.env.REFRESH_TOKEN_SECRET!,
    );
    res.cookie("refresh_token", refreshToken, refreshTokenCookieOptions);
    res.json({
      accessToken,
      user: omit(user.toJSON(), ["password"]),
    });
  } catch (e) {
    next(e);
  }
};

const logout: RequestHandler = (req, res, next) => {
  try {
    res.clearCookie("refresh_token", {
      path: "/api/v1/auth/token",
    });
    res.status(200).json("Logged out.");
  } catch (e) {
    next(e);
  }
};

type RefreshTokenResponse = {
  accessToken: string;
};

const getToken: RequestHandler<any, RefreshTokenResponse> = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) {
      throw createHttpError.Unauthorized("Please login first.");
    }
    const payload = await verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET!);
    if (!payload || typeof payload !== "object" || payload.userId === undefined) {
      throw createHttpError.Unauthorized("Please login first.");
    }
    const userId = payload.userId;
    const accessToken = await generateToken({ userId }, "1d", process.env.ACCESS_TOKEN_SECRET!);
    // refreshトークンの有効期限が2週間未満の場合、新しいトークンを発行する
    if (payload.exp! - Date.now() / 1000 < 60 * 60 * 24 * 14) {
      const refreshToken = await generateToken(
        { userId },
        "30d",
        process.env.REFRESH_TOKEN_SECRET!,
      );
      res.cookie("refresh_token", refreshToken, refreshTokenCookieOptions);
    }
    res.status(200).json({ accessToken });
  } catch (e) {
    next(e);
  }
};

export { register, login, logout, getToken };
