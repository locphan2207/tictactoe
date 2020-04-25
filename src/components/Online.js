import React, { useEffect, useState, useRef } from "react"

import { createSocket, initSocket } from "websocket"

function Online() {
  const [room, setRoom] = useState("")
  const [isInRoom, setIsInRoom] = useState(false)
  const socket = useRef(null)

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
  }

  const exitRoom = () => {
    setIsInRoom(false)
    setRoom("")
    socket.current.send(JSON.stringify({ action: "exitRoom" }))
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
    <div>
      {!isInRoom && (
        <>
          <label>Create new room / Join a room</label>
          <input
            type="text"
            onChange={handleInputChange}
            placeholder="Enter new room name or the room name you want to join"
          />
          <button onClick={createRoom}>Create / Join</button>
        </>
      )}
      {!!isInRoom && (
        <>
          <label>Room name</label>
          <h2>{room}</h2>
          <button onClick={exitRoom}>Exit room</button>
        </>
      )}
      <button onClick={testSend}>SEND FOR TESTING</button>
    </div>
  )
}

export default Online
