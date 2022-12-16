import { Button } from "@mui/material";
import React from "react";
import { auth, provider } from "../firebase";
import './Login.css'


const Login = () => {
  const singIn = () =>{
    auth.signInWithPopup(provider).catch((err)=>{
      alert(err.message)
      })
  }

  return (
    <div className="login">
      <div className = "login_telegram">
        <img src= "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/100px-Telegram_2019_Logo.svg.png"
        alt = "telegram logo" 
        />
        <h1>Telegram</h1>
        <Button className="login_button" onClick={singIn} >Sign in</Button>
    </div>
  </div>
  ) 
}

export default Login;
