import mongoose, { Schema } from "mongoose";

const { ObjectId } = Schema.Types;

interface IMessage {
  _id: mongoose.Types.ObjectId;
  sender: mongoose.Types.ObjectId;
  message: string;
  conversation: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    sender: {
      type: ObjectId,
      ref: "UserModel",
    },
    message: {
      type: String,
      trim: true,
    },
    conversation: {
      type: ObjectId,
      ref: "ConversationModel",
    },
  },
  {
    collection: "messages",
    timestamps: true,
  },
);

const MessageModel = mongoose.model("MessageModel", messageSchema);

export { IMessage };
export default MessageModel;
