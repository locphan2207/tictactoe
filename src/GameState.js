import React from "react"

const PLAYER_1 = 1
const PLAYER_2 = 2
const NONE_PLAYER = 0

class GameState {
  constructor() {
    this.currentPlayer = PLAYER_1
    this.board = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]
    this.subscribedComponents = []
    this.error = ""
    this.winner = null
  }

  getBoard() {
    return this.board
  }

  getCell(x, y) {
    return this.board[x][y]
  }

  subscribeComponent(component) {
    this.subscribedComponents.push(component)
  }

  playTurn(x, y, player) {
    // Return 1 or 2 means player 1 or 2 wins
    // Return 0 means noone has won, but the play was legit
    // Return -1 means the play was not allowed
    if (player !== this.currentPlayer) return

    if (this.winner) return
    if (!this.board[x][y]) {
      this.error = ""
      this.board[x][y] = player

      if (this.checkWin(x, y, player)) {
        this.winner = player
      } else if (this.isOver()) {
        this.winner = NONE_PLAYER
      } else {
        this.currentPlayer = player === PLAYER_1 ? PLAYER_2 : PLAYER_1
      }
    } else {
      this.error = "Not a correct play"
    }
    this.update()
  }

  checkWin(x, y, player) {
    for (let row = 0; row < 3; row++) {
      if (this.board[row][y] !== player) break
      if (row === 2) return true
    }

    for (let col = 0; col < 3; col++) {
      if (this.board[x][col] !== player) break
      if (col === 2) return true
    }

    if (x === y) {
      for (let i = 0; i < 3; i++) {
        if (this.board[i][i] !== player) break
        if (i === 2) return true
      }
    }

    if (x + y + 1 === 2) {
      for (let i = 0; i < 3; i++) {
        if (this.board[i][2 - i] !== player) break
        if (i === 2) return true
      }
    }

    return false
  }

  isOver() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.board[i][j] === NONE_PLAYER) return false
      }
    }
    return true
  }

  startOver() {
    this.currentPlayer = PLAYER_1
    this.board = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]
    this.error = ""
    this.winner = null
    this.update()
  }

  update() {
    for (const component of this.subscribedComponents) {
      component.forceUpdate()
    }
  }
}

const TheGame = new GameState()

// HOC component to pass the Game instance down to components through their props
// Also to trigger render when Game instance changes its class variables (board, currentPlayer, etc)
export function connectGameState(WrappedComponent) {
  return class extends React.Component {
    componentDidMount() {
      TheGame.subscribeComponent(this)
    }
    render() {
      return <WrappedComponent game={TheGame} {...this.props} />
    }
  }
}
