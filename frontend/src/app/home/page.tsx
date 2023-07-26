"use client";
import { SocketEvent } from "@/api/socket/constants";
import { Row, useSocket, withAuthGuard } from "@/components";
import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { useEffect } from "react";

const Home = () => {
  const { socket } = useSocket();
  useEffect(() => {
    if (!socket) return;
    socket.emit(SocketEvent.Join);
    return () => {
      socket.emit(SocketEvent.Leave);
    };
  }, [socket]);

  return (
    <Row>
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText primary="Brunch this weekend?" secondary="Ali Connors" />
        </ListItem>
      </List>
    </Row>
  );
};

export default withAuthGuard(Home);
