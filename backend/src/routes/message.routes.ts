import express from "express";
import { authMiddleware } from "../middlewares";
import { sendMessage, getMessages } from "../controllers/message.controllers";
const router = express.Router();

router.route("/").post(authMiddleware, sendMessage);
router.route("/:conversationId").get(authMiddleware, getMessages);
export default router;
