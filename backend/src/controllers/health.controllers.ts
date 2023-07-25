import { RequestHandler } from "express";
import { objectEntries } from "src/utils";

type SetCookieRequestBody = {};

type SetCookieResponseBody = string;

const setCookie: RequestHandler<any, SetCookieResponseBody, SetCookieRequestBody> = async (
  req,
  res,
  next,
) => {
  try {
    res.cookie("NumberValue", 98765, {
      httpOnly: true,
      path: "/",
      maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
    });
    res.cookie("text-value", "hello world", {
      httpOnly: true,
      path: "/",
      maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
    });
    res.cookie("time_value", new Date(), {
      httpOnly: true,
      path: "/",
      maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
    });
    res.send("Set Cookie Success.");
  } catch (e) {
    next(e);
  }
};

const getCookie: RequestHandler<any, SetCookieResponseBody, SetCookieRequestBody> = async (
  req,
  res,
  next,
) => {
  try {
    res.json(req.cookies);
  } catch (e) {
    next(e);
  }
};

export { setCookie, getCookie };
