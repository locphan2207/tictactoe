import React from "react"
import { connectGameState } from "GameState"

import "./Game.css"

import Cell from "components/Cell"

function Game({ game, onlinePlayer, onlinePlay }) {
  let playerText = `Current turn: Player ${game.currentPlayer}`

  let winnerText = `WINNER: ${
    game.winner === 0 ? "Draw" : game.winner === 1 ? "Player 1" : "Player 2"
  }!!!`

  if (onlinePlayer) {
    playerText = `Current turn: ${
      onlinePlayer === game.currentPlayer ? "You" : "Your opponent"
    }`
    winnerText = `WINNER: ${
      game.winner === 0
        ? "Draw"
        : game.winner === onlinePlayer
        ? "You"
        : "your opponent"
    }!!!`
  }

  return (
    <div className="game">
      <div className="info">
        {game.winner === null && (
          <p
            className="current-player-text"
            style={{ color: game.currentPlayer === 1 ? "cyan" : "darkorchid" }}
          >
            {playerText}
          </p>
        )}
        {game.winner !== null && (
          <p
            className="current-player-text"
            style={{
              color:
                game.winner === 1
                  ? "cyan"
                  : game.winner === 2
                  ? "darkorchid"
                  : "black",
            }}
          >
            {winnerText}
          </p>
        )}
      </div>
      <div className="reset" onClick={game.startOver.bind(game)}>
        <p>Start Over</p>
      </div>
      <div className="error">
        {game.error && <p className="error-text">{game.error}</p>}
      </div>
      <div className="grid">
        {[0, 1, 2].map((x) =>
          [0, 1, 2].map((y) => {
            const cellName = `${x}-${y}`
            return (
              <Cell
                key={cellName}
                x={x}
                y={y}
                onlinePlay={onlinePlay}
                onlinePlayer={onlinePlayer}
              />
            )
          })
        )}
      </div>
    </div>
  )
}

export default connectGameState(Game)
