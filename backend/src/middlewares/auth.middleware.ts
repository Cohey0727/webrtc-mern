import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { IUser, UserModel } from "src/models";
import { verifyToken } from "src/utils";

const authMiddleware: RequestHandler = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return next(createHttpError.Unauthorized("No token provided."));
  }
  const bearerToken = authHeader.split(" ");
  const token = bearerToken[1];
  if (!token) {
    return next(createHttpError.Unauthorized("No token provided."));
  }
  const payload = await verifyToken(token, process.env.ACCESS_TOKEN_SECRET!);
  if (!payload || typeof payload !== "object" || payload.userId === undefined) {
    throw createHttpError.Unauthorized("Please login first.");
  }
  const userId = payload.userId;
  const user = (await UserModel.findOne({ userId }).lean()) as IUser;
  if (!user) {
    throw createHttpError.Unauthorized("Please login first.");
  }
  req.user = user;
  next();
};

export default authMiddleware;
