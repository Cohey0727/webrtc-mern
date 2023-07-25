import createHttpError from "http-errors";
import { IMessage, MessageModel } from "../models";
import mongoose, { Document } from "mongoose";

// Message型を定義
type CreateMessageParams = Omit<IMessage, "_id" | "createdAt" | "updatedAt">;

const createMessage = async (params: CreateMessageParams) => {
  const newMessage = await MessageModel.create(params);
  if (!newMessage) throw createHttpError.BadRequest("Oops...Something went wrong !");
  return newMessage;
};

const populateMessage = async (id: mongoose.Types.ObjectId) => {
  const message = await MessageModel.findById(id)
    .populate({
      path: "sender",
      select: "name picture",
      model: "UserModel",
    })
    .populate({
      path: "conversation",
      select: "name picture isGroup users",
      model: "ConversationModel",
      populate: {
        path: "users",
        select: "name email picture status",
        model: "UserModel",
      },
    });
  if (!message) throw createHttpError.BadRequest("Oops...Something went wrong !");
  return message;
};

const getConversationMessages = async (conversationId: mongoose.Types.ObjectId) => {
  const messages = await MessageModel.find({ conversation: conversationId })
    .populate("sender", "name picture email status")
    .populate("conversation");
  if (!messages) {
    throw createHttpError.BadRequest("Oops...Something went wrong !");
  }
  return messages;
};

export { createMessage, populateMessage, getConversationMessages };
