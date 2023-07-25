"use client";
import { Row, withAuthGuard } from "@/components";
import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

const Conversations = () => {
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

export default withAuthGuard(Conversations);
