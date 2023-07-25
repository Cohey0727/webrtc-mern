import mongoose from "mongoose";
import createHttpError from "http-errors";
import { ConversationModel, IConversation, UserModel } from "../models";

type DoesConversationExistParams = {
  senderId: mongoose.Types.ObjectId;
  receiverId: mongoose.Types.ObjectId;
  isGroup: boolean;
};

const doesConversationExist = async (params: DoesConversationExistParams) => {
  const { senderId, receiverId, isGroup } = params;
  if (!isGroup) {
    // 個別チャットの場合、会話が存在するかを確認します
    const conversations = await ConversationModel.find({
      isGroup: false,
      $and: [
        { users: { $elemMatch: { $eq: senderId } } },
        { users: { $elemMatch: { $eq: receiverId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    if (!conversations) throw createHttpError.BadRequest("エラーが発生しました。");

    // メッセージモデルをポピュレートします
    const populatedConversations = await UserModel.populate(conversations, {
      path: "latestMessage.sender",
      select: "name email picture status",
    });

    return populatedConversations[0];
  } else {
    // グループチャットの場合、会話が存在するかを確認します
    const conversations = await ConversationModel.findById(isGroup)
      .populate("users admin", "-password")
      .populate("latestMessage");

    if (!conversations) throw createHttpError.BadRequest("エラーが発生しました。");

    // メッセージモデルをポピュレートします
    const populatedConversion = await UserModel.populate(conversations, {
      path: "latestMessage.sender",
      select: "name email picture status",
    });

    return populatedConversion;
  }
};

type CreateConversationParams = Omit<IConversation, "_id" | "createdAt" | "updatedAt">;

const createConversation = async (params: CreateConversationParams) => {
  // 新規会話を作成します
  const newConversation = await ConversationModel.create(params);
  if (!newConversation) throw createHttpError.BadRequest("エラーが発生しました。");
  return newConversation;
};

type PopulateConversationParams = {
  id: mongoose.Types.ObjectId;
  fieldToPopulate: string;
  fieldsToRemove: string;
};

const populateConversation = async (params: PopulateConversationParams) => {
  const { id, fieldToPopulate, fieldsToRemove } = params;
  // 指定されたフィールドをポピュレートします
  const populatedConversation = await ConversationModel.findOne({ _id: id }).populate(
    fieldToPopulate,
    fieldsToRemove,
  );
  if (!populatedConversation) throw createHttpError.BadRequest("エラーが発生しました。");
  return populatedConversation;
};

const getUserConversations = async (userId: mongoose.Types.ObjectId) => {
  // ユーザーの全ての会話を取得します
  const conversations = await ConversationModel.find({
    users: { $elemMatch: { $eq: userId } },
  })
    .populate("users", "-password")
    .populate("admin", "-password")
    .populate("latestMessage")
    .sort({ updatedAt: -1 })
    .then(async (results) => {
      const populatedResults = await UserModel.populate(results, {
        path: "latestMessage.sender",
        select: "name email picture status",
      });
      return populatedResults;
    })
    .catch((err) => {
      throw createHttpError.BadRequest("エラーが発生しました。");
    });
  return conversations;
};

const updateLatestMessage = async (
  conversationId: mongoose.Types.ObjectId,
  messageId: mongoose.Types.ObjectId,
) => {
  // 最新のメッセージを更新します
  const updatedConversion = await ConversationModel.findByIdAndUpdate(conversationId, {
    latestMessage: messageId,
  });
  if (!updatedConversion) throw createHttpError.BadRequest("エラーが発生しました。");

  return updatedConversion;
};

export {
  doesConversationExist,
  createConversation,
  populateConversation,
  getUserConversations,
  updateLatestMessage,
};
