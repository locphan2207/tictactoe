export function createSocket() {
  return new WebSocket(
    "wss://mx3pt2tfyg.execute-api.us-west-1.amazonaws.com/beta"
  )
}

export function initSocket(socket, { onOpen, onClose, onMessage }) {
  socket.addEventListener("open", onOpen)
  socket.addEventListener("message", onMessage)
  socket.addEventListener("close", onClose)
}
