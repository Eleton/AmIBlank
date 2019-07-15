import React, { useState } from 'react';
import { TextField } from '@material-ui/core/';

const Choose = () => {
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
  </div>
}

export default Choose;