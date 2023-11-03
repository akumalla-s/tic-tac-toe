import React from "react";

export default function Board({ gameBoard, handleCellClick, winningCells }) {
  return (
    <table className="board">
      <tbody>
        <tr>
          <td className={`boxes ${winningCells.includes(0) ? "win-cell" : ""}`} onClick={() => handleCellClick(0)}>{gameBoard[0]}</td>
          <td className={`boxes ${winningCells.includes(1) ? "win-cell" : ""}`} onClick={() => handleCellClick(1)}>{gameBoard[1]}</td>
          <td className={`boxes ${winningCells.includes(2) ? "win-cell" : ""}`} onClick={() => handleCellClick(2)}>{gameBoard[2]}</td>
        </tr>
        <tr>
          <td className={`boxes ${winningCells.includes(3) ? "win-cell" : ""}`} onClick={() => handleCellClick(3)}>{gameBoard[3]}</td>
          <td className={`boxes ${winningCells.includes(4) ? "win-cell" : ""}`} onClick={() => handleCellClick(4)}>{gameBoard[4]}</td>
          <td className={`boxes ${winningCells.includes(5) ? "win-cell" : ""}`} onClick={() => handleCellClick(5)}>{gameBoard[5]}</td>
        </tr>
        <tr>
          <td className={`boxes ${winningCells.includes(6) ? "win-cell" : ""}`} onClick={() => handleCellClick(6)}>{gameBoard[6]}</td>
          <td className={`boxes ${winningCells.includes(7) ? "win-cell" : ""}`} onClick={() => handleCellClick(7)}>{gameBoard[7]}</td>
          <td className={`boxes ${winningCells.includes(8) ? "win-cell" : ""}`} onClick={() => handleCellClick(8)}>{gameBoard[8]}</td>
        </tr>
      </tbody>
    </table>
  );
}
