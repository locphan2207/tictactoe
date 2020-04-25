import React, { useEffect, useState, useRef } from "react"

import "./Online.css"

import Game from "components/Game"
import { createSocket, initSocket } from "websocket"
import { connectGameState } from "GameState"

function Online({ game }) {
  const [room, setRoom] = useState("")
  const [onlinePlayer, setOnlinePlayer] = useState(null)
  const socket = useRef(null)
  const roomInput = useRef(null)

  useEffect(() => {
    socket.current = createSocket()
    const onOpen = () => game.startOver()
    const onMessage = ({ data }) => {
      const { type, message } = JSON.parse(data)

      switch (type) {
        case "PLAYER":
          setOnlinePlayer(
            message === "player1" ? 1 : message === "player2" ? 2 : null
          )
          break
        case "PLAY":
          const { player, x, y } = JSON.parse(message)
          game.playTurn(x, y, player)
          break
        default:
          console.log(data)
      }
    }
    const onClose = () => {
      setRoom("")
      setOnlinePlayer(null)
      game.startOver()
    }

    initSocket(socket.current, { onOpen, onMessage, onClose })

    return () => {
      socket.current.close()
    }
  }, [game])

  const createRoom = async () => {
    const roomName = roomInput.current.value
    setRoom(roomName)
    await socket.current.send(
      JSON.stringify({ action: "createRoom", roomName })
    )
    game.startOver()
  }

  const exitRoom = () => {
    setRoom("")
    setOnlinePlayer(null)
    socket.current.send(JSON.stringify({ action: "exitRoom" }))
  }

  const onlinePlay = (x, y) => {
    if (game.currentPlayer !== onlinePlayer) return
    game.playTurn(x, y, onlinePlayer)
    socket.current.send(
      JSON.stringify({
        action: "sendGameState",
        message: JSON.stringify({ player: onlinePlayer, x, y }),
        roomName: room,
      })
    )
  }

  return (
    <div className="online">
      {!room && (
        <>
          <label>Enter a room name to create or join</label>
          <input ref={roomInput} type="text" />
          <button onClick={createRoom}>Submit</button>
        </>
      )}
      {!!room && (
        <>
          <label>Room name</label>
          <h2>{room}</h2>
          <button onClick={exitRoom}>Exit room</button>
          <Game onlinePlayer={onlinePlayer} onlinePlay={onlinePlay} />
        </>
      )}
    </div>
  )
}

export default connectGameState(Online)
