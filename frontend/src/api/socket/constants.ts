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

export { SocketEvent };
