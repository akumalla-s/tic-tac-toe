import { useEffect, useState } from "react";
import "./App.css";
import Game from "./components/Game";
import Player from "./components/Player";
import GameHistory from "./components/GameHistory";

function App() {
  const [players, setPlayers] = useState({ playerX: "", playerO: "" });
  const [winningHistory, setWinningHistory] = useState([]);
  const [selectedReviewGame, setSelectedReviewGame] = useState(null);
  const [removeWinnerBold, setRemoveWinnerBold] = useState(false);

  if (players.playerX === "") {
    setPlayers((prevState) => ({ ...prevState, playerX: "PlayerX" }));
  } else if (players.playerO === "") {
    setPlayers((prevState) => ({ ...prevState, playerO: "PlayerO" }));
  }

  return (
    <div>
      <h1 className="title">Tic Tac Toe</h1>
      <div className="container">
        <div className="left-half">
          <Player setPlayers={setPlayers} />
          <Game
            playerX={players.playerX}
            playerO={players.playerO}
            setWinningHistory={setWinningHistory}
            selectedReviewGame={selectedReviewGame}
            setRemoveWinnerBold={setRemoveWinnerBold}
          />
        </div>
        <div className="right-half">
          <GameHistory
            winningHistory={winningHistory}
            setSelectedReviewGame={setSelectedReviewGame}
            removeWinnerBold={removeWinnerBold}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
