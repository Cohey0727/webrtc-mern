import mongoose, { Schema } from "mongoose";

const { ObjectId } = Schema.Types;

interface IConversation {
  _id: mongoose.Types.ObjectId;
  name: string;
  picture: string;
  isGroup: boolean;
  users: mongoose.Types.ObjectId[];
  latestMessage?: mongoose.Types.ObjectId;
  admin: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const conversationSchema = new Schema<IConversation>(
  {
    name: {
      type: String,
      required: [true, "Conversations name is required."],
      trim: true,
    },
    picture: {
      type: String,
      required: true,
    },
    isGroup: {
      type: Boolean,
      required: true,
      default: false,
    },
    users: [
      {
        type: ObjectId,
        ref: "UserModel",
      },
    ],
    latestMessage: {
      type: ObjectId,
      ref: "MessageModel",
    },
    admin: {
      type: ObjectId,
      ref: "UserModel",
    },
  },
  {
    collection: "conversations",
    timestamps: true,
  },
);

const ConversationModel = mongoose.model("ConversationModel", conversationSchema);

export { IConversation };
export default ConversationModel;
