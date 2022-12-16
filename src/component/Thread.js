import { Avatar, IconButton } from "@mui/material";
import { MoreHoriz } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import "./Thread.css";
import SendIcon from "@mui/icons-material/Send";
import MicNoneIcon from "@mui/icons-material/MicNone";
import TimerIcon from "@mui/icons-material/Timer";
import db from "../firebase"
import firebase from 'firebase'
import { useSelector } from "react-redux";
import { selectThreadId, selectThreadName } from "../features/threadSlice";
import Message from "./Message";
import * as timeago from 'timeago.js'
import FlipMove from 'react-flip-move'
import { selectUser } from "../features/userSlice";

const Thread = () => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const threadName = useSelector(selectThreadName);
    const threadId = useSelector(selectThreadId);
    const user = useSelector(selectUser);

    useEffect(() =>{
      if(threadId){
          db.collection('threads').doc(threadId).collection
          ('messages').orderBy("timestamp", "desc").onSnapshot(
          (snapshot) => setMessages(snapshot.docs.map((doc) =>({
            id : doc.id,
            data: doc.data()
      }))))
      }
    },[threadId])

    const sendMessage = (e) => {
      e.preventDefault();

          db.collection('threads').doc(threadId).collection
          ('messages').add({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          message: input,
          uid: user.uid,
          photo: user.photo,
          email: user.email,
          displayName: user.displayName
      })
      setInput('')
  }

  return (
    <div className="thread">
      <div className="thread_header">
        <div className="thread_headDeatils">
        {threadId ? (<Avatar 
          src = {user.photo}
        />) : (<Avatar />)}
        <div className="headDeatils_info"> 
          <h4>{ threadId ? threadName : "Click on any chat Name"}</h4>
  <h5>{ threadId ? (timeago.format(messages[0]?.timestamp?.toDate())) : "last seen"}</h5>
        </div>
      </div>
        <IconButton>
          <MoreHoriz className="moreHoriz" />
        </IconButton>
      </div>
      <div className="messages">
        <FlipMove>
          { messages.map(({ id, data }) =>(
          <Message key = {id} id = {id} data = {data} />
        ))}
        </FlipMove>
      </div>
      <div className="thread_input">
        <form>
        <input
          placeholder = "Enter a message..." 
          type = "text" 
          value = {input}
          onChange = {(e) => setInput(e.target.value)}
        />
        <IconButton>
            <TimerIcon />
          </IconButton>
        <IconButton 
          onClick = {sendMessage} type = "sumbit">
            <SendIcon />
        </IconButton >
        <IconButton>
            <MicNoneIcon />
          </IconButton>
        </form>
      </div>
    </div>
  );
}

export default Thread
