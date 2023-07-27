import mongoose, { Schema } from "mongoose";

const { ObjectId } = Schema.Types;

interface IOnlineUser {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  socketIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

const onlineUserSchema = new Schema<IOnlineUser>(
  {
    user: {
      type: ObjectId,
      unique: true,
      ref: "ConversationModel",
    },
    socketIds: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    collection: "online_users",
    timestamps: true,
  },
);

const OnlineUserModel = mongoose.model("OnlineUserModel", onlineUserSchema);

export { IOnlineUser };
export default OnlineUserModel;
