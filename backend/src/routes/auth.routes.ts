import express from "express";

const route = express.Router();

route.route("/register").post((req, res) => {
  res.send("hello register");
});

route.route("/login").post((req, res) => {
  res.send("hello register");
});

route.route("/logout").post((req, res) => {
  res.send("hello register");
});

route.route("/refreshToken").post((req, res) => {
  res.send("hello register");
});

export default route;
