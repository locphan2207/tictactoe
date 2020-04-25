import React, { useEffect, useState, useRef } from "react"
import { useHistory, useParams, Route } from "react-router-dom"

import "./Online.css"

import Game from "components/Game"
import { createSocket, initSocket } from "websocket"

function Online() {
  const [room, setRoom] = useState("")
  const socket = useRef(null)
  const roomInput = useRef(null)

  useEffect(() => {
    socket.current = createSocket()
    initSocket(socket.current)

    return () => {
      socket.current.close()
    }
  }, [])

  const createRoom = () => {
    const roomName = roomInput.current.value
    setRoom(roomName)
    socket.current.send(JSON.stringify({ action: "createRoom", roomName }))
  }

  const exitRoom = () => {
    setRoom("")
    socket.current.send(JSON.stringify({ action: "exitRoom" }))
  }

  const testSend = () => {
    socket.current.send(
      JSON.stringify({
        action: "sendGameState",
        message: "HELLO",
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
          <Game />
        </>
      )}
    </div>
  )
}

export default Online
