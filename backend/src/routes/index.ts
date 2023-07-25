import express from "express";
import authRoutes from "./auth.routes";
import healthRoutes from "./health.routes";
import conversationRoutes from "./conversation.routes";
import messageRoutes from "./message.routes";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/health", healthRoutes);
router.use("/conversation", conversationRoutes);
router.use("/message", messageRoutes);

export default router;
