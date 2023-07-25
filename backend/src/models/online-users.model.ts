import mongoose, { Schema } from "mongoose";

const { ObjectId } = Schema.Types;

interface IOnlineUser {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  socketId: string;
  createdAt: Date;
  updatedAt: Date;
}

const onlineUserSchema = new Schema<IOnlineUser>(
  {
    user: {
      type: ObjectId,
      ref: "ConversationModel",
    },
    socketId: {
      type: String,
      trim: true,
    },
  },
  {
    collection: "users",
    timestamps: true,
  },
);

const OnlineUserModel = mongoose.model("OnlineUserModel", onlineUserSchema);

export { IOnlineUser };
export default OnlineUserModel;
