import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core/';
import { Link } from "@reach/router";

const Choose = ({db, roomId}) => {
  const [player, setPlayer] = useState("");
  const [character, setCharacter] = useState("");

  const typePlayerName = e => {
    const player = e.target.value;
    setPlayer(player);
  }

  const typeCharacterName = e => {
    const character = e.target.value;
    setCharacter(character);
  }

  const submitPlayer = () => {
    const playerId = btoa(`${player}${character}`);
    db.collection("rooms").doc(roomId)
      .collection("players").doc(playerId)
      .set({ player, character })
      .then(function() {
        console.log("Player saved!");
      })
      .catch(function(error) {
          console.error("Error writing document: ", error);
      });
  }

  return <div>
    <h1>Choose</h1>
    <TextField
      id="player"
      label="Player Name"
      value={player}
      onChange={typePlayerName}
    />
    <TextField
      id="character"
      label="Character Name"
      value={character}
      onChange={typeCharacterName}
    />
    <Button
      variant="contained"
      color="primary"
      onClick={submitPlayer}
      disabled={
        player === "" ||
        character === ""
      }
    >
      <Link to={`/${roomId}/idle/${btoa(`${player}${character}`)}`}>
        Go
      </Link>
    </Button>
  </div>
}

export default Choose;