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
import { createPeerAndSignal, useAudio } from "@/utils";

type ReceivedData = {
  signal: Peer.SignalData;
  socketId: string;
};

const Home = () => {
  const { userId } = useAuth();
  const { socket } = useSocket();
  const [mySocketId, setMySocketId] = useState<string | null>(null);
  const [myMediaStream, setMyMediaStream] = useState<MediaStream | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [receivedData, setReceivedData] = useState<ReceivedData | null>(null);
  const [ringing, setRinging] = useAudio("/audio/ringtone.mp3");

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
      setRinging(true);
      setReceivedData({
        signal: data.signal,
        socketId: data.from,
      });
    });
    socket.on(SocketEvent.CancelCall, (data) => {
      // 着信中にキャンセル
      setRinging(false);
    });

    return () => {
      socket.emit(SocketEvent.Leave);
    };
  }, [socket, setupMedia, setRinging]);

  useEffect(() => {
    if (!myMediaStream) return;
    ownVideoRef.current.srcObject = myMediaStream;
  }, [myMediaStream]);

  const handleClickUser = useCallback(
    async (onlineUser: OnlineUser) => {
      if (!socket || !myMediaStream || !mySocketId) return;
      const { peer, signal } = await createPeerAndSignal(myMediaStream);
      const userId = onlineUser.user._id;
      socket.emit(SocketEvent.DoCall, {
        userId,
        from: mySocketId,
        signal,
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
    if (!socket || !myMediaStream || !mySocketId || !receivedData) return;
    setRinging(false);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: myMediaStream,
    });

    // 発信側からのsignalデータを受け取る
    peer.signal(receivedData.signal);

    peer.on("signal", (signal) => {
      // 相手にsignalデータを送る
      socket.emit(SocketEvent.AcceptCall, {
        signal,
        to: receivedData.socketId,
      });
    });
    peer.on("stream", (stream) => {
      // 相手のstreamを受け取り再生する
      console.log("stream", stream);
      partnerVideoRef.current.srcObject = stream;
      partnerVideoRef.current.play();
    });

    peer.on("error", (err) => console.log("peer error2", err));
    peerRef.current = peer;
  }, [socket, myMediaStream, mySocketId, receivedData, setRinging]);

  const handleReject = useCallback(() => {
    socket?.emit(SocketEvent.RejectCall);
    setRinging(false);
  }, [setRinging, socket]);

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
