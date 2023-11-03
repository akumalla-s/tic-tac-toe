import React, { useState } from "react";

export default function GameHistory({
  winningHistory,
  setSelectedReviewGame,
  removeWinnerBold,
}) {
  const [selectedWinnerIndex, setSelectedWinnerIndex] = useState(null);

  const handleReviewClick = (gameData, index) => {
    setSelectedWinnerIndex(index);
    //new object reference, ensuring that React detects a state change and triggers a re-render in the App component.
    const copiedGameData = JSON.parse(JSON.stringify(gameData));
    setSelectedReviewGame(copiedGameData);
  };

  return (
    <>
      <div className="history-title">
        <h2>Game History</h2>
      </div>
      <div className="history-list">
        {winningHistory.map((gameData, index) => (
          <div key={index}>
            <div className="history-content">
              <p
                className={`history-item ${
                  !removeWinnerBold && selectedWinnerIndex === index
                    ? "bold-winner"
                    : "history-item"
                }`}
              >
                Winner: {gameData.winner}{" "}
              </p>
              <button
                className="review-button"
                onClick={() => handleReviewClick(gameData, index)}
              >
                Review Game
              </button>
            </div>
            <p>
              Date: {gameData.date}, Player X: {gameData.playerXName}, Player O:{" "}
              {gameData.playerOName}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
