import React, { useEffect, useState } from "react";

export default function Player({ setPlayers }) {
  const [playerX, setPlayerX] = useState("");
  const [playerO, setPlayerO] = useState("");

  useEffect(() => {
    setPlayers({ playerX, playerO });
  }, [playerX, playerO, setPlayers]);

  return (
    <div className="player">
      <h2 className="player-title">Please enter your names</h2>

      <div className="player-names">
        <input
          className="playerInput"
          type="text"
          placeholder="Player X's Name"
          value={playerX}
          onChange={(e) => setPlayerX(e.target.value)}
        />
        <input
          className="playerInput"
          type="text"
          placeholder="Player O's Name"
          value={playerO}
          onChange={(e) => setPlayerO(e.target.value)}
        />
      </div>
    </div>
  );
}
