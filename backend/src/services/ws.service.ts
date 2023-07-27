import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { OnlineUserModel } from "src/models";

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
  // 通話をかける
  DoCall: "DoCall",
  // 通話がかかってくる
  ReceiveCall: "ReceiveCall",
  // かかってきた通話を拒否
  RejectCall: "RejectCall",
  // かけている通話をキャンセル
  CancelCall: "CancelCall",
  // 通話にでる
  AcceptCall: "AcceptCall",
  // 通話にでてもられた
  AcceptedCall: "AcceptedCall",
  // 通話を終了
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
    // 参加したユーザーをオンラインユーザーに追加
    const onlineUser = await OnlineUserModel.findOne({ user: userId });
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
    const onlineUsers = await OnlineUserModel.find().populate("user", "-password").lean();
    io.emit(SocketEvent.GetOnlineUsers, onlineUsers);
    // socket idを送信
    io.emit(SocketEvent.SetupSocket, socket.id);
  });

  socket.on(SocketEvent.Leave, async () => {
    await OnlineUserModel.updateMany({}, { $pull: { socketIds: socket.id } });
    await OnlineUserModel.deleteMany({ socketIds: { $size: 0 } });
    const onlineUsers = await OnlineUserModel.find().lean();
    io.emit(SocketEvent.GetOnlineUsers, onlineUsers);
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
  socket.on(SocketEvent.DoCall, async (data: any) => {
    const { userId } = data;
    const onlineUser = await OnlineUserModel.findOne({ user: userId });
    if (!onlineUser) {
      return;
    }
    onlineUser.socketIds.forEach((socketId) => {
      io.to(socketId).emit(SocketEvent.ReceiveCall, {
        signal: data.signal,
        from: data.from,
        // name: data.name,
        // picture: data.picture,
      });
    });
  });
  // ---通話の応答
  socket.on(SocketEvent.AcceptCall, (data: any) => {
    io.to(data.to).emit(SocketEvent.AcceptedCall, data.signal);
  });

  // ---通話の終了
  socket.on(SocketEvent.EndCall, (id: string) => {
    io.to(id).emit(SocketEvent.EndCall);
  });
};

export { handleSocketIO, SocketEvent };
