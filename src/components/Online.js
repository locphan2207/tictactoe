import React, { useEffect, useState, useRef } from "react"
import { useHistory } from "react-router-dom"

import "./Online.css"

import { createSocket, initSocket } from "websocket"

function Online() {
  const [room, setRoom] = useState("")
  const [isInRoom, setIsInRoom] = useState(false)
  const socket = useRef(null)

  const history = useHistory()

  useEffect(() => {
    socket.current = createSocket()
    initSocket(socket.current)

    return () => {
      socket.current.close()
    }
  }, [])

  const createRoom = () => {
    setIsInRoom(true)
    socket.current.send(
      JSON.stringify({ action: "createRoom", roomName: room })
    )
    history.push(`/online/${room}`)
  }

  const exitRoom = () => {
    setIsInRoom(false)
    setRoom("")
    socket.current.send(JSON.stringify({ action: "exitRoom" }))
    history.push(`/online`)
  }

  const handleInputChange = ({ target }) => {
    setRoom(target.value)
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
      {!isInRoom && (
        <>
          <label>Enter a room name to create or join</label>
          <input type="text" onChange={handleInputChange} />
          <button onClick={createRoom}>Submit</button>
        </>
      )}
      {!!isInRoom && (
        <>
          <label>Room name</label>
          <h2>{room}</h2>
          <button onClick={exitRoom}>Exit room</button>
        </>
      )}
    </div>
  )
}

export default Online
