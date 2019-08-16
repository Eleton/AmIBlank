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
  const [creator, setCreator] = useState(false);
  return (
    <div className="App">
      <Router>
        <Start path="/" db={db} setCreator={setCreator} />
        <Choose path=":roomId/choose" db={db} creator={creator} />
        <Idle path="/idle" db={db} />
        <Idle path=":roomId/idle/:playerId" db={db} />
        <Game path=":roomId/game" db={db} />
        <Game path=":roomId/game/:playerId" db={db} />
      </Router>
    </div>
  );
}

export default App;
