import express from "express";
import { healthControllers } from "src/controllers";

const route = express.Router();

route.route("/set-cookie").get(healthControllers.setCookie);
route.route("/get-cookie").get(healthControllers.getCookie);

export default route;
