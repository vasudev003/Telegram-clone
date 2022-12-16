import React from "react";
import Sidebar from "./Sidebar";
import Thread from "./Thread";
import "./Telegram.css";

function telegram() {
  return (
    <div className="telegram">
      <Sidebar />
      <Thread />
    </div>
  );
}

export default telegram;
