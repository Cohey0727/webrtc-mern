import express from "express";
import { authMiddleware } from "../middlewares";
import { createOpenConversation, getConversations } from "../controllers/conversation.controllers";
const router = express.Router();

router.route("/").post(authMiddleware, createOpenConversation);
router.route("/").get(authMiddleware, getConversations);

export default router;
