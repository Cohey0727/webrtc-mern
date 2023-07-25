import mongoose from "mongoose";

// ObjectIdから文字列への変換
const objectIdToString = (objectId: mongoose.Types.ObjectId) => {
  return objectId.toString();
};

// 文字列からObjectIdへの変換
const stringToObjectId = (text: string) => {
  return new mongoose.Types.ObjectId(text);
};

export { objectIdToString, stringToObjectId };
