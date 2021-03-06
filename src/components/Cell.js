import React from "react"
import { connectGameState } from "GameState"

import "./Cell.css"

function Cell({ game, x, y, onlinePlay, onlinePlayer }) {
  const extraClassName =
    game.winner === null ? ` cell-player-${game.currentPlayer}` : ""
  const cell = game.getCell(x, y)
  const mark = cell === 1 ? "O" : cell === 2 ? "X" : ""
  const markStyles = { color: mark === "O" ? "cyan" : "darkorchid" }

  const onClick = () => {
    if (!onlinePlayer) {
      game.playTurn(x, y, game.currentPlayer)
    } else {
      onlinePlay(x, y)
    }
  }
  return (
    <div className={`cell ${extraClassName}`} onClick={onClick}>
      <p style={markStyles}>{mark}</p>
    </div>
  )
}

export default connectGameState(Cell)
