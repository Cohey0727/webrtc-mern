import mongoose from "mongoose";
import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import OnlineUserModel from "src/models/online-users.model";
import { objectIdToString } from "src/utils";

const handleSocketIO = (
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
) => {
  // ユーザーがアプリに参加もしくはアプリを開く
  socket.on("join", async (userId: mongoose.Types.ObjectId) => {
    socket.join(objectIdToString(userId));
    // 参加したユーザーをオンラインユーザーに追加
    const onlineUser = await OnlineUserModel.findOne({ userId });
    if (!onlineUser) {
      const newOnlineUser = new OnlineUserModel({ userId, socketId: socket.id });
      await newOnlineUser.save();
    }
    // フロントエンドにオンラインユーザーを送信
    const onlineUsers = await OnlineUserModel.find();
    io.emit("get-online-users", onlineUsers);
    // socket idを送信
    io.emit("setup socket", socket.id);
  });

  // socketの切断
  socket.on("disconnect", async () => {
    await OnlineUserModel.deleteOne({ socketId: socket.id });
    const onlineUsers = await OnlineUserModel.find();
    io.emit("get-online-users", onlineUsers);
  });

  // 会話ルームに参加
  socket.on("join conversation", (conversation: any) => {
    socket.join(conversation);
  });

  // メッセージの送受信
  socket.on("send message", (message: any) => {
    const conversation = message.conversation;
    if (!conversation.users) return;
    conversation.users.forEach((user: any) => {
      if (user._id === message.sender._id) return;
      socket.in(user._id).emit("receive message", message);
    });
  });

  // 入力中
  socket.on("typing", (conversation: any) => {
    socket.in(conversation).emit("typing", conversation);
  });
  socket.on("stop typing", (conversation: any) => {
    socket.in(conversation).emit("stop typing");
  });

  // 通話
  // ---ユーザーへの通話
  socket.on("call user", async (data: any) => {
    const userId = data.userToCall;
    const onlineUser = await OnlineUserModel.findOne({ userId });
    if (!onlineUser) {
      return;
    }
    io.to(onlineUser.socketId).emit("call user", {
      signal: data.signal,
      from: data.from,
      name: data.name,
      picture: data.picture,
    });
  });
  // ---通話の応答
  socket.on("answer call", (data: any) => {
    io.to(data.to).emit("call accepted", data.signal);
  });

  // ---通話の終了
  socket.on("end call", (id: string) => {
    io.to(id).emit("end call");
  });
};

export { handleSocketIO };
