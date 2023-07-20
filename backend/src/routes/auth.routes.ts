import express from "express";
import { authControllers } from "src/controllers";

const route = express.Router();

route.route("/register").post(authControllers.register);
route.route("/login").post(authControllers.login);
route.route("/logout").post(authControllers.logout);
route.route("/refreshToken").post(authControllers.refreshToken);

export default route;
