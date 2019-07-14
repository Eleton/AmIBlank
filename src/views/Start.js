import React, { useState, useCallback } from 'react';
import { Router, Link } from "@reach/router";
import _ from "lodash";
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import firebase from "../firebase.js";

const db = firebase.firestore();

const Start = () => {
  const [roomname, setRoomname] = useState("");
  // status can be 'IDLE' 'INVALID', 'PENDING', 'VALID'
  const [status, setStatus] = useState("IDLE");
  
  const debounce = useCallback(_.debounce(roomname => {
    if (roomname === "") {
      setStatus("IDLE");
    } else if (roomname !== "") {
      db.collection("rooms").doc(roomname).get()
        .then(docSnapshot => {
          if(docSnapshot.exists) {
            setStatus("INVALID");
          } else {
            setStatus("VALID");
          }
        })
    }
  }, 500), [])
  
  const handleChange = e => {
    const rm = e.target.value;
    setRoomname(rm);
    console.log(rm);
    setStatus("PENDING");
    debounce(rm)
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
    <Typography variant="h3">Start</Typography>
    <form>
      <TextField
        id="roomname"
        label="Room Name"
        value={roomname}
        onChange={handleChange}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={
          status === "INVALID" ||
          status === "PENDING" ||
          roomname === ""
        }
      >
        Join
      </Button>
    </form>
    {status === "PENDING" && <CircularProgress />}
    {status === "INVALID" && <Typography>Taken</Typography>}
    {status === "VALID" && <Typography>Free!</Typography>}
  </div>
}

export default Start;