import mongoose from "mongoose";
import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { OnlineUserModel } from "src/models";
import { objectIdToString } from "src/utils";

const SocketEvent = {
  Connect: "connect",
  Disconnect: "Disconnect",
  SetupSocket: "SetupSocket",
  Join: "Join",
  Leave: "Leave",
  JoinConversation: "JoinConversation",
  SendMessage: "SendMessage",
  ReceiveMessage: "ReceiveMessage",
  Typing: "Typing",
  StopTyping: "StopTyping",
  CallUser: "CallUser",
  AnswerCall: "AnswerCall",
  AcceptCall: "AcceptCall",
  EndCall: "EndCall",
  GetOnlineUsers: "GetOnlineUsers",
} as const;

const handleSocketIO = (
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  userId: string,
) => {
  // ユーザーがアプリに参加もしくはアプリを開く
  socket.on(SocketEvent.Join, async () => {
    socket.join(userId);
    // 参加したユーザーをオンラインユーザーに追加
    const onlineUser = await OnlineUserModel.findOne({ userId });
    if (!onlineUser) {
      const newOnlineUser = new OnlineUserModel({ user: userId, socketIds: [socket.id] });
      await newOnlineUser.save();
    } else {
      // すでにオンラインユーザーに存在する場合はsocket idを追加
      if (!onlineUser.socketIds.includes(socket.id)) {
        onlineUser.socketIds.push(socket.id);
        await onlineUser.save();
      }
    }
    // フロントエンドにオンラインユーザーを送信
    const onlineUsers = await OnlineUserModel.find().lean();
    io.emit(SocketEvent.GetOnlineUsers, onlineUsers);
    // socket idを送信
    io.emit(SocketEvent.SetupSocket, socket.id);
  });

  socket.on(SocketEvent.Leave, async (userId: string) => {
    socket.leave(userId);
  });

  // socketの切断
  socket.on(SocketEvent.Disconnect, async () => {
    await OnlineUserModel.updateMany({}, { $pull: { socketIds: socket.id } });
    // socketIdsが空になったユーザーのレコードを削除
    await OnlineUserModel.deleteMany({ socketIds: { $size: 0 } });
    const onlineUsers = await OnlineUserModel.find().lean();
    io.emit(SocketEvent.GetOnlineUsers, onlineUsers);
  });

  // 会話ルームに参加
  socket.on(SocketEvent.JoinConversation, (conversation: any) => {
    socket.join(conversation);
  });

  // メッセージの送受信
  socket.on(SocketEvent.SendMessage, (message: any) => {
    const conversation = message.conversation;
    if (!conversation.users) return;
    conversation.users.forEach((user: any) => {
      if (user._id === message.sender._id) return;
      socket.in(user._id).emit(SocketEvent.ReceiveMessage, message);
    });
  });

  // 入力中
  socket.on(SocketEvent.Typing, (conversation: any) => {
    socket.in(conversation).emit(SocketEvent.Typing, conversation);
  });
  socket.on(SocketEvent.StopTyping, (conversation: any) => {
    socket.in(conversation).emit(SocketEvent.StopTyping);
  });

  // 通話
  // ---ユーザーへの通話
  socket.on(SocketEvent.CallUser, async (data: any) => {
    const userId = data.userToCall;
    const onlineUser = await OnlineUserModel.findOne({ userId });
    if (!onlineUser) {
      return;
    }
    onlineUser.socketIds.forEach((socketId) => {
      io.to(socketId).emit(SocketEvent.CallUser, {
        signal: data.signal,
        from: data.from,
        name: data.name,
        picture: data.picture,
      });
    });
  });
  // ---通話の応答
  socket.on(SocketEvent.AnswerCall, (data: any) => {
    io.to(data.to).emit(SocketEvent.AcceptCall, data.signal);
  });

  // ---通話の終了
  socket.on(SocketEvent.EndCall, (id: string) => {
    io.to(id).emit(SocketEvent.EndCall);
  });
};

export { handleSocketIO, SocketEvent };
