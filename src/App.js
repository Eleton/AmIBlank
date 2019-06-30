import React, { useState } from 'react';
import './App.css';
import firebase from "./firebase.js";

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
    </div>
  );
}

export default App;
