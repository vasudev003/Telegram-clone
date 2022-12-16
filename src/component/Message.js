import { Avatar } from "@mui/material";
import React, { forwardRef } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import "./Message.css";

const Message =forwardRef(({
  id, data: {
    timestamp,
    message,
    photo,
    uid,
    email,
    displayName,
  }
}, ref) => {
  const user = useSelector(selectUser)
  return (
    <div ref = {ref} className = {`message ${user.email === email && `message_sender`}`} >
      <Avatar src={photo} className="message_photo" />
      <div className="message_contents">
        <p className="content">{message}</p>
        <small className = "message_timestamp">{new Date(timestamp?.toDate()).toLocaleString()}</small>
      </div>
    </div>
  );
})

export default Message;
