import { RequestHandler } from "express";

const register: RequestHandler = (req, res, next) => {
  try {
    res.status(200).json("Hello register");
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
