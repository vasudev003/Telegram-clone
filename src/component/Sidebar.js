import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import SearchIcon from "@mui/icons-material/Search";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import SidebarThread from "./SidebarThread";
import { Avatar, IconButton } from "@mui/material";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import db, { auth } from "../firebase";

const Sidebar = () => {
  const user = useSelector(selectUser)
  const[threads, setThreads] = useState([]);

  useEffect(() =>{
    db.collection('threads').onSnapshot((snapshot) => {
        setThreads(snapshot.docs.map((doc) =>({
            id: doc.id,
            data: doc.data()
        })))
      })
}, [])

const addThread = () =>{
  const threadName = prompt('Enter a thread name')
  db.collection('threads').add({
      threadName: threadName,
  });
};
  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <div className="sidebar_search">
          <SearchIcon className="sidebar_serachIcon" />
          <input className="search_input" placeholder="Search" id="sidebar_button" />
        </div>
        <IconButton variant = "outlined" id = "sidebar_button" >
          <BorderColorIcon onClick = {addThread} />
        </IconButton>
      </div>
      <div className="sidebar_threads">
      { threads.map(({id, data: {threadName}}) => (
        <SidebarThread
        key = {id}
        id = {id}
        threadName = {threadName}
        />
      ))}
      </div>
      <div className="sidebar_bottom">
        <Avatar 
        src = {user.photo}
        onClick = {() => auth.signOut()}
        className = "sidebar_bottom_avatar"
        />
        <IconButton>
          <PhoneOutlinedIcon />
        </IconButton>
        <IconButton>
          <QuestionAnswerOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Sidebar;
