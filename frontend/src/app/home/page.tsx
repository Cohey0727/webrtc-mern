"use client";
import { SocketEvent } from "@/api/socket/constants";
import {
  CallPanel,
  Column,
  RingingDialog,
  Row,
  useAuth,
  useSocket,
  withAuthGuard,
} from "@/components";
import { OnlineUser } from "@/types";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import Peer from "simple-peer";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./styles";

const Home = () => {
  const { userId } = useAuth();
  const { socket } = useSocket();
  const [mySocketId, setMySocketId] = useState<string | null>(null);
  const [myMediaStream, setMyMediaStream] = useState<MediaStream | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [ringing, setRinging] = useState(false);
  const [paterSocketId, setPartnerSocketId] = useState<string | null>(null);
  const [receivedSignal, setReceivedSignal] = useState<Peer.SignalData | null>(null);

  const peerRef = useRef<Peer.Instance | null>(null);
  const ownVideoRef = useRef<HTMLVideoElement>({} as HTMLVideoElement);
  const partnerVideoRef = useRef<HTMLVideoElement>({} as HTMLVideoElement);

  const setupMedia = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    setMyMediaStream(stream);
  }, []);

  useEffect(() => {
    if (!socket) return;
    setupMedia();
    socket.emit(SocketEvent.Join);
    socket.on(SocketEvent.GetOnlineUsers, setOnlineUsers);
    socket.on(SocketEvent.SetupSocket, (socketId) => {
      // 自分のsocketIdを受け取る
      setMySocketId(socketId);
    });
    socket.on(SocketEvent.ReceiveCall, (data) => {
      // 受信
      console.log({ data });
      setRinging(true);
      setReceivedSignal(data.signal);
      setPartnerSocketId(data.from);
    });
    socket.on(SocketEvent.CancelCall, (data) => {
      // 着信中にキャンセル
      setRinging(false);
    });

    return () => {
      socket.emit(SocketEvent.Leave);
    };
  }, [socket, setupMedia]);
  //--------------------------

  useEffect(() => {
    if (!myMediaStream) return;
    ownVideoRef.current.srcObject = myMediaStream;
  }, [myMediaStream]);

  const handleClickUser = useCallback(
    (onlineUser: OnlineUser) => {
      if (!socket || !myMediaStream || !mySocketId) return;
      const userId = onlineUser.user._id;
      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream: myMediaStream,
      });
      peer.on("signal", (data) => {
        socket.emit(SocketEvent.DoCall, {
          userId,
          from: mySocketId,
          signal: data,
        });
      });
      peer.on("stream", (stream) => {
        console.log("stream", { stream });
        partnerVideoRef.current.srcObject = stream;
        partnerVideoRef.current.play();
      });
      peer.on("error", (err) => console.log("peer error1", err));
      socket.on(SocketEvent.AcceptedCall, (signal) => {
        // 相手が着信を受け入れた
        console.log(SocketEvent.AcceptedCall, signal);
        peer.signal(signal);
      });
      peerRef.current = peer;
    },
    [myMediaStream, mySocketId, socket],
  );

  const onlineUsersExcludeMe = useMemo(
    () => onlineUsers.filter((onlineUser) => onlineUser.user._id !== userId),
    [onlineUsers, userId],
  );

  const handleAccept = useCallback(() => {
    if (!socket || !myMediaStream || !mySocketId || !receivedSignal) return;
    setRinging(false);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: myMediaStream,
    });

    // 発信側からの信号データを受け取る
    peer.on("signal", (signal) => {
      socket.emit(SocketEvent.AcceptCall, {
        signal,
        to: paterSocketId,
      });
    });
    peer.on("stream", (stream) => {
      console.log("stream", stream);
      partnerVideoRef.current.srcObject = stream;
      partnerVideoRef.current.play();
    });
    peer.signal(receivedSignal);
    peer.on("error", (err) => console.log("peer error2", err));
    peerRef.current = peer;
  }, [socket, myMediaStream, mySocketId, receivedSignal, paterSocketId]);

  const handleReject = useCallback(() => {
    socket?.emit(SocketEvent.RejectCall);
    setRinging(false);
  }, [socket]);

  return (
    <Row sx={styles.root}>
      <RingingDialog ringing={ringing} onAccept={handleAccept} onReject={handleReject} />
      <Column sx={styles.userListContainer}>
        <List sx={styles.useList}>
          {onlineUsersExcludeMe.map((onlineUser) => {
            const { user } = onlineUser;
            return (
              <ListItem key={onlineUser._id} sx={styles.useListItem}>
                <ListItemButton onClick={() => handleClickUser(onlineUser)}>
                  <ListItemAvatar>
                    <Avatar alt={user.name} src={user.picture} />
                  </ListItemAvatar>
                  <ListItemText primary={user.name} secondary={user.status} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Column>
      <CallPanel ownVideoRef={ownVideoRef} partnerVideoRef={partnerVideoRef} />
    </Row>
  );
};

export default withAuthGuard(Home);
