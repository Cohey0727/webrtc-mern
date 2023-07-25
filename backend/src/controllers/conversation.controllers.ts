import { Request, RequestHandler, Response } from "express";
import createHttpError from "http-errors";
import { logger } from "src/configs";
import { stringToObjectId } from "src/utils";

import {
  createConversation,
  doesConversationExist,
  getUserConversations,
  populateConversation,
} from "../services/conversation.service";

type CreateConversationRequest = {
  receiverId: string;
  isGroup: boolean;
};
type CreateConversationResponse = {};

const createOpenConversation: RequestHandler<
  any,
  CreateConversationResponse,
  CreateConversationRequest
> = async (req, res, next) => {
  try {
    const requestUser = req.user;
    if (!requestUser) {
      throw createHttpError.Unauthorized("認証されていません。");
    }
    const senderId = requestUser._id;
    const { receiverId: _receiverId, isGroup } = req.body;
    const receiverId = stringToObjectId(_receiverId);
    if (isGroup == false) {
      // 受信者のIDが提供されているか確認
      if (!receiverId) {
        logger.error("開始する会話のユーザIDを提供してください！");
        throw createHttpError.BadGateway("おっと…何かがうまくいきませんでした！");
      }
      // 会話がすでに存在するか確認
      const existedConversation = await doesConversationExist({
        senderId,
        receiverId,
        isGroup: false,
      });
      if (existedConversation) {
        throw createHttpError.Conflict("この会話はすでに存在します。");
      } else {
        const conversationData = {
          name: "会話名",
          picture: "会話の画像",
          isGroup: false,
          users: [senderId, receiverId],
          admin: senderId,
        };
        const newConversation = await createConversation(conversationData);
        const populatedConversation = await populateConversation({
          id: newConversation._id,
          fieldToPopulate: "users",
          fieldsToRemove: "-password",
        });
        res.status(200).json(populatedConversation);
      }
    } else {
      // グループチャット
      // グループチャットがすでに存在するか確認
      // const existedGroupConversation = await doesConversationExist("", "", isGroup);
      // res.status(200).json(existedGroupConversation);
      throw createHttpError.NotImplemented("グループチャットはまだ実装されていません。");
    }
  } catch (error) {
    next(error);
  }
};

type GetConversationsResponse = {};
type GetConversationsRequest = {};

const getConversations: RequestHandler<
  any,
  GetConversationsResponse,
  GetConversationsRequest
> = async (req, res, next) => {
  try {
    const requestUser = req.user;
    if (!requestUser) {
      throw createHttpError.Unauthorized("認証されていません。");
    }
    const userId = requestUser._id;
    const conversations = await getUserConversations(userId);
    res.status(200).json(conversations);
  } catch (error) {
    next(error);
  }
};

export { createOpenConversation, getConversations };
