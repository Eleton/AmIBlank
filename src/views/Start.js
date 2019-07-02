import React, { useState, useCallback } from 'react';
import { Router, Link } from "@reach/router";
import _ from "lodash";
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import firebase from "../firebase.js";

const db = firebase.firestore();

const Start = () => {
  const [roomname, setRoomname] = useState("");
  // status can be 'IDLE' 'INVALID', 'PENDING', 'VALID'
  const [status, setStatus] = useState("IDLE");
  
  const debounce = useCallback(_.debounce(x => {
    console.log("hallå", roomname)
    if (roomname !== "") {
      db.collection("rooms").doc(roomname).get()
        .then(docSnapshot => {
          if(docSnapshot.exists) {
            setStatus("INVAlID");
            console.log("upptaget...")
          } else {
            setStatus("VALID");
            console.log("KÖR HÅRT!")
          }
        })
    }
    console.log(x);
  }, 500), [])
  
  const handleChange = e => {
    setRoomname(e.target.value);
    console.log(roomname)
    setStatus("PENDING");
    debounce("hej")
  }

  const handleSubmit = e => {
    e.preventDefault();
    db.collection("rooms").doc(roomname).set({})
    .then(function() {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
    alert(roomname);
  }

  return <div>
    <h1>Start</h1>
    <form onSubmit={handleSubmit}>
      {/* <input
        type="text"
        name="input"
        placeholder="Which room?"
        onChange={handleChange}
        value={roomname}
      /> */}
      <TextField
        id="roomname"
        label="Room Name"
        value={roomname}
        onChange={handleChange}
      />
      <Button variant="contained" color="primary">Join</Button>
    </form>
    {status === "PENDING" && <CircularProgress />}
  </div>
}

export default Start;