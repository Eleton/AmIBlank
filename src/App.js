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
  const [state, setState] = useState("");
  const handleChange = e => { 
    setState(e.target.value);
  }
  const handleSubmit = e => {
    e.preventDefault();
    db.collection("lol").add({
      name: "kema",
      state
    })
    console.log(state);
  }

  return (
    <div className="App">
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          name="input"
          placeholder="LOL"
          onChange={handleChange}
          value={state}
        />
        <button>Add</button>
      </form>
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
