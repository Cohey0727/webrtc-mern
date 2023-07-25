import express from "express";
import authRoutes from "./auth.routes";
import healthRoutes from "./health.routes";

const route = express.Router();

route.use("/auth", authRoutes);
route.use("/health", healthRoutes);

export default route;
