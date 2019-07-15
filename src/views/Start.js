import React, { useState, useCallback } from 'react';
import { Link } from "@reach/router";
import _ from "lodash";
import {
  CircularProgress,
  TextField,
  Button,
  Typography
} from "@material-ui/core/";
import { format } from "date-fns";

const generateId = roomname => {
  return btoa(`${
    roomname.trim().toLowerCase()
  }${
    format(new Date(Date.now()), "YYYY-MM-DD")
  }`);
}

const Start = ({ db }) => {
  const [roomname, setRoomname] = useState("");
  // status can be 'IDLE' 'INVALID', 'PENDING', 'VALID'
  const [status, setStatus] = useState("IDLE");
  
  const debounce = useCallback(_.debounce(roomname => {
    if (roomname === "") {
      setStatus("IDLE");
    } else if (roomname !== "") {
      const roomId = generateId(roomname);
      db.collection("rooms").doc(roomId).get()
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
    const room = e.target.value;
    setRoomname(room);
    setStatus("PENDING");
    debounce(room)
  }

  const handleSubmit = e => {
    e.preventDefault();
    db.collection("rooms").doc(generateId(roomname)).set({ active: false, roomname})
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
          console.error("Error writing document: ", error);
      });
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
          <Link to={`/${generateId(roomname)}/choose`}>
            Join
          </Link>
        </Button>
    </form>
    {status === "PENDING" && <CircularProgress />}
    {status === "INVALID" && <Typography>Taken</Typography>}
    {status === "VALID" && <Typography>Free!</Typography>}
  </div>
}

export default Start;