export function createSocket() {
  return new WebSocket(
    "wss://mx3pt2tfyg.execute-api.us-west-1.amazonaws.com/beta"
  )
}

export function initSocket(socket) {
  socket.addEventListener("open", () => {
    console.log("connected")
  })
  socket.addEventListener("message", (data) =>
    console.log(`From server:`, data.data)
  )
  socket.addEventListener("close", () => {
    console.log("disconnected")
  })
}
