import { NextFunction, Request, RequestHandler, Response } from "express";
import { logger } from "../configs";
import { updateLatestMessage } from "../services/conversation.service";
import {
  createMessage,
  getConversationMessages,
  populateMessage,
} from "../services/message.service";
import createHttpError from "http-errors";
import { stringToObjectId } from "src/utils";

type SendMessageRequest = {
  message: string;
  conversationId: string;
};

type SendMessageResponse = {};

const sendMessage: RequestHandler<any, SendMessageResponse, SendMessageRequest> = async (
  req,
  res,
  next,
) => {
  try {
    const requestUser = req.user;
    if (!requestUser) {
      throw createHttpError.Unauthorized("認証されていません。");
    }

    const userId = requestUser._id!;
    const { message, conversationId: _conversationId } = req.body;
    const conversationId = stringToObjectId(_conversationId);

    // メッセージ本文と会話IDの有無を確認します。
    if (!conversationId || !message) {
      logger.error("Please provider a conversation id and a message body");
      return res.sendStatus(400);
    }

    const msgData = {
      sender: userId,
      message,
      conversation: conversationId,
    };

    const newMessage = await createMessage({
      sender: userId,
      message,
      conversation: conversationId,
    });
    const populatedMessage = await populateMessage(newMessage._id);
    await updateLatestMessage(conversationId, newMessage._id);
    res.json(populatedMessage);
  } catch (error) {
    next(error);
  }
};

type GetMessagesRequest = {
  conversationId: string;
};

type GetMessagesResponse = {};

// 会話に関連するメッセージを取得します。
const getMessages: RequestHandler<any, GetMessagesResponse, GetMessagesRequest> = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { _conversionId } = req.params;
    if (!_conversionId) {
      logger.error("Please add a conversation id in params.");
      res.sendStatus(400);
    }
    const conversionId = stringToObjectId(_conversionId);
    const messages = await getConversationMessages(conversionId);
    res.json(messages);
  } catch (error) {
    next(error);
  }
};

export { sendMessage, getMessages };
