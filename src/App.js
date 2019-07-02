import React, { useState } from 'react';
import { Router, Link } from "@reach/router";
import './App.css';
import firebase from "./firebase.js";
import Start from "./views/Start.js";
import Choose from "./views/Choose.js";
import Idle from "./views/Idle.js";
import Game from "./views/Game.js";

const db = firebase.firestore();

function App() {
  return (
    <div className="App">
      <Router>
        <Start path="/" />
        <Choose path="/choose" />
        <Idle path="/idle" />
        <Game path="/game" />
      </Router>
    </div>
  );
}

export default App;
