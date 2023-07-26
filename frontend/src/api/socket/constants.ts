const SocketEvent = {
  Connect: "connect",
  Disconnect: "Disconnect",
  SetupSocket: "SetupSocket",
  Join: "Join",
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

export { SocketEvent };
