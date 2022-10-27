import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState,useEffect,useLayoutEffect,useRef  } from "react";
import Login from './Login';
import Home from './Home';
import axios from 'axios';
import {useStateValue} from "./StateProvider"

function App() {

  const {signIn,signOut,currentUser,setCurrentUser}=useStateValue()

  useEffect(() => {
    console.log("App ran..")
    const timer = setTimeout(() => {
      signOut()
    }, 1000*60*60);
    return () => clearTimeout(timer);
  
  }, [currentUser])

  useEffect(() => {
    setCurrentUser(JSON.parse(window.localStorage.getItem("token")))
  }, [])



  return (
    

    <div className="App">
      {currentUser ? <Home/> : <Login/>}

    </div>
  );
}

export default App;
