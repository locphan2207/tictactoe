import React from "react"
import { Link } from "react-router-dom"

function Menu() {
  return (
    <div>
      <Link to="/offline">Offline Play</Link>
      <Link to="/online">Online Play</Link>
    </div>
  )
}

export default Menu
