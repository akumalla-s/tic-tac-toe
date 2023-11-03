import React, { useEffect, useState } from "react";
import Board from "./Board";

export default function Game({
  playerX,
  playerO,
  setWinningHistory,
  selectedReviewGame,
  setRemoveWinnerBold,
}) {
  const [gameBoard, setGameBoard] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [gameActive, setGameActive] = useState(false);
  const [winner, setWinner] = useState(null);
  const [currentGameMoves, setCurrentGameMoves] = useState([]);
  const [reviewGameBoard, setReviewGameBoard] = useState(Array(9).fill(""));
  const [timerSeconds, setTimerSeconds] = useState(15);
  const [winningCells, setWinningCells] = useState([]);
  const [timeOutMessage, setTimeOutMessage] = useState("");
  const [reviewMessage, setReviewMessage] = useState("");

  function initialState() {
    setGameBoard(Array(9).fill(""));
    setCurrentPlayer("X");
    setWinner(null);
    setCurrentGameMoves([]);
    setReviewGameBoard(Array(9).fill(""));
    setWinningCells([]);
    setReviewMessage("");
  }

  function startGame() {
    initialState();
    setGameActive(true);
    setTimeOutMessage("");
  }

  function resetBoard() {
    initialState();
    setGameActive(false);
    setWinningCells([]);
    setRemoveWinnerBold(true);
  }

  function resetReviewBoard() {
    initialState();
    setGameActive(false);
    setWinningCells([]);
    setRemoveWinnerBold(false);
    setTimeOutMessage("");
  }

  function handleCellClick(index) {
    if (!gameActive || gameBoard[index] !== "") {
      return;
    }

    const newGameBoard = [...gameBoard];
    newGameBoard[index] = currentPlayer;
    setGameBoard(newGameBoard);

    if (selectedReviewGame) {
      const newReviewGameBoard = [...reviewGameBoard];
      newReviewGameBoard[index] = currentPlayer;
      setReviewGameBoard(newReviewGameBoard);
    }

    const move = { player: currentPlayer, index };
    setCurrentGameMoves((prevMoves) => [...prevMoves, move]);

    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    setGameActive(true);
    setTimerSeconds(15); // Reset timer to 15 seconds after every cell click
  }

  useEffect(() => {
    let timerInterval;

    if (gameActive) {
      setTimerSeconds(15);
      timerInterval = setInterval(() => {
        setTimerSeconds((prevSeconds) => {
          if (prevSeconds === 0) {
            clearInterval(timerInterval);
            handleTimeout(); // Handle timeout when timer reaches 0
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerInterval);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [gameActive]);

  function handleTimeout() {
    setTimeOutMessage("Time's up! Game over!");
    resetBoard();
  }

  useEffect(() => {
    checkWinner();
  }, [gameBoard, gameActive, winner]);

  function checkWinner() {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        gameBoard[a] &&
        gameBoard[a] === gameBoard[b] &&
        gameBoard[a] === gameBoard[c]
      ) {
        setGameActive(false);
        setWinner(
          gameBoard[a] === "X" ? playerX : gameBoard[a] === "O" ? playerO : null
        );
        setWinningCells([a, b, c]);
        if (winner) {
          updateWinningHistory(winner);
        }
        return;
      }
    }

    if (!gameBoard.includes("") && gameActive) {
      setGameActive(false);
      setWinner("It's a draw!");
    }
  }

  function updateWinningHistory(winner) {
    const date = new Date().toLocaleString();
    const playerXName = playerX;
    const playerOName = playerO;

    // Create a copy of currentGameMoves
    const movesCopy = [...currentGameMoves];

    const newHistoryItem = {
      winner,
      winningCells,
      date,
      playerXName,
      playerOName,
      currentGameMoves: movesCopy,
    };

    setWinningHistory((prevHistory) => [...prevHistory, newHistoryItem]);
  }

  useEffect(() => {
    if (selectedReviewGame && selectedReviewGame.currentGameMoves) {
      resetReviewBoard();
      const newBoard = Array(9).fill("");
      selectedReviewGame.currentGameMoves.forEach((move) => {
        newBoard[move.index] = move.player;
      });
      setReviewMessage("Reviewing Previous Game");
      setReviewGameBoard(newBoard);
      setGameActive(false);
      setWinner(selectedReviewGame.winner || null);
      const [a, b, c] = selectedReviewGame.winningCells;
      setWinningCells([a, b, c]);
    }
  }, [selectedReviewGame]);

  return (
    <div>
      <div className="buttons">
        <button className="start-button" onClick={startGame}>
          Start Game
        </button>
        <button className="reset-button" onClick={resetBoard}>
          Reset Board
        </button>
      </div>

      <div className="timeout-message">{timeOutMessage}</div>

      <div className="timeout-message">{reviewMessage}</div>

      {gameActive && (
        <div className="turn-info" id="turnInfo">
          Next Turn: {currentPlayer}
        </div>
      )}

      {gameActive && (
        <div className="timer-info" id="timerInfo">
          Timer: {timerSeconds}
        </div>
      )}

      <Board
        gameBoard={selectedReviewGame ? reviewGameBoard : gameBoard}
        handleCellClick={handleCellClick}
        winningCells={winningCells}
      />

      <div className="winner" id="winner">
        <h2>Winner: {winner}</h2>
      </div>
    </div>
  );
}
